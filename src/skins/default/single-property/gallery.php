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

$inx_skin_is_default_gallery = '_inx_gallery_images' === $inx_skin_image_selection_custom_field;

$inx_skin_heading_level = isset( $template_data['heading_level'] ) ?
	$template_data['heading_level'] :
	2;

$inx_skin_print_images_cnt = isset( $template_data['print_images_cnt'] ) ?
	(int) $template_data['print_images_cnt'] :
	1;

$inx_skin_gallery_image_ids = get_post_meta(
	$template_data['post_id'],
	$inx_skin_image_selection_custom_field,
	true
);
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

	$inx_skin_has_valid_ken_burns_image      = false;
	$inx_skin_ken_burns_animation_directions = array(
		'uk-transform-origin-top-left',
		'uk-transform-origin-top-center',
		'uk-transform-origin-top-right',
		'uk-transform-origin-center-left',
		'uk-transform-origin-center-right',
		'uk-transform-origin-bottom-left',
		'uk-transform-origin-bottom-center',
		'uk-transform-origin-bottom-right',
	);

	foreach ( $inx_skin_gallery_image_ids as $inx_skin_id ) {
		$inx_skin_image = wp_get_attachment_image_src( $inx_skin_id, 'full' );
		if ( ! $inx_skin_image ) {
			continue;
		}

		if ( $inx_skin_image[2] > INX_SKIN_MAX_IMAGE_HEIGHT ) {
			$inx_skin_image[1] = $inx_skin_image[1] * INX_SKIN_MAX_IMAGE_HEIGHT / $inx_skin_image[2];
			$inx_skin_image[2] = INX_SKIN_MAX_IMAGE_HEIGHT;
		}

		$inx_skin_image_enable_ken_burns_effect = $inx_skin_enable_ken_burns_effect;
		if ( $inx_skin_image[1] < INX_SKIN_KEN_BURNS_MIN_IMAGE_WIDTH ) {
			$inx_skin_image_enable_ken_burns_effect = false;
		}

		if ( $inx_skin_image[2] > $inx_skin_max_image_height ) {
			$inx_skin_max_image_height = $inx_skin_image[2];
		}

		if ( $inx_skin_image[1] / $inx_skin_image[2] < $inx_skin_current_ratio[0] / $inx_skin_current_ratio[1] ) {
			$inx_skin_current_ratio = array(
				$inx_skin_image[1], // Image width.
				$inx_skin_image[2], // Image height.
			);
		}

		$inx_skin_gallery_images[] = array(
			'full'             => wp_get_attachment_image( $inx_skin_id, 'full' ),
			'full_src'         => $inx_skin_image[0],
			'thumbnail'        => wp_get_attachment_image( $inx_skin_id, 'inx-thumbnail' ),
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
					<a href="<?php echo $inx_skin_img['full_src']; ?>" rel="lightbox">
						<?php if ( $inx_skin_img['ken_burns_effect'] ) : ?>
						<div class="inx-gallery__image uk-inline uk-position-cover uk-animation-kenburns uk-animation-reverse <?php echo $inx_skin_ken_burns_animation_directions[ wp_rand( 0, count( $inx_skin_ken_burns_animation_directions ) - 1 ) ]; ?>">
								<?php echo preg_replace( '/[\/]?\>/', 'uk-cover>', $inx_skin_img['full'] ); ?>
						</div>
						<?php else : ?>
						<div class="inx-gallery__image uk-position-center" uk-slideshow-parallax="opacity: 0,1,0">
							<?php echo $inx_skin_img['full']; ?>
						</div>
						<?php endif; ?>
					</a>

						<?php if ( $inx_skin_show_caption && $inx_skin_img['caption'] ) : ?>
					<div class="inx-gallery__image-caption uk-position-bottom uk-overlay uk-overlay-default uk-padding-small uk-text-center">
								<?php echo $inx_skin_img['caption']; ?>
					</div>
					<?php endif; ?>
				</li>
						<?php
					endforeach;
				endif;
				?>

				<?php if ( $inx_skin_show_video ) : ?>
				<li>
					<?php echo $inx_skin_video_iframe; ?>
				</li>
				<?php endif; ?>

				<?php if ( $inx_skin_show_virtual_tour ) : ?>
				<li>
					<?php echo $template_data['virtual_tour_embed_code']; ?>
				</li>
				<?php endif; ?>
			</ul>

			<a href="#" class="inx-gallery__slidenav uk-position-center-left uk-hidden-hover" uk-slideshow-item="previous">&#10094;</a>
			<a href="#" class="inx-gallery__slidenav uk-position-center-right uk-hidden-hover" uk-slideshow-item="next">&#10095;</a>
		</div>

		<?php if ( $inx_skin_media_count > 1 ) : ?>
		<div class="inx-thumbnail-nav">
			<div class="inx-thumbnail-nav__flexible uk-visible@s<?php echo $inx_skin_fixed_thumb_nav ? ' uk-margin-right' : ''; ?>" uk-slider="finite: true">
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

					<a href="#" class="inx-gallery__slidenav uk-position-center-left uk-hidden-hover" uk-slider-item="previous">&#10094; </a>
					<a href="#" class="inx-gallery__slidenav uk-position-center-right uk-hidden-hover" uk-slider-item="next"> &#10095;</a>
				</div>
			</div>

			<?php if ( $inx_skin_fixed_thumb_nav ) : ?>
			<div class="inx-thumbnail-nav__fixed">
				<ul class="inx-thumbnail-nav__items uk-slider-items">
					<?php if ( count( $inx_skin_gallery_images ) > 0 ) : ?>
					<li class="inx-thumbnail-nav__item uk-hidden@s" uk-slideshow-item="0">
						<div class="inx-thumbnail-nav__icon-thumbnail uk-flex uk-flex-center uk-flex-middle uk-flex-column">
							<div uk-icon="icon: image; ratio: 2"></div>
						</div>
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
								<div style="padding:.1em; border-radius:50%; color:#f0f0f0; background-color:#303030; font-size:1.4em">360&deg;</div>
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
