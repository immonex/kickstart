<?php
/**
 * Template for a property description text (main description, location, features...)
 *
 * @package immonex\Kickstart
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! empty( $template_data['field_name'] ) ) {
	$inx_skin_description = $utils['data']->get_custom_field_by( 'name', $template['field_name'], $template_data['post_id'], true );
} else {
	$inx_skin_description = $template_data['main_description'];
}

$inx_skin_heading_level = isset( $template_data['heading_level'] ) ? $template_data['heading_level'] : 2;
$inx_skin_autop         = $template_data['apply_wpautop_details_page'] ? true : 'noautop';

if ( $inx_skin_description ) :
	?>
<div class="inx-single-property__section inx-single-property__section--type--description-text">
	<?php
	if ( isset( $template_data['headline'] ) ) {
		echo $utils['format']->get_heading(
			$template_data['headline'],
			$inx_skin_heading_level,
			'inx-single-property__section-title uk-heading-divider'
		);
	}
	?>

	<div class="inx-description-text">
		<?php echo $utils['string']->convert_urls( $utils['format']->prepare_continuous_text( $inx_skin_description, $inx_skin_autop ) ); ?>
	</div>
</div>
	<?php
endif;
