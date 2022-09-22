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

$inx_skin_pagination_args = array(
	'prev_text' => __( 'Previous page', 'immonex-kickstart' ),
	'next_text' => __( 'Next page', 'immonex-kickstart' ),
	'mid_size'  => 2,
);
if ( ! empty( $template_data['base_url'] ) ) {
	$inx_skin_pagination_args['base'] = $template_data['base_url'];
}
?>
<div class="inx-pagination uk-margin-top">
	<?php the_posts_pagination( $inx_skin_pagination_args ); ?>
</div>
