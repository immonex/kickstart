<?php
/**
 * Class Property_Search_Hooks
 *
 * @package immonex\Kickstart
 */

namespace immonex\Kickstart;

/**
 * Property related actions and filters.
 */
class Property_Search_Hooks extends Property_Component_Hooks {

	/**
	 * Base name for frontend component instance IDs
	 */
	const FE_COMPONENT_ID_BASENAME = 'inx-property-search';

	/**
	 * Related Property search object
	 *
	 * @var \immonex\Kickstart\Property_Search
	 */
	private $property_search;

	/**
	 * Constructor
	 *
	 * @since 1.0.0
	 *
	 * @param mixed[]  $config Various component configuration data.
	 * @param object[] $utils Helper/Utility objects.
	 */
	public function __construct( $config, $utils ) {
		parent::__construct( $config, $utils );

		$this->property_search = new Property_Search( $config, $utils );

		/**
		 * WP actions and filters
		 */

		add_action( 'pre_get_posts', array( $this, 'adjust_property_frontend_query' ) );

		/**
		 * Plugin-specific actions and filters
		 */

		add_action( 'inx_render_property_search_form', array( $this, 'render_property_search_form' ), 10, 2 );
		add_action( 'inx_render_property_search_form_element', array( $this, 'render_property_search_form_element' ), 10, 3 );

		/**
		 * Shortcodes
		 */

		add_shortcode( 'inx-search-form', array( $this, 'shortcode_search_form' ) );
	} // __construct

	/**
	 * Add names of variables that can be used in frontend related WP queries.
	 *
	 * @since 1.0.0
	 * @deprecated 1.6.4-beta No longer used by internal code and not recommended.
	 *
	 * @param string[] $vars Current list of variable names.
	 *
	 * @return string[] Extended list of variable names.
	 */
	public function add_frontend_query_vars( $vars ) {
		$prefix             = $this->config['public_prefix'];
		$special_query_vars = $this->config['special_query_vars']();

		if ( count( $special_query_vars ) > 0 ) {
			foreach ( $special_query_vars as $var_name ) {
				$vars[] = $var_name;
			}
		}

		$form_elements = $this->property_search->get_search_form_elements();

		if ( count( $form_elements ) > 0 ) {
			foreach ( $form_elements as $id => $element ) {
				$vars[] = $prefix . 'search-' . $id;
			}
		}

		return $vars;
	} // add_frontend_query_vars

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

		$prefix = $this->config['public_prefix'];

		$form_elements = $this->property_search->get_search_form_elements();
		if ( ! is_array( $form_elements ) || 0 === count( $form_elements ) ) {
			return;
		}

		/**
		 * Compile names of query variables to check.
		 */

		$var_names = array();

		// Search form elements.
		foreach ( $form_elements as $id => $element ) {
			$var_names[] = $prefix . 'search-' . $id;
		}

		// Special variables (e.g. reference flag).
		$special_query_vars = $this->config['special_query_vars']();
		if ( count( $special_query_vars ) > 0 ) {
			foreach ( $special_query_vars as $var_name ) {
				$var_names[] = $var_name;
			}
		}

		$var_names = array_unique( $var_names );

		/**
		 * Retrieve query variable values.
		 */

		$search_query_vars = array();

		if ( count( $var_names ) > 0 ) {
			foreach ( $var_names as $var_name ) {
				$value                          = $this->utils['data']->get_query_var_value( $var_name, $query );
				$search_query_vars[ $var_name ] = $value;
			}
		}

		if ( ! empty( $search_query_vars[ $prefix . 'author' ] ) ) {
			$author_query = $this->property_search->get_author_query( $search_query_vars[ $prefix . 'author' ] );

			if ( $author_query ) {
				$query->set( $author_query['type'], $author_query['user_ids'] );
			}
		}

		$tax_and_meta_queries = $this->property_search->get_tax_and_meta_queries( $search_query_vars );

		if ( $tax_and_meta_queries['tax_query'] ) {
			$query->set( 'tax_query', $tax_and_meta_queries['tax_query'] );
		}
		if ( $tax_and_meta_queries['meta_query'] ) {
			$query->set( 'meta_query', $tax_and_meta_queries['meta_query'] );
		}
		if ( $tax_and_meta_queries['geo_query'] ) {
			require_once trailingslashit( $this->config['plugin_dir'] ) . 'lib/gjs-geo-query/gjs-geo-query.php';
			$query->set( 'geo_query', $tax_and_meta_queries['geo_query'] );
			$query->set( 'suppress_filters', false );
		}

		$hard_limit = false;
		if ( isset( $search_query_vars[ $prefix . 'limit' ] ) && (int) $search_query_vars[ $prefix . 'limit' ] ) {
			$hard_limit = (int) $search_query_vars[ $prefix . 'limit' ];
		}

