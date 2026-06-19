<?php
/**
 * Class Withdrawal_Form
 *
 * @package immonex\Kickstart
 */

namespace immonex\Kickstart;

/**
 * Withdrawal form rendering and processing
 */
class Withdrawal_Form {

	const OBFUSCATION_KEY      = 'ga3!o';
	const HONEYPOT_FIELD_NAME  = 'fname';
	const HONEYPOT_FIELD_NAME2 = 'alternative-email';
	const TS_CHECK_FIELD_NAME  = 'form_msg_id';
	const TS_CHECK_THRESHOLD   = 8;

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
	 * Obfuscated (current) timestamp
	 *
	 * @var string
	 */
	private $obfuscated_timestamp;

	/**
	 * Constructor
	 *
	 * @since 1.70.0
	 *
	 * @param mixed[]  $config Various component configuration data.
	 * @param object[] $utils  Helper/Utility objects.
	 */
	public function __construct( $config, $utils ) {
		$this->config = $config;
		$this->utils  = $utils;
		// phpcs:ignore
		$this->obfuscated_timestamp = base64_encode( $this->utils['string']->xor_string( (string) time(), self::OBFUSCATION_KEY ) );
	} // __construct

	/**
	 * Render a withdrawal form (PHP template).
	 *
	 * @since 1.70.0
	 *
	 * @param string  $template Template file name (without suffix; optional).
	 * @param mixed[] $atts     Rendering attributes.
	 *
	 * @return string Rendered contents (HTML).
	 */
	public function render( $template = '', $atts = array() ) {
		if ( ! $template ) {
			$template = 'withdrawal-form';
		}

		$core_options = apply_filters( 'inx_options', array(), 'core' );
		$fields       = $this->get_fields( false );

		$template_data = array_merge(
			$this->config,
			$atts,
			array(
				'instance'             => $this,
				'introtext'            => $this->config['withdrawal_form_introtext'],
				'consent_text'         => $this->get_consent_text(),
				'fields'               => $fields,
				'honeypot_field_name'  => self::HONEYPOT_FIELD_NAME,
				'honeypot_field_name2' => self::HONEYPOT_FIELD_NAME2,
				'ts_check_field_name'  => self::TS_CHECK_FIELD_NAME,
				'obfuscated_timestamp' => $this->obfuscated_timestamp,
				'turnstile_sitekey'    => ! empty( $core_options['turnstile_sitekey'] ) ? $core_options['turnstile_sitekey'] : '',
				'is_preview'           => ! empty( $atts['is_preview'] ),
			)
		);

		$template_content = $this->utils['template']->render_php_template(
			$template,
			$template_data,
			$this->utils
		);

		return $template_content;
	} // render

