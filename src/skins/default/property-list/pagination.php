<?php
/**
 * Template for property list pagination
 *
 * @package immonex-kickstart
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<div class="inx-pagination uk-margin-top">
	<?php
		the_posts_pagination(
			array(
				'prev_text' => __( 'Previous page', 'inx' ),
				'next_text' => __( 'Next page', 'inx' ),
				'mid_size'  => 2,
			)
		);
		?>
</div>
