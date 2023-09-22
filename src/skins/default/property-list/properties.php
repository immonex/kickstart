<?php
/**
 * Template for property lists
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
);
if ( ! have_posts() ) {
	$inx_skin_container_classes[] = 'inx-property-list--is-empty';
}
?>
<div class="inx-cq">
	<?php do_action( 'inx_before_render_property_list', have_posts() ); ?>

	<div id="<?php echo $inx_skin_list_item_atts['cid']; ?>" class="<?php echo implode( ' ', $inx_skin_container_classes ); ?>">
		<?php
		if ( have_posts() ) :
			while ( have_posts() ) :
				the_post();
				?>

				<div class="inx-property-list__item-wrap">
				<?php
				do_action( 'inx_before_render_property_list_item' );
				do_action( 'inx_render_property_contents', false, 'property-list/list-item', $inx_skin_list_item_atts );
				do_action( 'inx_after_render_property_list_item' );
				?>
				</div>

				<?php
			endwhile;
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

	<?php do_action( 'inx_after_render_property_list', have_posts() ); ?>
</div>
