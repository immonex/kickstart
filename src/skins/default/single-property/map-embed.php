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

if ( $inx_skin_show_map && 'ol_osm_map_marker' === $template_data['property_details_map_type'] ) : ?>
<inx-property-location-open-layers-map
	:lat="<?php echo esc_attr( $inx_skin_lat ); ?>"
	:lng="<?php echo esc_attr( $inx_skin_lng ); ?>"
	:zoom="<?php echo $template_data['property_details_map_zoom']; ?>"
	marker-icon-url="<?php echo esc_url( $inx_skin_marker_icon_url ); ?>"
	:marker-icon-scale=".5"
	infowindow="<?php echo $template_data['property_details_map_infowindow_contents']; ?>"
	note="<?php echo $inx_skin_map_note; ?>"
	privacy-note="<?php echo esc_attr( nl2br( $inx_skin_osmaps_privacy_note ) ); ?>"
	show-map-button-text="<?php echo esc_attr( __( 'Agreed, show maps!', 'immonex-kickstart' ) ); ?>"
	:require-consent="<?php echo (bool) $template_data['maps_require_consent'] ? 'true' : 'false'; ?>"
>
</inx-property-location-open-layers-map>
<?php elseif ( $inx_skin_show_map && 'gmap_marker' === $template_data['property_details_map_type'] ) : ?>
<inx-property-location-google-map
	:lat="<?php echo esc_attr( $inx_skin_lat ); ?>"
	:lng="<?php echo esc_attr( $inx_skin_lng ); ?>"
	:zoom="<?php echo $template_data['property_details_map_zoom']; ?>"
	infowindow="<?php echo esc_attr( $template_data['property_details_map_infowindow_contents'] ); ?>"
	api-key="<?php echo esc_attr( $inx_skin_google_api_key ); ?>"
	note="<?php echo $inx_skin_map_note; ?>"
	privacy-note="<?php echo esc_attr( nl2br( $inx_skin_gmaps_privacy_note ) ); ?>"
	show-map-button-text="<?php echo esc_attr( __( 'Agreed, show maps!', 'immonex-kickstart' ) ); ?>"
	:require-consent="<?php echo (bool) $template_data['maps_require_consent'] ? 'true' : 'false'; ?>"
>
</inx-property-location-google-map>
<?php elseif ( $inx_skin_show_map && 'gmap_embed' === $template_data['property_details_map_type'] ) : ?>
<inx-property-location-google-embed-map
	location="<?php echo rawurlencode( $inx_skin_map_location ); ?>"
	:zoom="<?php echo $template_data['property_details_map_zoom']; ?>"
	api-key="<?php echo esc_attr( $inx_skin_google_api_key ); ?>"
	note="<?php echo $inx_skin_map_note; ?>"
	privacy-note="<?php echo esc_attr( nl2br( $inx_skin_gmaps_privacy_note ) ); ?>"
	show-map-button-text="<?php echo esc_attr( __( 'Agreed, show maps!', 'immonex-kickstart' ) ); ?>"
	:require-consent="<?php echo (bool) $template_data['maps_require_consent'] ? 'true' : 'false'; ?>"
>
</inx-property-location-google-embed-map>
<?php endif; ?>