	/**
	 * Send and admin notification mail after form submission.
	 *
	 * @since 1.17.0
	 *
	 * @param mixed[] $form_data Frontend form data (user inputs, meta data).
	 *
	 * @return mixed[] Send Result (status, user message).
	 */
	public function send( $form_data ) {
		$core_options = apply_filters( 'inx_options', array(), 'core' );

		if ( ! empty( $form_data['autofilled'] ) ) {
			foreach ( $form_data['autofilled'] as $field_name ) {
				if (
					self::HONEYPOT_FIELD_NAME === $field_name
					|| self::HONEYPOT_FIELD_NAME2 === $field_name
				) {
					$form_data[ $field_name ] = '';
				}
			}
		}

		if (
			$this->config['spam_prot_enable_turnstile']
			&& $core_options['turnstile_sitekey']
			&& $core_options['turnstile_secret_key']
		) {
			// phpcs:disable WordPress.Security.NonceVerification.Missing -- Nonce verification is performed later to allow for a more generic error message in case of failed Turnstile verification.
			$token = ! empty( $_POST['cf-turnstile-response'] ) ?
				sanitize_text_field( wp_unslash( $_POST['cf-turnstile-response'] ) ) : '';
			// phpcs:enable

			if ( $token ) {
				$ts_verify = Turnstile::verify( $token );

				if ( ! $ts_verify ) {
					return array(
						'valid'        => false,
						'message'      => __( 'Your submission could not be verified.', 'immonex-kickstart' ),
						'field_errors' => array(),
					);
				}
			} else {
				return array(
					'valid'        => false,
					'spam_check'   => true,
					'message'      => __( 'Please confirm the anti-spam check above and then click "Confirm Withdrawal" again.', 'immonex-kickstart' ),
					'field_errors' => array(),
				);
			}
		}

		$result = $this->validate( $form_data );
		if ( ! $result['valid'] ) {
			return $result;
		}

		if ( $this->config['withdrawal_form_confirmation_page'] ) {
			if ( intval( $this->config['withdrawal_form_confirmation_page'] ) ) {
				$confirmation_page_id = apply_filters( 'inx_element_translation_id', intval( $this->config['withdrawal_form_confirmation_page'] ) );
				$redirect_url         = get_permalink( $confirmation_page_id );
			} else {
				$redirect_url = $this->config['withdrawal_form_confirmation_page'];
			}

			if ( $redirect_url ) {
				$result['redirect_url'] = $redirect_url;
			}
		}

		if (
			$this->config['spam_prot_enable_honeypot']
			&& (
				! empty( $form_data[ self::HONEYPOT_FIELD_NAME ] )
				|| ! empty( $form_data[ self::HONEYPOT_FIELD_NAME2 ] )
			)
		) {
			// Don't submit data if honeypot fields are filled.
			return array(
				'valid'        => false,
				'message'      => __( 'A problem occured while processing your inquiry data. Please try again later!', 'immonex-kickstart' ),
				'field_errors' => array(),
			);
		}

		if ( $this->config['spam_prot_time_threshold'] && ! $this->timestamp_check( $form_data ) ) {
			// Don't submit data if the timestamp check threshold has not been exceeded yet.
			return array(
				'valid'        => false,
				'message'      => __( 'Uh-oh! A problem occured while processing your inquiry data. Please try again later!', 'immonex-kickstart' ),
				'field_errors' => array(),
			);
		}

		$site_title         = get_bloginfo( 'name' );
		$site_title_limited = $this->utils['string']->get_excerpt( $site_title, 20, '…' );
		$fields             = $this->get_fields();
		$template_data      = array(
			'site_title'         => $site_title,
			'site_title_limited' => $site_title_limited,
			'form_data'          => array(),
			'company_name'       => ! empty( $this->config['company_name'] ) ? $this->config['company_name'] : $site_title,
			'company_address'    => $this->config['company_address'],
			'default_signature'  => $this->get_default_signature(),
			'mail_as_html'       => $this->config['default_mail_as_html'],
		);

		$form_data['name'] = ! empty( $form_data['first_name'] ) ? $form_data['first_name'] : '';
		if ( ! empty( $form_data['last_name'] ) ) {
			$form_data['name'] .= ' ' . $form_data['last_name'];
		}
		$form_data['name'] = trim( $form_data['name'] );

		if ( count( $fields ) > 0 ) {
			foreach ( $fields as $field_name => $field ) {
				if ( isset( $form_data[ $field_name ] ) ) {
					$field['value']                            = $form_data[ $field_name ];
					$template_data['form_data'][ $field_name ] = $field;
				}
			}
		}

		$template_data['form_data']['name'] = array(
			'value' => $form_data['name'],
		);

		$send_result = false;
		$sender      = ! empty( $this->config['default_mail_sender_email'] ) ?
			$this->config['default_mail_sender_email'] :
			get_option( 'admin_email' );

		if ( ! empty( $this->config['default_mail_sender_name'] ) ) {
			$sender = wp_sprintf(
				'%s <%s>',
				$this->config['default_mail_sender_name'],
				$sender
			);
		}

		$sender          = apply_filters( 'inxkick_withdrawal_mail_sender', $sender );
		$default_subject = __( 'New withdrawal', 'immonex-kickstart' );
		$subject         = apply_filters(
			'inxkick_withdrawal_mail_subject',
			htmlspecialchars( $this->config['withdrawal_admin_notif_subject'], ENT_NOQUOTES ),
			$default_subject,
			$template_data,
			'admin_notification',
		);

		if ( ! trim( $subject ) ) {
			$subject = $default_subject;
		}

		$headers = array( "From: {$sender}" );

		if ( $form_data['name'] ) {
			$receipt_conf_recipient = wp_sprintf(
				'%s <%s>',
				$form_data['name'],
				$form_data['email']
			);
		} else {
			$receipt_conf_recipient = $form_data['email'];
		}

		$receipt_conf_recipient = apply_filters( 'inxkick_withdrawal_receipt_conf_recipient', $receipt_conf_recipient );
		$headers[]              = "Reply-To: {$receipt_conf_recipient}";

		$recipients = $this->utils['string']->split_mail_address_string(
			$this->config['default_mail_admin_recipients']
		);
		if ( empty( $recipients ) ) {
			$recipients = array( get_option( 'admin_email' ) );
		}

		$recipients = apply_filters( 'inxkick_withdrawal_mail_recipients', $recipients );

		$headers = apply_filters(
			'inxkick_withdrawal_mail_headers',
			$headers,
			'admin_notification'
		);

		$attachments = array();

		$this->add_prerendered_data( $template_data );

		$subject = $this->utils['template']->render_twig_template_string(
			$subject,
			$template_data['prerendered']
		);

		$twig_template = trim( $this->config['withdrawal_admin_notif_template'] );
		if ( false === strpos( $twig_template, '{{ form_data }}' ) ) {
			$twig_template .= '{{ form_data }}';
		}

		$body = array(
			'txt'  => $this->utils['template']->render_twig_template_string(
				$twig_template,
				$template_data['prerendered']
			),
			'html' => $this->utils['template']->render_twig_template_string(
				$twig_template,
				$template_data['prerendered_html']
			),
		);

		// Strip tags and slashes and apply wpautop to textarea form inputs.
		$body['html'] = preg_replace_callback(
			'/(?<=\<span).*?(?=\<\/span\>)/s',
			function ( $matches ) {
				$span_attrs    = substr( $matches[0], 0, strpos( $matches[0], '>' ) + 1 );
				$inner_content = substr( $matches[0], strlen( $span_attrs ) );
				return $span_attrs . wpautop( wp_strip_all_tags( $inner_content ) );
			},
			stripslashes( $body['html'] )
		);

		$html_frame_template_data = array();

		if ( $this->config['default_mail_as_html'] ) {
			$html_frame_template_data['preset'] = 'admin_info';
		} else {
			$body['html'] = false;
		}

		if ( ! empty( $body ) ) {
			$send_result = $this->utils['mail']->send(
				$recipients,
				$subject,
				$body,
				$headers,
				$attachments,
				$html_frame_template_data
			);
		}

		$withdrawal = new Withdrawal( $this->config, $form_data );
		$withdrawal->save( $send_result );

		if ( ! $send_result ) {
			$result['valid']   = false;
			$result['message'] = __( 'Uh-oh! A problem occured while sending your withdrawal. Please try again later!', 'immonex-kickstart' );
		} else {
			$this->send_receipt_confirmation( $sender, $receipt_conf_recipient, $template_data );
		}

		return $result;
	} // send

