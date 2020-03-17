<?php
/**
 * Template for embedding external videos (YouTube/Vimeo)
 *
 * @package immonex-kickstart
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( $template_data['video'] ) :
	switch ( $template_data['video']['type'] ) {
		case 'youtube':
			$inx_skin_video_iframe_template = '<iframe src="https://www.youtube.com/embed/{id}?autoplay=0&amp;showinfo=0&amp;rel=0&amp;modestbranding=1&amp;playsinline=1" frameborder="0" allowfullscreen allow="autoplay; encrypted-media" class="inx-video-iframe" uk-responsive uk-video="automute: true"></iframe>';
			break;
		case 'vimeo':
			$inx_skin_video_iframe_template = '<iframe src="https://player.vimeo.com/video/{id}" frameborder="0" class="inx-video-iframe" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
			break;
		default:
			// Other video hosting services (possibly not supported yet).
			$inx_skin_video_iframe_template = '<iframe src="{url}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen class="inx-video-iframe"></iframe>';
	}

	$inx_skin_video_iframe_template = apply_filters(
		'inx_video_iframe_template',
		$inx_skin_video_iframe_template,
		$template_data['video']
	);

	$inx_skin_video_iframe = str_replace(
		array( '{id}', '{url}' ),
		array( $template_data['video']['id'], $template_data['video']['url'] ),
		$inx_skin_video_iframe_template
	);

	$inx_skin_heading_level = isset( $template_data['heading_level'] ) ?
		$template_data['heading_level'] :
		2;
	?>
<div class="inx-single-property__section inx-single-property__section--type--video">
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
		<?php echo $inx_skin_video_iframe; ?>
	</div>
</div>
	<?php
endif;
