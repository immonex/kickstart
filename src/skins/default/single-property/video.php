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

if ( $template_data['video'] ) :
	$inx_skin_heading_level = isset( $template_data['heading_level'] ) ?
		$template_data['heading_level'] :
		2;
	?>
<div class="inx-single-property__section inx-single-property__section--type--video uk-margin-large-bottom">
	<?php
	if ( isset( $template_data['headline'] ) ) {
		echo $utils['format']->get_heading(
			$template_data['headline'],
			$inx_skin_heading_level,
			'inx-single-property__section-title uk-heading-divider'
		);
	}
	?>
	<div class="inx-single-property__video-wrap">
		<?php
		if ( $template_data['videos_require_consent'] && 'local' !== $template_data['video']['provider'] ) :
			$inx_skin_video_user_consent = apply_filters( 'inx_get_user_consent_content', '', $template_data['video']['url'], 'video' );
			?>
			<div class="inx-single-property__video-iframe">
				<inx-embed-consent-request
					type="video"
					content="<?php echo esc_attr( $template_data['video']['embed_html'] ); ?>"
					privacy-note="<?php echo esc_attr( nl2br( $inx_skin_video_user_consent['text'] ) ); ?>"
					button-text="<?php echo esc_attr( nl2br( $inx_skin_video_user_consent['button_text'] ) ); ?>"
					icon-tag="<?php echo ! empty( $inx_skin_video_user_consent['icon_tag'] ) ? esc_attr( nl2br( $inx_skin_video_user_consent['icon_tag'] ) ) : ''; ?>"
					privacy-policy-url="<?php echo esc_attr( get_privacy_policy_url() ); ?>"
					privacy-policy-title="<?php echo esc_attr( __( 'Privacy Policy', 'immonex-kickstart' ) ); ?>"
				></inx-embed-consent-request>
			</div>
			<?php
		else :
			?>
			<div class="inx-single-property__video"><?php echo $template_data['video']['embed_html']; ?></div>
			<?php
			if ( $template_data['video']['title'] ) :
				?>
				<div class="inx-single-property__video-title">
					<span><?php echo esc_html( $template_data['video']['title'] ); ?></span>
				</div>
				<?php
			endif;
		endif;
		?>
	</div>
</div>
	<?php
endif;
