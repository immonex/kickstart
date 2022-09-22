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

$inx_skin_marker_icon = $utils['template']->locate_template_file(
	'images/location-pin.png'
);

$inx_skin_marker_icon_url = $inx_skin_marker_icon ?
	$utils['template']->get_template_file_url( $inx_skin_marker_icon ) :
	'';

$inx_skin_osmaps_privacy_note = wp_sprintf(
	/* translators: %s = OSM Privacy Policy URL */
	__( 'This website utilizes map services provided by the OpenStreetMap Foundation, St John’s Innovation Centre, Cowley Road, Cambridge, CB4 0WS, United Kingdom (short OSMF). Your Internet browser or application will connect to servers operated by the OSMF located in the United Kingdom and in other countries. The operator of this site has no control over such connections and processing of your data by the OSMF. You can find more information on the processing of user data by the OSMF in the <a href="%s">OSMF privacy policy</a>.', 'immonex-kickstart' ),
	'https://wiki.osmfoundation.org/wiki/Privacy_Policy'
);
?>
<div id="<?php echo $inx_skin_component_id; ?>" class="inx-property-map-container inx-container">
	<inx-property-open-layers-map
		:lat="<?php echo esc_attr( $template_data['lat'] ); ?>"
		:lng="<?php echo esc_attr( $template_data['lng'] ); ?>"
		:zoom="<?php echo esc_attr( $template_data['zoom'] ); ?>"
		:auto-fit="<?php echo $template_data['property_list_map_auto_fit'] ? 'true' : 'false'; ?>"
		marker-set-id="<?php echo esc_attr( $template_data['marker_set_id'] ); ?>"
		marker-icon-url="<?php echo esc_url( $inx_skin_marker_icon_url ); ?>"
		privacy-note="<?php echo esc_attr( nl2br( $inx_skin_osmaps_privacy_note ) ); ?>"
		show-map-button-text="<?php echo esc_attr( __( 'Agreed, show maps!', 'immonex-kickstart' ) ); ?>"
		:require-consent="<?php echo (bool) $template_data['require-consent'] ? 'true' : 'false'; ?>"
	>
	</inx-property-open-layers-map>
</div>
