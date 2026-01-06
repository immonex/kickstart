<?php
/**
 * Class Data_Access_Helper
 *
 * @package immonex\Kickstart
 */

namespace immonex\Kickstart;

/**
 * Data access related helper methods.
 */
class Data_Access_Helper {

	/**
	 * Plugin options
	 *
	 * @var mixed[]
	 */
	private $plugin_options;

	/**
	 * Basic "bootstrap" configuration data
	 *
	 * @var mixed[]
	 */
	private $bootstrap_data;

	/**
	 * Helper/Utility objects
	 *
	 * @var object[]
	 */
	private $utils;

	/**
	 * Property data cache
	 *
	 * @var mixed[]
	 */
	private $property_data_cache;

	/**
	 * Constructor
	 *
	 * @since 1.0.0
	 *
	 * @param mixed[]  $plugin_options Plugin options.
	 * @param mixed[]  $bootstrap_data Bootstrap data.
	 * @param object[] $utils          Helper/Utility objects.
	 */
	public function __construct( $plugin_options, $bootstrap_data, $utils ) {
		$this->plugin_options = $plugin_options;
		$this->bootstrap_data = $bootstrap_data;
		$this->utils          = $utils;
	} // __construct

	/**
	 * Retrieve custom field contents by mapping name or meta key.
	 *
	 * @since 1.0.0
	 *
	 * @param string|bool $type        "name" if the custom field name containing the actual value
	 *                                 is stored in another custom field named as the following param,
	 *                                 "meta_key" or "auto" otherwise.
	 * @param string      $key_or_name Custom field key (= field contains the actual
	 *                                 value) or name (= field contains the "real"
	 *                                 field name).
	 * @param int|string  $post_id     Related post ID.
	 * @param bool        $value_only  Return value only? (false by default).
	 *
	 * @return mixed[]|string|int Array of field data or value only.
	 */
	public function get_custom_field_by( $type, $key_or_name, $post_id, $value_only = false ) {
		if ( empty( $type ) || 'auto' === $type ) {
			$type = '_' === $key_or_name[0] ? 'auto_meta_key' : 'auto_name';
		}

		if (
			in_array( $type, array( 'name', 'auto_name' ), true )
			&& isset( $this->property_data_cache[ $post_id ]['by_mapping_name'][ $key_or_name ] )
		) {
			return $value_only ?
				$this->property_data_cache[ $post_id ]['by_mapping_name'][ $key_or_name ]['value'] :
				$this->property_data_cache[ $post_id ]['by_mapping_name'][ $key_or_name ];
		}

		$meta_key = in_array( $type, array( 'name', 'auto_name' ), true ) ?
			get_post_meta( $post_id, $key_or_name, true ) :
			$key_or_name;

		if ( ! $meta_key ) {
			if ( 'auto_name' === $type ) {
				$meta_key = $key_or_name;
				$type     = 'meta_key';
			} else {
				return false;
			}
		}

		if (
			in_array( $type, array( 'meta_key', 'auto_meta_key', 'key' ), true )
			&& isset( $this->property_data_cache[ $post_id ]['by_meta_key'][ $meta_key ] )
		) {
			return $value_only ?
				$this->property_data_cache[ $post_id ]['by_meta_key'][ $meta_key ]['value'] :
				$this->property_data_cache[ $post_id ]['by_meta_key'][ $meta_key ];
		}

		$value = get_post_meta( $post_id, $meta_key, true );
		if ( ! $value ) {
			return false;
		}

		/**
		 * Check coordinate values.
		 */
		if ( '_inx_lat' === $meta_key ) {
			$value = $this->utils['geo']->validate_coords( $value, 'lat' );
		} elseif ( '_inx_lng' === $meta_key ) {
			$value = $this->utils['geo']->validate_coords( $value, 'lng' );
		}

		if ( $value_only ) {
			return $value;
		}

		$meta = get_post_meta( $post_id, '_' . $meta_key, true );
		if ( ! is_array( $meta ) && ! is_wp_error( $meta ) ) {
			$meta = array( 'meta' => $meta );
		}

		$cf_data = array_merge(
			array(
				'value' => $value,
				'name'  => ! empty( $meta['meta_name'] ) ? $meta['meta_name'] : '',
				'title' => ! empty( $meta['mapping_parent'] ) ? $meta['mapping_parent'] : '',
				'group' => ! empty( $meta['meta_group'] ) ? $meta['meta_group'] : '',
			),
			$meta
		);

		$cache_type = in_array( $type, array( 'name', 'auto_name' ), true ) ?
			'by_mapping_name' :
			'by_meta_key';

		$this->property_data_cache[ $post_id ][ $cache_type ][ $meta_key ] = $cf_data;

		return $cf_data;
	} // get_custom_field_by

