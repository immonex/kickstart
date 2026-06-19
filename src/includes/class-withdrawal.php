<?php
/**
 * Class Withdrawal
 *
 * @package immonex\Kickstart
 */

namespace immonex\Kickstart;

/**
 * Withdrawal CPT
 */
class Withdrawal {

	const BASE_NAME      = 'withdrawal';
	const POST_TYPE_NAME = 'inx_withdrawal';

	/**
	 * ID of related Withdrawal post
	 *
	 * @var int|string|bool
	 */
	private $withdrawal_id = false;

	/**
	 * Various component configuration data
	 *
	 * @var mixed[]
	 */
	private $config;

	/**
	 * Related form data
	 *
	 * @var mixed[]
	 */
	private $form_data = [];

	/**
	 * Constructor
	 *
	 * @since 1.17.0
	 *
	 * @param mixed[] $config    Various component configuration data.
	 * @param mixed[] $form_data Form data to save (optional).
	 */
	public function __construct( $config, $form_data = [] ) {
		$this->config = $config;

		if ( ! empty( $form_data ) ) {
			$this->set_form_data( $form_data );
		}
	} // __construct

	/**
	 * Extract form data to be saved with the Withdrawal and add related meta data.
	 *
	 * @since 1.17.0
	 *
	 * @param mixed[] $form_data Form data to save.
	 */
	public function set_form_data( $form_data ) {
		$field_keys = apply_filters( 'inxkick_get_withdrawal_form_field_keys', array() );

		if ( ! empty( $field_keys ) ) {
			foreach ( $field_keys as $key ) {
				$this->form_data[ $key ] = ! empty( $form_data[ $key ] ) ? $form_data[ $key ] : '';
			}
		}
	} // set_form_data

	/**
	 * Save the withdrawal as a post with meta data.
	 *
	 * @since 1.17.0
	 *
	 * @param bool $mail_send_result Result of the email sending process.
	 *
	 * @return int|bool ID of the created withdrawal post or false on failure.
	 */
	public function save( $mail_send_result ) {
		if ( empty( $this->form_data ) ) {
			return false;
		}

		$full_name = ! empty( $this->form_data['first_name'] ) ? $this->form_data['first_name'] : '';
		if ( ! empty( $this->form_data['last_name'] ) ) {
			$full_name .= ' ' . $this->form_data['last_name'];
		}
		$full_name = trim( $full_name );

		$title = ( $mail_send_result ? '📨 ' : '⚠️ ' ) .
			$full_name .
			( ! empty( $this->form_data['reference_number'] ) ? ', ' . $this->form_data['reference_number'] : '' );

		$post_data = [
			'post_type'    => self::POST_TYPE_NAME,
			'post_status'  => 'publish',
			'post_title'   => trim( $title ),
			'post_content' => $this->form_data['message'],
		];

		$this->withdrawal_id = wp_insert_post( $post_data );

		if ( $this->withdrawal_id ) {
			$prefix = '_' . $this->config['plugin_prefix'] . self::BASE_NAME . '_';

			foreach ( $this->form_data as $key => $value ) {
				if ( 'message' === $key ) {
					continue;
				}

				add_post_meta( $this->withdrawal_id, "{$prefix}{$key}", $value );
			}
		}

		return $this->withdrawal_id ? $this->withdrawal_id : false;
	} // save

} // Withdrawal
