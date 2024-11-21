<?php
/**
 * API_Hooks class
 *
 * @package immonex\Kickstart
 */

namespace immonex\Kickstart;

/**
 * Public hooks (third-party developments) for API methods/wrappers.
 */
class API_Hooks {

	/**
	 * API methods/wrappers object
	 *
	 * @var \immonex\Kickstart\API
	 */
	private $api;

	/**
	 * Various component configuration data
	 *
	 * @var mixed[]
	 */
	private $config;

	/**
	 * Helper/Utility objects
	 *
	 * @var object[]
	 */
	private $utils;

	/**
	 * Constructor
	 *
	 * @since 1.1.0
	 *
	 * @param \immonex\Kickstart\API $api API methods/wrappers object.
	 * @param mixed[]                $config Various component configuration data.
	 * @param object[]               $utils Helper/Utility objects.
	 */
	public function __construct( $api, $config, $utils ) {
		$this->api    = $api;
		$this->config = $config;
		$this->utils  = $utils;

		/**
		 * Internal Hooks
		 */

		add_filter( 'inx_get_author_query', array( $this->api, 'get_author_query' ) );
		add_filter( 'inx_merge_queries', array( $this->api, 'merge_queries' ), 10, 3 );
		add_filter( 'inx_list_string_to_array', array( $this, 'list_string_to_array' ), 10, 2 );

		/**
		 * Public Hooks
		 */

		add_filter( 'inx_get_custom_field_value_by_name', array( $this->api, 'get_custom_field_value_by_name' ), 10, 3 );
		add_filter( 'inx_get_query_var_value', array( $this->api, 'get_query_var_value' ), 10, 3 );
		add_filter( 'inx_get_group_items', array( $this, 'get_group_items' ), 10, 3 );
		add_filter( 'inx_get_flex_items', array( $this, 'get_flex_items' ), 10, 5 );
		add_filter( 'inx_is_property_list_page', array( $this->api, 'is_property_list_page' ) );
		add_filter( 'inx_is_property_details_page', array( $this->api, 'is_property_details_page' ) );
		add_filter( 'inx_is_property_tax_archive', array( $this->api, 'is_property_tax_archive' ) );
		add_filter( 'inx_get_option_value', array( $this->api, 'get_option_value' ), 10, 2 );

		add_filter( 'inx_format', array( $this, 'format' ), 10, 3 );
	} // __construct

	/**
	 * Convert comma-separated string to array (proxy method/filter callback).
	 *
	 * @since 1.1.11-beta
	 *
	 * @param string|string[] $value List string or array.
	 * @param string|bool     $type Optional type/context definition (for future updates).
	 *
	 * @return string[] List array.
	 */
	public function list_string_to_array( $value, $type = false ) {
		if ( is_array( $value ) ) {
			return $value;
		}

		return $this->utils['data']->convert_to_group_array( $value );
	} // list_string_to_array

	/**
	 * Return a specific group of items out of a property details array
	 * (proxy method/filter callback).
	 *
	 * @since 1.1.11-beta
	 *
	 * @param mixed[]  $items   Original or empty array.
	 * @param mixed[]  $details Full array of property details.
	 * @param string[] $groups  List of item group names (optional).
	 *
	 * @return mixed[] Group items.
	 */
	public function get_group_items( $items, $details, $groups = array( 'ungruppiert' ) ) {
		return $this->utils['data']->get_group_items( $details, $groups );
	} // get_group_items

	/**
	 * Return grouped or single detail items based on the given mapping query
	 * strings (proxy method/filter callback).
	 *
	 * @since 1.1.27-beta
	 *
	 * @param mixed[]         $items   Original or empty array.
	 * @param mixed[]         $queries Mapping groups, names or custom field names.
	 * @param string[]|bool   $scope   Mapping columns to query: name, group, source (optional, false = all).
	 * @param int|string|bool $post_id Property post ID or false for auto detection
	 *                                 (optional).
	 *
	 * @return mixed[] Matching items.
	 */
	public function get_flex_items( $items, $queries, $scope = false, $post_id = false ) {
		return $this->utils['data']->get_flex_items( $items, $queries, $scope, $post_id );
	} // get_group_items

	/**
	 * Format a given value based on the given format type and optional arguments
	 * (proxy method/filter callback).
	 *
	 * @since 1.9.31-beta
	 *
	 * @param mixed   $value Original value.
	 * @param string  $type  Format type.
	 * @param mixed[] $args  Format arguments (optional).
	 *
	 * @return mixed Formatted value.
	 */
	public function format( $value, $type, $args = array() ) {
		if ( ! is_scalar( $value ) ) {
			return $value;
		}

		if (
			! is_numeric( $value )
			&& in_array( $type, array( 'price', 'area', 'number' ), true )
		) {
			return $value;
		}

		switch ( $type ) {
			case 'price':
				if ( is_numeric( key( $args ) ) ) {
					$decimals        = isset( $args[0] ) ? (int) $args[0] : 9;
					$currency        = isset( $args[1] ) ? (int) $args[1] : $this->config['currency_symbol'];
					$price_time_unit = isset( $args[2] ) ? $args[2] : '';
					$if_zero         = isset( $args[3] ) ? (int) $args[3] : '';
				} else {
					$decimals        = isset( $args['decimals'] ) ? (int) $args['decimals'] : 9;
					$currency        = isset( $args['currency'] ) ? (int) $args['currency'] : $this->config['currency_symbol'];
					$price_time_unit = isset( $args['price_time_unit'] ) ? $args['price_time_unit'] : '';
					$if_zero         = isset( $args['if_zero'] ) ? (int) $args['if_zero'] : '';
				}

				return $this->utils['format']->format_price( $value, $decimals, $price_time_unit, $if_zero, $currency );
			case 'area':
				if ( is_numeric( key( $args ) ) ) {
					$decimals = isset( $args[0] ) ? (int) $args[0] : 9;
					$unit     = isset( $args[1] ) ? (int) $args[1] : $this->config['area_unit'];
					$if_zero  = isset( $args[2] ) ? (int) $args[3] : '';
				} else {
					$decimals = isset( $args['decimals'] ) ? (int) $args['decimals'] : 9;
					$unit     = isset( $args['unit'] ) ? (int) $args['unit'] : $this->config['area_unit'];
					$if_zero  = isset( $args['if_zero'] ) ? (int) $args['if_zero'] : '';
				}

				return $this->utils['format']->format_area( $value, $decimals, $if_zero, $unit );
			case 'number':
				if ( is_numeric( key( $args ) ) ) {
					$decimals = isset( $args[0] ) ? (int) $args[0] : 9;
					$unit     = isset( $args[1] ) ? (int) $args[1] : '';
					$if_zero  = isset( $args[2] ) ? (int) $args[3] : '';
				} else {
					$decimals = isset( $args['decimals'] ) ? (int) $args['decimals'] : 9;
					$unit     = isset( $args['unit'] ) ? (int) $args['unit'] : '';
					$if_zero  = isset( $args['if_zero'] ) ? (int) $args['if_zero'] : '';
				}

				return $this->utils['string']->format_number( $value, $decimals, $unit, array( 'if_zero' => $if_zero ) );
		}

		return $value;
	} // format

} // API_Hooks
