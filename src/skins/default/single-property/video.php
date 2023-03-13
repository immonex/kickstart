<?php
/**
 * Template for embedding external videos (YouTube/Vimeo)
 *
 * @package immonex\Kickstart
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( $template_data['video'] ) :
	switch ( $template_data['video']['type'] ) {
		case 'youtube':
			$inx_skin_video_iframe_template = '<iframe src="https://{youtube_domain}/embed/{id}" frameborder="0" allowfullscreen allow="{youtube_allow}" class="inx-video-iframe" uk-video="autoplay: {autoplay}; automute: {automute}"></iframe>';
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
