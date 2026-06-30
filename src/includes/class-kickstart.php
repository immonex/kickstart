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
class Kickstart extends \immonex\WordPressFreePluginCore\V2_13_0\Base {

	const PLUGIN_NAME                = 'immonex Kickstart';
	const PLUGIN_PREFIX              = 'inx_';
	const PUBLIC_PREFIX              = 'inx-';
	const PLUGIN_VERSION             = '1.17.8';
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
	const SHARING_PROTOCOLS          = array( 'generic', 'open_graph', 'x' );
	const DEFAULT_COLORS             = array(
		'label_default'           => '#d1ab78',
		'marketing_type_sale'     => '#584990',
		'marketing_type_rent'     => '#ba5a3d',
		'marketing_type_leasing'  => '#e78b00',
		'action_element'          => '#0a65bc',
		'action_element_inverted' => '#fbfbfb',
		'text_inverted_default'   => '#f8f8f8',
		'demo'                    => '#6d115f',
		'bg_muted_default'        => '#dcdcdc',
	);

	/**
	 * Plugin options
	 *
	 * @var mixed[]
	 */
	protected $plugin_options = array(
		'plugin_version'                               => self::PLUGIN_VERSION,
		'skin'                                         => 'default',
		'heading_base_level'                           => 1,
		'company_name'                                 => '',
		'company_address'                              => '',
		'area_unit'                                    => 'm²',
		'currency'                                     => 'EUR',
		'currency_symbol'                              => '€',
		'default_mail_admin_recipients'                => '',
		'default_mail_sender_name'                     => '',
		'default_mail_sender_email'                    => '',
		'default_mail_as_html'                         => true,
		'default_mail_logo_id'                         => '',
		'default_mail_logo_position'                   => 'top_center',
		'default_mail_signature'                       => '{{ default_signature }}',
		'spam_prot_enable_honeypot'                    => true,
		'spam_prot_time_threshold'                     => Withdrawal_Form::TS_CHECK_THRESHOLD,
		'spam_prot_enable_turnstile'                   => false,
		'color_label_default'                          => self::DEFAULT_COLORS['label_default'],
		'color_marketing_type_sale'                    => self::DEFAULT_COLORS['marketing_type_sale'],
		'color_marketing_type_rent'                    => self::DEFAULT_COLORS['marketing_type_rent'],
		'color_marketing_type_leasing'                 => self::DEFAULT_COLORS['marketing_type_leasing'],
		'color_action_element'                         => self::DEFAULT_COLORS['action_element'],
		'color_action_element_inverted'                => self::DEFAULT_COLORS['action_element_inverted'],
		'color_text_inverted_default'                  => self::DEFAULT_COLORS['text_inverted_default'],
		'color_demo'                                   => self::DEFAULT_COLORS['demo'],
		'color_gradients'                              => true,
		'color_bg_muted_default'                       => self::DEFAULT_COLORS['bg_muted_default'],
		'muted_color_opacity_pct'                      => 45,
		'show_reference_prices'                        => false,
		'reference_price_text'                         => 'INSERT_TRANSLATED_DEFAULT_VALUE',
		'enable_contact_section_for_references'        => false,
		'property_details_page_id'                     => 0,
		'post_nav'                                     => Property::DEFAULT_POST_NAV,
		'apply_wpautop_details_page'                   => false,
		'details_link_conversion'                      => 'incl_email',
		'show_seller_commission'                       => false,
		'disable_detail_view_states'                   => array(),
		'enable_gallery_image_links'                   => true,
		'enable_gallery_lazy_loading'                  => true,
		'gallery_image_slider_bg_color'                => '#F0F0F0',
		'gallery_image_slider_min_height'              => 240,
		'gallery_image_max_height'                     => 800,
		'lightbox_animation'                           => '',
		'lightbox_nav'                                 => '',
		'enable_lightbox_counter'                      => false,
		'enable_lightbox_caption'                      => true,
		'enable_ken_burns_effect'                      => true,
		'ken_burns_effect_display_mode'                => 'full_center',
		'ken_burns_effect_min_image_width'             => 800,
		'property_search_dynamic_update'               => true,
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
		'turnstile_sitekey'                            => '',
		'turnstile_secret_key'                         => '',
		'turnstile_consent_note'                       => 'INSERT_TRANSLATED_DEFAULT_VALUE',
		'distance_search_autocomplete_type'            => 'photon',
		'distance_search_autocomplete_require_consent' => true,
		'maps_require_consent'                         => true,
		'videos_require_consent'                       => true,
		'virtual_tours_require_consent'                => true,
		'property_list_page_id'                        => 0,
		'properties_per_page'                          => 0,
		'property_list_map_type'                       => 'osm_german',
		'property_list_map_lat'                        => 49.8587840,
		'property_list_map_lng'                        => 6.7854410,
		'property_list_map_zoom'                       => Property_Map::LIST_MAP_ZOOM[2],
		'property_list_map_auto_fit'                   => true,
		'property_details_map_type'                    => 'ol_osm_map_german',
		'property_details_map_zoom'                    => Property::LOCATION_MAP_ZOOM[2],
		'property_details_map_infowindow_contents'     => 'INSERT_TRANSLATED_DEFAULT_VALUE',
		'property_details_map_note_map_marker'         => '',
		'property_details_map_note_map_embed'          => 'INSERT_TRANSLATED_DEFAULT_VALUE',
		'seo_schema_org'                               => true,
		'sharing_open_graph'                           => true,
		'sharing_x'                                    => true,
		'sharing_max_images'                           => 10,
		'sharing_tag_insert_mode'                      => 'extend',
		'performance_enable_property_cache'            => true,
		'performance_enable_map_marker_cache'          => true,
		'performance_max_db_cache_size'                => 32,
		'enable_withdrawal_processing'                 => false,
		'withdrawal_form_introtext'                    => 'INSERT_TRANSLATED_DEFAULT_VALUE',
		'withdrawal_form_privacy_consent_text'         => 'INSERT_TRANSLATED_DEFAULT_VALUE',
		'withdrawal_form_submission_conf_msg'          => 'INSERT_TRANSLATED_DEFAULT_VALUE',
		'withdrawal_form_confirmation_page'            => '',
		'withdrawal_admin_notif_subject'               => 'INSERT_TRANSLATED_DEFAULT_VALUE',
		'withdrawal_admin_notif_template'              => 'INSERT_TRANSLATED_DEFAULT_VALUE',
		'withdrawal_rcpt_conf_subject'                 => 'INSERT_TRANSLATED_DEFAULT_VALUE',
		'withdrawal_rcpt_conf_template'                => 'INSERT_TRANSLATED_DEFAULT_VALUE',
		'deferred_tasks'                               => array(),
	);

	/**
	 * Distance Search Autocomplete Types
	 *
	 * @var mixed[]
	 */
	private $distance_search_autocomplete_types;

	/**
	 * List of available Property List Map Types (key => name)
	 *
	 * @var mixed[]
	 */
	private $property_list_map_types = array();

	/**
	 * List of available Property Location Map Types (key => name)
	 *
	 * @var mixed[]
	 */
	private $property_details_map_types = array();

	/**
	 * Property Search Hooks Instance
	 *
	 * @var \immonex\Kickstart\Property_Search_Hooks
	 */
	private $property_search_hooks;

	/**
	 * Property Search Instance
	 *
	 * @var \immonex\Kickstart\Property_Search
	 */
	private $property_search;

	/**
	 * API Instance
	 *
	 * @var \immonex\Kickstart\API
	 */
	private $api;

	/**
	 * Legacy Compatibility Instance
	 *
	 * @var \immonex\Kickstart\Legacy_Compat
	 */
	private $legacy_compat;

	/**
	 * OpenImmo2WP Compatibility Instance
	 *
	 * @var \immonex\Kickstart\OpenImmo2WP_Compat
	 */
	private $oi2wp_compat;

	/**
	 * User Consent Instance
	 *
	 * @var \immonex\Kickstart\User_Consent
	 */
	private $user_consent;

	/**
	 * Document Head Instance
	 *
	 * @var \immonex\Kickstart\Document_Head
	 */
	private $doc_head;

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
		add_filter( 'inx_special_query_vars', array( $this, 'add_special_query_vars' ), 10, 2 );

		$this->bootstrap_data = array(
			'property_post_type_name'     => self::PROPERTY_POST_TYPE_NAME,
			'auto_applied_rendering_atts' => array(
				self::PUBLIC_PREFIX . 'ref',
				self::PUBLIC_PREFIX . 'force-lang',
			),
			'required_prop_cf_defaults'   => $this->required_property_custom_field_defaults,
		);

		parent::__construct( $plugin_slug );

		// Set up custom post types, taxonomies and backend menus.
		new WP_Bootstrap( $this->bootstrap_data, $this );

		// Setup the backend edit form for properties.
		new Property_Backend_Form( $this->bootstrap_data );

		// Add filters for common rendering attributes and special purposes.
		add_filter( 'inx_auto_applied_rendering_atts', array( $this, 'get_auto_applied_rendering_atts' ) );
		add_filter( 'inx_apply_auto_rendering_atts', array( $this, 'apply_auto_rendering_atts' ) );