		$page_limit = false;
		if ( isset( $search_query_vars[ $prefix . 'limit-page' ] ) && (int) $search_query_vars[ $prefix . 'limit-page' ] ) {
			$page_limit = (int) $search_query_vars[ $prefix . 'limit-page' ];
		} elseif (
			! empty( $this->config['properties_per_page'] )
			&& ! $query->get( 'posts_per_page' )
		) {
			$page_limit = (int) $this->config['properties_per_page'];
		}

		if ( $hard_limit || $page_limit ) {
			$query->set( 'posts_per_page', $hard_limit ? $hard_limit : $page_limit );
			if ( $hard_limit ) {
				// Disable pagination if a "hard" post number limit is given.
				$query->set( 'no_found_rows', true );
			}
		}
	} // adjust_property_frontend_query

	/**
	 * Display the rendered property search form (action based).
	 *
	 * @since 1.0.0
	 *
	 * @param string  $template Template file name (without suffix).
	 * @param mixed[] $atts Rendering Attributes.
	 */
	public function render_property_search_form( $template = 'property-search', $atts = array() ) {
		if ( ! $template ) {
			$template = 'property-search';
		}

		$atts = array_merge(
			$atts,
			$this->add_rendered_instance( $template, $atts )
		);

		echo $this->property_search->render_form( $template, $atts );
	} // render_property_search_form

	/**
	 * Display a rendered single search form element (action based).
	 *
	 * @since 1.0.0
	 *
	 * @param string  $id Element ID (key).
	 * @param mixed[] $element Element definition/configuration.
	 * @param mixed[] $atts Rendering Attributes.
	 */
	public function render_property_search_form_element( $id, $element, $atts = array() ) {
		echo $this->property_search->render_element( $id, $element, $atts );
	} // render_property_search_form_element

	/**
	 * Display the rendered property search form (based on the shortcode
	 * [inx-search-form]).
	 *
	 * @since 1.0.0
	 *
	 * @param mixed[] $atts Rendering Attributes.
	 *
	 * @return string Rendered shortcode contents.
	 */
	public function shortcode_search_form( $atts ) {
		if ( empty( $atts ) ) {
			$atts = array();
		}

		$prefix                     = $this->config['public_prefix'];
		$query_and_search_var_names = $this->config['special_query_vars']();
		$search_form_elements       = $this->property_search->get_search_form_elements();

		if ( count( $search_form_elements ) > 0 ) {
			foreach ( $search_form_elements as $key => $element ) {
				if ( ! empty( $element['enabled'] ) ) {
					$query_and_search_var_names[] = "{$prefix}search-{$key}";
				}
			}
		}

		/**
		 * Create an array of supported shortcode attributes consisting of all
		 * search form elements (names) as well as special query parameters.
		 * (Default values are not required here.)
		 */
		$supported_atts = array(
			'cid'                         => '',
			'template'                    => Property_Search::DEFAULT_TEMPLATE,
			'dynamic-update'              => '',
			'force-location'              => '',
			'force-type-of-use'           => '',
			'force-property-type'         => '',
			'force-marketing-type'        => '',
			'force-feature'               => '',
			'results-page-id'             => false,
			'elements'                    => '',
			'exclude'                     => '',
			'top-level-only'              => false,
			'autocomplete-countries'      => '',
			'autocomplete-osm-place-tags' => '',
		);
		foreach ( $query_and_search_var_names as $var_name ) {
			$supported_atts[ $var_name ] = '';
		}

		// Add prefixes to user shortcode attributes NOT defined above.
		$prefixed_atts = array();
		if ( is_array( $atts ) && count( $atts ) > 0 ) {
			foreach ( $atts as $key => $value ) {
				if ( in_array( $key, array_keys( $supported_atts ), true ) ) {
					$prefixed_atts[ $key ] = $value;
				} elseif ( in_array( "{$prefix}search-{$key}", $query_and_search_var_names, true ) ) {
					$prefixed_atts[ "{$prefix}search-{$key}" ] = $value;
				} else {
					$prefixed_atts[ "{$prefix}{$key}" ] = $value;
				}
			}
		}
		$shortcode_atts = $this->utils['string']->decode_special_chars(
			shortcode_atts( $supported_atts, $prefixed_atts, "{$prefix}search-form" )
		);
		$template       = ! empty( $shortcode_atts['template'] ) ?
			$shortcode_atts['template'] :
			Property_Search::DEFAULT_TEMPLATE;

		$shortcode_atts = array_merge(
			$shortcode_atts,
			$this->add_rendered_instance( $template, array_filter( $shortcode_atts ) )
		);

		return $this->property_search->render_form( $template, $shortcode_atts );
	} // shortcode_search_form

} // Property_Search_Hooks
