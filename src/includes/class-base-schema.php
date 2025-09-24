<?php
/**
 * Class Base_Schema
 *
 * @package immonex\Kickstart
 */

namespace immonex\Kickstart;

/**
 * Base class for processing Schema.org related data of one property.
 */
class Base_Schema {

	/**
	 * Plugin options and other component configuration data
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
	 * Constructor
	 *
	 * @since 1.12.0-beta
	 *
	 * @param mixed[]  $config Various component configuration data.
	 * @param object[] $utils  Helper/Utility objects.
	 */
	public function __construct( $config, $utils ) {
		$this->config = $config;
		$this->utils  = $utils;
	} // __construct

	/**
	 * Generate an ID for a schema entity.
	 *
	 * @since 1.12.0-beta
	 *
	 * @param string          $url  Entity URL.
	 * @param string|string[] $type Entity type(s).
	 *
	 * @return string Entity Schema ID.
	 */
	public function get_schema_id( $url, $type ): string {
		$type = is_array( $type ) ? array_pop( $type ) : $type;

		return "{$url}#" . $this->utils['string']->slugify( $type );
	} // get_schema_id

} // Base_Schema
