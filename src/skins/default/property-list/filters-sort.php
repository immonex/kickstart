<?php
/**
 * Template for property list sort selection
 *
 * @package immonex-kickstart
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$inx_skin_sort_options  = $template_data['sort_options'];
$inx_skin_sort_var_name = $template_data['public_prefix'] . 'sort';

$inx_skin_current_sort_key = get_query_var( $inx_skin_sort_var_name );
if ( ! $inx_skin_current_sort_key ) {
	$inx_skin_current_sort_key = $template_data['default_sort_option']['key'];
}
?>
<div class="inx-property-filters inx-container uk-padding-small">
	<form>
		<?php
		if ( count( $template_data['hidden_fields'] ) > 0 ) :
			foreach ( $template_data['hidden_fields'] as $inx_skin_field ) :
				if ( $inx_skin_field['name'] !== $inx_skin_sort_var_name ) :
					?>
		<input type="hidden" name="<?php echo $inx_skin_field['name']; ?>" value="<?php echo esc_attr( $inx_skin_field['value'] ); ?>">
					<?php
				endif;
			endforeach;
		endif;
		?>

		<div class="uk-flex uk-flex-right@s">
			<div class="inx-form-element uk-width-1-1 uk-width-auto@s">
				<select id="<?php echo $inx_skin_sort_var_name; ?>" name="<?php echo $inx_skin_sort_var_name; ?>" class="uk-select">
					<?php foreach ( $inx_skin_sort_options as $inx_skin_key => $inx_skin_option ) : ?>
					<option	value="<?php echo esc_attr( $inx_skin_key ); ?>"<?php echo $inx_skin_key === $inx_skin_current_sort_key ? ' selected' : ''; ?>>
						<?php echo esc_html( $inx_skin_option['title'] ); ?>
					</option>
					<?php endforeach; ?>
				</select>
			</div>
		</div>
	</form>
</div>
