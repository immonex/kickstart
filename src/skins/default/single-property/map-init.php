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

	$inx_skin_gmaps_privacy_note = wp_sprintf(
		/* translators: %1 = Google Privacy Policy, %2 = dataliberation.org */
		__(
			'This website utilizes Google Maps services. Google collects and processes certain, possibly personal data when using the maps services. Detailed informationen about scope and usage of this data as well as your personal privacy options is available in <a href="%1$s" target="_blank">Google\'s privacy policy</a>. Comprehensive instructions on how to manage your own data related to Google products can also be found here: <a href="%2$s" target="_blank">dataliberation.org</a>

By clicking on the following button, you permit submission of data collected during using the map function to Google in accordance with the privacy policy mentioned above.',
			'immonex-kickstart'
		),
		'https://policies.google.com/privacy',
		'https://www.dataliberation.org/'
	);

	$inx_skin_osmaps_privacy_note = wp_sprintf(
		/* translators: %s = OSM Privacy Policy URL */
		__( 'This website utilizes map services provided by the OpenStreetMap Foundation, St John’s Innovation Centre, Cowley Road, Cambridge, CB4 0WS, United Kingdom (short OSMF). Your Internet browser or application will connect to servers operated by the OSMF located in the United Kingdom and in other countries. The operator of this site has no control over such connections and processing of your data by the OSMF. You can find more information on the processing of user data by the OSMF in the <a href="%s">OSMF privacy policy</a>.', 'immonex-kickstart' ),
		'https://wiki.osmfoundation.org/wiki/Privacy_Policy'
	);

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