	/**
	 * Collect and sanitize the user inputs from the POST data.
	 *
	 * @since 1.17.0
	 *
	 * @return mixed[] User form data.
	 */
	public function get_user_form_data() {
		$form_data = array();
		$fields    = $this->get_fields();

		foreach ( array( self::HONEYPOT_FIELD_NAME, self::HONEYPOT_FIELD_NAME2, self::TS_CHECK_FIELD_NAME ) as $hp_field_name ) {
			// Add a honeypot/spam check field if missing.
			if ( ! isset( $fields[ $hp_field_name ] ) ) {
				$fields[ $hp_field_name ] = array(
					'is_honeypot' => true,
				);
			}
		}

		if ( count( $fields ) > 0 ) {
			foreach ( $fields as $field_name => $field ) {
				// phpcs:ignore
				$value = isset( $_POST[ $field_name ] ) ?
					// phpcs:ignore
					wp_unslash( $_POST[ $field_name ] ) : '';

				if ( ! empty( $field['is_honeypot'] ) ) {
					$form_data[ $field_name ] = ! $value && self::TS_CHECK_FIELD_NAME === $field_name ?
						false : $value;
					continue;
				}

				if ( 'date_time' === $field['type'] ) {
					$form_data[ $field_name ] = wp_sprintf(
						/* translators: %1$s = date, %2$s = time */
						__( '%1$s at %2$s', 'immonex-kickstart' ),
						current_time( __( 'Y/m/d', 'immonex-kickstart' ) ),
						current_time( __( 'g:i a', 'immonex-kickstart' ) )
					);
					continue;
				}

				$has_options       = isset( $field['options'] );
				$has_assoc_options = $has_options && array_values( $field['options'] ) !== $field['options'];

				if (
					$has_options
					&& ( $value && ! $has_assoc_options )
					&& isset( $field['options'][ $value ] )
				) {
					$value = $field['options'][ $value ];
				}

				if (
					( isset( $field['type'] ) && 'textarea' === $field['type'] )
					|| false !== strpos( $value, PHP_EOL )
				) {
					$value = sanitize_textarea_field( $value );
				} elseif (
					( isset( $field['type'] ) && 'email' === $field['type'] )
					|| 'email' === $field_name
				) {
					$value = sanitize_email( $value );
				} elseif (
					$value
					&& ( isset( $field['type'] ) && 'date' === $field['type'] )
				) {
					$ts    = strtotime( $value );
					$value = $ts ? date_i18n( 'd.m.Y', $ts ) : '';
				} else {
					$value = sanitize_text_field( $value );
				}

				$form_data[ $field_name ] = $value;
			}
		}

		return apply_filters( 'inxkick_withdrawal_form_user_data', $form_data );
	} // get_user_form_data

