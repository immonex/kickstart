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
class Kickstart extends \immonex\WordPressFreePluginCore\V1_0_0\Base {

	const PLUGIN_NAME                = 'immonex Kickstart';
	const PLUGIN_PREFIX              = 'inx_';
	const PUBLIC_PREFIX              = 'inx-';
	const TEXTDOMAIN                 = 'inx';
	const PLUGIN_VERSION             = '1.0.0';
	const PLUGIN_HOME_URL            = 'https://wordpress.org/plugins/immonex-kickstart';
	const PLUGIN_DOC_URLS            = array(
		'de' => 'https://docs.immonex.de/kickstart',
	);
	const PLUGIN_SUPPORT_URLS        = array(
		'de' => 'https://wordpress.org/support/plugin/immonex-kickstart',
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
		'property_details_map_note_map_marker'         => 'INSERT_TRANSLATED_DEFAULT_VALUE',
		'property_details_map_note_map_embed'          => 'INSERT_TRANSLATED_DEFAULT_VALUE',
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
			'property_post_type_name' => self::PROPERTY_POST_TYPE_NAME,
			'special_query_vars'      => array(
				self::PUBLIC_PREFIX . 'limit',
				self::PUBLIC_PREFIX . 'limit-page',
				self::PUBLIC_PREFIX . 'sort',
				self::PUBLIC_PREFIX . 'references',
				self::PUBLIC_PREFIX . 'available',
				self::PUBLIC_PREFIX . 'sold',
				self::PUBLIC_PREFIX . 'reserved',
				self::PUBLIC_PREFIX . 'backlink-url',
				self::PUBLIC_PREFIX . 'iso-country',
			),
		);

		parent::__construct( $plugin_slug, self::TEXTDOMAIN );

		// Set up custom post types, taxonomies and backend menus.
		new WP_Bootstrap( $this->bootstrap_data, $this );

		// Setup the backend edit form for properties.
		new Property_Backend_Form( $this->bootstrap_data );
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
	 * @since 1.0.0
	 */
	public function activate_plugin() {
		parent::activate_plugin();

		$option_string_translated = false;

		// Set plugin-specific option values that contain content
		// to be translated (only on first activation).
		foreach ( $this->plugin_options as $option_name => $option_value ) {
			if ( 'INSERT_TRANSLATED_DEFAULT_VALUE' === $option_value ) {
				switch ( $option_name ) {
					case 'property_details_map_infowindow_contents':
						$this->plugin_options[ $option_name ] = __( 'The real property location may differ from the marker position.', 'inx' );
						$option_string_translated             = true;
						break;
					case 'property_details_map_note_map_embed':
						$this->plugin_options[ $option_name ] = __( 'The map roughly shows the location in which the property is located.', 'inx' );
						$option_string_translated             = true;
						break;
				}
			}
		}

		if ( $option_string_translated ) {
			update_option( $this->plugin_options_name, $this->plugin_options );
		}

		$this->check_importer();
	} // activate_plugin

