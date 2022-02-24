<?php
/**
 * Class Property_Map
 *
 * @package immonex-kickstart
 */

namespace immonex\Kickstart;

/**
 * Property Map Rendering.
 */
class Property_Map {

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
	 * @since 1.2.0
	 *
	 * @param mixed[]  $config Various component configuration data.
	 * @param object[] $utils Helper/Utility objects.
	 */
	public function __construct( $config, $utils ) {
		$this->config = $config;
		$this->utils  = $utils;
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
	public function render( $template = 'property-list/map', $atts = array() ) {
		$prefix = $this->config['public_prefix'];

		$marker_set_id = ! empty( $atts['cid'] ) ? $atts['cid'] : 'inx-property-map';
		$markers       = $this->get_markers( $atts );

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

		$markers      = array();
		$property_ids = apply_filters( 'inx_get_properties', array(), $atts );

		if ( ! empty( $property_ids ) ) {
			foreach ( $property_ids as $post_id ) {
				$lat = get_post_meta( $post_id, '_inx_lat', true );
				$lng = get_post_meta( $post_id, '_inx_lng', true );
				if ( ! $lat || ! $lng ) {
					continue;
				}

				$property_type_terms = wp_get_post_terms( $post_id, 'inx_property_type', array( 'fields' => 'names' ) );
				$property_type       = is_array( $property_type_terms ) && ! empty( $property_type_terms ) ?
					array_pop( $property_type_terms ) : '';

				$markers[ $post_id ] = array(
					'title'         => get_the_title( $post_id ),
					'type'          => $property_type,
					'lat'           => $lat,
					'lng'           => $lng,
					'thumbnail_url' => get_the_post_thumbnail_url( $post_id ),
					'url'           => get_post_permalink( $post_id ),
				);
			}
		}

		return $markers;
	} // get_markers

} // Property_Map
