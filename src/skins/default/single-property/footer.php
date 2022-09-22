<?php
/**
 * Template for property details footer
 *
 * @package immonex\Kickstart
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

?>
<div class="inx-single-property__footer uk-padding uk-margin-bottom">
	<div class="uk-flex-middle" uk-grid>
		<div class="uk-width-1-1 uk-width-1-2@s">
			<?php if ( $template_data['overview_url'] ) : ?>
			<a href="<?php echo esc_attr( $template_data['overview_url'] ); ?>" class="inx-link">
				<span uk-icon="chevron-left"></span>
				<?php esc_html_e( 'Back to overview', 'immonex-kickstart' ); ?>
			</a>
			<?php endif; ?>
		</div>

		<div class="uk-width-1-1 uk-width-1-2@s uk-text-right">
			<!-- powered by immonex Kickstart! -->
		</div>
	</div>
</div>
