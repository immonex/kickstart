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
import gmapsInit from '../gmaps'

export default {
	name: 'inx-property-location-google-map',
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
		pinFillColor: {
			type: String,
			default: '#808080'
		},
		pinFillOpacity: {
			type: Number,
			default: .7
		},
		pinStrokeColor: {
			type: String,
			default: '#404040'
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
			google: null
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
			this.google = await gmapsInit(this.apiKey)
			this.createMap()
		},
		createMap() {
			if (!this.google) return

			const mapElement = this.$refs.map

			const map = new this.google.maps.Map(mapElement, {
				center: {lat: this.lat, lng: this.lng},
				zoom: this.zoom,
				disableDefaultUI: true,
				zoomControl: true
			})

			var markerIcon = {
				path: 'M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035 c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719 c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z',
				scale: .1,
				fillColor: this.pinFillColor,
				fillOpacity: this.pinFillOpacity,
				strokeColor: this.pinStrokeColor,
				strokeWeight: 2
			};

			const marker = new this.google.maps.Marker({
				map: map,
				icon: markerIcon,
				draggable: false,
				animation: this.google.maps.Animation.DROP,
				position: {lat: this.lat, lng: this.lng}
			})

			if (this.infowindow) {
				const infowindow = new this.google.maps.InfoWindow({
					pixelOffset: new this.google.maps.Size(0, 10),
					content: '<div class="inx-property-location-map__infowindow">' + this.infowindow + '</div>'
				})

				infowindow.open(map, marker)
			}
		}
	},
	mounted () {
		this.id = this._uid
		if (!this.requireConsent || this.$cookies.get('inx_consent_use_maps')) {
			this.grantConsent(null)
		}
	}
}
</script>
