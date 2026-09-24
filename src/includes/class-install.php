<?php
/**
 * Class Install
 *
 * @package immonex\Kickstart
 */

namespace immonex\Kickstart;

/**
 * Plugin installation/activation related methods.
 */
class Install {

	/**
	 * Bootstrap Data
	 *
	 * @var mixed[]
	 */
	private $data;

	/**
	 * Utility Objects
	 *
	 * @var object[]
	 */
	private $utils;

	/**
	 * Prefix for Hook Names etc.
	 *
	 * @var string
	 */
	private $prefix;

	/**
	 * Constructor
	 *
	 * @since 1.0.0
	 *
	 * @param mixed[]  $bootstrap_data Plugin bootstrap data.
	 * @param object[] $utils          Utility objects.
	 */
	public function __construct( $bootstrap_data, $utils ) {
		$this->data   = $bootstrap_data;
		$this->prefix = $bootstrap_data['plugin_prefix'];
		$this->utils  = $utils;
	} // __construct

	/**
	 * Set theme/plugin-specific option values that contain content to be translated.
	 *
	 * @since 1.18.0
	 *
	 * @param mixed[] $plugin_options Plugin options.
	 */
	public function insert_translated_default_option_values( &$plugin_options ) {
		if ( empty( $plugin_options ) ) {
			return;
		}

		$defaults = [
			'reference_price_text'                     => __( 'Price on demand', 'immonex-kickstart' ),
			'property_search_no_results_text'          => __( 'Currently there are no properties that match the search criteria.', 'immonex-kickstart' ),
			'property_details_map_infowindow_contents' => __( 'The real property location may differ from the marker position.', 'immonex-kickstart' ),
			'property_details_map_note_map_embed'      => __( 'The map roughly shows the location in which the property is located.', 'immonex-kickstart' ),
			'property_post_type_slug_rewrite'          => _x( 'properties', 'Custom Post Type Slug (plural only!)', 'immonex-kickstart' ),
			'tax_location_slug_rewrite'                => _x( 'properties/location', 'Custom Taxonomy Slug', 'immonex-kickstart' ),
			'tax_type_of_use_slug_rewrite'             => _x( 'properties/type-of-use', 'Custom Taxonomy Slug', 'immonex-kickstart' ),
			'tax_property_type_slug_rewrite'           => _x( 'properties/type', 'Custom Taxonomy Slug', 'immonex-kickstart' ),
			'tax_marketing_type_slug_rewrite'          => _x( 'properties/buy-rent', 'Custom Taxonomy Slug', 'immonex-kickstart' ),
			'tax_feature_slug_rewrite'                 => _x( 'properties/feature', 'Custom Taxonomy Slug', 'immonex-kickstart' ),
			'tax_label_slug_rewrite'                   => _x( 'properties/label', 'Custom Taxonomy Slug', 'immonex-kickstart' ),
			'tax_project_slug_rewrite'                 => _x( 'properties/project', 'Custom Taxonomy Slug', 'immonex-kickstart' ),
			'turnstile_consent_note'                   => wp_sprintf(
				/* translators: %s = Cloudflare Turnstile privacy policy URL */
				__( 'Upon confirmation, a form security check is performed using <a href="%s" target="_blank">Cloudflare Turnstile</a>.', 'immonex-kickstart' ),
				__( 'https://www.cloudflare.com/privacypolicy/', 'immonex-kickstart' )
			),
			'pagination_screen_reader_text'            => __( 'Property Posts Pagination', 'immonex-kickstart' ),
			'pagination_aria_label'                    => __( 'Property Posts Pagination', 'immonex-kickstart' ),
			'pagination_prev_text'                     => __( 'Previous Page', 'immonex-kickstart' ),
			'pagination_next_text'                     => __( 'Next Page', 'immonex-kickstart' ),
			'withdrawal_form_introtext'                => __( 'I/We hereby withdraw the contract concluded by me/us regarding the reference number or type of commissioned services specified below.', 'immonex-kickstart' ),
			'withdrawal_form_submission_conf_msg'      => __( 'Your withdrawal has been submitted. A confirmation of receipt has been sent to the provided email address. Please check your inbox!', 'immonex-kickstart' ),
			'withdrawal_form_privacy_consent_text'     => __( 'By submitting I consent to my data being processed and stored in accordance with the [privacy_policy] in order to process my withdrawal. This consent can be revoked at any time.', 'immonex-kickstart' ),
			'withdrawal_admin_notif_subject'           => __( 'New withdrawal', 'immonex-kickstart' ),
			'withdrawal_admin_notif_template'          => wp_sprintf(
				'%1$s' . PHP_EOL . PHP_EOL . '%2$s' . PHP_EOL . PHP_EOL . '{{ form_data }}',
				__( 'A new contract withdrawal by {{ name }} has been received:', 'immonex-kickstart' ),
				__( 'I/We hereby withdraw the contract concluded by me/us regarding the reference number or type of commissioned services specified below.', 'immonex-kickstart' )
			),
			'withdrawal_rcpt_conf_subject'             => '[{{ site_title_limited }}] ' . __( 'Withdrawal received', 'immonex-kickstart' ),
			'withdrawal_rcpt_conf_template'            => wp_sprintf(
				'%1$s' . PHP_EOL . PHP_EOL . '%2$s' . PHP_EOL . PHP_EOL . '{{ form_data }}' . PHP_EOL . PHP_EOL . '%3$s' . PHP_EOL . PHP_EOL . '%4$s' . PHP_EOL . PHP_EOL . '{{ company_name }}',
				__( 'Good day!', 'immonex-kickstart' ),
				__( 'We hereby acknowledge receipt of your contract withdrawal request containing the details listed below.', 'immonex-kickstart' ),
				__( 'In the next step, we will check all the information and then send you a separate confirmation of the actual cancellation or, if necessary, some follow-up questions beforehand.', 'immonex-kickstart' ),
				__( 'Kind regards,', 'immonex-kickstart' )
			),
		];

		$option_string_translated = false;

		foreach ( $defaults as $key => $value ) {
			if ( isset( $plugin_options[ $key ] ) && 'INSERT_TRANSLATED_DEFAULT_VALUE' === $plugin_options[ $key ] ) {
				$plugin_options[ $key ]   = $value;
				$option_string_translated = true;
			}
		}

		if ( $option_string_translated ) {
			update_option( $this->data['plugin_options_name'], $plugin_options );
		}
	} // insert_translated_default_option_values

	/**
	 * Perform general cleanup tasks (e.g., deleting obsolete plugin options
	 * or transients).
	 *
	 * @since 1.18.0
	 */
	public function cleanup() {
		delete_transient( 'inx_preview_pagination_output' );
	} // cleanup

} // class Install
