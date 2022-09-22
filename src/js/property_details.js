// Vue & Co.
import Vue from 'vue'

// immonex Kickstart Components
import PropertyLocationOpenLayersMap from './components/PropertyLocationOpenLayersMap.vue'
import PropertyLocationGoogleMap from './components/PropertyLocationGoogleMap.vue'
import PropertyLocationGoogleEmbedMap from './components/PropertyLocationGoogleEmbedMap.vue'

const $ = jQuery

function initPropertyDetailInstances() {
	if (document.getElementById('inx-property-details')) {
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
} // initPropertyDetailInstances

function cleanLocationURL() {
	const url = new URL(location)
	url.searchParams.delete('inx-backlink-url')
	history.replaceState(null, null, url)
} // cleanLocationURL

function init() {
	initPropertyDetailInstances()
	cleanLocationURL()
} // init

export { init }
