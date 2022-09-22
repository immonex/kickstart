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

		add_filter( 'inx_get_author_query', array( $this->api, 'get_author_query' ) );
		add_filter( 'inx_get_custom_field_value_by_name', array( $this->api, 'get_custom_field_value_by_name' ), 10, 2 );
		add_filter( 'inx_get_query_var_value', array( $this->api, 'get_query_var_value' ), 10, 3 );
		add_filter( 'inx_merge_queries', array( $this->api, 'merge_queries' ), 10, 3 );
	} // __construct

} // API_Hooks
