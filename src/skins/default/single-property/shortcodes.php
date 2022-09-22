<?php
/**
 * Template for embedding shortcode based output in property details sections
 *
 * @package immonex\Kickstart
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$inx_skin_shortcode_output = '';
if ( isset( $template_data['shortcodes'] ) && count( $template_data['shortcodes'] ) > 0 ) {
	foreach ( $template_data['shortcodes'] as $inx_skin_shortcode ) {
		$inx_skin_found          = preg_match( '/[\[]?([a-zA-Z0-9_\-]+)/', $inx_skin_shortcode, $inx_skin_matches );
		$inx_skin_shortcode_name = $inx_skin_found && isset( $inx_skin_matches[1] ) ? $inx_skin_matches[1] : false;

		if ( $inx_skin_shortcode_name && shortcode_exists( $inx_skin_shortcode_name ) ) {
			$inx_skin_shortcode_output .= do_shortcode( $inx_skin_shortcode ) . PHP_EOL;
		}
	}
}

$inx_skin_shortcode_output = trim( $inx_skin_shortcode_output );

if ( $inx_skin_shortcode_output ) :
	$inx_skin_heading_level = isset( $template_data['heading_level'] ) ? $template_data['heading_level'] : 2;
	?>
<div class="inx-single-property__section inx-single-property__section--type--shortcodes">
	<?php
	if ( isset( $template_data['headline'] ) ) {
		echo $utils['format']->get_heading(
			$template_data['headline'],
			$inx_skin_heading_level,
			'inx-single-property__section-title uk-heading-divider'
		);
	}
	?>

	<div class="inx-shortcode-output">
		<?php echo $inx_skin_shortcode_output; ?>
	</div>
</div>
	<?php
endif;
