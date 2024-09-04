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

		<input ref="transfer" type="hidden" :name="name" :value="transferValue">
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
			@remove="localityRemoved"
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
import 'vue-multiselect/dist/vue-multiselect.min.css'

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
			default: 'de,at,ch,lu,be,fr,nl,dk,pl,es,pt,it,gr'
		},
		limit: {
			type: Number,
			default: 10
		},
		locationBiasLat: {
			type: Number,
			default: 51.163375 // Latitude of the geographical center of Germany
		},
		locationBiasLng: {
			type: Number,
			default: 10.447683 // Longitude of the geographical center of Germany
		},
		locationBiasScale: {
			type: Number,
			default: 5
		},
		lang: {
			type: String,
			default: 'de'
		},
		osmPlaceTags: {
			type: String,
			default: 'city,town,village,borough,suburb'
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
			filterCountriesAreCodes: false,
			filterPlaceTags: [],
			filterPlaceQueryTags: [],
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
					osm_tag: this.filterPlaceQueryTags,
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
							! locality.geometry.coordinates ||
							(! locality.properties.city && !locality.properties.name)
						) return

						let countryIndex = that.getCountryIndex(locality)

						if (countryIndex !== false) {
							let localityName = locality.properties.name
							let localityType = locality.properties.osm_value
							let typeOrder = that.filterPlaceTags.indexOf(localityType)

							if (
								['borough', 'suburb'].includes(localityType)
								&& locality.properties.city
							) {
								localityName = localityName += ' (' + locality.properties.city + ')'
							}


							if (
								!['city', 'town', 'village', 'borough', 'suburb'].includes(localityType) &&
								locality.properties.city
							) {
								localityName = locality.properties.city
								if (locality.properties.district && locality.properties.district !== localityName) {
									localityName += ' (' + locality.properties.district + ')'
								} else if (locality.properties.locality && locality.properties.locality !== localityName) {
									localityName += ' (' + locality.properties.locality + ')'
								}
							}

							let state = locality.properties.state ? locality.properties.state : ''

							if (
								state &&
								suggestions.filter(element => element.name === localityName && element.state !== state).length > 0
							) {
								localityName += ', ' + state
							}

							if (countryIndex !== 1) {
								localityName += ', ' + locality.properties.country
							}

							if (suggestions.find(element => element.name === localityName)) return

							suggestions.push({
								ID: locality.properties.osm_id,
								name: localityName,
								type: locality.properties.osm_value,
								typeOrder: typeOrder,
								country: locality.properties.country,
								countryOrder: countryIndex,
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
		getCountryIndex(locality) {
			if (this.filterCountries.length === 0) return 0

			let index

			if (this.filterCountriesAreCodes) {
				index = this.filterCountries.indexOf(locality.properties.countrycode)

				return index !== -1 ? index + 1 : false
			} else {
				index = this.filterCountries.indexOf(locality.properties.country.toUpperCase())
				if (index === -1) return false
				if (index === 0) return 1

				/**
				 * Divide index by 2 and round up, because country NAME based lists
				 * contain the names in English and German.
				 */
				return Math.ceil(index / 2)
			}
		},
		localitySelected (locality) {
			this.transferValue = JSON.stringify([locality.lat, locality.lng, locality.name])
			this.fireDOMChangeEvent()
		},
		localityRemoved (locality) {
			this.transferValue = ''
			this.fireDOMChangeEvent()
		},
		fireDOMChangeEvent () {
			const el = this.$refs.transfer
			if ('createEvent' in document) {
				const evt = document.createEvent('HTMLEvents')
				evt.initEvent('change', false, true)
				el.dispatchEvent(evt)
			} else {
				el.fireEvent('onchange')
			}
		},
		reset (event) {
			this.currentPlace = ''
			this.transferValue = ''
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
			// Use stringified version of initial value as transfer value (latitude, longitude, locality name).
			this.transferValue = JSON.stringify([initialValue[0], initialValue[1], initialValue[2]])

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
		this.filterCountries = this.countries.split(',').map(name => name.toUpperCase().trim()).filter(e => e)
		this.filterCountriesAreCodes = this.filterCountries.length > 0 && this.filterCountries[0].length === 2

		this.filterPlaceTags = this.osmPlaceTags.split(',').map(name => name.toLowerCase().trim()).filter(e => e)
		if (this.filterPlaceTags.length === 0) this.filterPlaceTags = ['city', 'town', 'village', 'borough', 'suburb']
		this.filterPlaceQueryTags = this.filterPlaceTags.map(name => 'place:' + name)

		if (
			!this.requireConsent ||
			this.$cookies.get('inx_consent_use_maps')
		) {
			this.grantConsent(null)
		}

		this.$refs.transfer.addEventListener('reset', this.reset)
	},
	components: {
		Multiselect
	}
}
</script>