	/**
	 * Get the withdrawal form field elements.
	 *
	 * @since 1.17.0
	 *
	 * @param bool $keys_only Indicate if only the element names shall be returned.
	 *
	 * @return mixed[] Full field data or names only.
	 */
	public function get_fields( $keys_only = false ) {
		$org_fields = array(
			'salutation'       => array(
				'type'        => 'radio',
				'required'    => false,
				'caption'     => __( 'Salutation', 'immonex-kickstart' ),
				'options'     => array(
					''                               => __( 'not specified', 'immonex-kickstart' ),
					__( 'Ms.', 'immonex-kickstart' ) => __( 'Ms.', 'immonex-kickstart' ),
					__( 'Mr.', 'immonex-kickstart' ) => __( 'Mr.', 'immonex-kickstart' ),
				),
				'layout_type' => 'full',
				'order'       => 10,
			),
			'first_name'       => array(
				'type'        => 'text',
				'required'    => true,
				'caption'     => __( 'First Name', 'immonex-kickstart' ),
				'placeholder' => __( 'First Name', 'immonex-kickstart' ),
				'order'       => 20,
			),
			'last_name'        => array(
				'type'        => 'text',
				'required'    => true,
				'caption'     => __( 'Last Name', 'immonex-kickstart' ),
				'placeholder' => __( 'Last Name', 'immonex-kickstart' ),
				'order'       => 30,
			),
			'street'           => array(
				'type'        => 'text',
				'required'    => false,
				'caption'     => __( 'Street', 'immonex-kickstart' ),
				'placeholder' => __( 'Street', 'immonex-kickstart' ),
				'layout_type' => 'full',
				'order'       => 40,
			),
			'postal_code'      => array(
				'type'        => 'text',
				'required'    => false,
				'caption'     => __( 'Postal Code', 'immonex-kickstart' ),
				'placeholder' => __( 'Postal Code', 'immonex-kickstart' ),
				'layout_type' => 'half',
				'order'       => 50,
			),
			'city'             => array(
				'type'        => 'text',
				'required'    => false,
				'caption'     => __( 'City', 'immonex-kickstart' ),
				'placeholder' => __( 'City', 'immonex-kickstart' ),
				'layout_type' => 'half',
				'order'       => 60,
			),
			'phone'            => array(
				'type'        => 'text',
				'required'    => false,
				'caption'     => __( 'Phone', 'immonex-kickstart' ),
				'placeholder' => __( 'Phone', 'immonex-kickstart' ),
				'layout_type' => 'half',
				'order'       => 70,
			),
			'email'            => array(
				'type'        => 'email',
				'required'    => true,
				'caption'     => __( 'Email Address', 'immonex-kickstart' ),
				'placeholder' => __( 'Email Address', 'immonex-kickstart' ),
				'layout_type' => 'half',
				'order'       => 80,
			),
			'reference_number' => array(
				'type'         => 'text',
				'required'     => false,
				'caption'      => __( 'Contract, Customer or Property Number', 'immonex-kickstart' ),
				'caption_mail' => __( 'Reference Number', 'immonex-kickstart' ),
				'placeholder'  => __( 'Contract, Customer or Property Number', 'immonex-kickstart' ),
				'layout_type'  => 'half',
				'order'        => 90,
			),
			'contract_date'    => array(
				'type'        => 'date',
				'required'    => false,
				'caption'     => __( 'Date of contract conclusion', 'immonex-kickstart' ),
				'placeholder' => __( 'Date of contract conclusion', 'immonex-kickstart' ),
				'layout_type' => 'half',
				'order'       => 100,
			),
			'message'          => array(
				'type'        => 'textarea',
				'required'    => false,
				'caption'     => __( 'Additional Details', 'immonex-kickstart' ),
				'placeholder' => __( 'Additional Details', 'immonex-kickstart' ) .
					' (' . __( 'optional – e.g., services included in the contract to be withdrawn', 'immonex-kickstart' ) . ')',
				'layout_type' => 'full',
				'order'       => 110,
			),
		);

		$fields = apply_filters( 'inxkick_withdrawal_form_fields', $org_fields, $keys_only );

		if ( empty( $fields ) || ! is_array( $fields ) ) {
			$fields = $org_fields;
		}

		$fields['time_or_receipt'] = array(
			'type'    => 'date_time',
			'caption' => __( 'Time of Receipt', 'immonex-kickstart' ),
			'order'   => 200,
		);

		uasort(
			$fields,
			function ( $a, $b ) {
				if (
					! isset( $a['order'] )
					|| ! isset( $b['order'] )
					|| $a['order'] === $b['order']
				) {
					return 0;
				}

				return $a['order'] < $b['order'] ? -1 : 1;
			}
		);

		return $keys_only ? array_keys( $fields ) : $fields;
	} // get_fields

