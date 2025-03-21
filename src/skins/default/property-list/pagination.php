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

$inx_skin_pagination = get_the_posts_pagination( $inx_skin_pagination_args );

if ( ! empty( $inx_skin_pagination ) ) :
	?>
<div class="inx-pagination uk-margin-large-top">
	<?php echo $inx_skin_pagination; ?>
</div>
	<?php
endif;
