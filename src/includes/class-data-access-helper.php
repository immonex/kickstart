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
	 * Constructor
	 *
	 * @since 1.0.0
	 *
	 * @param mixed[] $plugin_options Plugin options.
	 * @param mixed[] $bootstrap_data Bootstrap data.
	 */
	public function __construct( $plugin_options, $bootstrap_data ) {
		$this->plugin_options = $plugin_options;
		$this->bootstrap_data = $bootstrap_data;
	} // __construct

	/**
	 * Retrieve custom field contents.
	 *
	 * @since 1.0.0
	 *
	 * @param string|bool $type "name" if the custom field name containing the
	 *                          actual value is stored in another custom field
	 *                          named as the following param.
	 * @param string      $key_or_name Custom field key (= field contains the actual
	 *                                 value) or name (= field contains the "real"
	 *                                 field name).
	 * @param int|string  $post_id Related post ID.
	 * @param bool        $value_only Return value only? (false by default).
	 *
	 * @return mixed[]|string|int Array of field data or value only.
	 */
	public function get_custom_field_by( $type, $key_or_name, $post_id, $value_only = false ) {
		if ( empty( $type ) ) {
			$type = 'name';
		}
		if ( 'name' === $type ) {
			$meta_key = get_post_meta( $post_id, $key_or_name, true );
		} else {
			$meta_key = $key_or_name;
		}
		if ( ! $meta_key ) {
			return false;
		}

		$value = get_post_meta( $post_id, $meta_key, true );
		if ( ! $value ) {
			return false;
		}

		if ( $value_only ) {
			return $value;
		}

		$meta = get_post_meta( $post_id, '_' . $meta_key, true );
		if ( ! is_array( $meta ) && ! is_wp_error( $meta ) ) {
			$meta = array( 'meta' => $meta );
		}

		return array_merge(
			array( 'value' => $value ),
			$meta
		);
	} // get_custom_field_by

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
	 * Retrieve and return "grouped" property details (serialized custom field data).
	 *
	 * @since 1.1.0
	 *
	 * @param int|string $post_id Property Post ID to fetch detail data for.
	 * @param string[]   $exclude List of mapping names or sources to exclude (optional).
	 *
	 * @return mixed[] Grouped property details.
	 */
	public function fetch_property_details( $post_id, $exclude = array() ) {
		$details = get_post_meta( $post_id, '_' . $this->bootstrap_data['plugin_prefix'] . 'details', true );
		if ( ! $details ) {
			return array();
		}

		$grouped_details = array();
		if ( count( $details ) > 0 ) {
			foreach ( $details as $title => $detail ) {
				if ( is_array( $exclude ) && ! empty( $exclude ) ) {
					$detail_mapping_source = '';
					if ( ! empty( $detail['meta_json'] ) ) {
						$detail_meta = json_decode( $detail['meta_json'], true );
						if ( ! empty( $detail_meta['mapping_source'] ) ) {
							$detail_mapping_source = $detail_meta['mapping_source'];
						}
					}

					if (
						( $detail_mapping_source && in_array( $detail_mapping_source, $exclude, true ) )
						|| ( $detail['name'] && in_array( $detail['name'], $exclude, true ) )
					) {
						// Skip excluded detail.
						continue;
					}
				}

				$grouped_details[ $detail['group'] ? $detail['group'] : 'ungruppiert' ][] = array_merge(
					array( 'title' => $title ),
					$detail
				);
			}
		}

		return $grouped_details;
	} // fetch_property_details

	/**
	 * Return a specific item out of a property details array.
	 *
	 * @since 1.0.0
	 *
	 * @param mixed[]     $details Full array of property details.
	 * @param string      $name Name of item to retrieve.
	 * @param string|bool $group Name of item group (optional).
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
	 * Return a specific group of items out of a property details array.
	 *
	 * @since 1.0.0
	 *
	 * @param mixed[]  $details Full array of property details.
	 * @param string[] $groups List of item group names (optional).
	 *
	 * @return mixed[] Group items.
	 */
	public function get_group_items( $details, $groups = array( 'ungruppiert' ) ) {
		if ( ! is_array( $groups ) || empty( $groups ) ) {
			$groups = array( 'ungruppiert' );
		}

		$items = array();

		foreach ( $groups as $group ) {
			if (
				isset( $details[ $group ] ) &&
				count( $details[ $group ] ) > 0
			) {
				foreach ( $details[ $group ] as $item_details ) {
					$items[] = array_merge(
						array(
							'group' => $group,
						),
						$item_details
					);
				}
			}
		}

		return $items;
	} // get_group_items

	/**
	 * Check and (maybe) convert a comma-separated list string to an array.
	 *
	 * @since 1.1.3b
	 *
	 * @param string $list List string to check/convert.
	 *
	 * @return string[]|string Possibly converte.
	 */
	public function maybe_convert_list_string( $list ) {
		if (
			! is_string( $list ) ||
			empty( $list )
		) {
			return $list;
		}

		if ( preg_match( '/^\(.*\)$/', $list ) ) {
			// Convert lists (item 1, item 2, item 3...).
			$list = array_map( 'trim', explode( ',', substr( $list, 1, -1 ) ) );
		}

		if ( is_string( $list ) ) {
			// Convert comma-separated single values (numbers, slugs).
			if ( preg_match( '/^([0-9a-zA-ZäöüÄÖÜß\-_\.]+,[ ]?){1,}([0-9a-zA-ZäöüÄÖÜß\-_\.]+)?$/', trim( $list ) ) ) {
				$list = array_map( 'trim', explode( ',', trim( $list ) ) );
			}
		}

		return $list;
	} // maybe_convert_list_string

	/**
	 * Retrieve and return the (possibly converted) value of the given
	 * query variable.
	 *
	 * @since 1.0.0
	 *
	 * @param string         $var_name Variable name.
	 * @param \WP_Query|bool $query WP query object (optional).
	 * @param mixed          $default Default value (optional).
	 * @param bool           $convert_list_strings List string conversion flag (optional, true by default).
	 *
	 * @return mixed[]|string Variable value, if existent.
	 */
	public function get_query_var_value( $var_name, $query = false, $default = false, $convert_list_strings = true ) {
		$value = $default;

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
		} elseif ( ! empty( $_GET[ $var_name ] ) ) {
			// Get value from GET query variables (possibly override query object values).
			// @codingStandardsIgnoreLine
			$temp_value = $this->sanitize_query_var_value( wp_unslash( $_GET[ $var_name ] ) );
		} elseif ( is_page() ) {
			$temp_value = get_post_meta( get_the_ID(), $var_name );
		}

		if ( empty( $temp_value ) ) {
			$temp_value = get_query_var( $var_name, false );
		}

		if ( false !== $temp_value ) {
			$value = $temp_value;
			if ( $query ) {
				$query->set( $var_name, $value );
			}
		}

		if ( $convert_list_strings ) {
			// Convert string lists/comma-separated single values to arrays.
			$value = $this->maybe_convert_list_string( $value );
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
			return htmlspecialchars( $value, ENT_NOQUOTES );
		} elseif ( is_array( $value ) ) {
			return array_map(
				function ( $value ) {
					if ( json_decode( $value ) ) {
						return $value;
					}

					return htmlspecialchars( $value, ENT_NOQUOTES );
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
	 * @param string $taxonomy Taxonomy to query.
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

} // Data_Access_Helper
