<?php
/**
 * Template for property search form element (submit button)
 *
 * @package immonex\Kickstart
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$inx_skin_locale = str_replace( '_', '-', get_locale() );
?>
<div class="inx-form-element inx-form-element--submit">

	<inx-search-submit-button
		:form-index="<?php echo ! empty( $template_data['render_count'] ) ? (int) $template_data['render_count'] - 1 : '0'; ?>"
		title="<?php echo $template_data['element']['label']; ?>"
		nom-name="<?php echo __( 'Matches', 'immonex-kickstart' ); ?>"
		nom-one-match="<?php echo __( 'one match', 'immonex-kickstart' ); ?>"
		nom-no-matches="<?php echo __( 'no matches', 'immonex-kickstart' ); ?>"
		wrap-classes="inx-search-submit-button"
		locale="<?php echo $inx_skin_locale ? $inx_skin_locale : 'de-DE'; ?>"
		button-classes="inx-button inx-button--action uk-button uk-button-primary uk-width-1-1">
	</inx-search-submit-button>

</div>
