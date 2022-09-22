const $ = jQuery

const updateContainerSizeClasses = function() {
	$('.inx-cq').each((index, element) => {
		const width = $(element).innerWidth()
		const mapping = [
			[200, 'xxs'],
			[480, 'xs'],
			[640, 's'],
			[800, 'sm'],
			[960, 'm'],
			[1024, 'sl'],
			[1200, 'l'],
			[1400, 'xl'],
			[1600, 'xxl'],
		]

		for (const size of mapping) {
			if (width >= size[0]) {
				$(element).addClass('inx-cq-' + size[1])
			} else {
				$(element).removeClass('inx-cq-' + size[1])
			}
		}
	})
} // updateContainerSizeClasses

function init() {
	const throttledUpdate = typeof updateContainerSizeClasses.inxThrottle !== 'undefined' ?
		updateContainerSizeClasses.inxThrottle(1000) :
		updateContainerSizeClasses

	$(window).on('resize', throttledUpdate)

	updateContainerSizeClasses()
} // init

export { init }
