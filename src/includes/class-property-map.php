<?php
/**
 * Class Property_Map
 *
 * @package immonex\Kickstart
 */

namespace immonex\Kickstart;

/**
 * Property Map Rendering.
 */
class Property_Map {

	/**
	 * Default property map template file
	 */
	const DEFAULT_TEMPLATE = 'property-list/map';

	/**
	 * List map types
	 */
	const LIST_MAP_TYPES = array( 'osm', 'osm_german', 'osm_otm', 'gmap', 'gmap_terrain', 'gmap_hybrid' );

	/**
	 * Overview/List map zoom (min, max, default)
	 */
	const LIST_MAP_ZOOM = array( 2, 19, 12 );

	/**
	 * List map default marker fill color
	 */
	const LIST_MAP_MARKER_FILL_COLOR = '#E77906';

	/**
	 * List map default marker fill opacity
	 */
	const LIST_MAP_MARKER_FILL_OPACITY = .8;

	/**
	 * List map default marker stroke color
	 */
	const LIST_MAP_MARKER_STROKE_COLOR = '#404040';

	/**
	 * List map default marker stroke width
	 */
	const LIST_MAP_MARKER_STROKE_WIDTH = 3;

	/**
	 * List map default marker scale
	 */
	const LIST_MAP_MARKER_SCALE = .75;

	/**
	 * OPTIONAL list map marker icon file (relative to the SKIN folder)
	 */
	const LIST_MAP_MARKER_ICON = 'images/map-location-pin.png';

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
	 * @since 1.2.0
	 *
	 * @param mixed[]  $config Various component configuration data.
	 * @param object[] $utils Helper/Utility objects.
	 */
	public function __construct( $config, $utils ) {
		$this->config = $config;
		$this->utils  = $utils;
		$this->api    = new API( $config, $utils );
	} // __construct

	/**
	 * Render a property map (PHP template).
	 *
	 * @since 1.2.0
	 *
	 * @param string  $template Template file name (without suffix).
	 * @param mixed[] $atts     Rendering attributes.
	 *
	 * @return string Rendered contents (HTML).
	 */
	public function render( $template = '', $atts = array() ) {
		$prefix = $this->config['public_prefix'];

		if ( empty( $template ) ) {
			$template = self::DEFAULT_TEMPLATE;
		}

		$atts          = apply_filters( 'inx_apply_auto_rendering_atts', $atts );
		$marker_set_id = ! empty( $atts['cid'] ) ? $atts['cid'] : 'inx-property-map';

		// Initial marker data are NOT directly delivered within the page anymore (get_markers).
		$markers = array();

		$map_option_string = ! empty( $atts['options'] ) ? $atts['options'] : '';
		unset( $atts['options'] );

		$map_type = ! empty( $atts['type'] ) && in_array( $atts['type'], self::LIST_MAP_TYPES, true ) ?
			$atts['type'] : $this->config['property_list_map_type'];
		unset( $atts['type'] );

		if (
			false !== strpos( $map_type, 'gmap' )
			&& empty( $this->config['google_api_key'] )
		) {
			$map_type = self::LIST_MAP_TYPES[0];
		}

		wp_localize_script(
			"{$prefix}frontend",
			'inx_maps',
			array(
				$marker_set_id => (object) $markers,
			)
		);

		$atts = apply_filters(
			'inx_property_list_map_atts',
			array_merge(
				array(
					'type'                => $map_type,
					'options'             => $this->get_map_options( $map_type, $map_option_string ),
					'lat'                 => $this->config['property_list_map_lat'],
					'lng'                 => $this->config['property_list_map_lng'],
					'zoom'                => $this->config['property_list_map_zoom'],
					'auto_fit'            => $this->config['property_list_map_auto_fit'],
					'require-consent'     => $this->config['maps_require_consent'],
					'marker_set_id'       => $marker_set_id,
					'marker_fill_color'   => self::LIST_MAP_MARKER_FILL_COLOR,
					'marker_fill_opacity' => self::LIST_MAP_MARKER_FILL_OPACITY,
					'marker_stroke_color' => self::LIST_MAP_MARKER_STROKE_COLOR,
					'marker_stroke_width' => self::LIST_MAP_MARKER_STROKE_WIDTH,
					'marker_scale'        => self::LIST_MAP_MARKER_SCALE,
					'marker_icon_url'     => $this->utils['template']->get_template_file_url( self::LIST_MAP_MARKER_ICON ),
					'google_api_key'      => $this->config['google_api_key'],
				),
				$atts
			)
		);

		if ( 'true' === $atts['require-consent'] ) {
			$atts['require-consent'] = true;
		} elseif ( 'false' === $atts['require-consent'] ) {
			$atts['require-consent'] = false;
		}

		$template_data = array_merge(
			$this->config,
			$atts
		);

		return $this->utils['template']->render_php_template( $template, $template_data, $this->utils );
	} // render

