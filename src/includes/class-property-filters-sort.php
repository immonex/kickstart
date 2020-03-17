<?php
/**
 * Class Property_Filters_Sort
 *
 * @package immonex-kickstart
 */

namespace immonex\Kickstart;

/**
 * Filtering and sorting properties.
 */
class Property_Filters_Sort {

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
	public function render( $template = 'property-list/filters-sort', $atts = array() ) {
		global $wp_query;

		$prefix = $this->config['public_prefix'];

		/**
		 * Check GET variables and preserve given search options as hidden fields.
		 */
		$preserve_get_vars = array();

		if (
			$wp_query &&
			isset( $wp_query->query_vars ) &&
			count( $wp_query->query_vars ) > 0
		) {
			/**
			 * Check for/include special query variables (e.g. reference flag).
			 */
			$special_vars = array();

			if ( count( $this->config['special_query_vars'] ) > 0 ) {
				foreach ( $this->config['special_query_vars'] as $var_name ) {
					if ( '{prefix}sort' !== $var_name ) {
						$special_vars[] = $var_name;
					}
				}
			}

			$special_vars_substring = count( $special_vars ) > 0 ? '|' . implode( '|', $special_vars ) : '';

			foreach ( $wp_query->query_vars as $var_name => $value ) {
				if ( preg_match( "/^({$prefix}search\-{$special_vars_substring})/", $var_name ) ) {
					$preserve_get_vars[] = $var_name;
				}
			}
		}

		$hidden_fields = array();

		if ( count( $preserve_get_vars ) > 0 ) {
			foreach ( $preserve_get_vars as $var_name ) {
				$value = $this->utils['data']->get_query_var_value( $var_name, $wp_query );

				if ( false !== $value ) {
					// TODO: Add JSON check.
					if ( is_array( $value ) ) {
						if ( count( $value ) > 0 && $value[0] ) {
							$value = json_encode( array_map( 'stripslashes', $value ) );
						} else {
							$value = '';
						}
					} else {
						$value = stripslashes( $value );
					}

					$hidden_fields[] = array(
						'name'  => $var_name,
						'value' => $value,
					);
				}
			}
		}

		$template_data = array_merge(
			$this->config,
			$atts,
			array(
				'hidden_fields'       => $hidden_fields,
				'sort_options'        => $this->get_sort_options(),
				'default_sort_option' => $this->get_default_sort_option(),
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
	 * @return mixed[] Key and definition/configuration of the default option.
	 */
	public function get_default_sort_option() {
		$sort_options     = $this->get_sort_options();
		$sort_option_keys = array_keys( $sort_options );
		$default_sort_key = apply_filters(
			'inx_default_sort_key',
			$sort_option_keys[0]
		);

		if ( ! in_array( $default_sort_key, $sort_option_keys ) ) {
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

		if ( get_query_var( 'geo_query' ) ) {
			$sort_options = array(
				'distance' => array(
					'field' => 'distance',
					'title' => __( 'Distance', 'inx' ),
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
					'title' => __( 'Newest', 'inx' ),
					'order' => 'DESC',
				),
			)
		);

		$marketing_type = get_query_var( $this->config['public_prefix'] . 'search-marketing-type' );
		if ( ! $marketing_type ) {
			$sort_options = array_merge(
				$sort_options,
				array(
					'marketing_type_desc' => array(
						'field' => '_' . $prefix . 'is_sale',
						'title' => __( 'For Sale first', 'inx' ),
						'order' => 'DESC',
					),
					'marketing_type_asc'  => array(
						'field' => '_' . $prefix . 'is_sale',
						'title' => __( 'For Rent first', 'inx' ),
						'order' => 'ASC',
					),
				)
			);
		}

		$references = get_query_var( $this->config['public_prefix'] . 'references' );
		$available  = get_query_var( $this->config['public_prefix'] . 'available' );
		if ( 'only' !== $references && ! $available ) {
			$sort_options = array_merge(
				$sort_options,
				array(
					'availability_desc' => array(
						'field' => '_immonex_is_available',
						'title' => __( 'Available first', 'inx' ),
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
					'title' => __( 'Price (low to high)', 'inx' ),
					'order' => 'ASC',
					'type'  => 'NUMERIC',
				),
				'price_desc' => array(
					'field' => '_' . $prefix . 'primary_price',
					'title' => __( 'Price (high to low)', 'inx' ),
					'order' => 'DESC',
					'type'  => 'NUMERIC',
				),
				'area_asc'   => array(
					'field' => '_' . $prefix . 'primary_area',
					'title' => __( 'Area', 'inx' ),
					'order' => 'ASC',
					'type'  => 'NUMERIC',
				),
				'rooms_asc'  => array(
					'field' => '_' . $prefix . 'primary_rooms',
					'title' => __( 'Rooms', 'inx' ),
					'order' => 'ASC',
					'type'  => 'NUMERIC',
				),
			)
		);

		return $sort_options;
	} // get_sort_options

} // Property_Filters_Sort
