<?php
/**
 * Template for property location description/data and map
 *
 * @package immonex-kickstart
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$inx_skin_location_description = $utils['data']->get_custom_field_by(
	'name',
	'freitexte.lage',
	$template_data['post_id'],
	true
);

$inx_skin_groups = array( 'lage', 'infrastruktur' );

$inx_skin_details = $utils['data']->get_group_items( $template_data['details'], $inx_skin_groups );

$inx_skin_headline = isset( $template_data['headline'] ) ?
	$template_data['headline'] :
	__( 'Location and Infrastructure', 'immonex-kickstart' );

$inx_skin_heading_level = isset( $template_data['heading_level'] ) ?
	$template_data['heading_level'] :
	2;

$inx_skin_show_map = false;

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

if ( $inx_skin_location_description || count( $inx_skin_details ) > 0 ) :
	?>
<div class="inx-single-property__section inx-single-property__section--type--location-info">
	<?php echo $utils['format']->get_heading( $inx_skin_headline, $inx_skin_heading_level, 'inx-single-property__section-title uk-heading-divider' ); ?>

	<?php if ( $inx_skin_show_map && 'ol_osm_map_marker' === $template_data['property_details_map_type'] ) : ?>
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
	>
	</inx-property-location-google-map>
	<?php elseif ( $inx_skin_show_map && 'gmap_embed' === $template_data['property_details_map_type'] ) : ?>
	<inx-property-location-google-embed-map
		location="<?php echo urlencode( $inx_skin_map_location ); ?>"
		:zoom="<?php echo $template_data['property_details_map_zoom']; ?>"
		api-key="<?php echo esc_attr( $inx_skin_google_api_key ); ?>"
		note="<?php echo $inx_skin_map_note; ?>"
		privacy-note="<?php echo esc_attr( nl2br( $inx_skin_gmaps_privacy_note ) ); ?>"
		show-map-button-text="<?php echo esc_attr( __( 'Agreed, show maps!', 'immonex-kickstart' ) ); ?>"
	>
	</inx-property-location-google-embed-map>
	<?php endif; ?>

	<?php if ( $inx_skin_location_description ) : ?>
	<div class="inx-description-text uk-margin-bottom">
		<?php echo $utils['string']->convert_urls( $utils['format']->prepare_continuous_text( $inx_skin_location_description ) ); ?>
	</div>
	<?php endif; ?>

	<?php if ( count( $inx_skin_details ) > 0 ) : ?>
	<ul class="inx-detail-list uk-grid-small" uk-grid>
		<?php foreach ( $inx_skin_details as $inx_skin_detail ) : ?>
		<li class="inx-detail-list__item uk-width-1-2@l">
			<span class="inx-detail-list__title"><?php echo $inx_skin_detail['title']; ?>:</span>
			<span class="inx-detail-list__value"><?php echo $inx_skin_detail['value']; ?></span>
		</li>
		<?php endforeach; ?>
	</ul>
	<?php endif; ?>
</div>
	<?php
endif;
