<?php
/**
 * Class Property_Map_Hooks
 *
 * @package immonex-kickstart
 */

namespace immonex\Kickstart;

/**
 * Property map related actions, filters and shortcodes.
 */
class Property_Map_Hooks {

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
	 * Related property map object
	 *
	 * @var \immonex\Kickstart\Property_Map
	 */
	private $property_map;

	/**
	 * Constructor
	 *
	 * @since 1.2.0
	 *
	 * @param mixed[]  $config Various component configuration data.
	 * @param object[] $utils Helper/Utility objects.
	 */
	public function __construct( $config, $utils ) {
		$this->config       = $config;
		$this->utils        = $utils;
		$this->property_map = new Property_Map( $config, $utils );

		/**
		 * Plugin-specific actions and filters
		 */

		add_action( 'inx_render_property_map', array( $this, 'render_property_map' ) );

		/**
		 * Shortcodes
		 */

		add_shortcode( 'inx-property-map', array( $this, 'shortcode_property_map' ) );
	} // __construct

	/**
	 * Display the rendered property map (action based).
	 *
	 * @since 1.2.0
	 *
	 * @param mixed[] $atts Rendering attributes.
	 */
	public function render_property_map( $atts = array() ) {
		if ( ! is_array( $atts ) ) {
			$atts = array();
		}
		$template = isset( $atts['template'] ) && $atts['template'] ? $atts['template'] : 'property-list/map';

		echo $this->property_map->render( $template, $atts );
	} // render_property_map

	/**
	 * Return a rendered property map (based on the shortcode
	 * [inx-property-map]).
	 *
	 * @since 1.2.0
	 *
	 * @param mixed[] $atts Rendering Attributes.
	 *
	 * @return string Rendered shortcode contents.
	 */
	public function shortcode_property_map( $atts ) {
		$prefix                     = $this->config['public_prefix'];
		$query_and_search_var_names = $this->config['special_query_vars']();

		$property_search      = new Property_Search( $this->config, $this->utils );
		$search_form_elements = $property_search->get_search_form_elements();

		if ( count( $search_form_elements ) > 0 ) {
			foreach ( $search_form_elements as $key => $element ) {
				if ( ! empty( $element['enabled'] ) ) {
					$query_and_search_var_names[] = "{$prefix}search-{$key}";
				}
			}
		}

		/**
		 * Create an array of supported shortcode attributes.
		 */
		$supported_atts = array(
			'lat'             => $this->config['property_list_map_lat'],
			'lng'             => $this->config['property_list_map_lng'],
			'zoom'            => $this->config['property_list_map_zoom'],
			'require-consent' => $this->config['maps_require_consent'],
		);
		foreach ( $query_and_search_var_names as $var_name ) {
			$supported_atts[ $var_name ] = '';
		}

		// Add prefixes to user shortcode attributes (except specific tags above).
		$prefixed_atts = array();
		if ( is_array( $atts ) && count( $atts ) > 0 ) {
			foreach ( $atts as $key => $value ) {
				if ( isset( $supported_atts[ $key ] ) ) {
					$prefixed_atts[ $key ] = $value;
				} elseif ( in_array( "{$prefix}search-{$key}", $query_and_search_var_names, true ) ) {
					$prefixed_atts[ "{$prefix}search-{$key}" ] = $value;
				} else {
					$prefixed_atts[ "{$prefix}{$key}" ] = $value;
				}
			}
		}
		$shortcode_atts = shortcode_atts( $supported_atts, $prefixed_atts, "{$prefix}property-map" );

		return $this->property_map->render( 'property-list/map', $shortcode_atts );
	} // shortcode_property_map

} // Property_Map_Hooks
