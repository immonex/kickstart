<?php
/**
 * Class Property_Filters_Sort_Hooks
 *
 * @package immonex-kickstart
 */

namespace immonex\Kickstart;

/**
 * Property list related actions and filters (filtering and sorting).
 */
class Property_Filters_Sort_Hooks {

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
	 * Related Property filters/sort object
	 *
	 * @var \immonex\Kickstart\Property_Filters_Sort
	 */
	private $property_filters_sort;

	/**
	 * Constructor
	 *
	 * @since 1.0.0
	 *
	 * @param mixed[]  $config Various component configuration data.
	 * @param object[] $utils Helper/Utility objects.
	 */
	public function __construct( $config, $utils ) {
		$this->config                = $config;
		$this->utils                 = $utils;
		$this->property_filters_sort = new Property_Filters_Sort( $config, $utils );

		/**
		 * WP actions and filters
		 */

		add_action( 'pre_get_posts', array( $this, 'adjust_property_frontend_query' ), 20 );

		/**
		 * Plugin-specific actions and filters
		 */

		add_action( 'inx_render_property_filters_sort', array( $this, 'render_property_filters_sort' ), 10, 2 );

		/**
		 * Shortcodes
		 */

		add_shortcode( 'inx-filters-sort', array( $this, 'shortcode_filters_sort' ) );
	} // __construct

	/**
	 * Adjust frontend related property WP queries.
	 *
	 * @since 1.0.0
	 *
	 * @param \WP_Query $query WP query object.
	 */
	public function adjust_property_frontend_query( $query ) {
		global $post;

		if (
			(
				! empty( $query->query_vars['suppress_pre_get_posts_filter'] ) &&
				empty( $query->query_vars['execute_pre_get_posts_filter'] )
			) ||
			! empty( $query->query_vars['page'] ) ||
			! empty( $query->query_vars['pagename'] ) || (
				$query->get( 'post_type' ) &&
				$this->config['property_post_type_name'] !== $query->get( 'post_type' )
			)
		) {
			return;
		}

		$contains_shortcode = is_a( $post, 'WP_Post' ) && (
			has_shortcode( $post->post_content, 'inx-property-list' )
			|| has_shortcode( $post->post_content, 'inx-property-map' )
		);

		if (
			! isset( $query->query_vars['execute_pre_get_posts_filter'] ) &&
			! $contains_shortcode && (
				! $query->is_main_query() ||
				is_single() ||
				is_page() ||
				is_admin() || (
					is_archive() &&
					$this->config['property_post_type_name'] !== $query->get( 'post_type' )
				)
			)
		) {
			return;
		}

		$current_meta_query = $query->get( 'meta_query' );
		if ( ! is_array( $current_meta_query ) ) {
			$current_meta_query = array();
		}

		$prefix       = $this->config['public_prefix'];
		$sort_options = $this->property_filters_sort->get_sort_options();

		$sort_query_var = $this->utils['data']->get_query_var_value( $prefix . 'sort', $query );
		if ( is_array( $sort_query_var ) ) {
			$sort_keys = $sort_query_var;
		} else {
			$sort_keys = array_map( 'strtolower', array_map( 'trim', explode( ',', $sort_query_var ) ) );
		}
		$valid_sort_keys = array_keys( $sort_options );

		if ( count( $sort_keys ) > 0 ) {
			foreach ( $sort_keys as $i => $sort_key ) {
				if ( ! $sort_key || ! in_array( $sort_key, $valid_sort_keys ) ) {
					unset( $sort_keys[ $i ] );
				}
			}
		}

		if ( 0 === count( $sort_keys ) ) {
			$default_sort_option = $this->property_filters_sort->get_default_sort_option();
			$sort_keys[]         = $default_sort_option['key'];
		}

		$sort_chain            = array();
		$sort_meta_query_chain = array( 'relation' => 'AND' );

		foreach ( $sort_keys as $i => $sort_key ) {
			$orderby = $sort_options[ $sort_key ]['field'];
			if ( isset( $sort_options[ $sort_key ]['type'] ) ) {
				$orderby_type = $sort_options[ $sort_key ]['type'];
			}

			if (
				isset( $sort_options[ $sort_key ]['order'] ) &&
				in_array(
					strtoupper( $sort_options[ $sort_key ]['order'] ),
					array( 'ASC', 'DESC' )
				)
			) {
				$order = strtoupper( $sort_options[ $sort_key ]['order'] );
			} else {
				$order = 'ASC';
			}

			if ( '_' === $orderby[0] ) {
				$sort_meta_query_chain[] = array(
					'relation'    => 'OR',
					array(
						'key'     => $orderby,
						'compare' => 'NOT EXISTS',
					),
					"inx_sort_$i" => array(
						'key'     => $orderby,
						'compare' => 'EXISTS',
						'type'    => isset( $orderby_type ) ? $orderby_type : null,
					),
				);

				$sort_chain[ "inx_sort_$i" ] = $order;
			} else {
				$sort_chain[ $orderby ] = $order;
			}
		}

		if ( ! in_array( 'date', array_keys( $sort_chain ) ) ) {
			$sort_chain['date'] = 'DESC';
		}

		if ( count( $current_meta_query ) > 0 ) {
			$meta_query = array_merge(
				array( 'relation' => 'AND' ),
				array( $current_meta_query ),
				array( $sort_meta_query_chain )
			);
		} else {
			$meta_query = $sort_meta_query_chain;
		}

		$query->set( 'meta_query', $meta_query );
		$query->set( 'orderby', $sort_chain );
	} // adjust_property_frontend_query

	/**
	 * Display the rendered property list filter/sort selection bar (action based).
	 *
	 * @since 1.0.0
	 *
	 * @param string  $template Template file name (without suffix).
	 * @param mixed[] $atts Rendering Attributes.
	 */
	public function render_property_filters_sort( $template = 'property-list/filters-sort', $atts = array() ) {
		if ( ! $template ) {
			$template = 'property-list/filters-sort';
		}

		echo $this->property_filters_sort->render( $template, $atts );
	} // render_property_filters_sort

	/**
	 * Return the rendered property search form (based on the shortcode
	 * [inx-filters-sort]).
	 *
	 * @since 1.0.0
	 *
	 * @param mixed[] $atts Rendering Attributes.
	 *
	 * @return string Rendered shortcode contents.
	 */
	public function shortcode_filters_sort( $atts ) {
		$prefix         = $this->config['public_prefix'];
		$supported_atts = array(
			'elements' => '',
			'exclude'  => '',
			'default'  => '',
		);

		$shortcode_atts = shortcode_atts( $supported_atts, $atts, "{$prefix}filters-sort" );

		return $this->property_filters_sort->render( 'property-list/filters-sort', $shortcode_atts );
	} // shortcode_filters_sort

} // Property_Filters_Sort_Hooks
