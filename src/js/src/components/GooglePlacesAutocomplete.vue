<template>
	<div :class="wrapClasses">
		<div class="inx-location-autocomplete__consent" v-show="!consentGranted">
			<div class="inx-location-autocomplete__privacy-note" v-html="privacyNote"></div>
			<div class="inx-location-autocomplete__button">
				<button
					class="inx-button inx-button--action uk-button uk-button-primary uk-button-small"
					@click="grantConsent"
				>
					{{ consentButtonText }}
				</button>
			</div>
		</div>

		<input type="hidden" :id="this.name" :name="this.name" :value="this.transferValue">
		<input
			type="text"
			:placeholder="placeholder"
			:value="currentPlaceName"
			ref="input"
			@change="checkIfEmpty"
			v-on:keydown="checkEnter"
			:class="inputClasses"
			v-if="consentGranted"
		>
		</input>
	</div>
</template>

<script>
import gmapsInit from '../gmaps'
import debounce from 'debounce'

export default {
	name: 'inx-google-places-autocomplete',
	props: {
		name: String,
		value: {
			type: String,
			default: ''
		},
		placeholder: {
			type: String,
			default: ''
		},
		defaultBounds: {
			type: String,
			default: '' // ~ D-A-CH = '55.131903,3.368091,46.259782,17.298755'
		},
		countries: {
			type: String,
			default: 'de,at,ch,be,nl' // max. 5
		},
		wrapClasses: {
			type: String,
			default: 'inx-location-autocomplete'
		},
		inputClasses: {
			type: String,
			default: ''
		},
		apiKey: {
			type: String,
			default: ''
		},
		requireConsent: {
			type: Boolean,
			default: true
		},
		privacyNote: {
			type: String,
			default: ''
		},
		consentButtonText: {
			type: String,
			default: 'Agreed!'
		}
	},
	data: function() {
		return {
			autocomplete: {},
			currentPlace: {},
			currentPlaceName: '',
			transferValue: '',
			google: null,
			consentGranted: false
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
			this.initAutocomplete()
		},
		initAutocomplete: function() {
			if (!this.google) return

			let options = { types: ['(regions)'] }

			let bounds
			if (this.defaultBounds) {
				const tempBounds = this.defaultBounds.split(',')

				if (tempBounds.length === 4) {
					bounds = new this.google.maps.LatLngBounds(
						new this.google.maps.LatLng(parseFloat(tempBounds[0]), parseFloat(tempBounds[1])),
						new this.google.maps.LatLng(parseFloat(tempBounds[2]), parseFloat(tempBounds[3]))
					)

					options.bounds = bounds;
				}
			}

			let countries = []
			if (this.countries) {
				const tempCountries = this.countries.split(',')
				if (tempCountries.length > 0) {
					tempCountries.forEach(function(country) {
						countries.push(country.trim())
					})

					options.componentRestrictions = {}
					options.componentRestrictions.country = countries
				}
			}

			// Create the autocomplete object, restricting the search to geographical
			// location types.
			this.autocomplete = new this.google.maps.places.Autocomplete(
				this.$refs.input,
				options
			);

			// When the user selects an address from the dropdown, populate the address
			// fields in the form.
			this.autocomplete.addListener('place_changed', this.placeChanged);
		},
		placeChanged: function() {
			const place = this.autocomplete.getPlace()

			if (place) {
				this.currentPlaceName = this.$refs.input.value // place.name
				if (place.geometry) {
					const lat = place.geometry.location.lat()
					const lng = place.geometry.location.lng()
					const name = this.currentPlaceName // place.name

					if (lat && lng) this.transferValue = JSON.stringify([lat, lng, name])
				}
			}
		},
		checkIfEmpty: function(event) {
			if (event.target.value === '') {
				this.currentPlace = {}
				this.currentPlaceName = ''
				this.transferValue = ''
			}
		},
		checkEnter: function(event) {
			let isVisible = true
			const selectElements = document.getElementsByClassName('pac-container')
			if (selectElements.length > 0) {
				isVisible = selectElements[0].offsetParent !== null
			}

			// Prevent form submission per enter key when autocomplete dropdown
			// is visible.
			if (event.key === 'Enter' && isVisible) event.preventDefault()
		}
	},
	created () {
		let initialValue = ''
		try {
			initialValue = JSON.parse(this.value)
		} catch (e) {
			initialValue = ''
		}

		if (
			Array.isArray(initialValue) &&
			initialValue.length === 3
		) {
			// Intitial value is an array (Latitude, Longitude, Locality Name).
			// Set original string as transfer value.
			this.transferValue = this.value
			// Use locality name as input field value.
			this.currentPlaceName = initialValue[2]
		}
	},
	mounted () {
		if (!this.requireConsent ||	this.$cookies.get('inx_consent_use_maps')) {
			this.grantConsent(null)
		}
	}
}
</script>
