<?php
/**
 * Template for property search form element (reset link)
 *
 * @package immonex\Kickstart
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$inx_skin_element_name = preg_replace( '/^element-/', '', basename( __FILE__, '.php' ) );
?>
<div class="inx-form-element inx-form-element--<?php echo $inx_skin_element_name; ?> uk-text-right@m">
	<a href="javascript:void(0)" class="inx-link inx-link--is-inline inx-form-reset">
		<span uk-icon="refresh"></span>
		<span>&nbsp;<?php echo $template_data['element']['label'] ? esc_html( $template_data['element']['label'] ) : __( 'Reset Form', 'immonex-kickstart' ); ?></span>
	</a>
</div>