	/**
	 * Retrieve custom field contents by matching serialized elements.
	 *
	 * @since 1.9.27-beta
	 *
	 * @param int|string $post_id      Property post ID.
	 * @param string     $element_name Element name.
	 * @param mixed[]    $query        Element query data.
	 *
	 * @return mixed[] Data of matching custom fields.
	 */
	public function get_custom_fields_by_serialized_value( $post_id, $element_name, $query ) {
		global $wpdb;

		$search = $this->get_value_for_serialized_query( $element_name, $query );
		if ( empty( $search ) ) {
			return array();
		}

		// @codingStandardsIgnoreStart
		$sql     = $wpdb->prepare(
			"SELECT * FROM {$wpdb->postmeta} WHERE post_id = %d AND meta_key != %s AND meta_value {$search['compare']} %s",
			$post_id,
			'_inx_details',
			$search['value']
		);
		$results = $wpdb->get_results( $sql, ARRAY_A );
		// @codingStandardsIgnoreEnd

		if ( empty( $results ) ) {
			return array();
		}

		$cf_data = array();

		foreach ( $results as $result ) {
			if ( empty( $result['meta_value'] ) ) {
				continue;
			}

			// @codingStandardsIgnoreLine
			$meta = @unserialize( $result['meta_value'] );
			if ( empty( $meta ) ) {
				continue;
			}

			$cf_data[] = array_merge(
				array(
					'value' => ! empty( $meta['meta_value'] ) ? $meta['meta_value'] : '',
					'name'  => ! empty( $meta['meta_name'] ) ? $meta['meta_name'] : '',
					'title' => ! empty( $meta['mapping_parent'] ) ? $meta['mapping_parent'] : '',
					'group' => ! empty( $meta['meta_group'] ) ? $meta['meta_group'] : '',
				),
				$meta
			);
		}

		return $cf_data;
	} // get_custom_fields_by_serialized_value

	/**
	 * Convert a comma-separated group string to an array.
	 *
	 * @since 1.0.0
	 *
	 * @param string $group_string Comma separated string of group names.
	 *
	 * @return string[] Group names.
	 */
	public function convert_to_group_array( $group_string ) {
		if ( is_array( $group_string ) ) {
			return $group_string;
		}

		return array_map( 'trim', explode( ',', $group_string ) );
	} // convert_to_group_array

	/**
	 * Retrieve and return property details (serialized custom field data), either
	 * "flat" or as sub-arrays with the respective item group (mapping table) as
	 * key.
	 *
	 * @since 1.1.0
	 *
	 * @param int|string $post_id Property Post ID to fetch detail data for.
	 * @param string[]   $exclude List of mapping names or sources to be excluded (optional).
	 * @param bool       $grouped Return as "grouped sub-arrays" (true by default).
	 *
	 * @return mixed[] Property details.
	 */
	public function fetch_property_details( $post_id, $exclude = array(), $grouped = true ) {
		if ( isset( $this->property_data_cache[ $post_id ]['details'] ) ) {
			$details = $this->property_data_cache[ $post_id ]['details'];
		} else {
			$details = get_post_meta( $post_id, '_' . $this->bootstrap_data['plugin_prefix'] . 'details', true );
			$this->property_data_cache[ $post_id ]['details'] = $details;
		}

		if ( empty( $details ) ) {
			return array();
		}

		if ( ! empty( $exclude ) ) {
			$exclude_ext = array( 'exclude' => array() );

			foreach ( $exclude as $exclude_string ) {
				$exclude_string = str_replace( '*', '\*', $exclude_string );

				$exclude_ext['exclude'][]['regex_value'] = "/{$exclude_string}/";
			}

			$details = $this->filter_detail_items( $details, $exclude_ext, array( 'name', 'source' ) );
		}

		if ( ! $grouped ) {
			return $details;
		}

		$grouped_details = array();
		foreach ( $details as $title => $detail ) {
			$grouped_details[ ! empty( $detail['group'] ) ? $detail['group'] : 'ungruppiert' ][] = array_merge(
				array( 'title' => $title ),
				$detail
			);
		}

		return $grouped_details;
	} // fetch_property_details

