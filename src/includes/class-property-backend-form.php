<?php
/**
 * CMB2-based property edit form
 *
 * @package immonex-kickstart
 */

namespace immonex\Kickstart;

/**
 * Property edit form (WP backend).
 */
class Property_Backend_Form {

	/**
	 * Array of bootstrap data
	 *
	 * @var mixed[]
	 */
	private $data;

	/**
	 * Constructor
	 *
	 * @since 1.0.0
	 *
	 * @param mixed[] $bootstrap_data Plugin bootstrap data.
	 */
	public function __construct( $bootstrap_data = array() ) {
		$this->data = $bootstrap_data;

		// Set an alternative URL for CMB2 includes (JS, CSS) in development environments.
		add_filter( 'cmb2_meta_box_url', array( $this, 'set_cmb2_dev_meta_box_url' ) );

		// Setup CMB2 meta boxes.
		add_action( 'cmb2_admin_init', array( $this, 'setup_meta_boxes' ) );
	} // __construct

	/**
	 * Set an alternative CMB2 JS/CSS url in development environments
	 * (filter callback).
	 *
	 * @since 1.0.0
	 *
	 * @param string $url Original URL.
	 *
	 * @return string Possibly alternative URL.
	 */
	public function set_cmb2_dev_meta_box_url( $url ) {
		if ( false === strpos( $url, 'plugins/' ) ) {
			return plugin_dir_url( $this->data['plugin_main_file'] ) . 'vendor/cmb2/cmb2';
		}

		return $url;
	} // set_cmb2_dev_meta_box_url

