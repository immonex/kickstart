<template>
	<div :class="classes">
		<div class="inx-property-map__consent" v-show="!consentGranted">
			<div class="inx-property-map__privacy-note uk-flex uk-flex-top">
				<div class="uk-width-auto uk-margin-small-right"><span uk-icon="icon: location; ratio: 2"></span></div>
				<div class="uk-width-expand" v-html="privacyNote"></div>
			</div>
			<button class="inx-button inx-button--action uk-button uk-button-primary" @click="grantConsent">{{ showMapButtonText }}</button>
		</div>

		<div class="ol-popup" ref="popup" v-show="consentGranted && popupVisible">
			<a class="ol-popup-closer" ref="popupCloser" @click="hidePopup"></a>
			<div ref="popupContent"></div>
		</div>

		<div :class="['inx-property-map__map', { 'inx-property-map__map--has-consent': consentGranted }]" ref="map"></div>
	</div>
</template>

<script>
/* OpenLayers */
import Map from 'ol/Map'
import Feature from 'ol/Feature'
import Collection from 'ol/Collection'
import { Fill, Text, Style, Icon } from 'ol/style'
import View from 'ol/View'
import Overlay from 'ol/Overlay'
import { Point } from 'ol/geom'
import { transform,fromLonLat } from 'ol/proj'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import { Cluster, OSM, Vector, XYZ } from 'ol/source'
import { easeIn, easeOut } from 'ol/easing'
import 'ol/ol.css';
import Google from 'ol/source/Google.js'
import Layer from 'ol/layer/WebGLTile.js'
import { Control, defaults as defaultControls } from 'ol/control.js'
import { MouseWheelZoom, defaults } from 'ol/interaction.js';
import { platformModifierKeyOnly } from 'ol/events/condition.js';

import axios from 'axios'
import { getSvgImgSrc, addBacklinkURL } from '../shared_components'
import pinIconSvgSource from '../../assets/marker-pin.source.svg'

