<?php
/**
 * Class Property_List_Hooks
 *
 * @package immonex-kickstart
 */

namespace immonex\Kickstart;

/**
 * Property list related actions, filters and shortcodes.
 */
class Property_List_Hooks {

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
		$this->config        = $config;
		$this->utils         = $utils;
		$this->property_list = new Property_List( $config, $utils );

		/**
		 * WP actions and filters
		 */

		add_filter( 'get_the_archive_title', array( $this, 'modify_property_archive_titles' ) );

		/**
		 * Plugin-specific actions and filters
		 */

		add_action( 'inx_render_property_list', array( $this, 'render_property_list' ), 10 );
		add_action( 'inx_render_pagination', array( $this, 'render_pagination' ), 10 );

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
	 * @param mixed[] $atts Rendering Attributes.
	 */
	public function render_property_list( $atts = array() ) {
		$template = isset( $atts['template'] ) && $atts['template'] ? $atts['template'] : 'property-list/properties';

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
	 * Generate alternative titles for property related archive pages.
	 *
	 * @since 1.0.0
	 *
	 * @param string $title Original title.
	 *
	 * @return string Modified or original title.
	 *
	 * @todo Extend/adjust title for alternative list pages (else block).
	 */
	public function modify_property_archive_titles( $title ) {
		if ( is_post_type_archive() ) {
			$prefix        = $this->config['plugin_prefix'];
			$public_prefix = $this->config['public_prefix'];
			$qo            = get_queried_object();

			if (
				'WP_Post_Type' === get_class( $qo ) &&
				"{$prefix}property" === $qo->name
			) {
				if ( 'only' === get_query_var( "{$public_prefix}references" ) ) {
					return __( 'Successfully marketed properties', 'inx' );
				} else {
					return __( 'Our current property offers', 'inx' );
				}
			}
		}

		return $title;
	} // modify_property_archive_titles

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
		$query_and_search_var_names = $this->config['special_query_vars'];

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
		$supported_atts = array();
		foreach ( $query_and_search_var_names as $var_name ) {
			$supported_atts[ $var_name ] = '';
		}

		// Add prefixes to user shortcode attributes.
		$prefixed_atts = array();
		if ( is_array( $atts ) && count( $atts ) > 0 ) {
			foreach ( $atts as $key => $value ) {
				if ( in_array( "{$prefix}search-{$key}", $query_and_search_var_names ) ) {
					$prefixed_atts[ "{$prefix}search-{$key}" ] = $value;
				} else {
					$prefixed_atts[ "{$prefix}{$key}" ] = $value;
				}
			}
		}
		$shortcode_atts = shortcode_atts( $supported_atts, $prefixed_atts, "{$prefix}property-list" );

		return $this->property_list->render( 'property-list/properties', $shortcode_atts );
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

} // Property_List_Hooks
