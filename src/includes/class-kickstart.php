<?php
/**
 * Class Kickstart
 *
 * @package immonex-kickstart
 */

namespace immonex\Kickstart;

/**
 * Main plugin class.
 */
class Kickstart extends \immonex\WordPressFreePluginCore\V1_1_0\Base {

	const PLUGIN_NAME                = 'immonex Kickstart';
	const PLUGIN_PREFIX              = 'inx_';
	const PUBLIC_PREFIX              = 'inx-';
	const TEXTDOMAIN                 = 'immonex-kickstart';
	const PLUGIN_VERSION             = '1.1.2';
	const PLUGIN_HOME_URL            = 'https://de.wordpress.org/plugins/immonex-kickstart/';
	const PLUGIN_DOC_URLS            = array(
		'de' => 'https://docs.immonex.de/kickstart/',
	);
	const PLUGIN_SUPPORT_URLS        = array(
		'de' => 'https://wordpress.org/support/plugin/immonex-kickstart/',
	);
	const PLUGIN_DEV_URLS            = array(
		'de' => 'https://github.com/immonex/kickstart',
	);
	const OPTIONS_LINK_MENU_LOCATION = 'inx_menu';
	const PROPERTY_POST_TYPE_NAME    = 'inx_property';

	/**
	 * Plugin options
	 *
	 * @var mixed[]
	 */
	protected $plugin_options = array(
		'plugin_version'                               => self::PLUGIN_VERSION,
		'skin'                                         => 'default',
		'property_list_page_id'                        => 0,
		'property_details_page_id'                     => 0,
		'heading_base_level'                           => 1,
		'area_unit'                                    => 'm²',
		'currency'                                     => 'EUR',
		'currency_symbol'                              => '€',
		'show_reference_prices'                        => false,
		'google_api_key'                               => '',
		'distance_search_autocomplete_type'            => 'photon',
		'distance_search_autocomplete_require_consent' => true,
		'property_details_map_type'                    => 'ol_osm_map_marker',
		'property_details_map_zoom'                    => 12,
		'property_details_map_infowindow_contents'     => 'INSERT_TRANSLATED_DEFAULT_VALUE',
		'property_details_map_note_map_marker'         => '',
		'property_details_map_note_map_embed'          => 'INSERT_TRANSLATED_DEFAULT_VALUE',
		'deferred_tasks'                               => array(),
	);

	/**
	 * List of available property location map types (key => name)
	 *
	 * @var mixed[]
	 */
	private $property_details_map_types = array();

	/**
	 * Property search object
	 *
	 * @var \immonex\Kickstart\Property_Search
	 */
	private $property_search;

	/**
	 * API object
	 *
	 * @var \immonex\Kickstart\API
	 */
	private $api;

	/**
	 * Here we go!
	 *
	 * @since 1.0.0
	 *
	 * @param string $plugin_slug Plugin name slug.
	 */
	public function __construct( $plugin_slug ) {
		$this->bootstrap_data = array(
			'property_post_type_name'     => self::PROPERTY_POST_TYPE_NAME,
			'special_query_vars'          => function () {
				return apply_filters(
					'inx_special_query_vars',
					array(
						self::PUBLIC_PREFIX . 'limit',
						self::PUBLIC_PREFIX . 'limit-page',
						self::PUBLIC_PREFIX . 'sort',
						self::PUBLIC_PREFIX . 'order',
						self::PUBLIC_PREFIX . 'demo',
						self::PUBLIC_PREFIX . 'references',
						self::PUBLIC_PREFIX . 'available',
						self::PUBLIC_PREFIX . 'sold',
						self::PUBLIC_PREFIX . 'reserved',
						self::PUBLIC_PREFIX . 'backlink-url',
						self::PUBLIC_PREFIX . 'iso-country',
						self::PUBLIC_PREFIX . 'author',
						self::PUBLIC_PREFIX . 'ref',
					),
					self::PUBLIC_PREFIX
				);
			},
			'auto_applied_rendering_atts' => array(
				self::PUBLIC_PREFIX . 'ref',
			),
		);

		parent::__construct( $plugin_slug, self::TEXTDOMAIN );

		// Set up custom post types, taxonomies and backend menus.
		new WP_Bootstrap( $this->bootstrap_data, $this );

		// Setup the backend edit form for properties.
		new Property_Backend_Form( $this->bootstrap_data );

		add_filter( "pre_update_option_{$this->plugin_options_name}", array( $this, 'do_before_options_update' ), 10, 2 );

		// Add filters for common rendering attributes.
		add_filter( 'inx_auto_applied_rendering_atts', array( $this, 'get_auto_applied_rendering_atts' ) );
		add_filter( 'inx_apply_auto_rendering_atts', array( $this, 'apply_auto_rendering_atts' ) );
	} // __construct

