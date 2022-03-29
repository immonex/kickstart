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
const searchFormElementIDs = []

let searchStateInitialized = false
let currentSearchRequestParamsStrings = []

function resetSearchForm(event = null) {
	if (!event && searchFormElementIDs.length === 0) return;

	const searchForm = event ?
		$(event.target).closest('form')[0] :
		document.getElementById(searchFormElementIDs[0])

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
			element.name.substring(0, 11) === 'inx-search-'
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
	const searchFormIDs = event && typeof event === 'object' ?
		[$(event.target).closest('form').attr('id')] :
		searchFormElementIDs
	searchStateInitialized = true

	$.each(searchFormIDs, (iForm, searchFormID) => {
		const formIndex = searchFormElementIDs.indexOf(searchFormID)
		const searchForm = $('#' + searchFormID)
		const formData = searchForm.serializeArray()

		$.each(formData, function (i, field) {
			const fieldNameStore = field.name.replace(/\[\]$/, '')
			const containsMultipleValues = field.name.match(/\[\]$/)

			if (!containsMultipleValues) {
				inx_state.search.forms[formIndex][fieldNameStore] = field.value
				return
			}

			if (typeof inx_state.search.forms[formIndex][fieldNameStore] === 'undefined') {
				inx_state.search.forms[formIndex][fieldNameStore] = []
			} else if (typeof inx_state.search.forms[formIndex][fieldNameStore] === 'string') {
				inx_state.search.forms[formIndex][fieldNameStore] = [inx_state.search.forms[formIndex][fieldNameStore]]
			}
			inx_state.search.forms[formIndex][fieldNameStore].push(field.value)
		})

		// Generate a parameter string for a GET search request excluding empty form fields.
		let requestParamsString = $('#' + searchFormID).find('input, select')
			.filter(function(i, field) {
				return $(field).val() !== ''
			})
			.serialize()

		let url = inx_state.core.rest_base_url + 'immonex-kickstart/v1/properties/'
		url += '?inx-r-response=count&inx-r-lang=' + inx_state.core.locale.substring(0, 2)
		let backlinkURL = $(searchForm).attr('action') || window.location.href.split('?')[0]
		if (requestParamsString) {
			url += '&' + requestParamsString
			backlinkURL += (backlinkURL.indexOf('?') === -1 ? '?' : '&') + requestParamsString
		}
		url += '&inx-backlink-url=' + encodeURIComponent(backlinkURL)

		if (requestParamsString !== currentSearchRequestParamsStrings[formIndex]) {
			currentSearchRequestParamsStrings[formIndex] = requestParamsString

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

		if (event) {
			const specialParams = {}
			searchForm.find("select, input").not("[type='hidden']").each((index, field) => {
				if (
					$(field).attr('name').substring(0, 4) === 'inx-' &&
					$(field).attr('name').substring(0, 11) !== 'inx-search-' &&
					$(field).val()
				) {
					specialParams[$(field).attr('name')] = $(field).val()
				}
			})

			let changeParams = {
				url: url,
				paramsString: requestParamsString,
				specialParams: specialParams
			}
			searchForm.closest('.inx-property-search').trigger('search:change', changeParams)
		}
	})
} // updateSearchState

function updateFiltersSortRequestParams(event, requestParams) {
	let elementID = false
	const updateIDs = $(event.target).data('dynamic-update') || false
	if (!updateIDs) return

	if (['1', 'all'].indexOf(updateIDs.toString().trim().toLowerCase()) !== -1) {
		// Update all property filter/sort component instances.
		$('.inx-property-filters').each((index, filterSortElement) => {
			elementID = $(filterSortElement).attr('id')
			if (elementID) {
				inx_state.renderedInstances[elementID].requestParamsString = requestParams.paramsString || ''
			}
		})
	} else {
		for (const rawElementID of updateIDs.split(',')) {
			elementID = rawElementID.trim()

			if ($('#' + elementID).length && $('#' + elementID).hasClass('inx-property-filters')) {
				// Update all property filter/sort component instance with the given ID.
				inx_state.renderedInstances[elementID].requestParamsString = requestParams.paramsString || ''
			}
		}
	}

	if (elementID && typeof requestParams.specialParams['inx-sort'] !== 'undefined') {
		$('#' + elementID + " select[name='inx-sort']").val(requestParams.specialParams['inx-sort'])
	}
} // updateFiltersSortRequestParams

function changeSortOrder(event) {
	const filterSortForm = $(event.target).closest('form')
	const filterElementID = $(event.target).closest('.inx-property-filters').attr('id')

	if (
		filterElementID &&
		typeof inx_state.renderedInstances[filterElementID] !== 'undefined' &&
		typeof inx_state.renderedInstances[filterElementID].requestParamsString !== 'undefined'
	) {
		/**
		 * Parameters have been set dynamically via a search form component:
		 * Delete all search related hidden fields first and add new ones with
		 * the current values before submitting the sort/filter form.
		 */
		filterSortForm.find("input[type='hidden']").each((index, field) => {
			if ($(field).attr('name').substring(0, 11) === 'inx-search-') {
				$(field).remove()
			}
		})

		const paramsString = inx_state.renderedInstances[filterElementID].requestParamsString

		for (const param of paramsString.split('&')) {
			const keyValue = param.split('=')

			if (keyValue.length === 2 && keyValue[0] !== 'inx-sort') {
				/**
				 * Add new hidden fields with updated search values (except the sort order
				 * also existent in the search form).
				 */
				const input = $('<input>')
					.attr('type', 'hidden')
					.attr('name', keyValue[0])
					.val(keyValue[1])
				filterSortForm.append(input)
			}
		}
	}

	/**
	 * If dynamic updates based on the current search parameters are enabled,
	 * update the (probably hidden) sort element of the search form element
	 * if the sort order has been changed via the filter/sort bar.
	 */

	if ($('.inx-property-search.inx-dynamic-update').length) {
		$('.inx-property-search.inx-dynamic-update').each((index, searchForm) => {
			$($(searchForm).data('dynamic-update').split(',')).each((indexSplit, updateIDs) => {
				$(searchForm).find("[name='inx-sort']").val($(event.target).val())
			})
		})

		// Dynamic updates via search form instead of page reload.
		updateSearchState(true)
	} else {
		filterSortForm.submit()
	}
} // changeSortOrder

function submitSearchFormData() {
	/**
	 * Disable empty input and select elements to prevent empty
	 * GET parameters in the resulting URL.
	 */
	$(this).find('input, select')
		.filter(function() {
			return !this.value || $.trim(this.value).length == 0;
		})
		.attr('disabled', true);

	if ($(this).serializeArray().length === 0) {
		/**
		 * Reload the page only if no search parameters have been specified
		 * to prevent a trailing ? in the resulting URL.
		 */
		window.location = this.action
		return false
	}

	return true
} // submitSearchFormData

function initDatePickerFields() {
	let flatpickrOptions = { 'disableMobile': true }
	if ('de' === inx_state.core.locale.substring(0, 2)) {
		$.extend(flatpickrOptions, {
			'locale': German,
			'altInput': true,
			'altFormat': 'd.m.Y'
		})
	}
	$('.inx-search-input--type--date').flatpickr(flatpickrOptions)
} // initDatePickerFields

function initSearchFormInstances() {
	inx_state.vue_instances.property_search_forms = []

	$('.inx-property-search').each((index, searchForm) => {
		if (typeof inx_state.search.forms === 'undefined') {
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
			searchFormElementIDs.push(formEl.id)
			inx_state.search.forms[index].formElID = formEl.id

			$(searchFormElID + ' input, ' + searchFormElID + ' select')
				.not("[name='inx-search-distance-search-location']")
				.on('change', debounce(updateSearchState, 500))
			$(searchFormElID + ' .inx-form-reset').on('click', resetSearchForm)

			$(searchFormElID).submit(submitSearchFormData)
		})
	})

	if (inx_state.vue_instances.property_search_forms.length > 0) {
		inx_state.vue_instances.property_search = inx_state.vue_instances.property_search_forms[0]
	}
} // initSearchFormInstances

function init() {
	initSearchFormInstances()
	initDatePickerFields()
	$(".inx-property-filters select[name='inx-sort']").on('change', changeSortOrder)

	window.setTimeout(function() {
		$('.inx-property-search.inx-dynamic-update').on('search:change', updateFiltersSortRequestParams)

		if (!searchStateInitialized) updateSearchState();
	}, 1000)
} // init

export { init }
