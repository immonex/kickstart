// Vue & Co.
import Vue from 'vue'

// immonex Kickstart Components
import PropertyLocationOpenLayersMap from './components/PropertyLocationOpenLayersMap.vue'
import PropertyLocationGoogleMap from './components/PropertyLocationGoogleMap.vue'
import PropertyLocationGoogleEmbedMap from './components/PropertyLocationGoogleEmbedMap.vue'

const $ = jQuery

let wrapElementID = 'inx-property-details'

function init() {
	if (document.getElementById(wrapElementID)) {
		inx_state.vue_instances.property_details = new Vue({
			el: '#inx-property-details',
			components: {
				'inx-property-location-open-layers-map': PropertyLocationOpenLayersMap,
				'inx-property-location-google-map': PropertyLocationGoogleMap,
				'inx-property-location-google-embed-map': PropertyLocationGoogleEmbedMap
			}
		})
	} else {
		inx_state.vue_instances.property_details = []
		$('.inx-single-property__section').each(function(index) {
			$(this).attr('id', 'inx-single-property-section-' + index)
			inx_state.vue_instances.property_details[index] = new Vue({
				el: '#inx-single-property-section-' + index,
				components: {
					'inx-property-location-open-layers-map': PropertyLocationOpenLayersMap,
					'inx-property-location-google-map': PropertyLocationGoogleMap,
					'inx-property-location-google-embed-map': PropertyLocationGoogleEmbedMap
				}
			})
		})
	}

	const url = new URL(location)
	url.searchParams.delete('inx-backlink-url')
	history.replaceState(null, null, url)
} // init

export { init }
