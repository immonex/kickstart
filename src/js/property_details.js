// Vue & Co.
import Vue from 'vue'

// UIkit
import UIkit from 'uikit'

// immonex Kickstart Components
import PropertyLocationOpenLayersMap from './components/PropertyLocationOpenLayersMap.vue'
import PropertyLocationGoogleMap from './components/PropertyLocationGoogleMap.vue'
import PropertyLocationGoogleEmbedMap from './components/PropertyLocationGoogleEmbedMap.vue'
import EmbedConsentRequest from './components/EmbedConsentRequest.vue'

const $ = jQuery

function initPropertyDetailInstances() {
	const mainDetailsElement = document.getElementById('inx-property-details')

	if (mainDetailsElement) {
		if (mainDetailsElement.dataset.inxElementInitialized) return

		Vue.config.ignoredElements = ['mediaelementwrapper']

		inx_state.vue_instances.property_details = new Vue({
			el: '#inx-property-details',
			components: {
				'inx-property-location-open-layers-map': PropertyLocationOpenLayersMap,
				'inx-property-location-google-map': PropertyLocationGoogleMap,
				'inx-property-location-google-embed-map': PropertyLocationGoogleEmbedMap,
				'inx-embed-consent-request': EmbedConsentRequest
			},
			ignoredElements: ['mediaelementwrapper']
		})

		mainDetailsElement.dataset.inxElementInitialized = true
	} else {
		if (typeof inx_state.vue_instances.property_details === 'undefined') {
			inx_state.vue_instances.property_details = []
		}

		$('.inx-single-property__section').each(function(index) {
			const id = 'inx-single-property-section-' + index
			$(this).attr('id', id)

			if (!document.getElementById(id).__vue__) {
				inx_state.vue_instances.property_details[index] = new Vue({
					el: '#' + id,
					components: {
						'inx-property-location-open-layers-map': PropertyLocationOpenLayersMap,
						'inx-property-location-google-map': PropertyLocationGoogleMap,
						'inx-property-location-google-embed-map': PropertyLocationGoogleEmbedMap,
						'inx-embed-consent-request': EmbedConsentRequest
					}
				})
			}
		})
	}
} // initPropertyDetailInstances

function cleanLocationURL() {
	const url = new URL(location)
	url.searchParams.delete('inx-backlink-url')
	history.replaceState(null, null, url)
} // cleanLocationURL

function refreshTabbedYTiFrames (event) {
	const iFrames = event.target.getElementsByTagName('iframe')

	if (iFrames.length === 0) return

	for (let i = 0; i < iFrames.length; i++) {
		const iFrame = iFrames[i]
		if (iFrame.src.indexOf('youtube') === -1 || iFrame.dataset.inxRefreshed) continue

		/**
		 * Refresh YouTube iFrame in previously hidden tab once to fix
		 * a low resolution preview image issue.
		 */
		iFrame.src = iFrame.src
		iFrame.dataset.inxRefreshed = true
	}
} // refreshTabbedYTiFrames

async function init() {
	initPropertyDetailInstances()
	cleanLocationURL()

	UIkit.util.on('.inx-single-property__tabbed-content', 'shown', refreshTabbedYTiFrames)
} // init

export { init }
