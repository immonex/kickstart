<?php
/**
 * Template for property search form element (radio selection)
 *
 * @package immonex\Kickstart
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$inx_skin_search_main_element_id_prefix = ! empty( $template_data['search_main_element_id'] ) ? $template_data['search_main_element_id'] . '_' : '';
$inx_skin_element_name                  = preg_replace( '/^element-/', '', basename( __FILE__, '.php' ) );
$inx_skin_show_label                    = true;
?>
<div class="inx-form-element inx-form-element--<?php echo $inx_skin_element_name; ?>">
	<?php if ( $inx_skin_show_label && $template_data['element']['label'] ) : ?>
	<div class="inx-form-element__label uk-form-label"><?php echo $template_data['element']['label']; ?></div>
	<?php endif; ?>

	<div class="inx-form-element__options uk-flex uk-flex-wrap">
		<?php
		if ( ! empty( $template_data['element']['options'] ) ) :
			foreach ( $template_data['element']['options'] as $inx_skin_key => $inx_skin_value ) :
				$inx_skin_checked = $inx_skin_key === $template_data['element_value'];
				?>
		<div class="inx-form-element__option uk-margin-right">
			<input type="radio"
				id="<?php echo esc_attr( $inx_skin_search_main_element_id_prefix . $template_data['element_id'] . '_' . $inx_skin_key ); ?>"
				name="<?php echo $template_data['element_id']; ?>"
				value="<?php echo esc_attr( $inx_skin_key ); ?>"
				class="inx-radio uk-radio"
				<?php
				if ( $inx_skin_checked ) {
					echo ' checked';}
				?>
			>

			<label for="<?php echo esc_attr( $template_data['element_id'] . '_' . $inx_skin_key ); ?>" class="inx-label inx-label--radio"><?php echo esc_html( $inx_skin_value ); ?></label>
		</div>
				<?php
				endforeach;
			endif;
		?>
	</div>
</div>
