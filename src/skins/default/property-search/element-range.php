<?php
/**
 * Template for property search form element (value range slider)
 *
 * @package immonex-kickstart
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$inx_skin_element_name = preg_replace( '/^element-/', '', basename( __FILE__, '.php' ) );
?>
<div class="inx-form-element inx-form-element--<?php echo $inx_skin_element_name; ?>">
	<inx-range-slider
		name="<?php echo esc_attr( $template_data['element_id'] ); ?>"
		label="<?php echo esc_attr( $template_data['element']['label'] ); ?>"
		range="<?php echo esc_attr( json_encode( $template_data['element']['range'] ) ); ?>"
		value="<?php echo esc_attr( json_encode( $template_data['element_value'] ) ); ?>"
		unit="<?php echo isset( $template_data['element']['unit'] ) ? esc_attr( $template_data['element']['unit'] ) : ''; ?>"
		currency="<?php echo isset( $template_data['element']['currency'] ) ? esc_attr( $template_data['element']['currency'] ) : ''; ?>"
		replace-null="<?php echo isset( $template_data['element']['replace_null'] ) ? esc_attr( $template_data['element']['replace_null'] ) : ''; ?>"
		wrap-classes="inx-range-slider">
	</inx-range-slider>
</div>