	/**
	 * Perform a "flexible" (and optionally fuzzy) search for property detail
	 * elements (collection field) and other related custom fields by mapping name,
	 * group, source or meta key (filter callback).
	 *
	 * @since 1.9.27-beta
	 *
	 * @param mixed[]         $items   Empty array.
	 * @param string[]        $queries Search strings, examples:
	 *                                    - "foobar": Include elements containing "foobar".
	 *                                    - "-foobar": Exclude elements containing "foobar".
	 *                                    - "/foo(bar)?/": RegEx-based search (include).
	 *                                    - "-/foo(bar)?/": RegEx-based search (exclude).
	 * @param string[]|bool   $scope    Mapping columns to query: name, group, source (optional, false = all).
	 * @param int|string|bool $post_id  Property post ID (optional).
	 *
	 * @return mixed[] Matching property details.
	 */
	public function get_flex_items( $items, $queries, $scope = false, $post_id = false ) {
		if ( empty( $queries ) ) {
			return array();
		}

		if ( ! empty( $scope ) && ! is_array( $scope ) ) {
			$scope = array( $scope );
		}

		if ( ! $post_id ) {
			$post_id = apply_filters( 'inx_current_property_post_id', 0 );
		}

		if ( ! $post_id ) {
			return array();
		}

		$items         = array();
		$split_queries = $this->split_detail_query_strings( $queries );

		// Fetch grouped property details (custom field _inx_details) first.
		$property_details = $this->fetch_property_details( $post_id, array(), false );

		foreach ( $split_queries['include'] as $query ) {
			if ( ! empty( $property_details ) ) {
				/**
				 * Filter and add matching grouped property details.
				 */

				$property_details_part = $this->extend_and_format_detail_items(
					$this->filter_detail_items( $property_details, array( 'include' => array( $query ) ), $scope ),
					$query['props']
				);

				if ( ! empty( $property_details_part ) ) {
					$items = array_merge( $items, $property_details_part );
				}
			}

			if ( empty( $scope ) || ( is_array( $scope ) && in_array( 'name', $scope, true ) ) ) {
				/**
				 * Add details stored in separate custom fields with either matching
				 * mapping name or meta key.
				 */

				$meta = $this->get_custom_field_by( false, $query['value'], $post_id );
				if ( ! empty( $meta ) ) {
					$meta  = $this->extend_and_format_detail_items( array( $meta ), $query['props'] );
					$items = array_merge( $items, $meta );
				}
			}

			$search_elements = array();

			if ( empty( $scope ) ) {
				$search_elements = array( 'meta_name', 'meta_group', 'mapping_source' );
			} else {
				if ( in_array( 'name', $scope, true ) ) {
					$search_elements[] = 'meta_name';
				}

				if ( in_array( 'group', $scope, true ) ) {
					$search_elements[] = 'meta_group';
				}

				if ( in_array( 'source', $scope, true ) ) {
					$search_elements[] = 'mapping_source';
				}
			}

			if ( empty( $search_elements ) ) {
				continue;
			}

			/**
			 * Add custom field elements with matching groups and/or mapping sources.
			 *
			 * Only the meta data fields of custom fields with single values should
			 * be queried, hence "meta_group" instead of "group". (The latter one is
			 * used in the serialized data of the collection field _inx_details.)
			 */
			foreach ( $search_elements as $search_element ) {
				$meta = $this->get_custom_fields_by_serialized_value( $post_id, $search_element, $query );
				if ( empty( $meta ) ) {
					continue;
				}

				$meta = $this->extend_and_format_detail_items(
					$this->filter_detail_items( $meta, $split_queries, $scope ),
					$query['props']
				);

				if ( empty( $meta ) ) {
					continue;
				}

				$items = array_merge( $items, $meta );
			}
		}

		return $this->unique_detail_items( $items );
	} // get_flex_items

