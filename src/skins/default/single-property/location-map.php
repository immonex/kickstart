<?php
/**
 * Template for property location map (only)
 *
 * @package immonex\Kickstart
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$inx_skin_headline = isset( $template_data['headline'] ) ?
	$template_data['headline'] : '';

$inx_skin_heading_level = isset( $template_data['heading_level'] ) ?
	$template_data['heading_level'] :
	2;

require trailingslashit( __DIR__ ) . 'map-init.php';

if ( $inx_skin_show_map ) :
	?>
<div class="inx-single-property__section inx-single-property__section--type--location-map">
	<?php echo $utils['format']->get_heading( $inx_skin_headline, $inx_skin_heading_level, 'inx-single-property__section-title uk-heading-divider' ); ?>

	<?php include trailingslashit( __DIR__ ) . 'map-embed.php'; ?>
</div>
	<?php
endif;
