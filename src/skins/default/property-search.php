<?php
/**
 * Property search form main template
 *
 * @package immonex-kickstart
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$inx_skin_rendering_atts = array(
	'extended_count' => $template_data['extended_count'],
);
foreach ( $template_data as $inx_skin_key => $inx_skin_value ) {
	if ( 'force-' === substr( $inx_skin_key, 0, 6 ) ) {
		$inx_skin_rendering_atts[ $inx_skin_key ] = $inx_skin_value;
	}
}
?>
<div id="inx-property-search" class="inx-property-search inx-container">
	<form id="inx-property-search-main-form" action="<?php echo $template_data['form_action']; ?>">
		<?php
		if ( count( $template_data['hidden_fields'] ) > 0 ) :
			foreach ( $template_data['hidden_fields'] as $inx_skin_field ) :
				?>
		<input type="hidden" data-no-reset="1" name="<?php echo $inx_skin_field['name']; ?>" value="<?php echo esc_attr( $inx_skin_field['value'] ); ?>">
				<?php
				endforeach;
			endif;
		?>

		<div class="inx-property-search__standard">
			<div class="inx-property-search__elements">
			<?php
			foreach ( $template_data['elements'] as $inx_skin_id => $inx_skin_element ) :
				if ( ! isset( $inx_skin_element['extended'] ) || ! $inx_skin_element['extended'] ) :
					?>
				<div class="inx-property-search__element<?php echo isset( $inx_skin_element['class'] ) && $inx_skin_element['class'] ? ' ' . $inx_skin_element['class'] : ''; ?>">
					<?php
						do_action(
							'inx_render_property_search_form_element',
							$inx_skin_id,
							$inx_skin_element,
							$inx_skin_rendering_atts
						);
					?>
				</div>
					<?php
					endif;
				endforeach;
			?>
			</div>
		</div>

		<?php if ( $template_data['extended_count'] > 0 ) : ?>
		<div class="inx-property-search__extended uk-padding-small" hidden>
			<div class="inx-property-search__elements">
			<?php
			foreach ( $template_data['elements'] as $inx_skin_id => $inx_skin_element ) :
				if ( isset( $inx_skin_element['extended'] ) && $inx_skin_element['extended'] ) :
					?>
				<div class="inx-property-search__element<?php echo isset( $inx_skin_element['class'] ) && $inx_skin_element['class'] ? ' ' . $inx_skin_element['class'] : ''; ?>">
					<?php
						do_action(
							'inx_render_property_search_form_element',
							$inx_skin_id,
							$inx_skin_element,
							$inx_skin_rendering_atts
						);
					?>
				</div>
					<?php
					endif;
				endforeach;
			?>
			</div>
		</div>
		<?php endif; ?>
	</form>
</div>
