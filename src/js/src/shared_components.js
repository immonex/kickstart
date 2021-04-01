const $ = jQuery

function init() {
	$(window).on('resize', function() {
		$('.inx-squared-image').each(function() {
			$(this).height($(this).width());
		});
	});

	window.setTimeout(function () { $(window).trigger('resize') }, 0);
}

export { init }
