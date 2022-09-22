<?php
/**
 * Template for a property details section
 *
 * @package immonex\Kickstart
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$inx_skin_description_text = isset( $template_data['description_text_field'] ) ?
	$utils['data']->get_custom_field_by(
		'name',
		$template_data['description_text_field'],
		$template_data['post_id'],
		true
	) :
	false;

$inx_skin_autop = $template_data['apply_wpautop_details_page'] ? true : 'noautop';

$inx_skin_groups = isset( $template_data['groups'] ) && $template_data['groups'] ?
	$utils['data']->convert_to_group_array( $template_data['groups'] ) :
	'';

$inx_skin_details = ! empty( $inx_skin_groups ) ?
	$utils['data']->get_group_items( $template_data['details'], $inx_skin_groups ) :
	array();

$inx_skin_li_classes = isset( $template_data['class'] ) ?
	$template_data['class'] :
	'uk-width-1-2@l';

$inx_skin_heading_level = isset( $template_data['heading_level'] ) ?
	$template_data['heading_level'] :
	2;

if (
	! $template_data['show_reference_prices'] &&
	$template_data['flags']['is_reference'] &&
	count( $inx_skin_details ) > 0
) {
	$inx_skin_details = array_filter(
		$inx_skin_details,
		function ( $inx_skin_detail ) {
			if (
				false !== stripos( $inx_skin_detail['group'], 'preise' ) ||
				false !== stripos( $inx_skin_detail['group'], 'prices' ) ||
				false !== stripos( $inx_skin_detail['title'], 'preis' ) ||
				false !== stripos( $inx_skin_detail['title'], 'price' )
			) {
				return false;
			}

			return true;
		}
	);
}

if ( $inx_skin_description_text || ! empty( $inx_skin_details ) ) :
	?>
<div class="inx-single-property__section inx-single-property__section--type--details">
	<?php
	if ( isset( $template_data['headline'] ) ) {
		echo $utils['format']->get_heading(
			$template_data['headline'],
			$inx_skin_heading_level,
			'inx-single-property__section-title uk-heading-divider'
		);
	}
	?>

	<?php if ( $inx_skin_description_text ) : ?>
	<div class="inx-description-text uk-margin-bottom">
		<?php
			echo $utils['string']->convert_urls(
				$utils['format']->prepare_continuous_text( $inx_skin_description_text, $inx_skin_autop )
			);
		?>
	</div>
	<?php endif; ?>

	<?php if ( count( $inx_skin_details ) > 0 ) : ?>
	<ul class="inx-detail-list uk-grid-small" uk-grid>
		<?php foreach ( $inx_skin_details as $inx_skin_detail ) : ?>
		<li class="inx-detail-list__item<?php echo $inx_skin_li_classes ? ' ' . $inx_skin_li_classes : ''; ?>">
			<span class="inx-detail-list__title"><?php echo esc_html( $inx_skin_detail['title'] ); ?>:</span>
			<span class="inx-detail-list__value"><?php echo $utils['format']->prepare_single_value( $inx_skin_detail['value'] ); ?></span>
		</li>
		<?php endforeach; ?>
	</ul>
	<?php endif; ?>
</div>
	<?php
endif;
