<?php
/**
 * Class Property_Search
 *
 * @package immonex\Kickstart
 */

namespace immonex\Kickstart;

/**
 * Search Form Rendering.
 */
class Property_Search {

	/**
	 * Default property search form template file
	 */
	const DEFAULT_TEMPLATE = 'property-search';

	/**
	 * Default property search form debounce delay
	 */
	const DEFAULT_SEARCH_FORM_DEBOUNCE_DELAY = 600;

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
	 * API object
	 *
	 * @var \immonex\Kickstart\API
	 */
	private $api;

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

		$this->api = new API( $config, $utils );
	} // __construct

	/**
	 * Render the property search form (PHP template).
	 *
	 * @since 1.0.0
	 *
	 * @param string  $template Template file name (without suffix).
	 * @param mixed[] $atts Rendering Attributes.
	 *
	 * @return string Rendered contents (HTML).
	 */
	public function render_form( $template = '', $atts = array() ) {
		global $wp;

		if ( empty( $template ) ) {
			$template = self::DEFAULT_TEMPLATE;
		}

		/**
		 * Check for special GET variables and preserve their values (hidden fields).
		 */
		$preserve_get_vars = $this->config['special_query_vars']();
		if ( ! empty( $_GET ) ) {
			// Add further GET vars.
			foreach ( $_GET as $var_name => $value ) {
				if (
					'' !== $value &&
					'inx-search-' !== substr( $var_name, 0, 11 ) &&
					! isset( $preserve_get_vars[ $var_name ] ) &&
					! in_array( $var_name, array( 'page', 'paged' ), true )
				) {
					$preserve_get_vars[] = $var_name;
				}
			}
		}

		$hidden_fields = array();
		if ( count( $preserve_get_vars ) > 0 ) {
			foreach ( $preserve_get_vars as $var_name ) {
				if ( ! empty( $atts[ $var_name ] ) ) {
					$value = $atts[ $var_name ];
				} else {
					$value = $this->utils['data']->get_query_var_value( $var_name );
				}

				if ( is_array( $value ) ) {
					$value = implode( ',', $value );
				}

				// Exception: inx-sort must always be present for dynamic content updates to work.
				if ( false !== $value || 'inx-sort' === $var_name ) {
					$hidden_fields[ $var_name ] = array(
						'name'  => $var_name,
						'value' => $value,
					);
				}
			}
		}

		if ( ! empty( $atts['elements'] ) ) {
			$attr_element_ids = array_map( 'trim', explode( ',', $atts['elements'] ) );

			if ( ! empty( $attr_element_ids ) ) {
				add_filter(
					'inx_search_form_elements',
					function ( $elements ) use ( $attr_element_ids ) {
						foreach ( $attr_element_ids as $id ) {
							if ( isset( $elements[ $id ] ) ) {
								$elements[ $id ]['enabled'] = true;
								$elements[ $id ]['hidden']  = false;
							}
						}

						return $elements;
					}
				);
			}
		} else {
			$attr_element_ids = false;
		}

		$elements         = array();
		$enabled_elements = $this->get_search_form_elements( true, false, false, $atts );

		if ( count( $enabled_elements ) > 0 ) {
			foreach ( $enabled_elements as $id => $element ) {
				$public_id = $this->get_public_element_id( $id );

				// Prioritize element values submitted as GET param.
				$value = isset( $_GET[ $public_id ] ) ?
					// @codingStandardsIgnoreLine
					$this->utils['data']->sanitize_query_var_value( wp_unslash( $_GET[ $public_id ] ) ) :
					false;

				if ( ! $value && ! empty( $atts[ $public_id ] ) ) {
					// Assign a shortcode attribute value if not set via GET.
					$value = $this->utils['data']->maybe_convert_list_string( $atts[ $public_id ] );
				}

				if ( empty( $element['hidden'] ) ) {
					if ( $value ) {
						$element['value'] = $value;
					}

					$elements[ $id ] = $element;

					if ( isset( $hidden_fields[ $public_id ] ) ) {
						unset( $hidden_fields[ $public_id ] );
					}
				} else {
					if ( ! $value ) {
						$value = $this->utils['data']->get_query_var_value( $public_id );
					}

					if ( $value ) {
						$hidden_fields[ $public_id ] = array(
							'name'  => $public_id,
							'value' => $value,
						);
					}
				}
			}
		}

		if ( count( $elements ) > 0 ) {
			if ( ! empty( $attr_element_ids ) ) {
				$available_element_ids = array_keys( $elements );
				$include_elements      = array();

				foreach ( $attr_element_ids as $id ) {
					$force_extended     = '+' === substr( $id, -1 );
					$force_non_extended = '-' === substr( $id, -1 );
					if ( $force_extended || $force_non_extended ) {
						$id = substr( $id, 0, -1 );
					}

					if ( in_array( $id, $available_element_ids, true ) ) {
						$include_elements[ $id ]          = $elements[ $id ];
						$include_elements[ $id ]['order'] = count( $include_elements );
						if ( $force_extended ) {
							$include_elements[ $id ]['extended'] = true;
						} elseif ( $force_non_extended ) {
							$include_elements[ $id ]['extended'] = false;
						}
					}
				}

				$elements = $include_elements;
			} elseif ( ! empty( $atts['exclude'] ) ) {
				$exclude_element_ids = array_map( 'trim', explode( ',', $atts['exclude'] ) );

				foreach ( $exclude_element_ids as $id ) {
					if ( isset( $elements[ $id ] ) ) {
						unset( $elements[ $id ] );
					}
				}
			}
		}

		if ( count( $enabled_elements ) > 0 ) {
			foreach ( $enabled_elements as $id => $element ) {
				$public_id = $this->get_public_element_id( $id );

				if (
					! isset( $elements[ $id ] )
					&& ! empty( $atts[ $public_id ] )
					&& ! isset( $hidden_fields[ $public_id ] )
				) {
					/**
					 * Preserve the value of an excluded element as hidden field
					 * if it has been set via shortcode attribute.
					 */
					$hidden_fields[ $public_id ] = array(
						'name'  => $public_id,
						'value' => $atts[ $public_id ],
					);
				}

				if ( isset( $elements[ $id ] ) && '-autocomplete' === substr( $element['type'], -13 ) ) {
					if ( ! empty( $atts['autocomplete-countries'] ) ) {
						$elements[ $id ]['countries'] = $atts['autocomplete-countries'];
					}

					if ( 'photon-autocomplete' === $element['type'] ) {
						if ( ! empty( $atts['autocomplete-osm-place-tags'] ) ) {
							$elements[ $id ]['osm_place_tags'] = $atts['autocomplete-osm-place-tags'];
						}

						// DEPRECATED: Convert country codes to name list for Photon-based location autocompletion.
						$elements[ $id ]['country_list'] = $this->get_photon_autocomplete_countries( $elements[ $id ]['countries'] );
					}
				}
			}
		}

		$extended_count = 0;
		if ( count( $elements ) > 0 ) {
			foreach ( $elements as $id => $element ) {
				if ( isset( $element['extended'] ) && $element['extended'] ) {
					$extended_count++;
				}
			}
		}

		/**
		 * Determine the form action URL.
		 */
		$default_action_url = false;
		$form_action        = false;

		if ( ! empty( $atts['results-page-id'] ) ) {
			// Specific page ID given as shortcode parameter: set as form action URL if valid.
			$page_url = get_permalink( (int) $atts['results-page-id'] );
			if ( $page_url ) {
				$form_action = $page_url;
			}
		}

		if ( ! $form_action ) {
			if ( $this->config['property_list_page_id'] ) {
				// Specific page stated as overview page: set as form action URL if valid.
				$page_url = get_permalink( apply_filters( 'inx_element_translation_id', $this->config['property_list_page_id'] ) );
				if ( $page_url ) {
					$default_action_url = $page_url;
				}
			}

			if ( ! $default_action_url ) {
				$default_action_url = get_post_type_archive_link( $this->config['property_post_type_name'] );
			}

			if ( is_front_page() || is_tax() ) {
				// Set default form action URL on front page and taxonomy archive pages.
				$form_action = $default_action_url;
			} else {
				global $post;
				if ( isset( $post ) && has_shortcode( $post->post_content, 'inx-property-list' ) ) {
					// Set current page URL if page contains the property list shortcode.
					$form_action = $this->utils['string']->get_nopaging_url();
				} else {
					$form_action = $default_action_url;
				}
			}
		}

		if ( empty( $atts['dynamic-update'] ) ) {
			$atts['dynamic-update'] = $this->config['property_search_dynamic_update'] ? 'all' : '';
		}

		$template_data = array_merge(
			$this->config,
			$atts,
			array(
				'form_action'    => $form_action,
				'hidden_fields'  => $hidden_fields,
				'elements'       => $elements,
				'extended_count' => $extended_count,
			)
		);

		$template_content = $this->utils['template']->render_php_template( $template, $template_data, $this->utils );

		return $template_content;
	} // render_form

	/**
	 * Render a single search form element.
	 *
	 * @since 1.0.0
	 *
	 * @param string  $id Element ID (key).
	 * @param mixed[] $element Element definition/configuration.
	 * @param mixed[] $atts Rendering Attributes.
	 *
	 * @todo Maybe extend/refine taxonomy term filtering based on special query
	 *       args (references, available, reserved, demo etc.).
	 *
	 * @return string Rendered contents (HTML).
	 */
	public function render_element( $id, $element, $atts = array() ) {
		$plugin_prefix = $this->config['plugin_prefix'];
		$public_prefix = $this->config['public_prefix'];

		if ( count( $element ) > 0 ) {
			// Maybe replace special variables stated in values.
			foreach ( $element as $key => $value ) {
				if ( ! is_string( $value ) ) {
					continue;
				}

				if ( 'primary_price_' === substr( $value, 0, 14 ) ) {
					$primary_price_min_max = $this->api->get_primary_price_min_max();
					switch ( $value ) {
						case 'primary_price_min':
							$element[ $key ] = $primary_price_min_max[0];
							break;
						case 'primary_price_max':
							$element[ $key ] = $primary_price_min_max[1];
							break;
						case 'primary_price_min_max':
							$element[ $key ] = $primary_price_min_max;
							break;
					}
				} elseif ( '_area_min_max' === substr( $value, -13 ) ) {
					$area_type = substr( $value, 0, strlen( $value ) - 13 );
					$area_max  = $this->api->get_area_max( $area_type );
					$min_max   = apply_filters( 'inx_search_form_area_min_max_value', array( 0, $area_max ), $area_type );

					$min_max_str = '0,400';
					if ( is_array( $min_max ) && 2 === count( $min_max ) ) {
						sort( $min_max );
						$min_max_str = ( (int) $min_max[0] ) . ',' . ( (int) $min_max[1] );
					}

					$element[ $key ] = $min_max_str;
					break;
				}
			}
		}

		if ( ! empty( $element['type'] ) ) {
			switch ( $element['type'] ) {
				case 'range':
					if (
						is_string( $element['range'] ) &&
						false !== strpos( $element['range'], ',' )
					) {
						// Convert range string to integer array.
						$element['range'] = array_map( 'intval', explode( ',', $element['range'] ) );
					}
					break;
				case 'tax-select':
				case 'tax-checkbox':
				case 'tax-radio':
					$include = array();
					$args    = array(
						'taxonomy'   => $element['key'],
						'orderby'    => 'name',
						'order'      => 'ASC',
						'hide_empty' => true,
						'include'    => array(),
					);

					$core_taxonomies = array(
						'location',
						'type_of_use',
						'property_type',
						'marketing_type',
						'feature',
					);

					foreach ( $core_taxonomies as $tax ) {
						$force_att = 'force-' . str_replace( '_', '-', $tax );

						if (
							"{$plugin_prefix}{$tax}" === $element['key']
							&& ! empty( $atts[ $force_att ] )
						) {
							$include = $this->get_tax_main_entries_by_slug( "{$plugin_prefix}{$tax}", $atts[ $force_att ] );
						}
					}

					if ( empty( $atts['references'] ) ) {
						$atts['references'] = $this->utils['data']->get_query_var_value( "{$public_prefix}references" );
					}

					$property_meta_query = array();
					$this->add_reference_meta_queries( $property_meta_query, $atts, false );
					$this->add_masters_queries( $property_meta_query, $atts, false );
					$this->add_special_flag_queries( $property_meta_query, $atts, false );
					$this->add_country_query( $property_meta_query, $atts, false );

					if ( ! empty( $property_meta_query ) ) {
						$property_query_args = array(
							'meta_query' => $property_meta_query,
						);
						$args['object_ids']  = $this->api->get_property_ids( false, 'publish', true, $property_query_args );
					} elseif ( ! empty( $include ) ) {
						$args['include'] = $include;
					}

					$options = array();
					$args    = apply_filters( 'inx_search_form_element_tax_args', $args, $id, $element, $atts );
					$terms   = get_terms( $args );

					if ( is_array( $terms ) && ! empty( $terms ) ) {
						$top_level_only = ! empty( $atts['top-level-only'] ) || ! empty( $element['top_level_only'] );

						$terms   = $this->maybe_filter_and_add_ancestor_terms( $terms, $element['key'], $include );
						$options = $this->get_hierarchical_option_list(
							$terms,
							! empty( $element['option_text_source'] ) ? $element['option_text_source'] : false,
							0,
							0,
							$top_level_only
						);

						$top_level_options = array();
						if ( ! empty( $terms ) ) {
							foreach ( $terms as $term ) {
								if ( 0 === $term->parent ) {
									$top_level_options[ $term->slug ] = $term;
								}
							}
						}

						if ( 1 === count( $top_level_options ) ) {
							/**
							 * Exclude "empty" option if only a single regular top level option exists and
							 * set its value as default.
							 */
							$element['empty_option'] = false;
							$element['default']      = array_keys( $top_level_options )[0];
						} elseif ( ! empty( $include ) ) {
							/**
							 * If stated explicitely (force-...), set a comma-separated list string containing
							 * all given taxonomy term slugs as "empty" option value. Otherwise there would be no
							 * taxonomy-based filtering if no option is selected.
							 */
							$element['empty_option_value'] = implode( ',', array_keys( $top_level_options ) );
							if ( empty( $element['default'] ) ) {
								$element['default'] = $element['empty_option_value'];
							}
						}
					}

					$element['options'] = apply_filters( 'inx_search_form_element_tax_options', $options, $id, $element, $atts );
			}
		}

		// Prefixed ID for use as input id/name etc. (except for IDs starting with "inx-").
		$public_id = $this->get_public_element_id( $id );

		if ( ! empty( $element['value'] ) ) {
			$value = $element['value'];
		} else {
			$value = $this->utils['data']->get_query_var_value( $public_id, false, false, ! empty( $element['multiple'] ) );
		}

		if ( ! $value && ! empty( $element['type'] ) && 'tax-' === substr( $element['type'], 0, 4 ) ) {
			$qo = get_queried_object();
			if (
				$qo &&
				'WP_Term' === get_class( $qo ) &&
				isset( $qo->taxonomy ) &&
				$qo->taxonomy === $element['key'] // Element key = taxonomy.
			) {
				// Queried taxonmy matches element taxonomy: Set slug as
				// form element value if not set via GET variable already.
				$value = $qo->slug;
			}
		}

		if ( is_string( $value ) ) {
			// If value is a JSON string, decode it.
			$json = json_decode( stripslashes( $value ) );
			if ( null !== $json ) {
				$value = $json;
			}
		}

		if ( is_array( $value ) && 1 === count( $value ) ) {
			// Convert an array with a single element to a single value.
			$value = $value[0];
		}

		if (
			empty( $value ) &&
			(
				isset( $element['default'] ) &&
				false !== $element['default']
			)
		) {
			if (
				( true === $element['default'] || false !== strpos( $element['type'], 'radio' ) ) &&
				in_array( $element['type'], array( 'select', 'tax-select', 'radio', 'tax-radio' ), true ) &&
				! empty( $element['options'] )
			) {
				$value = array_keys( $element['options'] )[0];
			} else {
				$value = $element['default'];
			}
		}

		$template_data = array_merge(
			$this->config,
			$atts,
			array(
				'element_id'    => $public_id,
				'element_value' => $value,
				'element'       => $element,
			)
		);

		if ( empty( $atts['template'] ) && empty( $element['type'] ) ) {
			return '';
		}

		$template = ! empty( $atts['template'] ) ?
			$atts['template'] :
			'property-search/element-' . $element['type'];

		$template_content = $this->utils['template']->render_php_template( $template, $template_data, $this->utils );

		return $template_content;
	} // render_form

	/**
	 * Convert country code strings to country name lists for Photon-based
	 * location autocompletion.
	 *
	 * @deprecated To be removed in version 2.
	 *
	 * @param string $country_codes Comma-separated Country code list
	 *                              (ISO 3166 ALPHA-2/3).
	 *
	 * @return string Country name list.
	 */
	private function get_photon_autocomplete_countries( $country_codes ) {
		$country_codes_split = explode( ',', $country_codes );
		if ( empty( $country_codes_split ) ) {
			return '';
		}

		$country_names = array();

		foreach ( $country_codes_split as $code ) {
			$country = Geo_Data::get_country_data( $code );
			if ( $country ) {
				$country_names[] = $country['name_en'];
				if (
					! empty( $country['name_de'] )
					&& $country['name_de'] !== $country['name_en']
				) {
					$country_names[] = $country['name_de'];
				}
			}
		}

		return implode( ',', $country_names );
	} // get_photon_autocomplete_countries

	/**
	 * Split a taxonomy slug string and return the related top-level term IDs.
	 *
	 * @since 1.4.1-beta
	 *
	 * @param string $taxonomy    Taxonomy.
	 * @param string $slug_string Comma-separated string of term slugs.
	 *
	 * @return int[] Top-level term IDs.
	 */
	private function get_tax_main_entries_by_slug( $taxonomy, $slug_string ) {
		$slugs    = explode( ',', $slug_string );
		$term_ids = array();

		if ( count( $slugs ) > 0 ) {
			foreach ( $slugs as $raw_slug ) {
				$slug = trim( strtolower( $raw_slug ) );
				$term = get_term_by( 'slug', $slug, $taxonomy );

				if ( $term && 0 === $term->parent ) {
					$term_ids[] = $term->term_id;
				}
			}
		}

		return $term_ids;
	} // get_tax_main_entries_by_slug

	/**
	 * Create and return a name list of custom fields to be browsed on
	 * full-text searches.
	 *
	 * @since 1.0.0
	 *
	 * @return string[] Custom field names.
	 */
	public function get_fulltext_search_fields() {
		$prefix = '_' . $this->config['plugin_prefix'];

		$fields = array(
			"{$prefix}property_title",
			"{$prefix}property_descr",
			"{$prefix}short_descr",
			"{$prefix}location_descr",
			"{$prefix}features_descr",
			"{$prefix}misc_descr",
			"{$prefix}property_id",
			"{$prefix}full_address",
			"{$prefix}street",
		);

		return apply_filters( 'inx_fulltext_search_fields', $fields );
	} // get_fulltext_search_fields

	/**
	 * Create and return an array of available search form elements including
	 * the specific configuration attributes.
	 *
	 * @since 1.0.0
	 *
	 * @param bool    $enabled_only Return only enabled elements? (false by default).
	 * @param bool    $always_include_default_elements Ignore possibly deleted elements? (false by default).
	 * @param bool    $suppress_filters Suppress any filters? (false by default).
	 * @param mixed[] $rendering_atts Rendering attributes (optional).
	 *
	 * @return mixed[] Search form elements.
	 */
	public function get_search_form_elements( $enabled_only = false, $always_include_default_elements = false, $suppress_filters = false, $rendering_atts = array() ) {
		$all_elements = array(
			'description'              => array(
				'enabled'     => true,
				'hidden'      => false,
				'extended'    => false,
				'type'        => 'text',
				'key'         => '',
				'compare'     => 'LIKE',
				'numeric'     => false,
				'label'       => '',
				'placeholder' => __( 'Keyword or Property ID', 'immonex-kickstart' ),
				'class'       => '',
				'order'       => 10,
			),
			'type-of-use'              => array(
				'enabled'      => true,
				'hidden'       => true,
				'extended'     => false,
				'type'         => 'tax-select',
				'key'          => $this->config['plugin_prefix'] . 'type_of_use',
				'compare'      => '=',
				'numeric'      => false,
				'label'        => __( 'Type Of Use', 'immonex-kickstart' ),
				'multiple'     => false,
				'empty_option' => __( 'All Types Of Use', 'immonex-kickstart' ),
				'default'      => '',
				'class'        => '',
				'order'        => 15,
			),
			'property-type'            => array(
				'enabled'            => true,
				'hidden'             => false,
				'extended'           => false,
				'type'               => 'tax-select',
				'key'                => $this->config['plugin_prefix'] . 'property_type',
				'compare'            => '=',
				'numeric'            => false,
				'label'              => __( 'Property Type', 'immonex-kickstart' ),
				'multiple'           => false,
				'top_level_only'     => false,
				'empty_option'       => __( 'All Property Types', 'immonex-kickstart' ),
				'empty_option_value' => '',
				'default'            => '',
				'class'              => '',
				'order'              => 20,
			),
			'marketing-type'           => array(
				'enabled'      => true,
				'hidden'       => false,
				'extended'     => false,
				'type'         => 'tax-select',
				'key'          => $this->config['plugin_prefix'] . 'marketing_type',
				'compare'      => '=',
				'numeric'      => false,
				'label'        => __( 'Marketing Type', 'immonex-kickstart' ),
				'multiple'     => false,
				'empty_option' => isset( $rendering_atts['inx-references'] ) && 'only' === $rendering_atts['inx-references'] ?
					__( 'Sold / Rented', 'immonex-kickstart' ) :
					__( 'For Sale / For Rent', 'immonex-kickstart' ),
				'default'      => '',
				'class'        => '',
				'order'        => 30,
			),
			'locality'                 => array(
				'enabled'      => true,
				'hidden'       => false,
				'extended'     => false,
				'type'         => 'tax-select',
				'key'          => $this->config['plugin_prefix'] . 'location',
				'compare'      => '=',
				'numeric'      => false,
				'label'        => __( 'Locality', 'immonex-kickstart' ),
				'multiple'     => false,
				'empty_option' => __( 'All Localities', 'immonex-kickstart' ),
				'default'      => '',
				'class'        => '',
				'order'        => 40,
			),
			'project'                  => array(
				'enabled'            => true,
				'hidden'             => true,
				'extended'           => false,
				'type'               => 'tax-select',
				'key'                => $this->config['plugin_prefix'] . 'project',
				'compare'            => '=',
				'numeric'            => false,
				'label'              => __( 'Project', 'immonex-kickstart' ),
				'empty_option'       => __( 'All Projects', 'immonex-kickstart' ),
				'option_text_source' => 'description',
				'default'            => '',
				'class'              => '',
				'order'              => 45,
			),
			'min-rooms'                => array(
				'enabled'      => true,
				'hidden'       => false,
				'extended'     => false,
				'type'         => 'range',
				'key'          => '_' . $this->config['plugin_prefix'] . 'primary_rooms',
				'compare'      => '>=',
				'range'        => '0,10',
				'step_ranges'  => false,
				'default'      => 0,
				'replace_null' => __( 'not specified', 'immonex-kickstart' ),
				'unit'         => false,
				'currency'     => false,
				'numeric'      => true,
				'label'        => __( 'Min. Rooms', 'immonex-kickstart' ),
				'class'        => '',
				'order'        => 50,
			),
			'min-area'                 => array(
				'enabled'      => true,
				'hidden'       => false,
				'extended'     => false,
				'type'         => 'range',
				'key'          => '_' . $this->config['plugin_prefix'] . 'living_area',
				'compare'      => '>=',
				'range'        => 'living_area_min_max',
				'step_ranges'  => false,
				'default'      => 0,
				'replace_null' => __( 'not specified', 'immonex-kickstart' ),
				'unit'         => $this->config['area_unit'],
				'currency'     => false,
				'numeric'      => true,
				'label'        => __( 'Min. Living Area', 'immonex-kickstart' ),
				'class'        => '',
				'order'        => 60,
			),
			'price-range'              => array(
				'enabled'        => true,
				'hidden'         => false,
				'extended'       => false,
				'type'           => 'range',
				'key'            => '_' . $this->config['plugin_prefix'] . 'primary_price',
				'compare'        => 'BETWEEN',
				'range'          => 'primary_price_min_max',
				'step_ranges'    => false,
				'default'        => 'primary_price_min_max',
				'unlimited_term' => __( 'unlimited', 'immonex-kickstart' ),
				'currency'       => $this->config['currency'],
				'numeric'        => true,
				'label'          => __( 'Price Range', 'immonex-kickstart' ),
				'class'          => '',
				'order'          => 70,
			),
			'submit'                   => array(
				'enabled'  => true,
				'hidden'   => false,
				'extended' => false,
				'type'     => 'submit',
				'key'      => '',
				'compare'  => '',
				'numeric'  => false,
				'label'    => __( 'Show', 'immonex-kickstart' ),
				'class'    => 'inx-property-search__element--is-last-grid-col',
				'order'    => 80,
			),
			'reset'                    => array(
				'enabled'  => true,
				'hidden'   => false,
				'extended' => false,
				'type'     => 'reset',
				'key'      => '',
				'compare'  => '',
				'numeric'  => false,
				'label'    => __( 'Reset Search Form', 'immonex-kickstart' ),
				'class'    => 'inx-property-search__element--is-full-width',
				'order'    => 90,
			),
			'toggle-extended'          => array(
				'enabled'  => true,
				'hidden'   => false,
				'extended' => false,
				'type'     => 'extended-search-toggle',
				'key'      => '',
				'compare'  => '',
				'numeric'  => false,
				'label'    => __( 'Extended and Distance Search', 'immonex-kickstart' ),
				'class'    => 'inx-property-search__element--is-full-width',
				'order'    => 100,
			),
			'distance-search-location' => array(
				'enabled'        => $this->config['distance_search_autocomplete_type'] ? true : false,
				'hidden'         => false,
				'extended'       => true,
				'type'           => $this->config['distance_search_autocomplete_type'] ? $this->config['distance_search_autocomplete_type'] . '-autocomplete' : '',
				'key'            => 'distance_search_location',
				'compare'        => '=',
				'numeric'        => false,
				'label'          => __( 'Distance Search', 'immonex-kickstart' ),
				'placeholder'    => __( 'Locality Name (Distance Search)', 'immonex-kickstart' ),
				'no_options'     => __( 'Type to search...', 'immonex-kickstart' ),
				'no_results'     => __( 'No matching localities found.', 'immonex-kickstart' ),
				'countries'      => 'google-places' === $this->config['distance_search_autocomplete_type'] ?
					'de,at,ch,be,nl' : 'de,at,ch,lu,be,fr,nl,dk,pl,es,pt,it,gr',
				'osm_place_tags' => 'city,town,village,borough,suburb',
				'class'          => 'inx-property-search__element--is-first-grid-col',
				'order'          => 200,
			),
			'distance-search-radius'   => array(
				'enabled'      => $this->config['distance_search_autocomplete_type'] ? true : false,
				'hidden'       => false,
				'extended'     => true,
				'type'         => 'select',
				'key'          => 'distance_search_radius',
				'compare'      => '<=',
				'numeric'      => true,
				'label'        => __( 'Distance Search Radius', 'immonex-kickstart' ),
				'options'      => array(
					5   => '5 km',
					10  => '10 km',
					25  => '25 km',
					50  => '50 km',
					100 => '100 km',
				),
				'empty_option' => __( 'Radius (km)', 'immonex-kickstart' ),
				'default'      => '',
				'class'        => '',
				'order'        => 210,
			),
			'features'                 => array(
				'enabled'  => true,
				'hidden'   => false,
				'extended' => true,
				'type'     => 'tax-checkbox',
				'key'      => $this->config['plugin_prefix'] . 'feature',
				'compare'  => 'AND',
				'numeric'  => false,
				'label'    => __( 'Features', 'immonex-kickstart' ),
				'class'    => 'inx-property-search__element--is-full-width',
				'order'    => 220,
			),
			'labels'                   => array(
				'enabled'  => true,
				'hidden'   => true,
				'extended' => true,
				'type'     => 'tax-checkbox',
				'key'      => $this->config['plugin_prefix'] . 'label',
				'compare'  => 'IN',
				'numeric'  => false,
				'label'    => __( 'Labels', 'immonex-kickstart' ),
				'multiple' => true,
				'default'  => '',
				'class'    => 'inx-property-search__element--is-full-width',
				'order'    => 900,
			),
		);

		$elements = $suppress_filters ? $all_elements : apply_filters( 'inx_search_form_elements', $all_elements );

		if ( $always_include_default_elements && $elements !== $all_elements ) {
			foreach ( $all_elements as $key => $atts ) {
				if ( ! isset( $elements[ $key ] ) ) {
					// Reinsert an element previously deleted by a filter function.
					$elements[ $key ] = $atts;
				}
			}
		}

		uasort(
			$elements,
			function( $a, $b ) {
				if ( $a['order'] === $b['order'] ) {
					return 0;
				}
				return ( $a['order'] < $b['order'] ) ? -1 : 1;
			}
		);

		if ( $enabled_only ) {
			$elements = array_filter(
				$elements,
				function( $element ) {
					return isset( $element['enabled'] ) && $element['enabled'];
				}
			);
		}

		return $elements;
	} // get_search_form_elements

	/**
	 * Create and return a list of search related query variables.
	 *
	 * @since 1.0.0
	 *
	 * @return mixed[] Query variables/values.
	 */
	public function get_search_query_vars() {
		$prefix = $this->config['public_prefix'];

		$form_elements = $this->get_search_form_elements( false, true, false );
		if ( ! is_array( $form_elements ) || 0 === count( $form_elements ) ) {
			return array();
		}

		$search_query_vars = array();
		foreach ( $form_elements as $id => $element ) {
			$var_name = "{$prefix}search-{$id}";
			$value    = $this->utils['data']->get_query_var_value( $var_name );

			if ( $value ) {
				if ( is_array( $value ) ) {
					$temp = array();
					if ( count( $value ) > 0 ) {
						foreach ( $value as $key => $element_value ) {
							$temp[ $key ] = stripslashes( html_entity_decode( $element_value, ENT_QUOTES ) );
						}
					}
					$search_query_vars[ $var_name ] = $temp;
				} else {
					$search_query_vars[ $var_name ] = stripslashes( html_entity_decode( $value, ENT_QUOTES ) );
				}
			}
		}

		return $search_query_vars;
	} // get_search_query_vars

	/**
	 * Generate the author query part based on the given user IDs or login names.
	 *
	 * @since 1.0.4
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
	 * Create taxonomy and meta query arrays based on the given parameters.
	 *
	 * @since 1.0.0
	 *
	 * @param mixed[] $params Query parameters.
	 *
	 * @return mixed[] Array with sub-arrays for tax, meta and geo queries.
	 */
	public function get_tax_and_meta_queries( $params ) {
		$prefix = $this->config['public_prefix'];

		$form_elements = $this->get_search_form_elements( false, true, false );
		if ( ! is_array( $form_elements ) || 0 === count( $form_elements ) ) {
			return array(
				'tax_query'  => array(),
				'meta_query' => array(),
			);
		}

		$distance_search = array();
		$tax_query       = array( 'relation' => 'AND' );
		$meta_query      = array( 'relation' => 'AND' );

		foreach ( $form_elements as $id => $element ) {
			$var_name = $prefix . 'search-' . $id;
			if ( empty( $params[ $var_name ] ) ) {
				continue;
			}

			$value = $params[ $var_name ];

			if ( is_string( $value ) ) {
				$json = json_decode( stripslashes( $value ) );
				if ( null !== $json ) {
					$value = $json;
				}
			}

			if ( is_array( $value ) ) {
				if ( count( $value ) > 0 ) {
					$sanitized_value_array = array();
					foreach ( $value as $single_value ) {
						$sanitized_value = sanitize_text_field( $single_value );
						if ( $element['numeric'] ) {
							$sanitized_value = $this->utils['string']->get_float( $sanitized_value );
						}
						$sanitized_value_array[] = $sanitized_value;
					}

					$value = $sanitized_value_array;
				}

				if (
					0 === count( $value ) ||
					( 1 === count( $value ) && '' === $value[0] )
				) {
					continue;
				} elseif ( 1 === count( $value ) ) {
					$value = $value[0];
				}
			} else {
				$value = sanitize_text_field( $value );
				if ( $element['numeric'] ) {
					$value = $this->utils['string']->get_float( $value );
				}
				if ( ! $value ) {
					continue;
				}
			}

			/**
			 * Distance Search
			 */
			if ( 'distance_search_location' === $element['key'] ) {
				if ( isset( $value[0] ) && (float) $value[0] ) {
					$distance_search['lat'] = (float) $value[0];
				}
				if ( isset( $value[1] ) && (float) $value[1] ) {
					$distance_search['lng'] = (float) $value[1];
				}
				if ( isset( $value[2] ) && $value[2] ) {
					$distance_search['location_name'] = $value[2];
				}
				continue;
			} elseif ( 'distance_search_radius' === $element['key'] ) {
				if ( (int) $value > 0 ) {
					$distance_search['radius'] = (int) $value;
				}
				continue;
			}

			switch ( $element['type'] ) {
				case 'google-places-autocomplete':
					break;
				case 'tax-select':
					$operator = isset( $element['compare'] ) &&
						in_array( strtoupper( $element['compare'] ), array( 'IN', 'NOT IN', 'AND', 'EXISTS', 'NOT EXISTS' ), true ) ?
						strtoupper( $element['compare'] ) : 'IN';

					$tax_query[] = array(
						'taxonomy' => $element['key'],
						'field'    => 'slug',
						'operator' => $operator,
						'terms'    => is_array( $value ) ? $value : array( $value ),
					);
					break;
				case 'tax-checkbox':
				case 'tax-radio':
					$operator = isset( $element['compare'] ) &&
						in_array( strtoupper( $element['compare'] ), array( 'IN', 'NOT IN', 'AND', 'EXISTS', 'NOT EXISTS' ), true ) ?
						strtoupper( $element['compare'] ) : 'AND';

					$tax_query[] = array(
						'taxonomy' => $element['key'],
						'field'    => 'slug',
						'operator' => $operator,
						'terms'    => is_array( $value ) ? $value : array( $value ),
					);
					break;
				default:
					if (
						! $element['key'] ||
						'fulltext' === $element['key']
					) {
						// Use specific custom fields for "full-text search".
						$fulltext_search_fields = $this->get_fulltext_search_fields();

						if ( count( $fulltext_search_fields ) > 0 ) {
							$fulltext_fields_subquery = array( 'relation' => 'OR' );
							$temp_value_array         = is_array( $value ) ? $value : array( $value );

							foreach ( $fulltext_search_fields as $meta_key ) {
								foreach ( $temp_value_array as $temp_value ) {
									$fulltext_fields_subquery[] = array(
										'key'     => $meta_key,
										'value'   => $temp_value,
										'compare' => 'LIKE',
									);
								}
							}

							$meta_query[] = $fulltext_fields_subquery;
						}
					} else {
						if ( is_array( $value ) && 2 === count( $value ) ) {
							// Number range given.
							$meta_query[] = array(
								'key'     => $element['key'],
								'value'   => $value,
								'type'    => 'numeric',
								'compare' => 'BETWEEN',
							);
						} elseif ( is_array( $value ) && 4 === count( $value ) ) {
							// Number range including initial min/max values given
							// (ignore if values match initial values).
							if (
								$value[0] !== $value[2] ||
								$value[1] !== $value[3]
							) {
								$meta_query[] = array(
									'key'     => $element['key'],
									'value'   => array( $value[0], $value[1] ),
									'type'    => 'numeric',
									'compare' => 'BETWEEN',
								);
							}
						} else {
							// Single value given (eventually with min/max range).
							if ( is_array( $value ) ) {
								$value = $value[0];
							}

							$meta_query[] = array(
								'key'     => $element['key'],
								'value'   => $value,
								'type'    => isset( $element['numeric'] ) && $element['numeric'] ? 'NUMERIC' : 'CHAR',
								'compare' => isset( $element['compare'] ) && $element['compare'] ? $element['compare'] : '=',
							);
						}
					}
			}
		}

		$this->add_reference_meta_queries( $meta_query, $params, true );
		$this->add_masters_queries( $meta_query, $params, true );
		$this->add_special_flag_queries( $meta_query, $params, true );
		$this->add_country_query( $meta_query, $params, true );

		$geo_query = $this->get_geo_query( $distance_search );

		if ( 1 === count( $tax_query ) ) {
			$tax_query = array();
		}
		if ( 1 === count( $meta_query ) ) {
			$meta_query = array();
		}

		return apply_filters(
			'inx_search_tax_and_meta_queries',
			array(
				'tax_query'  => count( $tax_query ) > 1 ? $tax_query : false,
				'meta_query' => count( $meta_query ) > 1 ? $meta_query : false,
				'geo_query'  => $geo_query,
			),
			$params,
			$prefix
		);
	} // get_tax_and_meta_queries

	/**
	 * Possibly add meta queries related to reference properties.
	 *
	 * @since 1.7.28-beta
	 *
	 * @param mixed[] $meta_query Current destination meta query array.
	 * @param mixed[] $params     Query parameters.
	 * @param bool    $add_prefix Whether to add the public prefix to the query parameter names.
	 */
	private function add_reference_meta_queries( &$meta_query, $params, $add_prefix ) {
		$prefix = $add_prefix ? $this->config['public_prefix'] : '';

		if (
			empty( $params[ "{$prefix}references" ] ) ||
			'no' === strtolower( $params[ "{$prefix}references" ] )
		) {
			// Properties marked as reference objects are HIDDEN by default.
			$meta_query[] = array(
				'key'     => '_immonex_is_reference',
				'value'   => array( 0, 'off', '' ),
				'compare' => 'IN',
			);
		} elseif ( 'only' === strtolower( $params[ "{$prefix}references" ] ) ) {
			$meta_query[] = array(
				'key'     => '_immonex_is_reference',
				'value'   => array( 1, 'on' ),
				'compare' => 'IN',
			);
		}
	} // add_reference_meta_queries

	/**
	 * Possibly add meta queries related to group master properties.
	 *
	 * @since 1.7.28-beta
	 *
	 * @param mixed[] $meta_query Current destination meta query array.
	 * @param mixed[] $params     Query parameters.
	 * @param bool    $add_prefix Whether to add the public prefix to the query parameter names.
	 */
	private function add_masters_queries( &$meta_query, $params, $add_prefix ) {
		$prefix = $add_prefix ? $this->config['public_prefix'] : '';

		if ( empty( $params[ "{$prefix}masters" ] ) ) {
			return;
		}

		$masters = strtolower( $params[ "{$prefix}masters" ] );

		if ( 'no' === $masters ) {
			// Exclude (group) master properties.
			$meta_query[] = array(
				array(
					'key'     => '_immonex_group_master',
					'value'   => '',
					'compare' => '=',
				),
			);
			return;
		}

		if ( 'only' === $masters ) {
			// Query (visible) group master properties only.
			$meta_query[] = array(
				'key'     => '_immonex_group_master',
				'value'   => 'visible',
				'compare' => '=',
			);
		}
	} // add_masters_queries

	/**
	 * Possibly add meta queries related to special flags (available, sold, reserved...).
	 *
	 * @since 1.7.28-beta
	 *
	 * @param mixed[] $meta_query Current destination meta query array.
	 * @param mixed[] $params     Query parameters.
	 * @param bool    $add_prefix Whether to add the public prefix to the query parameter names.
	 */
	private function add_special_flag_queries( &$meta_query, $params, $add_prefix ) {
		$prefix        = $add_prefix ? $this->config['public_prefix'] : '';
		$special_flags = array(
			'available',
			'sold',
			'reserved',
			'featured',
			'front_page_offer',
			'demo',
		);

		foreach ( $special_flags as $flag ) {
			$flag_key = str_replace( '_', '-', "{$prefix}{$flag}" );

			if ( isset( $params[ $flag_key ] ) ) {
				switch ( strtolower( $params[ $flag_key ] ) ) {
					case 'yes':
					case 'only':
						$meta_query[] = array(
							'key'     => "_immonex_is_{$flag}",
							'value'   => array( 1, 'on' ),
							'compare' => 'IN',
						);
						break;
					case 'no':
						$meta_query[] = array(
							'key'     => "_immonex_is_{$flag}",
							'value'   => array( 0, 'off', '' ),
							'compare' => 'IN',
						);
						break;
				}
			}
		}
	} // add_special_flag_queries

	/**
	 * Possibly add a country code related meta query argument.
	 *
	 * @since 1.7.28-beta
	 *
	 * @param mixed[] $meta_query Current destination meta query array.
	 * @param mixed[] $params     Query parameters.
	 * @param bool    $add_prefix Whether to add the public prefix to the query parameter name.
	 */
	private function add_country_query( &$meta_query, $params, $add_prefix ) {
		$prefix = $add_prefix ? $this->config['public_prefix'] : '';

		if ( empty( $params[ "{$prefix}iso-country" ] ) ) {
			return;
		}

		$country_code = $this->utils['data']->maybe_convert_list_string( $params[ "{$prefix}iso-country" ] );

		if ( is_array( $country_code ) ) {
			$country_code = array_map(
				function ( $value ) {
					return strtoupper( substr( $value, 0, 3 ) );
				},
				$country_code
			);
		} else {
			$country_code = strtoupper( substr( $params[ "{$prefix}iso-country" ], 0, 3 ) );
		}

		$meta_query[] = array(
			'key'     => '_immonex_iso_country',
			'value'   => $country_code,
			'compare' => is_array( $country_code ) ? 'IN' : '=',
		);
	} // add_country_query

	/**
	 * Combine data for geo/distance search related queries.
	 *
	 * @since 1.7.28-beta
	 *
	 * @param mixed[] $distance_search Distance search parameters.
	 *
	 * @return mixed[]|false Combined data for geo/distance search related queries
	 *                       or false if no related data are available.
	 */
	private function get_geo_query( $distance_search ) {
		if (
			empty( $distance_search['lat'] ) ||
			empty( $distance_search['lng'] ) ||
			empty( $distance_search['radius'] )
		) {
			return false;
		}

		$prefix = $this->config['plugin_prefix'];

		return array(
			'lat_field' => "_{$prefix}lat",
			'lng_field' => "_{$prefix}lng",
			'latitude'  => $distance_search['lat'],
			'longitude' => $distance_search['lng'],
			'distance'  => $distance_search['radius'],
			'units'     => 'km',
		);
	} // get_geo_query

	/**
	 * Maybe add ancestor taxonomy terms before building hierarchical
	 * option lists.
	 *
	 * @since 1.4.4
	 *
	 * @param \WP_Term[]  $terms          Array of WP term objects.
	 * @param string|bool $taxonomy       Taxonomy (optional; false = autodetect).
	 * @param int[]       $force_main_ids Array of explicitly forced top-level terms (optional).
	 *
	 * @return \WP_Term[] Possibly extended term array.
	 */
	private function maybe_filter_and_add_ancestor_terms( $terms, $taxonomy = false, $force_main_ids = array() ) {
		if ( 0 === count( $terms ) ) {
			return $terms;
		}

		if ( ! $taxonomy ) {
			$taxonomy = $terms[0]->taxonomy;
		}

		$term_ids     = array();
		$add_term_ids = array();

		foreach ( $terms as $term ) {
			$term_ids[] = $term->term_id;
		}

		foreach ( $terms as $i => $term ) {
			if ( 0 === $term->parent ) {
				if (
					! empty( $force_main_ids )
					&& ! in_array( $term->term_id, $force_main_ids, true )
				) {
					unset( $terms[ $i ] );
				}
				continue;
			}

			$ancestor_ids = get_ancestors( $term->term_id, $term->taxonomy, 'taxonomy' );
			if ( count( $ancestor_ids ) > 0 ) {
				if (
					! empty( $force_main_ids )
					&& ! in_array( $ancestor_ids[ count( $ancestor_ids ) - 1 ], $force_main_ids, true )
				) {
					unset( $terms[ $i ] );
					continue;
				}

				foreach ( $ancestor_ids as $id ) {
					if ( $id && ! in_array( $id, $term_ids, true ) ) {
						$add_term_ids[] = $id;
					}
				}
			}
		}

		$add_term_ids = array_unique( $add_term_ids );
		if ( count( $add_term_ids ) > 0 ) {
			$terms = array_merge(
				$terms,
				get_terms(
					array(
						'taxonomy' => $taxonomy,
						'include'  => $add_term_ids,
					)
				)
			);

			uasort(
				$terms,
				function ( $a, $b ) {
					if ( $a->name === $b->name ) {
						return 0;
					}

					return $a->name < $b->name ? -1 : 1;
				}
			);
		}

		return $terms;
	} // maybe_filter_and_add_ancestor_terms

	/**
	 * Recursively create and return an hierarchical option list.
	 *
	 * @since 1.0.0
	 *
	 * @param \WP_Term[]  $terms              Array of WP term objects.
	 * @param string|bool $option_text_source Source of the option text or false to use
	 *                                        the term name (default).
	 * @param int         $parent             Parent term ID (optional, defaults to 0).
	 * @param int         $level              Start level (optional, defaults to 0).
	 * @param bool        $top_level_only     Optional flag for returning only top-level options
	 *                                        (false by default).
	 *
	 * @return mixed[] Array with sub-arrays for tax, meta and geo queries.
	 */
	private function get_hierarchical_option_list( $terms, $option_text_source = false, $parent = 0, $level = 0, $top_level_only = false ) {
		$level_options = array();

		if ( count( $terms ) > 0 ) {
			foreach ( $terms as $term ) {
				if ( $term->parent === $parent ) {
					$option_text = $option_text_source && 'description' === $option_text_source && $term->description ?
						$term->description :
						$term->name;

					$level_options[ $term->slug ] = str_repeat(
						'&ndash;',
						$level
					) . " {$option_text}";

					if ( ! $top_level_only ) {
						$level_options = array_merge(
							$level_options,
							$this->get_hierarchical_option_list(
								$terms,
								$option_text_source,
								$term->term_id,
								$level + 1
							)
						);
					}
				}
			}
		}

		return $level_options;
	} // get_hierarchical_option_list

	/**
	 * Extend the given ID for use as HTML DOM element ID.
	 *
	 * @since 1.6.0
	 *
	 * @param string $id Search form element ID/key.
	 *
	 * @return string Prefixed ID.
	 */
	private function get_public_element_id( $id ) {
		if ( 'inx-' === substr( $id, 0, 4 ) ) {
			return $id;
		}

		// Prefixed ID for use as input id/name etc.
		return "{$this->config['public_prefix']}search-{$id}";
	} // get_public_element_id

} // Property_Search
