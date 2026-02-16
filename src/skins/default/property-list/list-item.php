<?php
/**
 * Template for property list items
 *
 * @package immonex\Kickstart
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$inx_skin_oi_css_classes = $template_data['oi_css_classes'] ? implode( ' ', $template_data['oi_css_classes'] ) : '';
$inx_skin_rooms_icon     = 'flaticon-blueprint';
$inx_skin_disable_link   = ! empty( $template_data['disable_link'] );

if (
	$template_data['primary_rooms']['value'] &&
	isset( $template_data['primary_rooms']['meta']['mapping_source'] ) &&
	'flaechen->anzahl_schlafzimmer' === $template_data['primary_rooms']['meta']['mapping_source']
) {
	$inx_skin_rooms_icon = 'flaticon-hotel';
}
?>
<div class="inx-property-list-item inx-property-list-item--card uk-card uk-card-default uk-animation-scale-up">
	<?php if ( ! $inx_skin_disable_link ) : ?>
	<a href="<?php echo esc_url( $template_data['url'] ); ?>" aria-role="presentation" tabindex="-1">
	<?php endif; ?>
	<div class="inx-property-list-item__media-top uk-card-media-top uk-cover-container">
		<?php
		if ( $template_data['thumbnail_tag'] ) {
			echo preg_replace( '/[\/]?\>/', 'uk-cover>', $template_data['thumbnail_tag'] );
		}
		?>
	</div>
	<?php if ( ! $inx_skin_disable_link ) : ?>
	</a>
	<?php endif; ?>

	<div class="inx-property-list-item__body uk-card-body">
		<div class="inx-property-list-item__title uk-card-title">
			<?php if ( ! $inx_skin_disable_link ) : ?>
			<a href="<?php echo esc_url( $template_data['url'] ); ?>" class="inx-link <?php echo esc_attr( $inx_skin_oi_css_classes ); ?>">
			<?php endif; ?>
				<?php echo $template_data['title']; ?>
			<?php if ( ! $inx_skin_disable_link ) : ?>
			</a>
			<?php endif; ?>
		</div>

		<div class="uk-margin-bottom">
			<?php if ( $template_data['property_type'] ) : ?>
			<div class="inx-property-list-item__property-type">
				<i class="inx-core-detail-icon flaticon-tag-1" title="<?php echo $template_data['property_type']; ?>"></i>
				<div><?php echo esc_html( $template_data['property_type'] ); ?></div>
			</div>
			<?php endif; ?>

			<?php if ( $template_data['location'] ) : ?>
			<div class="inx-property-list-item__location" lang="de">
				<i class="inx-core-detail-icon flaticon-placeholder" title="<?php esc_html_e( 'Location', 'immonex-kickstart' ); ?>"></i>
				<div><?php echo str_replace( '(', PHP_EOL . '<br>(', $template_data['location'] ); ?></div>
			</div>
			<?php endif; ?>
		</div>

		<?php if ( $template_data['excerpt'] ) : ?>
		<p class="inx-property-list-item__excerpt"><?php echo $template_data['excerpt']; ?></p>
		<?php endif; ?>
	</div>

	<div class="inx-property-list-item__footer uk-card-footer">
		<?php if ( $template_data['primary_area']['value'] || $template_data['primary_rooms']['value'] ) : ?>
		<div class="inx-property-list-item__core-details uk-flex uk-flex-around">
			<?php if ( $template_data['primary_area']['value'] ) : ?>
			<div>
				<i class="inx-core-detail-icon flaticon-size" title="<?php echo esc_attr( $template_data['primary_area']['title'] ); ?>"></i> <?php echo $template_data['primary_area']['value_formatted']; ?>
			</div>
			<?php endif; ?>

			<?php if ( $template_data['plot_area']['value'] && $template_data['plot_area']['value'] !== $template_data['primary_area']['value'] ) : ?>
			<div>
				<i class="inx-core-detail-icon flaticon-blueprint-3" title="<?php echo esc_attr( $template_data['plot_area']['title'] ); ?>"></i> <?php echo $template_data['plot_area']['value_formatted']; ?>
			</div>
			<?php endif; ?>

			<?php if ( $template_data['primary_rooms']['value'] ) : ?>
			<div>
				<i class="inx-core-detail-icon <?php echo $inx_skin_rooms_icon; ?>" title="<?php echo esc_attr( $template_data['primary_rooms']['title'] ); ?>"></i> <?php echo $template_data['primary_rooms']['value_formatted']; ?>
			</div>
			<?php endif; ?>
		</div>
		<?php endif; ?>

		<?php
		if ( $template_data['primary_price']['value_formatted'] ) :
			$inx_skin_price_quotation = $template_data['primary_price']['value_formatted'];
			if ( $template_data['price_time_unit']['value'] ) {
				$inx_skin_price_quotation .= '&nbsp;<span class="inx-price-time-unit inx-property-list-item__price-time-unit">' . $template_data['price_time_unit']['value'] . '</span>';
			}

			if ( $inx_skin_disable_link ) :
				?>
		<div class="inx-property-list-item__property-price inx-property-price<?php echo $inx_skin_oi_css_classes ? ' ' . esc_attr( $inx_skin_oi_css_classes ) . ' inx-oi--inverted' : ''; ?>">
				<?php
			else :
				?>
		<a href="<?php echo $template_data['url']; ?>" aria-role="presentation" tabindex="-1" class="inx-property-list-item__property-price inx-property-price<?php echo $inx_skin_oi_css_classes ? ' ' . esc_attr( $inx_skin_oi_css_classes ) . ' inx-oi--inverted' : ''; ?> inx-link">
				<?php
			endif;

			echo $inx_skin_price_quotation;

			if ( $inx_skin_disable_link ) :
				?>
		</div>
			<?php else : ?>
		</a>
				<?php
			endif;
		endif;
		?>
	</div>

	<?php if ( count( $template_data['labels'] ) > 0 ) : ?>
	<div class="inx-property-list-item__labels uk-position-top-right">
		<?php
		foreach ( $template_data['labels'] as $inx_skin_label ) :
			if ( ! is_array( $inx_skin_label ) || empty( $inx_skin_label['show'] ) ) {
				continue;
			}
			?>
		<span class="<?php echo ! empty( $inx_skin_label['css_classes'] ) ? esc_attr( implode( ' ', $inx_skin_label['css_classes'] ) ) . ' ' : ''; ?>uk-label"><?php echo esc_html( $inx_skin_label['name'] ); ?></span><br>
			<?php
		endforeach;
		?>
	</div>
	<?php endif; ?>
</div>
