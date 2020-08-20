// Vue
import Vue from 'vue'

// immonex Kickstart State
import inxState from './state'
Vue.mixin(inxState)

// immonex Kickstart Components
import beToggleReference from './non-vue-components/beToggleReference'
inx_state.beToggleReference = beToggleReference

// (S)CSS
import '../../scss/backend.scss'

jQuery(document).ready(function($) {
	$('a[href="#inx-submenu-separator"]').each(function() {
		$(this).parent().html('<div class="inx-submenu-separator"></div>')
	})
})
