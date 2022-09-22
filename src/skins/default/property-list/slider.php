<?php
/**
 * Template for property list sliders
 *
 * @package immonex\Kickstart
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

global $immonex_kickstart;

$inx_skin_list_item_atts = array(
	'cid'             => ! empty( $template_data['cid'] ) ? $template_data['cid'] : 'inx-property-list',
	'render_count'    => ! empty( $template_data['render_count'] ) ? $template_data['render_count'] : 0,
	'disable_links'   => ! empty( $template_data['disable_links'] ) ? $template_data['disable_links'] : '',
	'list_query_atts' => ! empty( $template_data['list_query_atts'] ) ? $template_data['list_query_atts'] : array(),
);

$inx_skin_container_classes = array(
	'inx-container',
	'inx-property-list',
	'inx-property-list--is-slider',
);
if ( ! have_posts() ) {
	$inx_skin_container_classes[] = 'inx-property-list--is-empty';
}
?>
<div class="inx-cq">
	<div id="<?php echo $inx_skin_list_item_atts['cid']; ?>" class="<?php echo implode( ' ', $inx_skin_container_classes ); ?>">
		<?php if ( have_posts() ) : ?>
			<div uk-slider>
				<div class="uk-position-relative">
					<ul class="uk-slider-items uk-child-width-1-2@s uk-child-width-1-3@l uk-grid uk-grid-small">
						<?php
						while ( have_posts() ) :
							the_post();
							?>
							<li class="inx-property-slider__item-wrap">
								<?php do_action( 'inx_render_property_contents', false, 'property-list/list-item', $inx_skin_list_item_atts ); ?>
							</li>
						<?php endwhile; ?>
					</ul>

					<div class="inx-property-list__slide-nav">
						<a class="uk-position-center-left uk-position-small" href="#" uk-slidenav-previous uk-slider-item="previous"></a>
						<a class="uk-position-center-right uk-position-small" href="#" uk-slidenav-next uk-slider-item="next"></a>
					</div>
				</div>

				<ul class="inx-property-list__slider-dotnav uk-slider-nav uk-dotnav uk-flex-center uk-margin"></ul>
			</div>
			<?php
		else :
			if ( ! empty( $template_data['no_results_text'] ) ) :
				?>

		<div class="inx-property-list__no-properties">
			<p><?php echo $template_data['no_results_text']; ?></p>
		</div>

				<?php
			endif;
		endif;
		?>
	</div>
</div>