	/**
	 * Get values/objects from plugin options, bootstrap data, plugin infos
	 * or utils.
	 *
	 * @since 1.0.0
	 *
	 * @param string $key Option/Object name.
	 *
	 * @return mixed Requested Value/Object or false if nonexistent.
	 */
	public function __get( $key ) {
		switch ( $key ) {
			case 'API':
				return $this->api;
		}

		return parent::__get( $key );
	} // __get

	/**
	 * Perform activation tasks.
	 *
	 * @since 1.1.0
	 */
	public function activate_plugin_single_site() {
		parent::activate_plugin_single_site();

		$option_string_translated = false;

		// Set plugin-specific option values that contain content
		// to be translated (only on first activation).
		foreach ( $this->plugin_options as $option_name => $option_value ) {
			if ( 'INSERT_TRANSLATED_DEFAULT_VALUE' === $option_value ) {
				switch ( $option_name ) {
					case 'property_details_map_infowindow_contents':
						$this->plugin_options[ $option_name ] = __( 'The real property location may differ from the marker position.', 'immonex-kickstart' );
						$option_string_translated             = true;
						break;
					case 'property_details_map_note_map_embed':
						$this->plugin_options[ $option_name ] = __( 'The map roughly shows the location in which the property is located.', 'immonex-kickstart' );
						$option_string_translated             = true;
						break;
				}
			}
		}

		if ( $option_string_translated ) {
			update_option( $this->plugin_options_name, $this->plugin_options );
		}

		$this->check_importer();

		update_option( 'rewrite_rules', false );
	} // activate_plugin_single_site

	/**
	 * Initialize the plugin (admin/backend only).
	 *
	 * @since 1.1.0
	 */
	public function init_plugin_admin() {
		parent::init_plugin_admin();

		if ( ! get_option( 'rewrite_rules' ) ) {
			global $wp_rewrite;
			$wp_rewrite->flush_rules( true );
		}
	} // init_plugin_admin

	/**
	 * Perform common initialization tasks.
	 *
	 * @since 1.0.0
	 */
	public function init_plugin() {
		parent::init_plugin();

		// Plugin-specific helper/util objects.
		$this->utils = array_merge(
			$this->utils,
			array(
				'data'   => new Data_Access_Helper( $this->plugin_options, $this->bootstrap_data ),
				'format' => new Format_Helper( $this->plugin_options ),
			)
		);

		$this->distance_search_autocomplete_types = array(
			''              => __( 'none', 'immonex-kickstart' ),
			'photon'        => 'Photon (OpenStreetMap)',
			'google-places' => 'Google Places',
		);

		$this->property_details_map_types = array(
			''                  => __( 'none', 'immonex-kickstart' ),
			'ol_osm_map_marker' => __( 'OpenLayers/OpenStreetMap Map with property location marker', 'immonex-kickstart' ),
			'gmap_marker'       => __( 'Google Map with property location marker', 'immonex-kickstart' ),
			'gmap_embed'        => __( "Google Map showing the property's neighborhood", 'immonex-kickstart' ),
		);

		$component_config = array_merge(
			$this->bootstrap_data,
			array(
				'skin'                                     => $this->plugin_options['skin'],
				'property_list_page_id'                    => $this->plugin_options['property_list_page_id'],
				'property_details_page_id'                 => $this->plugin_options['property_details_page_id'],
				'heading_base_level'                       => $this->plugin_options['heading_base_level'],
				'area_unit'                                => $this->plugin_options['area_unit'],
				'currency'                                 => $this->plugin_options['currency'],
				'currency_symbol'                          => $this->plugin_options['currency_symbol'],
				'show_reference_prices'                    => $this->plugin_options['show_reference_prices'],
				'distance_search_autocomplete_type'        => $this->plugin_options['distance_search_autocomplete_type'],
				'distance_search_autocomplete_require_consent' => $this->plugin_options['distance_search_autocomplete_require_consent'],
				'property_details_map_type'                => $this->plugin_options['property_details_map_type'],
				'property_details_map_zoom'                => $this->plugin_options['property_details_map_zoom'],
				'property_details_map_infowindow_contents' => $this->plugin_options['property_details_map_infowindow_contents'],
				'property_details_map_note_map_marker'     => $this->plugin_options['property_details_map_note_map_marker'],
				'property_details_map_note_map_embed'      => $this->plugin_options['property_details_map_note_map_embed'],
				'google_api_key'                           => $this->plugin_options['google_api_key'],
			)
		);

		// Enable public methods for third-party developments.
		$this->api = new API( $component_config, $this->utils );

		$this->property_search = new Property_Search( $component_config, $this->utils );

		// Register core actions and filters.
		new Property_Hooks( $component_config, $this->utils );
		new Property_List_Hooks( $component_config, $this->utils );
		new Property_Filters_Sort_Hooks( $component_config, $this->utils );
		new Property_Search_Hooks( $component_config, $this->utils );
		new REST_API( $component_config, $this->utils );
		new API_Hooks( $this->api, $component_config, $this->utils );

		$this->perform_deferred_tasks();
	} // init_plugin

