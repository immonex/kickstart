<?php
/**
 * Template for property search form element (Photon autocomplete)
 *
 * @package immonex\Kickstart
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$inx_skin_show_label     = false;
$inx_skin_element_name   = preg_replace( '/^element-/', '', basename( __FILE__, '.php' ) );
$inx_skin_placeholder    = ! empty( $template_data['element']['placeholder'] ) ? $template_data['element']['placeholder'] : '';
$inx_skin_no_options     = ! empty( $template_data['element']['no_options'] ) ? $template_data['element']['no_options'] : '';
$inx_skin_no_results     = ! empty( $template_data['element']['no_results'] ) ? $template_data['element']['no_results'] : '';
$inx_skin_countries      = ! empty( $template_data['element']['countries'] ) ? $template_data['element']['countries'] : '';
$inx_skin_osm_place_tags = ! empty( $template_data['element']['osm_place_tags'] ) ? $template_data['element']['osm_place_tags'] : '';

$inx_skin_privacy_note = wp_sprintf(
	/* translators: %1 = Photon/OpenStreetMap, %2 = Privacy Policy URL */
	__( 'This site utilizes %1$s for location autocompletion and map display, please see our <a href="%2$s" target="_blank">privacy policy</a>!', 'immonex-kickstart' ),
	'Photon/OpenStreetMap',
	get_privacy_policy_url()
);
$inx_skin_consent_button_text = __( 'Agreed!', 'immonex-kickstart' );
?>
<div class="inx-form-element inx-form-element--<?php echo $inx_skin_element_name; ?> uk-width-1-1">
	<?php if ( $inx_skin_show_label && $template_data['element']['label'] ) : ?>
	<label for="<?php echo $template_data['element_id']; ?>" class="inx-form-element--label"><?php echo $template_data['element']['label']; ?></label>
	<?php endif; ?>

	<inx-photon-autocomplete
		name="<?php echo esc_attr( $template_data['element_id'] ); ?>"
		placeholder="<?php echo esc_attr( $inx_skin_placeholder ); ?>"
		<?php if ( $inx_skin_countries ) : ?>
		countries="<?php echo esc_attr( $inx_skin_countries ); ?>"
		<?php endif; ?>
		<?php if ( $inx_skin_osm_place_tags ) : ?>
		osm-place-tags="<?php echo esc_attr( $inx_skin_osm_place_tags ); ?>"
		<?php endif; ?>
		no-options="<?php echo esc_attr( $inx_skin_no_options ); ?>"
		no-results="<?php echo esc_attr( $inx_skin_no_results ); ?>"
		value="<?php echo $template_data['element_value'] ? esc_attr( wp_json_encode( $template_data['element_value'] ) ) : ''; ?>"
		wrap-classes="inx-location-autocomplete uk-search uk-search-default uk-width-1-1"
		input-classes="inx-search-input uk-search-input"
		:require-consent="<?php echo $template_data['distance_search_autocomplete_require_consent'] ? 'true' : 'false'; ?>"
		privacy-note="<?php echo esc_attr( $inx_skin_privacy_note ); ?>"
		consent-button-text="<?php echo esc_attr( $inx_skin_consent_button_text ); ?>"
	>
	</inx-photon-autocomplete>
</div>
