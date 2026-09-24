<?php
/**
 * Block-backed shim for classic footer templates
 *
 * @package immonex\Kickstart
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>

			</main><!-- #main -->

			<footer class="wp-block-template-part">
				<?php block_footer_area(); ?>
			</footer>

		</div><!-- .wp-site-blocks -->

		<?php
		wp_enqueue_stored_styles();
		wp_footer();
		?>

	</body>
</html>
