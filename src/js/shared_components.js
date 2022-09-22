const $ = jQuery

Function.prototype.inxThrottle = function(minimumDistance) {
	let timeout
	let lastCalled = 0
	let throttledFunc = this

	function throttleCore() {
		let context = this

		function callThrottledFunc(args) {
			lastCalled = Date.now()
			throttledFunc.apply(context, args)
		}

		let timeToNextCall = minimumDistance - (Date.now() - lastCalled)
		cancelTimer();

		if (timeToNextCall < 0) {
			callThrottledFunc(arguments, 0)
		} else {
			timeout = setTimeout(callThrottledFunc, timeToNextCall, arguments)
		}
	}

	function cancelTimer() {
		if (timeout) {
			clearTimeout(timeout)
			timeout = undefined
		}
	}

	throttleCore.reset = function() {
		cancelTimer()
		lastCalled = 0
	}

	return throttleCore
} // inxThrottle

function getBacklinkURL() {
	if (inx_state.search.backlink_url) return inx_state.search.backlink_url

	const urlParams = new URLSearchParams(window.location.search)
	let backlinkParams = new URLSearchParams();

	for (const param of urlParams) {
		if (param[0].substring(0, 6) !== 'inx-r-') {
			backlinkParams.append(param[0], param[1])
		}
	}

	let backlinkURL = window.location.origin + window.location.pathname;
	if (Array.from(backlinkParams).length > 0) {
		backlinkURL += '?' + backlinkParams.toString()
	}

	return backlinkURL
} // getBacklinkURL

function addBacklinkURL(url, backlinkURL = false) {
	if (!backlinkURL) backlinkURL = getBacklinkURL()

	const sourceURL = new URL(url)
	if (sourceURL.searchParams.has('inx-backlink-url')) {
		sourceURL.searchParams.delete('inx-backlink-url')
	}

	sourceURL.searchParams.append('inx-backlink-url', encodeURIComponent(backlinkURL))

	return sourceURL.toString()
} // addBacklinkURL

function init() {
	$(window).on('resize', function() {
		$('.inx-squared-image').each(function() {
			$(this).height($(this).width())
		})
	})

	window.setTimeout(function () { $(window).trigger('resize') }, 0)
} // init

export { init, getBacklinkURL, addBacklinkURL }
