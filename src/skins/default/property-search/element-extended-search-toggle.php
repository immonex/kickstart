<?php
/**
 * Template for property search form element (extended search toggle link)
 *
 * @package immonex\Kickstart
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( isset( $template_data['extended_count'] ) && 0 === $template_data['extended_count'] ) {
	return;
}

$inx_skin_search_main_element_id = ! empty( $template_data['search_main_element_id'] ) ? ' #' . $template_data['search_main_element_id'] : '';
$inx_skin_element_name           = preg_replace( '/^element-/', '', basename( __FILE__, '.php' ) );
?>
<div class="inx-form-element inx-form-element--<?php echo $inx_skin_element_name; ?>">
	<hr>
	<inx-toggle :state="0">
		<template slot="active">
			<a
				href="javascript:void(0)"
				class="inx-link inx-link--is-inline inx-extended-search-toggle"
				uk-toggle="target:<?php echo $inx_skin_search_main_element_id; ?> .inx-property-search__extended; animation: uk-animation-slide-top-small uk-animation-fade"
			>
				<span uk-icon="chevron-up"></span>
				<span>&nbsp;<?php echo $template_data['element']['label'] ? esc_html( $template_data['element']['label'] ) : __( 'Extended Search', 'immonex-kickstart' ); ?></span>
			</a>
		</template>
		<template slot="inactive">
			<a
				href="javascript:void(0)"
				class="inx-link inx-link--is-inline inx-extended-search-toggle"
				uk-toggle="target:<?php echo $inx_skin_search_main_element_id; ?> .inx-property-search__extended; animation: uk-animation-slide-top-small uk-animation-fade"
			>
				<span uk-icon="chevron-down"></span>
				<span>&nbsp;<?php echo $template_data['element']['label'] ? esc_html( $template_data['element']['label'] ) : __( 'Extended Search', 'immonex-kickstart' ); ?></span>
			</a>
		</template>
	</inx-toggle>

</div>
