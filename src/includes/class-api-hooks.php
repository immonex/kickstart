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

		add_filter( 'inx_get_custom_field_value_by_name', array( $this->api, 'get_custom_field_value_by_name' ), 10, 3 );
		add_filter( 'inx_get_query_var_value', array( $this->api, 'get_query_var_value' ), 10, 3 );
		add_filter( 'inx_get_group_items', array( $this, 'get_group_items' ), 10, 3 );
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

} // API_Hooks
