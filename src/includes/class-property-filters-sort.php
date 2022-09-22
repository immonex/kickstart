<?php
/**
 * Class Property_Filters_Sort
 *
 * @package immonex\Kickstart
 */

namespace immonex\Kickstart;

/**
 * Filtering and sorting properties.
 */
class Property_Filters_Sort {

	/**
	 * Default property list filters/sort template file
	 */
	const DEFAULT_TEMPLATE = 'property-list/filters-sort';

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
	 * Render the property list filter/sort selection bar (PHP template).
	 *
	 * @since 1.0.0
	 *
	 * @param string  $template Template file name (without suffix).
	 * @param mixed[] $atts Rendering Attributes.
	 *
	 * @return string Rendered contents (HTML).
	 */
	public function render( $template = '', $atts = array() ) {
		global $wp_query;

		$prefix = $this->config['public_prefix'];

		if ( empty( $template ) ) {
			$template = self::DEFAULT_TEMPLATE;
		}

		/**
		 * Check GET variables and preserve given search/filter options as hidden fields.
		 */
		$preserve_get_vars = $this->config['special_query_vars']();
		if ( ! empty( $_GET ) ) {
			// Add further GET vars.
			foreach ( $_GET as $var_name => $value ) {
				if (
					'' !== $value &&
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
				if ( "{$prefix}sort" === $var_name ) {
					continue;
				}

				if ( ! empty( $atts[ $var_name ] ) ) {
					$value = $atts[ $var_name ];
				} else {
					$value = $this->utils['data']->get_query_var_value( $var_name );
				}

				if ( is_array( $value ) ) {
					$value = implode( ',', $value );
				}

				if ( false !== $value ) {
					$hidden_fields[ $var_name ] = array(
						'name'  => $var_name,
						'value' => $value,
					);
				}
			}
		}

		$sort_options = $this->get_sort_options();
		$default      = ! empty( $atts['default'] ) ? strtolower( trim( $atts['default'] ) ) : '';

		if ( ! empty( $atts['elements'] ) ) {
			$include_elements = array_map(
				function( $value ) {
					return trim( strtolower( $value ) );
				},
				explode( ',', $atts['elements'] )
			);

			$custom_sort_options = array();

			foreach ( $include_elements as $option_key ) {
				if ( isset( $sort_options[ $option_key ] ) ) {
					$custom_sort_options[ $option_key ] = $sort_options[ $option_key ];
				}
			}

			if ( ! empty( $custom_sort_options ) ) {
				$sort_options = $custom_sort_options;
			}
		} elseif ( ! empty( $atts['exclude'] ) ) {
			$exclude_elements = array_map(
				function( $value ) {
					return trim( strtolower( $value ) );
				},
				explode( ',', $atts['exclude'] )
			);

			foreach ( $exclude_elements as $option_key ) {
				if ( isset( $sort_options[ $option_key ] ) ) {
					unset( $sort_options[ $option_key ] );
				}
			}
		}

		$template_data = array_merge(
			$this->config,
			$atts,
			array(
				'hidden_fields'       => $hidden_fields,
				'sort_options'        => $sort_options,
				'default_sort_option' => $this->get_default_sort_option( $sort_options, $default ),
				'form_action'         => $this->utils['string']->get_nopaging_url(),
			)
		);

		$output = $this->utils['template']->render_php_template( $template, $template_data );

		return $output;
	} // render

	/**
	 * Determine and return the default sort option.
	 *
	 * @since 1.0.0
	 *
	 * @param mixed[]|bool $sort_options Sort option array or false to use the
	 *                                   related method.
	 * @param string       $default      Custom default value (shortcode attribute).
	 *
	 * @return mixed[] Key and definition/configuration of the default option.
	 */
	public function get_default_sort_option( $sort_options = false, $default = '' ) {
		if ( empty( $sort_options ) ) {
			$sort_options = $this->get_sort_options();
		}

		$sort_option_keys = array_keys( $sort_options );
		$default_sort_key = apply_filters(
			'inx_default_sort_key',
			$default ? $default : $sort_option_keys[0]
		);

		if ( ! in_array( $default_sort_key, $sort_option_keys, true ) ) {
			$default_sort_key = $sort_option_keys[0];
		}

		return array_merge(
			array( 'key' => $default_sort_key ),
			$sort_options[ $default_sort_key ]
		);
	} // get_default_sort_option

	/**
	 * Create and return a list of sort options for property list views.
	 *
	 * @since 1.0.0
	 *
	 * @return mixed[] Sort option keys and related definition/configuration.
	 */
	public function get_sort_options() {
		$prefix = $this->config['plugin_prefix'];

		if (
			$this->utils['data']->get_query_var_value( 'geo_query' )
			|| (
				$this->utils['data']->get_query_var_value( 'inx-search-distance-search-location' )
				&& $this->utils['data']->get_query_var_value( 'inx-search-distance-search-radius' )
			)
		) {
			$sort_options = array(
				'distance' => array(
					'field' => 'geo_query_distance',
					'title' => __( 'Distance', 'immonex-kickstart' ),
					'order' => 'ASC',
				),
			);
		} else {
			$sort_options = array();
		}

		$sort_options = array_merge(
			$sort_options,
			array(
				'date_desc' => array(
					'field' => 'date',
					'title' => __( 'Newest', 'immonex-kickstart' ),
					'order' => 'DESC',
				),
			)
		);

		$marketing_type = $this->utils['data']->get_query_var_value( $this->config['public_prefix'] . 'search-marketing-type' );
		if ( ! $marketing_type ) {
			$sort_options = array_merge(
				$sort_options,
				array(
					'marketing_type_desc' => array(
						'field' => '_' . $prefix . 'is_sale',
						'title' => __( 'For Sale first', 'immonex-kickstart' ),
						'order' => 'DESC',
					),
					'marketing_type_asc'  => array(
						'field' => '_' . $prefix . 'is_sale',
						'title' => __( 'For Rent first', 'immonex-kickstart' ),
						'order' => 'ASC',
					),
				)
			);
		}

		$references = $this->utils['data']->get_query_var_value( $this->config['public_prefix'] . 'references' );
		$available  = $this->utils['data']->get_query_var_value( $this->config['public_prefix'] . 'available' );
		if ( 'only' !== $references && ! $available ) {
			$sort_options = array_merge(
				$sort_options,
				array(
					'availability_desc' => array(
						'field' => '_immonex_is_available',
						'title' => __( 'Available first', 'immonex-kickstart' ),
						'order' => 'DESC',
					),
				)
			);
		}

		$sort_options = array_merge(
			$sort_options,
			array(
				'price_asc'  => array(
					'field' => '_' . $prefix . 'primary_price',
					'title' => __( 'Price (low to high)', 'immonex-kickstart' ),
					'order' => 'ASC',
					'type'  => 'NUMERIC',
				),
				'price_desc' => array(
					'field' => '_' . $prefix . 'primary_price',
					'title' => __( 'Price (high to low)', 'immonex-kickstart' ),
					'order' => 'DESC',
					'type'  => 'NUMERIC',
				),
				'area_asc'   => array(
					'field' => '_' . $prefix . 'primary_area',
					'title' => __( 'Area', 'immonex-kickstart' ),
					'order' => 'ASC',
					'type'  => 'NUMERIC',
				),
				'rooms_asc'  => array(
					'field' => '_' . $prefix . 'primary_rooms',
					'title' => __( 'Rooms', 'immonex-kickstart' ),
					'order' => 'ASC',
					'type'  => 'NUMERIC',
				),
			)
		);

		return apply_filters( 'inx_property_sort_options', $sort_options );
	} // get_sort_options

} // Property_Filters_Sort
