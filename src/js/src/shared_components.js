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

function init() {
	$(window).on('resize', function() {
		$('.inx-squared-image').each(function() {
			$(this).height($(this).width())
		})
	})

	window.setTimeout(function () { $(window).trigger('resize') }, 0)
}

export { init }
