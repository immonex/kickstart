<?php
/**
 * Template for property feature description and term lists
 *
 * @package immonex\Kickstart
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$inx_skin_features_description = $utils['data']->get_custom_field_by(
	'name',
	'freitexte.ausstatt_beschr',
	$template_data['post_id'],
	true
);

$inx_skin_groups = isset( $template_data['groups'] ) && $template_data['groups'] ?
	$utils['data']->convert_to_group_array( $template_data['groups'] ) :
	'';

$inx_skin_details = count( $inx_skin_groups ) > 0 ?
	$utils['data']->get_group_items( $template_data['details'], $inx_skin_groups ) :
	array();

$inx_skin_heading_level = isset( $template_data['heading_level'] ) ?
	$template_data['heading_level'] :
	2;

$inx_skin_li_classes = isset( $template_data['class'] ) ?
	$template_data['class'] :
	'uk-width-1-2@l';

if (
	$inx_skin_features_description ||
	count( $template_data['features'] ) > 0 ||
	count( $inx_skin_details ) > 0
) :
	?>
<div class="inx-single-property__section inx-single-property__section--type--features">
	<?php
	if ( isset( $template_data['headline'] ) ) {
		echo $utils['format']->get_heading(
			$template_data['headline'],
			$inx_skin_heading_level,
			'inx-single-property__section-title uk-heading-divider'
		);
	}
	?>

	<?php if ( $inx_skin_features_description ) : ?>
	<div class="inx-description-text">
		<?php echo $utils['format']->prepare_continuous_text( $inx_skin_features_description ); ?>
	</div>
	<?php endif; ?>

	<?php if ( count( $inx_skin_details ) > 0 ) : ?>
	<ul class="inx-detail-list uk-grid-small uk-margin-top" uk-grid>
		<?php foreach ( $inx_skin_details as $inx_skin_detail ) : ?>
		<li class="inx-detail-list__item<?php echo $inx_skin_li_classes ? ' ' . $inx_skin_li_classes : ''; ?>">
			<span class="inx-detail-list__title"><?php echo esc_html( $inx_skin_detail['title'] ); ?>:</span>
			<span class="inx-detail-list__value"><?php echo $utils['format']->prepare_single_value( $inx_skin_detail['value'] ); ?></span>
		</li>
		<?php endforeach; ?>
	</ul>
	<?php endif; ?>

	<?php if ( count( $template_data['features'] ) > 0 ) : ?>
	<ul class="inx-feature-list uk-grid-small uk-margin-top" uk-grid>
		<?php foreach ( $template_data['features'] as $inx_skin_feature_term ) : ?>
		<li class="inx-feature-list__item uk-width-1-2@m uk-width-1-3@l uk-flex">
			<div class="inx-feature-list__icon uk-width-auto"><span class="uk-margin-small-right" uk-icon="check"></span></div>
			<div class="inx-feature-list__name uk-width-expand"><?php echo $utils['format']->prepare_single_value( $inx_skin_feature_term->name ); ?></div>
		</li>
		<?php endforeach; ?>
	</ul>
	<?php endif; ?>
</div>
	<?php
endif;
