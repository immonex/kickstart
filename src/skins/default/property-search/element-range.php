<?php
/**
 * Template for property search form element (value range slider)
 *
 * @package immonex\Kickstart
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$inx_skin_element_name = preg_replace( '/^element-/', '', basename( __FILE__, '.php' ) );
$inx_skin_locale       = str_replace( '_', '-', get_locale() );

if ( ! empty( $template_data['element']['step_ranges'] ) ) {
	if ( is_array( $template_data['element']['step_ranges'] ) ) {
		$inx_skin_step_ranges = wp_json_encode( $template_data['element']['step_ranges'] );
	} else {
		$inx_skin_step_ranges = $template_data['element']['step_ranges'];
	}
}
?>
<div class="inx-form-element inx-form-element--<?php echo $inx_skin_element_name; ?>">
	<inx-range-slider
		:form-index="<?php echo ! empty( $template_data['render_count'] ) ? esc_attr( $template_data['render_count'] - 1 ) : '0'; ?>"
		name="<?php echo esc_attr( $template_data['element_id'] ); ?>"
		label="<?php echo esc_attr( $template_data['element']['label'] ); ?>"
		range="<?php echo esc_attr( wp_json_encode( $template_data['element']['range'] ) ); ?>"
		value="<?php echo esc_attr( wp_json_encode( $template_data['element_value'] ) ); ?>"
		step-ranges="<?php echo ! empty( $inx_skin_step_ranges ) ? esc_attr( $inx_skin_step_ranges ) : ''; ?>"
		unit="<?php echo isset( $template_data['element']['unit'] ) ? esc_attr( $template_data['element']['unit'] ) : ''; ?>"
		currency="<?php echo isset( $template_data['element']['currency'] ) ? esc_attr( $template_data['element']['currency'] ) : ''; ?>"
		replace-null="<?php echo isset( $template_data['element']['replace_null'] ) ? esc_attr( $template_data['element']['replace_null'] ) : ''; ?>"
		range-unlimited-term="<?php echo ! empty( $template_data['element']['unlimited_term'] ) ? esc_attr( $template_data['element']['unlimited_term'] ) : ''; ?>"
		locale="<?php echo $inx_skin_locale ? $inx_skin_locale : 'de-DE'; ?>"
		wrap-classes="inx-range-slider">
	</inx-range-slider>
</div>
