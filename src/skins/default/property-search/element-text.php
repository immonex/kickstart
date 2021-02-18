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
$inx_skin_placeholder  = ! empty( $template_data['element']['placeholder'] ) ? $template_data['element']['placeholder'] : '';
$inx_skin_type         = ! empty( $template_data['element']['subtype'] ) ? $template_data['element']['subtype'] : '';

if ( ! $inx_skin_type ) {
	if ( 'inx-search-description' === $template_data['element_id']  ) {
		$inx_skin_type = 'search';
	} elseif ( ! empty( $template_data['element']['numeric'] ) ) {
		$inx_skin_type = 'number';
	} else {
		$inx_skin_type = 'text';
	}
}
?>
<div class="inx-form-element inx-form-element--<?php echo $inx_skin_element_name; ?> uk-search uk-search-default uk-width-1-1">
	<?php if ( $inx_skin_show_label && $template_data['element']['label'] ) : ?>
	<label for="<?php echo $template_data['element_id']; ?>" class="inx-form-element__label"><?php echo $template_data['element']['label']; ?></label>
	<?php endif; ?>

	<?php if ( 'search' === $inx_skin_type ) : ?>
	<button class="uk-search-icon-flip" uk-search-icon></button>
	<?php endif; ?>
	<input type="<?php echo $inx_skin_type; ?>"
		id="<?php echo $template_data['element_id']; ?>"
		name="<?php echo $template_data['element_id']; ?>"
		placeholder="<?php echo esc_attr( $inx_skin_placeholder ); ?>"
		value="<?php echo esc_attr( $template_data['element_value'] ); ?>"
		class="inx-search-input inx-search-input--type--<?php echo $inx_skin_type; ?> uk-search-input">
</div>
