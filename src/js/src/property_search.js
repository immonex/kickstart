// Vue & Co.
import Vue from 'vue'
import axios from 'axios'
import debounce from 'debounce'

// noUiSlider
import noUiSlider from 'nouislider'

// flatpickr
import flatpickr from 'flatpickr'
import { German } from 'flatpickr/dist/l10n/de.js'

// immonex Kickstart Components
import RangeSlider from './components/RangeSlider.vue'
import NumberOfMatches from './components/NumberOfMatches.vue'
import PhotonAutocomplete from './components/PhotonAutocomplete.vue'
import GooglePlacesAutocomplete from './components/GooglePlacesAutocomplete.vue'
import SearchSubmitButton from './components/SearchSubmitButton.vue'
import Toggle from './components/Toggle.vue'

const $ = jQuery
const inxSearchFormElementIDs = []

let inxCurrentSearchRequestStrings = []

function toggleExtendedSearch() {
	// Not implemented / required yet.
} // toggleExtendedSearch

function resetSearchForm(event = null) {
	if (!event && inxSearchFormElementIDs.length === 0) return;

	const searchForm = event ?
		$(event.target).closest('form')[0] :
		document.getElementById(inxSearchFormElementIDs[0])

	let searchFormID = '#' + searchForm.id

	searchForm.reset()

	$(searchFormID + ' .inx-range-slider__nouislider').each(function(index, element) {
		const min = element.noUiSlider.options.range.min
		const max = element.noUiSlider.options.range.max
		const currentValue = element.noUiSlider.get()

		if (Array.isArray(currentValue)) {
			element.noUiSlider.set([min, max])
		} else {
			element.noUiSlider.set(min)
		}
	})

	$(searchFormID + ' select').each(function(index, element) {
		element.value = $(element).data('default')
	})

	$(searchFormID + ' .multiselect__single').each(function(index, element) {
		$(element).remove()
	})

	$(
		searchFormID + ' input[type="search"]' +
		', ' + searchFormID + ' input[type="text"]' +
		', ' + searchFormID + ' input[type="hidden"]'
	).each(function(index, element) {
		if (
			!$(element).data('no-reset') &&
			element.name.substring(0, inx_state.core.public_prefix.length + 7) === inx_state.core.public_prefix + 'search-'
		) {
			element.value = ''
		}
	})

	$(searchFormID + ' input[type="checkbox"]').each(function(index, element) {
		element.checked = false
	})

	$(searchFormID + ' .inx-form-element--radio input[type="radio"]').first().checked = true

	updateSearchState(event)

	return false
} // resetSearchForm

function updateSearchState(event = null) {
	const searchFormIDs = event ? [$(event.target).closest('form').attr('id')] : inxSearchFormElementIDs

	$.each(searchFormIDs, (i, searchFormID) => {
		const formIndex = inxSearchFormElementIDs.indexOf(searchFormID)
		const searchForm = $('#' + searchFormID)
		const formData = searchForm.serializeArray()

		$.each(formData, function (i, field) {
		 	let fieldNameStore = field.name.replace(/\[\]$/, '')

			if (
				typeof inx_state.search.forms[formIndex][field.name] === 'undefined' &&
				!field.name.match(/\[\]$/)
			) {
				inx_state.search.forms[formIndex][fieldNameStore] = field.value
			} else if (
				typeof inx_state.search.forms[formIndex][field.name] === 'undefined' &&
				field.name.match(/\[\]$/)
			) {
				inx_state.search.forms[formIndex][fieldNameStore] = [field.value]
			} else if (
				Array.isArray(inx_state.search.forms[formIndex][field.name])
			) {
				inx_state.search.forms[formIndex][fieldNameStore].push(field.value)
			} else if (typeof inx_state.search.forms[formIndex][field.name] === 'string') {
				inx_state.search.forms[formIndex][fieldNameStore] = [inx_state.search.forms[formIndex][field.name], field.value]
			}
		})

		let requestString = searchForm.serialize()

		if (requestString !== inxCurrentSearchRequestStrings[formIndex]) {
			inxCurrentSearchRequestStrings[formIndex] = requestString
			if (!inx_state.search.request_strings) {
				inx_state.search.request_strings = []
			}
			inx_state.search.request_strings[formIndex] = requestString

			let url = inx_state.core.rest_base_url + 'immonex-kickstart/v1/properties/'
			url += url.indexOf('?') === -1 ? '?' : '&'
			url += 'count=1&lang=' + inx_state.core.locale.substring(0, 2) + '&' + requestString

			axios
				.get(url)
				.then(response => {
					inx_state.search.forms[formIndex].numberOfMatches = response.data
					if (formIndex === 0) {
						inx_state.search.number_of_matches = response.data
					}

					inx_state.search = Object.assign({}, inx_state.search)
				})
				.catch(err => err)
		}
	})
} // updateSearchState

function init() {
	if (document.getElementById(inx_state.core.public_prefix + 'sort')) {
		$('#' + inx_state.core.public_prefix + 'sort').on('change', function() {
			$(this).closest('form').submit()
		})
	}

	inx_state.vue_instances.property_search_forms = []
	$('.inx-property-search').each((index, searchForm) => {
		if (!inx_state.search.forms) {
			inx_state.search.forms = []
		}
		inx_state.search.forms.push({
			id: searchForm.id,
			numberOfMatches: ''
		})

		inx_state.vue_instances.property_search_forms.push(
			new Vue({
				el: "#" + searchForm.id,
				components: {
					'inx-range-slider': RangeSlider,
					'inx-number-of-matches': NumberOfMatches,
					'inx-photon-autocomplete': PhotonAutocomplete,
					'inx-google-places-autocomplete': GooglePlacesAutocomplete,
					'inx-search-submit-button': SearchSubmitButton,
					'inx-toggle': Toggle
				}
			})
		)

		$(searchForm).children('form').each((indexFormEl, formEl) => {
			const searchFormElID = '#' + formEl.id
			inxSearchFormElementIDs.push(formEl.id)
			inx_state.search.forms[index].formElID = formEl.id

			$(searchFormElID + ' input, ' + searchFormElID + ' select').on('change', debounce(updateSearchState, 500))
			$(searchFormElID + ' .inx-form-reset').on('click', resetSearchForm)
		})
	})

	if (inx_state.vue_instances.property_search_forms.length > 0) {
		inx_state.vue_instances.property_search = inx_state.vue_instances.property_search_forms[0]
	}

	let flatpickrOptions = { 'disableMobile': true }
	if ('de' === inx_state.core.locale.substring(0, 2)) {
		$.extend(flatpickrOptions, {
			'locale': German,
			'altInput': true,
			'altFormat': 'd.m.Y'
		})
	}
	$('.inx-search-input--type--date').flatpickr(flatpickrOptions)

	// DEPRECATED
	// window.setTimeout( function() { updateSearchState() }, 1000 )
} // init

export { init }
