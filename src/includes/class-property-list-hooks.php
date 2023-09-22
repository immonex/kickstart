<?php
/**
 * Class Property_List_Hooks
 *
 * @package immonex\Kickstart
 */

namespace immonex\Kickstart;

/**
 * Property list related actions, filters and shortcodes.
 */
class Property_List_Hooks extends Property_Component_Hooks {

	/**
	 * Base name for frontend component instance IDs
	 */
	const FE_COMPONENT_ID_BASENAME = 'inx-property-list';

	/**
	 * Related property list object
	 *
	 * @var \immonex\Kickstart\Property_List
	 */
	private $property_list;

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

		$this->property_list = new Property_List( $config, $utils );

		/**
		 * WP actions and filters
		 */

		add_filter( 'get_the_archive_title', array( $this, 'modify_property_archive_titles' ) );
		add_filter( 'body_class', array( $this, 'maybe_add_body_class' ) );

		if ( ! is_admin() && $this->config['property_list_page_id'] ) {
			add_filter( 'request', array( $this, 'internal_page_rewrite' ), 5 );
		}

		/**
		 * Plugin-specific actions and filters
		 */

		add_action( 'inx_render_property_list', array( $this, 'render_property_list' ) );
		add_action( 'inx_render_pagination', array( $this, 'render_pagination' ) );

		add_filter( 'inx_get_properties', array( $this, 'get_properties' ), 10, 2 );

		/**
		 * Shortcodes
		 */

