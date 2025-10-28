<template>
	<div :class="classes">
		<div class="inx-property-location-map__consent" v-show="!consentGranted">
			<p class="inx-property-location-map__privacy-note" v-html="privacyNote"></p>
			<button class="inx-button inx-button--action uk-button uk-button-primary" @click="grantConsent">{{ showMapButtonText }}</button>
		</div>

		<div :class="['inx-property-location-map__map', { 'inx-property-location-map__map--has-consent': consentGranted }]" ref="map"></div>
		<p class="inx-property-location-map__note" v-if="consentGranted && note">{{ note }}</p>
	</div>
</template>

<script>
import { setOptions, importLibrary } from "@googlemaps/js-api-loader"

import { getSvgImgSrc } from '../shared_components'
import pinIconSvgSource from '../../assets/marker-pin.source.svg'

export default {
	name: 'inx-property-location-google-map',
	props: {
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
		apiKey: {
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
			consentGranted: false,
			google: null,
			defaultMapTypeId: 'terrain'
		}
	},
	computed: {
		classes () {
			let classes = this.wrapClasses.length > 0 ? this.wrapClasses.split(' ') : []
			classes.push('inx-property-location-map inx-property-location-map--type--gmap-marker')
			classes = classes.filter(function (value, index, self) {
				return self.indexOf(value) === index
			})

			return classes.join(' ')
		}
	},
	methods: {
		async grantConsent (event) {
			if (event) {
				// Consent button clicked.
				event.preventDefault()
				this.$cookies.set('inx_consent_use_maps', true)
			}

			this.consentGranted = true

			setOptions({
				key: this.apiKey,
				v: 'weekly'
			})

			this.google = {
				core: await importLibrary('core'),
				maps: await importLibrary('maps'),
				marker: await importLibrary('marker')
			}

			this.createMap()
		},
		createMap() {
			if (!this.google) return

			const mapElement = this.$refs.map
			const options = this.options ? JSON.parse(atob(this.options)) : {}

			options.mapId = 'inx-property-location-map-' + this.id
			if (!options.center) options.center = {}
			options.center.lat = this.lat
			options.center.lng = this.lng
			options.zoom = this.zoom

			if (!options.mapTypeId) options.mapTypeId = this.defaultMapTypeId
			if (!options.disableDefaultUI) options.disableDefaultUI = true
			if (!options.zoomControl) options.zoomControl = true

			const map = new this.google.maps.Map(mapElement, options)
			const markerScale = this.markerScale ? Math.min(1, this.markerScale) : 1
			let markerContent

			if (this.markerIconUrl) {
				/**
				 * Custom Marker Icon
				 */

				const markerIconImg = document.createElement('img')
				markerIconImg.src =	this.markerIconUrl

				if (this.markerScale != 1) {
					markerIconImg.style.cssText = 'width:' + (markerScale * 100) + '%' + '; height:auto; margin-left:' + ((1 - markerScale) / 2 * 100) + '%'
				}

				markerContent = markerIconImg
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

				if (markerScale != 1) {
					pinSvgElement.setAttribute('width', Math.floor(pinSvgElement.getAttribute('width') * markerScale))
					pinSvgElement.setAttribute('height', Math.floor(pinSvgElement.getAttribute('height') * markerScale))
				}

				markerContent = pinSvgElement
			}

			const marker = new this.google.marker.AdvancedMarkerElement({
				map: map,
				content: markerContent,
				position: {lat: this.lat, lng: this.lng},
			})

			if (this.infowindow) {
				const infowindow = new this.google.maps.InfoWindow({
					headerDisabled: true,
					pixelOffset: new this.google.core.Size(0, 5),
					content: '<div class="inx-property-location-map__infowindow">' + this.infowindow + '</div>'
				})

				infowindow.open(map, marker)
			}
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