export default {
	name: 'inx-property-open-layers-map',
	props: {
		type: {
			type: String,
			default: 'osm'
		},
		options: {
			type: String,
			default: ''
		},
		apiKey: {
			type: String,
			default: ''
		},
		useClustering: {
			type: Boolean,
			default: true
		},
		lat: {
			type: Number,
			default: 49.8587840
		},
		lng: {
			type: Number,
			default: 6.7854410
		},
		zoom: {
			type: Number,
			default: 12
		},
		autoFit: {
			type: Boolean,
			default: true
		},
		markerSetId: {
			type: String,
			default: ''
		},
		markerFillColor: {
			type: String,
			default: '#E77906'
		},
		markerFillOpacity: {
			type: Number,
			default: .8
		},
		markerStrokeColor: {
			type: String,
			default: '#404040'
		},
		markerStrokeWidth: {
			type: Number,
			default: 3
		},
		markerScale: {
			type: Number,
			default: .75,
		},
		markerIconUrl: false,
		wrapClasses: {
			type: String,
			default: ''
		},
		privacyNote: {
			type: String,
			default: ''
		},
		showMapButtonText: {
			type: String,
			default: 'Agreed, show maps!'
		},
		requireConsent: {
			type: Boolean,
			default: true
		},
		disableLinks: {
			type: String,
			default: ''
		},
		forceLang: {
			type: String,
			default: ''
		},
		previewMarkers: {
			type: String,
			default: ''
		},
	},
	data: function() {
		return {
			id: null,
			overlay: null,
			consentGranted: false,
			popupVisible: false,
			map: null,
			currentZoom: 0,
			vectorSource: null,
			markerPropertyData: {},
			markerIconScale: .75,
			markerIconAnchorY: .925,
			markerIconTextOffsetY: -15,
			markerStyleCache: {}
		}
	},
	computed: {
		olSourceType () {
			if (this.type.substring(0, 4) === 'gmap') return 'google'
			if (this.type.substring(0, 3) === 'osm') return 'osm'

			return 'xyz'
		},
		classes () {
			let classes = this.wrapClasses.length > 0 ? this.wrapClasses.split(' ') : []
			classes.push('inx-property-map inx-property-map--type--olmap')
			classes = classes.filter(function (value, index, self) {
				return self.indexOf(value) === index
			})

			return classes.join(' ')
		},
		markerSet () {
			const markers = []
			const markerSource = this.previewMarkers ?
				JSON.parse(atob(this.previewMarkers)) :
				this.inxMaps[this.markerSetId]

			for (let postId in markerSource) {
				const markerData = markerSource[postId]

				const lat = parseFloat(Array.isArray(markerData) ? markerData[0] : markerData.lat)
				const lng = parseFloat(Array.isArray(markerData) ? markerData[1] : markerData.lng)

				if (!lat || ! lng) continue
				markers.push(this.propertyMarker([lng, lat], postId))
			}

			return markers
		}
	},
	watch: {
		'markerSet': function (newMarkers) {
			if (!this.map) return

			this.updateMarkers(newMarkers)

			if (this.markerSet.length === 1) {
				const coords = this.markerSet[0].getGeometry().getCoordinates()
				const propertyId = this.markerSet[0].get('name')
				this.showPopup(null, [propertyId], coords)
			} else {
				this.fitMapView(this.map)
			}
		}
	},
	methods: {
		grantConsent (event) {
			if (event) {
				// Consent button clicked.
				event.preventDefault()
				this.$cookies.set('inx_consent_use_maps', true)
			}

			this.consentGranted = true

			this.map = this.createMap()
			this.$nextTick(() => {
				this.map.updateSize()
			})
		},
		isCluster (feature) {
			if (feature && typeof feature.get('features') !== 'undefined') {
				return true
			}

			return false
		},
		sanitizeUrl (url) {
			return url.replace('[^-A-Za-z0-9+&@#/%?=~_|!:,.;\(\)]', '')
		},
		async fetchMarkerPropertyData (propertyPostIds) {
			if (this.markerPropertyData[propertyPostIds]) {
				return this.markerPropertyData[propertyPostIds]
			}

			let url = inx_state.core.rest_base_url + 'immonex-kickstart/v1/properties/' + propertyPostIds + '/'
				+ '?inx-r-response=json_map_markers&inx-r-lang=' + inx_state.core.locale.substring(0, 2)

			if (this.disableLinks) {
				url += '&inx-r-disable-links=' + this.disableLinks
			}
			if (this.forceLang) {
				url += '&inx-r-force-lang=' + this.forceLang
			}

			try {
				const response = await axios.get(url)

				this.markerPropertyData[propertyPostIds] = response.data
				return this.markerPropertyData[propertyPostIds]
			} catch (e) {
				return false
			}
		},
		async showPopup (event, postIds, coords) {
			const contentEl = this.$refs.popupContent;
			const resolution = this.map.getView().getResolution()
			const viewExtent = this.map.getView().calculateExtent()
			const viewWidth = viewExtent[2] - viewExtent[0]
			const viewHeight = viewExtent[3] - viewExtent[1]

			let center = [coords[0], coords[1]]
			center[0] = center[0] + 90 * resolution // ((viewWidth * 0.3) / 2)
			center[1] = center[1] + (viewHeight * 0.9) / 2

			this.map.getView().animate(
				{
					center: center,
					duration: 800,
					easing: easeOut
				},
				{
					center: center,
					duration: 800,
					easing: easeIn
				}
			)

			let property = ''
			let content = ''
			let wrapStyle = ''

			const propertyData = await this.fetchMarkerPropertyData(postIds.slice(0, 64).join(','))
			if (!propertyData) return

			for (let i = 0; i < postIds.length; i++) {
				const property = propertyData[postIds[i]]
				if (!property) continue

				content += '<div class="inx-property-map__property">'
				if (property.url) {
					property.url = addBacklinkURL(property.url)
					content += '<a href="' + this.sanitizeUrl(property.url) + '">'
				}
				if (property.thumbnail_url) {
					content += '<img src="' + this.sanitizeUrl(property.thumbnail_url) + '">'
				}
				content += '<div>' + property.title + '</div>'
				if (property.url) {
					content += '</a>'
				}
				if (property.type) {
					content += '<div>' + property.type + '</div>'
				}
				content += '</div>'
			}

			contentEl.innerHTML = '<div class="inx-property-map__property-wrap">' + content + '</div>'

			this.overlay.setPosition(coords)
			this.popupVisible = true
		},
		hidePopup () {
			if (!this.popupVisible) return
			this.popupVisible = false
			this.overlay.setPosition(undefined)
			this.$refs.popupCloser.blur()
			return false
		},
		addPopup (map) {
			const container = this.$refs.popup

			this.overlay = new Overlay({
				element: container,
				positioning: 'bottom-center',
				offset: [1, -50 * Math.min(1, this.markerScale)]
			})

			map.addOverlay(this.overlay)
		},
		propertyMarker (lonLat, postId) {
			let marker = new Feature({
				geometry: new Point(
					fromLonLat(lonLat)
				),
				name: postId
			})

			return marker
		},
		updateMarkers(newMarkers) {
			this.hidePopup()
			this.vectorSource.clear()
			this.vectorSource.addFeatures(newMarkers)
		},
		fitMapView (map) {
			if (!map || !this.autoFit || this.markerSet.length === 0) return

			this.$nextTick(() => {
				map.updateSize()

				const extent = this.vectorSource.getExtent()
				map.getView().fit(extent, { size: map.getSize(), padding: [48, 32, 32, 32] })
			})
		},
		addMarkers (map) {
			const that = this

			if (this.useClustering) {
				const clusterSource = new Cluster({
					distance: 50,
					source: this.vectorSource
				})

				const clusterVectorLayer = new VectorLayer({
					source: clusterSource,
					style: (feature) => that.getMarkerStyle(feature.get('features').length)
				})

				map.addLayer(clusterVectorLayer)
			} else {
				const markerVectorLayer = new VectorLayer({
					source: this.vectorSource
				})

				map.addLayer(markerVectorLayer)
			}

			this.fitMapView(map)
		},
		getMarkerStyle(size) {
			if (this.markerStyleCache[size]) return this.markerStyleCache[size]

			let style

			const markerScale = Math.min(1, this.markerScale)
			const markerAnchorY = 1 - markerScale * .1

			if (this.markerIconUrl) {
				/**
				 * Custom Marker Icon
				 */

				style = new Style({
					image: new Icon(({
						anchor: [.5, markerAnchorY],
						src: this.markerIconUrl,
						scale: markerScale
					}))
				})
			} else {
				/**
				 * SVG Marker Pin
				 */

				const parser = new DOMParser()
				const pinSvgElement = parser.parseFromString(pinIconSvgSource, 'image/svg+xml').documentElement

				pinSvgElement.style.cssText = '--fillColor:' + this.markerFillColor
					+ ' ;--fillOpacity:' + this.markerFillOpacity
					+ ' ;--strokeWidth:' + this.markerStrokeWidth
					+ ' ;--strokeColor:' + this.markerStrokeColor

				if (markerScale !== 1) {
					pinSvgElement.setAttribute('width', Math.floor(pinSvgElement.getAttribute('width') * markerScale))
					pinSvgElement.setAttribute('height', Math.floor(pinSvgElement.getAttribute('height') * markerScale))
				}

				const pinSvgElementString = (new XMLSerializer()).serializeToString(pinSvgElement)

				style = new Style({
					image: new Icon({
						anchor: [0.5, this.markerIconAnchorY],
						src: 'data:image/svg+xml,' + getSvgImgSrc(pinSvgElementString)
					})
				})
			}

			if (size > 1) {
				style.setText( new Text({
					text: [ size.toString(), 'bold 10px sans-serif' ],
					offsetY: -20 * Math.min(1, markerScale),
					fill: new Fill({
						color: '#FFF'
					})
				}))
			}

			this.markerStyleCache[size] = style

			return style
		},
		addClickEventListener (map) {
			const that = this

			map.on('singleclick', function(event) {
				let propertyPostIds = []

				const feature = map.forEachFeatureAtPixel(event.pixel, function(feature) {
					return feature
				})

				if (that.isCluster(feature)) {
					if (feature.get('features').length > 1 && that.currentZoom < this.getView().getMaxZoom()) {
						const clusterVectorSource = new Vector({
							features: feature.get('features')
						})

						that.$nextTick(() => {
							map.updateSize()

							const extent = clusterVectorSource.getExtent()
							map.getView().fit(extent, { size: map.getSize(), padding: [48, 32, 32, 32], duration: 500 })
						})
					} else {
						feature.get('features').forEach(property => {
							propertyPostIds.push(property.get('name'))
						})
					}
				} else if (feature) {
					propertyPostIds.push(feature.get('name'))
				}

				if (propertyPostIds.length > 0) {
					that.showPopup(event, propertyPostIds, feature.getGeometry().getCoordinates())
				} else {
					that.hidePopup()
				}
			})
		},
		addZoomChangeEventListener (map) {
			const that = this

			map.on('moveend', function(event) {
				const newZoom = map.getView().getZoom()

				if (newZoom !== that.currentZoom) {
					that.currentZoom = newZoom
					that.hidePopup()
				}
			})
		},
		createMap () {
			const mapElement = this.$refs.map

			if (!this.lat) {
				this.lat = 49.8587840
			}
			if (!this.lng) {
				this.lng = 6.7854410
			}

			let source
			let controls
			let options = this.options ? JSON.parse(atob(this.options)) : {}

			switch (this.olSourceType) {
				case 'google':
					options.key = this.apiKey
					source = new Google(options)

					class GoogleLogoControl extends Control {
						constructor() {
							const element = document.createElement('img')
							element.style.pointerEvents = 'none'
							element.style.position = 'absolute'
							element.style.bottom = '5px'
							element.style.left = '5px'
							element.src =
								'https://developers.google.com/static/maps/documentation/images/google_on_white.png'
							super({
								element: element
							})
						}
					}

					controls = defaultControls().extend([new GoogleLogoControl()])
					break;
				case 'osm':
					source = new OSM(options)
					break;
				default:
					source = new XYZ(options)
			}

			source.on('change', () => {
				if (source.getState() === 'error') {
					console.error('[immonex Kickstart] ' + source.getError())
				}
			})

			const maxZoom = options.maxZoom || 18
			let currentZoom = this.zoom
			if (maxZoom && currentZoom > maxZoom) {
				currentZoom = maxZoom
			}

			const map = new Map({
				target: mapElement,
				interactions: defaults({mouseWheelZoom: false}).extend([
					new MouseWheelZoom({
						condition: platformModifierKeyOnly
					}),
				]),
				layers: [
					new TileLayer({source})
				],
				controls: controls,
				view: new View({
					center: fromLonLat([this.lng, this.lat]),
					zoom: currentZoom,
					minZoom: 0,
					maxZoom: maxZoom
				})
			})

			this.addMarkers(map)
			this.addPopup(map)
			this.addClickEventListener(map)
			this.addZoomChangeEventListener(map)

			return map
		}
	},
	mounted () {
		if (this.type === 'gmaps' && ! this.apiKey) {
			console.error('[immonex Kickstart] Google Maps API key is missing.')
			return
		}

		this.vectorSource = new Vector({
			features: this.markerSet
		})

		if (!this.requireConsent || this.$cookies.get('inx_consent_use_maps')) {
			this.grantConsent(null)
		}
	}
}
</script>

<style lang="scss" scoped>
	a {
		text-decoration: none;
		box-shadow: none;
	}

	.ol-popup {
		position: absolute;
		bottom: 12px;
		left: -50px;
		padding: 15px;
		border: 1px solid #cccccc;
		border-radius: 5px 5px 10px 5px;
		min-width: 220px;
		background-color: white;
		-webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
		filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
	}

	.ol-popup:after,
	.ol-popup:before {
		position: absolute;
		top: 100%;
		height: 0;
		width: 0;
		border: solid transparent;
		content: " ";
		pointer-events: none;
	}

	.ol-popup:after {
		left: 48px;
		margin-left: -10px;
		border-width: 10px;
		border-top-color: white;
	}

	.ol-popup:before {
		left: 48px;
		margin-left: -11px;
		border-width: 11px;
		border-top-color: #ccc;
	}

	.ol-popup-closer {
		position: absolute;
		top: 2px;
		right: 8px;
		text-decoration: none;
		cursor: pointer;
	}
	.ol-popup-closer:after {
		content: "✖";
	}
</style>