		add_shortcode( 'inx-property-list', array( $this, 'shortcode_property_list' ) );
		add_shortcode( 'inx-pagination', array( $this, 'shortcode_pagination' ) );
	} // __construct

	/**
	 * Display the rendered property list (action based).
	 *
	 * @since 1.0.0
	 *
	 * @param mixed[] $atts Rendering attributes.
	 */
	public function render_property_list( $atts = array() ) {
		$template = isset( $atts['template'] ) && $atts['template'] ? $atts['template'] : Property_List::DEFAULT_TEMPLATE;

		$atts = array_merge(
			$atts,
			$this->add_rendered_instance( $template, $atts )
		);

		echo $this->property_list->render( $template, $atts );
	} // render_property_list

	/**
	 * Display the rendered property list pagination (action based).
	 *
	 * @since 1.0.0
	 *
	 * @param mixed[] $atts Rendering Attributes.
	 */
	public function render_pagination( $atts = array() ) {
		echo $this->property_list->get_rendered_pagination();
	} // render_pagination

	/**
	 * Retrieve and return property posts or their number (filter callback).
	 *
	 * @since 1.1.0
	 *
	 * @param \WP_Post[] $properties Return array.
	 * @param mixed[]    $args Query arguments.
	 *
	 * @return \WP_Post[]|int Matching property post objects or number
	 *                        of posts only.
	 */
	public function get_properties( $properties = array(), $args = array() ) {
		if ( ! empty( $args['count'] ) ) {
			$count = true;
			unset( $args['count'] );
			$args['fields'] = 'ids';
		} else {
			$count = false;
		}

		$args['execute_pre_get_posts_filter'] = true;

		$properties = $this->property_list->get_properties( $args );

		return $count ? count( $properties ) : $properties;
	} // get_properties

	/**
	 * Generate alternative titles for property related archive pages.
	 *
	 * @since 1.0.0
	 *
	 * @param string $title Original title.
	 *
	 * @return string Modified or original title.
	 */
	public function modify_property_archive_titles( $title ) {
		$qo     = get_queried_object();
		$prefix = $this->config['plugin_prefix'];

		if (
			is_post_type_archive()
			&& 'WP_Post_Type' === get_class( $qo )
			&& "{$prefix}property" === $qo->name
		) {
			$public_prefix = $this->config['public_prefix'];

			if ( 'only' === $this->utils['data']->get_query_var_value( "{$public_prefix}references" ) ) {
				return __( 'Successfully marketed properties', 'immonex-kickstart' );
			} else {
				return __( 'Our current property offers', 'immonex-kickstart' );
			}
		} elseif (
			is_tax()
			&& 'WP_Term' === get_class( $qo )
			&& substr( $qo->taxonomy, 0, 4 ) === $prefix
		) {
			if ( empty( $qo->name ) ) {
				return '';
			}

			switch ( $qo->taxonomy ) {
				case "{$prefix}location":
					return __( 'Properties in', 'immonex-kickstart' ) . ' ' . $qo->name;
				case "{$prefix}feature":
					return __( 'Properties with', 'immonex-kickstart' ) . ' ' . $qo->name;
			}

			return $qo->name;
		}

		return $title;
	} // modify_property_archive_titles

	/**
	 * Add a body class on custom property list pages.
	 *
	 * @since 1.5.5
	 *
	 * @param string[] $classes Original class list.
	 *
	 * @return string[] Extended class list if page ID matches the related
	 *                  plugin option.
	 */
	public function maybe_add_body_class( $classes ) {
		if ( get_the_ID() === (int) $this->config['property_list_page_id'] ) {
			$classes[] = $this->config['plugin_slug'] . '-custom-list-page';
		}

		return $classes;
	} // maybe_add_body_class

	/**
	 * Return a rendered property list (based on the shortcode
	 * [inx-property-list]).
	 *
	 * @since 1.0.0
	 *
	 * @param mixed[] $atts Rendering Attributes.
	 *
	 * @return string Rendered shortcode contents.
	 */
	public function shortcode_property_list( $atts ) {
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
		 * Create an array of supported shortcode attributes consisting of all
		 * search form elements (names) as well as special query parameters.
		 * (Default values are not required here.)
		 */
		$supported_atts = array(
			'cid'                 => '',
			'template'            => Property_List::DEFAULT_TEMPLATE,
			'pagination_template' => Property_List::DEFAULT_PAGINATION_TEMPLATE,
			'disable_links'       => '',
			'no_results_text'     => false,
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
			shortcode_atts( $supported_atts, $prefixed_atts, "{$prefix}property-list" )
		);
		$template       = ! empty( $shortcode_atts['template'] ) ?
			$shortcode_atts['template'] :
			Property_List::DEFAULT_TEMPLATE;

		$shortcode_atts = array_merge(
			$shortcode_atts,
			$this->add_rendered_instance( $template, array_filter( $shortcode_atts ) )
		);

		return $this->property_list->render( $template, $shortcode_atts );
	} // shortcode_property_list

	/**
	 * Return the rendered property list pagination (based on the shortcode
	 * [inx-pagination]).
	 *
	 * @since 1.0.0
	 *
	 * @param mixed[] $atts Rendering Attributes.
	 *
	 * @return string Rendered shortcode contents.
	 */
	public function shortcode_pagination( $atts ) {
		return $this->property_list->get_rendered_pagination();
	} // shortcode_pagination

	/**
	 * "Rewrite" the current request to use the selected property list page
	 * as frame template.
	 *
	 * @since 1.5.10-beta
	 *
	 * @param string[] $request WP Request arguments.
	 *
	 * @return mixed[] Original or modified WP Request arguments.
	 */
	public function internal_page_rewrite( $request ) {
		if (
			isset( $request['post_type'] )
			&& $this->config['property_post_type_name'] === $request['post_type']
			&& empty( $request[ $this->config['property_post_type_name'] ] )
			&& empty( $request['name'] )
		) {
			$list_page = get_page( $this->config['property_list_page_id'] );
			if ( empty( $list_page ) ) {
				return $request;
			}

			$request['page']     = '';
			$request['pagename'] = $list_page->post_name;

			unset( $request['post_type'] );

			return $request;
		}

		return $request;
	} // internal_page_rewrite

} // Property_List_Hooks
