<?php
/**
 * Template for property search form element (submit button)
 *
 * @package immonex-kickstart
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<div class="inx-form-element inx-form-element--submit">

	<inx-search-submit-button
		title="<?php echo $template_data['element']['label']; ?>"
		nom-name="<?php echo __( 'Matches', 'inx' ); ?>"
		nom-one-match="<?php echo __( 'one match', 'inx' ); ?>"
		nom-no-matches="<?php echo __( 'no matches', 'inx' ); ?>"
		wrap-classes="inx-search-submit-button"
		button-classes="inx-button inx-button--action uk-button uk-button-primary uk-width-1-1">
	</inx-search-submit-button>

</div>
