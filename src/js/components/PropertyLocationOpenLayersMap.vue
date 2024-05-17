<template>
	<div :class="classes">
		<div class="inx-property-location-map__consent" v-show="!consentGranted">
			<p class="inx-property-location-map__privacy-note" v-html="privacyNote"></p>
			<button class="inx-button inx-button--action uk-button uk-button-primary" @click="grantConsent">{{ showMapButtonText }}</button>
		</div>

		<div class="ol-popup" ref="popup" v-show="consentGranted && infowindow">
			<a class="ol-popup-closer" ref="popupCloser" @click="closeInfoWindow"></a>
			<div ref="popupContent"></div>
		</div>

		<div :class="['inx-property-location-map__map', { 'inx-property-location-map__map--has-consent': consentGranted }]" ref="map"></div>
		<p class="inx-property-location-map__note" v-if="consentGranted && note">{{ note }}</p>
	</div>
</template>

<script>
/* OpenLayers */
import Map from 'ol/Map'
import Feature from 'ol/Feature'
import { Style, Icon } from 'ol/style'
import View from 'ol/View'
import Overlay from 'ol/Overlay'
import { Point } from 'ol/geom'
import { fromLonLat } from 'ol/proj'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import { OSM, XYZ, Vector } from 'ol/source'

import 'ol/ol.css';

/* UIkit */
import UIkit from 'uikit'

import { getSvgImgSrc } from '../shared_components'
import pinIconSvgSource from '../../assets/marker-pin.source.svg'

export default {
	name: 'inx-property-location-open-layers-map',
	props: {
		type: {
			type: String,
			default: 'osm'
		},
		options: {
			type: String,
			default: ''
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
		infowindow: {
			type: String,
			default: ''
		},
		note: {
			type: String,
			default: ''
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
			consentGranted: false
		}
	},
	computed: {
		olSourceType () {
			return this.type.indexOf('osm') !== -1 ? 'osm' : 'xyz'
		},
		classes () {
			let classes = this.wrapClasses.length > 0 ? this.wrapClasses.split(' ') : []
			classes.push('inx-property-location-map inx-property-location-map--type--olmap')
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

			const map = this.createMap()
			this.$nextTick(() => {
				map.updateSize()
			})
		},
		createMap () {
			/**
			 * The Map
			 */

			const that = this
			const mapElement = this.$refs.map
			const options = this.options ? JSON.parse(atob(this.options)) : {}

			const maxZoom = options.maxZoom || 18
			let currentZoom = this.zoom
			if (maxZoom && currentZoom > maxZoom) {
				currentZoom = maxZoom
			}

			const map = new Map({
				target: mapElement,
				layers: [
					new TileLayer({
						source: this.olSourceType == 'xyz' ? new XYZ(options) : new OSM(options)
					})
				],
				view: new View({
					center: fromLonLat([this.lng, this.lat]),
					zoom: currentZoom,
					minZoom: 0,
					maxZoom: maxZoom
				})
	        })

			const marker = new Feature({
				geometry: new Point(
					fromLonLat([this.lng, this.lat])
				)
			})

			const markerScale = this.markerScale ? Math.min(1, this.markerScale) : 1
			const iconAnchorY = 1 - markerScale * .1

			if (this.markerIconUrl) {
				/**
				 * Custom Marker Icon
				 */

				marker.setStyle(new Style({
					image: new Icon(({
						anchor: [.5, iconAnchorY],
						src: this.markerIconUrl,
						scale: markerScale
					}))
				}))
			} else {
				/**
				 * SVG Marker Pin
				 */

				const markerStyle = '--fillColor:' + this.markerFillColor
					+ ' ;--fillOpacity:' + this.markerFillOpacity
					+ ' ;--strokeWidth:' + this.markerStrokeWidth
					+ ' ;--strokeColor:' + this.markerStrokeColor

				const parser = new DOMParser();
				const pinSvgElement = parser.parseFromString(pinIconSvgSource, 'image/svg+xml').documentElement
				pinSvgElement.style.cssText = markerStyle

				if (markerScale !== 1) {
					pinSvgElement.setAttribute('width', Math.floor(pinSvgElement.getAttribute('width') * markerScale))
					pinSvgElement.setAttribute('height', Math.floor(pinSvgElement.getAttribute('height') * markerScale))
				}

				const pinSvgElementString = (new XMLSerializer()).serializeToString(pinSvgElement)

				marker.setStyle(new Style({
					image: new Icon({
						anchor: [0.5, iconAnchorY],
						src: 'data:image/svg+xml,' + getSvgImgSrc(pinSvgElementString)
					})
				}))
			}

			const vectorSource = new Vector({
				features: [marker]
			})

			const markerVectorLayer = new VectorLayer({
				source: vectorSource
			})

			map.addLayer(markerVectorLayer)

			if (this.infowindow) {
				/**
				 * Infowindow (PopUp)
				 */

				const container = this.$refs.popup;
				const content = this.$refs.popupContent;

				this.overlay = new Overlay({
					element: container,
					position: fromLonLat([this.lng, this.lat]),
					positioning: 'bottom-center',
					offset: [1, -50 * markerScale]
				})

				content.innerHTML = '<div class="inx-property-location-map__infowindow">' + this.infowindow + '</div>'

				map.addOverlay(this.overlay)
			}

			// Redraw map if placed on a tab when it becomes visible.
			UIkit.util.on('.inx-single-property__tabbed-content', 'shown', function () {
				map.updateSize()
			})

			return map
		},
		closeInfoWindow () {
			this.overlay.setPosition(undefined)
		}
	},
	mounted () {
		this.id = this._uid
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
		font-family: sans-serif;
		font-size: 12px;
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