	/**
	 * Send a receipt confirmation mail.
	 *
	 * @since 1.17.0
	 *
	 * @param string  $sender        Real Sender mail address.
	 * @param string  $recipient     Recipient name and mail address.
	 * @param mixed[] $template_data Property and form data.
	 *
	 * @return bool Send Result.
	 */
	private function send_receipt_confirmation( $sender, $recipient, $template_data ) {
		$subject = apply_filters(
			'inxkick_withdrawal_mail_subject',
			htmlspecialchars( $this->config['withdrawal_rcpt_conf_subject'], ENT_NOQUOTES ),
			$template_data,
			'receipt_confirmation',
		);

		if ( ! trim( $subject ) ) {
			/**
			 * Fallback subject
			 */
			$subject = wp_sprintf(
				'[%s] %s',
				$template_data['prerendered']['site_title'],
				__( 'Confirmation of receipt of your withdrawal', 'immonex-kickstart' )
			);
		}

		$subject = $this->utils['template']->render_twig_template_string(
			$subject,
			$template_data['prerendered']
		);

		$headers = apply_filters(
			'inxkick_withdrawal_mail_headers',
			array( "From: {$sender}" ),
			'receipt_confirmation'
		);

		if ( trim( $this->config['withdrawal_rcpt_conf_template'] ) ) {
			// Render Twig-based template (plugin options).
			$twig_template = $this->config['withdrawal_rcpt_conf_template'];

			$body = array(
				'txt'  => $this->utils['template']->render_twig_template_string(
					$twig_template,
					$template_data['prerendered']
				),
				'html' => $this->utils['template']->render_twig_template_string(
					$twig_template,
					$template_data['prerendered_html']
				),
			);
		} else {
			$twig_template = __( 'Your withdrawal has been received.', 'immonex-kickstart' );
		}

		$body['txt']  = $this->utils['string']->html_to_plain_text( $body['txt'] );
		$body['html'] = $this->config['default_mail_as_html'] ?
			wpautop( stripslashes( $body['html'] ) ) : false;
		$signature    = trim(
			$this->utils['template']->render_twig_template_string(
				$this->config['default_mail_signature'],
				$template_data['prerendered_html']
			)
		);

		if ( $signature ) {
			$body['txt'] = wp_sprintf(
				'%s%s--%s',
				trim( $body['txt'] ),
				PHP_EOL . PHP_EOL,
				PHP_EOL . $this->utils['string']->html_to_plain_text( $signature )
			);
			$signature   = wpautop( stripslashes( $signature ) );
		}

		$attachments = apply_filters(
			'inxkick_withdrawal_mail_attachments',
			array(),
			'receipt_confirmation',
		);

		$html_frame_template_data = apply_filters(
			'inxkick_withdrawal_mail_html_frame_params',
			array(
				'logo'          => $this->config['default_mail_logo_id'] ?
					wp_get_attachment_url( $this->config['default_mail_logo_id'] ) : '',
				'logo_link_url' => $this->config['default_mail_logo_id'] ?
					home_url() : '',
				'footer_text'   => $signature,
				'layout'        => array(
					'logo_position' => $this->config['default_mail_logo_position'],
				),
			),
			'receipt_confirmation',
		);

		if ( ! empty( $body ) ) {
			return $this->utils['mail']->send(
				$recipient,
				$subject,
				$body,
				$headers,
				$attachments,
				$html_frame_template_data
			);
		}

		return false;
	} // send_receipt_confirmation

