<?php
/**
 * CMB2-based withdrawal edit form
 *
 * @package immonex\Kickstart
 */

namespace immonex\Kickstart;

/**
 * Withdrawal CPT edit form (WP backend)
 */
class Withdrawal_Backend_Form {

	/**
	 * Array of bootstrap data
	 *
	 * @var mixed[]
	 */
	private $data;

	/**
	 * Main plugin object
	 *
	 * @var \immonex\Kickstart\Kickstart
	 */
	private $plugin;

	/**
	 * Constructor
	 *
	 * @since 1.17.0
	 *
	 * @param mixed[]                      $bootstrap_data Plugin bootstrap data.
	 * @param \immonex\Kickstart\Kickstart $plugin Main plugin object.
	 */
	public function __construct( $bootstrap_data, $plugin ) {
		$this->data   = is_array( $bootstrap_data ) ? $bootstrap_data : [];
		$this->plugin = $plugin;

		// Setup CMB2 meta boxes.
		add_action( 'cmb2_admin_init', [ $this, 'setup_meta_boxes' ] );
	} // __construct

	/**
	 * Set up CMB2 meta boxes used in the backend form.
	 *
	 * @since 1.17.0
	 *
	 * @link https://github.com/CMB2/CMB2/wiki/Field-Types
	 */
	public function setup_meta_boxes() {
		$prefix = '_' . $this->data['plugin_prefix'] . Withdrawal::BASE_NAME . '_';

		$contact_data = new_cmb2_box(
			[
				'id'           => "{$prefix}contact_contract_data",
				'title'        => __( 'Contact/Contract Data', 'immonex-kickstart' ),
				'object_types' => [ Withdrawal::POST_TYPE_NAME ],
				'context'      => 'normal',
				'priority'     => 'core',
				'show_names'   => true,
				'closed'       => true,
			]
		);

		$contact_data_fields = [
			[
				'name'             => __( 'Salutation', 'immonex-kickstart' ),
				'desc'             => '',
				'id'               => "{$prefix}salutation",
				'type'             => 'select',
				'show_option_none' => __( 'not specified', 'immonex-kickstart' ),
				'options'          => [
					__( 'Ms.', 'immonex-kickstart' ) => __( 'Ms.', 'immonex-kickstart' ),
					__( 'Mr.', 'immonex-kickstart' ) => __( 'Mr.', 'immonex-kickstart' ),
				],
			],
			[
				'name' => __( 'First Name', 'immonex-kickstart' ),
				'desc' => '',
				'id'   => "{$prefix}first_name",
				'type' => 'text',
			],
			[
				'name' => __( 'Last Name', 'immonex-kickstart' ),
				'desc' => '',
				'id'   => "{$prefix}last_name",
				'type' => 'text',
			],
			[
				'name' => __( 'Street', 'immonex-kickstart' ),
				'desc' => '',
				'id'   => "{$prefix}street",
				'type' => 'text',
			],
			[
				'name' => __( 'Postal Code', 'immonex-kickstart' ),
				'desc' => '',
				'id'   => "{$prefix}postal_code",
				'type' => 'text_small',
			],
			[
				'name' => __( 'City', 'immonex-kickstart' ),
				'desc' => '',
				'id'   => "{$prefix}city",
				'type' => 'text',
			],
			[
				'name' => __( 'Phone', 'immonex-kickstart' ),
				'desc' => '',
				'id'   => "{$prefix}phone",
				'type' => 'text',
			],
			[
				'name' => __( 'Email', 'immonex-kickstart' ),
				'desc' => '',
				'id'   => "{$prefix}email",
				'type' => 'text_email',
			],
			[
				'name' => __( 'Reference Number', 'immonex-kickstart' ),
				'desc' => '',
				'id'   => "{$prefix}reference_number",
				'type' => 'text_email',
			],
			[
				'name'        => __( 'Date of Contract Conclusion', 'immonex-kickstart' ),
				'desc'        => '',
				'id'          => "{$prefix}contract_date",
				'type'        => 'text_date',
				'date_format' => 'd.m.Y',
			],
		];

		foreach ( $contact_data_fields as $field ) {
			$contact_data->add_field( $field );
		}
	} // setup_meta_boxes

} // Withdrawal_Backend_Form
