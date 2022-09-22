import axios from 'axios'

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
			const componentInstanceData = JSON.stringify(inx_state.renderedInstances[elementID]) || ''
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

function init() {
	maybeHideEmptyFilterPanel()
	window.setTimeout(() => { $('.inx-property-search.inx-dynamic-update').on('search:change', updatePropertyLists) }, 2000)
} // init

export { init }
