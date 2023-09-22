<?php
/**
 * Property search form main template
 *
 * @package immonex\Kickstart
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$inx_skin_main_element_id = ! empty( $template_data['cid'] ) ? $template_data['cid'] : 'inx-property-search';
$inx_skin_dynamic_update  = ! empty( $template_data['dynamic-update'] ) ? $template_data['dynamic-update'] : '';
$inx_skin_rendering_atts  = array(
	'cid'                    => $inx_skin_main_element_id,
	'search_main_element_id' => $inx_skin_main_element_id,
	'render_count'           => ! empty( $template_data['render_count'] ) ? $template_data['render_count'] : 0,
	'extended_count'         => $template_data['extended_count'],
);

foreach ( $template_data as $inx_skin_key => $inx_skin_value ) {
	if ( 'force-' === substr( $inx_skin_key, 0, 6 ) ) {
		$inx_skin_rendering_atts[ $inx_skin_key ] = $inx_skin_value;
		continue;
	}

	if (
		'inx-' === substr( $inx_skin_key, 0, 4 )
		&& ! empty( $inx_skin_value )
		&& ! isset( $inx_skin_rendering_atts[ substr( $inx_skin_key, 4 ) ] )
	) {
		$inx_skin_rendering_atts[ substr( $inx_skin_key, 4 ) ] = $inx_skin_value;
	}
}

$inx_skin_form_element_id = 'inx-property-search-main-form';
if ( $inx_skin_rendering_atts['render_count'] > 1 ) {
	$inx_skin_form_element_id .= '-' . $template_data['render_count'];
}
$inx_skin_rendering_atts['search_form_element_id'] = $inx_skin_form_element_id;
$inx_skin_rendering_atts['top-level-only']         = ! empty( $template_data['top-level-only'] );
?>
<div
	id="<?php echo $inx_skin_main_element_id; ?>"
	class="inx-property-search<?php echo $inx_skin_dynamic_update ? ' inx-dynamic-update' : ''; ?> inx-container"
	<?php if ( $inx_skin_dynamic_update ) : ?>
	data-dynamic-update="<?php echo esc_attr( $inx_skin_dynamic_update ); ?>"
	<?php endif; ?>
>
	<form id="<?php echo $inx_skin_form_element_id; ?>" action="<?php echo $template_data['form_action']; ?>" method="get">
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
