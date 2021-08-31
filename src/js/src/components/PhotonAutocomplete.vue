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
		<multiselect
			ref="mselect"
			v-model="currentPlace"
			label="name"
			track-by="ID"
			:placeholder="placeholder"
			open-direction="bottom"
			:options="locationSuggestions"
			:max-height=800
			:allow-empty="true"
			:hide-selected="false"
			:internal-search="false"
			:show-no-results="true"
			:show-labels="false"
			:loading="loading"
			@search-change="asyncSearchOptions"
			@select="localitySelected"
			v-if="consentGranted"
		>
			<span slot="noOptions">{{ noOptions }}</span>
			<span slot="noResult">{{ noResults }}</span>
		</multiselect>
	</div>
</template>

<script>
import axios from 'axios'
import debounce from 'debounce'
import Multiselect from 'vue-multiselect'
import Qs from 'qs'

export default {
	name: 'inx-photon-autocomplete',
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
		noOptions: {
			type: String,
			default: ''
		},
		noResults: {
			type: String,
			default: ''
		},
		countries: {
			type: String,
			default: 'Deutschland, Germany, Österreich, Austria, Schweiz, Switzerland, Luxemburg,' +
				'Luxembourg, Belgien, Belgium, Frankreich, France, Niederlande, Netherlands,' +
				'Dänemark, Denmark, Polen, Poland'
		},
		limit: {
			type: Number,
			default: 10
		},
		locationBiasLat: {
			type: Number,
			default: 51.163375 // Breitengrad des geographischen Mittelpunkts Deutschlands
		},
		locationBiasLng: {
			type: Number,
			default: 10.447683 // Längengrad des geographischen Mittelpunkts Deutschlands
		},
		locationBiasScale: {
			type: Number,
			default: 5
		},
		lang: {
			type: String,
			default: 'de'
		},
		wrapClasses: {
			type: String,
			default: 'inx-location-autocomplete'
		},
		inputClasses: {
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
			searchOptions: [],
			autocomplete: {},
			currentPlace: null,
			transferValue: '',
			filterCountries: [],
			locationSuggestions: [],
			loading: false,
			consentGranted: false
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
		},
		asyncSearchOptions: debounce(function (query) {
			if (query.length >= 3) {
				this.getLocationSuggestions(query)
				.then(localities => { this.locationSuggestions = localities })
			}
		}, 1000),
		getLocationSuggestions: async function (query) {
			this.loading = true
			let suggestions = []
			if (query.match(/^[0-9]{3,}([ ])?$/)) {
				query += ',DE'
			}

			try {
				var params = {
					q: query,
					// osm_tag: ['place:city', 'place:town', 'place:village', 'place:suburb', 'place:highway'],
					limit: 25
				}

				if (this.locationBiasLat) params.lat = this.locationBiasLat
				if (this.locationBiasLng) params.lon = this.locationBiasLng
				if (this.locationBiasScale) params.location_bias_scale = this.locationBiasScale
				if (this.lang) params.lang = this.lang

				const geoPrediction = await axios.get(
					'https://photon.komoot.io/api/',
					{
						params,
						paramsSerializer: params => {
							return Qs.stringify(params, { indices: false })
						}
					}
				).catch(err => err)

				if (geoPrediction instanceof Error) {
					this.loading = false
					return suggestions
				}

				let data = geoPrediction.data
				let that = this

				if (data.hasOwnProperty('type') && data.type === 'FeatureCollection') {
					data.features.forEach(function (locality) {
						if (
							(that.limit > 0 && suggestions.length === that.limit) ||
							locality.geometry.type !== 'Point' ||
							! locality.properties.city
						) return

						if (
							that.filterCountries.indexOf(locality.properties.country) !== -1 ||
							that.filterCountries.length === 0
						) {
							let localityName = locality.properties.name;
							let typeOrder = 30
							let countryOrder = 10

							if (
								locality.properties.osm_value === 'city' ||
								locality.properties.osm_value === 'town' ||
								locality.properties.osm_value === 'village'
							) {
								typeOrder = 10
							} else if (locality.properties.osm_value === 'suburb') {
								if (locality.properties.city) {
									localityName = localityName.concat(' (' + locality.properties.city + ')')
								}

								typeOrder = 20
							} else if (locality.properties.city) {
								localityName = locality.properties.city
								if (locality.properties.district && locality.properties.district !== localityName) {
									localityName += ' (' + locality.properties.district + ')'
								} else if (locality.properties.locality && locality.properties.locality !== localityName) {
									localityName += ' (' + locality.properties.locality + ')'
								}
							}

							let state = locality.properties.state ? locality.properties.state : ''

							if (state && suggestions.filter(element => element.name === localityName && element.state !== state).length > 0) {
								localityName = localityName.concat(', ' + state)
							}

							if (suggestions.find(element => element.name === localityName)) return

							if (
								that.filterCountries.length > 0 &&
								locality.properties.country !== that.filterCountries[0]
							) {
								localityName = localityName.concat(', ', locality.properties.country)
								countryOrder = 20
							}

							suggestions.push({
								ID: locality.properties.osm_id,
								name: localityName,
								type: locality.properties.osm_type,
								typeOrder: typeOrder,
								country: locality.properties.country,
								countryOrder: countryOrder,
								state: state,
								lat: locality.geometry.coordinates[1],
								lng: locality.geometry.coordinates[0]
							})
						}
					})
				}
			} catch (e) {
				this.loading = false
				return suggestions
			}

			if ( suggestions.length > 0 ) {
				suggestions.sort((a, b) => {
					if (a.countryOrder === b.countryOrder) {
						if (a.typeOrder === b.typeOrder) {
							return a.name > b.name ? 1 : -1
						} else {
							return a.typeOrder > b.typeOrder ? 1 : -1
						}
					} else {
						return a.countryOrder > b.countryOrder ? 1 : -1
					}
				})
			}

			this.loading = false

			return suggestions
		},
		localitySelected (locality) {
			this.transferValue = JSON.stringify([locality.lat, locality.lng, locality.name])

			let el = document.getElementById(this.name)
			if ('createEvent' in document) {
				let evt = document.createEvent('HTMLEvents')
				evt.initEvent('change', false, true)
				el.dispatchEvent(evt)
			} else {
				el.fireEvent('onchange')
			}
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
			this.currentPlace = {
				ID: 0,
				name: initialValue[2],
				lat: initialValue[0],
				lng: initialValue[1]
			}
		}
	},
	mounted () {
		this.filterCountries = this.countries.split(',').map(name => name.trim())

		if (
			!this.requireConsent ||
			this.$cookies.get('inx_consent_use_maps')
		) {
			this.grantConsent(null)
		}
	},
	components: {
		Multiselect
	}
}
</script>
