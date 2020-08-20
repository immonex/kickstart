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
?>
<div id="inx-property-list" class="inx-property-list<?php echo have_posts() ? '' : ' inx-property-list--is-empty'; ?> inx-container">

	<?php
	if ( have_posts() ) :
		while ( have_posts() ) :
			the_post();
			?>

	<div class="inx-property-list__item-wrap">
			<?php do_action( 'inx_render_property_contents', false, 'property-list/list-item' ); ?>
	</div>

			<?php
		endwhile;
	else :
		?>

	<div class="inx-property-list__no-properties">
		<p><?php echo __( 'Currently there are no properties that match the search criteria.', 'immonex-kickstart' ); ?></p>
	</div>

		<?php
	endif;
	?>

</div>
