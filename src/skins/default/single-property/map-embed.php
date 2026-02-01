<?php
/**
 * Shared map embed code
 *
 * @package immonex\Kickstart
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( $inx_skin_show_map && 'gmap_embed' === substr( $template_data['type'], 0, 10 ) ) : ?>

<<?php echo $inx_skin_map_tag_name; ?>
	<?php // phpcs:disable ?>
	options="<?php echo ! empty( $template_data['options'] ) ? base64_encode( wp_json_encode( $template_data['options'] ) ) : ''; ?>"
	<?php // phpcs:enable ?>
	location="<?php echo rawurlencode( $inx_skin_map_location ); ?>"
	:zoom="<?php echo $template_data['zoom']; ?>"
	api-key="<?php echo esc_attr( $inx_skin_google_api_key ); ?>"
	note="<?php echo $inx_skin_map_note; ?>"
	privacy-note="<?php echo esc_attr( nl2br( $inx_skin_user_consent['text'] ) ); ?>"
	show-map-button-text="<?php echo esc_attr( $inx_skin_user_consent['button_text'] ); ?>"
	:require-consent="<?php echo (bool) $template_data['maps_require_consent'] ? 'true' : 'false'; ?>"
>
</<?php echo $inx_skin_map_tag_name; ?>>

<?php elseif ( $inx_skin_show_map ) : ?>

<<?php echo $inx_skin_map_tag_name; ?>
	type="<?php echo esc_attr( $template_data['type'] ); ?>"
	<?php // phpcs:disable ?>
	options="<?php echo ! empty( $template_data['options'] ) ? base64_encode( wp_json_encode( $template_data['options'] ) ) : ''; ?>"
	<?php // phpcs:enable ?>
	:lat="<?php echo esc_attr( $inx_skin_lat ); ?>"
	:lng="<?php echo esc_attr( $inx_skin_lng ); ?>"
	:zoom="<?php echo $template_data['zoom']; ?>"
	marker-fill-color="<?php echo $template_data['marker_fill_color']; ?>"
	:marker-fill-opacity="<?php echo $template_data['marker_fill_opacity']; ?>"
	marker-stroke-color="<?php echo $template_data['marker_stroke_color']; ?>"
	:marker-stroke-width="<?php echo $template_data['marker_stroke_width']; ?>"
	:marker-scale="<?php echo $template_data['marker_scale']; ?>"
	marker-icon-url="<?php echo esc_url( $template_data['marker_icon_url'] ); ?>"
	infowindow="<?php echo $template_data['property_details_map_infowindow_contents']; ?>"
	note="<?php echo $inx_skin_map_note; ?>"
	privacy-note="<?php echo esc_attr( nl2br( $inx_skin_user_consent['text'] ) ); ?>"
	show-map-button-text="<?php echo esc_attr( $inx_skin_user_consent['button_text'] ); ?>"
	:require-consent="<?php echo (bool) $template_data['maps_require_consent'] ? 'true' : 'false'; ?>"
	<?php if ( 'gmap' === substr( $template_data['type'], 0, 4 ) ) : ?>
	api-key="<?php echo esc_attr( $inx_skin_google_api_key ); ?>"
	<?php endif; ?>
>
</<?php echo $inx_skin_map_tag_name; ?>>

<?php endif; ?>
