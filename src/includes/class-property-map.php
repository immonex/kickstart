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
	 * @param mixed[] $atts Rendering attributes.
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
					'lat'             => $this->config['property_list_map_lat'],
					'lng'             => $this->config['property_list_map_lng'],
					'zoom'            => $this->config['property_list_map_zoom'],
					'require-consent' => $this->config['maps_require_consent'],
					'marker_set_id'   => $marker_set_id,
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

				$property_type = ! empty( $all_property_type_terms[ $post_id ] ) ?
					array_shift( $all_property_type_terms[ $post_id ] ) : '';
				$property_url  = $property->extend_url( get_post_permalink( $post_id ), false, $atts );

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
