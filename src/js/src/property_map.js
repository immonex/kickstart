// Vue & Co.
import Vue from 'vue'

// immonex Kickstart Components
import PropertyOpenLayersMap from './components/PropertyOpenLayersMap.vue'

function init() {
	inx_state.vue_instances.property_map = new Vue({
		el: '#inx-property-map',
		components: {
			'inx-property-open-layers-map': PropertyOpenLayersMap
		}
	})
} // init

export { init }