	/**
	 * Enqueue and localize backend JavaScript and CSS code (callback).
	 *
	 * @since 1.0.0
	 *
	 * @param string $hook_suffix The current admin page.
	 */
	public function admin_scripts_and_styles( $hook_suffix ) {
		parent::admin_scripts_and_styles( $hook_suffix );

		wp_localize_script(
			$this->backend_js_handle,
			'inx_state',
			array(
				'site_url'   => get_site_url(),
				'rest_nonce' => wp_create_nonce( 'wp_rest' ),
			)
		);
	} // localize_admin_js

	/**
	 * Enqueue and localize frontend scripts and styles.
	 *
	 * @since 1.0.0
	 */
	public function frontend_scripts_and_styles() {
		parent::frontend_scripts_and_styles();

		$search_query_vars = $this->property_search->get_search_query_vars();

		wp_localize_script(
			$this->frontend_base_js_handle,
			'inx_state',
			array(
				'core'          => array(
					'site_url'      => get_site_url(),
					'public_prefix' => $this->bootstrap_data['public_prefix'],
				),
				'search'        => (object) array_merge(
					array( 'number_of_matches' => '' ),
					$search_query_vars
				),
				'vue_instances' => (object) array(),
			)
		);
	} // frontend_scripts_and_styles

	/**
	 * Check if a suitable OpenImmo import plugin is installed.
	 *
	 * @since 1.0.0
	 */
	public function check_importer() {
		$installed_plugins      = array_keys( get_plugins() );
		$oi2wp_main_plugin_file = 'immonex-openimmo2wp/immonex-openimmo2wp.php';

		if ( ! in_array( $oi2wp_main_plugin_file, $installed_plugins ) ) {
			$this->add_deferred_admin_notice(
				wp_sprintf(
					__( 'An <strong>OpenImmo import solution</strong> that supports <strong>immonex Kickstart</strong> is required to provide the real estate offers to be embedded:', 'immonex-kickstart' ) . ' ' .
					/* translators: %s = immonex.dev full URL */
					__( '<strong>immonex OpenImmo2WP</strong> and suitable OpenImmo demo data are available <strong>free of charge for testing and development purposes</strong> at <a href="%s" target="_blank">immonex.dev</a>.', 'immonex-kickstart' ),
					'https://immonex.dev/'
				),
				'info'
			);
		}
	} // check_importer

	/**
	 * Perform special tasks before specific values of the plugin options
	 * are updated.
	 *
	 * @since 1.1.0
	 *
	 * @param mixed[] $new_values Updated option values.
	 * @param mixed[] $old_values Previous option values.
	 *
	 * @return mixed[] Possibly modified option values.
	 */
	public function do_before_options_update( $new_values, $old_values ) {
		if ( $new_values['property_list_page_id'] !== $old_values['property_list_page_id'] ) {
			$new_values['deferred_tasks']['flush_rewrite_rules_once'] = true;
		}

		return $new_values;
	} // do_before_options_update