		// Add compatibility layers for older versions of this and related plugins.
		$this->legacy_compat = new Legacy_Compat( $this->bootstrap_data );
		$this->oi2wp_compat  = new OpenImmo2WP_Compat( $this->bootstrap_data );
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
			case 'Property_Search_Hooks':
				return $this->property_search_hooks;
			case 'Property_Search':
				return $this->property_search;
			case 'property_list_page_id':
			case 'property_details_page_id':
				$lang = isset( $_GET[ self::PUBLIC_PREFIX . 'force-lang' ] ) ?
					// phpcs:ignore
					strtolower( substr( wp_sanitize_key( wp_unslash( $_GET[ self::PUBLIC_PREFIX . 'force-lang' ] ) ), 0, 2 ) ) :
					false;
				return apply_filters( 'inx_element_translation_id', parent::__get( $key ), 'page', $lang );
			case 'property_list_map_display_by_default':
				return ! empty( $this->plugin_options['property_list_map_type'] );
		}

		return parent::__get( $key );
	} // __get

	/**
	 * Perform activation tasks.
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
	protected function activate_plugin_single_site( $fire_before_hook = true, $fire_after_hook = true ) {
		parent::activate_plugin_single_site( true, false );

		$option_string_translated = false;

		/**
		 * Set plugin-specific option values that contain content to be translated
		 * (only on first activation).
		 */
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
					case 'turnstile_consent_note':
						$this->plugin_options[ $option_name ] = wp_sprintf(
							/* translators: %s = Cloudflare Turnstile privacy policy URL */
							__( 'Upon confirmation, a form security check is performed using <a href="%s" target="_blank">Cloudflare Turnstile</a>.', 'immonex-kickstart' ),
							__( 'https://www.cloudflare.com/privacypolicy/', 'immonex-kickstart' )
						);
						$option_string_translated = true;
						break;
					case 'withdrawal_form_introtext':
						$this->plugin_options[ $option_name ] = __( 'I/We hereby withdraw the contract concluded by me/us regarding the reference number or type of commissioned services specified below.', 'immonex-kickstart' );
						$option_string_translated             = true;
						break;
					case 'withdrawal_form_submission_conf_msg':
						$this->plugin_options[ $option_name ] = __( 'Your withdrawal has been submitted. A confirmation of receipt has been sent to the provided email address. Please check your inbox!', 'immonex-kickstart' );
						$option_string_translated             = true;
						break;
					case 'withdrawal_form_privacy_consent_text':
						$this->plugin_options[ $option_name ] = __( 'By submitting I consent to my data being processed and stored in accordance with the [privacy_policy] in order to process my withdrawal. This consent can be revoked at any time.', 'immonex-kickstart' );
						$option_string_translated             = true;
						break;
					case 'withdrawal_admin_notif_subject':
						$this->plugin_options[ $option_name ] = __( 'New withdrawal', 'immonex-kickstart' );
						$option_string_translated             = true;
						break;
					case 'withdrawal_admin_notif_template':
						$this->plugin_options[ $option_name ] = wp_sprintf(
							'%1$s' . PHP_EOL . PHP_EOL . '%2$s' . PHP_EOL . PHP_EOL . '{{ form_data }}',
							__( 'A new contract withdrawal by {{ name }} has been received:', 'immonex-kickstart' ),
							__( 'I/We hereby withdraw the contract concluded by me/us regarding the reference number or type of commissioned services specified below.', 'immonex-kickstart' )
						);
						$option_string_translated             = true;
						break;
					case 'withdrawal_rcpt_conf_subject':
						$this->plugin_options[ $option_name ] = '[{{ site_title_limited }}] ' . __( 'Withdrawal received', 'immonex-kickstart' );
						$option_string_translated             = true;
						break;
					case 'withdrawal_rcpt_conf_template':
						$this->plugin_options[ $option_name ] = wp_sprintf(
							'%1$s' . PHP_EOL . PHP_EOL . '%2$s' . PHP_EOL . PHP_EOL . '{{ form_data }}' . PHP_EOL . PHP_EOL . '%3$s' . PHP_EOL . PHP_EOL . '%4$s' . PHP_EOL . PHP_EOL . '{{ company_name }}',
							__( 'Good day!', 'immonex-kickstart' ),
							__( 'We hereby acknowledge receipt of your contract withdrawal request containing the details listed below.', 'immonex-kickstart' ),
							__( 'In the next step, we will check all the information and then send you a separate confirmation of the actual cancellation or, if necessary, some follow-up questions beforehand.', 'immonex-kickstart' ),
							__( 'Kind regards,', 'immonex-kickstart' )
						);
						$option_string_translated             = true;
						break;
				}
			}
		}

		if ( $option_string_translated ) {
			update_option( $this->plugin_options_name, $this->plugin_options );
		}

		$this->check_importer();
		$this->oi2wp_compat->check_property_posts();

		update_option( 'rewrite_rules', false );

		$dyn_assets_dir = $this->utils['local_fs']->get_dynamic_assets_dir( $this->plugin_slug );
		if ( $dyn_assets_dir && file_exists( $dyn_assets_dir['path'] . Dynamic_CSS::FILENAME ) ) {
			global $wp_filesystem;

			WP_Filesystem();
			$wp_filesystem->delete( $dyn_assets_dir['path'] . Dynamic_CSS::FILENAME );
		}

		// phpcs:ignore
		do_action( 'immonex_core_after_activation', $this->plugin_slug );
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

		add_action(
			"update_option_{$this->plugin_options_name}",
			function ( $old_values, $values, $option ) {
				if (
					$old_values['performance_enable_property_cache'] !== $values['performance_enable_property_cache']
					&& ! $values['performance_enable_property_cache']
				) {
					$this->utils['cache']->bulk_delete_cache_transients( [ 'property', 'property_list' ] );
				}

				if (
					$old_values['performance_enable_map_marker_cache'] !== $values['performance_enable_map_marker_cache']
					&& ! $values['performance_enable_map_marker_cache']
				) {
					$this->utils['cache']->bulk_delete_cache_transients( 'map_marker' );
				}

				foreach ( $old_values as $key => $value ) {
					if ( false !== strpos( $key, 'color' ) && $value !== $values[ $key ] ) {
						do_action( 'inx_dynamic_css_delete_file' );
						break;
					}
				}
			},
			10,
			3
		);
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

		/**
		 * Dynamic CSS processing.
		 */
		$dynamic_css = new Dynamic_CSS( $this->plugin_slug, $this->plugin_options, $this->utils );
		$dynamic_css->init();

		$this->distance_search_autocomplete_types = array(
			''              => __( 'none', 'immonex-kickstart' ),
			'photon'        => 'Photon (OpenStreetMap)',
			'google-places' => 'Google Places',
		);

		$this->property_list_map_types = array(
			''             => __( 'none', 'immonex-kickstart' ),
			'osm'          => 'OpenStreetMap (' . __( 'road map view', 'immonex-kickstart' ) . ')',
			'osm_german'   => 'OpenStreetMap (' . __( 'road map view', 'immonex-kickstart' )
				. ' – ' . __( 'German Style', 'immonex-kickstart' ) . ')',
			'osm_otm'      => 'OpenTopoMap (' . __( 'OSM-based topographic view', 'immonex-kickstart' )
				. ' ' . __( 'with road map layer', 'immonex-kickstart' ) . ')',
			'gmap'         => 'Google Map (' . __( 'road map view', 'immonex-kickstart' ) . ')',
			'gmap_terrain' => 'Google Map Terrain (' . __( 'topographic view', 'immonex-kickstart' )
				. ' ' . __( 'with road map layer', 'immonex-kickstart' ) . ')',
			'gmap_hybrid'  => 'Google Map Hybrid (' . __( 'satellite view', 'immonex-kickstart' )
				. ' ' . __( 'with road map layer', 'immonex-kickstart' ) . ')',
		);

		$this->property_details_map_types = array(
			''                  => __( 'none', 'immonex-kickstart' ),
			'ol_osm_map_marker' => 'OpenStreetMap (' . __( 'road map view', 'immonex-kickstart' )
				. ' ' . __( 'with property location marker', 'immonex-kickstart' ) . ')',
			'ol_osm_map_german' => 'OpenStreetMap (' . __( 'road map view', 'immonex-kickstart' )
				. ' ' . __( 'with property location marker', 'immonex-kickstart' )
				. ' – ' . __( 'German Style', 'immonex-kickstart' ) . ')',
			'ol_osm_map_otm'    => 'OpenTopoMap (' . __( 'OSM-based topographic view', 'immonex-kickstart' )
				. ' ' . __( 'with road map layer and property location marker', 'immonex-kickstart' ) . ')',
			'gmap_marker'       => 'Google Map (' . __( 'road map view', 'immonex-kickstart' )
				. ' ' . __( 'with property location marker', 'immonex-kickstart' ) . ')',
			'gmap_terrain'      => 'Google Map Terrain (' . __( 'topographic view', 'immonex-kickstart' )
				. ' ' . __( 'with road map layer and property location marker', 'immonex-kickstart' ) . ')',
			'gmap_hybrid'       => 'Google Map Hybrid (' . __( 'satellite view', 'immonex-kickstart' )
				. ' ' . __( 'with road map layer and property location marker', 'immonex-kickstart' ) . ')',
			'gmap_embed'        => __( "Google Area Map of property's neighborhood", 'immonex-kickstart' )
				. ' (' . __( 'road map view', 'immonex-kickstart' ) . ')',
			'gmap_embed_sat'    => __( "Google Area Map of property's neighborhood", 'immonex-kickstart' )
				. ' (' . __( 'satellite view', 'immonex-kickstart' )
				. ' ' . __( 'with road map layer', 'immonex-kickstart' ) . ')',
		);

		$component_config = array_merge(
			$this->bootstrap_data,
			$this->plugin_options,
			array(
				'plugin_home_url'                         => self::PLUGIN_HOME_URL,
				'required_property_custom_field_defaults' => $this->required_property_custom_field_defaults,
			)
		);

		// Plugin-specific helper/util objects.
		$this->utils = array_merge(
			$this->utils,
			array(
				'data'   => new Data_Access_Helper( $this->plugin_options, $this->bootstrap_data, $this->utils ),
				'format' => new Format_Helper( $component_config, $this->utils ),
				'query'  => new Query_Helper( $this->plugin_options ),
				'cache'  => new Cache( $component_config, $this->utils ),
			)
		);

		// Enable public methods for third-party developments.
		$this->api = new API( $component_config, $this->utils );

		$this->property_search_hooks = new Property_Search_Hooks( $component_config, $this->utils );
		$this->property_search       = new Property_Search( $component_config, $this->utils );

		/**
		 * Register core actions and filters.
		 */

		new Property_Hooks( $component_config, $this->utils );
		new Property_List_Hooks( $component_config, $this->utils );
		new Property_Map_Hooks( $component_config, $this->utils );
		new Property_Filters_Sort_Hooks( $component_config, $this->utils );
		new REST_API( $component_config, $this->utils );
		new API_Hooks( $this->api, $component_config, $this->utils );

		if ( $this->plugin_options['enable_withdrawal_processing'] ) {
			new Withdrawal_Backend_Form( $component_config, $this );

			$withdrawal_form_hooks = new Withdrawal_Form_Hooks( $component_config, $this->utils );
			$withdrawal_form_hooks->init();
		} else {
			add_shortcode( 'inx-withdrawal-form', '__return_empty_string' );
			add_shortcode( 'inx-withdrawal-form-confirmation-message', '__return_empty_string' );
		}

		if ( $this->plugin_options['seo_schema_org'] ) {
			new Structured_Data_Hooks( $component_config, $this->utils );
		}

		$this->user_consent = new User_Consent( $component_config, $this->utils );
		$this->user_consent->init();

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

		// Internal hook.
		$sharing_protocols = apply_filters( 'inx_sharing_protocols', self::SHARING_PROTOCOLS );

		if ( ! empty( $sharing_protocols ) ) {
			foreach ( $sharing_protocols as $protocol ) {
				if ( empty( $this->doc_head ) ) {
					$this->doc_head = new Document_Head( $component_config );
				}

				if ( 'generic' === $protocol || $this->plugin_options[ "sharing_{$protocol}" ] ) {
					$class = __NAMESPACE__ . '\Sharing_' . ucwords( $protocol, '_' );
					new $class( $component_config, $this->utils );
				}
			}
		}

		// Internal filter.
		add_filter(
			'inxkick_get_utils',
			function ( $utils ) { // phpcs:ignore
				return $this->utils;
			}
		);

		$this->perform_deferred_tasks();
	} // init_plugin

	/**
	 * Perform daily tasks.
	 *
	 * @since 1.15.0
	 */
	public function do_daily() {
		parent::do_daily();

		do_action( 'inxkick_clean_up_db_cache' );
	} // do_daily

	/**
	 * Add special query variables (filter callback).
	 *
	 * @since 1.13.8-beta
	 *
	 * @param string[] $special_query_vars Prefixed variable names or empty array.
	 * @param string   $prefix             Kickstart public prefix (normally "inx-") or empty string.
	 *
	 * @return string[] Special query variables.
	 */
	public function add_special_query_vars( $special_query_vars, $prefix ) {
		if ( ! is_array( $special_query_vars ) ) {
			$special_query_vars = array();
		}

		if ( self::PUBLIC_PREFIX !== $prefix ) {
			$prefix = self::PUBLIC_PREFIX;
		}

		return array_merge(
			$special_query_vars,
			array(
				"{$prefix}limit",
				"{$prefix}limit-page",
				"{$prefix}sort",
				"{$prefix}order",
				"{$prefix}references",
				"{$prefix}masters",
				"{$prefix}available",
				"{$prefix}sold",
				"{$prefix}reserved",
				"{$prefix}featured",
				"{$prefix}front-page-offer",
				"{$prefix}demo",
				"{$prefix}backlink-url",
				"{$prefix}iso-country",
				"{$prefix}author",
				"{$prefix}ref",
				"{$prefix}force-lang",
			)
		);
	} // add_special_query_vars

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
		$dynamic_css_file_url = apply_filters( 'inx_dynamic_css_file_url', '' );

		if ( $dynamic_css_file_url ) {
			wp_enqueue_style( 'inx-dynamic', $dynamic_css_file_url, array(), $this->plugin_version );
		}

		parent::frontend_scripts_and_styles();

		$search_query_vars = $this->property_search->get_search_query_vars();
		$ts_sitekey        = ! empty( $this->plugin_options['turnstile_sitekey'] ) ? $this->plugin_options['turnstile_sitekey'] : false;
		$ts_secret_key     = ! empty( $this->plugin_options['turnstile_secret_key'] ) ? $this->plugin_options['turnstile_secret_key'] : false;

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
				'withdrawal'    => array(
					'enable_ts'               => $this->plugin_options['spam_prot_enable_turnstile']
						&& $ts_sitekey
						&& $ts_secret_key,
					'ts_sitekey'              => $ts_sitekey,
					'ts_error_msg_refresh'    => __( 'Please refresh the page and try again.', 'immonex-kickstart' ),
					'ts_error_msg_config'     => wp_sprintf(
						/* translators: %s = admin email address */
						__( 'Configuration error, please contact the <a href="mailto:%s">website admin</a>.', 'immonex-kickstart' ),
						get_bloginfo( 'admin_email' )
					),
					'ts_error_msg_security'   => __( 'Security check failed. Please try refreshing or using a different browser.', 'immonex-kickstart' ),
					'ts_error_msg_unexpected' => wp_sprintf(
						/* translators: %s = admin email address */
						__( 'An unexpected error occurred, please contact the <a href="mailto:%s">website admin</a>.', 'immonex-kickstart' ),
						get_bloginfo( 'admin_email' )
					),
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
		$templating_info = wp_sprintf(
			/* translators: %1$s, %2$s and %3$s are placeholders for URLs. */
			__(
				'All mail <strong>subject, body and signature contents</strong> can be implemented based on
the flexible <a href="%1$s" target="_blank">template engine Twig 3</a>. The following variables can be used
in the related input fields:<br><br>

<strong>General</strong>

<dl>
	<dt><code>{{ site_title }}</code></dt>
	<dd>Website title</dd>

	<dt><code>{{ site_title_limited }}</code></dt>
	<dd>Website title (max. 20 characters)</dd>

	<dt><code>{{ site_url }}</code></dt>
	<dd>Website URL (home page)</dd>

	<dt><code>{{ form_data }}</code></dt>
	<dd><strong>All</strong> user-submitted form data excluding empty fields (see below) combined</dd>

	<dt><code>{{ company_name }}</code></dt>
	<dd>Company name provided on the <a href="%2$s">Basic Settings tab</a></dd>

	<dt><code>{{ company_address }}</code></dt>
	<dd>Company address provided on the <a href="%2$s">Basic Settings tab</a></dd>
</dl>',
				'immonex-kickstart'
			),
			'https://twig.symfony.com/doc/3.x/templates.html',
			admin_url( 'admin.php?page=immonex-kickstart_settings&tab=tab_general&section_tab=1' ),
		);

		$ext_templating_info = __(
			'<strong>Withdrawal Form Data</strong>

<dl>
	<dt><code>{{ salutation }}</code></dt>
	<dd>Salutation (if selected): <code>Ms.</code> or <code>Mr.</code></dd>

	<dt><code>{{ first_name }}</code></dt>
	<dd>First Name</dd>

	<dt><code>{{ last_name }}</code></dt>
	<dd>Last Name</dd>

	<dt><code>{{ name }}</code></dt>
	<dd>Full Name</dd>

	<dt><code>{{ street }}</code></dt>
	<dd>Street</dd>

	<dt><code>{{ postal_code }}</code></dt>
	<dd>Postal Code</dd>

	<dt><code>{{ city }}</code></dt>
	<dd>City</dd>

	<dt><code>{{ email }}</code></dt>
	<dd>E-mail address</dd>

	<dt><code>{{ phone }}</code></dt>
	<dd>Phone number</dd>

	<dt><code>{{ reference_number }}</code></dt>
	<dd>Reference Number (Customer, Contract or Property)</dd>

	<dt><code>{{ contract_date }}</code></dt>
	<dd>Date of Contract Conclusion</dd>

	<dt><code>{{ message }}</code></dt>
	<dd>Additional Details/Message</dd>
</dl>
',
			'immonex-kickstart'
		);

		// Tabs (extendable by filter function).
		$tabs = apply_filters(
			// phpcs:ignore
			$this->plugin_slug . '_option_tabs',
			array(
				'tab_general'          => array(
					'title'      => __( 'General', 'immonex-kickstart' ),
					'content'    => '',
					'attributes' => array(
						'tabbed_sections' => true,
					),
				),
				'tab_property_lists'   => array(
					'title'      => __( 'Lists', 'immonex-kickstart' ),
					'content'    => '',
					'attributes' => array(
						'tabbed_sections' => true,
					),
				),
				'tab_property_details' => array(
					'title'      => __( 'Detail View', 'immonex-kickstart' ),
					'content'    => '',
					'attributes' => array(
						'tabbed_sections' => true,
					),
				),
				'tab_property_search'  => array(
					'title'      => __( 'Search', 'immonex-kickstart' ),
					'content'    => '',
					'attributes' => array(
						'tabbed_sections' => true,
					),
				),
				'tab_withdrawal'       => array(
					'title'      => __( 'Withdrawal', 'immonex-kickstart' ),
					'content'    => '',
					'attributes' => array(
						'tabbed_sections' => true,
					),
				),
				'tab_slugs'            => array(
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
			// phpcs:ignore
			$this->plugin_slug . '_option_sections',
			array(
				'basic'                        => array(
					'title' => __( 'Basic Settings', 'immonex-kickstart' ),
					'tab'   => 'tab_general',
				),
				'email'                        => array(
					'title'       => __( 'E-Mail', 'immonex-kickstart' ),
					'description' => '<p>' . wp_sprintf(
							/* translators: %s = Withdrawal tab URL */
						__( 'The following <strong>default</strong> settings apply to form emails directly sent by the plugin (e.g. <a href="%s">withdrawal</a> receipt confirmations and admin notifications).', 'immonex-kickstart' ),
						admin_url( 'admin.php?page=immonex-kickstart_settings&tab=tab_withdrawal' )
					) .
						'<p>' . __( 'Other immonex plugins – including Kickstart add-ons – may also include settings of this kind that apply to their related forms only.', 'immonex-kickstart' ) . '</p>',
					'tab'         => 'tab_general',
				),
				'colors'                       => array(
					'title'       => __( 'Colors', 'immonex-kickstart' ),
					'description' => wp_sprintf(
						/* translators: $1$s = colors (incl. link), %2$s = Tab URL */
						__( 'The following %1$s are being provided as <em>CSS custom properties</em> (variables). <strong>Whether and to what extent the color variables are used in the frontend depends on the active <a href="%2$s">skin</a>.</strong>', 'immonex-kickstart' ),
						$this->string_utils->doc_link( 'https://docs.immonex.de/kickstart/#/anpassung-erweiterung/farben', __( 'colors', 'immonex-kickstart' ) ),
						admin_url( 'admin.php?page=immonex-kickstart_settings&tab=tab_general&section_tab=1' )
					),
					'tab'         => 'tab_general',
				),
				'references'                   => array(
					'title'       => __( 'Reference Properties', 'immonex-kickstart' ),
					'description' => wp_sprintf(
						/* translators: %s = Tab URL */
						__( 'If required, <strong>detail pages</strong> of reference properties can be <strong>disabled</strong> under <a href="%s">Detail View → General</a>.', 'immonex-kickstart' ),
						admin_url( 'admin.php?page=immonex-kickstart_settings&tab=tab_property_details' )
					),
					'tab'         => 'tab_general',
				),
				'user_consent'                 => array(
					'title'       => __( 'User Consent', 'immonex-kickstart' ),
					'description' => __( 'If third-party services are used in the website frontend that connect to remote servers (iFrame embedding or API requests), user consent can be obtained in advance. The following options can be disabled if another plugin is used for this purpose.', 'immonex-kickstart' ),
					'tab'         => 'tab_general',
				),
				'seo_geo_sharing'              => array(
					'title'       => 'SEO/GEO/' . __( 'Sharing', 'immonex-kickstart' ),
					'description' => '<p>' . __( '<em>Structured data</em> are provided in a consistent, predefined format to support search engines and AI systems in processing, analyzing and storing real estate property and agency information.', 'immonex-kickstart' ) . '</p><p>' .
						__( 'To optimize the display of links in social networks, instant messaging services, etc. (Facebook, X, LinkedIn, Slack, WhatsApp…), special <em>meta tags</em> are embedded into property listing and detail pages, provided that the relevant options are activated.', 'immonex-kickstart' ) . '</p>',
					'tab'         => 'tab_general',
				),
				'ext_services'                 => array(
					'title' => __( 'Integrations', 'immonex-kickstart' ),
					'tab'   => 'tab_general',
				),
				'performance'                  => array(
					'title'       => __( 'Performance', 'immonex-kickstart' ),
					'description' => __( 'Enabling the following options can improve the rendering times of property related frontend elements significantly, especially if an object cache solution like <em>Redis</em> or <em>Memcached</em> is in use.', 'immonex-kickstart' ),
					'tab'         => 'tab_general',
				),
				'property_lists_general'       => array(
					'title' => __( 'General', 'immonex-kickstart' ),
					'tab'   => 'tab_property_lists',
				),
				'property_list_maps'           => array(
					'title'       => __( 'Overview Maps', 'immonex-kickstart' ),
					'description' => wp_sprintf(
						/* translators: %1$s = OpenStreetMap URL, %2$s = OpenTopoMap URL, %3$s = Google Maps API URL. */
						__( 'Dynamic maps on <strong>property list pages</strong> are rendered using <a href="%1$s" target="_blank">OpenStreetMap</a>/<a href="%2$s" target="_blank">OpenTopoMap</a> or <a href="%3$s" target="_blank">Google Maps</a>. Center and zoom level are usually determined automatically based on the property markers included. (Initial values can be entered in the following fields.)', 'immonex-kickstart' ),
						'https://www.openstreetmap.org/',
						'https://opentopomap.org/',
						'https://developers.google.com/maps/documentation/javascript/overview'
					),
					'tab'         => 'tab_property_lists',
				),
				'property_details_general'     => array(
					'title' => __( 'General', 'immonex-kickstart' ),
					'tab'   => 'tab_property_details',
				),
				'property_details_gallery'     => array(
					'title'       => __( 'Gallery', 'immonex-kickstart' ),
					'description' => wp_sprintf(
							/* translators: %s = skin (incl. link) */
						__( 'If supported by the selected %s, the following options apply to the <strong>primary gallery</strong> (image slider + thumbnail navigation).', 'immonex-kickstart' ),
						$this->string_utils->doc_link( 'https://docs.immonex.de/kickstart/#/anpassung-erweiterung/skins', __( 'skin', 'immonex-kickstart' ) )
					),
					'tab'         => 'tab_property_details',
				),
				'property_detail_maps'         => array(
					'title'       => __( 'Location Map', 'immonex-kickstart' ),
					'description' => wp_sprintf(
						/* translators: %1$s = OpenStreetMap URL, %2$s = OpenTopoMap URL, %3$s = Google Maps API URL, %4$s = Google Maps Embed API URL. */
						__( 'This plugin currently supports two types of dynamic maps on the <strong>property detail pages</strong>: Marker based ones showing the property\'s (approximate) position (<a href="%1$s" target="_blank">OpenStreetMap</a>/<a href="%2$s" target="_blank">OpenTopoMap</a> or <a href="%3$s" target="_blank">Google Maps</a>) as well as iFrame-based variants provided by the <a href="%4$s" target="_blank">Google Maps Embed API</a> for highlighting the respective district/neighborhood.', 'immonex-kickstart' ),
						'https://www.openstreetmap.org/',
						'https://opentopomap.org/',
						'https://developers.google.com/maps/documentation/javascript/overview',
						'https://developers.google.com/maps/documentation/embed/get-started'
					),
					'tab'         => 'tab_property_details',
				),
				'property_search'              => array(
					'title' => __( 'General', 'immonex-kickstart' ),
					'tab'   => 'tab_property_search',
				),
				'distance_search'              => array(
					'title'       => __( 'Distance Search', 'immonex-kickstart' ),
					'description' => __( 'If enabled, the property search form includes a distance search feature.', 'immonex-kickstart' ),
					'tab'         => 'tab_property_search',
				),
				'withdrawal_form_general'      => array(
					'title'       => __( 'Form', 'immonex-kickstart' ) . '/' . __( 'General', 'immonex-kickstart' ),
					'description' => __( 'The settings on this tab apply to the withdrawal form that can be embedded using the shortcode <code>[inx-withdrawal-form]</code>.', 'immonex-kickstart' ),
					'tab'         => 'tab_withdrawal',
				),
				'withdrawal_admin_notif_mails' => array(
					'title'       => __( 'Admin Notification', 'immonex-kickstart' ),
					'description' => array( $templating_info, $ext_templating_info ),
					'tab'         => 'tab_withdrawal',
				),
				'withdrawal_rcpt_conf_mails'   => array(
					'title'       => __( 'Receipt Confirmation', 'immonex-kickstart' ),
					'description' => array( $templating_info, $ext_templating_info ),
					'tab'         => 'tab_withdrawal',
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
				'taxonomy_slugs'               => array(
					'title'       => __( 'Taxonomies', 'immonex-kickstart' ),
					'description' => __( 'Taxonomy archive pages have their own <strong>rewrite slugs</strong> that may contain slashes. In most cases a combination of the post type slug and the taxonomy name makes the most sense, e.g. <strong>properties/type</strong> will make the permalink URLs look like <strong>domain.tld/properties/type/flats/</strong>. The following slugs should be entered in the <strong>main language</strong> of the website, too.', 'immonex-kickstart' ),
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
			// phpcs:ignore
			$this->plugin_slug . '_option_fields',
			array(
				array(
					'name'    => 'title_design_structure',
					'type'    => 'subsection_header',
					'section' => 'basic',
					'args'    => array(
						'title' => __( 'Design & Structure', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'skin',
					'type'    => 'select',
					'label'   => __( 'Skin', 'immonex-kickstart' ),
					'section' => 'basic',
					'args'    => array(
						'description' => wp_sprintf(
							/* translators: %s = skin (incl. link) */
							__( 'A %s is a folder that contains a set of templates for all immonex Kickstart related pages and elements.', 'immonex-kickstart' ),
							$this->string_utils->doc_link( 'https://docs.immonex.de/kickstart/#/anpassung-erweiterung/skins', __( 'skin', 'immonex-kickstart' ) )
						),
						'options'     => $this->utils['template']->get_frontend_skins(),
						'doc_url'     => 'https://docs.immonex.de/kickstart/#/anpassung-erweiterung/skins',
					),
				),
				array(
					'name'    => 'heading_base_level',
					'type'    => 'select',
					'label'   => __( 'Heading Base Level', 'immonex-kickstart' ),
					'section' => 'basic',
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
					'name'    => 'title_legal',
					'type'    => 'subsection_header',
					'section' => 'basic',
					'args'    => array(
						'title'       => __( 'Legal', 'immonex-kickstart' ),
						'description' => wp_sprintf(
							/* translators: %s = Withdrawal tab URL */
							__( 'The following information can be used in certain form emails (e.g. <a href="%s">withdrawal receipt confirmations</a>).', 'immonex-kickstart' ),
							admin_url( 'admin.php?page=immonex-kickstart_settings&tab=tab_withdrawal&section_tab=3' )
						),
					),
				),
				array(
					'name'    => 'company_name',
					'type'    => 'text',
					'label'   => __( 'Company Name', 'immonex-kickstart' ),
					'section' => 'basic',
					'args'    => array(
						'description' => __( 'Official firm including legal form', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'company_address',
					'type'    => 'textarea',
					'label'   => __( 'Company Address', 'immonex-kickstart' ) . ' (' . __( 'Headquarters', 'immonex-kickstart' ) . ')',
					'section' => 'basic',
					'args'    => array(),
				),
				array(
					'name'    => 'title_units',
					'type'    => 'subsection_header',
					'section' => 'basic',
					'args'    => array(
						'title' => __( 'Measuring Units & Currency', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'area_unit',
					'type'    => 'text',
					'label'   => __( 'Area Measuring Unit', 'immonex-kickstart' ),
					'section' => 'basic',
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
					'section' => 'basic',
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
					'section' => 'basic',
					'args'    => array(
						'description'      => '',
						'class'            => 'small-text',
						'max_length'       => 1,
						'default_if_empty' => '€',
					),
				),
				array(
					'name'    => 'title_form_spam_protection',
					'type'    => 'subsection_header',
					'section' => 'basic',
					'args'    => array(
						'title'       => __( 'Form Spam Protection', 'immonex-kickstart' ),
						'description' => wp_sprintf(
							/* translators: %s = Withdrawal tab URL */
							__( 'The following settings apply to the <a href="%s">withdrawal form</a>.', 'immonex-kickstart' ),
							admin_url( 'admin.php?page=immonex-kickstart_settings&tab=tab_withdrawal' )
						),
					),
				),
				array(
					'name'    => 'spam_prot_enable_honeypot',
					'type'    => 'checkbox',
					'label'   => wp_sprintf( __( 'Honeypot', 'immonex-kickstart' ) ),
					'section' => 'basic',
					'args'    => array(),
				),
				array(
					'name'    => 'spam_prot_time_threshold',
					'type'    => 'number',
					'label'   => __( 'Time Threshold', 'immonex-kickstart' ),
					'section' => 'basic',
					'args'    => array(
						'description'  => __( 'Block form submissions that are "too fast", that is, within the stated number of seconds after the page has loaded (0 to disable).', 'immonex-kickstart' ),
						'field_suffix' => __( 'Seconds', 'immonex-kickstart' ),
						'class'        => 'small-text',
						'min'          => 0,
						'max'          => 20,
					),
				),
				array(
					'name'    => 'spam_prot_enable_turnstile',
					'type'    => 'checkbox',
					'label'   => 'Cloudflare Turnstile',
					'section' => 'basic',
					'args'    => array(
						'description' => wp_sprintf(
							/* translators: %1$s = Turnstile product page URL, %2$s = Turnstile options tab URL */
							__( '<a href="%1$s" target="_blank">Turnstile</a> is a <em>CAPTCHA</em> alternative to protect forms from spam and bots (see tab <a href="%2$s">General → Integrations</a> for configuration options).', 'immonex-kickstart' ),
							'https://www.cloudflare.com/application-services/products/turnstile/',
							admin_url( 'admin.php?page=immonex-kickstart_settings&tab=tab_general&section_tab=7#immonex-kickstart_turnstile_sitekey' )
						),
						'doc_url'     => 'https://docs.immonex.de/kickstart/#/schnellstart/einrichtung?id=cloudflare-turnstile',
						'condition'   => function () {
							$options   = apply_filters( 'inx_options', array(), 'core' );
							$is_active = ! empty( $options['turnstile_sitekey'] )
								&& strlen( $options['turnstile_sitekey'] ) >= 20
								&& ! empty( $options['turnstile_secret_key'] )
								&& strlen( $options['turnstile_secret_key'] ) >= 24;

							return array(
								'is_active' => $is_active,
								'info'      => wp_sprintf(
									/* translators: %s = Turnstile options tab URL */
									__( 'To activate this option, the corresponding <strong>site and secret keys</strong> must be entered in the <em>Cloudflare Turnstile</em> section of the <a href="%s">Integrations tab</a>.', 'immonex-kickstart' ),
									admin_url( 'admin.php?page=immonex-kickstart_settings&tab=tab_general&section_tab=7#immonex-kickstart_turnstile_sitekey' )
								),
								'value'     => 0,
							);
						},
					),
				),
				array(
					'name'    => 'default_mail_admin_recipients',
					'type'    => 'email_list',
					'label'   => __( 'Admin Recipient Mail Addresses', 'immonex-kickstart' ),
					'section' => 'email',
					'args'    => array(
						'description' => __( 'comma-separated list of <strong>admin notification</strong> recipient addresses (default: main site admin address)', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'default_mail_sender_name',
					'type'    => 'text',
					'label'   => __( 'Sender Name', 'immonex-kickstart' ),
					'section' => 'email',
					'args'    => array(
						'description' => __( 'Sender <strong>name</strong> for form mails (default: <em>WordPress</em> – may be overridden by an SMTP plugin if installed)', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'default_mail_sender_email',
					'type'    => 'email',
					'label'   => __( 'Sender Email', 'immonex-kickstart' ),
					'section' => 'email',
					'args'    => array(
						'description' => wp_sprintf(
							/* translators: %s = default sender email address */
							__( 'Sender <strong>address</strong> for form mails (default: <em>%s</em> – may be overridden by an SMTP plugin if installed)', 'immonex-kickstart' ),
							get_option( 'admin_email' )
						),
					),
				),
				array(
					'name'    => 'default_mail_as_html',
					'type'    => 'checkbox',
					'label'   => __( 'HTML Mails', 'immonex-kickstart' ),
					'section' => 'email',
					'args'    => array(
						'description' => wp_sprintf(
							/* translators: %s = placeholder for the message type */
							__( 'Activate to send %s as <strong>HTML-formatted</strong> mails. (An alternative plain text version is generated automatically.)', 'immonex-kickstart' ),
							__( 'withdrawal notifications', 'immonex-kickstart' )
						),
					),
				),
				array(
					'name'    => 'default_mail_logo_id',
					'type'    => 'media_image_select',
					'label'   => __( 'Logo', 'immonex-kickstart' ) .
						' (' . __( 'HTML Mails', 'immonex-kickstart' ) . ')',
					'section' => 'email',
					'args'    => array(
						'description' => __( 'If the sending of HTML mails is activated, a logo can be inserted.', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'default_mail_logo_position',
					'type'    => 'select',
					'label'   => __( 'Logo Position', 'immonex-kickstart' ) .
						' (' . __( 'HTML Mails', 'immonex-kickstart' ) . ')',
					'section' => 'email',
					'args'    => array(
						'description' => __( 'If selected, you can specify where the logo should appear in the mail here.', 'immonex-kickstart' ),
						'options'     => array(
							'top_center'    => __( 'top', 'immonex-kickstart' ) . ' ' .
								__( 'centered', 'immonex-kickstart' ),
							'top_left'      => __( 'top', 'immonex-kickstart' ) . ' ' .
								__( 'left', 'immonex-kickstart' ),
							'top_right'     => __( 'top', 'immonex-kickstart' ) . ' ' .
								__( 'right', 'immonex-kickstart' ),
							'footer_center' => __( 'bottom', 'immonex-kickstart' ) . ' ' .
								__( 'centered', 'immonex-kickstart' ),
							'footer_left'   => __( 'bottom', 'immonex-kickstart' ) . ' ' .
								__( 'left', 'immonex-kickstart' ),
							'footer_right'  => __( 'bottom', 'immonex-kickstart' ) . ' ' .
								__( 'right', 'immonex-kickstart' ),
						),
					),
				),
				array(
					'name'    => 'default_mail_signature',
					'type'    => 'wysiwyg',
					'label'   => __( 'Signature', 'immonex-kickstart' ),
					'section' => 'email',
					'args'    => array(
						'description'     => __( 'The signature is added below the main content of certain emails sent to customers or prospects (e.g. receipt notifications).', 'immonex-kickstart' ) . ' ' .
							__( 'Twig variables listed on the respective mail tabs can be used here, too (<code>{{ default_signature }}</code> for a combination of site title/URL and company name/address).', 'immonex-kickstart' ),
						'editor_settings' => array(
							'default_editor' => 'tinymce',
							'teeny'          => true,
							'quicktags'      => array( 'buttons' => 'strong,em,link,img,close' ),
							'tinymce'        => true,
						),
					),
				),
				array(
					'name'    => 'color_label_default',
					'type'    => 'colorpicker',
					'label'   => __( 'Labels', 'immonex-kickstart' )
						. ' (' . __( 'default', 'immonex-kickstart' ) . ')',
					'section' => 'colors',
					'args'    => array(
						'description'      => wp_sprintf(
							'%1$s %2$s: <code style="color:#f0f0f1; background-color:%3$s">%3$s</code>',
							__( 'General base color for property label background gradients if none of the following specific colors matches.', 'immonex-kickstart' ),
							__( 'Default', 'immonex-kickstart' ),
							self::DEFAULT_COLORS['label_default']
						),
						'default_if_empty' => self::DEFAULT_COLORS['label_default'],
					),
				),
				array(
					'name'    => 'color_marketing_type_sale',
					'type'    => 'colorpicker',
					'label'   => __( 'Marketing Type Sale', 'immonex-kickstart' ),
					'section' => 'colors',
					'args'    => array(
						'description'      => wp_sprintf(
							'%1$s %2$s: <code style="color:#f0f0f1; background-color:%3$s">%3$s</code>',
							__( 'Base color for list elements, labels etc. of properties for sale.', 'immonex-kickstart' ),
							__( 'Default', 'immonex-kickstart' ),
							self::DEFAULT_COLORS['marketing_type_sale']
						),
						'default_if_empty' => self::DEFAULT_COLORS['marketing_type_sale'],
					),
				),
				array(
					'name'    => 'color_marketing_type_rent',
					'type'    => 'colorpicker',
					'label'   => __( 'Marketing Type Rent', 'immonex-kickstart' ),
					'section' => 'colors',
					'args'    => array(
						'description'      => wp_sprintf(
							'%1$s %2$s: <code style="color:#f0f0f1; background-color:%3$s">%3$s</code>',
							__( 'Base color for list elements, labels etc. of properties for rent.', 'immonex-kickstart' ),
							__( 'Default', 'immonex-kickstart' ),
							self::DEFAULT_COLORS['marketing_type_rent']
						),
						'default_if_empty' => self::DEFAULT_COLORS['marketing_type_rent'],
					),
				),
				array(
					'name'    => 'color_marketing_type_leasing',
					'type'    => 'colorpicker',
					'label'   => __( 'Marketing Type Leasing', 'immonex-kickstart' ),
					'section' => 'colors',
					'args'    => array(
						'description'      => wp_sprintf(
							'%1$s %2$s: <code style="color:#f0f0f1; background-color:%3$s">%3$s</code>',
							__( 'Base color for list elements, labels etc. of properties for lease.', 'immonex-kickstart' ),
							__( 'Default', 'immonex-kickstart' ),
							self::DEFAULT_COLORS['marketing_type_leasing']
						),
						'default_if_empty' => self::DEFAULT_COLORS['marketing_type_leasing'],
					),
				),
				array(
					'name'    => 'color_action_element',
					'type'    => 'colorpicker',
					'label'   => __( 'Action Elements', 'immonex-kickstart' ),
					'section' => 'colors',
					'args'    => array(
						'description'      => wp_sprintf(
							'%1$s %2$s: <code style="color:#f0f0f1; background-color:%3$s">%3$s</code>',
							__( 'Base color for plugin-specific links and other navigation/action elements.', 'immonex-kickstart' ),
							__( 'Default', 'immonex-kickstart' ),
							self::DEFAULT_COLORS['action_element']
						),
						'default_if_empty' => self::DEFAULT_COLORS['action_element'],
					),
				),
				array(
					'name'    => 'color_action_element_inverted',
					'type'    => 'colorpicker',
					'label'   => __( 'Inverted Action Elements', 'immonex-kickstart' ),
					'section' => 'colors',
					'args'    => array(
						'description'      => wp_sprintf(
							'%1$s %2$s: <code style="color:#1d2327; background-color:%3$s">%3$s</code>',
							__( 'Alternative light link/action element color for use on dark backgrounds.', 'immonex-kickstart' ),
							__( 'Default', 'immonex-kickstart' ),
							self::DEFAULT_COLORS['action_element_inverted']
						),
						'default_if_empty' => self::DEFAULT_COLORS['action_element_inverted'],
					),
				),
				array(
					'name'    => 'color_text_inverted_default',
					'type'    => 'colorpicker',
					'label'   => __( 'Inverted Text', 'immonex-kickstart' )
						. ' (' . __( 'default', 'immonex-kickstart' ) . ')',
					'section' => 'colors',
					'args'    => array(
						'description'      => wp_sprintf(
							'%1$s %2$s: <code style="color:#1d2327; background-color:%3$s">%3$s</code>',
							__( 'Light base color for regular text in frontend elements with dark backgrounds.', 'immonex-kickstart' ),
							__( 'Default', 'immonex-kickstart' ),
							self::DEFAULT_COLORS['text_inverted_default']
						),
						'default_if_empty' => self::DEFAULT_COLORS['text_inverted_default'],
					),
				),
				array(
					'name'    => 'color_demo',
					'type'    => 'colorpicker',
					'label'   => __( 'Demo', 'immonex-kickstart' ),
					'section' => 'colors',
					'args'    => array(
						'description'      => wp_sprintf(
							'%1$s %2$s: <code style="color:#f0f0f1; background-color:%3$s">%3$s</code>',
							__( 'Base color for demo elements (labels, notes etc.).', 'immonex-kickstart' ),
							__( 'Default', 'immonex-kickstart' ),
							self::DEFAULT_COLORS['demo']
						),
						'default_if_empty' => self::DEFAULT_COLORS['demo'],
					),
				),
				array(
					'name'    => 'color_gradients',
					'type'    => 'checkbox',
					'label'   => __( 'Enable Gradients', 'immonex-kickstart' ),
					'section' => 'colors',
					'args'    => array(
						'description' => __( 'Subtle color gradients are used for label backgrounds, among other things.', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'title_muted_colors',
					'type'    => 'subsection_header',
					'section' => 'colors',
					'args'    => array(
						'title'       => __( 'Muted Colors', 'immonex-kickstart' ),
						'description' => __( 'These following (optionally) partly transparent colors are mainly used for backgrounds of certain frontend elements.', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'color_bg_muted_default',
					'type'    => 'colorpicker',
					'label'   => __( 'Background', 'immonex-kickstart' )
						. ' (' . __( 'default', 'immonex-kickstart' ) . ')',
					'section' => 'colors',
					'args'    => array(
						'description'      => wp_sprintf(
							'%1$s %2$s: <code style="color:#1d2327; background-color:%3$s">%3$s</code>',
							__( 'Default background color (e.g. extended search form, header/footer areas of standard property detail pages etc.).', 'immonex-kickstart' ),
							__( 'Default', 'immonex-kickstart' ),
							self::DEFAULT_COLORS['bg_muted_default']
						),
						'default_if_empty' => self::DEFAULT_COLORS['bg_muted_default'],
					),
				),
				array(
					'name'    => 'muted_color_opacity_pct',
					'type'    => 'number',
					'label'   => __( 'Opacity', 'immonex-kickstart' ),
					'section' => 'colors',
					'args'    => array(
						'description'  => __( 'Opacity level of all muted colors.', 'immonex-kickstart' ),
						'field_suffix' => '%',
						'class'        => 'small-text',
						'min'          => 0,
						'max'          => 100,
					),
				),
				array(
					'name'    => 'show_reference_prices',
					'type'    => 'checkbox',
					'label'   => __( 'Show Reference Prices', 'immonex-kickstart' ),
					'section' => 'references',
					'args'    => array(
						'description' => __( 'Activate this option if the prices of reference properties should be displayed.', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'reference_price_text',
					'type'    => 'text',
					'label'   => __( 'Reference Price Text', 'immonex-kickstart' ),
					'section' => 'references',
					'args'    => array(
						'description' => __( 'This text is displayed if reference prices should <strong>not</strong> be published.', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'enable_contact_section_for_references',
					'type'    => 'checkbox',
					'label'   => __( 'Show Contact Section', 'immonex-kickstart' ),
					'section' => 'references',
					'args'    => array(
						'description' => __( 'Activate this option if the contact section (including agent information and form if the <a href="https://wordpress.org/plugins/immonex-kickstart-team/" target="_blank">Team Add-on</a> is installed) should be displayed on <strong>reference property detail pages</strong>.', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'seo_schema_org',
					'type'    => 'checkbox',
					'label'   => 'Schema.org',
					'section' => 'seo_geo_sharing',
					'args'    => array(
						'description' => wp_sprintf(
							/* translators: %s = Schema.org URL */
							__( 'Enable embedding of <strong>structured data</strong> according to <a href="%s" target="_blank">Schema.org</a> vocabulary.', 'immonex-kickstart' ),
							'https://schema.org/'
						),
					),
				),
				array(
					'name'    => 'sharing_open_graph',
					'type'    => 'checkbox',
					'label'   => 'Open Graph',
					'section' => 'seo_geo_sharing',
					'args'    => array(
						'description' => wp_sprintf(
							/* translators: %s = Open Graph URL */
							__( 'Embed <a href="%s" target="_blank">Open Graph</a> meta tags to the head section of the property list/detail HTML documents.', 'immonex-kickstart' ),
							'https://ogp.me/'
						),
					),
				),
				array(
					'name'    => 'sharing_x',
					'type'    => 'checkbox',
					'label'   => 'X',
					'section' => 'seo_geo_sharing',
					'args'    => array(
						'description' => wp_sprintf(
							/* translators: %s = X Developer URL */
							__( 'Embed additional <a href="%s" target="_blank">X</a> meta tags.', 'immonex-kickstart' ),
							'https://developer.x.com/en/docs/x-for-websites/cards/guides/getting-started'
						),
					),
				),
				array(
					'name'    => 'sharing_max_images',
					'type'    => 'number',
					'label'   => __( 'Max. Number of Images', 'immonex-kickstart' ),
					'section' => 'seo_geo_sharing',
					'args'    => array(
						'description' => __( 'The maximum number of property images supplied as meta tags can be limited for destination platforms that support the display of multiple images (<code>-1</code> = no limit).', 'immonex-kickstart' ),
						'class'       => 'small-text',
						'min'         => -1,
						'max'         => 50,
					),
				),
				array(
					'name'    => 'sharing_tag_insert_mode',
					'type'    => 'select',
					'label'   => __( 'Meta Tag Insert Mode', 'immonex-kickstart' ),
					'section' => 'seo_geo_sharing',
					'args'    => array(
						'description' => __( 'For cases where meta tags with the <strong>same name attributes</strong> have already been inserted by the theme or other plugins, these can either be retained or replaced. Further tags provided by Kickstart with other name attributes are always added. Alternatively, all tags generated by Kickstart can simply be appended, regardless of any existing tags of the same name.', 'immonex-kickstart' ),
						'options'     => array(
							'replace' => __( 'replace and supplement existing', 'immonex-kickstart' ),
							'extend'  => __( 'keep and supplement existing', 'immonex-kickstart' ),
							'append'  => __( 'keep existing and append all', 'immonex-kickstart' ),
						),
					),
				),
				array(
					'name'    => 'title_google_int',
					'type'    => 'subsection_header',
					'section' => 'ext_services',
					'args'    => array(
						'title'       => 'Google',
						'description' => __( 'This plugin <strong>optionally</strong> uses the <strong>Google Maps JavaScript API (incl. Places library)</strong> as well as the <strong>Maps Embed API</strong> (maps, locality autocomplete). An appropriate API key is required in this case.', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'google_api_key',
					'type'    => 'text',
					'label'   => __( 'Google Maps API Key', 'immonex-kickstart' ),
					'section' => 'ext_services',
					'args'    => array(
						'description' => wp_sprintf(
							/* translators: %s = Google Developer Docs URL */
							__( 'Provide an key suitable for using the Google APIs mentioned abobe. You can find information about getting and configuring such a key on the respective <a href="%s" target="_blank">Google Developers page</a>. <strong>(Maps JavaScript, Places and Embed APIs have to be activated for the related project!)</strong>', 'immonex-kickstart' ),
							'https://developers.google.com/maps/documentation/javascript/get-api-key'
						),
						'doc_url'     => 'https://developers.google.com/maps/documentation/javascript/get-api-key',
					),
				),
				array(
					'name'    => 'title_turnstile',
					'type'    => 'subsection_header',
					'section' => 'ext_services',
					'args'    => array(
						'title'       => 'Cloudflare Turnstile',
						'description' =>
							wp_sprintf(
								/* translators: %s = Cloudflare Turnstile produce URL */
								__( '<a href="%s" target="_blank">Cloudflare Turnstile</a> is a simple and free <em>CAPTCHA</em> replacement solution that helps to protect forms from spam and other forms of abuse.', 'immonex-kickstart' ),
								__( 'https://www.cloudflare.com/application-services/products/turnstile/', 'immonex-kickstart' )
							) .
							'<br><br>' .
							wp_sprintf(
								/* translators: %1$s = Cloudflare account creation URL, %2$s = Cloudflare Turnstile widget management dashboard URL. */
								__( 'This requires a <a href="%1$s" target="_blank">Cloudflare account</a> and the creation of a <a href="%2$s" target="_blank">Turnstile widget</a> <strong>explicitly for this website</strong> (<em>hostname</em>).', 'immonex-kickstart' ),
								'https://developers.cloudflare.com/fundamentals/account/create-account/',
								'https://developers.cloudflare.com/turnstile/get-started/widget-management/dashboard/'
							) .
							'<br><br>' .
							wp_sprintf(
								/* translators: %1$s = WP privacy policy options URL, %2$s = plugin documentation link ("corresponding paragraph"), %3$s = Cloudflare GDPR FAQ URL. */
								__( 'The service must be activated separately for each form <strong>that supports it</strong> in the options tab of the respective add-on. (The <a href="%1$s">privacy policy</a> should be expanded by a %2$s in this case – see <a href="%3$s" target="_blank">Cloudflare\'s GDPR compliance infos and FAQ</a>.)', 'immonex-kickstart' ),
								admin_url( 'options-privacy.php' ),
								$this->string_utils->doc_link( 'https://docs.immonex.de/kickstart/#/schnellstart/einrichtung?id=cloudflare-turnstile', _x( 'corresponding paragraph', '… expanded by a corresponding paragraph in this case …', 'immonex-kickstart' ) ),
								__( 'https://www.cloudflare.com/trust-hub/gdpr/', 'immonex-kickstart' )
							),
					),
				),
				array(
					'name'    => 'turnstile_sitekey',
					'type'    => 'text',
					'label'   => 'Sitekey',
					'section' => 'ext_services',
					'args'    => array(
						'description' => __( 'The sitekey is public and used to invoke the Turnstile widget on a form page.', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'turnstile_secret_key',
					'type'    => 'text',
					'label'   => 'Secret Key',
					'section' => 'ext_services',
					'args'    => array(
						'description' => __( 'The secret key is used on the server side of the authentication process.', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'turnstile_consent_note',
					'type'    => 'wysiwyg',
					'label'   => __( 'Consent Note', 'immonex-kickstart' ),
					'section' => 'ext_services',
					'args'    => array(
						'description'     => __( 'This notice must be confirmed by the form user before the Turnstile API is loaded or the widget is embedded.', 'immonex-kickstart' ),
						'class'           => 'large-text',
						'required'        => true,
						'editor_settings' => array(
							'default_editor' => 'tinymce',
							'teeny'          => true,
							'quicktags'      => array( 'buttons' => 'strong,em,link,img,close' ),
							'tinymce'        => true,
						),
					),
				),
				array(
					'name'    => 'performance_enable_property_cache',
					'type'    => 'checkbox',
					'label'   => __( 'Properties', 'immonex-kickstart' ),
					'section' => 'performance',
					'args'    => array(
						'description' => __( 'Enable extended caching of real estate object data.', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'performance_enable_map_marker_cache',
					'type'    => 'checkbox',
					'label'   => __( 'Map Markers', 'immonex-kickstart' ),
					'section' => 'performance',
					'args'    => array(
						'description' => __( 'Enable extended caching of map marker data.', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'performance_max_db_cache_size',
					'type'    => 'select',
					'label'   => __( 'Max. Cache Size', 'immonex-kickstart' ),
					'section' => 'performance',
					'args'    => array(
						'description' => __( 'Maximum size of all cached data in the <strong>WP database</strong>. (Object cache entries stored only in the RAM are managed by the respective plugin.)', 'immonex-kickstart' ),
						'options'     => array(
							8   => '8 MB',
							16  => '16 MB',
							32  => '32 MB',
							64  => '64 MB',
							128 => '128 MB',
							256 => '256 MB',
							512 => '512 MB',
						),
					),
				),
				array(
					'name'    => 'enable_withdrawal_processing',
					'type'    => 'checkbox',
					'label'   => __( 'Enable Withdrawal Processing', 'immonex-kickstart' ),
					'section' => 'withdrawal_form_general',
					'args'    => array(
						'description' => __( 'Enable withdrawal form and related custom post type.', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'withdrawal_form_introtext',
					'type'    => 'wysiwyg',
					'label'   => __( 'Introductory Text', 'immonex-kickstart' ),
					'section' => 'withdrawal_form_general',
					'args'    => array(
						'description'     => __( 'This text is displayed above the form.', 'immonex-kickstart' ),
						'editor_settings' => array(
							'default_editor' => 'tinymce',
							'teeny'          => true,
							'quicktags'      => array( 'buttons' => 'strong,em,link,img,close' ),
							'tinymce'        => true,
						),
					),
				),
				array(
					'name'    => 'withdrawal_form_privacy_consent_text',
					'type'    => 'textarea',
					'label'   => __( 'Privacy Note', 'immonex-kickstart' ),
					'section' => 'withdrawal_form_general',
					'args'    => array(
						'description' => wp_sprintf(
							/* translators: %s = privacy options page URL */
							__( 'This note is displayed below the form; explicit confirmation is not required here. (Insert <code>[privacy_policy]</code> to add a link to the privacy policy page defined in the <a href="%s">site options</a>.)', 'immonex-kickstart' ),
							admin_url( 'options-privacy.php' )
						),
					),
				),
				array(
					'name'    => 'withdrawal_form_submission_conf_msg',
					'type'    => 'text',
					'label'   => __( 'Confirmation Message', 'immonex-kickstart' ),
					'section' => 'withdrawal_form_general',
					'args'    => array(
						'description' => __( 'This message is being displayed when the form data have been successfully submitted.', 'immonex-kickstart' ) . ' ' .
							__( 'Embedding in a (local) confirmation page is possbile with the shortcode <code>[inx-withdrawal-form-confirmation-message]</code>.', 'immonex-kickstart' ),
						'class'       => 'large-text',
					),
				),
				array(
					'name'    => 'withdrawal_form_confirmation_page',
					'type'    => 'text',
					'label'   => __( 'Confirmation Page ID/URL', 'immonex-kickstart' ),
					'section' => 'withdrawal_form_general',
					'args'    => array(
						'description' => __( 'Redirect to this page (<strong>ID</strong>) or full URL on successful form submissions.', 'immonex-kickstart' ) .
							' (' . __( 'Enter the ID of the page in the <strong>primary language</strong> in multilingual sites.', 'immonex-kickstart' ) . ')',
					),
				),
				array(
					'name'    => 'withdrawal_admin_notif_subject',
					'type'    => 'text',
					'label'   => __( 'Subject', 'immonex-kickstart' ),
					'section' => 'withdrawal_admin_notif_mails',
					'args'    => array(
						'description' => __( 'The Twig variables listed above can be used here and in the following field.', 'immonex-kickstart' ),
						'class'       => 'large-text',
					),
				),
				array(
					'name'    => 'withdrawal_admin_notif_template',
					'type'    => 'wysiwyg',
					'label'   => __( 'Mail Body', 'immonex-kickstart' ),
					'section' => 'withdrawal_admin_notif_mails',
					'args'    => array(
						'description'     => wp_sprintf(
							/* translators: %s = URL placeholder */
							__( 'HTML and Twig 3 markup can be used here (see info section above and the <a href="%s" target="_blank">Twig documentation</a> for details).', 'immonex-kickstart' ),
							'https://twig.symfony.com/doc/3.x/templates.html'
						) . ' ' .
							__( 'The variable <code>{{ form_data }}</code> <strong>must</strong> be included.', 'immonex-kickstart' ),
						'editor_settings' => array(
							'default_editor' => 'tinymce',
							'teeny'          => true,
							'quicktags'      => array( 'buttons' => 'strong,em,link,img,close' ),
							'tinymce'        => true,
						),
					),
				),
				array(
					'name'    => 'withdrawal_rcpt_conf_subject',
					'type'    => 'text',
					'label'   => __( 'Subject', 'immonex-kickstart' ),
					'section' => 'withdrawal_rcpt_conf_mails',
					'args'    => array(
						'description' => __( 'The Twig variables listed above can be used here and in the following field.', 'immonex-kickstart' ),
						'class'       => 'large-text',
					),
				),
				array(
					'name'    => 'withdrawal_rcpt_conf_template',
					'type'    => 'wysiwyg',
					'label'   => __( 'Mail Body', 'immonex-kickstart' ),
					'section' => 'withdrawal_rcpt_conf_mails',
					'args'    => array(
						'description'     => wp_sprintf(
							/* translators: %s = URL placeholder */
							__( 'HTML and Twig 3 markup can be used here (see info section above and the <a href="%s" target="_blank">Twig documentation</a> for details).', 'immonex-kickstart' ),
							'https://twig.symfony.com/doc/3.x/templates.html'
						),
						'editor_settings' => array(
							'default_editor' => 'tinymce',
							'teeny'          => true,
							'quicktags'      => array( 'buttons' => 'strong,em,link,img,close' ),
							'tinymce'        => true,
						),
					),
				),
				array(
					'name'    => 'maps_require_consent',
					'type'    => 'checkbox',
					'label'   => __( 'Embedded Maps', 'immonex-kickstart' ),
					'section' => 'user_consent',
					'args'    => array(
						'description' => __( 'Request consent for embedding Google and OpenStreetMap/OpenTopoMap based maps on property list and detail pages.', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'distance_search_autocomplete_require_consent',
					'type'    => 'checkbox',
					'label'   => __( 'Location Autocompletion', 'immonex-kickstart' ),
					'section' => 'user_consent',
					'args'    => array(
						'description' => __( 'Request consent for using location autocompletion services in the property search form (radius/distance search).', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'videos_require_consent',
					'type'    => 'checkbox',
					'label'   => __( 'Videos', 'immonex-kickstart' ),
					'section' => 'user_consent',
					'args'    => array(
						'description' => __( 'Request user consent for embedding external video players like YouTube and Vimeo.', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'virtual_tours_require_consent',
					'type'    => 'checkbox',
					'label'   => __( 'Virtual Tours', 'immonex-kickstart' ),
					'section' => 'user_consent',
					'args'    => array(
						'description' => __( 'Request user consent before embedding external viewers for interactive 3D images, 360° views and virtual tours.', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'property_list_page_id',
					'type'    => 'select',
					'label'   => __( 'Property Overview', 'immonex-kickstart' ),
					'section' => 'property_lists_general',
					'args'    => array(
						'description' => wp_sprintf(
							/* translators: %s = property post type archive (incl. link) */
							__( 'Use the specified page as <strong>default</strong> property overview/list page (instead of the %s).', 'immonex-kickstart' ),
							$this->string_utils->doc_link( 'https://docs.immonex.de/kickstart/#/beitragsarten-taxonomien?id=immobilien-beitr%c3%a4ge', __( 'property post type archive', 'immonex-kickstart' ) )
						),
						'options'     => $pages_list,
						'doc_url'     => 'https://docs.immonex.de/kickstart/#/schnellstart/einrichtung?id=immobilien-Übersicht',
					),
				),
				array(
					'name'    => 'properties_per_page',
					'type'    => 'number',
					'label'   => __( 'Properties per Page', 'immonex-kickstart' ),
					'section' => 'property_lists_general',
					'args'    => array(
						'description'      => __( '<strong>Default</strong> number of properties to display <strong>per page</strong> in list views', 'immonex-kickstart' ) . ' '
							. __( '(can be overridden per shortcode attribute, e.g. <code>[inx-property-list <strong>limit-page="6"</strong>]</code>)', 'immonex-kickstart' ),
						'class'            => 'small-text',
						'min'              => 1,
						'default_if_empty' => get_option( 'posts_per_page' ),
					),
				),
				array(
					'name'    => 'property_list_map_type',
					'type'    => 'select',
					'label'   => __( 'Map Type', 'immonex-kickstart' ),
					'section' => 'property_list_maps',
					'args'    => array(
						'description' => __( 'Select the type of map to be displayed on property <strong>list/archive pages</strong> (<em>none</em> to disable the map).', 'immonex-kickstart' ) . '<br>' .
							wp_sprintf(
								/* translators: %s = Tab/Section URL */
								__( 'For the <strong>Google Maps</strong> based variants, an appropriate API key is required (see tab <a href="%s">General &rarr; External Services</a>). Otherwise, an OSM map is embedded as fallback solution.', 'immonex-kickstart' ),
								admin_url( 'admin.php?page=immonex-kickstart_settings&tab=tab_general&section_tab=7' )
							),
						'class'       => 'large-select',
						'options'     => $this->property_list_map_types,
						'doc_url'     => 'https://docs.immonex.de/kickstart/#/komponenten/karte',
					),
				),
				array(
					'name'    => 'property_list_map_lat',
					'type'    => 'text',
					'label'   => __( 'Default Latitude', 'immonex-kickstart' ),
					'section' => 'property_list_maps',
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
					'section' => 'property_list_maps',
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
					'section' => 'property_list_maps',
					'args'    => array(
						'description' => wp_sprintf(
							'%1$s %2$s %3$s',
							Property_Map::LIST_MAP_ZOOM[0],
							__( 'to', 'immonex-kickstart' ),
							Property_Map::LIST_MAP_ZOOM[1]
						),
						'class'       => 'small-text',
						'min'         => Property_Map::LIST_MAP_ZOOM[0],
						'max'         => Property_Map::LIST_MAP_ZOOM[1],
					),
				),
				array(
					'name'    => 'property_list_map_auto_fit',
					'type'    => 'checkbox',
					'label'   => __( 'Auto-Fit Map Bounds', 'immonex-kickstart' ),
					'section' => 'property_list_maps',
					'args'    => array(
						'description' => __( 'Automatically set map bounds and zoom level to include all property location markers.', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'property_details_page_id',
					'type'    => 'select',
					'label'   => __( 'Property Details Page', 'immonex-kickstart' ),
					'section' => 'property_details_general',
					'args'    => array(
						'description' => __( 'Use the specified page as base for displaying the property details (instead of the default template).', 'immonex-kickstart' ),
						'options'     => $pages_details,
						'doc_url'     => 'https://docs.immonex.de/kickstart/#/schnellstart/einrichtung?id=immobilien-detailseite',
					),
				),
				array(
					'name'    => 'post_nav',
					'type'    => 'select',
					'label'   => __( 'Previous/Next Navigation', 'immonex-kickstart' ),
					'section' => 'property_details_general',
					'args'    => array(
						'description' => wp_sprintf(
							/* translators: %s = documentation URL */
							__( 'The previous/next navigation is available in the <a href="%s" target="_blank">footer section</a> by default if the property is part of a selection based on certain search criteria. Alternatively, it can be generally enabled (optionally including first/last property links) or disabled (overview link only).', 'immonex-kickstart' ),
							'https://docs.immonex.de/kickstart/#/komponenten/detailansicht?id=footer'
						),
						'options'     => array(
							'never'                     => __( 'never', 'immonex-kickstart' ),
							'selection'                 => __( 'in search results', 'immonex-kickstart' ),
							'selection_incl_first_last' => __( 'in search results', 'immonex-kickstart' ) . ' (' . __( 'incl. first/last property', 'immonex-kickstart' ) . ')',
							'always'                    => __( 'always', 'immonex-kickstart' ),
							'always_incl_first_last'    => __( 'always', 'immonex-kickstart' ) . ' (' . __( 'incl. first/last property', 'immonex-kickstart' ) . ')',
						),
						'doc_url'     => 'https://docs.immonex.de/kickstart/#/schnellstart/einrichtung?id=vorzur%c3%bcck-navigation',
					),
				),
				array(
					'name'    => 'apply_wpautop_details_page',
					'type'    => 'checkbox',
					'label'   => __( 'Apply wpautop', 'immonex-kickstart' ),
					'section' => 'property_details_general',
					'args'    => array(
						'description' => __( 'Activate to add new lines and paragraphs in description texts on detail pages automatically (<em>wpautop</em>).', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'details_link_conversion',
					'type'    => 'select',
					'label'   => __( 'Link Conversion', 'immonex-kickstart' ),
					'section' => 'property_details_general',
					'args'    => array(
						'description' => __( 'Convert URLs and/or email addresses in description texts into links.', 'immonex-kickstart' ),
						'options'     => array(
							''           => __( 'none', 'immonex-kickstart' ),
							'full'       => __( 'yes, including email addresses and video URLs', 'immonex-kickstart' ),
							'incl_email' => __( 'yes, including email adresses', 'immonex-kickstart' ),
							'incl_video' => __( 'yes, including video URLs', 'immonex-kickstart' ),
						),
					),
				),
				array(
					'name'    => 'show_seller_commission',
					'type'    => 'checkbox',
					'label'   => __( 'Show Seller/Internal Commission', 'immonex-kickstart' ),
					'section' => 'property_details_general',
					'args'    => array(
						'description' => __( 'Seller commission (inner commission) display in property detail pages is disabled by default, but can be enabled using this option if required.', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'disable_detail_view_states',
					'type'    => 'checkbox_group',
					'label'   => __( 'Disable Detail View for…', 'immonex-kickstart' ),
					'section' => 'property_details_general',
					'args'    => array(
						'description' => __( 'Detail pages and related links in list views will be disabled for properties with the selected states.', 'immonex-kickstart' ),
						'options'     => array(
							'is_sold'      => __( 'sold/rented properties', 'immonex-kickstart' ),
							'is_reserved'  => __( 'reserved properties', 'immonex-kickstart' ),
							'is_reference' => __( 'reference properties', 'immonex-kickstart' ),
						),
					),
				),
				array(
					'name'    => 'enable_gallery_image_links',
					'type'    => 'checkbox',
					'label'   => __( 'Image Links', 'immonex-kickstart' ),
					'section' => 'property_details_gallery',
					'args'    => array(
						'description' => __( 'Enable full size/lightbox link for the currently displayed image (see the Lightbox section below).', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'enable_gallery_lazy_loading',
					'type'    => 'checkbox',
					'label'   => __( 'Lazy Loading', 'immonex-kickstart' ),
					'section' => 'property_details_gallery',
					'args'    => array(
						'description' => __( 'Enable <em>lazy loading</em> for the images in the slider.', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'gallery_image_slider_bg_color',
					'type'    => 'colorpicker',
					'label'   => __( 'Image Slider Background Color', 'immonex-kickstart' ),
					'section' => 'property_details_gallery',
					'args'    => array(),
				),
				array(
					'name'    => 'gallery_image_slider_min_height',
					'type'    => 'number',
					'label'   => __( 'Image Slider Minimum Height', 'immonex-kickstart' ),
					'section' => 'property_details_gallery',
					'args'    => array(
						'description'  => __( 'Minimum height of the <strong>container element</strong> that holds the image slider of the gallery (in pixels).', 'immonex-kickstart' ),
						'class'        => 'small-text',
						'min'          => 0,
						'max'          => 800,
						'field_suffix' => 'px',
					),
				),
				array(
					'name'    => 'gallery_image_max_height',
					'type'    => 'number',
					'label'   => __( 'Maximum Image Height', 'immonex-kickstart' ),
					'section' => 'property_details_gallery',
					'args'    => array(
						'description'  => __( 'Maximum <strong>display height</strong> of the slider images (can be overwritten with the constant <code>INX_SKIN_MAX_IMAGE_HEIGHT</code>).', 'immonex-kickstart' ),
						'class'        => 'small-text',
						'min'          => 600,
						'max'          => 3200,
						'field_suffix' => 'px',
					),
				),
				array(
					'name'    => 'title_lightbox',
					'type'    => 'subsection_header',
					'section' => 'property_details_gallery',
					'args'    => array(
						'title'       => 'Lightbox',
						'description' => __( 'The Kickstart lightbox (images only) is <strong>disabled by default</strong> to avoid conflicts with the corresponding theme functionality. Select an animation type to enable it.', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'lightbox_animation',
					'type'    => 'select',
					'label'   => __( 'Animation', 'immonex-kickstart' ),
					'section' => 'property_details_gallery',
					'args'    => array(
						'options' => array(
							''      => __( 'none (use theme lightbox)', 'immonex-kickstart' ),
							'slide' => 'Slide',
							'fade'  => 'Fade',
							'scale' => 'Scale',
						),
					),
				),
				array(
					'name'    => 'lightbox_nav',
					'type'    => 'select',
					'label'   => __( 'Navigation', 'immonex-kickstart' ),
					'section' => 'property_details_gallery',
					'args'    => array(
						'options' => array(
							''         => __( 'Previous/Next Icons', 'immonex-kickstart' ),
							'thumbnav' => 'Thumbnails',
							'dotnav'   => __( 'Dots', 'immonex-kickstart' ),
							'false'    => __( 'none', 'immonex-kickstart' ),
						),
					),
				),
				array(
					'name'    => 'enable_lightbox_counter',
					'type'    => 'checkbox',
					'label'   => __( 'Counter', 'immonex-kickstart' ),
					'section' => 'property_details_gallery',
					'args'    => array(
						'description' => __( 'Display a counter with the current and the total number of images.', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'enable_lightbox_caption',
					'type'    => 'checkbox',
					'label'   => __( 'Image Captions', 'immonex-kickstart' ),
					'section' => 'property_details_gallery',
					'args'    => array(),
				),
				array(
					'name'    => 'title_kbe',
					'type'    => 'subsection_header',
					'section' => 'property_details_gallery',
					'args'    => array(
						'title'       => __( 'Ken Burns Effect', 'immonex-kickstart' ) . ' (KBE)',
						'description' => wp_sprintf(
							/* translators: %1$s = Ken Burns Effect incl. Wikipedia link */
							__( 'The %1$s is a panning and zooming animation from non-consecutive still images that comes from film and video production.', 'immonex-kickstart' ),
							$this->string_utils->doc_link( __( 'https://en.wikipedia.org/wiki/Ken_Burns_effect', 'immonex-kickstart' ), __( 'Ken Burns Effect', 'immonex-kickstart' ) ),
						),
					),
				),
				array(
					'name'    => 'enable_ken_burns_effect',
					'type'    => 'checkbox',
					'label'   => __( 'Enable KBE', 'immonex-kickstart' ),
					'section' => 'property_details_gallery',
					'args'    => array(),
				),
				array(
					'name'    => 'ken_burns_effect_display_mode',
					'type'    => 'select',
					'label'   => __( 'KBE Display Mode', 'immonex-kickstart' ),
					'section' => 'property_details_gallery',
					'args'    => array(
						'description' => __( 'Covering the entire area of the container element usually looks better, but some images may be displayed "cropped" horizontally after the animation (depending on the different aspect ratios of the gallery images).', 'immonex-kickstart' ) .
							' ' . __( 'In return, always displaying the images in full may result in empty areas at the top and/or bottom of the container element.', 'immonex-kickstart' ),
						'options'     => array(
							'cover'       => __( 'cover the entire container element', 'immonex-kickstart' ),
							'full_center' => __( 'show full images', 'immonex-kickstart' ) . ' (' . __( 'centered', 'immonex-kickstart' ) . ')',
							'full_top'    => __( 'show full images', 'immonex-kickstart' ) . ' (' . __( 'top', 'immonex-kickstart' ) . ')',
						),
					),
				),
				array(
					'name'    => 'ken_burns_effect_min_image_width',
					'type'    => 'number',
					'label'   => __( 'KBE Minimum Image Width', 'immonex-kickstart' ),
					'section' => 'property_details_gallery',
					'args'    => array(
						'description'  => __( 'Minimum width of images to be animated (can be overwritten with the constant <code>INX_SKIN_KEN_BURNS_MIN_IMAGE_WIDTH</code>).', 'immonex-kickstart' ),
						'class'        => 'small-text',
						'min'          => 600,
						'max'          => 3200,
						'field_suffix' => 'px',
					),
				),
				array(
					'name'    => 'property_details_map_type',
					'type'    => 'select',
					'label'   => __( 'Map Type', 'immonex-kickstart' ),
					'section' => 'property_detail_maps',
					'args'    => array(
						'description' => __( 'Select the type of map to be displayed on property <strong>detail pages</strong> (none = disable map).', 'immonex-kickstart' ) . '<br>' .
							wp_sprintf(
								/* translators: %s = Tab/Section URL */
								__( 'For the <strong>Google Maps</strong> based variants, an appropriate API key is required (see tab <a href="%s">General &rarr; External Services</a>).', 'immonex-kickstart' ),
								admin_url( 'admin.php?page=immonex-kickstart_settings&tab=tab_general&section_tab=7' )
							),
						'class'       => 'large-select',
						'options'     => $this->property_details_map_types,
					),
				),
				array(
					'name'    => 'property_details_map_zoom',
					'type'    => 'number',
					'label'   => __( 'Default Zoom Level', 'immonex-kickstart' ),
					'section' => 'property_detail_maps',
					'args'    => array(
						'description' => wp_sprintf(
							'%1$s %2$s %3$s',
							Property::LOCATION_MAP_ZOOM[0],
							__( 'to', 'immonex-kickstart' ),
							Property::LOCATION_MAP_ZOOM[1]
						),
						'class'       => 'small-text',
						'min'         => Property::LOCATION_MAP_ZOOM[0],
						'max'         => Property::LOCATION_MAP_ZOOM[1],
					),
				),
				array(
					'name'    => 'property_details_map_infowindow_contents',
					'type'    => 'text',
					'label'   => __( 'Info Window Note', 'immonex-kickstart' ),
					'section' => 'property_detail_maps',
					'args'    => array(
						'description' => __( 'If stated, this note gets displayed within a map info window above the property location marker.', 'immonex-kickstart' ),
						'class'       => 'large-text',
					),
				),
				array(
					'name'    => 'property_details_map_note_map_marker',
					'type'    => 'text',
					'label'   => __( 'Marker Map Note', 'immonex-kickstart' ),
					'section' => 'property_detail_maps',
					'args'    => array(
						'description' => __( 'This note gets displayed below <strong>marker based</strong> maps.', 'immonex-kickstart' ),
						'class'       => 'large-text',
					),
				),
				array(
					'name'    => 'property_details_map_note_map_embed',
					'type'    => 'text',
					'label'   => __( 'Neighborhood Map Note', 'immonex-kickstart' ),
					'section' => 'property_detail_maps',
					'args'    => array(
						'description' => __( 'This note gets displayed below <strong>neighborhood based</strong> maps.', 'immonex-kickstart' ),
						'class'       => 'large-text',
					),
				),
				array(
					'name'    => 'property_search_dynamic_update',
					'type'    => 'checkbox',
					'label'   => __( 'Dynamic Update', 'immonex-kickstart' ),
					'section' => 'property_search',
					'args'    => array(
						'description' => __( 'If activated, property lists and overview maps on the same page are dynamically updated when the search parameters change.', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'property_search_no_results_text',
					'type'    => 'wysiwyg',
					'label'   => __( 'No Results Message', 'immonex-kickstart' ),
					'section' => 'property_search',
					'args'    => array(
						'description'     => __( 'This message is displayed when a property search returns no results.', 'immonex-kickstart' ),
						'class'           => 'large-text',
						'editor_settings' => array(
							'default_editor' => 'tinymce',
							'teeny'          => true,
							'quicktags'      => array( 'buttons' => 'strong,em,link,img,close' ),
							'tinymce'        => true,
						),
					),
				),
				array(
					'name'    => 'distance_search_autocomplete_type',
					'type'    => 'select',
					'label'   => __( 'Autocompletion', 'immonex-kickstart' ),
					'section' => 'distance_search',
					'args'    => array(
						'description' => __( 'Select the autocomplete solution to use for the distance search in property search forms (none = disable distance search).', 'immonex-kickstart' ) . '<br>' .
							wp_sprintf(
								/* translators: %s = Tab/Section URL */
								__( 'For the <strong>Google Places</strong> based variant, an appropriate API key is required (see tab <a href="%s">General &rarr; External Services</a>).', 'immonex-kickstart' ),
								admin_url( 'admin.php?page=immonex-kickstart_settings&tab=tab_general&section_tab=7' )
							),
						'options'     => $this->distance_search_autocomplete_types,
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
					'section' => 'taxonomy_slugs',
					'args'    => array(
						'description' => __( '<strong>properties/location</strong> by default, <em>inx_location</em> if empty', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'tax_type_of_use_slug_rewrite',
					'type'    => 'text',
					'label'   => __( 'Type of Use', 'immonex-kickstart' ),
					'section' => 'taxonomy_slugs',
					'args'    => array(
						'description' => __( '<strong>properties/type-of-use</strong> by default, <em>inx_type_of_use</em> if empty', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'tax_property_type_slug_rewrite',
					'type'    => 'text',
					'label'   => __( 'Property Type', 'immonex-kickstart' ),
					'section' => 'taxonomy_slugs',
					'args'    => array(
						'description' => __( '<strong>properties/type</strong> by default, <em>inx_property_type</em> if empty', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'tax_marketing_type_slug_rewrite',
					'type'    => 'text',
					'label'   => __( 'Marketing Type', 'immonex-kickstart' ),
					'section' => 'taxonomy_slugs',
					'args'    => array(
						'description' => __( '<strong>properties/buy-rent</strong> by default, <em>inx_marketing_type</em> if empty', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'tax_feature_slug_rewrite',
					'type'    => 'text',
					'label'   => __( 'Feature', 'immonex-kickstart' ),
					'section' => 'taxonomy_slugs',
					'args'    => array(
						'description' => __( '<strong>properties/feature</strong> by default, <em>inx_feature</em> if empty', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'tax_label_slug_rewrite',
					'type'    => 'text',
					'label'   => __( 'Label', 'immonex-kickstart' ),
					'section' => 'taxonomy_slugs',
					'args'    => array(
						'description' => __( '<strong>properties/label</strong> by default, <em>inx_label</em> if empty', 'immonex-kickstart' ),
					),
				),
				array(
					'name'    => 'tax_project_slug_rewrite',
					'type'    => 'text',
					'label'   => __( 'Project', 'immonex-kickstart' ),
					'section' => 'taxonomy_slugs',
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
				isset( $field['label'] ) ? $field['label'] : '',
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
		if ( ! is_array( $atts ) ) {
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
