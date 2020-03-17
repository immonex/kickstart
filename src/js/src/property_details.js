// Vue & Co.
import Vue from 'vue'

// immonex Kickstart Components
import PropertyLocationOpenLayersMap from './components/PropertyLocationOpenLayersMap.vue'
import PropertyLocationGoogleMap from './components/PropertyLocationGoogleMap.vue'
import PropertyLocationGoogleEmbedMap from './components/PropertyLocationGoogleEmbedMap.vue'

jQuery(document).ready(function($) {

	if (document.getElementById('inx-property-details')) {
		inx_state.vue_instances.property_details = new Vue({
			el: '#inx-property-details',
			components: {
				'inx-property-location-open-layers-map': PropertyLocationOpenLayersMap,
				'inx-property-location-google-map': PropertyLocationGoogleMap,
				'inx-property-location-google-embed-map': PropertyLocationGoogleEmbedMap
			}
		})
	}

})