	/**
	 * Return OpenLayers/provider source specific JS map options. Split an (optional)
	 * option string into an array and replace default values with the provided ones.
	 *
	 * @see https://openlayers.org/en/latest/apidoc/module-ol_source_OSM-OSM.html
	 * @see https://openlayers.org/en/latest/apidoc/module-ol_source_Google-Google.html
	 *
	 * @since 1.9.13-beta
	 *
	 * @param string $map_type      Map type (osm or google).
	 * @param string $option_string Optional comma-separated key/value list of map options
	 *                              (shortcode).
	 *
	 * @return mixed[] Map options.
	 */
	public function get_map_options( $map_type, $option_string = '' ) {
		$locale = substr( str_replace( '_', '-', determine_locale() ), 0, 5 );
		$region = substr( $locale, -2 );

		$defaults = apply_filters(
			'inx_property_list_map_options',
			array(
				'osm'          => array(
					'crossOrigin' => 'anonymous',
					'maxZoom'     => self::LIST_MAP_ZOOM[1],
					'opaque'      => true,
				),
				'osm_german'   => array(
					'crossOrigin'  => 'anonymous',
					'maxZoom'      => self::LIST_MAP_ZOOM[1],
					'opaque'       => true,
					'url'          => 'https://tile.openstreetmap.de/{z}/{x}/{y}.png',
					'attributions' => __( 'Data from <a href="https://www.openstreetmap.org/">OpenStreetMap</a> - Published under <a href="https://opendatacommons.org/licenses/odbl/">ODbL</a>', 'immonex-kickstart' ),
				),
				'osm_otm'      => array(
					'crossOrigin'  => 'anonymous',
					'maxZoom'      => 15,
					'opaque'       => true,
					'url'          => 'https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png',
					'attributions' => __( 'map data: © <a href="https://openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors, <a href="https://viewfinderpanoramas.org/" target="_blank">SRTM</a> | map style: © <a href="https://opentopomap.org" target="_blank">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/"">CC-BY-SA</a>)', 'immonex-kickstart' ),
				),
				'gmap'         => array(
					'mapType'  => 'roadmap',
					'language' => $locale,
					'region'   => $region,
				),
				'gmap_terrain' => array(
					'mapType'    => 'terrain',
					'language'   => $locale,
					'region'     => $region,
					'layerTypes' => array( 'layerRoadmap' ),
				),
				'gmap_hybrid'  => array(
					'mapType'    => 'satellite',
					'language'   => $locale,
					'region'     => $region,
					'layerTypes' => array( 'layerRoadmap' ),
				),
			)
		);

		$map_options = isset( $defaults[ $map_type ] ) ? $defaults[ $map_type ] : array();

		$filter_func = function ( $value ) {
			return ! in_array( $value, array( '', null ), true );
		};

		if ( ! trim( $option_string ) ) {
			return array_filter( $map_options, $filter_func );
		}

		$ext_options = $this->utils['string']->split_list_string( $option_string, 'key_value' );

		if ( ! empty( $ext_options ) && is_array( $ext_options ) ) {
			$map_options = array_merge( $map_options, $ext_options );
		}

		return array_filter( $map_options, $filter_func );
	} // get_map_options

	/**
	 * Generate a set of property marker data.
	 *
	 * @since 1.6.0
	 *
	 * @param mixed[] $atts Rendering attributes.
	 *
	 * @return mixed[] Marker set.
	 */
	public function get_markers( $atts ) {
		$atts = array_merge(
			$atts,
			array( 'fields' => 'ids' )
		);
		if ( empty( $atts['type'] ) ) {
			$atts['type'] = 'coords';
		}

		$markers      = array();
		$property_ids = ! empty( $atts['id'] ) ?
			array_filter( explode( ',', $atts['id'] ) ) :
			apply_filters( 'inx_get_properties', array(), $atts );

		if ( ! empty( $property_ids ) ) {
			$property                = new Property( false, $this->config, $this->utils );
			$all_property_type_terms = $this->utils['data']->get_all_terms_grouped_by_property( 'inx_property_type' );
			$property_coords         = $this->api->get_all_property_coords();

			foreach ( $property_ids as $i => $post_id ) {
				if ( ! isset( $property_coords[ $post_id ] ) ) {
					continue;
				}
				$lat = $property_coords[ $post_id ]['lat'];
				$lng = $property_coords[ $post_id ]['lng'];

				$property->set_post( $post_id );

				$property_type   = ! empty( $all_property_type_terms[ $post_id ] ) ?
					array_shift( $all_property_type_terms[ $post_id ] ) : '';
				$has_detail_view = ! empty( $this->config['disable_detail_view_states'] ) ?
					apply_filters( 'inx_has_detail_view', true, $post_id ) : true;
				$property_url    = $has_detail_view ?
					$property->extend_url( get_post_permalink( $post_id ), false, $atts ) : '';

				if ( ! empty( $atts['type'] ) && 'coords' === $atts['type'] ) {
					$markers[ $post_id ] = array( $lat, $lng );
				} else {
					$markers[ $post_id ] = array(
						'title'         => get_the_title( $post_id ),
						'type'          => $property_type,
						'lat'           => $lat,
						'lng'           => $lng,
						'thumbnail_url' => get_the_post_thumbnail_url( $post_id ),
						'url'           => $property_url,
					);
				}
			}
		}

		return $markers;
	} // get_markers

} // Property_Map
