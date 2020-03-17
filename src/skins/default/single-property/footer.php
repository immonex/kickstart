<?php
/**
 * Template for property details footer
 *
 * @package immonex-kickstart
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

?>
<div class="inx-single-property__footer uk-padding uk-margin-bottom">
	<div uk-grid>
		<div class="uk-width-1-1 uk-width-1-2@s">
			<?php if ( $template_data['overview_url'] ) : ?>
			<a href="<?php echo esc_attr( $template_data['overview_url'] ); ?>" class="inx-link"><span uk-icon="chevron-left"></span> <?php _e( 'Back to overview', 'inx' ); ?></a>
			<?php endif; ?>
		</div>

		<div class="uk-width-1-1 uk-width-1-2@s uk-text-right">
			<!-- powered by immonex Kickstart! -->
		</div>
	</div>
</div>
