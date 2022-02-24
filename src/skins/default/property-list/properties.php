<?php
/**
 * Template for property lists
 *
 * @package immonex-kickstart
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
?>
<div id="<?php echo $inx_skin_list_item_atts['cid']; ?>" class="inx-property-list<?php echo have_posts() ? '' : ' inx-property-list--is-empty'; ?> inx-container">

	<?php
	if ( have_posts() ) :
		while ( have_posts() ) :
			the_post();
			?>

	<div class="inx-property-list__item-wrap">
			<?php do_action( 'inx_render_property_contents', false, 'property-list/list-item', $inx_skin_list_item_atts ); ?>
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
