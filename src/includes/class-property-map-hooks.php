<?php
/**
 * Class Property_Map_Hooks
 *
 * @package immonex\Kickstart
 */

namespace immonex\Kickstart;

/**
 * Property map related actions, filters and shortcodes.
 */
class Property_Map_Hooks extends Property_Component_Hooks {

	/**
	 * Base name for frontend component instance IDs
	 */
	const FE_COMPONENT_ID_BASENAME = 'inx-property-map';

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
		parent::__construct( $config, $utils );

		$this->property_map = new Property_Map( $config, $utils );

		/**
		 * Plugin-specific actions and filters
		 */

		add_action( 'inx_render_property_map', array( $this, 'render_property_map' ) );

		add_filter( 'inx_get_property_map_markers', array( $this, 'get_property_map_markers' ), 10, 2 );

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
		$template = ! empty( $atts['template'] ) ? $atts['template'] : Property_Map::DEFAULT_TEMPLATE;

		$atts = array_merge(
			$atts,
			$this->add_rendered_instance( $template, $atts )
		);

		echo $this->property_map->render( $template, $atts );
	} // render_property_map

	/**
	 * Return a set of property map markers (filter callback).
	 *
	 * @since 1.6.0
	 *
	 * @param mixed[] $markers Empty array.
	 * @param mixed[] $atts    Rendering attributes.
	 */
	public function get_property_map_markers( $markers = array(), $atts = array() ) {
		return $this->property_map->get_markers( $atts );
	} // get_property_map_markers

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
			'cid'             => '',
			'template'        => Property_Map::DEFAULT_TEMPLATE,
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
		$shortcode_atts = $this->utils['string']->decode_special_chars(
			shortcode_atts( $supported_atts, $prefixed_atts, "{$prefix}property-map" )
		);
		$template       = ! empty( $shortcode_atts['template'] ) ?
			$shortcode_atts['template'] :
			Property_Map::DEFAULT_TEMPLATE;

		$shortcode_atts = array_merge(
			$shortcode_atts,
			$this->add_rendered_instance( $template, array_filter( $shortcode_atts ) )
		);

		return $this->property_map->render( $template, $shortcode_atts );
	} // shortcode_property_map

} // Property_Map_Hooks
