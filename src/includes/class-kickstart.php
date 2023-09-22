<?php
/**
 * Class Kickstart
 *
 * @package immonex\Kickstart
 */

namespace immonex\Kickstart;

/**
 * Main plugin class.
 */
class Kickstart extends \immonex\WordPressFreePluginCore\V1_8_21\Base {

	const PLUGIN_NAME                = 'immonex Kickstart';
	const PLUGIN_PREFIX              = 'inx_';
	const PUBLIC_PREFIX              = 'inx-';
	const TEXTDOMAIN                 = 'immonex-kickstart';
	const PLUGIN_VERSION             = '1.8.0';
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
		'properties_per_page'                          => 0,
		'property_details_page_id'                     => 0,
		'apply_wpautop_details_page'                   => false,
		'heading_base_level'                           => 1,
		'enable_ken_burns_effect'                      => true,
		'area_unit'                                    => 'm²',
		'currency'                                     => 'EUR',
		'currency_symbol'                              => '€',
		'show_reference_prices'                        => false,
		'reference_price_text'                         => 'INSERT_TRANSLATED_DEFAULT_VALUE',
		'enable_contact_section_for_references'        => false,
		'show_seller_commission'                       => false,
		'property_search_dynamic_update'               => false,
		'property_search_no_results_text'              => 'INSERT_TRANSLATED_DEFAULT_VALUE',
		'property_post_type_slug_rewrite'              => 'INSERT_TRANSLATED_DEFAULT_VALUE',
		'tax_location_slug_rewrite'                    => 'INSERT_TRANSLATED_DEFAULT_VALUE',
		'tax_type_of_use_slug_rewrite'                 => 'INSERT_TRANSLATED_DEFAULT_VALUE',
		'tax_property_type_slug_rewrite'               => 'INSERT_TRANSLATED_DEFAULT_VALUE',
		'tax_marketing_type_slug_rewrite'              => 'INSERT_TRANSLATED_DEFAULT_VALUE',
		'tax_feature_slug_rewrite'                     => 'INSERT_TRANSLATED_DEFAULT_VALUE',
		'tax_label_slug_rewrite'                       => 'INSERT_TRANSLATED_DEFAULT_VALUE',
		'tax_project_slug_rewrite'                     => 'INSERT_TRANSLATED_DEFAULT_VALUE',
		'google_api_key'                               => '',
		'distance_search_autocomplete_type'            => 'photon',
		'distance_search_autocomplete_require_consent' => true,
		'maps_require_consent'                         => true,
		'property_list_map_display_by_default'         => true,
		'property_list_map_lat'                        => 49.8587840,
		'property_list_map_lng'                        => 6.7854410,
		'property_list_map_zoom'                       => 12,
		'property_list_map_auto_fit'                   => true,
		'property_details_map_type'                    => 'ol_osm_map_marker',
		'property_details_map_zoom'                    => 12,
		'property_details_map_infowindow_contents'     => 'INSERT_TRANSLATED_DEFAULT_VALUE',
		'property_details_map_note_map_marker'         => '',
		'property_details_map_note_map_embed'          => 'INSERT_TRANSLATED_DEFAULT_VALUE',
		'deferred_tasks'                               => array(),
	);

	/**
	 * Distance search autocomplete types
	 *
	 * @var mixed[]
	 */
	private $distance_search_autocomplete_types;

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
	 * OpenImmo2WP compatibility object
	 *
	 * @var \immonex\Kickstart\OpenImmo2WP_Compat
	 */
	private $oi2wp_compat;

	/**
	 * Default values of custom fields that must be available for every
	 * property post.
	 *
	 * @var mixed[]
	 */
	private $required_property_custom_field_defaults = array(
		'_immonex_is_available'        => 1,
		'_immonex_is_reserved'         => 0,
		'_immonex_is_sold'             => 0,
		'_immonex_is_reference'        => 0,
		'_immonex_is_demo'             => 0,
		'_immonex_is_featured'         => 0,
		'_immonex_is_front_page_offer' => 0,
		'_immonex_group_master'        => '',
	);

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
						self::PUBLIC_PREFIX . 'references',
						self::PUBLIC_PREFIX . 'masters',
						self::PUBLIC_PREFIX . 'available',
						self::PUBLIC_PREFIX . 'sold',
						self::PUBLIC_PREFIX . 'reserved',
						self::PUBLIC_PREFIX . 'featured',
						self::PUBLIC_PREFIX . 'front-page-offer',
						self::PUBLIC_PREFIX . 'demo',
						self::PUBLIC_PREFIX . 'backlink-url',
						self::PUBLIC_PREFIX . 'iso-country',
						self::PUBLIC_PREFIX . 'author',
						self::PUBLIC_PREFIX . 'ref',
						self::PUBLIC_PREFIX . 'force-lang',
					),
					self::PUBLIC_PREFIX
				);
			},
			'auto_applied_rendering_atts' => array(
				self::PUBLIC_PREFIX . 'ref',
				self::PUBLIC_PREFIX . 'force-lang',
			),
			'required_prop_cf_defaults'   => $this->required_property_custom_field_defaults,
		);

		parent::__construct( $plugin_slug, self::TEXTDOMAIN );

		// Set up custom post types, taxonomies and backend menus.
		new WP_Bootstrap( $this->bootstrap_data, $this );

		// Setup the backend edit form for properties.
		new Property_Backend_Form( $this->bootstrap_data );

		// Add filters for common rendering attributes.
		add_filter( 'inx_auto_applied_rendering_atts', array( $this, 'get_auto_applied_rendering_atts' ) );
		add_filter( 'inx_apply_auto_rendering_atts', array( $this, 'apply_auto_rendering_atts' ) );

		// Add a compatibility layer for older versions of immonex OpenImmo2WP.
		$this->oi2wp_compat = new OpenImmo2WP_Compat( $this->bootstrap_data );
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
			case 'property_list_page_id':
			case 'property_details_page_id':
				$lang = isset( $_GET[ self::PUBLIC_PREFIX . 'force-lang' ] ) ?
					// @codingStandardsIgnoreLine
					strtolower( substr( wp_sanitize_key( wp_unslash( $_GET[ self::PUBLIC_PREFIX . 'force-lang' ] ) ), 0, 2 ) ) :
					false;
				return apply_filters( 'inx_element_translation_id', parent::__get( $key ), 'page', $lang );
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
			if ( is_string( $option_value ) && 'INSERT_TRANSLATED_DEFAULT_VALUE' === strtoupper( $option_value ) ) {
				switch ( $option_name ) {
					case 'reference_price_text':
						$this->plugin_options[ $option_name ] = __( 'Price on demand', 'immonex-kickstart' );
						$option_string_translated             = true;
						break;
					case 'property_search_no_results_text':
						$this->plugin_options[ $option_name ] = __( 'Currently there are no properties that match the search criteria.', 'immonex-kickstart' );
						$option_string_translated             = true;
						break;
					case 'property_details_map_infowindow_contents':
						$this->plugin_options[ $option_name ] = __( 'The real property location may differ from the marker position.', 'immonex-kickstart' );
						$option_string_translated             = true;
						break;
					case 'property_details_map_note_map_embed':
						$this->plugin_options[ $option_name ] = __( 'The map roughly shows the location in which the property is located.', 'immonex-kickstart' );
						$option_string_translated             = true;
						break;
					case 'property_post_type_slug_rewrite':
						$this->plugin_options[ $option_name ] = _x( 'properties', 'Custom Post Type Slug (plural only!)', 'immonex-kickstart' );
						$option_string_translated             = true;
						break;
					case 'tax_location_slug_rewrite':
						$this->plugin_options[ $option_name ] = _x( 'properties/location', 'Custom Taxonomy Slug', 'immonex-kickstart' );
						$option_string_translated             = true;
						break;
					case 'tax_type_of_use_slug_rewrite':
						$this->plugin_options[ $option_name ] = _x( 'properties/type-of-use', 'Custom Taxonomy Slug', 'immonex-kickstart' );
						$option_string_translated             = true;
						break;
					case 'tax_property_type_slug_rewrite':
						$this->plugin_options[ $option_name ] = _x( 'properties/type', 'Custom Taxonomy Slug', 'immonex-kickstart' );
						$option_string_translated             = true;
						break;
					case 'tax_marketing_type_slug_rewrite':
						$this->plugin_options[ $option_name ] = _x( 'properties/buy-rent', 'Custom Taxonomy Slug', 'immonex-kickstart' );
						$option_string_translated             = true;
						break;
					case 'tax_feature_slug_rewrite':
						$this->plugin_options[ $option_name ] = _x( 'properties/feature', 'Custom Taxonomy Slug', 'immonex-kickstart' );
						$option_string_translated             = true;
						break;
					case 'tax_label_slug_rewrite':
						$this->plugin_options[ $option_name ] = _x( 'properties/label', 'Custom Taxonomy Slug', 'immonex-kickstart' );
						$option_string_translated             = true;
						break;
					case 'tax_project_slug_rewrite':
						$this->plugin_options[ $option_name ] = _x( 'properties/project', 'Custom Taxonomy Slug', 'immonex-kickstart' );
						$option_string_translated             = true;
						break;
				}
			}
		}

		if ( empty( $this->plugin_options['properties_per_page'] ) ) {
			$this->plugin_options['properties_per_page'] = get_option( 'posts_per_page' );
		}

		if ( $option_string_translated ) {
			update_option( $this->plugin_options_name, $this->plugin_options );
		}

		$this->check_importer();
		$this->oi2wp_compat->check_property_posts();

		update_option( 'rewrite_rules', false );
	} // activate_plugin_single_site

	/**
	 * Initialize the plugin (admin/backend only).
	 *
	 * @since 1.1.0
	 *
	 * @param bool $fire_before_hook Flag to indicate if an action hook should fire
	 *                               before the actual method execution (optional,
	 *                               true by default).
	 * @param bool $fire_after_hook  Flag to indicate if an action hook should fire
	 *                               after the actual method execution (optional,
	 *                               true by default).
	 */
	public function init_plugin_admin( $fire_before_hook = true, $fire_after_hook = true ) {
		parent::init_plugin_admin( $fire_before_hook, $fire_after_hook );

		if ( ! get_option( 'rewrite_rules' ) ) {
			global $wp_rewrite;
			$wp_rewrite->flush_rules( true );
		}

		if (
			isset( $_GET['page'] ) &&
			isset( $_GET['maint'] ) &&
			"{$this->plugin_slug}_settings" === $_GET['page'] &&
			current_user_can( 'activate_plugins' )
		) {
			switch ( $_GET['maint'] ) {
				case 'reactivate':
					$this->activate_plugin();
					$this->add_admin_notice( 'Reactivated!' );
					break;
			}
		}
	} // init_plugin_admin

	/**
	 * Perform common initialization tasks.
	 *
	 * @since 1.0.0
	 *
	 * @param bool $fire_before_hook Flag to indicate if an action hook should fire
	 *                               before the actual method execution (optional,
	 *                               true by default).
	 * @param bool $fire_after_hook  Flag to indicate if an action hook should fire
	 *                               after the actual method execution (optional,
	 *                               true by default).
	 */
	public function init_plugin( $fire_before_hook = true, $fire_after_hook = true ) {
		parent::init_plugin( $fire_before_hook, $fire_after_hook );
		// Plugin-specific helper/util objects.
		$this->utils = array_merge(
			$this->utils,
			array(
				'data'   => new Data_Access_Helper( $this->plugin_options, $this->bootstrap_data ),
				'format' => new Format_Helper( $this->plugin_options ),
				'query'  => new Query_Helper( $this->plugin_options ),
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
				'properties_per_page'                      => $this->plugin_options['properties_per_page'],
				'property_details_page_id'                 => $this->plugin_options['property_details_page_id'],
				'apply_wpautop_details_page'               => $this->plugin_options['apply_wpautop_details_page'],
				'heading_base_level'                       => $this->plugin_options['heading_base_level'],
				'enable_ken_burns_effect'                  => $this->plugin_options['enable_ken_burns_effect'],
				'area_unit'                                => $this->plugin_options['area_unit'],
				'currency'                                 => $this->plugin_options['currency'],
				'currency_symbol'                          => $this->plugin_options['currency_symbol'],
				'show_reference_prices'                    => $this->plugin_options['show_reference_prices'],
				'reference_price_text'                     => $this->plugin_options['reference_price_text'],
				'property_search_dynamic_update'           => $this->plugin_options['property_search_dynamic_update'],
				'property_search_no_results_text'          => $this->plugin_options['property_search_no_results_text'],
				'enable_contact_section_for_references'    => $this->plugin_options['enable_contact_section_for_references'],
				'show_seller_commission'                   => $this->plugin_options['show_seller_commission'],
				'distance_search_autocomplete_type'        => $this->plugin_options['distance_search_autocomplete_type'],
				'distance_search_autocomplete_require_consent' => $this->plugin_options['distance_search_autocomplete_require_consent'],
				'maps_require_consent'                     => $this->plugin_options['maps_require_consent'],
				'property_list_map_display_by_default'     => $this->plugin_options['property_list_map_display_by_default'],
				'property_list_map_lat'                    => $this->plugin_options['property_list_map_lat'],
				'property_list_map_lng'                    => $this->plugin_options['property_list_map_lng'],
				'property_list_map_zoom'                   => $this->plugin_options['property_list_map_zoom'],
				'property_list_map_auto_fit'               => $this->plugin_options['property_list_map_auto_fit'],
				'property_details_map_type'                => $this->plugin_options['property_details_map_type'],
				'property_details_map_zoom'                => $this->plugin_options['property_details_map_zoom'],
				'property_details_map_infowindow_contents' => $this->plugin_options['property_details_map_infowindow_contents'],
				'property_details_map_note_map_marker'     => $this->plugin_options['property_details_map_note_map_marker'],
				'property_details_map_note_map_embed'      => $this->plugin_options['property_details_map_note_map_embed'],
				'google_api_key'                           => $this->plugin_options['google_api_key'],
				'required_property_custom_field_defaults'  => $this->required_property_custom_field_defaults,
			)
		);

		// Enable public methods for third-party developments.
		$this->api = new API( $component_config, $this->utils );

		$this->property_search = new Property_Search( $component_config, $this->utils );

		// Register core actions and filters.
		new Property_Hooks( $component_config, $this->utils );
		new Property_List_Hooks( $component_config, $this->utils );
		new Property_Map_Hooks( $component_config, $this->utils );
		new Property_Filters_Sort_Hooks( $component_config, $this->utils );
		new Property_Search_Hooks( $component_config, $this->utils );
		new REST_API( $component_config, $this->utils );
		new API_Hooks( $this->api, $component_config, $this->utils );

		// Create translation-related compatibility instances (Polylang or WPML).
		if (
			is_plugin_active( 'polylang/polylang.php' ) ||
			is_plugin_active( 'polylang-pro/polylang.php' )
		) {
			new Polylang_Compat( $component_config, $this->utils );
		}
		if ( is_plugin_active( 'sitepress-multilingual-cms/sitepress.php' ) ) {
			new WPML_Compat( $component_config, $this->utils );
		}

		add_filter( "pre_update_option_{$this->plugin_options_name}", array( $this, 'do_before_options_update' ), 10, 2 );

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
				'site_url'      => get_site_url(),
				'rest_base_url' => get_rest_url(),
				'rest_nonce'    => wp_create_nonce( 'wp_rest' ),
			)
		);
	} // admin_scripts_and_styles

	/**
	 * Enqueue and localize frontend scripts and styles.
	 *
	 * @since 1.0.0
	 */
	public function frontend_scripts_and_styles() {
		parent::frontend_scripts_and_styles();

		$search_query_vars = $this->property_search->get_search_query_vars();

		$inx_state = apply_filters(
			'inx_js_state_vars',
			array(
				'core'          => array(
					'site_url'      => get_site_url(),
					'rest_base_url' => get_rest_url(),
					'public_prefix' => $this->bootstrap_data['public_prefix'],
					'locale'        => get_locale(),
				),
				'search'        => (object) array_merge(
					array(
						/**
						 * DEPRECATED: The number of matches is also included in forms sub array
						 * (allows multiple forms), but remains as copy (containing the value of
						 * the first form) for compatibility reasons.
						 */
						'number_of_matches'   => '',
						'forms'               => array(),
						'form_debounce_delay' => (int) apply_filters( 'inx_search_form_debounce_delay', Property_Search::DEFAULT_SEARCH_FORM_DEBOUNCE_DELAY ),
					),
					$search_query_vars
				),
				'vue_instances' => (object) array(),
			),
			'frontend'
		);

		wp_localize_script(
			$this->frontend_base_js_handle,
			'inx_state',
			$inx_state
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

		if ( ! in_array( $oi2wp_main_plugin_file, $installed_plugins, true ) ) {
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
		if ( ! is_array( $new_values ) || ! is_array( $old_values ) ) {
			return array();
		}

		foreach ( $new_values as $key => $value ) {
			if ( '_slug_rewrite' === substr( $key, -13 ) ) {
				$slug_segments = explode( '/', $value );
				foreach ( $slug_segments as $i => $segment ) {
					$slug_segments[ $i ] = $this->utils['string']->slugify( $segment );
				}
				$new_values[ $key ] = untrailingslashit(
					implode( 'property_post_type_slug_rewrite' === $key ? '-' : '/', $slug_segments )
				);
				if ( ! empty( $new_values[ $key ] ) && '/' === $new_values[ $key ][0] ) {
					$new_values[ $key ] = substr( $new_values[ $key ], 1 );
				}
			}

			if (
				'property_list_page_id' === $key ||
				(
					'_slug_rewrite' === substr( $key, -13 ) &&
					(
						! isset( $old_values[ $key ] ) ||
						(
							isset( $old_values[ $key ] ) &&
							$new_values[ $key ] !== $old_values[ $key ]
						)
					)
				)
			) {
				$new_values['deferred_tasks']['flush_rewrite_rules_once'] = true;
			}
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
				'tab_general'         => array(
					'title'      => __( 'General', 'immonex-kickstart' ),
					'content'    => '',
					'attributes' => array(
						'tabbed_sections' => true,
					),
				),
				'tab_property_search' => array(
					'title'      => __( 'Property Search', 'immonex-kickstart' ),
					'content'    => '',
					'attributes' => array(),
				),
				'tab_geo'             => array(
					'title'      => __( 'Maps &amp; Distance Search', 'immonex-kickstart' ),
					'content'    => '',
					'attributes' => array(
						'tabbed_sections' => true,
					),
				),
				'tab_slugs'           => array(
					'title'      => __( 'Slugs', 'immonex-kickstart' ),
					'content'    => '',
					'attributes' => array(
						'tabbed_sections' => true,
					),
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

		$pages = apply_filters(
			'inx_page_list_all_languages',
			$this->utils['template']->get_page_list(
				array(
					'post_status' => array( 'publish', 'private' ),
					'lang'        => '',
				)
			)
		);

		if ( count( $pages ) > 0 ) {
			foreach ( $pages as $page_id => $page_title ) {
				$page_lang = apply_filters( 'inx_element_language', '', $page_id, 'page' );

				$pages[ $page_id ] = wp_sprintf(
					'%s [%s%s]',
					$page_title,
					$page_id,
					$page_lang ? ', ' . $page_lang : ''
				);
			}
		}
		$pages_list    = array(
			0  => __( 'none (use default template)', 'immonex-kickstart' ),
			-1 => __( 'none (use theme template)', 'immonex-kickstart' ),
		) + $pages;
		$pages_details = array(
			0  => __( 'none (use default template)', 'immonex-kickstart' ),
			-1 => __( 'none (use theme template)', 'immonex-kickstart' ),
		) + $pages;

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
				'section_references'           => array(
					'title'       => __( 'Reference Properties', 'immonex-kickstart' ),
					'description' => '',
					'tab'         => 'tab_general',
				),
				'section_prices'               => array(
					'title'       => __( 'Prices', 'immonex-kickstart' ),
					'description' => '',
					'tab'         => 'tab_general',
				),
				'section_property_search'      => array(
					'title'       => '',
					'description' => '',
					'tab'         => 'tab_property_search',
				),
				'section_distance_search'      => array(
					'title'       => __( 'Distance Search', 'immonex-kickstart' ),
					'description' => __( 'If enabled, the property search form includes a distance search feature.', 'immonex-kickstart' ),
					'tab'         => 'tab_geo',
				),
				'section_property_list_maps'   => array(
					'title'       => __( 'Maps on Property List Pages', 'immonex-kickstart' ),
					'description' => wp_sprintf(
						// translators: %1$s = OpenStreetMap URL, %2$s = OpenLayers URL.
						__( 'Maps on property list pages are rendered using <a href="%1$s" target="_blank">OpenStreetMap</a> and <a href="%2$s" target="_blank">OpenLayers</a>. Center and zoom level are usually determined automatically based on the property markers included. Initial values can be entered in the following fields.', 'immonex-kickstart' ),
						'https://www.openstreetmap.org/',
						'https://openlayers.org/'
					),
					'tab'         => 'tab_geo',
				),
				'section_property_detail_maps' => array(
					'title'       => __( 'Maps on Property Detail Pages', 'immonex-kickstart' ),
					'description' => __( "This plugin currently supports two types of Maps on the property detail pages: A marker based one showing the property's (approximate) position (OpenStreetMap or Google Map) as well as a Google Embed API version for highlighting the respective district/neighborhood.", 'immonex-kickstart' ),
					'tab'         => 'tab_geo',
				),
				'section_google_maps_api'      => array(
					'title'       => 'Google Maps API',
					'description' => wp_sprintf(
						'%s<br><br>%s',
						__( 'This plugin <strong>optionally</strong> uses the <strong>Google Maps JavaScript API (incl. Places library)</strong> as well as the <strong>Maps Embed API</strong> (maps, locality autocomplete). Please provide a valid API key in this case.', 'immonex-kickstart' ),
						wp_sprintf(
							// translators: %1$s = Detail Maps Tab JS, %2$s = Overview Maps Tab JS.
							__( '<strong>Please note!</strong> <em>Google Maps</em> are currently only available in <a href="%1$s">property detail pages</a>, overview maps in <a href="%2$s">list views</a> are generally <em>OpenStreetMap-based</em>.', 'immonex-kickstart' ),
							'javascript:setActiveSectionTab(3)',
							'javascript:setActiveSectionTab(2)'
						)
					),
					'tab'         => 'tab_geo',
				),
				'section_geo_user_consent'     => array(
					'title'       => __( 'User Consent', 'immonex-kickstart' ),
					'description' => __( 'Here it can be determined for which external geospatial services the users have to give consent before these are being embedding in the website frontend. (Consent to one service applies to all geo services.)', 'immonex-kickstart' ),
					'tab'         => 'tab_geo',
				),
				'section_post_type_slugs'      => array(
					'title'       => __( 'Post Type', 'immonex-kickstart' ),
					'description' => wp_sprintf(
						/* translators: %1$s = Polylang Pro URL, %2$s = WPML URL */
						__( 'The following <strong>rewrite slugs</strong> are used for creating "SEO friendly" permalinks for property/agency/agent archive and detail pages, e.g. <strong>domain.tld/properties/</strong> or <strong>domain.tld/properties/a-really-maniac-mansion/</strong>. In multilingual enviroments using <a href="%1$s" target="_blank">Polylang Pro</a> or <a href="%2$s" target="_blank">WPML</a>, these slugs can be translated with the corresponding <em>string translation</em> functionality.', 'immonex-kickstart' ),
						'https://polylang.pro/downloads/polylang-pro/',
						'https://wpml.org/'
					),
					'tab'         => 'tab_slugs',
				),
				'section_taxonomy_slugs'       => array(
					'title'       => __( 'Taxonomies', 'immonex-kickstart' ),
					'description' => __( 'Taxonomy archive pages have their own <strong>rewrite slugs</strong> that may contain slashes. In most cases a combination of the post type slug above and the taxonomy name makes the most sense, e.g. <strong>properties/type</strong> will make the permalink URLs look like <strong>domain.tld/properties/type/flats/</strong>. The following slugs should be entered in the <strong>main language</strong> of the website, too.', 'immonex-kickstart' ),
					'tab'         => 'tab_slugs',
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
					'name'    => 'properties_per_page',
					'type'    => 'number',
					'label'   => __( 'Properties per Page', 'immonex-kickstart' ),
					'section' => 'section_design_structure',
					'args'    => array(
						'description'      => __( '<strong>Default</strong> number of properties to display <strong>per page</strong> in list views', 'immonex-kickstart' ),
						'class'            => 'small-text',
						'min'              => 1,
						'default_if_empty' => get_option( 'posts_per_page' ),
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
					'name'    => 'apply_wpautop_details_page',
					'type'    => 'checkbox',
					'label'   => __( 'Apply wpautop', 'immonex-kickstart' ),
					'section' => 'section_design_structure',
					'args'    => array(
						'description' => __( 'Activate to add new lines and paragraphs in description texts on detail pages automatically (<em>wpautop</em>).', 'immonex-kickstart' ),
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
					'name'    => 'enable_ken_burns_effect',
					'type'    => 'checkbox',
					'label'   => __( 'Enable Ken Burns Effect', 'immonex-kickstart' ),
					'section' => 'section_design_structure',
					'args'    => array(
						'description' => __( 'Enable animations ("Ken Burns Effect") in the <strong>primary</strong> photo gallery of the property detail pages, if supported by the skin.', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'area_unit',
					'type'    => 'text',
					'label'   => __( 'Area Measuring Unit', 'immonex-kickstart' ),
					'section' => 'section_units',
					'args'    => array(
						'description'      => '',
						'class'            => 'small-text',
						'max_length'       => 8,
						'default_if_empty' => 'm²',
					),
				),
				array(
					'name'    => 'currency',
					'type'    => 'text',
					'label'   => __( 'Currency Code', 'immonex-kickstart' ),
					'section' => 'section_units',
					'args'    => array(
						'description'      => '',
						'class'            => 'small-text',
						'max_length'       => 3,
						'default_if_empty' => 'EUR',
					),
				),
				array(
					'name'    => 'currency_symbol',
					'type'    => 'text',
					'label'   => __( 'Currency Symbol', 'immonex-kickstart' ),
					'section' => 'section_units',
					'args'    => array(
						'description'      => '',
						'class'            => 'small-text',
						'max_length'       => 1,
						'default_if_empty' => '€',
					),
				),
				array(
					'name'    => 'show_reference_prices',
					'type'    => 'checkbox',
					'label'   => __( 'Show Reference Prices', 'immonex-kickstart' ),
					'section' => 'section_references',
					'args'    => array(
						'description' => __( 'Activate this option if the prices of reference properties should be displayed.', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'reference_price_text',
					'type'    => 'text',
					'label'   => __( 'Reference Price Text', 'immonex-kickstart' ),
					'section' => 'section_references',
					'args'    => array(
						'description' => __( 'This text is displayed if reference prices should <strong>not</strong> be published.', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'enable_contact_section_for_references',
					'type'    => 'checkbox',
					'label'   => __( 'Show Contact Section', 'immonex-kickstart' ),
					'section' => 'section_references',
					'args'    => array(
						'description' => wp_sprintf(
							/* translators: %s = Kickstart Team URL (WP Plugin Repository) */
							__( 'Activate this option if the contact section (including agent information and form if the <a href="%s" target="_blank">Team Add-on</a> is installed) should be displayed on <strong>reference property detail pages</strong>.', 'immonex-kickstart' ),
							'https://wordpress.org/plugins/immonex-kickstart-team/'
						),
					),
				),
				array(
					'name'    => 'show_seller_commission',
					'type'    => 'checkbox',
					'label'   => __( 'Show Seller/Internal Commission', 'immonex-kickstart' ),
					'section' => 'section_prices',
					'args'    => array(
						'description' => __( 'Activate this option if the seller commission (inner commission) should be displayed on property detail pages.', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'property_search_dynamic_update',
					'type'    => 'checkbox',
					'label'   => __( 'Dynamic Update', 'immonex-kickstart' ),
					'section' => 'section_property_search',
					'args'    => array(
						'description' => __( 'If activated, property lists and location maps on the same page are dynamically updated when the search parameters change.', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'property_search_no_results_text',
					'type'    => 'text',
					'label'   => __( 'No Results Message', 'immonex-kickstart' ),
					'section' => 'section_property_search',
					'args'    => array(
						'description' => __( 'This message is displayed when a property search returns no results.', 'immonex-kickstart' ),
						'class'       => 'large-text',
					),
				),
				array(
					'name'    => 'distance_search_autocomplete_type',
					'type'    => 'select',
					'label'   => __( 'Autocompletion', 'immonex-kickstart' ),
					'section' => 'section_distance_search',
					'args'    => array(
						'description' => __( 'Select the autocomplete solution to use for the distance search in property search forms (none = disable distance search).', 'immonex-kickstart' ) . '<br>' .
							__( 'For the <strong>Google Places</strong> based variant, providing an appropriate API key is required (see Google Maps API tab).', 'immonex-kickstart' ),
						'options'     => $this->distance_search_autocomplete_types,
					),
				),
				array(
					'name'    => 'property_list_map_display_by_default',
					'type'    => 'checkbox',
					'label'   => __( 'Display in Lists/Archive', 'immonex-kickstart' ),
					'section' => 'section_property_list_maps',
					'args'    => array(
						'description' => __( 'If active, the property marker map will be shown in the <strong>default list (archive)</strong> pages.', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'property_list_map_lat',
					'type'    => 'text',
					'label'   => __( 'Default Latitude', 'immonex-kickstart' ),
					'section' => 'section_property_list_maps',
					'args'    => array(
						'description' => __( 'Initial <strong>map center</strong> latitude (-90 to 90), e.g. 49.8587840.', 'immonex-kickstart' ),
						'class'       => 'medium-text',
						'min'         => -90.0,
						'max'         => 90.0,
					),
				),
				array(
					'name'    => 'property_list_map_lng',
					'type'    => 'text',
					'label'   => __( 'Default Longitude', 'immonex-kickstart' ),
					'section' => 'section_property_list_maps',
					'args'    => array(
						'description' => __( 'Initial <strong>map center</strong> longitude (-180 to 180), e.g. 6.7854410.', 'immonex-kickstart' ),
						'class'       => 'medium-text',
						'min'         => -180.0,
						'max'         => 180.0,
					),
				),
				array(
					'name'    => 'property_list_map_zoom',
					'type'    => 'number',
					'label'   => __( 'Default Zoom Level', 'immonex-kickstart' ),
					'section' => 'section_property_list_maps',
					'args'    => array(
						'description' => __( '2 to 18', 'immonex-kickstart' ),
						'class'       => 'small-text',
						'min'         => 2,
						'max'         => 18,
					),
				),
				array(
					'name'    => 'property_list_map_auto_fit',
					'type'    => 'checkbox',
					'label'   => __( 'Auto-Fit Map Bounds', 'immonex-kickstart' ),
					'section' => 'section_property_list_maps',
					'args'    => array(
						'description' => __( 'Automatically set map bounds and zoom level to include all property location markers.', 'immonex-kickstart' ),
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
					'type'    => 'number',
					'label'   => __( 'Default Zoom Level', 'immonex-kickstart' ),
					'section' => 'section_property_detail_maps',
					'args'    => array(
						'description' => __( '8 to 18', 'immonex-kickstart' ),
						'class'       => 'small-text',
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
				array(
					'name'    => 'maps_require_consent',
					'type'    => 'checkbox',
					'label'   => __( 'Embedded Maps', 'immonex-kickstart' ),
					'section' => 'section_geo_user_consent',
					'args'    => array(
						'description' => __( 'This consent applies to Google and OpenStreetMap based maps on property list and detail pages.', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'distance_search_autocomplete_require_consent',
					'type'    => 'checkbox',
					'label'   => __( 'Location Autocompletion', 'immonex-kickstart' ),
					'section' => 'section_geo_user_consent',
					'args'    => array(
						'description' => __( 'An external location autocompletion service is used in the property search form (radius/distance search).', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'property_post_type_slug_rewrite',
					'type'    => 'text',
					'label'   => __( 'Property', 'immonex-kickstart' ),
					'section' => 'section_post_type_slugs',
					'args'    => array(
						'description' => __( 'This should be a single term in its plural form and in the site\'s <strong>main language</strong> (usually <strong>properties</strong>). If empty, <em>inx_property</em> will be used as base slug.', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'tax_location_slug_rewrite',
					'type'    => 'text',
					'label'   => __( 'Locality', 'immonex-kickstart' ),
					'section' => 'section_taxonomy_slugs',
					'args'    => array(
						'description' => __( '<strong>properties/location</strong> by default, <em>inx_location</em> if empty', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'tax_type_of_use_slug_rewrite',
					'type'    => 'text',
					'label'   => __( 'Type of Use', 'immonex-kickstart' ),
					'section' => 'section_taxonomy_slugs',
					'args'    => array(
						'description' => __( '<strong>properties/type-of-use</strong> by default, <em>inx_type_of_use</em> if empty', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'tax_property_type_slug_rewrite',
					'type'    => 'text',
					'label'   => __( 'Property Type', 'immonex-kickstart' ),
					'section' => 'section_taxonomy_slugs',
					'args'    => array(
						'description' => __( '<strong>properties/type</strong> by default, <em>inx_property_type</em> if empty', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'tax_marketing_type_slug_rewrite',
					'type'    => 'text',
					'label'   => __( 'Marketing Type', 'immonex-kickstart' ),
					'section' => 'section_taxonomy_slugs',
					'args'    => array(
						'description' => __( '<strong>properties/buy-rent</strong> by default, <em>inx_marketing_type</em> if empty', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'tax_feature_slug_rewrite',
					'type'    => 'text',
					'label'   => __( 'Feature', 'immonex-kickstart' ),
					'section' => 'section_taxonomy_slugs',
					'args'    => array(
						'description' => __( '<strong>properties/feature</strong> by default, <em>inx_feature</em> if empty', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'tax_label_slug_rewrite',
					'type'    => 'text',
					'label'   => __( 'Label', 'immonex-kickstart' ),
					'section' => 'section_taxonomy_slugs',
					'args'    => array(
						'description' => __( '<strong>properties/label</strong> by default, <em>inx_label</em> if empty', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'tax_project_slug_rewrite',
					'type'    => 'text',
					'label'   => __( 'Project', 'immonex-kickstart' ),
					'section' => 'section_taxonomy_slugs',
					'args'    => array(
						'description' => __( '<strong>properties/project</strong> by default, <em>inx_project</em> if empty', 'immonex-kickstart' ),
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
