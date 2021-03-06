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
import {Fill, Text, Style, Icon} from 'ol/style'
import View from 'ol/View'
import Overlay from 'ol/Overlay'
import {Point} from 'ol/geom'
import {transform,fromLonLat} from 'ol/proj'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import {Cluster, OSM, Vector} from 'ol/source'
import {easeIn, easeOut} from 'ol/easing';

export default {
	name: 'inx-property-open-layers-map',
	props: {
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
		markerIconUrl: false,
		markerIconScale: {
			type: Number,
			default: .65
		},
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
		}
	},
	data: function() {
		return {
			id: null,
			overlay: null,
			consentGranted: false,
			popupVisible: false,
			map: null,
			currentZoom: 0
		}
	},
	computed: {
		classes () {
			let classes = this.wrapClasses.length > 0 ? this.wrapClasses.split(' ') : []
			classes.push('inx-property-map inx-property-map--type--olmap')
			classes = classes.filter(function (value, index, self) {
				return self.indexOf(value) === index
			})

			return classes.join(' ')
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
			if (feature && feature.get('features') !== 'undefined') {
				return true
			}

		  return false
		},
		sanitizeUrl (url) {
    		return url.replace('[^-A-Za-z0-9+&@#/%?=~_|!:,.;\(\)]', '')
		},
		showPopup (event, postIds, coords) {
			const contentEl = this.$refs.popupContent;
			const viewExtent = this.map.getView().calculateExtent()
			const viewWidth = viewExtent[2] - viewExtent[0]
			const viewHeight = viewExtent[3] - viewExtent[1]

			let center = [coords[0], coords[1]]
			center[0] = center[0] + ((viewWidth * 0.5) / 2)
			center[1] = center[1] + ((viewHeight * 0.9) / 2)

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

			for (let i = 0; i < postIds.length; i++) {
				property = inx_maps[this.markerSetId][postIds[i]]

				wrapStyle = 'padding:16px; font-size:85%; line-height:120%; text-align:center'
				if (postIds.length > 1 && i < postIds.length - 1) {
					wrapStyle += '; border-bottom:1px solid #e0e0e0'
				}

				content += '<div style="' + wrapStyle + '">'
				content += '<a href="' + this.sanitizeUrl(property.url) + '">'
				if (property.thumbnail_url) {
					content += '<img src="' + this.sanitizeUrl(property.thumbnail_url) + '" style="display:inline-block; max-width:50%; margin-bottom:8px">'
				}
				content += '<div>' + property.title + '</div>'
				content += '</a>'
				if (property.type) {
					content += '<div>' + property.type + '</div>'
				}
				content += '</div>'
			}

			contentEl.innerHTML = '<div style="max-height:14em; overflow:auto">' + content + '</div>'

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
				offset: this.markerIconUrl ? [1, -26] : [0, 0]
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

			marker.setStyle(new Style({
				image: new Icon(({
					anchor: [0.5, 1],
					src: this.markerIconUrl,
					scale: this.markerIconScale
				}))
			}))

			return marker
		},
		addMarkers (map) {
			if (
				!this.markerIconUrl
				|| !this.markerSetId
				|| 'undefined' === inx_maps[this.markerSetId]
				|| Object.keys(inx_maps[this.markerSetId]).length === 0
				|| inx_maps[this.markerSetId].length === 0
			) {
				return false
			}

			const that = this
			let markers = []

			for (let postId in inx_maps[this.markerSetId]) {
				let property = inx_maps[this.markerSetId][postId]
				let lat = parseFloat(property.lat)
				let lng = parseFloat(property.lng)

				if (!lat || ! lng) continue

				markers.push(this.propertyMarker([lng, lat], postId))
			}

			const vectorSource = new Vector({
				features: markers
			})

			if (this.useClustering) {
				const clusterSource = new Cluster({
					distance: 50,
					source: vectorSource
				})

				let styleCache = {}

				const clusterVectorLayer = new VectorLayer({
					source: clusterSource,
					style: function (feature) {
						const size = feature.get('features').length
						let style = styleCache[size];

						if (!style) {
							style = new Style({
								image: new Icon(({
									anchor: [0.5, 1],
									src: that.markerIconUrl,
									scale: that.markerIconScale
								})),
								text: new Text({
									text: size > 1 ? size.toString() : '',
									offsetY: -11,
										fill: new Fill({
										color: '#fff'
									})
								})
							})
							styleCache[size] = style
						}

						return style
					}
				})

				map.addLayer(clusterVectorLayer)
			} else {
				const markerVectorLayer = new VectorLayer({
					source: vectorSource
				})

				map.addLayer(markerVectorLayer)
			}

			if (this.autoFit) {
				this.$nextTick(() => {
					map.updateSize()

					const extent = vectorSource.getExtent()
					map.getView().fit(extent, map.getSize())
				})
			}
		},
		addClickEventListener (map) {
			const that = this

			map.on('singleclick', function(event) {
				let propertyPostIds = []

				const feature = map.forEachFeatureAtPixel(event.pixel, function(feature) {
					return feature
				})

				if (that.isCluster(feature)) {
					feature.get('features').forEach(property => {
						propertyPostIds.push(property.get('name'))
					})
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

			const map = new Map({
				target: mapElement,
				layers: [
					new TileLayer({
						source: new OSM()
					})
				],
				view: new View({
					center: fromLonLat([this.lng, this.lat]),
					zoom: this.zoom,
					minZoom: 0,
					maxZoom: 18
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
		if (!this.requireConsent || this.$cookies.get('inx_consent_use_maps')) {
			this.grantConsent(null)
		}
	}
}
</script>

<style lang="scss" scoped>
	.ol-popup {
		position: absolute;
		min-width: 280px;
		padding: 15px;
		border-radius: 10px;
		border: 1px solid #ccc;
		bottom: 12px;
		left: -50px;
		background-color: white;
		filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
		-webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
 	}

	.ol-popup:after,
	.ol-popup:before {
		top: 100%;
		border: solid transparent;
		content: " ";
		height: 0;
		width: 0;
		position: absolute;
		pointer-events: none;
	}

	.ol-popup:after {
		border-top-color: white;
		border-width: 10px;
		left: 48px;
		margin-left: -10px;
	}

	.ol-popup:before {
		border-top-color: #ccc;
		border-width: 11px;
		left: 48px;
		margin-left: -11px;
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
