jQuery(document).ready(function($) {
	$(window).resize(function() {
		$('.inx-squared-image').each(function() {
			$(this).height($(this).width());
		});
	});

	window.setTimeout(function () { $(window).resize() }, 0);
});
