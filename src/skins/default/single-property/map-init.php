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

if (
	isset( $template_data['property_details_map_type'] ) &&
	$template_data['property_details_map_type']
) {
	$inx_skin_map_zoom = (int) $template_data['property_details_map_zoom'] ?
		$template_data['property_details_map_zoom'] :
		12;

	$inx_skin_google_api_key = ! empty( $template_data['google_api_key'] ) ?
		$template_data['google_api_key'] :
		false;

	$inx_skin_gmaps_user_consent  = apply_filters( 'inx_get_user_consent_content', '', 'gmaps', 'geo' );
	$inx_skin_osmaps_user_consent = apply_filters( 'inx_get_user_consent_content', '', 'osmaps', 'geo' );

	switch ( $template_data['property_details_map_type'] ) {
		case 'ol_osm_map_marker':
			$inx_skin_marker_icon     = $utils['template']->locate_template_file(
				'images/location-pin.png'
			);
			$inx_skin_marker_icon_url = $inx_skin_marker_icon ?
				$utils['template']->get_template_file_url( $inx_skin_marker_icon ) :
				'';

			$inx_skin_lat      = $utils['data']->get_custom_field_by(
				'key',
				'_inx_lat',
				$template_data['post_id'],
				true
			);
			$inx_skin_lng      = $utils['data']->get_custom_field_by(
				'key',
				'_inx_lng',
				$template_data['post_id'],
				true
			);
			$inx_skin_map_note = $template_data['property_details_map_note_map_marker'];
			$inx_skin_show_map = $inx_skin_lat && $inx_skin_lng;
			break;
		case 'gmap_marker':
			if ( ! $inx_skin_google_api_key ) {
				break;
			}
			$inx_skin_lat      = $utils['data']->get_custom_field_by(
				'key',
				'_inx_lat',
				$template_data['post_id'],
				true
			);
			$inx_skin_lng      = $utils['data']->get_custom_field_by(
				'key',
				'_inx_lng',
				$template_data['post_id'],
				true
			);
			$inx_skin_map_note = $template_data['property_details_map_note_map_marker'];
			$inx_skin_show_map = $inx_skin_lat && $inx_skin_lng;
			break;
		case 'gmap_embed':
			if ( ! $inx_skin_google_api_key ) {
				break;
			}

			if ( $template_data['flags']['is_demo'] ) {
				$inx_skin_map_location = '54343 Föhren';
			} else {
				$inx_skin_map_location = $template_data['zipcode']['value'] . ' ' .
					$template_data['city']['value'];
			}

			$inx_skin_map_note = $template_data['property_details_map_note_map_embed'];

			if ( $inx_skin_map_location ) {
				$inx_skin_show_map = true;
			}
			break;
	}
}
