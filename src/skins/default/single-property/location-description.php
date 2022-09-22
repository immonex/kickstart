<?php
/**
 * Template for property location description/data (WITHOUT map)
 *
 * @package immonex\Kickstart
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

if ( $inx_skin_location_description || count( $inx_skin_details ) > 0 ) :
	?>
<div class="inx-single-property__section inx-single-property__section--type--location-description">
	<?php echo $utils['format']->get_heading( $inx_skin_headline, $inx_skin_heading_level, 'inx-single-property__section-title uk-heading-divider' ); ?>

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
