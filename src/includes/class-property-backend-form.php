<?php
/**
 * CMB2-based property edit form
 *
 * @package immonex\Kickstart
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

		// Extend attachment lists if required.
		add_filter( 'cmb2_override__inx_gallery_images_meta_value', array( $this, 'maybe_extend_attachment_array' ), 10, 4 );
		add_filter( 'cmb2_override__inx_floor_plans_meta_value', array( $this, 'maybe_extend_attachment_array' ), 10, 4 );
		add_filter( 'cmb2_override__inx_file_attachments_meta_value', array( $this, 'maybe_extend_attachment_array' ), 10, 4 );
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

		$core_data_boxes = array(
			'core'           => __( 'Core Data', 'immonex-kickstart' ),
			'geo'            => __( 'Location/Geo', 'immonex-kickstart' ),
			'rooms'          => __( 'Rooms', 'immonex-kickstart' ),
			'areas'          => __( 'Areas', 'immonex-kickstart' ),
			'units_grouping' => __( 'Units/Grouping', 'immonex-kickstart' ),
		);

		foreach ( $core_data_boxes as $box_id => $box_title ) {
			$core_data[ $box_id ] = new_cmb2_box(
				array(
					'id'           => $box_id,
					'title'        => $box_title,
					'object_types' => array( $this->data['property_post_type_name'] ),
					'context'      => 'normal',
					'priority'     => 'core',
					'show_names'   => true,
					'closed'       => true,
				)
			);
		}

		$core_data_fields = array(
			array(
				'box'  => 'core',
				'name' => __( 'Property ID', 'immonex-kickstart' ),
				'desc' => '',
				'id'   => $prefix . 'property_id',
				'type' => 'text_medium',
			),
			array(
				'box'  => 'core',
				'name' => __( 'Translation ID', 'immonex-kickstart' ),
				'desc' => '',
				'id'   => '_immonex_translation_id',
				'type' => 'text_medium',
			),
			array(
				'box'             => 'core',
				'name'            => __( 'For Sale', 'immonex-kickstart' ),
				'desc'            => '',
				'id'              => "{$prefix}is_sale",
				'type'            => 'checkbox',
				'sanitization_cb' => array( $this, 'convert_cb_value' ),
			),
			array(
				'box'             => 'core',
				'name'            => __( 'Available', 'immonex-kickstart' ),
				'desc'            => '',
				'id'              => '_immonex_is_available',
				'type'            => 'checkbox',
				'sanitization_cb' => array( $this, 'convert_cb_value' ),
			),
			array(
				'box'             => 'core',
				'name'            => __( 'Reserved', 'immonex-kickstart' ),
				'desc'            => '',
				'id'              => '_immonex_is_reserved',
				'type'            => 'checkbox',
				'sanitization_cb' => array( $this, 'convert_cb_value' ),
			),
			array(
				'box'             => 'core',
				'name'            => __( 'Sold/Rented', 'immonex-kickstart' ),
				'desc'            => '',
				'id'              => '_immonex_is_sold',
				'type'            => 'checkbox',
				'sanitization_cb' => array( $this, 'convert_cb_value' ),
			),
			array(
				'box'             => 'core',
				'name'            => __( 'Reference Property', 'immonex-kickstart' ),
				'desc'            => '',
				'id'              => '_immonex_is_reference',
				'type'            => 'checkbox',
				'sanitization_cb' => array( $this, 'convert_cb_value' ),
			),
			array(
				'box'             => 'core',
				'name'            => __( 'Featured', 'immonex-kickstart' ),
				'desc'            => '',
				'id'              => '_immonex_is_featured',
				'type'            => 'checkbox',
				'sanitization_cb' => array( $this, 'convert_cb_value' ),
			),
			array(
				'box'             => 'core',
				'name'            => __( 'Front Page Offer', 'immonex-kickstart' ),
				'desc'            => '',
				'id'              => '_immonex_is_front_page_offer',
				'type'            => 'checkbox',
				'sanitization_cb' => array( $this, 'convert_cb_value' ),
			),
			array(
				'box'             => 'core',
				'name'            => __( 'Demo Property', 'immonex-kickstart' ),
				'desc'            => '',
				'id'              => '_immonex_is_demo',
				'type'            => 'checkbox',
				'sanitization_cb' => array( $this, 'convert_cb_value' ),
			),
			array(
				'box'  => 'core',
				'name' => __( 'Import Folder', 'immonex-kickstart' ),
				'desc' => '',
				'id'   => '_immonex_import_folder',
				'type' => 'text',
			),
			array(
				'box'        => 'core',
				'name'       => __( 'Build Year', 'immonex-kickstart' ),
				'desc'       => '',
				'id'         => $prefix . 'build_year',
				'type'       => 'text_small',
				'attributes' => array(
					'type' => 'number',
				),
			),
			array(
				'box'        => 'core',
				'name'       => __( 'Price (primary)', 'immonex-kickstart' ),
				'desc'       => '',
				'id'         => $prefix . 'primary_price',
				'type'       => 'text_small',
				'attributes' => array(
					'type' => 'number',
				),
			),
			array(
				'box'  => 'core',
				'name' => __( 'Price Time Unit', 'immonex-kickstart' ),
				'desc' => '',
				'id'   => $prefix . 'price_time_unit',
				'type' => 'text_medium',
			),
			array(
				'box'  => 'units_grouping',
				'name' => __( 'Group ID', 'immonex-kickstart' ),
				'desc' => '',
				'id'   => '_immonex_group_id',
				'type' => 'text',
			),
			array(
				'box'              => 'units_grouping',
				'name'             => __( 'Group Master Property', 'immonex-kickstart' ),
				'desc'             => '',
				'id'               => '_immonex_group_master',
				'type'             => 'select',
				'show_option_none' => __( 'no', 'immonex-kickstart' ),
				'options'          => array(
					'visible'   => __( 'visible', 'immonex-kickstart' ),
					'invisible' => __( 'not visible', 'immonex-kickstart' ),
				),
			),
			array(
				'box'        => 'units_grouping',
				'name'       => __( 'Group Number', 'immonex-kickstart' ),
				'desc'       => '',
				'id'         => '_immonex_group_number',
				'type'       => 'text_small',
				'attributes' => array(
					'type' => 'number',
				),
			),
			array(
				'box'        => 'units_grouping',
				'name'       => __( 'Units (primary)', 'immonex-kickstart' ),
				'desc'       => '',
				'id'         => $prefix . 'primary_units',
				'type'       => 'text_small',
				'attributes' => array(
					'type' => 'number',
				),
			),
			array(
				'box'        => 'units_grouping',
				'name'       => __( 'Living Units', 'immonex-kickstart' ),
				'desc'       => '',
				'id'         => $prefix . 'living_units',
				'type'       => 'text_small',
				'attributes' => array(
					'type' => 'number',
				),
			),
			array(
				'box'        => 'units_grouping',
				'name'       => __( 'Commercial Units', 'immonex-kickstart' ),
				'desc'       => '',
				'id'         => $prefix . 'commercial_units',
				'type'       => 'text_small',
				'attributes' => array(
					'type' => 'number',
				),
			),
			array(
				'box'  => 'geo',
				'name' => __( 'Country Code', 'immonex-kickstart' ),
				'desc' => wp_sprintf(
					// translators: %s = Wikipedia URL.
					__( 'see <a href="%s" target="_blank">ISO-3166-1 ALPHA-3</a>', 'immonex-kickstart' ),
					'https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3'
				),
				'id'   => '_immonex_iso_country',
				'type' => 'text_small',
			),
			array(
				'box'  => 'geo',
				'name' => __( 'Latitude', 'immonex-kickstart' ),
				'desc' => '',
				'id'   => $prefix . 'lat',
				'type' => 'text_small',
			),
			array(
				'box'  => 'geo',
				'name' => __( 'Longitude', 'immonex-kickstart' ),
				'desc' => '',
				'id'   => $prefix . 'lng',
				'type' => 'text_small',
			),
			array(
				'box'        => 'geo',
				'name'       => __( 'Full Address', 'immonex-kickstart' ),
				'desc'       => '',
				'id'         => $prefix . 'full_address',
				'type'       => 'text',
				'attributes' => array(
					'class' => 'large-text',
				),
			),
			array(
				'box'        => 'rooms',
				'name'       => __( 'Rooms (primary)', 'immonex-kickstart' ),
				'desc'       => '',
				'id'         => $prefix . 'primary_rooms',
				'type'       => 'text_small',
				'attributes' => array(
					'type' => 'number',
				),
			),
			array(
				'box'        => 'rooms',
				'name'       => __( 'Bedrooms', 'immonex-kickstart' ),
				'desc'       => '',
				'id'         => $prefix . 'bedrooms',
				'type'       => 'text_small',
				'attributes' => array(
					'type' => 'number',
				),
			),
			array(
				'box'        => 'rooms',
				'name'       => __( 'Living Rooms/Bedrooms', 'immonex-kickstart' ),
				'desc'       => '',
				'id'         => $prefix . 'living_bedrooms',
				'type'       => 'text_small',
				'attributes' => array(
					'type' => 'number',
				),
			),
			array(
				'box'        => 'rooms',
				'name'       => __( 'Bathrooms', 'immonex-kickstart' ),
				'desc'       => '',
				'id'         => $prefix . 'bathrooms',
				'type'       => 'text_small',
				'attributes' => array(
					'type' => 'number',
				),
			),
			array(
				'box'        => 'rooms',
				'name'       => __( 'Total Rooms', 'immonex-kickstart' ),
				'desc'       => '',
				'id'         => $prefix . 'total_rooms',
				'type'       => 'text_small',
				'attributes' => array(
					'type' => 'number',
				),
			),
			array(
				'box'        => 'areas',
				'name'       => __( 'Area (primary)', 'immonex-kickstart' ),
				'desc'       => '',
				'id'         => $prefix . 'primary_area',
				'type'       => 'text_small',
				'after'      => '&nbsp;m²',
				'attributes' => array(
					'type' => 'number',
				),
			),
			array(
				'box'        => 'areas',
				'name'       => __( 'Living Area', 'immonex-kickstart' ),
				'desc'       => '',
				'id'         => $prefix . 'living_area',
				'type'       => 'text_small',
				'after'      => '&nbsp;m²',
				'attributes' => array(
					'type' => 'number',
				),
			),
			array(
				'box'        => 'areas',
				'name'       => __( 'Plot', 'immonex-kickstart' ),
				'desc'       => '',
				'id'         => $prefix . 'plot_area',
				'type'       => 'text_small',
				'after'      => '&nbsp;m²',
				'attributes' => array(
					'type' => 'number',
				),
			),
			array(
				'box'        => 'areas',
				'name'       => __( 'Usable Area', 'immonex-kickstart' ),
				'desc'       => '',
				'id'         => $prefix . 'usable_area',
				'type'       => 'text_small',
				'after'      => '&nbsp;m²',
				'attributes' => array(
					'type' => 'number',
				),
			),
			array(
				'box'        => 'areas',
				'name'       => __( 'Total Area', 'immonex-kickstart' ),
				'desc'       => '',
				'id'         => $prefix . 'total_area',
				'type'       => 'text_small',
				'after'      => '&nbsp;m²',
				'attributes' => array(
					'type' => 'number',
				),
			),
			array(
				'box'        => 'areas',
				'name'       => __( 'Basement', 'immonex-kickstart' ),
				'desc'       => '',
				'id'         => $prefix . 'basement_area',
				'type'       => 'text_small',
				'after'      => '&nbsp;m²',
				'attributes' => array(
					'type' => 'number',
				),
			),
			array(
				'box'        => 'areas',
				'name'       => __( 'Attic', 'immonex-kickstart' ),
				'desc'       => '',
				'id'         => $prefix . 'attic_area',
				'type'       => 'text_small',
				'after'      => '&nbsp;m²',
				'attributes' => array(
					'type' => 'number',
				),
			),
			array(
				'box'        => 'areas',
				'name'       => __( 'Garden', 'immonex-kickstart' ),
				'desc'       => '',
				'id'         => $prefix . 'garden_area',
				'type'       => 'text_small',
				'after'      => '&nbsp;m²',
				'attributes' => array(
					'type' => 'number',
				),
			),
			array(
				'box'        => 'areas',
				'name'       => __( 'Commercial Area', 'immonex-kickstart' ),
				'desc'       => '',
				'id'         => $prefix . 'commercial_area',
				'type'       => 'text_small',
				'after'      => '&nbsp;m²',
				'attributes' => array(
					'type' => 'number',
				),
			),
			array(
				'box'        => 'areas',
				'name'       => __( 'Retail Area', 'immonex-kickstart' ),
				'desc'       => '',
				'id'         => $prefix . 'retail_area',
				'type'       => 'text_small',
				'after'      => '&nbsp;m²',
				'attributes' => array(
					'type' => 'number',
				),
			),
			array(
				'box'        => 'areas',
				'name'       => __( 'Office Area', 'immonex-kickstart' ),
				'desc'       => '',
				'id'         => $prefix . 'office_area',
				'type'       => 'text_small',
				'after'      => '&nbsp;m²',
				'attributes' => array(
					'type' => 'number',
				),
			),
			array(
				'box'        => 'areas',
				'name'       => __( 'Other Area', 'immonex-kickstart' ),
				'desc'       => '',
				'id'         => $prefix . 'misc_area',
				'type'       => 'text_small',
				'after'      => '&nbsp;m²',
				'attributes' => array(
					'type' => 'number',
				),
			),
		);

		foreach ( $core_data_fields as $field ) {
			$box_id = ! empty( $field['box'] ) ? $field['box'] : 'core';
			$core_data[ $box_id ]->add_field( $field );
		}

		$attachments = new_cmb2_box(
			array(
				'id'           => 'attachments',
				'title'        => __( 'Images & Attachments', 'immonex-kickstart' ),
				'object_types' => array( $this->data['property_post_type_name'] ),
				'context'      => 'normal',
				'priority'     => 'core',
				'show_names'   => true,
				'closed'       => true,
			)
		);

		$attachment_fields = array(
			array(
				'name'       => __( 'Gallery Images', 'immonex-kickstart' ),
				'desc'       => '',
				'id'         => $prefix . 'gallery_images',
				'type'       => 'file_list',
				'query_args' => array( 'type' => 'image' ),
			),
			array(
				'name'       => __( 'Floor Plans', 'immonex-kickstart' ),
				'desc'       => '',
				'id'         => $prefix . 'floor_plans',
				'type'       => 'file_list',
				'query_args' => array( 'type' => 'image' ),
			),
			array(
				'name' => __( 'Document Attachments (PDF)', 'immonex-kickstart' ),
				'desc' => '',
				'id'   => $prefix . 'file_attachments',
				'type' => 'file_list',
			),
		);

		foreach ( $attachment_fields as $field ) {
			$attachments->add_field( $field );
		}

		$detail_repeater = new_cmb2_box(
			array(
				'id'           => 'details',
				'title'        => __( 'Details', 'immonex-kickstart' ),
				'object_types' => array( $this->data['property_post_type_name'] ),
				'context'      => 'normal',
				'priority'     => 'core',
				'show_names'   => true,
				'closed'       => true,
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

	/**
	 * Convert image/attachment arrays consisting of IDs only to the extended
	 * format including URLs (ID => URL).
	 *
	 * @since 1.1.0
	 *
	 * @param mixed      $org_data The original data or "cmb2_field_no_override_val"
	 *                             for retrieving the data normally.
	 * @param int        $object_id The current object ID.
	 * @param mixed[]    $args An array of arguments for retrieving the data.
	 * @param CMB2_Field $field The related field object.
	 *
	 * @return mixed Array with attachment IDs as key and URLs as value.
	 */
	public function maybe_extend_attachment_array( $org_data, $object_id, $args, $field ) {
		$prefix = '_' . $this->data['plugin_prefix'];

		$data = get_post_meta( $args['id'], $args['field_id'], true );

		if ( ! is_array( $data ) || 0 === count( $data ) ) {
			return $org_data;
		}

		if ( ! is_numeric( $data[ key( $data ) ] ) ) {
			// Attachment list already contains URLs, no changes required.
			return $data;
		}

		$new_data = array();

		foreach ( $data as $att_id ) {
			$new_data[ $att_id ] = wp_get_attachment_url( $att_id );
		}

		return $new_data;
	} // maybe_extend_attachment_array

	/**
	 * Convert checkbox states to 0/1.
	 *
	 * @since 1.4.17-beta
	 *
	 * @param string|null $value The original value.
	 * @param mixed[]     $args  Field arguments.
	 * @param CMB2_Field  $field The related field object.
	 *
	 * @return int 1 if checked, 0 if not.
	 */
	public function convert_cb_value( $value, $args, $field ) {
		return empty( $value ) ? 0 : 1;
	} // convert_cb_value

} // Property_Backend_Form