	/**
	 * Filter (include/exclude) property detail items based on the specified
	 * query string(s) (incl. optional RegEx) and scope.
	 *
	 * @since 1.9.27-beta
	 *
	 * @param mixed[]              $items   Detail items to filter.
	 * @param mixed[]              $queries Split/Grouped comparison strings and related data.
	 * @param string|string[]|bool $scope   Scope of detail elements to consider when filtering:
	 *                                      "name", "group" and (mapping) "source" as array or
	 *                                      comma-separated single string (optional, all
	 *                                      elements by default).
	 *
	 * @return mixed[] Filtered array of detail items.
	 */
	public function filter_detail_items( $items, $queries, $scope = array( 'name', 'group', 'source' ) ) {
		if ( empty( $items ) || ! is_array( $items ) ) {
			return array();
		}

		if ( empty( $scope ) ) {
			$scope = array( 'name', 'group', 'source' );
		}

		if ( empty( $queries ) ) {
			return $items;
		}

		if ( isset( $queries[0] ) && is_string( $queries[0] ) ) {
			$queries = $this->split_detail_query_strings( $queries );
		}

		if ( ! is_array( $scope ) ) {
			$scope = array_map( 'trim', explode( ',', (string) $scope ) );
		}

		$filtered_items = array();

		foreach ( $items as $item ) {
			if ( in_array( 'name', $scope, true ) ) {
				if ( ! empty( $queries['exclude'] ) ) {
					foreach ( $queries['exclude'] as $query ) {
						$has_name = $this->detail_has_name( $item, $query['regex_value'] );

						if ( $has_name ) {
							continue 2;
						}
					}
				}

				if ( ! empty( $queries['include'] ) ) {
					foreach ( $queries['include'] as $query ) {
						$has_name = $this->detail_has_name( $item, $query['regex_value'] );

						if ( $has_name ) {
							$filtered_items[] = $item;
							continue 2;
						}
					}
				}
			}

			if ( in_array( 'group', $scope, true ) ) {
				if ( ! empty( $queries['exclude'] ) ) {
					foreach ( $queries['exclude'] as $query ) {
						$has_group = $this->detail_has_group( $item, $query['regex_value'] );

						if ( $has_group ) {
							continue 2;
						}
					}
				}

				if ( ! empty( $queries['include'] ) ) {
					foreach ( $queries['include'] as $query ) {
						$has_group = $this->detail_has_group( $item, $query['regex_value'] );

						if ( $has_group ) {
							$filtered_items[] = $item;
							continue 2;
						}
					}
				}
			}

			if ( in_array( 'source', $scope, true ) ) {
				if ( ! empty( $queries['exclude'] ) ) {
					foreach ( $queries['exclude'] as $query ) {
						$has_mapping_source = $this->detail_has_mapping_source( $item, $query['regex_value'] );

						if ( $has_mapping_source ) {
							continue 2;
						}
					}
				}

				if ( ! empty( $queries['include'] ) ) {
					foreach ( $queries['include'] as $query ) {
						$has_mapping_source = $this->detail_has_mapping_source( $item, $query['regex_value'] );

						if ( $has_mapping_source ) {
							$filtered_items[] = $item;
							continue 2;
						}
					}
				}
			}

			if ( empty( $queries['include'] ) ) {
				$filtered_items[] = $item;
			}
		}

		return $filtered_items;
	} // filter_detail_items

	/**
	 * Return a specific item out of a property details array.
	 *
	 * @since 1.0.0
	 *
	 * @param mixed[]     $details    Full array of property details.
	 * @param string      $name       Name of item to retrieve.
	 * @param string|bool $group      Name of item group (optional).
	 * @param bool        $value_only Return item value only? (false by default).
	 *
	 * @return mixed[]|bool Item data or value only, false if not found.
	 */
	public function get_details_item( $details, $name, $group = false, $value_only = false ) {
		if ( $group ) {
			$groups = is_array( $group ) ? $group : $this->convert_to_group_array( $group );
		} else {
			$groups = array_keys( $details );
		}

		$group_items = $this->get_group_items( $details, $groups );

		if ( count( $group_items ) > 0 ) {
			foreach ( $group_items as $item ) {
				if ( $item['name'] === $name ) {
					return $value_only ? $item['value'] : $item;
				}
			}
		}

		return false;
	} // get_details_item

