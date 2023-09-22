<?php
/**
 * API class
 *
 * @package immonex\Kickstart
 */

namespace immonex\Kickstart;

/**
 * Public methods (also for third-party developments).
 */
class API {

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
	 * Query cache
	 *
	 * @var mixed[]
	 */
	private $cache = array();

	/**
	 * Constructor
	 *
	 * @since 1.0.0
	 *
	 * @param mixed[]  $config Various component configuration data.
	 * @param object[] $utils Helper/Utility objects.
	 */
	public function __construct( $config, $utils ) {
		$this->config = $config;
		$this->utils  = $utils;
	} // __construct

	/**
	 * Determine/Calculate the primary price ranges based on the current
	 * property data.
	 *
	 * @since 1.0.0
	 *
	 * @param bool    $ignore_cache Omit fetching the related cached transient value
	 *                              (optional, defaults to false).
	 * @param int[]   $default_values Default ranges (selected min, selected max,
	 *                                range min (sale), range max (sale),
	 *                                range min (rent), range max (rent), optional).
	 * @param mixed[] $force_values Force specific values (if !== false, optional).
	 *
	 * @return int[] Selected min/max and range values.
	 */
	public function get_primary_price_min_max( $ignore_cache = false, $default_values = array( 0, 500000, 0, 500000, 0, 500 ), $force_values = array( false, false, false, false, false, false ) ) {
		global $wpdb;

		$transient_key = $this->config['plugin_prefix'] . 'primary_price_min_max';
		if ( ! $ignore_cache ) {
			$cached_min_max = get_transient( $transient_key );
			if ( ! empty( $cached_min_max ) ) {
				return $cached_min_max;
			}
		}

		$field_prefix = '_' . $this->config['plugin_prefix'];
		$min_max      = is_array( $default_values ) && 6 === count( $default_values ) ? $default_values : array( 0, 0, 0, 0, 0, 0 );

		$force_values = apply_filters( 'inx_search_form_primary_price_min_max_values', $force_values );

		if ( is_array( $force_values ) && count( $force_values ) > 0 ) {
			foreach ( $force_values as $i => $value ) {
				if ( false !== $value ) {
					$min_max[ $i ] = $value;
				}
			}
		} else {
			$force_values = array( false, false, false, false );
		}

		$marketing_types = array(
			'sale' => 1,
			'rent' => 0,
		);

		foreach ( $marketing_types as $key => $is_sale ) {
			$min_index = $is_sale ? 2 : 4;
			$max_index = $min_index + 1;

			// @codingStandardsIgnoreLine
			$result = $wpdb->get_results(
				$wpdb->prepare(
					"SELECT MIN(CONVERT(meta.meta_value, DECIMAL)) AS min, MAX(CONVERT(meta.meta_value, DECIMAL)) AS max FROM $wpdb->postmeta meta
						JOIN $wpdb->posts post ON meta.post_id = post.ID
						JOIN $wpdb->postmeta meta2 ON post.ID = meta2.post_id
						LEFT JOIN $wpdb->postmeta meta3 ON post.ID = meta3.post_id AND meta3.meta_key = %s
						WHERE post.post_type = %s
						AND post.post_status = 'publish'
						AND meta.meta_key = %s
						AND meta2.meta_key IN ('_immonex_is_available', '_immonex_is_reserved')
						AND meta2.meta_value = '1'
						AND (meta3.meta_value = %s OR meta3.meta_value IS NULL)",
					"{$field_prefix}is_sale",
					$this->config['property_post_type_name'],
					"{$field_prefix}primary_price",
					$is_sale
				),
				ARRAY_A
			);

			if ( empty( $result ) || empty( $result[0]['max'] ) ) {
				// No properties of the given marketing type available: take over unrelated values later.
				$min_max[ $min_index ] = 'Umin';
				$min_max[ $max_index ] = 'Umax';
				continue;
			}

			$min           = (int) $result[0]['min'];
			$rounddown_min = $this->utils['string']->smooth_round( $min, true );
			if ( $rounddown_min < 50 ) {
				$rounddown_min = 0;
			}

			$max         = (int) $result[0]['max'];
			$roundup_max = $this->utils['string']->smooth_round( $max );
			if ( $roundup_max < 100 ) {
				$roundup_max = 100;
			}

			// Unrelated min value.
			if (
				( $rounddown_min < $min_max[0] || 0 === $min_max[0] )
				&& false === $force_values[0]
			) {
				$min_max[0] = $rounddown_min;
			}

			// Min value for sale OR rent properties.
			if (
				( $rounddown_min < $min_max[ $min_index ] || 0 === $min_max[ $min_index ] )
				&& false === $force_values[ $min_index ]
			) {
				$min_max[ $min_index ] = $rounddown_min;
			}

			// Unrelated max value.
			if (
				$roundup_max
				&& ( $roundup_max > $min_max[1] || $min_max[1] === $default_values[1] )
				&& false === $force_values[1]
			) {
				$min_max[1] = $roundup_max;
			}

			// Max value for sale OR rent properties.
			if (
				$roundup_max
				&& ( $roundup_max > $min_max[ $max_index ] || $min_max[ $max_index ] === $default_values[ $max_index ] )
				&& false === $force_values[ $max_index ]
			) {
				$min_max[ $max_index ] = $roundup_max;
			}
		}

		foreach ( $min_max as $i => $value ) {
			if ( 'Umin' === $value ) {
				$min_max[ $i ] = $min_max[0];
			}
			if ( 'Umax' === $value ) {
				$min_max[ $i ] = $min_max[1];
			}
		}

		set_transient( $transient_key, $min_max, 86400 );

		return $min_max;
	} // get_primary_price_min_max