	/**
	 * Validate the submitted frontend form data.
	 *
	 * @since 1.17.0
	 *
	 * @param mixed $form_data Frontend form data (user inputs, meta data).
	 *
	 * @return mixed[] Validation result (status, user messages, errors).
	 */
	private function validate( $form_data ) {
		$fields = $this->get_fields();
		$result = array(
			'valid'        => true,
			'message'      => $this->config['withdrawal_form_submission_conf_msg'],
			'field_errors' => array(),
		);

		if ( count( $fields ) > 0 ) {
			foreach ( $fields as $field_name => $field ) {
				if (
					! empty( $field['required'] )
					&& empty( $form_data[ $field_name ] )
				) {
					$result['field_errors'][ $field_name ] = __( 'This is a required field!', 'immonex-kickstart' );
				} elseif (
					! empty( $field['required_or'] )
					&& empty( $form_data[ $field_name ] )
					&& empty( $form_data[ $field['required_or'] ] )
				) {
					$result['field_errors'][ $field_name ] = wp_sprintf(
						/* translators: %s = caption of an alternative required field */
						__( 'Please fill out this or the alternative field <strong>%s</strong>.', 'immonex-kickstart' ),
						$fields[ $field['required_or'] ]['caption']
					);
				}
			}
		}

		if ( count( $result['field_errors'] ) > 0 ) {
			$result['valid']   = false;
			$result['message'] = __( 'Please check the inputs!', 'immonex-kickstart' );
		} elseif (
			empty( $form_data['nonce']['value'] )
			|| ! wp_verify_nonce( $form_data['nonce']['value'], $form_data['nonce']['context'] )
		) {
			$result['valid']   = false;
			$result['message'] = __( 'Your data could not be submitted. Please reload the page and try again!', 'immonex-kickstart' );
		}

		return $result;
	} // validate

