<?php
/**
 * Default archive template for the property post type
 *
 * @package immonex-kickstart
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

global $immonex_kickstart;

if ( $immonex_kickstart->property_list_page_id ) {
	$inx_skin_redirect_url = get_permalink( $immonex_kickstart->property_list_page_id );
	if ( $inx_skin_redirect_url ) {
		wp_safe_redirect( $inx_skin_redirect_url );
		exit;
	}
}

get_header();
?>

<div class="inx-property-archive uk-container" role="main">
	<header class="inx-page-header inx-container">
		<?php
			the_archive_title(
				'<h' . $immonex_kickstart->heading_base_level . ' class="inx-page-title">',
				'</h' . $immonex_kickstart->heading_base_level . '>'
			);
			the_archive_description(
				'<div class="inx-taxonomy-description">',
				'</div>'
			);
			?>
	</header>

	<div uk-grid>
		<div class="inx-property-archive__main-content inx-container uk-width-expand@m">
			<?php
				do_action( 'inx_render_property_search_form' );
				do_action( 'inx_render_property_filters_sort' );
				do_action(
					'inx_render_property_list',
					array(
						'is_regular_archive_page' => true,
					)
				);
				do_action(
					'inx_render_pagination',
					array(
						'is_regular_archive_page' => true,
					)
				);
				?>
		</div>

		<?php if ( is_active_sidebar( 'inx-property-archive' ) ) : ?>
		<div class="inx-property-archive__sidebar uk-width-1-3@m">
			<ul>
				<?php dynamic_sidebar( 'inx-property-archive' ); ?>
			</ul>
		</div>
		<?php endif; ?>
	</div>
</div>

<?php get_footer(); ?>
