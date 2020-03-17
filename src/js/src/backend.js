// Vue
import Vue from 'vue'

// immonex Kickstart State
import inxState from './state'
Vue.mixin(inxState)

// immonex Kickstart Components
import BackendReferenceToggle from './components/BackendReferenceToggle.vue'

// (S)CSS
import '../../scss/backend.scss'

jQuery(document).ready(function($) {

	$('a[href="#inx-submenu-separator"]').each(function() {
		$(this).parent().html('<div class="inx-submenu-separator"></div>');
	});

	if (document.getElementById('posts-filter')) {
		new Vue({
			el: '#posts-filter',
			components: {
				'inx-backend-reference-toggle': BackendReferenceToggle
			}
		})
	}

})