	/**
	 * Perform a form submission timestamp check.
	 *
	 * @since 1.17.0
	 *
	 * @param mixed[] $form_data User-submitted form data.
	 *
	 * @return bool Check status (true = valid data/false = spam submission).
	 */
	private function timestamp_check( $form_data ) {
		if ( ! isset( $form_data[ self::TS_CHECK_FIELD_NAME ] ) || false === $form_data[ self::TS_CHECK_FIELD_NAME ] ) {
			// No form rendering time field available (possibly older/custom template): skip check.
			return true;
		}

		$timestamp_check_threshold = (int) apply_filters(
			'inxkick_withdrawal_form_timestamp_check_threshold',
			$this->config['spam_prot_time_threshold']
		);

		if ( ! $timestamp_check_threshold ) {
			// Threshold must have been zeroed by a filter function: skip check.
			return true;
		}

		$form_creation_timestamp = (int) $this->utils['string']->xor_string(
			// phpcs:ignore
			base64_decode( $form_data[ self::TS_CHECK_FIELD_NAME ] ),
			self::OBFUSCATION_KEY
		);

		if (
			! $form_creation_timestamp
			|| time() - $form_creation_timestamp <= $timestamp_check_threshold
		) {
			// Check timeframe has not been exceeded yet: high probability of spam.
			return false;
		}

		return true;
	} // timestamp_check

	/**
	 * Prerender property/form data for output in PHP templates.
	 *
	 * @since 1.17.0
	 *
	 * @param mixed $template_data Template source data.
	 */
	private function add_prerendered_data( &$template_data ) {
		$data = array(
			'site_title'         => $template_data['site_title'],
			'site_title_limited' => $template_data['site_title_limited'],
			'site_url'           => home_url(),
			'form_data'          => '',
			'merged_form_data'   => '',
			'company_name'       => $template_data['company_name'],
			'company_address'    => $template_data['company_address'],
			'default_signature'  => $template_data['default_signature'],
			'mail_as_html'       => $template_data['mail_as_html'],
		);

		$data_html = array( 'merged_form_data' => '' );

		if ( ! empty( $template_data['form_data'] ) ) {
			$max_caption_length = $this->get_max_field_caption_length( $template_data['form_data'] );
			$fields_inserted    = 0;

			foreach ( $template_data['form_data'] as $field_name => $field ) {
				if ( ! isset( $field['type'] ) ) {
					$field['type'] = 'text';
				}

				$rendered_field      = '';
				$rendered_field_html = '';
				$caption             = $this->get_field_caption( $field );

				if ( 'textarea' === $field['type'] ) {
					$divider = PHP_EOL . str_repeat( '-', strlen( $field['caption'] ) + 1 );

					if ( $fields_inserted > 0 ) {
						$data['merged_form_data'] .= PHP_EOL;
					}
					if ( $caption ) {
						$rendered_field = $caption . ':';
					}

					$rendered_field_html  = PHP_EOL . $rendered_field;
					$rendered_field      .= wp_sprintf(
						'%2$s%1$s%2$s',
						PHP_EOL . $field['value'],
						$divider
					);
					$rendered_field_html .= wp_sprintf(
						'<span style="display:block; width:100%%; box-sizing:border-box; padding:16px; background:rgba(0, 0, 0, .10)">%s</span>',
						preg_replace( '/[' . PHP_EOL . ']{2,}/', PHP_EOL, $field['value'] )
					);
				} else {
					if ( $caption ) {
						$rendered_field      = $this->utils['string']->mb_str_pad( $caption . ':', $max_caption_length );
						$rendered_field_html = $caption . ': ';
					}
					$rendered_field      .= $field['value'];
					$rendered_field_html .= wp_sprintf( '<strong>%s</strong>', $field['value'] );
				}

				$data[ $field_name ]                   = $field['value'];
				$data[ "{$field_name}_rendered" ]      = $rendered_field;
				$data_html[ $field_name ]              = $field['value'];
				$data_html[ "{$field_name}_rendered" ] = $rendered_field_html;
				if (
					! empty( $field['value'] )
					&& ( $caption || 'textarea' === $field['type'] )
				) {
					$data['merged_form_data']      .= $rendered_field . PHP_EOL;
					$data_html['merged_form_data'] .= $rendered_field_html . PHP_EOL;
				}

				++$fields_inserted;
			}

			$data['merged_form_data'] = trim( $data['merged_form_data'] );
			$data['form_data']        = $data['merged_form_data'];
			$data_html['form_data']   = $data_html['merged_form_data'];
		}

		$template_data['prerendered']      = $data;
		$template_data['prerendered_html'] = array_merge( $data, $data_html );
	} // add_prerendered_data

