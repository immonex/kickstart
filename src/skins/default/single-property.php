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
$inx_skin_page_url             = $inx_skin_use_page_as_template ?
	get_permalink( $inx_skin_use_page_as_template ) :
	false;

if (
	$inx_skin_use_page_as_template
	&& $inx_skin_page_url
) :
	$inx_skin_url_parts     = parse_url( $_SERVER['REQUEST_URI'] );
	$inx_skin_add_url_path  = isset( $inx_skin_url_parts['path'] ) ?
		'-' . basename( $inx_skin_url_parts['path'] ) :
		'';
	$inx_skin_add_url_query = isset( $inx_skin_url_parts['query'] ) ?
		'&' . basename( $inx_skin_url_parts['query'] ) :
		'';
	$inx_skin_redirect_url  = $inx_skin_page_url .
		( false === strpos( $inx_skin_page_url, '?' ) ? '?' : '&' ) .
		'inx-property-id=' . get_the_ID() .
		$inx_skin_add_url_path .
		$inx_skin_add_url_query;

	if ( headers_sent() ) {
		// Fallback redirect solution if headers have already been sent.
		echo "<script>window.location.replace('$inx_skin_redirect_url');</script>";
	} else {
		nocache_headers();
		wp_safe_redirect( $inx_skin_redirect_url );
		exit;
	}
else :
	get_header();
	?>
<div id="inx-property-details" class="inx-single-property uk-container" role="main">
	<div uk-grid>
		<div class="inx-single-property__main-content inx-container uk-width-expand@m">
	<?php
	while ( have_posts() ) {
		the_post();
		do_action( 'inx_render_property_contents' );
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
endif;
