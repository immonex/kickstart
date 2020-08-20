<?php
/**
 * API class
 *
 * @package immonex-kickstart
 */

namespace immonex\Kickstart;

/**
 * Public methods for third-party developments.
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
	 * @param int[]   $default_values Default ranges (selected min, selected max,
	 *                                range min (sale), range max (sale),
	 *                                range min (rent), range max (rent)).
	 * @param mixed[] $force_values Force specific values (if !== false).
	 *
	 * @return int[] Selected min/max and range values.
	 */
	public function get_primary_price_min_max( $default_values = array( 0, 500000, 0, 500000, 0, 1000 ), $force_values = array( 0, false, 0, false, 0, false ) ) {
		// TODO: Add cache.
		$field_prefix = '_' . $this->config['plugin_prefix'];
		$min_max      = is_array( $default_values ) && 6 === count( $default_values ) ? $default_values : array( 0, 0, 0, 0, 0, 0 );

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

		$cnt = 0;

		foreach ( $marketing_types as $key => $is_sale ) {
			$min_index = $cnt + 2;
			$max_index = $cnt + 3;

			$args = array(
				'post_type'                     => $this->config['property_post_type_name'],
				'post_status'                   => array( 'publish' ),
				'posts_per_page'                => -1,
				'fields'                        => 'ids',
				'meta_query'                    => array(
					array(
						'key'   => $field_prefix . 'is_sale',
						'value' => $is_sale,
					),
				),
				'suppress_pre_get_posts_filter' => true,
			);

			$property_ids = get_posts( $args );

			if ( count( $property_ids ) > 0 ) {
				foreach ( $property_ids as $post_id ) {
					$price   = (int) get_post_meta( $post_id, $field_prefix . 'primary_price', true );
					$base    = (int) 1 . str_repeat( '0', strlen( (string) $price ) - 1 );
					$roundup = ceil( $price / $base ) * $base;

					if ( $roundup ) {
						// Unrelated min value.
						if ( $roundup < $min_max[0] && false === $force_values[0] ) {
							$min_max[0] = $roundup;
						}

						// Min value for sale OR rent properties.
						if ( $roundup < $min_max[ $min_index ] && false === $force_values[ $min_index ] ) {
							$min_max[ $min_index ] = $roundup;
						}

						// Unrelated max value.
						if ( $roundup > $min_max[1] && false === $force_values[1] ) {
							$min_max[1] = $roundup;
						}

						// Max value for sale OR rent properties.
						if ( $roundup > $min_max[ $max_index ] && false === $force_values[ $max_index ] ) {
							$min_max[ $max_index ] = $roundup;
						}
					}
				}
			}

			$cnt += 2;
		}

		return $min_max;
	} // get_primary_price_min_max

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

} // API