	/**
	 * Register plugin settings.
	 *
	 * @since 1.0.0
	 */
	public function register_plugin_settings() {
		parent::register_plugin_settings();

		// Tabs (extendable by filter function).
		$tabs = apply_filters(
			// @codingStandardsIgnoreLine
			$this->plugin_slug . '_option_tabs',
			array(
				'tab_general' => array(
					'title'      => __( 'General', 'immonex-kickstart' ),
					'content'    => '',
					'attributes' => array(),
				),
				'tab_geo'     => array(
					'title'      => __( 'Maps &amp; Distance Search', 'immonex-kickstart' ),
					'content'    => '',
					'attributes' => array(),
				),
			)
		);
		foreach ( $tabs as $id => $tab ) {
			$this->settings_helper->add_tab(
				$id,
				$tab['title'],
				isset( $tab['content'] ) ? $tab['content'] : '',
				isset( $tab['attributes'] ) ? $tab['attributes'] : array()
			);
		}

		$pages         = $this->utils['template']->get_page_list();
		$pages_list    = array( __( 'none (use default archive)', 'immonex-kickstart' ) ) + $pages;
		$pages_details = array( __( 'none (use default template)', 'immonex-kickstart' ) ) + $pages;

		// Sections (extendable by filter function).
		$sections = apply_filters(
			// @codingStandardsIgnoreLine
			$this->plugin_slug . '_option_sections',
			array(
				'section_design_structure'     => array(
					'title'       => __( 'Design & Structure', 'immonex-kickstart' ),
					'description' => '',
					'tab'         => 'tab_general',
				),
				'section_units'                => array(
					'title'       => __( 'Measuring Units & Currency', 'immonex-kickstart' ),
					'description' => '',
					'tab'         => 'tab_general',
				),
				'section_distance_search'      => array(
					'title'       => __( 'Distance Search', 'immonex-kickstart' ),
					'description' => __( 'If enabled, the property search form includes a distance search feature.', 'immonex-kickstart' ),
					'tab'         => 'tab_geo',
				),
				'section_property_detail_maps' => array(
					'title'       => __( 'Maps on Property Detail Pages', 'immonex-kickstart' ),
					'description' => __( "This plugin currently supports two types of Maps on the property detail pages: A marker based one showing the property's (approximate) position (OpenStreetMap or Google Map) as well as a Google Embed API version for highlighting the respective district/neighborhood.", 'immonex-kickstart' ),
					'tab'         => 'tab_geo',
				),
				'section_google_maps_api'      => array(
					'title'       => 'Google Maps API',
					'description' => __( 'This plugin <strong>optionally</strong> uses the <strong>Google Maps JavaScript API (incl. Places library)</strong> as well as the <strong>Maps Embed API</strong> (maps, locality autocomplete). Please provide a valid API key in this case.', 'immonex-kickstart' ),
					'tab'         => 'tab_geo',
				),
			)
		);
		foreach ( $sections as $id => $section ) {
			$this->settings_helper->add_section(
				$id,
				isset( $section['title'] ) ? $section['title'] : '',
				isset( $section['description'] ) ? $section['description'] : '',
				$section['tab']
			);
		}

		// Fields (extendable by filter function).
		$fields = apply_filters(
			// @codingStandardsIgnoreLine
			$this->plugin_slug . '_option_fields',
			array(
				array(
					'name'    => 'skin',
					'type'    => 'select',
					'label'   => __( 'Skin', 'immonex-kickstart' ),
					'section' => 'section_design_structure',
					'args'    => array(
						'description' => __( 'A skin is a set of templates for all immonex Kickstart related pages and elements.', 'immonex-kickstart' ),
						'options'     => $this->utils['template']->get_frontend_skins(),
					),
				),
				array(
					'name'    => 'property_list_page_id',
					'type'    => 'select',
					'label'   => __( 'Property Overview', 'immonex-kickstart' ),
					'section' => 'section_design_structure',
					'args'    => array(
						'description' => __( 'Use the specified page as <strong>default</strong> property overview/list page (instead of the property post type archive).', 'immonex-kickstart' ),
						'options'     => $pages_list,
					),
				),
				array(
					'name'    => 'property_details_page_id',
					'type'    => 'select',
					'label'   => __( 'Property Details Page', 'immonex-kickstart' ),
					'section' => 'section_design_structure',
					'args'    => array(
						'description' => __( 'Use the specified page as base for displaying the property details (instead of the default template).', 'immonex-kickstart' ),
						'options'     => $pages_details,
					),
				),
				array(
					'name'    => 'heading_base_level',
					'type'    => 'select',
					'label'   => __( 'Heading Base Level', 'immonex-kickstart' ),
					'section' => 'section_design_structure',
					'args'    => array(
						'description' => __( 'Level that immonex related headlines (e.g. on property list and detail pages) should start with.', 'immonex-kickstart' ),
						'options'     => array(
							1 => 'H1',
							2 => 'H2',
							3 => 'H3',
						),
					),
				),
				array(
					'name'    => 'area_unit',
					'type'    => 'text',
					'label'   => __( 'Area Measuring Unit', 'immonex-kickstart' ),
					'section' => 'section_units',
					'args'    => array(
						'description' => '',
						'class'       => 'small-text',
						'max_length'  => 8,
					),
				),
				array(
					'name'    => 'currency',
					'type'    => 'text',
					'label'   => __( 'Currency Code', 'immonex-kickstart' ),
					'section' => 'section_units',
					'args'    => array(
						'description' => '',
						'class'       => 'small-text',
						'max_length'  => 3,
					),
				),
				array(
					'name'    => 'currency_symbol',
					'type'    => 'text',
					'label'   => __( 'Currency Symbol', 'immonex-kickstart' ),
					'section' => 'section_units',
					'args'    => array(
						'description' => '',
						'class'       => 'small-text',
					),
				),
				array(
					'name'    => 'show_reference_prices',
					'type'    => 'checkbox',
					'label'   => __( 'Show Reference Prices', 'immonex-kickstart' ),
					'section' => 'section_units',
					'args'    => array(
						'description' => __( 'Activate this option if the prices of reference properties shall be displayed.', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'distance_search_autocomplete_type',
					'type'    => 'select',
					'label'   => __( 'Autocompletion', 'immonex-kickstart' ),
					'section' => 'section_distance_search',
					'args'    => array(
						'description' => __( 'Select the autocomplete solution to use for the distance search in property search forms (none = disable distance search).', 'immonex-kickstart' ) . '<br>' .
							__( 'For the <strong>Google Places</strong> based variant, providing an appropriate API key is required (see Google Maps API section below).', 'immonex-kickstart' ),
						'options'     => $this->distance_search_autocomplete_types,
					),
				),
				array(
					'name'    => 'distance_search_autocomplete_require_consent',
					'type'    => 'checkbox',
					'label'   => __( 'Require Usage Consent', 'immonex-kickstart' ),
					'section' => 'section_distance_search',
					'args'    => array(
						'description' => __( 'If active, the user has to confirm the use of an external service for auto-completion.', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'property_details_map_type',
					'type'    => 'select',
					'label'   => __( 'Map Type', 'immonex-kickstart' ),
					'section' => 'section_property_detail_maps',
					'args'    => array(
						'description' => __( 'Select the type of map to be displayed on property detail pages (none = disable map).', 'immonex-kickstart' ) . '<br>' .
							__( 'For the <strong>Google Maps</strong> based variants, providing an appropriate API key is required (see Google Maps API section below).', 'immonex-kickstart' ),
						'options'     => $this->property_details_map_types,
					),
				),
				array(
					'name'    => 'property_details_map_zoom',
					'type'    => 'text',
					'label'   => __( 'Default Map Zoom Level', 'immonex-kickstart' ),
					'section' => 'section_property_detail_maps',
					'args'    => array(
						'description' => '',
						'class'       => 'small-text',
						'force_type'  => 'int',
						'min'         => 8,
						'max'         => 18,
					),
				),
				array(
					'name'    => 'property_details_map_infowindow_contents',
					'type'    => 'text',
					'label'   => __( 'Info Window Note', 'immonex-kickstart' ),
					'section' => 'section_property_detail_maps',
					'args'    => array(
						'description' => __( 'If stated, this note gets displayed within a map info window above the property location marker.', 'immonex-kickstart' ),
						'class'       => 'large-text',
					),
				),
				array(
					'name'    => 'property_details_map_note_map_marker',
					'type'    => 'text',
					'label'   => __( 'Marker Map Note', 'immonex-kickstart' ),
					'section' => 'section_property_detail_maps',
					'args'    => array(
						'description' => __( 'This note gets displayed below <strong>marker based</strong> maps.', 'immonex-kickstart' ),
						'class'       => 'large-text',
					),
				),
				array(
					'name'    => 'property_details_map_note_map_embed',
					'type'    => 'text',
					'label'   => __( 'Neighborhood Map Note', 'immonex-kickstart' ),
					'section' => 'section_property_detail_maps',
					'args'    => array(
						'description' => __( 'This note gets displayed below <strong>neighborhood based</strong> maps.', 'immonex-kickstart' ),
						'class'       => 'large-text',
					),
				),
				array(
					'name'    => 'google_api_key',
					'type'    => 'text',
					'label'   => __( 'Google Maps API Key', 'immonex-kickstart' ),
					'section' => 'section_google_maps_api',
					'args'    => array(
						'description' => wp_sprintf(
							/* translators: %s = Google Developer Docs URL */
							__( 'Provide an key suitable for using the Google APIs mentioned abobe. You can find information about getting and configuring such a key on the respective <a href="%s" target="_blank">Google Developers page</a>. <strong>(Maps JavaScript, Places and Embed APIs have to be activated for the related project!)</strong>', 'immonex-kickstart' ),
							'https://developers.google.com/maps/documentation/javascript/get-api-key'
						),
					),
				),
			)
		);

		foreach ( $fields as $field ) {
			$args = array(
				'value' => isset( $this->plugin_options[ $field['name'] ] ) ? $this->plugin_options[ $field['name'] ] : '',
			);
			if ( isset( $field['args'] ) ) {
				$args = array_merge( $args, $field['args'] );
			}

			$this->settings_helper->add_field(
				$field['name'],
				$field['type'],
				$field['label'],
				$field['section'],
				$args
			);
		}
	} // register_plugin_settings

	/**
	 * Return the names of common rendering attributes (filter callback).
	 *
	 * @since 1.1.0
	 *
	 * @param mixed[] $atts Rendering attribute names.
	 *
	 * @return mixed[] Possibly modified attribute name array.
	 */
	public function get_auto_applied_rendering_atts( $atts ) {
		return array_merge(
			$atts,
			$this->bootstrap_data['auto_applied_rendering_atts']
		);
	} // get_auto_applied_rendering_atts

	/**
	 * Automatically add common rendering attributes if not set already (filter callback).
	 *
	 * @since 1.1.0
	 *
	 * @param mixed[] $atts Rendering attributes.
	 *
	 * @return mixed[] Possibly extended attribute array.
	 */
	public function apply_auto_rendering_atts( $atts = array() ) {
		if ( ! $atts ) {
			$atts = array();
		}

		$auto_atts = apply_filters( 'inx_auto_applied_rendering_atts', array() );

		if ( ! empty( $auto_atts ) ) {
			foreach ( $auto_atts as $var_name ) {
				if ( ! isset( $atts[ $var_name ] ) ) {
					$atts[ $var_name ] = $this->utils['data']->get_query_var_value( $var_name );
				}
			}
		}

		return $atts;
	} // apply_auto_rendering_atts

	/**
	 * Perform special deferred tasks defined in the plugin options.
	 *
	 * @since 1.1.0
	 */
	private function perform_deferred_tasks() {
		if ( empty( $this->plugin_options['deferred_tasks'] ) ) {
			return;
		}

		if ( is_array( $this->plugin_options['deferred_tasks'] ) ) {
			$options_changed = false;

			foreach ( $this->plugin_options['deferred_tasks'] as $task => $data ) {
				switch ( $task ) {
					case 'flush_rewrite_rules_once':
						flush_rewrite_rules();
						unset( $this->plugin_options['deferred_tasks'][ $task ] );
						$options_changed = true;
						break;
				}
			}

			if ( $options_changed ) {
				update_option( $this->plugin_options_name, $this->plugin_options );
			}
		}
	} // perform_deferred_tasks

} // class Kickstart
