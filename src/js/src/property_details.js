// Vue & Co.
import Vue from 'vue'

// immonex Kickstart Components
import PropertyLocationOpenLayersMap from './components/PropertyLocationOpenLayersMap.vue'
import PropertyLocationGoogleMap from './components/PropertyLocationGoogleMap.vue'
import PropertyLocationGoogleEmbedMap from './components/PropertyLocationGoogleEmbedMap.vue'

jQuery(document).ready(function($) {

	if (!document.getElementById('inx-property-details')) {
		let startElement
		let parent
		let wrapElement
		const detailsElements = [
			'inx-single-property__head',
			'inx-single-property__section',
			'inx-single-property__tabbed-content',
			'inx-single-property__footer'
		]

		for (let i in detailsElements) {
			let elements = document.getElementsByClassName(detailsElements[i])
			if (elements.length > 0) {
				startElement = elements[0]
			}
		}

		function getWrapElement(startElement) {
			let parent = startElement.parentNode

			if (parent.id && parent.parentNode.tagName !== 'BODY') {
				parent = getWrapElement(parent).parentNode
			}

			return parent
		} // getWrapElement

		if (startElement) {
			wrapElement = getWrapElement(startElement)
			wrapElement.id = 'inx-property-details'
		}
	}

	inx_state.vue_instances.property_details = new Vue({
		el: '#inx-property-details',
		components: {
			'inx-property-location-open-layers-map': PropertyLocationOpenLayersMap,
			'inx-property-location-google-map': PropertyLocationGoogleMap,
			'inx-property-location-google-embed-map': PropertyLocationGoogleEmbedMap
		}
	})

	const url = new URL(location)
	url.searchParams.delete('inx-backlink-url')
	history.replaceState(null, null, url)

})