jQuery(document).ready(function($) {
	$(window).on('resize', function() {
		$('.inx-squared-image').each(function() {
			$(this).height($(this).width());
		});
	});

	window.setTimeout(function () { $(window).trigger('resize') }, 0);
});
