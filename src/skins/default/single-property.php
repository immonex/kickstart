<?php
/**
 * Default main template for property detail views
 *
 * @package immonex-kickstart
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

global $immonex_kickstart;

$inx_skin_use_page_as_template = $immonex_kickstart->property_details_page_id;

get_header();
?>

<div id="inx-property-details" class="inx-single-property uk-container" role="main">
	<div uk-grid>
		<div class="inx-single-property__main-content inx-container uk-width-expand@m">
		<?php
		if ( $inx_skin_use_page_as_template ) {
			$page = get_post( $inx_skin_use_page_as_template );
			if ( $page ) {
				echo apply_filters( 'inx_the_content', $page->post_content );
			}
		} else {
			while ( have_posts() ) {
				the_post();
				do_action( 'inx_render_property_contents' );
			}
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

<?php get_footer(); ?>