	/**
	 * Return all items of the specified groups out of a full property details
	 * set as a flat array.
	 *
	 * @since 1.0.0
	 *
	 * @param mixed[]  $details Full grouped array of property details
	 *                          (group name => group items sub array respectively).
	 * @param string[] $groups  List of item group names (optional).
	 *
	 * @return mixed[] Group items.
	 */
	public function get_group_items( $details, $groups = array( 'ungruppiert' ) ) {
		if ( ! is_array( $groups ) || empty( $groups ) ) {
			$groups = array( 'ungruppiert' );
		}

		if ( empty( $details ) ) {
			$details = $this->fetch_property_details( apply_filters( 'inx_current_property_post_id', 0 ) );
		}

		$items = array();

		foreach ( $groups as $group ) {
			if ( ! empty( $details[ $group ] ) ) {
				$items = array_merge( $items, $details[ $group ] );
			}
		}

		return $items;
	} // get_group_items

	/**
	 * Retrieve and return the (possibly converted) value of the given
	 * query variable.
	 *
	 * @since 1.0.0
	 *
	 * @param string         $var_name             Variable name.
	 * @param \WP_Query|bool $query                WP query object (optional).
	 * @param mixed          $default_value        Default value (optional).
	 * @param bool           $convert_list_strings List string conversion flag (optional, true by default).
	 *
	 * @return mixed[]|string Variable value, if existent.
	 */
	public function get_query_var_value( $var_name, $query = false, $default_value = false, $convert_list_strings = true ) {
		$value = $default_value;

		// Get value directly from query object.
		if ( $query && isset( $query->query_vars[ $var_name ] ) ) {
			$value = $query->query_vars[ $var_name ];
		}

		$component_instance_data = $query && $query->get( 'inx-cidata' ) ?
			$query->get( 'inx-cidata' ) :
			false;

		if ( empty( $component_instance_data ) && ! empty( $_GET['inx-cidata'] ) ) {
			// @codingStandardsIgnoreLine
			$component_instance_data = json_decode( wp_unslash( $_GET['inx-cidata'] ), true );
		}

		if ( $component_instance_data && ! empty( $component_instance_data[ $var_name ] ) ) {
			// Get value from the rendering data of a related frontend component instance.
			$temp_value = $this->sanitize_query_var_value( $component_instance_data[ $var_name ] );
		} elseif ( isset( $_GET[ $var_name ] ) && '' !== $_GET[ $var_name ] ) {
			// @codingStandardsIgnoreStart
			$temp_raw_value = $_GET[ $var_name ];
			if ( is_array( $temp_raw_value ) ) {
				foreach ( $temp_raw_value as $key => $temp_raw_single_value ) {
					if ( ! is_string( $temp_raw_single_value ) ) {
						continue;
					}

					$temp_raw_value[ $key ] = wp_unslash( strip_tags( $temp_raw_single_value ) );
					if ( false !== strpos( $temp_raw_value[ $key ], '\\' ) ) {
						$temp_raw_value[ $key ] = stripslashes( $temp_raw_value[ $key ] );
					}
				}
			} elseif ( is_string( $temp_raw_value ) ) {
				$temp_raw_value = wp_unslash( strip_tags( $temp_raw_value ) );
				if ( false !== strpos( $temp_raw_value, '\\' ) ) {
					$temp_raw_value = stripslashes( $temp_raw_value );
				}
			}

			// Get value from GET query variables (possibly override query object values).
			$temp_value = $this->sanitize_query_var_value( $temp_raw_value );
			// @codingStandardsIgnoreEnd
		} elseif ( is_page() ) {
			$temp_value = get_post_meta( get_the_ID(), $var_name );
		}

		if ( ! isset( $temp_value ) || in_array( $temp_value, array( '', false, array() ), true ) ) {
			$temp_value = get_query_var( $var_name, false );
		}

		if ( false !== $temp_value ) {
			$value = $temp_value;
			if ( $query ) {
				$query->set( $var_name, $value );
			}
		}

		if ( $convert_list_strings && is_string( $value ) && 'http' !== strtolower( substr( $value, 0, 4 ) ) ) {
			// Convert string lists/comma-separated single values to arrays.
			$value = $this->utils['string']->split_list_string( $value, 'list_or_single' );
		}

		return $value;
	} // get_query_var_value

