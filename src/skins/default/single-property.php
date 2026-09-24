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

if ( function_exists( 'wp_is_block_theme' ) && wp_is_block_theme() ) {
	require __DIR__ . '/header.php';
} else {
	get_header();
}
?>

<div id="inx-property-details" class="inx-single-property uk-container" role="main">
	<div uk-grid>
		<div class="inx-single-property__main-content inx-container uk-width-expand@m">
	<?php
	while ( have_posts() ) {
		the_post();

		if ( ! post_password_required() ) {
			do_action( 'inx_before_render_single_property' );
			do_action( 'inx_render_property_contents' );
			do_action( 'inx_after_render_single_property' );
		} else {
			echo get_the_password_form();
		}
	}
	?>
		</div>

		<?php if ( is_active_sidebar( 'inx-property-details' ) && ! post_password_required() ) : ?>
		<div class="inx-single-property__sidebar uk-width-1-3@m">
			<ul>
				<?php dynamic_sidebar( 'inx-property-details' ); ?>
			</ul>
		</div>
		<?php endif; ?>
	</div>
</div>

<?php
if ( function_exists( 'wp_is_block_theme' ) && wp_is_block_theme() ) {
	require __DIR__ . '/footer.php';
} else {
	get_footer();
}
