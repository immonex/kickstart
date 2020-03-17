jQuery(document).ready(function($) {

	if (
		$('.inx-property-filters').length > 0 &&
		$('.inx-property-list.inx-property-list--is-empty').length > 0
	) {
		// Hide property filters/sort panel if an empty property list
		// element exists.
		$('.inx-property-filters').hide()
	}

})