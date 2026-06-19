<?php
/**
 * Withdrawal form template
 *
 * @package immonex\Kickstart
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( defined( 'INX_SKIN_MARK_REQUIRED_FORM_FIELDS' ) ) {
	$inx_skin_mark_req_fields = INX_SKIN_MARK_REQUIRED_FORM_FIELDS;
} else {
	$inx_skin_mark_req_fields = true;
}

$inx_skin_remote_addr  = isset( $_SERVER['REMOTE_ADDR'] ) ?
	sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : false;
$inx_skin_is_localhost = in_array( $inx_skin_remote_addr, array( '127.0.0.1', '::1' ), true );
$inx_skin_action       = "{$template_data['plugin_prefix']}submit_withdrawal_form";

$inx_skin_required = array();
foreach ( $template_data['fields'] as $inx_skin_field_name => $inx_skin_field ) {
	$inx_skin_required[ $inx_skin_field_name ] = ! empty( $inx_skin_field['required'] ) ? ' required' : '';
}
?>
<div class="inx-withdrawal-form-wrap">
	<?php if ( $template_data['introtext'] ) : ?>
	<div class="inx-withdrawal-form__introtext uk-margin-bottom">
		<?php echo wp_kses_post( wpautop( $template_data['introtext'] ) ); ?>
	</div>
	<?php endif; ?>

	<form class="inx-withdrawal-form uk-form-stacked uk-inline" method="post" action="<?php echo admin_url( 'admin-ajax.php' ); ?>">
		<input type="hidden" name="action" value="<?php echo $inx_skin_action; ?>">
		<input type="hidden" name="<?php echo $template_data['ts_check_field_name']; ?>" value="<?php echo $template_data['obfuscated_timestamp']; ?>">
		<?php wp_nonce_field( $inx_skin_action, "{$inx_skin_action}_nonce" ); ?>

		<?php // Honeypot. ?>
		<div class="inx-withdrawal-form__input inx-withdrawal-form__input--name--<?php echo $template_data['honeypot_field_name']; ?>" aria-hidden="true">
			<input type="text" name="<?php echo $template_data['honeypot_field_name']; ?>" placeholder="First Name" tabindex="-1" autocomplete="off" aria-label="First Name" class="uk-input">
			<div class="inx-withdrawal-form__input-error"></div>
		</div>
		<?php // /Honeypot. ?>

		<?php
		foreach ( $template_data['fields'] as $inx_skin_field_name => $inx_skin_field ) :
			if ( ! empty( $inx_skin_field['type'] ) ) {
				$inx_skin_field_type = $inx_skin_field['type'];
			} elseif ( 'email' === $inx_skin_field_name ) {
				$inx_skin_field_type = 'email';
			} elseif ( 'message' === $inx_skin_field_name ) {
				$inx_skin_field_type = 'textarea';
			} else {
				$inx_skin_field_type = 'text';
			}

			if (
				'date_time' === $inx_skin_field_type
				|| ( 'checkbox' === $inx_skin_field_type && empty( $inx_skin_field['caption'] ) )
			) {
				continue;
			}

			$inx_skin_field_required = ! empty( $inx_skin_field['required'] )
				|| ! empty( $inx_skin_field['required_or'] );
			$inx_skin_placeholder    = ! empty( $inx_skin_field['placeholder'] ) ?
				$inx_skin_field['placeholder'] : '';
			if ( $inx_skin_mark_req_fields && $inx_skin_placeholder && $inx_skin_field_required ) {
				$inx_skin_placeholder .= ' *';
			}
			$inx_skin_default_value = isset( $inx_skin_field['default_value'] ) ?
				$inx_skin_field['default_value'] : '';
			$inx_skin_add_classes   = isset( $inx_skin_field['layout_type'] ) ?
				' inx-withdrawal-form__input--type--' . $inx_skin_field['layout_type'] : '';
			?>

		<div class="inx-withdrawal-form__input<?php echo $inx_skin_add_classes; ?> inx-withdrawal-form__input--name--<?php echo $inx_skin_field_name; ?>">

			<?php if ( in_array( $inx_skin_field_type, array( 'text', 'email' ), true ) ) : ?>

			<input
				type="<?php echo $inx_skin_field_type; ?>"
				name="<?php echo $inx_skin_field_name; ?>"
				placeholder="<?php echo $inx_skin_placeholder; ?>"
				aria-label="<?php echo $inx_skin_placeholder; ?>"
				class="uk-input"<?php echo $inx_skin_required[ $inx_skin_field_name ]; ?>
			>

			<?php elseif ( 'textarea' === $inx_skin_field_type ) : ?>

			<textarea
				name="<?php echo $inx_skin_field_name; ?>"
				rows="4"
				placeholder="<?php echo $inx_skin_placeholder; ?>"
				aria-label="<?php echo $inx_skin_placeholder; ?>"
				class="uk-textarea"<?php echo $inx_skin_required[ $inx_skin_field_name ]; ?>
			><?php echo $inx_skin_default_value; ?></textarea>

			<?php elseif ( 'date' === $inx_skin_field_type ) : ?>

			<input
				type="text"
				name="<?php echo $inx_skin_field_name; ?>"
				placeholder="<?php echo $inx_skin_placeholder; ?>"
				aria-label="<?php echo $inx_skin_placeholder; ?>"
				max="<?php echo gmdate( 'Y-m-d' ); ?>"
				onmouseover="(this.type='date')"
				onfocus="(this.type='date')"
				onblur="(this.type = this.value ? 'date' : 'text')"
				class="uk-input"<?php echo $inx_skin_required[ $inx_skin_field_name ]; ?>
			>

			<?php elseif ( 'checkbox' === $inx_skin_field_type ) : ?>

			<label>
				<input
					type="checkbox"
					name="<?php echo $inx_skin_field_name; ?>"
					value="<?php echo ! empty( $inx_skin_field['value'] ) ? $inx_skin_field['value'] : 'X'; ?>"
					class="uk-checkbox"<?php echo $inx_skin_required[ $inx_skin_field_name ]; ?>
				>
				<?php echo $inx_skin_field['caption'] . ( $inx_skin_mark_req_fields && $inx_skin_field_required ? ' *' : '' ); ?>
			</label>

				<?php
			elseif ( 'radio' === $inx_skin_field_type && ! empty( $inx_skin_field['options'] ) ) :
				foreach ( $inx_skin_field['options'] as $inx_skin_option => $inx_skin_option_label ) :
					?>

					<label>
						<input
							type="radio"
							name="<?php echo $inx_skin_field_name; ?>"
							value="<?php echo $inx_skin_option; ?>"
							class="uk-radio"<?php echo $inx_skin_required[ $inx_skin_field_name ]; ?>
							<?php echo $inx_skin_option === $inx_skin_default_value ? 'checked' : ''; ?>
						>
						<?php echo $inx_skin_option_label; ?>
					</label>&nbsp;

					<?php
				endforeach;
				if ( $inx_skin_mark_req_fields && $inx_skin_field_required ) :
					echo ' *';
				endif;
			elseif ( 'select' === $inx_skin_field_type && ! empty( $inx_skin_field['options'] ) ) :
				if ( $inx_skin_mark_req_fields && $inx_skin_field_required ) :
					$inx_skin_field['options'][ array_keys( $inx_skin_field['options'] )[0] ] .= ' *';
				endif;
				?>

				<select name="<?php echo $inx_skin_field_name; ?>" class="uk-select"<?php echo $inx_skin_required[ $inx_skin_field_name ]; ?>>
					<?php foreach ( $inx_skin_field['options'] as $inx_skin_option => $inx_skin_option_label ) : ?>
					<option value="<?php echo $inx_skin_option; ?>"><?php echo $inx_skin_option_label; ?></option>
					<?php endforeach; ?>
				</select>

				<?php
			endif;
			?>

			<div class="inx-withdrawal-form__input-error"></div>
		</div><!-- .inx-withdrawal-form__input -->

			<?php
		endforeach;
		?>

		<?php // Honeypot. ?>
		<div class="inx-withdrawal-form__input inx-withdrawal-form__input--name--<?php echo $template_data['honeypot_field_name2']; ?>" aria-hidden="true">
			<input name="<?php echo $template_data['honeypot_field_name2']; ?>" placeholder="Alternative E-Mail Address" tabindex="-1" autocomplete="off" aria-label="Alternative E-Mail Address" class="uk-input">
			<div class="inx-withdrawal-form__input-error"></div>
		</div>
		<?php // /Honeypot. ?>

		<?php // phpcs:disable ?>

		<?php if ( $template_data['consent_text'] ) : ?>
		<div class="inx-withdrawal-form__input inx-withdrawal-form__input--type--privacy-consent">
			<div class="inx-withdrawal-form__consent-text">
				<?php echo $template_data['consent_text']; ?>
			</div>
		</div>
		<?php endif; ?>

		<div class="inx-withdrawal-form__input inx-withdrawal-form__input--type--full inx-withdrawal-form__result-wrap">
			<div class="inx-withdrawal-form__result"></div>
		</div>

		<div class="inx-withdrawal-form__input inx-withdrawal-form__input--type--full inx-withdrawal-form__input--name--submit">
			<div>
				<?php if ( $inx_skin_is_localhost || is_ssl() ) : ?>
				<span uk-icon="lock" title="<?php _e( 'Secure submission', 'immonex-kickstart' ); ?>"></span> <?php _e( 'Secure!', 'immonex-kickstart' ); ?>
				<?php endif; ?>
				&nbsp;
			</div>
			<div>
				<button	class="inx-withdrawal-form__submit inx-button inx-button--action uk-button uk-button-primary">
					<?php _e( 'Confirm Withdrawal', 'immonex-kickstart' ); ?>
				</button>
			</div>
		</div>

		<?php // phpcs:enable ?>

		<div class="inx-withdrawal-form__spinner uk-overlay-default uk-position-cover">
			<div class="uk-position-center" uk-spinner="ratio: 2"></div>
		</div>
	</form>
</div>
