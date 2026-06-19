<?php
/**
 * Class Withdrawal_Form_Hooks
 *
 * @package immonex\Kickstart
 */

namespace immonex\Kickstart;

/**
 * Contact form related actions and filters
 */
class Withdrawal_Form_Hooks {

	/**
	 * Various component configuration data
	 *
	 * @var mixed[]
	 */
	protected $config;

	/**
	 * Helper/Utility objects
	 *
	 * @var object[]
	 */
	protected $utils;

	/**
	 * Current related form object
	 *
	 * @var \immonex\Kickstart\Withdrawal_Form
	 */
	protected $current_form;

	/**
	 * Constructor
	 *
	 * @since 1.17.0
	 *
	 * @param mixed[]  $config Various component configuration data.
	 * @param object[] $utils  Helper/Utility objects.
	 */
	public function __construct( $config, $utils ) {
		$this->config = $config;
		$this->utils  = $utils;
	} // __construct

	/**
	 * Register plugin/form-specific actions and shortcodes.
	 *
	 * @since 1.17.0
	 */
	public function init() {
		add_action( "{$this->config['plugin_prefix']}render_withdrawal_form", array( $this, 'render_form' ), 10, 3 );
		add_action( "wp_ajax_{$this->config['plugin_prefix']}submit_withdrawal_form", array( $this, 'process_submission' ) );
		add_action( "wp_ajax_nopriv_{$this->config['plugin_prefix']}submit_withdrawal_form", array( $this, 'process_submission' ) );

		// Internal filter.
		add_filter( 'inxkick_get_withdrawal_form_field_keys', array( $this, 'get_form_keys' ), 10, 2 );

		add_shortcode( 'inx-withdrawal-form', array( $this, 'shortcode_withdrawal_form' ) );
		add_shortcode( 'inx-withdrawal-form-confirmation-message', array( $this, 'shortcode_confirmation_message' ) );
	} // __construct

	/**
	 * Render and return or output the contents of a form template.
	 *
	 * @since 1.17.0
	 *
	 * @param string  $template Template file (without suffix).
	 * @param mixed[] $atts     Rendering Attributes (optional).
	 * @param bool    $output   Flag for directly output the rendered contents (true by default).
	 *
	 * @return string Rendered template contents.
	 */
	public function render_form( $template = '', $atts = array(), $output = true ) {
		if ( ! $template ) {
			$template = 'withdrawal-form';
		}

		$form     = $this->get_form_instance();
		$contents = $form->render( $template, $atts );

		if ( $output ) {
			echo $contents;
		}

		return $contents;
	} // render_form

	/**
	 * Process the submitted frontend form data and send a JSON response
	 * (action callback).
	 *
	 * @since 1.17.0
	 */
	public function process_submission() {
		$form          = $this->get_form_instance();
		$nonce_context = "{$this->config['plugin_prefix']}submit_withdrawal_form";

		// phpcs:disable
		$form_data     = array_merge(
			array(
				'nonce'            => array(
					'context' => $nonce_context,
					'value'   => ! empty( $_POST[ "{$nonce_context}_nonce" ] ) ?
						sanitize_text_field( wp_unslash( $_POST[ "{$nonce_context}_nonce" ] ) ) :
						false,
				),
				'autofilled'       => ! empty( $_POST['autofilled'] ) ? json_decode( wp_unslash( $_POST['autofilled'] ) ) : [],
			),
			$form->get_user_form_data()
		);
		// phpcs:enable

		$result = $form->send( $form_data );

		wp_send_json( $result, $result['valid'] ? 200 : 400 );
	} // process_submission

	/**
	 * Return the form field keys (filter callback).
	 *
	 * @since 1.17.0
	 *
	 * @return string[] Form field keys.
	 */
	public function get_form_keys() {
		$form = $this->get_form_instance();

		return $form->get_fields( true );
	} // get_form_keys

	/**
	 * Return the current form object instance, create if not existing yet.
	 *
	 * @since 1.0.0
	 *
	 * @return \immonex\Kickstart\Team\Withdrawal_Form Current form object.
	 */
	public function get_form_instance() {
		if ( ! $this->current_form ) {
			$this->current_form = new Withdrawal_Form( $this->config, $this->utils );
		}

		return $this->current_form;
	} // get_form_instance

	/**
	 * Return the withdrawal form output.
	 *
	 * @since 1.17.0
	 *
	 * @param mixed[] $atts Rendering Attributes.
	 *
	 * @return string Rendered shortcode contents.
	 */
	public function shortcode_withdrawal_form( $atts = array() ) {
		return $this->render_form( 'withdrawal-form', $atts, false );
	} // shortcode_withdrawal_form

	/**
	 * Return the form submission confirmation message (plugin options).
	 *
	 * @since 1.17.0
	 *
	 * @param mixed[] $atts Rendering Attributes.
	 *
	 * @return string Rendered shortcode contents.
	 */
	public function shortcode_confirmation_message( $atts = array() ) {
		return wp_sprintf(
			'<div class="inx-withdrawal-form-confirmation-message">%s</div>',
			$this->config['withdrawal_form_submission_conf_msg']
		);
	} // shortcode_confirmation_message

} // Withdrawal_Form_Hooks