	/**
	 * Determine the maximum value of the given area type based on the current
	 * property data.
	 *
	 * @since 1.5.5
	 *
	 * @param string $type Area type (primary, living, commercial, retail, office,
	 *                     gastronomy, plot, usable, basement, attic, misc,
	 *                     garden, total).
	 * @param bool   $ignore_cache Omit fetching the related cached transient value
	 *                             (optional, defaults to false).
	 * @param int    $default Default value to return if no appropriate data are
	 *                        available (optional, defaults to 400).
	 *
	 * @return int Maximum or default value.
	 */
	public function get_area_max( $type, $ignore_cache = false, $default = 400 ) {
		global $wpdb;

		$valid_area_types = array(
			'primary',
			'living',
			'commercial',
			'retail',
			'office',
			'gastronomy',
			'plot',
			'usable',
			'basement',
			'attic',
			'misc',
			'garden',
			'total',
		);
		if ( ! in_array( $type, $valid_area_types, true ) ) {
			return $default;
		}

		$transient_key = $this->config['plugin_prefix'] . "{$type}_area_max";
		if ( ! $ignore_cache ) {
			$cached_max = get_transient( $transient_key );
			if ( ! empty( $cached_max ) ) {
				return $cached_max;
			}
		}

		$field_prefix = '_' . $this->config['plugin_prefix'];
		$field_name   = "{$field_prefix}{$type}_area";

		// @codingStandardsIgnoreLine
		$result = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT MAX(CONVERT(meta.meta_value, DECIMAL)) AS max FROM $wpdb->postmeta meta
					JOIN $wpdb->posts post ON meta.post_id = post.ID
					JOIN $wpdb->postmeta meta2 ON post.ID = meta2.post_id
					JOIN $wpdb->postmeta meta3 ON post.ID = meta3.post_id
					WHERE post.post_type = %s
					AND post.post_status = 'publish'
					AND meta.meta_key = %s
					AND meta2.meta_key = %s
					AND meta2.meta_value = '1'",
				$this->config['property_post_type_name'],
				$field_name,
				'_immonex_is_available'
			),
			ARRAY_A
		);

		if ( empty( $result ) || empty( $result[0]['max'] ) ) {
			$this->cache['max_area'][ $type ] = $default;
			return $default;
		}

		$max         = (int) $result[0]['max'];
		$roundup_max = $this->utils['string']->smooth_round( $max );

		set_transient( $transient_key, $roundup_max, 86400 );

		return $roundup_max;
	} // get_area_max

	/**
	 * Generate the author query part based on the given user IDs or login names.
	 *
	 * @since 1.1.0
	 *
	 * @param int|string|int[]|string[] $authors Query parameters.
	 *
	 * @return string[]|bool Associative array of query type and user IDs or
	 *                       or false if undeterminable.
	 */
	public function get_author_query( $authors ) {
		if ( ! is_array( $authors ) ) {
			$authors = array( $authors );
		}

		$include_authors = array();
		$exclude_authors = array();

		foreach ( $authors as $author ) {
			$exclude = '-' === $author[0];
			if ( $exclude ) {
				$author = substr( $author, 1 );
			}

			if ( is_numeric( $author ) ) {
				$author_id = (int) $author;
			} else {
				$author_object = get_user_by( 'login', $author );
				if ( $author_object ) {
					$author_id = $author_object->ID;
				} else {
					continue;
				}
			}

			if ( $exclude ) {
				$exclude_authors[] = $author_id;
			} else {
				$include_authors[] = $author_id;
			}
		}

		if ( ! empty( $include_authors ) ) {
			return array(
				'type'     => 'author__in',
				'user_ids' => $include_authors,
			);
		} elseif ( ! empty( $exclude_authors ) ) {
			return array(
				'type'     => 'author__not_in',
				'user_ids' => $exclude_authors,
			);
		}

		return false;
	} // get_author_query

	/**
	 * Retrieve and return the (possibly converted) value of the given
	 * query variable (utility wrapper method and filter callback for
	 * add-ons etc.).
	 *
	 * @since 1.1.0
	 *
	 * @param mixed          $value Current/Default value.
	 * @param string         $var_name Variable name.
	 * @param \WP_Query|bool $query WP query object (optional).
	 *
	 * @return mixed[]|string Variable value, if existent.
	 */
	public function get_query_var_value( $value, $var_name, $query = false ) {
		return $this->utils['data']->get_query_var_value( $var_name, $query, $value );
	} // get_query_var_value

	/**
	 * Retrieve and return the value of the field/details element with the
	 * given mapping name and the related property post ID (filter callback).
	 *
	 * @since 1.1.0
	 *
	 * @param string     $mapping_name Element name stated in the import
	 *                                 mapping table.
	 * @param int|string $post_id Related property post ID.
	 *
	 * @return mixed[]|string Variable value, if existent.
	 */
	public function get_custom_field_value_by_name( $mapping_name, $post_id ) {
		$value = $this->utils['data']->get_custom_field_by( 'name', $mapping_name, $post_id, true );
		if ( $value ) {
			return $value;
		}

		$grouped_details = $this->utils['data']->fetch_property_details( $post_id );
		return $this->utils['data']->get_details_item( $grouped_details, $mapping_name, false, true );
	} // get_custom_field_value_by_name

	/**
	 * Merge meta or taxonomy queries (utility wrapper method and filter callback for
	 * add-ons etc.).
	 *
	 * @since 1.6.17-beta
	 *
	 * @param mixed[] $org_query Original query.
	 * @param mixed[] $add_query Additional query.
	 * @param string  $relation  Relation (optional, "AND" by default).
	 *
	 * @return mixed[] Merged query.
	 */
	public function merge_queries( $org_query, $add_query, $relation = 'AND' ) {
		return $this->utils['query']->merge_queries( $org_query, $add_query, $relation );
	} // merge_queries

	/**
	 * Perform a low-level property post query and return all resulting IDs.
	 *
	 * @since 1.6.18-beta
	 *
	 * @param bool|string $references       Include reference properties: false = no (default),
	 *                                           true = yes, 'only' = guess! (optional, only considered
	 *                                           if $custom_args is empty).
	 * @param mixed[]     $post_status      Post status (optional).
	 * @param bool        $suppress_filters Suppress filters flag (optional, true by default).
	 * @param mixed[]     $custom_args      Custom query arguments (optional).
	 *
	 * @return int[] Post IDs.
	 */
	public function get_property_ids( $references = false, $post_status = 'publish', $suppress_filters = true, $custom_args = array() ) {
		$args = array_merge(
			array(
				'post_type'                     => $this->config['property_post_type_name'],
				'post_status'                   => $post_status,
				'posts_per_page'                => -1,
				'fields'                        => 'ids',
				'suppress_filters'              => $suppress_filters,
				'suppress_pre_get_posts_filter' => $suppress_filters,
			),
			$custom_args
		);

		if ( ! empty( $custom_args ) ) {
			return get_posts( $args );
		}

		if ( ! $references || 'no' === $references ) {
			$args['meta_query'] = array(
				array(
					'key'     => '_immonex_is_reference',
					'value'   => array( 0, 'off', '' ),
					'compare' => 'IN',
				),
			);
		} elseif ( 'only' === $references ) {
			$args['meta_query'] = array(
				array(
					'key'     => '_immonex_is_reference',
					'value'   => array( 1, 'on' ),
					'compare' => 'IN',
				),
			);
		}

		return get_posts( $args );
	} // get_property_ids

	/**
	 * Perform a low-level property geo coordinates query.
	 *
	 * @since 1.6.25-beta
	 *
	 * @return mixed[] Property geo coordinates (lat/lng), indexed by property post IDs.
	 */
	public function get_all_property_coords() {
		global $wpdb;

		// @codingStandardsIgnoreLine
		$result = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT post.ID AS post_id, meta.meta_value AS lat, meta2.meta_value AS lng
					FROM $wpdb->posts post
					LEFT JOIN $wpdb->postmeta meta ON post.ID = meta.post_id
					LEFT JOIN $wpdb->postmeta meta2 ON meta.post_id = meta2.post_id
					WHERE post.post_type = %s
					AND post.post_status = 'publish'
					AND meta.meta_key = '_inx_lat'
					AND meta2.meta_key = '_inx_lng'",
				$this->config['property_post_type_name']
			),
			ARRAY_A
		);

		$coords = array();

		if ( ! empty( $result ) ) {
			foreach ( $result as $coord ) {
				if ( empty( $coord['lat'] ) || empty( $coord['lng'] ) ) {
					continue;
				}

				$coords[ $coord['post_id'] ] = array(
					'lat' => $coord['lat'],
					'lng' => $coord['lng'],
				);
			}
		}

		return $coords;
	} // get_all_property_coords

} // API
