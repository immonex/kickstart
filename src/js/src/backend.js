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

function inxBeExtendDetailTitles($) {
	$('#_inx_details_repeat .postbox.cmb-row.cmb-repeatable-grouping').each(function() {
		let elID = $(this).attr('id').match(/[0-9]+$/)
		if (!elID) return;

		let id = elID[0]
		let title = $('#_inx_details_' + id + '_title').val()
		if (!title) return;

		let index = parseInt(id) + 1

		$(this).find('.cmb-group-title').html('Detail ' + index + ': ' + title)
	})
} // inxBeExtendDetailTitles

jQuery(document).ready(function($) {
	$('a[href="#inx-submenu-separator"]').each(function() {
		$(this).parent().html('<div class="inx-submenu-separator"></div>')
	})

	inxBeExtendDetailTitles($)

	$('#_inx_details_repeat .postbox.cmb-row.cmb-repeatable-grouping .cmb-remove-field-row').on('click', function() {
		setTimeout(function() { inxBeExtendDetailTitles($) }, 100)
	})
})
