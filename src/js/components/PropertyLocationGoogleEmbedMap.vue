<template>
	<div :class="classes">
		<div class="inx-property-location-map__consent" v-show="!consentGranted">
			<p class="inx-property-location-map__privacy-note" v-html="privacyNote"></p>
			<button class="inx-button inx-button--action uk-button uk-button-primary" @click="grantConsent">{{ showMapButtonText }}</button>
		</div>

		<div class="inx-property-location-map__map inx-property-location-map__map--has-consent" v-if="consentGranted">
			<iframe
			  frameborder="0" style="width:100%; height:100%; border:0" allowfullscreen
			  :src="mapSrc" allowfullscreen>
			</iframe>
		</div>

		<p class="inx-property-location-map__note" v-if="consentGranted && note">{{ note }}</p>
	</div>
</template>

<script>
export default {
	name: 'inx-property-location-google-embed-map',
	props: {
		location: {
			type: String,
			default: ''
		},
		zoom: {
			type: Number,
			default: 12
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
			consentGranted: false
		}
	},
	computed: {
		classes () {
			let classes = this.wrapClasses.length > 0 ? this.wrapClasses.split(' ') : []
			classes.push('inx-property-location-map inx-property-location-map--type--gmap-embed')
			classes = classes.filter(function (value, index, self) {
				return self.indexOf(value) === index
			})

			return classes.join(' ')
		},
		mapSrc () {
			return `https://www.google.com/maps/embed/v1/place?key=${this.apiKey}&q=${this.location}&zoom=${this.zoom}`
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
