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
import {Style, Icon} from 'ol/style'
import View from 'ol/View'
import Overlay from 'ol/Overlay'
import {Point} from 'ol/geom'

import {fromLonLat} from 'ol/proj'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import {OSM, Vector} from 'ol/source'

/* UIkit */
import UIkit from 'uikit'

export default {
	name: 'inx-property-location-open-layers-map',
	props: {
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
		markerIconUrl: false,
		markerIconScale: {
			type: Number,
			default: .5
		},
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

			const mapElement = this.$refs.map

			const map = new Map({
				target: mapElement,
				layers: [
					new TileLayer({
						source: new OSM()
					})
				],
				view: new View({
					center: fromLonLat([this.lng, this.lat]),
					zoom: this.zoom
				})
	        })

			if (this.markerIconUrl) {
				/**
				 * Marker Icon
				 */

				let marker = new Feature({
					geometry: new Point(
						fromLonLat([this.lng, this.lat])
					)
				})

				marker.setStyle(new Style({
					image: new Icon(({
						anchor: [0.5, 1],
						src: this.markerIconUrl,
						scale: this.markerIconScale
					}))
				}))

				const vectorSource = new Vector({
					features: [marker]
				})

				const markerVectorLayer = new VectorLayer({
					source: vectorSource
				})

				map.addLayer(markerVectorLayer)
			}

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
					offset: this.markerIconUrl ? [1, -26] : [0, 0]
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
		if (this.$cookies.get('inx_consent_use_maps')) {
			this.grantConsent(null)
		}
	}
}
</script>

<style lang="scss" scoped>
	.ol-popup {
		position: absolute;
		background-color: white;
		-webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
		filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
		padding: 15px;
		border-radius: 10px;
		border: 1px solid #cccccc;
		bottom: 12px;
		left: -50px;
		min-width: 280px;
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
		border-top-color: #cccccc;
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