	/**
	 * Perform common initialization tasks.
	 *
	 * @since 1.0.0
	 */
	public function init_plugin() {
		// Plugin-specific helper/util objects.
		$this->utils = array(
			'data'   => new Data_Access_Helper( $this->plugin_options ),
			'format' => new Format_Helper( $this->plugin_options ),
		);

		parent::init_plugin();

		$this->distance_search_autocomplete_types = array(
			''              => __( 'none', 'inx' ),
			'photon'        => 'Photon (OpenStreetMap)',
			'google-places' => 'Google Places',
		);

		$this->property_details_map_types = array(
			''                  => __( 'none', 'inx' ),
			'ol_osm_map_marker' => __( 'OpenLayers/OpenStreetMap Map with property location marker', 'inx' ),
			'gmap_marker'       => __( 'Google Map with property location marker', 'inx' ),
			'gmap_embed'        => __( "Google Map showing the property's neighborhood", 'inx' ),
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
	} // init_plugin

	/**
	 * Enqueue and localize backend JavaScript and CSS code (callback).
	 *
	 * @since 1.0.0
	 *
	 * @param string $hook_suffix The current admin page..
	 */
	public function admin_scripts_and_styles( $hook_suffix ) {
		parent::admin_scripts_and_styles( $hook_suffix );

		wp_localize_script(
			$this->backend_js_handle,
			'inx_state',
			array(
				'site_url' => get_site_url(),
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
					__( 'An <strong>OpenImmo import solution</strong> that supports <strong>immonex Kickstart</strong> is required to provide the real estate offers to be embedded:', 'inx' ) . ' ' .
					/* translators: %s = immonex.dev full URL */
					__( '<strong>immonex OpenImmo2WP</strong> and suitable OpenImmo demo data are available <strong>free of charge for testing and development purposes</strong> at <a href="%s" target="_blank">immonex.dev</a>', 'inx' ),
					'https://immonex.dev/'
				),
				'info'
			);
		}
	} // check_importer

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
					'title'      => __( 'General', 'inx' ),
					'content'    => '',
					'attributes' => array(),
				),
				'tab_geo'     => array(
					'title'      => __( 'Maps &amp; Distance Search', 'inx' ),
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
		$pages_list    = array( __( 'none (use default archive)', 'inx' ) ) + $pages;
		$pages_details = array( __( 'none (use default template)', 'inx' ) ) + $pages;

		// Sections (extendable by filter function).
		$sections = apply_filters(
			// @codingStandardsIgnoreLine
			$this->plugin_slug . '_option_sections',
			array(
				'section_design_structure'     => array(
					'title'       => __( 'Design & Structure', 'inx' ),
					'description' => '',
					'tab'         => 'tab_general',
				),
				'section_units'                => array(
					'title'       => __( 'Measuring Units & Currency', 'inx' ),
					'description' => '',
					'tab'         => 'tab_general',
				),
				'section_distance_search'      => array(
					'title'       => __( 'Distance Search', 'inx' ),
					'description' => __( 'If enabled, the property search form includes a distance search feature.', 'inx' ),
					'tab'         => 'tab_geo',
				),
				'section_property_detail_maps' => array(
					'title'       => __( 'Maps on Property Detail Pages', 'inx' ),
					'description' => __( "This plugin currently supports two types of Maps on the property detail pages: A marker based one showing the property's (approximate) position (OpenStreetMap or Google Map) as well as a Google Embed API version for highlighting the respective district/neighborhood.", 'inx' ),
					'tab'         => 'tab_geo',
				),
				'section_google_maps_api'      => array(
					'title'       => 'Google Maps API',
					'description' => __( 'This plugin <strong>optionally</strong> uses the <strong>Google Maps JavaScript API (incl. Places library)</strong> as well as the <strong>Maps Embed API</strong> (maps, locality autocomplete). Please provide a valid API key in this case.', 'inx' ),
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
					'label'   => __( 'Skin', 'inx' ),
					'section' => 'section_design_structure',
					'args'    => array(
						'description' => __( 'A skin is a set of templates for all immonex Kickstart related pages and elements.', 'inx' ),
						'options'     => $this->utils['template']->get_frontend_skins(),
					),
				),
				array(
					'name'    => 'property_list_page_id',
					'type'    => 'select',
					'label'   => __( 'Property Overview', 'inx' ),
					'section' => 'section_design_structure',
					'args'    => array(
						'description' => __( 'Use the specified page as <strong>default</strong> property overview/list page (instead of the property post type archive).', 'inx' ),
						'options'     => $pages_list,
					),
				),
				array(
					'name'    => 'property_details_page_id',
					'type'    => 'select',
					'label'   => __( 'Property Details Page', 'inx' ),
					'section' => 'section_design_structure',
					'args'    => array(
						'description' => __( 'Use the specified page as base for displaying the property details (instead of the default template).', 'inx' ),
						'options'     => $pages_details,
					),
				),
				array(
					'name'    => 'heading_base_level',
					'type'    => 'select',
					'label'   => __( 'Heading Base Level', 'inx' ),
					'section' => 'section_design_structure',
					'args'    => array(
						'description' => __( 'Level that immonex related headlines (e.g. on property list and detail pages) should start with.', 'inx' ),
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
					'label'   => __( 'Area Measuring Unit', 'inx' ),
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
					'label'   => __( 'Currency Code', 'inx' ),
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
					'label'   => __( 'Currency Symbol', 'inx' ),
					'section' => 'section_units',
					'args'    => array(
						'description' => '',
						'class'       => 'small-text',
					),
				),
				array(
					'name'    => 'show_reference_prices',
					'type'    => 'checkbox',
					'label'   => __( 'Show Reference Prices', 'inx' ),
					'section' => 'section_units',
					'args'    => array(
						'description' => __( 'Activate this option if the prices of reference properties shall be displayed.', 'inx' ),
					),
				),
				array(
					'name'    => 'distance_search_autocomplete_type',
					'type'    => 'select',
					'label'   => __( 'Autocompletion', 'inx' ),
					'section' => 'section_distance_search',
					'args'    => array(
						'description' => __( 'Select the autocomplete solution to use for the distance search in property search forms (none = disable distance search).', 'inx' ) . '<br>' .
							__( 'For the <strong>Google Places</strong> based variant, providing an appropriate API key is required (see Google Maps API section below).', 'inx' ),
						'options'     => $this->distance_search_autocomplete_types,
					),
				),
				array(
					'name'    => 'distance_search_autocomplete_require_consent',
					'type'    => 'checkbox',
					'label'   => __( 'Require Usage Consent', 'inx' ),
					'section' => 'section_distance_search',
					'args'    => array(
						'description' => __( 'If active, the user has to confirm the use of an external service for auto-completion.', 'inx' ),
					),
				),
				array(
					'name'    => 'property_details_map_type',
					'type'    => 'select',
					'label'   => __( 'Map Type', 'inx' ),
					'section' => 'section_property_detail_maps',
					'args'    => array(
						'description' => __( 'Select the type of map to be displayed on property detail pages (none = disable map).', 'inx' ) . '<br>' .
							__( 'For the <strong>Google Maps</strong> based variants, providing an appropriate API key is required (see Google Maps API section below).', 'inx' ),
						'options'     => $this->property_details_map_types,
					),
				),
				array(
					'name'    => 'property_details_map_zoom',
					'type'    => 'text',
					'label'   => __( 'Default Map Zoom Level', 'inx' ),
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
					'label'   => __( 'Info Window Note', 'inx' ),
					'section' => 'section_property_detail_maps',
					'args'    => array(
						'description' => __( 'If stated, this note gets displayed within a map info window above the property location marker.', 'inx' ),
						'class'       => 'large-text',
					),
				),
				array(
					'name'    => 'property_details_map_note_map_marker',
					'type'    => 'text',
					'label'   => __( 'Marker Map Note', 'inx' ),
					'section' => 'section_property_detail_maps',
					'args'    => array(
						'description' => __( 'This note gets displayed below <strong>marker based</strong> maps.', 'inx' ),
						'class'       => 'large-text',
					),
				),
				array(
					'name'    => 'property_details_map_note_map_embed',
					'type'    => 'text',
					'label'   => __( 'Neighborhood Map Note', 'inx' ),
					'section' => 'section_property_detail_maps',
					'args'    => array(
						'description' => __( 'This note gets displayed below <strong>neighborhood based</strong> maps.', 'inx' ),
						'class'       => 'large-text',
					),
				),
				array(
					'name'    => 'google_api_key',
					'type'    => 'text',
					'label'   => __( 'Google Maps API Key', 'inx' ),
					'section' => 'section_google_maps_api',
					'args'    => array(
						'description' => wp_sprintf(
							/* translators: %s = Google Developer Docs URL */
							__( 'Provide an key suitable for using the Google APIs mentioned abobe. You can find information about getting and configuring such a key on the respective <a href="%s" target="_blank">Google Developers page</a>. <strong>(Maps JavaScript, Places and Embed APIs have to be activated for the related project!)</strong>', 'inx' ),
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

} // class Kickstart
