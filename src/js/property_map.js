// Vue & Co.
import Vue from 'vue'
import axios from 'axios'
import debounce from 'debounce'

// immonex Kickstart Components
import PropertyOpenLayersMap from './components/PropertyOpenLayersMap.vue'

const $ = jQuery

async function updateMaps(event, requestParams) {
	let updateIDs = false
	if (typeof event === 'string') {
		updateIDs = event
	} else {
		updateIDs = $(event.target).data('dynamic-update')
	}
	if (!updateIDs) return

	if (['1', 'all'].indexOf(updateIDs.toString().trim().toLowerCase()) !== -1) {
		// Update all location map component instances.
		let tempUpdateIDs = []

		$('.inx-property-map-container').not('.inx-is-preview').each((index, mapElement) => {
			const elementID = $(mapElement).attr('id')
			if (elementID) {
				tempUpdateIDs.push(elementID)
			}
		})

		updateIDs = tempUpdateIDs.join(',')
	}

	for (const rawElementID of updateIDs.split(',')) {
		const elementID = rawElementID.trim()

		if ($('#' + elementID).length && $('#' + elementID).hasClass('inx-property-map-container')) {
			let url = inx_state.core.rest_base_url + 'immonex-kickstart/v1/properties/'
			url += '?inx-r-response=json_map_markers&inx-r-lang=' + inx_state.core.locale.substring(0, 2)
			if (requestParams) {
				if (typeof requestParams === 'string') {
					url += '&' + requestParams
				} else if (requestParams.paramsString) {
					url += '&' + requestParams.paramsString
				}
			}

			let markerSetID = 'inx-property-map'
			if (typeof inx_state.renderedInstances !== 'undefined') {
				const componentInstanceData = inx_state.renderedInstances[elementID] || {}
				if (componentInstanceData) {
					markerSetID = componentInstanceData.cid || markerSetID
					url += '&inx-r-cidata=' + encodeURIComponent(JSON.stringify(componentInstanceData))
				}
			}

			await axios
				.get(url)
				.then(response => {
					if (response.data) {
						inx_maps[markerSetID] = response.data
					}
				})
				.catch(err => err)
		}
	}
} // updateMaps

function initMapInstances() {
	$('#inx-property-map, .inx-property-map-container').each((index, map) => {
		const mapElementID = $(map).attr('id')

		if (!document.getElementById(mapElementID).__vue__) {
			inx_state.vue_instances.property_map = new Vue({
				el: '#' + mapElementID,
				components: {
					'inx-property-open-layers-map': PropertyOpenLayersMap
				}
			})
		}
	})
} // initMapInstances

async function init() {
	let requestParams = (new URL(document.location)).searchParams
	await updateMaps('all', requestParams.toString())

	initMapInstances()

	let debounceDelay = 600
	try {
		debounceDelay = inx_state.search.form_debounce_delay ? inx_state.search.form_debounce_delay : debounceDelay
	} catch {}

	$('.inx-property-search.inx-dynamic-update').on('search:change', debounce(updateMaps, debounceDelay))
} // init

export { init }