	/**
	 * Set up CMB2 meta boxes used in the backend form.
	 *
	 * @since 1.0.0
	 *
	 * @link https://github.com/CMB2/CMB2/wiki/Field-Types
	 */
	public function setup_meta_boxes() {
		$prefix = '_' . $this->data['plugin_prefix'];

		$extra_descriptions = new_cmb2_box(
			array(
				'id'           => 'extra_descriptions',
				'title'        => __( 'Extra Descriptions', 'immonex-kickstart' ),
				'object_types' => array( $this->data['property_post_type_name'] ),
				'context'      => 'normal',
				'priority'     => 'core',
				'show_names'   => true,
			)
		);

		$extra_description_fields = array(
			array(
				'name'    => __( 'Location', 'immonex-kickstart' ),
				'desc'    => '',
				'id'      => $prefix . 'location_descr',
				'type'    => 'wysiwyg',
				'options' => array(
					'textarea_rows' => 5,
					'teeny'         => true,
				),
			),
			array(
				'name'    => __( 'Features', 'immonex-kickstart' ),
				'desc'    => '',
				'id'      => $prefix . 'features_descr',
				'type'    => 'wysiwyg',
				'options' => array(
					'textarea_rows' => 5,
					'teeny'         => true,
				),
			),
			array(
				'name'    => __( 'Miscellaneous', 'immonex-kickstart' ),
				'desc'    => '',
				'id'      => $prefix . 'misc_descr',
				'type'    => 'wysiwyg',
				'options' => array(
					'textarea_rows' => 5,
					'teeny'         => true,
				),
			),
		);

		foreach ( $extra_description_fields as $field ) {
			$extra_descriptions->add_field( $field );
		}

		$core_data = new_cmb2_box(
			array(
				'id'           => 'core_data',
				'title'        => __( 'Core Data', 'immonex-kickstart' ),
				'object_types' => array( $this->data['property_post_type_name'] ),
				'context'      => 'normal',
				'priority'     => 'core',
				'show_names'   => true,
			)
		);

		$core_data_fields = array(
			array(
				'name' => __( 'Property ID', 'immonex-kickstart' ),
				'desc' => '',
				'id'   => $prefix . 'property_id',
				'type' => 'text_medium',
			),
			array(
				'name'  => __( 'Available', 'immonex-kickstart' ),
				'desc'  => '',
				'id'    => '_immonex_is_available',
				'type'  => 'checkbox',
				'value' => 1,
			),
			array(
				'name'  => __( 'Reserved', 'immonex-kickstart' ),
				'desc'  => '',
				'id'    => '_immonex_is_reserved',
				'type'  => 'checkbox',
				'value' => 1,
			),
			array(
				'name'  => __( 'Sold/Rented', 'immonex-kickstart' ),
				'desc'  => '',
				'id'    => '_immonex_is_sold',
				'type'  => 'checkbox',
				'value' => 1,
			),
			array(
				'name'  => __( 'Reference Property', 'immonex-kickstart' ),
				'desc'  => '',
				'id'    => '_immonex_is_reference',
				'type'  => 'checkbox',
				'value' => 1,
			),
			array(
				'name'  => __( 'Demo Property', 'immonex-kickstart' ),
				'desc'  => '',
				'id'    => '_immonex_is_demo',
				'type'  => 'checkbox',
				'value' => 1,
			),
			array(
				'name'        => __( 'Build Year', 'immonex-kickstart' ),
				'desc'        => '',
				'id'          => $prefix . 'build_year',
				'type'        => 'text_date',
				'date_format' => 'Y',
			),
			array(
				'name'       => __( 'Area (primary)', 'immonex-kickstart' ),
				'desc'       => '',
				'id'         => $prefix . 'primary_area',
				'type'       => 'text_small',
				'attributes' => array(
					'type' => 'number',
				),
			),
			array(
				'name'       => __( 'Plot Area', 'immonex-kickstart' ),
				'desc'       => '',
				'id'         => $prefix . 'plot_area',
				'type'       => 'text_small',
				'attributes' => array(
					'type' => 'number',
				),
			),
			array(
				'name'       => __( 'Rooms (primary)', 'immonex-kickstart' ),
				'desc'       => '',
				'id'         => $prefix . 'primary_rooms',
				'type'       => 'text_small',
				'attributes' => array(
					'type' => 'number',
				),
			),
			array(
				'name'       => __( 'Price (primary)', 'immonex-kickstart' ),
				'desc'       => '',
				'id'         => $prefix . 'primary_price',
				'type'       => 'text_small',
				'attributes' => array(
					'type' => 'number',
				),
			),
			array(
				'name' => __( 'Price Time Unit', 'immonex-kickstart' ),
				'desc' => '',
				'id'   => $prefix . 'price_time_unit',
				'type' => 'text_small',
			),
		);

		foreach ( $core_data_fields as $field ) {
			$core_data->add_field( $field );
		}

		$detail_repeater = new_cmb2_box(
			array(
				'id'           => 'details',
				'title'        => __( 'Details', 'immonex-kickstart' ),
				'object_types' => array( $this->data['property_post_type_name'] ),
				'context'      => 'normal',
				'priority'     => 'core',
				'show_names'   => true,
			)
		);

		$detail_group_id = $detail_repeater->add_field(
			array(
				'id'         => $prefix . 'details',
				'type'       => 'group',
				'repeatable' => true,
				'options'    => array(
					'group_title'   => __( 'Detail {#}', 'immonex-kickstart' ),
					'add_button'    => __( 'Add Detail', 'immonex-kickstart' ),
					'remove_button' => __( 'Remove Detail', 'immonex-kickstart' ),
					'closed'        => true,
					'sortable'      => true,
				),
			)
		);

		$detail_group_fields = array(
			array(
				'name' => __( 'Group', 'immonex-kickstart' ),
				'id'   => 'group',
				'type' => 'text',
			),
			array(
				'name' => __( 'Name', 'immonex-kickstart' ),
				'id'   => 'name',
				'type' => 'text',
			),
			array(
				'name' => __( 'Title', 'immonex-kickstart' ),
				'id'   => 'title',
				'type' => 'text',
			),
			array(
				'name' => __( 'Value', 'immonex-kickstart' ),
				'id'   => 'value',
				'type' => 'text',
			),
			array(
				'name' => 'Meta JSON',
				'id'   => 'meta_json',
				'type' => 'text',
			),
		);

		foreach ( $detail_group_fields as $field ) {
			$detail_repeater->add_group_field( $detail_group_id, $field );
		}
	} // setup_meta_boxes

} // Property_Backend_Form
