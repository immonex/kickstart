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

function getBacklinkURL(disablePagination = true) {
	const tempURL = inx_state.search.backlink_url ?
		new URL(inx_state.search.backlink_url) :
		window.location

	for (const param of tempURL.searchParams) {
		if (param[0].substring(0, 6) === 'inx-r-') {
			tempURL.searchParams.delete(param[0])
		}
	}

	if (disablePagination && !tempURL.searchParams.has('inx-ipn-disable-pgn')) {
		tempURL.searchParams.append('inx-ipn-disable-pgn', '1')
	}

	return tempURL.href
} // getBacklinkURL

function addBacklinkURL(url, backlinkURL = false, disablePagination = true) {
	if (!backlinkURL) backlinkURL = getBacklinkURL(disablePagination)

	const sourceURL = new URL(url)
	if (sourceURL.searchParams.has('inx-backlink-url')) {
		sourceURL.searchParams.delete('inx-backlink-url')
	}

	sourceURL.searchParams.append('inx-backlink-url', encodeURIComponent(backlinkURL))

	return sourceURL.toString()
} // addBacklinkURL

function getSvgImgSrc(svgString) {
	return svgString.replace('<svg',(~svgString.indexOf('xmlns')?'<svg':'<svg xmlns="http://www.w3.org/2000/svg"'))
		.replace(/"/g, '\'')
		.replace(/%/g, '%25')
		.replace(/#/g, '%23')
		.replace(/{/g, '%7B')
		.replace(/}/g, '%7D')
		.replace(/</g, '%3C')
		.replace(/>/g, '%3E')
		.replace(/\s+/g,' ')
} // getSvgImgSrc

async function init() {
	$(window).on('resize', function() {
		$('.inx-squared-image').each(function() {
			$(this).height($(this).width())
		})
	})

	window.setTimeout(function () { $(window).trigger('resize') }, 0)
} // init

export { init, getBacklinkURL, addBacklinkURL, getSvgImgSrc }
