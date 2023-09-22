<?php
/**
 * Default main template for property detail views
 *
 * @package immonex\Kickstart
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
?>
<div id="inx-property-details" class="inx-single-property uk-container" role="main">
	<div uk-grid>
		<div class="inx-single-property__main-content inx-container uk-width-expand@m">
	<?php
	while ( have_posts() ) {
		the_post();

		do_action( 'inx_before_render_single_property' );
		do_action( 'inx_render_property_contents' );
		do_action( 'inx_after_render_single_property' );
	}
	?>
		</div>

		<?php if ( is_active_sidebar( 'inx-property-details' ) ) : ?>
		<div class="inx-single-property__sidebar uk-width-1-3@m">
			<ul>
				<?php dynamic_sidebar( 'inx-property-details' ); ?>
			</ul>
		</div>
		<?php endif; ?>
	</div>
</div>
<?php
get_footer();
