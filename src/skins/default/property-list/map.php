<?php
/**
 * Template for property maps
 *
 * @package immonex\Kickstart
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$inx_skin_component_id = ! empty( $template_data['cid'] ) ? $template_data['cid'] : 'inx-property-map';
$inx_skin_privacy_note = apply_filters( 'inx_get_user_consent_content', '', $template_data['type'], 'geo' );

if ( $template_data['type'] ) :
	// phpcs:disable
	?>
<div id="<?php echo $inx_skin_component_id; ?>" class="inx-property-map-container inx-container<?php echo ! empty( $template_data['is_preview'] ) ? ' inx-is-preview' : ''; ?>">
	<inx-property-open-layers-map
		type="<?php echo esc_attr( $template_data['type'] ); ?>"
		options="<?php echo ! empty( $template_data['options'] ) ? base64_encode( wp_json_encode( $template_data['options'] ) ) : ''; ?>"
		api-key="<?php echo esc_attr( $template_data['google_api_key'] ); ?>"
		:lat="<?php echo esc_attr( $template_data['lat'] ); ?>"
		:lng="<?php echo esc_attr( $template_data['lng'] ); ?>"
		:zoom="<?php echo esc_attr( $template_data['zoom'] ); ?>"
		:auto-fit="<?php echo $template_data['auto_fit'] ? 'true' : 'false'; ?>"
		marker-set-id="<?php echo esc_attr( $template_data['marker_set_id'] ); ?>"
		marker-fill-color="<?php echo $template_data['marker_fill_color']; ?>"
		:marker-fill-opacity="<?php echo $template_data['marker_fill_opacity']; ?>"
		marker-stroke-color="<?php echo $template_data['marker_stroke_color']; ?>"
		:marker-stroke-width="<?php echo $template_data['marker_stroke_width']; ?>"
		:marker-scale="<?php echo $template_data['marker_scale']; ?>"
		marker-icon-url="<?php echo esc_url( $template_data['marker_icon_url'] ); ?>"
		privacy-note="<?php echo esc_attr( nl2br( $inx_skin_privacy_note['text'] ) ); ?>"
		show-map-button-text="<?php echo esc_attr( __( 'Agreed, show maps!', 'immonex-kickstart' ) ); ?>"
		:require-consent="<?php echo (bool) $template_data['require-consent'] ? 'true' : 'false'; ?>"
		disable-links="<?php echo ! empty( $template_data['disable_links'] ) ? $template_data['disable_links'] : ''; ?>"
		force-lang="<?php echo ! empty( $template_data['inx-force-lang'] ) ? $template_data['inx-force-lang'] : ''; ?>"
		preview-markers="<?php echo ! empty( $template_data['preview_markers'] ) ? base64_encode( wp_json_encode( $template_data['preview_markers'] ) ) : ''; ?>"
	>
	</inx-property-open-layers-map>
</div>
	<?php
	// phpcs:enable
endif;
