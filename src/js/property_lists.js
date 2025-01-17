import axios from 'axios'
import debounce from 'debounce'

const $ = jQuery

function maybeHideEmptyFilterPanel() {
	if (
		$('.inx-property-filters').length > 0 &&
		$('.inx-property-list.inx-property-list--is-empty').length > 0
	) {
		// Hide property filters/sort panel if an empty property list element exists.
		$('.inx-property-filters').hide()
	}
} // maybeHideEmptyFilterPanel

function updatePropertyLists(event, requestParams) {
	if (!requestParams.searchStateInitialized) return

	let updateIDs = $(event.target).data('dynamic-update') || false
	if (!updateIDs) return

	if (['1', 'all'].indexOf(updateIDs.toString().trim().toLowerCase()) !== -1) {
		// Update all property list component instances.
		let tempUpdateIDs = []

		$('.inx-property-list').each((index, mapElement) => {
			const elementID = $(mapElement).attr('id')
			if (elementID) {
				tempUpdateIDs.push(elementID)
			}
		})

		updateIDs = tempUpdateIDs.join(',')
	}

	let url = requestParams.url.replace('inx-r-response=count', 'inx-r-response=html')

	for (const rawElementID of updateIDs.split(',')) {
		const elementID = rawElementID.trim()

		if ($('#' + elementID).length && $('#' + elementID).hasClass('inx-property-list')) {
			const componentInstanceData = inx_state.renderedInstances ?
				JSON.stringify(inx_state.renderedInstances[elementID]) || '' : false
			if (componentInstanceData) url += '&inx-r-cidata=' + encodeURIComponent(componentInstanceData)

			axios
				.get(url)
				.then(response => {
					if (response.data.list) {
						$('#' + elementID).replaceWith(response.data.list)
					}
					if (response.data.pagination && $('.inx-pagination').length > 0) {
						$('.inx-pagination').first().replaceWith(response.data.pagination)
					}
				})
				.catch(err => err)
		}
	}
} // updatePropertyLists

async function init() {
	maybeHideEmptyFilterPanel()

	let debounceDelay = 600
	try {
		debounceDelay = inx_state.search.form_debounce_delay ? inx_state.search.form_debounce_delay : debounceDelay
	} catch {}

	$('.inx-property-search.inx-dynamic-update').on('search:change', debounce(updatePropertyLists, debounceDelay))
} // init

export { init }
