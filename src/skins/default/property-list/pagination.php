<?php
/**
 * Template for property list pagination
 *
 * @package immonex\Kickstart
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$inx_skin_pagination = get_the_posts_pagination( $template_data );
$inx_skin_classes    = array_filter(
	// Internal filter.
	apply_filters(
		'inx_skin_pagination_classes',
		[
			'inx-pagination',
			empty( $template_data['no_standard_container_class'] ) ? 'inx-container' : null,
			! empty( $template_data['style'] ) ? "inx-pagination--style--{$template_data['style']}" : null,
			! empty( $inx_skin_pagination ) && empty( $template_data['no_top_margin'] ) ? 'uk-margin-large-top' : null,
		]
	)
);
?>
<div class="<?php echo esc_attr( implode( ' ', $inx_skin_classes ) ); ?>">
	<?php echo $inx_skin_pagination; ?>
</div>
