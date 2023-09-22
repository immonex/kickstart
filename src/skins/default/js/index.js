// Vendor specific styles & fonts
import '../fonts/_flaticon.css';

// (S)CSS
import '../scss/index.scss';

jQuery( document ).ready( function( $ ) {
	let removedElements = 0;

	$( '#inx-single-property__tab-contents > li' ).each( function( index, li ) {
		if ( 0 === $( li ).html().trim().length ) {
			// Remove empty tabs and their related navigation items.
			$( li ).remove();
			$( '.inx-single-property__tab-nav li:eq(' + ( index - removedElements ) + ')' ).remove();
			removedElements++;
		}
	})
})

/* const compo = inx_state.vue.component('async-example', {
	name: 'async-example',
	data: function () {
		return {
			count: 0
		}
	},
	template: '<div>Hello World! {{ this.inxState.yo }}</div>'
}) */