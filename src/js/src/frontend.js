// Vue
import Vue from 'vue'
inx_state.vue = Vue

// vue-cookies
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.$cookies.config('24h', '', '', process.env.NODE_ENV === 'production')

// UIkit
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'

inx_state.uikit = UIkit

UIkit.use(Icons)

// immonex Kickstart State
import inxState from './state'
Vue.mixin(inxState)

// (S)CSS
import '../../scss/frontend.scss'

let inxPropertyDetailsInitialized = false

// Lazy loaded Modules
jQuery(document).ready(function($) {
	// Shared Comoponents
	import(/* webpackChunkName: "shared_components" */ './shared_components').then((module) => { module.init() })

	// Property Search
	if (document.getElementById('inx-property-search')) {
		import(/* webpackChunkName: "property_search" */ './property_search').then((module) => { module.init() })
	}

	// Property Lists
	if (document.getElementsByClassName('inx-property-list').length > 0) {
		import(/* webpackChunkName: "property_lists" */ './property_lists').then((module) => { module.init() })
	}

	// Property Map
	if (document.getElementById('inx-property-map')) {
		import(/* webpackChunkName: "property_map" */ './property_map').then((module) => { module.init() })
	}

	// Property Details
	if (
		document.getElementById('inx-property-details') ||
		document.getElementsByClassName('inx-single-property__section').length > 0
	) {
		import(/* webpackChunkName: "property_details" */ './property_details').then((module) => {
			module.init()
			inxPropertyDetailsInitialized = true
		})
	}
})
