<?php
/**
 * Template for property photo/floor plan galleries
 *
 * @package immonex\Kickstart
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! defined( 'INX_SKIN_KEN_BURNS_MIN_IMAGE_WIDTH' ) ) {
	define( 'INX_SKIN_KEN_BURNS_MIN_IMAGE_WIDTH', 800 ); // Width in px.
}

if ( ! defined( 'INX_SKIN_MAX_IMAGE_HEIGHT' ) ) {
	define( 'INX_SKIN_MAX_IMAGE_HEIGHT', 800 ); // Height in px.
}

$inx_skin_animation_type = isset( $template_data['animation_type'] ) &&
	$template_data['animation_type'] ?
	$template_data['animation_type'] :
	'fade'; // Possible terms: slide, fade, scale, pull, push.

$inx_skin_show_caption = isset( $template_data['enable_caption_display'] ) ?
	$template_data['enable_caption_display'] :
	true;

$inx_skin_enable_ken_burns_effect = isset( $template_data['enable_ken_burns_effect'] ) &&
	$template_data['enable_ken_burns_effect'];

$inx_skin_image_selection_custom_field = isset( $template_data['image_selection_custom_field'] ) &&
	$template_data['image_selection_custom_field'] ?
	$template_data['image_selection_custom_field'] :
	'_inx_gallery_images'; // _inx_gallery_images, _inx_floor_plans

if (
	is_string( $inx_skin_image_selection_custom_field ) &&
	false !== strpos( $inx_skin_image_selection_custom_field, ',' )
) {
	$inx_skin_image_selection_custom_field = array_map( 'trim', explode( ',', $inx_skin_image_selection_custom_field ) );
}

if ( ! is_array( $inx_skin_image_selection_custom_field ) ) {
	$inx_skin_image_selection_custom_field = array( $inx_skin_image_selection_custom_field );
}

$inx_skin_is_default_gallery = in_array( '_inx_gallery_images', $inx_skin_image_selection_custom_field, true );

$inx_skin_heading_level = isset( $template_data['heading_level'] ) ?
	$template_data['heading_level'] :
	2;

$inx_skin_print_images_cnt = isset( $template_data['print_images_cnt'] ) ?
	(int) $template_data['print_images_cnt'] :
	1;

$inx_skin_gallery_image_ids = array();

foreach ( $inx_skin_image_selection_custom_field as $inx_skin_image_cf ) {
	$inx_skin_cf_image_ids = get_post_meta(
		$template_data['post_id'],
		$inx_skin_image_cf,
		true
	);
	if ( empty( $inx_skin_cf_image_ids ) ) {
		continue;
	}
	if ( ! is_array( $inx_skin_cf_image_ids ) ) {
		$inx_skin_cf_image_ids = array( $inx_skin_cf_image_ids );
	}

	if ( 0 !== array_keys( $inx_skin_cf_image_ids )[0] ) {
		$inx_skin_temp = array();
		foreach ( $inx_skin_cf_image_ids as $inx_skin_image_id => $inx_skin_image_url ) {
			$inx_skin_temp[] = $inx_skin_image_id;
		}

		$inx_skin_cf_image_ids = $inx_skin_temp;
	}

	$inx_skin_gallery_image_ids = array_merge(
		$inx_skin_gallery_image_ids,
		$inx_skin_cf_image_ids
	);
}

if (
	is_array( $inx_skin_gallery_image_ids ) &&
	count( $inx_skin_gallery_image_ids ) > 0 &&
	! is_numeric( $inx_skin_gallery_image_ids[ key( $inx_skin_gallery_image_ids ) ] )
) {
	// Convert an extended image ID list including URLs to a simple ID array.
	$inx_skin_gallery_image_ids = array_keys( $inx_skin_gallery_image_ids );
}

$inx_skin_media_count = is_array( $inx_skin_gallery_image_ids ) ? count( $inx_skin_gallery_image_ids ) : 0;

$inx_skin_show_video = $template_data['video'] && (
	( isset( $template_data['enable_video'] ) && $template_data['enable_video'] ) ||
	( ! isset( $template_data['enable_video'] ) && $inx_skin_is_default_gallery )
);

$inx_skin_show_virtual_tour = $template_data['virtual_tour_embed_code'] && (
	( isset( $template_data['enable_virtual_tour'] ) && $template_data['enable_virtual_tour'] ) ||
	( ! isset( $template_data['enable_virtual_tour'] ) && $inx_skin_is_default_gallery )
);
$inx_skin_virtual_tour_url  = isset( $template_data['virtual_tour_url'] ) ? $template_data['virtual_tour_url'] : '';

if ( $inx_skin_show_video ) {
	switch ( $template_data['video']['type'] ) {
		case 'youtube':
			$inx_skin_video_iframe_template = '<iframe src="https://{youtube_domain}/embed/{id}" frameborder="0" allowfullscreen allow="{youtube_allow}" class="inx-video-iframe" uk-video="autoplay: {autoplay}; automute: {automute}"></iframe>';
			$inx_skin_video_icon            = 'youtube';
			break;
		case 'vimeo':
			$inx_skin_video_iframe_template = '<iframe src="https://player.vimeo.com/video/{id}" frameborder="0" class="inx-video-iframe" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
			$inx_skin_video_icon            = 'vimeo';
			break;
		default:
			// Other video hosting services (possibly not supported yet).
			$inx_skin_video_iframe_template = '<iframe src="{url}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen class="inx-gallery__video-iframe"></iframe>';
			$inx_skin_video_icon            = 'play-circle';
	}

	$inx_skin_video_iframe_template = apply_filters( 'inx_video_iframe_template', $inx_skin_video_iframe_template, $template_data['video'] );
	$inx_skin_video_iframe          = str_replace(
		array(
			'{id}',
			'{url}',
			'{youtube_domain}',
			'{youtube_allow}',
			'{autoplay}',
			'{automute}',
		),
		array(
			$template_data['video']['id'],
			$template_data['video']['url'],
			$template_data['video']['youtube_domain'],
			$template_data['video']['youtube_allow'],
			$template_data['video']['autoplay'] ? 'true' : 'false',
			$template_data['video']['automute'] ? 'true' : 'false',
		),
		$inx_skin_video_iframe_template
	);

	$inx_skin_media_count++;
}

if ( $inx_skin_show_virtual_tour ) {
	$inx_skin_media_count++;
}

if ( $inx_skin_media_count > 0 ) :
	$inx_skin_gallery_images   = array();
	$inx_skin_current_ratio    = array( 4, 1 );
	$inx_skin_max_image_height = 0;
	$inx_skin_fixed_thumb_nav  = $inx_skin_show_video || $inx_skin_show_virtual_tour;

	$inx_skin_pdf_preview_ph_url    = plugins_url(
		'assets/pdf-preview-ph.png',
		$template_data['plugin_main_file']
	);
	$inx_skin_pdf_preview_thumb_url = plugins_url(
		'assets/pdf-preview-thumb.png',
		$template_data['plugin_main_file']
	);

	$inx_skin_has_valid_ken_burns_image      = false;
	$inx_skin_ken_burns_animation_directions = array(
		// 'uk-transform-origin-top-left', Disabled due to jerky animation.
		'uk-transform-origin-top-center',
		'uk-transform-origin-top-right',
		'uk-transform-origin-center-left',
		'uk-transform-origin-center-right',
		'uk-transform-origin-bottom-left',
		'uk-transform-origin-bottom-center',
		'uk-transform-origin-bottom-right',
	);

	foreach ( $inx_skin_gallery_image_ids as $inx_skin_id ) {
		$inx_skin_image          = wp_get_attachment_image_src( $inx_skin_id, 'full' );
		$inx_skin_is_pdf_preview = false;

		if ( ! $inx_skin_image ) {
			if ( 'application/pdf' !== get_post_mime_type( $inx_skin_id ) ) {
				continue;
			}

			$inx_skin_is_pdf_preview = true;
			$inx_skin_image          = array(
				$inx_skin_pdf_preview_ph_url,
				800,
				600,
			);
		}

		if ( $inx_skin_image[2] > INX_SKIN_MAX_IMAGE_HEIGHT ) {
			$inx_skin_image[1] = (int) $inx_skin_image[1] * INX_SKIN_MAX_IMAGE_HEIGHT / $inx_skin_image[2];
			$inx_skin_image[2] = INX_SKIN_MAX_IMAGE_HEIGHT;
		}

		if ( $inx_skin_is_pdf_preview ) {
			$inx_skin_image_alt = get_post_meta( $inx_skin_id, '_wp_attachment_image_alt', true );
			if ( trim( $inx_skin_image_alt ) ) {
				$inx_skin_thumb_alt = $inx_skin_image_alt . ' (Thumbnail)';
			} else {
				$inx_skin_image_alt = __( 'PDF preview image', 'immonex-kickstart' );
				$inx_skin_thumb_alt = 'Thumbnail';
			}

			$inx_skin_pdf_preview_image_tag = wp_sprintf(
				'<img class="attachment-full size-full inx-gallery__pdf-preview-placeholder" src="%1$s" width="%2$s" height="%3$s" alt="%4$s">',
				$inx_skin_image[0],
				$inx_skin_image[1],
				$inx_skin_image[2],
				$inx_skin_image_alt
			);

			$inx_skin_pdf_preview_thumb_tag = wp_sprintf(
				'<img class="attachment-inx-thumbnail size-inx-thumbnail inx-gallery__pdf-preview-thumbnail" src="%1$s" width="120" height="68" alt="%2$s">',
				$inx_skin_pdf_preview_thumb_url,
				$inx_skin_thumb_alt
			);

			$inx_skin_image_enable_ken_burns_effect = false;
		} else {
			$inx_skin_image_enable_ken_burns_effect = $inx_skin_enable_ken_burns_effect;
			if ( $inx_skin_image[1] < INX_SKIN_KEN_BURNS_MIN_IMAGE_WIDTH ) {
				$inx_skin_image_enable_ken_burns_effect = false;
			}
		}

		if ( $inx_skin_image[2] > $inx_skin_max_image_height ) {
			$inx_skin_max_image_height = $inx_skin_image[2];
		}

		if ( $inx_skin_image[1] / $inx_skin_image[2] < $inx_skin_current_ratio[0] / $inx_skin_current_ratio[1] ) {
			$inx_skin_current_ratio = array(
				(int) $inx_skin_image[1], // Image width.
				(int) $inx_skin_image[2], // Image height.
			);
		}

		$inx_skin_gallery_images[] = array(
			'is_pdf'           => $inx_skin_is_pdf_preview || 'application/pdf' === get_post_mime_type( $inx_skin_id ),
			'full'             => $inx_skin_is_pdf_preview ? $inx_skin_pdf_preview_image_tag : wp_get_attachment_image( $inx_skin_id, 'full' ),
			'full_src'         => wp_get_attachment_url( $inx_skin_id ),
			'thumbnail'        => $inx_skin_is_pdf_preview ? $inx_skin_pdf_preview_thumb_tag : wp_get_attachment_image( $inx_skin_id, 'inx-thumbnail' ),
			'caption'          => wp_get_attachment_caption( $inx_skin_id ),
			'ken_burns_effect' => $inx_skin_image_enable_ken_burns_effect,
		);

		if ( $inx_skin_image_enable_ken_burns_effect ) {
			$inx_skin_has_valid_ken_burns_image = true;
		}
	}

	if ( ! $inx_skin_has_valid_ken_burns_image ) {
		$inx_skin_enable_ken_burns_effect = false;
	}
	?>
<div class="inx-single-property__section inx-single-property__section--type--gallery inx-gallery uk-margin-large-bottom">
	<?php
	if ( isset( $template_data['headline'] ) ) {
		echo $utils['format']->get_heading( $template_data['headline'], $inx_skin_heading_level, 'inx-single-property__section-title uk-heading-divider' );}
	?>

	<div class="inx-gallery__image-slider" uk-slideshow="ratio: <?php echo implode( ':', $inx_skin_current_ratio ); ?>; max-height: <?php echo $inx_skin_max_image_height; ?>; animation: <?php echo $inx_skin_animation_type; ?>; finite: true">
		<div class="uk-position-relative uk-visible-toggle uk-margin-bottom">
			<ul class="inx-gallery__images uk-slideshow-items">
				<?php
				if ( count( $inx_skin_gallery_images ) > 0 ) :
					foreach ( $inx_skin_gallery_images as $inx_skin_i => $inx_skin_img ) :
						?>
						<li class="noHover">
							<?php if ( ! empty( $template_data['enable_gallery_image_links'] ) ) : ?>
							<a href="<?php echo $inx_skin_img['full_src']; ?>" <?php echo $inx_skin_img['is_pdf'] ? 'target="_blank"' : 'rel="lightbox"'; ?>>
							<?php endif; ?>
								<?php if ( $inx_skin_img['ken_burns_effect'] ) : ?>
								<div class="inx-gallery__image uk-inline uk-position-cover uk-animation-kenburns uk-animation-reverse <?php echo $inx_skin_ken_burns_animation_directions[ wp_rand( 0, count( $inx_skin_ken_burns_animation_directions ) - 1 ) ]; ?>">
									<?php echo preg_replace( '/[\/]?\>/', 'uk-cover>', $inx_skin_img['full'] ); ?>
								</div>
								<?php else : ?>
								<div class="inx-gallery__image uk-position-center" uk-slideshow-parallax="opacity: 0,1,0">
									<?php echo $inx_skin_img['full']; ?>
								</div>
								<?php endif; ?>
							<?php if ( ! empty( $template_data['enable_gallery_image_links'] ) ) : ?>
							</a>
							<?php endif; ?>

							<?php if ( $inx_skin_show_caption && $inx_skin_img['caption'] ) : ?>
							<div class="inx-gallery__image-caption uk-position-bottom uk-overlay uk-overlay-default uk-padding-small uk-text-center">
								<?php echo $inx_skin_img['caption']; ?>
							</div>
							<?php endif; ?>

							<?php if ( $inx_skin_img['is_pdf'] ) : ?>
							<a href="<?php echo $inx_skin_img['full_src']; ?>" target="_blank" class="uk-badge inx-badge inx-badge--size--m inx-badge--type--pdf uk-position-top-right uk-position-small">PDF</a>
							<?php endif; ?>
						</li>
						<?php
					endforeach;
				endif;
				?>

				<?php if ( $inx_skin_show_video ) : ?>
				<li>
					<?php
					if ( $template_data['videos_require_consent'] ) :
						$inx_skin_video_user_consent = apply_filters( 'inx_get_user_consent_content', '', $template_data['video']['url'], 'video' );
						?>
						<div style="height:100%; overflow:auto">
							<inx-embed-consent-request
								type="video"
								content="<?php echo esc_attr( $inx_skin_video_iframe ); ?>"
								privacy-note="<?php echo esc_attr( nl2br( $inx_skin_video_user_consent['text'] ) ); ?>"
								button-text="<?php echo esc_attr( nl2br( $inx_skin_video_user_consent['button_text'] ) ); ?>"
								icon-tag="<?php echo ! empty( $inx_skin_video_user_consent['icon_tag'] ) ? esc_attr( nl2br( $inx_skin_video_user_consent['icon_tag'] ) ) : ''; ?>"
								privacy-policy-url="<?php echo esc_attr( get_privacy_policy_url() ); ?>"
								privacy-policy-title="<?php echo esc_attr( __( 'Privacy Policy', 'immonex-kickstart' ) ); ?>"
							></inx-embed-consent-request>
						</div>
						<?php
					else :
						echo $inx_skin_video_iframe;
					endif;
					?>
				</li>
				<?php endif; ?>

				<?php if ( $inx_skin_show_virtual_tour ) : ?>
				<li>
					<?php
					if ( $template_data['virtual_tours_require_consent'] ) :
						$inx_skin_virtual_tour_user_consent = apply_filters( 'inx_get_user_consent_content', '', $inx_skin_virtual_tour_url, 'virtual_tour' );
						?>
						<div style="height:100%; overflow:auto">
							<inx-embed-consent-request
								type="virtual_tour"
								content="<?php echo esc_attr( $template_data['virtual_tour_embed_code'] ); ?>"
								privacy-note="<?php echo esc_attr( nl2br( $inx_skin_virtual_tour_user_consent['text'] ) ); ?>"
								button-text="<?php echo esc_attr( nl2br( $inx_skin_virtual_tour_user_consent['button_text'] ) ); ?>"
								icon-tag="<?php echo ! empty( $inx_skin_virtual_tour_user_consent['icon_tag'] ) ? esc_attr( nl2br( $inx_skin_virtual_tour_user_consent['icon_tag'] ) ) : ''; ?>"
								privacy-policy-url="<?php echo esc_attr( get_privacy_policy_url() ); ?>"
								privacy-policy-title="<?php echo esc_attr( __( 'Privacy Policy', 'immonex-kickstart' ) ); ?>"
							></inx-embed-consent-request>
						</div>
						<?php
					else :
						echo $template_data['virtual_tour_embed_code'];
					endif;
					?>
				</li>
				<?php endif; ?>
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

		<?php if ( $inx_skin_media_count > 1 ) : ?>
		<div class="inx-thumbnail-nav">
			<div class="inx-thumbnail-nav__flexible uk-visible@s<?php echo $inx_skin_fixed_thumb_nav ? ' uk-margin-right' : ''; ?>" uk-slider="active: all; finite: true">
				<div class="uk-position-relative uk-visible-toggle">
					<ul class="inx-thumbnail-nav__items uk-slider-items">
						<?php
						if ( count( $inx_skin_gallery_images ) > 0 ) :
							foreach ( $inx_skin_gallery_images as $inx_skin_i => $inx_skin_img ) :
								?>
						<li class="inx-thumbnail-nav__item" uk-slideshow-item="<?php echo $inx_skin_i; ?>"><a href="#"><?php echo $inx_skin_img['thumbnail']; ?></a></li>
								<?php
							endforeach;
						endif;
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

			<?php if ( $inx_skin_fixed_thumb_nav ) : ?>
			<div class="inx-thumbnail-nav__fixed">
				<ul class="inx-thumbnail-nav__items uk-slider-items">
					<?php if ( count( $inx_skin_gallery_images ) > 0 ) : ?>
					<li class="inx-thumbnail-nav__item uk-hidden@s" uk-slideshow-item="0">
						<a href="#">
							<div class="inx-thumbnail-nav__icon-thumbnail uk-flex uk-flex-center uk-flex-middle uk-flex-column">
								<div uk-icon="icon: image; ratio: 2"></div>
							</div>
						</a>
					</li>
					<?php endif; ?>

					<?php if ( $inx_skin_show_video ) : ?>
					<li class="inx-thumbnail-nav__item" uk-slideshow-item="<?php echo count( $inx_skin_gallery_images ); ?>">
						<a href="#">
							<div class="inx-thumbnail-nav__video-thumbnail uk-flex uk-flex-center uk-flex-middle uk-flex-column">
								<div uk-icon="icon: <?php echo $inx_skin_video_icon; ?>; ratio: 2"></div>
							</div>
						</a>
					</li>
					<?php endif; ?>

					<?php if ( $inx_skin_show_virtual_tour ) : ?>
					<li class="inx-thumbnail-nav__item" uk-slideshow-item="<?php echo count( $inx_skin_gallery_images ) + 1; ?>">
						<a href="#">
							<div class="inx-thumbnail-nav__video-thumbnail uk-flex uk-flex-center uk-flex-middle uk-flex-column">
								<div class="inx-icon inx-icon--360"></div>
							</div>
						</a>
					</li>
					<?php endif; ?>
				</ul>
			</div>
			<?php endif; ?>
		</div>
		<?php endif; ?>
	</div>

	<?php if ( $inx_skin_print_images_cnt > 0 && count( $inx_skin_gallery_images ) > 0 ) : ?>
	<div class="inx-gallery__print-images inx-print-only">
		<?php
		for ( $inx_skin_i = 0; $inx_skin_i < $inx_skin_print_images_cnt; $inx_skin_i++ ) :
			$inx_skin_img = $inx_skin_gallery_images[ $inx_skin_i ];
			?>
			<div class="inx-gallery__print-image">
			<?php echo $inx_skin_img['full']; ?>
			</div>

			<?php
			endfor;
		?>
	</div>
	<?php endif; ?>
</div>
	<?php
endif;
