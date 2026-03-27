<?php
/**
 * Class Cache
 *
 * @package immonex\Kickstart
 */

namespace immonex\Kickstart;

/**
 * Cache-related functionality.
 */
class Cache {

	const CACHE_GROUP_PREFIXES = [
		'property'      => [
			'inxkick_ptd_cache_', // Property Template Data.
		],
		'property_list' => [
			'inxkick_pp_cache_', // Property Posts.
		],
		'map_marker'    => [
			'inxkick_mm_cache_', // Map Marker Data.
		],
	];

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
	 * @since 1.14.6
	 *
	 * @param mixed[]  $config Various component configuration data.
	 * @param object[] $utils  Helper/Utility objects.
	 */
	public function __construct( $config, $utils ) {
		$this->config = $config;
		$this->utils  = $utils;

		/**
		 * WP actions and filters
		 */

		add_action( "deleted_post_{$this->config['property_post_type_name']}", [ $this, 'delete_post_transients' ], 10, 2 );

		/**
		 * OpenImmo2WP actions
		 */

		add_action( 'immonex_oi2wp_property_imported', [ $this, 'delete_post_transients' ], 10, 2 );

		add_action(
			'immonex_oi2wp_import_zip_file_processed',
			function ( $import_zip_file ) {
				$this->bulk_delete_cache_transients( 'property_list', 'map_marker' );
			}
		);

		/**
		 * Plugin actions
		 */

		add_action( 'inxkick_clear_property_cache', [ $this, 'delete_post_transients' ] );
		add_action( 'inxkick_clean_up_db_cache', [ $this, 'perform_db_cleanup' ] );
	} // __construct

	/**
	 * Delete property post related transients like caches etc. (action callback).
	 *
	 * @since 1.14.6
	 *
	 * @param int                             $post_id  Post ID.
	 * @param \WP_Post|\SimpleXMLElement|bool $property Property post, XML element instance
	 *                                        or false (optional/unused).
	 */
	public function delete_post_transients( $post_id, $property = false ) {
		foreach ( self::CACHE_GROUP_PREFIXES['property'] as $type ) {
			preg_match( '/_([a-z]+)_[a-z]/', $type, $cache_types );
			array_shift( $cache_types );
		}

		foreach ( $cache_types as $type ) {
			delete_transient( "inxkick_{$type}_cache_{$post_id}" );
		}
	} // delete_post_transients

	/**
	 * Delete general cache transients (action callback).
	 *
	 * @since 1.14.6
	 *
	 * @param string|string[] $cache_groups One or multiple cache groups (optional, default "all").
	 */
	public function bulk_delete_cache_transients( $cache_groups = 'all' ) {
		global $wpdb;

		if ( 'all' === $cache_groups ) {
			$cache_type_prefixes = array_merge( ...array_values( self::CACHE_GROUP_PREFIXES ) );
		} else {
			if ( ! is_array( $cache_groups ) ) {
				$cache_groups = [ $cache_groups ];
			}

			$cache_type_prefixes = array_merge( ...array_values( array_intersect_key( self::CACHE_GROUP_PREFIXES, array_flip( $cache_groups ) ) ) );
		}

		do_action( 'inx_cache_delete_db_transients', $cache_type_prefixes );
	} // bulk_delete_cache_transients

	/**
	 * Perform a cleanup of expired cache transients stored in the WP database
	 * (action callback).
	 *
	 * @since 1.15.0
	 */
	public function perform_db_cleanup() {
		do_action(
			'inx_cache_clean_up_db_transients',
			array_merge( ...array_values( self::CACHE_GROUP_PREFIXES ) ),
			$this->config['performance_max_db_cache_size']
		);
	} // perform_db_cleanup

} // Cache