	/**
	 * Get the most suitable caption for the given field (plain text mail rendering).
	 *
	 * @since 1.17.0
	 *
	 * @param string $field Field key (name).
	 *
	 * @return string Caption.
	 */
	private function get_field_caption( $field ) {
		$caption = '';

		if ( ! empty( $field['caption_mail'] ) ) {
			$caption = $field['caption_mail'];
		} elseif ( ! empty( $field['caption'] ) ) {
			$caption = $field['caption'];
		}

		return $caption;
	} // get_field_caption

	/**
	 * Get the maximum field caption length (plain text mail rendering).
	 *
	 * @since 1.17.0
	 *
	 * @param mixed[] $form_data Form data.
	 *
	 * @return int Max. caption length.
	 */
	private function get_max_field_caption_length( $form_data ) {
		$max_caption_length = 4;

		foreach ( $form_data as $field_name => $field ) {
			if ( empty( $field['value'] ) ) {
				continue;
			}

			$caption = $this->get_field_caption( $field );

			if (
				$caption
				&& 'textarea' !== $field['type']
				&& 'consent' !== $field_name
			) {
				$max_caption_length = strlen( $caption ) + 2;
			}
		}

		return $max_caption_length;
	} // get_max_field_caption_length

	/**
	 * Assemble the form's privacy consent note.
	 *
	 * @since 1.17.0
	 *
	 * @return string Form consent text.
	 */
	private function get_consent_text() {
		$core_options = apply_filters( 'inx_options', [], 'core' );
		$privacy_text = '';
		$privacy_url  = get_privacy_policy_url();

		if ( $privacy_url ) {
			$privacy_link = wp_sprintf(
				'<a href="%s" target="_blank">%s</a>',
				$privacy_url,
				__( 'Privacy Policy', 'immonex-kickstart' )
			);
		} else {
			$privacy_link = __( 'Privacy Policy', 'immonex-kickstart' );
		}

		$privacy_text = wp_sprintf(
			'<p>%s</p>',
			str_replace(
				'[privacy_policy]',
				$privacy_link,
				$this->config['withdrawal_form_privacy_consent_text']
			)
		);

		if ( $this->config['spam_prot_enable_turnstile'] ) {
			Turnstile::add_consent_note( $privacy_text );
		}

		return $privacy_text;
	} // get_consent_text

	/**
	 * Generate the default signature for customer/prospect mails.
	 *
	 * @since 1.17.0
	 *
	 * @return string Signature HTML.
	 */
	private function get_default_signature() {
		$sig = array(
			wp_sprintf(
				'<a href="%1$s">%2$s</a>',
				home_url(),
				get_bloginfo( 'name' ),
			),
		);

		$company = ! empty( $this->config['company_name'] ) ? "<strong>{$this->config['company_name']}</strong>" : '';
		if ( ! empty( $this->config['company_address'] ) ) {
			$company = trim( $company . PHP_EOL . nl2br( $this->config['company_address'] ) );
		}

		if ( $company ) {
			$sig[] = $company;
			return '<p>' . implode( '</p>' . PHP_EOL . '<p>', $sig ) . '</p>';
		}

		return $sig[0];
	} // get_default_signature

} // Withdrawal_Form
