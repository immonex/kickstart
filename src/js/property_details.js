// Vue & Co.
import Vue from 'vue'

// UIkit
if (typeof UIkit === 'undefined') {
	window.UIkit = await import(/* webpackChunkName: "uikit" */ 'uikit')
}

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
	url.searchParams.delete('inx-list-limit-page')
	history.replaceState(null, null, url)
} // cleanLocationURL

function setDeferredIframes() {
	const containerClasses = [ 'inx-gallery__image-slider', 'inx-single-property__tabbed-content' ]

	for (const containerClass of containerClasses) {
		const containers = document.getElementsByClassName(containerClass)

		if (containers.length === 0) continue

		for (const container of containers) {
			const iFrames = container.getElementsByTagName('iframe')

			if (iFrames.length > 0) {
				for (const iFrame of iFrames) {
					iFrame.dataset.deferredSrc = iFrame.src
					iFrame.src = ''
				}
			}
		}
	}
} // setDeferredIframes

function enableDeferredIframes(event) {
	const iFrames = event.target.getElementsByTagName('iframe')

	if (iFrames.length === 0) return

	for (const iFrame of iFrames) {
		if (iFrame.dataset.deferredSrc) {
			iFrame.src = iFrame.dataset.deferredSrc
			delete iFrame.dataset.deferredSrc
		}
	}
} // enableDeferredIframes

function removeEmptyTabs() {
	let removedElements = 0

	$('#inx-single-property__tab-contents > li').each( function(index, li) {
		if (0 === $(li).html().trim().length) {
			// Remove empty tabs and their related navigation items.
			$(li).remove()
			$('.inx-single-property__tab-nav li:eq(' + (index - removedElements) + ')').remove()
			removedElements++
		}
	})
} // removeEmptyTabs

function maybeActivateGalleryThumbNavItem(event) {
	for (const navType of ['image', 'video', 'virtual-tour']) {
		if (event.target.classList.contains('inx-gallery__' + navType + '-item')) {
			const thumb = event.target.parentElement.parentElement.parentElement.getElementsByClassName('inx-thumbnail-nav__item--is-' + navType)
			if (thumb.length > 0 && !thumb[0].classList.contains('uk-active')) {
				thumb[0].classList.add('uk-active')
			}
		}
	}
} // maybeActivateGalleryThumbNavItem

async function init() {
	setDeferredIframes()
	initPropertyDetailInstances()
	cleanLocationURL()
	removeEmptyTabs()

	window.UIkit.util.on('.inx-single-property__tabbed-content', 'shown', enableDeferredIframes)
	window.UIkit.util.on('.inx-gallery__image-slider', 'itemshown', enableDeferredIframes)
	window.UIkit.util.on('.inx-gallery__image-slider', 'itemshown', maybeActivateGalleryThumbNavItem)
} // init

export { init }
