<?php
/**
 * Class OpenImmo2WP_Compat
 *
 * @package immonex\Kickstart
 */

namespace immonex\Kickstart;

/**
 * OpenImmo2WP Compatibility.
 */
class OpenImmo2WP_Compat {

	/**
	 * Array of bootstrap data
	 *
	 * @var mixed[]
	 */
	private $data;

	/**
	 * Constructor
	 *
	 * @since 1.6.18-beta
	 *
	 * @param mixed[] $bootstrap_data Bootstrap data.
	 */
	public function __construct( $bootstrap_data ) {
		$this->data = $bootstrap_data;

		add_action( 'immonex_oi2wp_property_imported', array( $this, 'maybe_add_missing_required_meta' ), 50, 2 );
	} // __construct

	/**
	 * Check existing property posts for missing required custom fields and possibly
	 * add default values.
	 *
	 * @since 1.6.18-beta
	 */
	public function check_property_posts() {
		$required_prop_cf_defaults = apply_filters(
			'inx_required_property_custom_field_defaults',
			$this->data['required_prop_cf_defaults']
		);

		$args = array(
			'post_type'                     => $this->data['property_post_type_name'],
			'post_status'                   => 'any',
			'posts_per_page'                => -1,
			'fields'                        => 'ids',
			'suppress_pre_get_posts_filter' => true,
		);

		if ( empty( array_diff_key( $required_prop_cf_defaults, $this->data['required_prop_cf_defaults'] ) ) ) {
			$args['meta_query'] = array(
				array(
					'key'     => '_inx_req_prop_cf_check',
					'compare' => 'NOT EXISTS',
				),
			);
		}

		$posts = get_posts( $args );

		if ( ! empty( $posts ) ) {
			foreach ( $posts as $post_id ) {
				$this->maybe_add_missing_required_meta( $post_id, false, $required_prop_cf_defaults );
			}
		}
	} // check_property_posts

	/**
	 * Add required custom fields of property posts with default values if missing.
	 *
	 * @since 1.6.18-beta
	 *
	 * @param int|string             $post_id                   Property post ID.
	 * @param \SimpleXMLElement|bool $immobilie                 Property XML object (optional).
	 * @param mixed[]|bool           $required_prop_cf_defaults Custom field defaults (optional).
	 */
	public function maybe_add_missing_required_meta( $post_id, $immobilie = false, $required_prop_cf_defaults = false ) {
		if ( false === $required_prop_cf_defaults ) {
			$required_prop_cf_defaults = apply_filters(
				'inx_required_property_custom_field_defaults',
				$this->data['required_prop_cf_defaults']
			);
		}

		if (
			empty( $required_prop_cf_defaults )
			|| ! is_array( $required_prop_cf_defaults )
		) {
			return;
		}

		foreach ( $required_prop_cf_defaults as $meta_key => $default_value ) {
			if ( ! get_post_meta( $post_id, $meta_key, true ) ) {
				add_post_meta( $post_id, $meta_key, $default_value, true );
			}
		}

		add_post_meta( $post_id, '_inx_req_prop_cf_check', Kickstart::PLUGIN_VERSION, true );
	} // maybe_add_missing_required_meta

} // OpenImmo2WP_Compat
