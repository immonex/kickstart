<?php
/**
 * Shared map-related initialization
 *
 * @package immonex\Kickstart
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$inx_skin_show_map = false;

if ( ! empty( $template_data['type'] ) ) {
	$inx_skin_google_api_key = ! empty( $template_data['google_api_key'] ) ?
		$template_data['google_api_key'] :
		false;

	$inx_skin_user_consent = apply_filters( 'inx_get_user_consent_content', '', $template_data['type'], 'geo' );

	if ( 'gmap_embed' === substr( $template_data['type'], 0, 10 ) ) {
		if ( $template_data['flags']['is_demo'] ) {
			$inx_skin_map_location = '54343 Föhren';
		} else {
			$inx_skin_map_location = $template_data['zipcode']['value'] . ' ' .
				$template_data['city']['value'];
		}

		$inx_skin_map_note     = $template_data['property_details_map_note_map_embed'];
		$inx_skin_show_map     = ! empty( $inx_skin_map_location );
		$inx_skin_map_tag_name = 'inx-property-location-google-embed-map';
	} else {
		$inx_skin_lat          = $utils['data']->get_custom_field_by(
			'key',
			'_inx_lat',
			$template_data['post_id'],
			true
		);
		$inx_skin_lng          = $utils['data']->get_custom_field_by(
			'key',
			'_inx_lng',
			$template_data['post_id'],
			true
		);
		$inx_skin_map_note     = $template_data['property_details_map_note_map_marker'];
		$inx_skin_show_map     = $inx_skin_lat && $inx_skin_lng;
		$inx_skin_map_tag_name = 'gmap' === substr( $template_data['type'], 0, 4 ) ?
			'inx-property-location-google-map' :
			'inx-property-location-open-layers-map';
	}
}
