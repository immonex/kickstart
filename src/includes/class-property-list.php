<?php
/**
 * Class Property_List
 *
 * @package immonex-kickstart
 */

namespace immonex\Kickstart;

/**
 * Property List Rendering.
 */
class Property_List {

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
	 * Prerendered pagination output
	 *
	 * @var string
	 */
	private $pagination_output = '';

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
	 * Render a property list (PHP template).
	 *
	 * @since 1.0.0
	 *
	 * @param string  $template Template file name (without suffix).
	 * @param mixed[] $atts Rendering attributes.
	 *
	 * @return string Rendered contents (HTML).
	 */
	public function render( $template = 'property-list/properties', $atts = array() ) {
		$org_query = $this->replace_main_query( $atts );

		$template_data = array_merge(
			$this->config,
			$atts
		);
		$output        = $this->utils['template']->render_php_template( $template, $template_data );

		// Prerender pagination output for later use.
		$this->pagination_output = $this->render_pagination( $atts );

		// Restore the original query object.
		if ( $org_query ) {
			$this->restore_main_query( $org_query );
		}

		return $output;
	} // render

	/**
	 * Return the rendered pagination output.
	 *
	 * @since 1.0.0
	 *
	 * @return string Rendered contents (HTML).
	 */
	public function get_rendered_pagination() {
		return $this->pagination_output;
	} // get_rendered_pagination

	/**
	 * Retrieve and return property posts.
	 *
	 * @since 1.0.0
	 *
	 * @param mixed[] $args Additional/Divergent WP query arguments (optional).
	 *
	 * @return \WP_Post[] Matching property post objects (if any).
	 */
	public function get_properties( $args = array() ) {
		$args = array_merge(
			array(
				'post_type'                     => $this->config['property_post_type_name'],
				'post_status'                   => array( 'publish' ),
				'posts_per_page'                => -1,
				'suppress_pre_get_posts_filter' => empty( $args['execute_pre_get_posts_filter'] ),
			),
			$args
		);

		$properties = get_posts( $args );

		return $properties;
	} // get_properties

	/**
	 * Render the property list pagination (PHP template).
	 *
	 * @since 1.0.0
	 *
	 * @param mixed[] $atts Rendering attributes.
	 *
	 * @return string Rendered contents (HTML).
	 */
	private function render_pagination( $atts = array() ) {
		$template = isset( $atts['pagination_template'] ) && $atts['pagination_template'] ? $atts['pagination_template'] : 'property-list/pagination';

		$template_data = array_merge(
			$this->config,
			$atts
		);
		$output        = $this->utils['template']->render_php_template( $template, $template_data );

		return $output;
	} // render_pagination

	/**
	 * Replace and return the current original WP main query before rendering.
	 *
	 * @since 1.0.0
	 *
	 * @param mixed[] $atts Rendering attributes.
	 *
	 * @return \WP_Query Original WP main query object.
	 */
	private function replace_main_query( $atts ) {
		if ( ! empty( $atts['is_regular_archive_page'] ) ) {
			return false;
		}

		global $wp_query;

		$query_vars = array();

		if ( is_archive() ) {
			// Regular page in use for archives: map taxonomy data to search fields.
			$archive_mapping = array(
				'location'       => 'locality',
				'type_of_use'    => 'type-of-use',
				'property_type'  => 'property-type',
				'marketing_type' => 'marketing-type',
				'feature'        => 'feature',
				'label'          => 'label',
			);
			foreach ( $archive_mapping as $tax_base_name => $query_var_base_name ) {
				$tax_query_var = get_query_var( $this->config['plugin_prefix'] . $tax_base_name );
				if ( $tax_query_var ) {
					// Example: inx_property_type (taxonomy term) given > add as
					// "search query var" inx-search-property-type.
					$query_vars[ $this->config['public_prefix'] . 'search-' . $query_var_base_name ] = $tax_query_var;
				}
			}
		}

		// Inherit plugin related variables of main query.
		foreach ( $wp_query->query_vars as $key => $value ) {
			if ( substr( $key, 0, strlen( $this->config['public_prefix'] ) ) === $this->config['public_prefix'] ) {
				$query_vars[ $key ] = $value;
			}
		}

		if ( is_array( $atts ) && count( $atts ) > 0 ) {
			foreach ( $atts as $key => $value ) {
				if ( $value ) {
					$query_vars[ $key ] = $value;
				}
			}
		}

		$paged = get_query_var( 'paged' );
		if ( ! $paged ) {
			$paged = get_query_var( 'page' );
		}
		if ( ! $paged ) {
			$paged = 1;
		}

		$args = array_merge(
			array(
				'post_type'                    => $this->config['property_post_type_name'],
				'post_status'                  => array( 'publish' ),
				'paged'                        => $paged,
				'execute_pre_get_posts_filter' => false,
			),
			$query_vars
		);

		$property_query = new \WP_Query( $args );
		$org_query      = $wp_query;
		$wp_query       = null;
		$wp_query       = $property_query;

		return $org_query;
	} // replace_main_query

	/**
	 * Restore the original WP main query after rendering.
	 *
	 * @since 1.0.0
	 *
	 * @param \WP_Query $org_query Original WP main query object.
	 */
	private function restore_main_query( $org_query ) {
		global $wp_query;

		$wp_query = null;
		$wp_query = $org_query;
		wp_reset_postdata();
	} // restore_main_query

} // Property_List
