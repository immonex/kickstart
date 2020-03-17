const GMAPS_CALLBACK_NAME = 'gmapsCallback'

let initialized = !!window.google
let resolveInitPromise
let rejectInitPromise

const initPromise = new Promise((resolve, reject) => {
	resolveInitPromise = resolve
	rejectInitPromise = reject
})

export default function init(apiKey) {
	if (initialized) return initPromise

	initialized = true
	window[GMAPS_CALLBACK_NAME] = () => resolveInitPromise(window.google)

	const script = document.createElement('script')
	script.async = true
	script.defer = true
	script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=${GMAPS_CALLBACK_NAME}`
	script.onerror = rejectInitPromise
	document.querySelector('head').appendChild(script)

	return initPromise
} // init
