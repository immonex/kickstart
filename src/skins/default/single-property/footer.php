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

$inx_skin_ipn = $template_data['inter_post_nav'];
?>
<div class="inx-single-property__footer uk-margin-small-bottom <?php echo $inx_skin_ipn['has_prev_next'] ? 'uk-padding-small' : 'uk-padding'; ?>">
	<?php if ( $inx_skin_ipn['has_prev_next'] ) : ?>
	<div class="uk-flex uk-flex-between uk-flex-middle">
		<?php if ( $inx_skin_ipn['has_first_last'] ) : ?>
		<div class="inx-single-property__post-nav-item">
			<?php if ( $inx_skin_ipn['first_url'] ) : ?>
			<a
				href="<?php echo esc_url( $inx_skin_ipn['first_url'] ); ?>"
				class="inx-link"
				<?php if ( $inx_skin_ipn['enable_tooltips'] ) { ?>uk-tooltip="<?php echo esc_attr( $inx_skin_ipn['first_title'] ); ?>"<?php } // phpcs:ignore ?>
			>
			<?php endif; ?>
				<span
					class="inx-single-property__post-nav-arrow inx-single-property__post-nav-arrow--first"
					uk-icon="icon: chevron-double-left; ratio: <?php echo esc_attr( $inx_skin_ipn['icon_ratio_first_last'] ); ?>"
				></span>
			<?php if ( $inx_skin_ipn['first_url'] ) : ?>
				<span class="screen-reader-text"><?php echo wp_sprintf( '%s: %s', __( 'First property', 'immonex-kickstart' ), $inx_skin_ipn['first_title'] ); ?></span>
			</a>
			<?php endif; ?>
		</div>
		<?php endif; ?>

		<div class="inx-single-property__post-nav-item">
			<?php if ( $inx_skin_ipn['prev_url'] ) : ?>
			<a
				href="<?php echo esc_url( $inx_skin_ipn['prev_url'] ); ?>"
				class="inx-link"
				<?php if ( $inx_skin_ipn['enable_tooltips'] ) { ?>uk-tooltip="<?php echo esc_attr( $inx_skin_ipn['prev_title'] ); ?>"<?php } // phpcs:ignore ?>
			>
			<?php endif; ?>
				<span
					class="inx-single-property__post-nav-arrow inx-single-property__post-nav-arrow--prev"
					uk-icon="icon: chevron-left; ratio: <?php echo esc_attr( $inx_skin_ipn['icon_ratio'] ); ?>"
				></span>
			<?php if ( $inx_skin_ipn['prev_url'] ) : ?>
				<span class="screen-reader-text"><?php echo wp_sprintf( '%s: %s', __( 'Previous property', 'immonex-kickstart' ), $inx_skin_ipn['prev_title'] ); ?></span>
			</a>
			<?php endif; ?>
		</div>

		<div class="inx-single-property__post-nav-item uk-text-center">
			<a
				href="<?php echo esc_url( $template_data['overview_url'] ); ?>"
				class="inx-link uk-flex-column"
				<?php if ( $inx_skin_ipn['enable_tooltips'] ) { ?>uk-tooltip="<?php echo esc_attr( $inx_skin_ipn['overview_link_text'] ); ?>"<?php } // phpcs:ignore ?>
			>
				<span
					class="inx-single-property__post-nav-arrow inx-single-property__post-nav-arrow--overview"
					uk-icon="icon: chevron-up; ratio: <?php echo esc_attr( $inx_skin_ipn['icon_ratio'] ); ?>"
				></span>
				<?php if ( $inx_skin_ipn['current_no'] && $inx_skin_ipn['total'] ) : ?>
				<div class="screen-reader-text"><?php esc_html_e( 'Property', 'immonex-kickstart' ); ?></div>
				<div class="inx-single-property__post-nav-index">
					<?php
						/* translators: "Property 8 of 16" */
						echo wp_sprintf( __( '%1$d of %2$d', 'immonex-kickstart' ), $inx_skin_ipn['current_no'], $inx_skin_ipn['total'] );
					?>
				</div>
				<div class="screen-reader-text"><?php echo __( 'Back to overview', 'immonex-kickstart' ); ?></div>
				<?php else : ?>
					<?php echo $inx_skin_ipn['overview_link_text']; ?>
				<?php endif; ?>
			</a>
		</div>

		<div class="inx-single-property__post-nav-item">
			<?php if ( $inx_skin_ipn['next_url'] ) : ?>
			<a
				href="<?php echo esc_url( $inx_skin_ipn['next_url'] ); ?>"
				class="inx-link"
				<?php if ( $inx_skin_ipn['enable_tooltips'] ) { ?>uk-tooltip="<?php echo esc_attr( $inx_skin_ipn['next_title'] ); ?>"<?php } // phpcs:ignore ?>
			>
			<?php endif; ?>
				<span
					class="inx-single-property__post-nav-arrow inx-single-property__post-nav-arrow--next"
					uk-icon="icon: chevron-right; ratio: <?php echo esc_attr( $inx_skin_ipn['icon_ratio'] ); ?>"
				></span>
			<?php if ( $inx_skin_ipn['next_url'] ) : ?>
				<span class="screen-reader-text"><?php echo wp_sprintf( '%s: %s', __( 'Next property', 'immonex-kickstart' ), $inx_skin_ipn['next_title'] ); ?></span>
			</a>
			<?php endif; ?>
		</div>

		<?php if ( $inx_skin_ipn['has_first_last'] ) : ?>
		<div class="inx-single-property__post-nav-item">
			<?php if ( $inx_skin_ipn['last_url'] ) : ?>
			<a
				href="<?php echo esc_url( $inx_skin_ipn['last_url'] ); ?>"
				class="inx-link"
				<?php if ( $inx_skin_ipn['enable_tooltips'] ) { ?>uk-tooltip="<?php echo esc_attr( $inx_skin_ipn['last_title'] ); ?>"<?php } // phpcs:ignore ?>
			>
			<?php endif; ?>
			<span
				class="inx-single-property__post-nav-arrow inx-single-property__post-nav-arrow--last"
				uk-icon="icon: chevron-double-right; ratio: <?php echo esc_attr( $inx_skin_ipn['icon_ratio_first_last'] ); ?>"
			></span>
			<?php if ( $inx_skin_ipn['last_url'] ) : ?>
				<span class="screen-reader-text"><?php echo wp_sprintf( '%s: %s', __( 'Last property', 'immonex-kickstart' ), $inx_skin_ipn['last_title'] ); ?></span>
			</a>
			<?php endif; ?>
		</div>
		<?php endif; ?>
	</div>
	<?php else : ?>
	<div class="uk-flex-middle" uk-grid>
		<div class="uk-width-1-1 uk-width-1-2@s">
			<?php if ( $template_data['overview_url'] ) : ?>
			<a href="<?php echo esc_url( $template_data['overview_url'] ); ?>" class="inx-link">
				<span uk-icon="chevron-left"></span>
				<?php echo $inx_skin_ipn['overview_link_text']; ?>
			</a>
			<?php endif; ?>
		</div>

		<div class="uk-width-1-1 uk-width-1-2@s uk-text-right">
			<!-- powered by immonex Kickstart! -->
		</div>
	</div>
	<?php endif; ?>
</div>
