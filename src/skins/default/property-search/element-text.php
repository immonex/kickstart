<?php
/**
 * Template for property search form element (text input)
 *
 * @package immonex-kickstart
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$inx_skin_show_label   = false;
$inx_skin_element_name = preg_replace( '/^element-/', '', basename( __FILE__, '.php' ) );
$inx_skin_placeholder  = isset( $template_data['element']['placeholder'] ) && $template_data['element']['placeholder'] ? $template_data['element']['placeholder'] : '';
?>
<div class="inx-form-element inx-form-element--<?php echo $inx_skin_element_name; ?> uk-search uk-search-default uk-width-1-1">
	<?php if ( $inx_skin_show_label && $template_data['element']['label'] ) : ?>
	<label for="<?php echo $template_data['element_id']; ?>" class="inx-form-element__label"><?php echo $template_data['element']['label']; ?></label>
	<?php endif; ?>

	<button class="uk-search-icon-flip" uk-search-icon></button>
	<input type="<?php echo $template_data['element']['numeric'] ? 'number' : 'search'; ?>"
		id="<?php echo $template_data['element_id']; ?>"
		name="<?php echo $template_data['element_id']; ?>"
		placeholder="<?php echo esc_attr( $inx_skin_placeholder ); ?>"
		value="<?php echo esc_attr( $template_data['element_value'] ); ?>"
		class="inx-search-input uk-search-input">
</div>