	/**
	 * Sanitize a query variable value string or array.
	 *
	 * @since 1.6.0
	 *
	 * @param string|string[] $value Query variable value(s).
	 *
	 * @return string|string[] Sanitized value(s).
	 */
	public function sanitize_query_var_value( $value ) {
		if ( is_string( $value ) && json_decode( $value ) ) {
			return $value;
		}

		if ( is_string( $value ) ) {
			$value = htmlspecialchars( $value, ENT_NOQUOTES, false );

			return 'UTF-8' === mb_detect_encoding( $value ) ?
				$value : mb_convert_encoding( $value, 'UTF-8', 'HTML-ENTITIES' );
		} elseif ( is_array( $value ) ) {
			return array_map(
				function ( $value ) {
					if ( json_decode( $value ) ) {
						return $value;
					}

					$value = htmlspecialchars( $value, ENT_NOQUOTES, false );

					return 'UTF-8' === mb_detect_encoding( $value ) ?
						$value : mb_convert_encoding( $value, 'UTF-8', 'HTML-ENTITIES' );
				},
				$value
			);
		}

		return $value;
	} // sanitize_query_var_value

	/**
	 * Perform a low-level taxonomy query and return a list of all terms grouped
	 * by property IDs.
	 *
	 * @since 1.6.20-beta
	 *
	 * @param string $taxonomy    Taxonomy to query.
	 * @param string $return_type Return type (term 'id', 'name', 'slug' or
	 *                            'full' for sub-arrays containing all data).
	 *
	 * @return mixed[] Terms grouped by property ID.
	 */
	public function get_all_terms_grouped_by_property( $taxonomy, $return_type = 'name' ) {
		global $wpdb;

		// @codingStandardsIgnoreLine
		$result = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT p.ID AS post_id, t.term_id AS id, t.name, t.slug FROM $wpdb->posts p
				INNER JOIN $wpdb->term_relationships j1 ON p.ID = j1.object_id
				INNER JOIN $wpdb->term_taxonomy j2 ON j1.term_taxonomy_id = j2.term_taxonomy_id
				INNER JOIN $wpdb->terms t ON j2.term_id = t.term_id
				WHERE p.post_type = %s
				AND p.post_status = %s
				AND j2.taxonomy = %s",
				$this->bootstrap_data['property_post_type_name'],
				'publish',
				$taxonomy
			),
			ARRAY_A
		);

		$property_terms = array();

		if ( ! empty( $result ) ) {
			foreach ( $result as $property_term ) {
				if ( ! isset( $property_terms[ $property_term['post_id'] ] ) ) {
					switch ( $return_type ) {
						case 'name':
						case 'slug':
						case 'id':
							$property_terms[ $property_term['post_id'] ][] = $property_term[ $return_type ];
							break;
						default:
							$property_terms[ $property_term['post_id'] ][] = array(
								'id'   => $property_term['id'],
								'name' => $property_term['name'],
								'slug' => $property_term['slug'],
							);
					}
				}
			}
		}

		return $property_terms;
	} // get_all_terms_grouped_by_property

	/**
	 * Check if the given property detail data contain a name element that matches
	 * the specified string (incl. optional RegEx comparison).
	 *
	 * @since 1.9.27-beta
	 *
	 * @param mixed[] $item Property detail item data.
	 * @param string  $name Mapping element name.
	 *
	 * @return bool True if a name array element exists and matches the comparison name.
	 */
	private function detail_has_name( $item, $name ) {
		if ( empty( $item['name'] ) ) {
			return false;
		}

		return $this->utils['string']->ext_compare( $name, $item['name'] );
	} // detail_has_name

	/**
	 * Check if the given property detail data belongs to the specified group
	 * (incl. optional RegEx comparison).
	 *
	 * @since 1.9.27-beta
	 *
	 * @param mixed[] $item  Property detail item data.
	 * @param string  $group Group name.
	 *
	 * @return bool True if a group array element exists and matches the comparison group.
	 */
	private function detail_has_group( $item, $group ) {
		if ( empty( $item['group'] ) ) {
			return false;
		}

		return $this->utils['string']->ext_compare( $group, $item['group'] );
	} // detail_has_group

	/**
	 * Check if the given property detail data contain a mapping source and
	 * compare it with the specified string (incl. optional RegEx comparison).
	 *
	 * @since 1.9.27-beta
	 *
	 * @param mixed[] $item           Property detail item data.
	 * @param string  $compare_source Mapping source string for comparison.
	 *
	 * @return bool True if a mapping source exists and matches the comparison string.
	 */
	private function detail_has_mapping_source( $item, $compare_source ) {
		$mapping_source = $this->get_detail_mapping_source( $item );

		if ( ! $mapping_source ) {
			return false;
		}

		return $this->utils['string']->ext_compare( $compare_source, $mapping_source );
	} // detail_has_mapping_source

	/**
	 * Check if the meta data of a property detail item contain a mapping
	 * source reference and return it if so.
	 *
	 * @since 1.9.22-beta
	 *
	 * @param mixed[] $item Property detail item data.
	 *
	 * @return string Mapping source reference or empty string if unavailable.
	 */
	private function get_detail_mapping_source( $item ) {
		if ( empty( $item['mapping_source'] ) && empty( $item['meta_json'] ) ) {
			return '';
		}

		if ( ! empty( $item['mapping_source'] ) ) {
			return $item['mapping_source'];
		}

		$meta = json_decode( $item['meta_json'], true );

		return ! empty( $meta['mapping_source'] ) ? $meta['mapping_source'] : '';
	} // get_detail_mapping_source

	/**
	 * Generate an WHERE clause fragment string for retrieving serialized data
	 * with low-level SQL queries.
	 *
	 * @since 1.9.27-beta
	 *
	 * @param string  $key   Element key.
	 * @param mixed[] $query Element query data (value may include RegEx or % placeholder).
	 *
	 * @return string[] Associative array containing the generated value and
	 *                  the related compare type.
	 */
	private function get_value_for_serialized_query( $key, $query ) {
		if ( empty( $query ) ) {
			return '';
		}

		$query_value = wp_sprintf(
			's:%1$d:"%2$s";s:%3$s:"%4$s"',
			strlen( $key ),
			$key,
			$query['is_regex'] ? '[0-9]+' : strlen( $query['value'] ),
			$query['value']
		);

		return array(
			'value'   => $query['is_regex'] ? $query_value : "%{$query_value}%",
			'compare' => $query['is_regex'] ? 'REGEXP' : 'LIKE',
		);
	} // get_value_for_serialized_query

	/**
	 * Split detail query strings into individual elements and prepare them for
	 * further processing.
	 *
	 * @since 1.9.27-beta
	 *
	 * @param string[]|string $queries Query string(s) to split.
	 *
	 * @return mixed[] Split query string data.
	 */
	private function split_detail_query_strings( $queries ) {
		if ( empty( $queries ) ) {
			return array();
		}

		if ( ! is_array( $queries ) ) {
			$queries = array_filter( array_map( 'trim', preg_split( '/,(?![^(]+\))/', (string) $queries ) ) );
		}

		$split = array(
			'all'     => array(),
			'include' => array(),
			'exclude' => array(),
		);

		foreach ( $queries as $query_string ) {
			$current = array(
				'value'       => $query_string,
				'regex_value' => $query_string,
				'org_value'   => $query_string,
				'exclude'     => false,
				'is_regex'    => false,
				'props'       => array(),
			);

			$props_start_pos = strpos( $query_string, '|' );
			if ( false !== $props_start_pos ) {
				$prop_chain             = substr( $query_string, $props_start_pos + 1 );
				$current['props']       = $this->split_detail_query_string_props( $prop_chain );
				$query_string           = substr( $query_string, 0, $props_start_pos );
				$current['regex_value'] = $query_string;
				$current['org_value']   = $query_string;
			}

			if ( '-' === $query_string[0] ) {
				$current['exclude']     = true;
				$query_string           = substr( $query_string, 1 );
				$current['regex_value'] = $query_string;
			}

			if ( '/' === $query_string[0] ) {
				$trim_chars = " /\n\r\t\v\x00";
				// @codingStandardsIgnoreLine
				$current['is_regex'] = @preg_match( $query_string, '' ) !== false;

				if ( $current['is_regex'] ) {
					$query_string = trim( $query_string, $trim_chars );
				}
			} elseif ( false !== strpos( $query_string, '%' ) ) {
				$value_temp = str_replace( '%', '[a-zA-Z._-]{0,}', $query_string );
				// @codingStandardsIgnoreLine
				$current['is_regex'] = @preg_match( "/{$value_temp}/", '' ) !== false;

				if ( $current['is_regex'] ) {
					$query_string           = $value_temp;
					$current['regex_value'] = "/{$value_temp}/";
				}
			}

			$current['value'] = $query_string;

			$split['all'][] = $current;
			if ( $current['exclude'] ) {
				$split['exclude'][] = $current;
			} else {
				$split['include'][] = $current;
			}
		}

		return $split;
	} // split_detail_query_strings

	/**
	 * Split a detail query "chain string" of additional properties (e.g. format filters).
	 *
	 * @since 1.9.27-beta
	 *
	 * @param string $chain_string Chain string.
	 *
	 * @return mixed[] Split property/argument data.
	 */
	private function split_detail_query_string_props( $chain_string ) {
		$props = array();
		$raw   = array_map( 'trim', explode( '|', $chain_string ) );

		if ( empty( $raw ) ) {
			return array();
		}

		foreach ( $raw as $prop_string ) {
			$prop = $this->utils['string']->split_key_args_value( $prop_string );

			if ( false !== $prop ) {
				$props[ $prop['key'] ] = $prop;
			}
		}

		return $props;
	} // split_detail_query_string_props

	/**
	 * Extend and format detail item values according to the specified query properties.
	 *
	 * @since 1.9.27-beta
	 *
	 * @param mixed[] $items       Detail items.
	 * @param mixed[] $query_props Query properties.
	 *
	 * @return mixed[] Possibly extended detail items.
	 */
	private function extend_and_format_detail_items( $items, $query_props ) {
		if ( empty( $items ) ) {
			return array();
		}

		foreach ( $items as $i => $item ) {
			if ( empty( $query_props ) ) {
				continue;
			}

			foreach ( $query_props as $prop_name => $prop ) {
				if ( 'inx_format_' === substr( $prop_name, 0, 11 ) ) {
					$items[ $i ]['value'] = apply_filters(
						'inx_format',
						$items[ $i ]['value'],
						substr( $prop_name, 11 ),
						$prop['args']
					);
					continue;
				}

				switch ( $prop_name ) {
					case 'before_value':
						$items[ $i ]['value'] = $prop['value'] . ' ' . $items[ $i ]['value'];
						break;
					case 'after_value':
						$items[ $i ]['value'] .= ' ' . $prop['value'];
						break;
				}
			}

			$items[ $i ] = array_merge( $items[ $i ], $query_props );
		}

		return $items;
	} // extend_and_format_detail_items

	/**
	 * Remove duplicate detail items based on title and value.
	 *
	 * @since 1.11.9-beta
	 *
	 * @param mixed[] $items Original detail item array.
	 *
	 * @return mixed[] Array with unique elements.
	 */
	private function unique_detail_items( $items ) {
		if ( empty( $items ) ) {
			return array();
		}

		$unique_items = array( $items[0] );

		foreach ( $items as $i => $item ) {
			if ( 0 === $i ) {
				continue;
			}

			foreach ( $unique_items as $unique_item ) {
				if (
					( empty( $item['title'] ) || $item['title'] === $unique_item['title'] )
					&& (string) $item['value'] === (string) $unique_item['value']
				) {
					continue 2;
				}
			}

			$unique_items[] = $item;
		}

		return $unique_items;
	} // unique_detail_items

} // Data_Access_Helper
