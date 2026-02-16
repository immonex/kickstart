<?php
/**
 * Template for embedding videos
 *
 * @package immonex\Kickstart
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( empty( $template_data['videos'] ) ) {
	return;
}

if ( ! empty( $template_data['videos'] ) ) :
	$inx_skin_animation_type = ! empty( $template_data['animation_type'] ) ?
		$template_data['animation_type'] :
		'fade'; // Possible terms: slide, fade, scale, pull, push.

	$inx_skin_show_caption = isset( $template_data['enable_caption_display'] ) ?
		$template_data['enable_caption_display'] :
		true;

	$inx_skin_heading_level = isset( $template_data['heading_level'] ) ?
		$template_data['heading_level'] :
		2;
	?>
<div class="inx-single-property__section inx-single-property__section--type--video-gallery inx-gallery uk-margin-large-bottom">
	<?php
	if ( isset( $template_data['headline'] ) ) {
		echo $utils['format']->get_heading( $template_data['headline'], $inx_skin_heading_level, 'inx-single-property__section-title uk-heading-divider' );}
	?>

	<div class="inx-gallery__image-slider" uk-slideshow="animation: <?php echo esc_attr( $inx_skin_animation_type ); ?>; finite: true">
		<div class="uk-position-relative uk-visible-toggle uk-margin-bottom">
			<ul class="inx-gallery__images uk-slideshow-items">
				<?php foreach ( $template_data['videos'] as $inx_skin_video ) : ?>
				<li>
					<?php
					if ( $template_data['videos_require_consent'] && 'local' !== $inx_skin_video['provider'] ) :
						$inx_skin_video_user_consent = apply_filters( 'inx_get_user_consent_content', '', $inx_skin_video['url'], 'video' );
						?>
						<div class="inx-gallery__video-iframe">
							<inx-embed-consent-request
								type="video"
								content="<?php echo esc_attr( $inx_skin_video['embed_html'] ); ?>"
								privacy-note="<?php echo nl2br( esc_attr( $inx_skin_video_user_consent['text'] ) ); ?>"
								button-text="<?php echo nl2br( esc_attr( $inx_skin_video_user_consent['button_text'] ) ); ?>"
								icon-tag="<?php echo ! empty( $inx_skin_video_user_consent['icon_tag'] ) ? nl2br( esc_attr( $inx_skin_video_user_consent['icon_tag'] ) ) : ''; ?>"
								privacy-policy-url="<?php echo esc_attr( get_privacy_policy_url() ); ?>"
								privacy-policy-title="<?php echo esc_attr( __( 'Privacy Policy', 'immonex-kickstart' ) ); ?>"
							></inx-embed-consent-request>
						</div>
						<?php
					else :
						?>
						<div class="inx-gallery__video"><?php echo $inx_skin_video['embed_html']; ?></div>
						<?php
						if ( $inx_skin_show_caption && $inx_skin_video['title'] ) :
							?>
							<div class="inx-gallery__video-title">
								<span><?php echo esc_html( $inx_skin_video['title'] ); ?></span>
							</div>
							<?php
						endif;
					endif;
					?>
				</li>
				<?php endforeach; ?>
			</ul>

			<div class="uk-visible@s uk-hidden-touch">
				<a href="#" class="inx-gallery__slidenav uk-position-center-left uk-hidden-hover uk-visible" uk-slideshow-item="previous">&#10094;</a>
				<a href="#" class="inx-gallery__slidenav uk-position-center-right uk-hidden-hover" uk-slideshow-item="next">&#10095;</a>
			</div>
			<div class="uk-hidden@s uk-hidden-touch">
				<a href="#" class="inx-gallery__slidenav uk-position-center-left" uk-slideshow-item="previous">&#10094;</a>
				<a href="#" class="inx-gallery__slidenav uk-position-center-right" uk-slideshow-item="next">&#10095;</a>
			</div>
			<div class="uk-hidden-notouch">
				<a href="#" class="inx-gallery__slidenav uk-position-center-left" uk-slideshow-item="previous">&#10094;</a>
				<a href="#" class="inx-gallery__slidenav uk-position-center-right" uk-slideshow-item="next">&#10095;</a>
			</div>
		</div>

		<?php if ( count( $template_data['videos'] ) > 1 ) : ?>
		<div class="inx-thumbnail-nav">
			<div class="inx-thumbnail-nav__flexible uk-visible@s" uk-slider="active: all; finite: true">
				<div class="uk-position-relative uk-visible-toggle">
					<ul class="inx-thumbnail-nav__items uk-slider-items">
						<?php
						foreach ( $template_data['videos'] as $inx_skin_i => $inx_skin_video ) :
							$inx_skin_video_icon = in_array( $inx_skin_video['provider'], array( 'youtube', 'vimeo' ), true ) ?
								$inx_skin_video['provider'] :
								'play-circle';
							?>
						<li class="inx-thumbnail-nav__item" uk-slideshow-item="<?php echo $inx_skin_i; ?>">
							<a href="#"<?php echo $inx_skin_video['title'] ? ' title="' . esc_attr( $inx_skin_video['title'] ) . '"' : ''; ?>>
								<div class="inx-thumbnail-nav__video-thumbnail uk-flex uk-flex-center uk-flex-middle uk-flex-column">
								<?php if ( ! empty( $inx_skin_video['thumbnail_url'] ) ) : ?>
									<img src="<?php echo esc_url( $inx_skin_video['thumbnail_url'] ); ?>" alt="<?php esc_attr_e( 'video preview thumbnail', 'immonex-kickstart' ); ?>">
								<?php else : ?>
									<div uk-icon="icon: <?php echo esc_attr( $inx_skin_video_icon ); ?>; ratio: 2" aria-label="<?php esc_attr_e( 'play icon', 'immonex-kickstart' ); ?>"></div>
								<?php endif; ?>
								</div>
							</a>
						</li>
							<?php
						endforeach;
						?>
					</ul>

					<div class="uk-visible@s uk-hidden-touch">
						<a href="#" class="inx-gallery__slidenav uk-position-center-left uk-hidden-hover" uk-slider-item="previous">&#10094; </a>
						<a href="#" class="inx-gallery__slidenav uk-position-center-right uk-hidden-hover" uk-slider-item="next"> &#10095;</a>
					</div>
					<div class="uk-hidden@s uk-hidden-touch">
						<a href="#" class="inx-gallery__slidenav uk-position-center-left" uk-slideshow-item="previous">&#10094;</a>
						<a href="#" class="inx-gallery__slidenav uk-position-center-right" uk-slideshow-item="next">&#10095;</a>
					</div>
					<div class="uk-hidden-notouch">
						<a href="#" class="inx-gallery__slidenav uk-position-center-left" uk-slideshow-item="previous">&#10094;</a>
						<a href="#" class="inx-gallery__slidenav uk-position-center-right" uk-slideshow-item="next">&#10095;</a>
					</div>
				</div>
			</div>
		</div>
		<?php endif; ?>
	</div>
</div>
	<?php
endif;
