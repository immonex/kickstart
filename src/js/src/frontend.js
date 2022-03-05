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
	import(/* webpackChunkName: "shared_components" */ './shared_components').then((module) => {
		inx_state.shared = module;
		module.init()
	})

	// Property Search/Filters/Sort
	if (
		document.getElementsByClassName('inx-property-search').length > 0 ||
		document.getElementsByClassName('inx-property-filters').length > 0 ||
		document.getElementById('inx-sort')
	) {
		import(/* webpackChunkName: "property_search" */ './property_search').then((module) => { module.init() })
	}

	// Property Lists
	if (document.getElementsByClassName('inx-property-list').length > 0) {
		import(/* webpackChunkName: "property_lists" */ './property_lists').then((module) => { module.init() })
	}

	// Property Map
	if (
		document.getElementsByClassName('inx-property-map-container').length > 0 ||
		document.getElementById('inx-property-map')
	) {
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

	// Container Queries (sort of...)
	if ( document.getElementsByClassName('inx-cq').length > 0	) {
		import(/* webpackChunkName: "container_queries" */ './container-queries').then((module) => {
			module.init()
		})
	}
})
