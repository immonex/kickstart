<?php
/**
 * Template for property search form element (dropdown select box)
 *
 * @package immonex\Kickstart
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$inx_skin_search_main_element_id_prefix = ! empty( $template_data['search_main_element_id'] ) ? $template_data['search_main_element_id'] . '_' : '';
$inx_skin_element_name                  = preg_replace( '/^element-/', '', basename( __FILE__, '.php' ) );
$inx_skin_show_label                    = false;
$inx_skin_multiple                      = isset( $template_data['element']['multiple'] ) && $template_data['element']['multiple'];
$inx_skin_empty_option_value            = ! empty( $template_data['element']['empty_option_value'] ) ? $template_data['element']['empty_option_value'] : '';
?>
<div class="inx-form-element inx-form-element--<?php echo $inx_skin_element_name; ?>">
	<?php if ( $inx_skin_show_label && $template_data['element']['label'] ) : ?>
	<label for="<?php echo $template_data['element_id']; ?>" class="inx-form-element__label"><?php echo $template_data['element']['label']; ?></label>
	<?php endif; ?>

	<select
		id="<?php echo $inx_skin_search_main_element_id_prefix . $template_data['element_id']; ?>"
		name="<?php echo $template_data['element_id'] . ( $inx_skin_multiple ? '[]' : '' ); ?>"
		class="inx-select uk-select"
		<?php
		if ( isset( $template_data['element']['default'] ) && false !== $template_data['element']['default'] ) {
			echo 'data-default="' . $template_data['element']['default'] . '"';
		}
		if ( $inx_skin_multiple ) {
			echo ' multiple';
		}
		?>
		>

		<?php if ( isset( $template_data['element']['empty_option'] ) && false !== $template_data['element']['empty_option'] ) : ?>
		<option value="<?php echo $inx_skin_empty_option_value; ?>"
			<?php
			if ( $inx_skin_empty_option_value === $template_data['element_value'] ) {
				echo ' selected';
			}
			?>
		><?php echo true === $template_data['element']['empty_option'] ? $template_data['element']['label'] : $template_data['element']['empty_option']; ?></option>
		<?php endif; ?>

		<?php
			$inx_skin_single_option_selected = false;

		if ( ! empty( $template_data['element']['options'] ) ) :
			foreach ( $template_data['element']['options'] as $inx_skin_key => $inx_skin_value ) :
				if (
					(
						$inx_skin_multiple &&
						is_array( $template_data['element_value'] ) &&
						in_array( $inx_skin_key, $template_data['element_value'], true )
					) || (
						! $inx_skin_multiple &&
						! $inx_skin_single_option_selected && (
							$inx_skin_key === $template_data['element_value'] || (
								is_array( $template_data['element_value'] ) &&
								in_array( $inx_skin_key, $template_data['element_value'], true )
							)
						)
					)
				) {
					$inx_skin_selected = true;
					if ( ! $inx_skin_multiple ) {
						$inx_skin_single_option_selected = true;
					}
				} else {
					$inx_skin_selected = false;
				}
				?>
		<option value="<?php echo esc_attr( $inx_skin_key ); ?>"<?php echo $inx_skin_selected ? ' selected' : ''; ?>><?php echo esc_html( $inx_skin_value ); ?></option>
				<?php
			endforeach;
		endif;
		?>
	</select>
</div>
