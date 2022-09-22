<?php
/**
 * Class Property_Component_Hooks
 *
 * @package immonex\Kickstart
 */

namespace immonex\Kickstart;

/**
 * Base class for property related frontend component actions, filters and shortcodes.
 */
abstract class Property_Component_Hooks {

	/**
	 * Various component configuration data
	 *
	 * @var mixed[]
	 */
	protected $config;

	/**
	 * Helper/Utility objects
	 *
	 * @var object[]
	 */
	protected $utils;

	/**
	 * Registry of rendered component instance data
	 *
	 * @var mixed[]
	 */
	protected $rendered_instances = array();

	/**
	 * Constructor
	 *
	 * @since 1.6.0
	 *
	 * @param mixed[]  $config Various component configuration data.
	 * @param object[] $utils Helper/Utility objects.
	 */
	public function __construct( $config, $utils ) {
		$this->config = $config;
		$this->utils  = $utils;

		/**
		 * WP actions and filters
		 */

		add_action( 'wp_print_footer_scripts', array( $this, 'add_rendering_state_vars' ), 0 );

		add_filter( 'paginate_links', array( $this, 'remove_query_args' ) );
	} // __construct

	/**
	 * Add an inline script element with data of rendered frontend component instances.
	 *
	 * @since 1.6.0
	 */
	public function add_rendering_state_vars() {
		$js_handle = $this->config['public_prefix'] . 'frontend';

		if ( ! empty( $this->rendered_instances ) ) {
			wp_add_inline_script(
				$js_handle,
				'inx_state.renderedInstances = { ...inx_state.renderedInstances, ...' . wp_json_encode( $this->rendered_instances ) . ' }'
			);
		}
	} // add_rendering_state_vars

	/**
	 * Remove unnecessary parameters from pagination links.
	 *
	 * @since 1.6.0
	 *
	 * @param string $link Pagination link.
	 *
	 * @return string Cleaned link.
	 */
	public function remove_query_args( $link ) {
		$args_found = preg_match_all( '/inx-r-[a-z_-]+|inx-backlink-url/', $link, $exclude_args );
		if ( ! $args_found ) {
			return $link;
		}

		return trim( remove_query_arg( $exclude_args[0], $link ), '?' );
	} // remove_query_args

	/**
	 * Add data of a rendered component instance to the registry.
	 *
	 * @since 1.6.0
	 *
	 * @param string  $template Template file name (without suffix).
	 * @param mixed[] $atts Rendering Attributes.
	 *
	 * @return mixed[] Frontend component ID and current number of rendered components.
	 */
	protected function add_rendered_instance( $template, $atts = array() ) {
		global $wp_query;

		if ( ! empty( $atts['no_frontend_instance'] ) ) {
			return;
		}

		$component_id = ! empty( $atts['cid'] ) ? $this->utils['string']->slugify( $atts['cid'] ) : '';

		if ( ! $component_id ) {
			$component_id = static::FE_COMPONENT_ID_BASENAME;
			if ( count( $this->rendered_instances ) > 0 ) {
				$component_id .= '-' . ( count( $this->rendered_instances ) + 1 );
			}
		}

		$atts = array_merge(
			array(
				'cid'      => $component_id,
				'template' => $template,
				'base_url' => trailingslashit( $this->utils['string']->get_nopaging_url() ) . '%_%',
			),
			$atts
		);

		$this->rendered_instances[ $component_id ] = $atts;

		return array(
			'cid'          => $component_id,
			'render_count' => count( $this->rendered_instances ),
		);
	} // add_rendered_instance

} // Property_Component_Hooks
