<?php
/**
 * Template for embedding external 360° views or virtual tours
 *
 * @package immonex\Kickstart
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( $template_data['virtual_tour_embed_code'] ) :
	$inx_skin_heading_level = isset( $template_data['heading_level'] ) ?
		$template_data['heading_level'] :
		2;
	?>
<div class="inx-single-property__section inx-single-property__section--type--virtual-tour">
	<?php
	if ( isset( $template_data['headline'] ) ) {
		echo $utils['format']->get_heading(
			$template_data['headline'],
			$inx_skin_heading_level,
			'inx-single-property__section-title uk-heading-divider'
		);
	}
	?>

	<div class="inx-video-wrap">
		<?php echo $template_data['virtual_tour_embed_code']; ?>
	</div>
</div>
	<?php
endif;
