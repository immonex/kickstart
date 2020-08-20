// Vue & Co.
import Vue from 'vue'
import axios from 'axios'
import debounce from 'debounce'

// noUiSlider
import noUiSlider from 'nouislider'

// immonex Kickstart Components
import RangeSlider from './components/RangeSlider.vue'
import NumberOfMatches from './components/NumberOfMatches.vue'
import PhotonAutocomplete from './components/PhotonAutocomplete.vue'
import GooglePlacesAutocomplete from './components/GooglePlacesAutocomplete.vue'
import SearchSubmitButton from './components/SearchSubmitButton.vue'
import Toggle from './components/Toggle.vue'

jQuery(document).ready(function($) {

	if (document.getElementById('inx-property-search')) {
		function toggleExtendedSearch() {
			// Not implemented / required yet.
		} // toggleExtendedSearch

		function resetSearchForm() {
			const searchForm = document.getElementById(searchFormElementName)
			searchForm.reset()

			$('.inx-range-slider__nouislider').each(function(index, element) {
				const min = element.noUiSlider.options.range.min
				const max = element.noUiSlider.options.range.max
				const currentValue = element.noUiSlider.get();

				if (Array.isArray(currentValue)) {
					element.noUiSlider.set([min, max])
				} else {
					element.noUiSlider.set(min)
				}
			})

			$('#' + searchFormElementName + ' select').each(function(index, element) {
				element.value = $(element).data('default');
			})

			$('#' + searchFormElementName + ' input[type="search"],' + '#' + searchFormElementName + ' input[type="hidden"]').each(function(index, element) {
				if (element.name.substring(0, inx_state.core.public_prefix.length + 7) === inx_state.core.public_prefix + 'search-') {
					element.value = ''
				}
			})

			$('#' + searchFormElementName + ' input[type="checkbox"]').each(function(index, element) {
				element.checked = false;
			})

			$('#' + searchFormElementName + ' .inx-form-element--radio input[type="radio"]').first().checked = true;

			updateSearchState()

			return false
		} // resetSearchForm

		function updateSearchState() {
			const searchForm = $('#' + searchFormElementName)
			const formData = searchForm.serializeArray()
			inx_state.search = {
				number_of_matches: inx_state.search.number_of_matches
			}

			$.each(formData, function (i, field) {
			 	let fieldNameStore = field.name.replace(/\[\]$/, '')

				if (
					typeof inx_state.search[field.name] === 'undefined' &&
					!field.name.match(/\[\]$/)
				) {
					inx_state.search[fieldNameStore] = field.value
				} else if (
					typeof inx_state.search[field.name] === 'undefined' &&
					field.name.match(/\[\]$/)
				) {
					inx_state.search[fieldNameStore] = [field.value]
				} else if (Array.isArray(inx_state.search[field.name])) {
					inx_state.search[fieldNameStore].push(field.value)
				} else if (typeof inx_state.search[field.name] === 'string') {
					inx_state.search[fieldNameStore] = [inx_state.search[field.name], field.value]
				}
			})

			inx_state.search.request_string = searchForm.serialize()

			axios
				.get(inx_state.core.site_url + '/wp-json/immonex-kickstart/v1/properties/?count=1&' + searchForm.serialize())
				.then(response => (inx_state.search.number_of_matches = response.data))
		} // updateSearchState

		const searchFormElementName = inx_state.core.public_prefix + 'property-search-main-form'

		inx_state.vue_instances.property_search = new Vue({
			el: '#inx-property-search',
			components: {
				'inx-range-slider': RangeSlider,
				'inx-number-of-matches': NumberOfMatches,
				'inx-photon-autocomplete': PhotonAutocomplete,
				'inx-google-places-autocomplete': GooglePlacesAutocomplete,
				'inx-search-submit-button': SearchSubmitButton,
				'inx-toggle': Toggle
			}
		})

		$('#' + inx_state.core.public_prefix + 'sort').change(function() {
			$(this).closest('form').submit()
		})

		$('#' + searchFormElementName + ' input, #' + searchFormElementName + ' select').change(debounce(updateSearchState, 500))
		$('#inx-search-form-reset').click(resetSearchForm);

		window.setTimeout( function() { updateSearchState() }, 1000 );
	}

})