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
import 'intersection-observer'

inx_state.uikit = UIkit

UIkit.use(Icons)

// immonex Kickstart State
import inxState from './state'
Vue.mixin(inxState)

// (S)CSS
import '../scss/frontend.scss'

let inxPropertyDetailsInitialized = false

if (typeof Array.prototype.flat !== 'function') {
	Object.defineProperty(Array.prototype, 'flat', {
		value: function(depth = 1) {
			return this.reduce(
				function (flat, toFlatten) {
					return flat.concat((Array.isArray(toFlatten) && (depth > 1)) ? toFlatten.flat(depth - 1) : toFlatten)
				},
				[]
			)
		}
	})
}

document.body.addEventListener('inxInitPropertySearch', (event) => {
	const search = import(/* webpackChunkName: "property_search" */ './property_search')
	search.then((module) => {
		module.init()
	})
})

document.body.addEventListener('inxInitPropertyMap', (event) => {
	const map = import(/* webpackChunkName: "property_map" */ './property_map')
	map.then((module) => {
		module.init()
	})
})

document.body.addEventListener('inxInitDetails', (event) => {
	const details = import(/* webpackChunkName: "property_details" */ './property_details')
	details.then((module) => {
		module.init()
	})
})

// Lazy loaded Modules
jQuery(document).ready(async function($) {

if (false) {
	const elementorObserver = new MutationObserver(function(mutations, observer) {
		for (const mutation of mutations) {
			if (mutation.type !== 'childList' || typeof mutation.target.dataset.widget_type === 'undefined') {
				continue
			}

			if (mutation.target.dataset.widget_type === 'inx-e-search-form.default') {
				const search = import(/* webpackChunkName: "property_search" */ './property_search')
				search.then((module) => {
					module.init()
				})
			}
		}
	});

	elementorObserver.observe( document, {
		childList: true,
		subtree: true,
	} );
}

	// Shared Components
	const shared = await import(/* webpackChunkName: "shared_components" */ './shared_components')
	inx_state.shared = shared
	await shared.init()

	// Property Search/Filters/Sort
	if (
		document.getElementsByClassName('inx-property-search').length > 0 ||
		document.getElementsByClassName('inx-property-filters').length > 0 ||
		document.getElementById('inx-sort')
	) {
		const search = await import(/* webpackChunkName: "property_search" */ './property_search')
		await search.init()
	}

	// Property Lists
	if (document.getElementsByClassName('inx-property-list').length > 0) {
		const lists = await import(/* webpackChunkName: "property_lists" */ './property_lists')
		await lists.init()
	}

	// Property Map
	if (
		document.getElementsByClassName('inx-property-map-container').length > 0 ||
		document.getElementById('inx-property-map')
	) {
		const map = await import(/* webpackChunkName: "property_map" */ './property_map')
		await map.init()
	}

	// Property Details
	if (
		document.getElementById('inx-property-details') ||
		document.getElementsByClassName('inx-single-property__section').length > 0
	) {
		const details = await import(/* webpackChunkName: "property_details" */ './property_details')
		await details.init()
		inxPropertyDetailsInitialized = true
	}

	// Container Queries (sort of...)
	if (document.getElementsByClassName('inx-cq').length > 0) {
		const cq = await import(/* webpackChunkName: "container_queries" */ './container-queries')
		await cq.init()
	}
})
