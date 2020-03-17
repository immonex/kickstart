<?php
/**
 * API class
 *
 * @package immonex-kickstart
 */

namespace immonex\Kickstart;

/**
 * Public methods for third-party developments.
 */
class API {

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
	 * Determine/Calculate the primary price ranges based on the current
	 * property data.
	 *
	 * @since 1.0.0
	 *
	 * @param int[]   $default_values Default ranges (selected min, selected max,
	 *                                range min (sale), range max (sale),
	 *                                range min (rent), range max (rent)).
	 * @param mixed[] $force_values Force specific values (if !== false).
	 *
	 * @return int[] Selected min/max and range values.
	 */
	public function get_primary_price_min_max( $default_values = array( 0, 500000, 0, 500000, 0, 1000 ), $force_values = array( 0, false, 0, false, 0, false ) ) {
		// TODO: Add cache.
		$field_prefix = '_' . $this->config['plugin_prefix'];
		$min_max      = is_array( $default_values ) && 6 === count( $default_values ) ? $default_values : array( 0, 0, 0, 0, 0, 0 );

		if ( is_array( $force_values ) && count( $force_values ) > 0 ) {
			foreach ( $force_values as $i => $value ) {
				if ( false !== $value ) {
					$min_max[ $i ] = $value;
				}
			}
		} else {
			$force_values = array( false, false, false, false );
		}

		$marketing_types = array(
			'sale' => 1,
			'rent' => 0,
		);

		$cnt = 0;

		foreach ( $marketing_types as $key => $is_sale ) {
			$min_index = $cnt + 2;
			$max_index = $cnt + 3;

			$args = array(
				'post_type'                     => $this->config['property_post_type_name'],
				'post_status'                   => array( 'publish' ),
				'posts_per_page'                => -1,
				'fields'                        => 'ids',
				'meta_query'                    => array(
					array(
						'key'   => $field_prefix . 'is_sale',
						'value' => $is_sale,
					),
				),
				'suppress_pre_get_posts_filter' => true,
			);

			$property_ids = get_posts( $args );

			if ( count( $property_ids ) > 0 ) {
				foreach ( $property_ids as $post_id ) {
					$price   = (int) get_post_meta( $post_id, $field_prefix . 'primary_price', true );
					$base    = (int) 1 . str_repeat( '0', strlen( (string) $price ) - 1 );
					$roundup = ceil( $price / $base ) * $base;

					if ( $roundup ) {
						// Unrelated min value.
						if ( $roundup < $min_max[0] && false === $force_values[0] ) {
							$min_max[0] = $roundup;
						}

						// Min value for sale OR rent properties.
						if ( $roundup < $min_max[ $min_index ] && false === $force_values[ $min_index ] ) {
							$min_max[ $min_index ] = $roundup;
						}

						// Unrelated max value.
						if ( $roundup > $min_max[1] && false === $force_values[1] ) {
							$min_max[1] = $roundup;
						}

						// Max value for sale OR rent properties.
						if ( $roundup > $min_max[ $max_index ] && false === $force_values[ $max_index ] ) {
							$min_max[ $max_index ] = $roundup;
						}
					}
				}
			}

			$cnt += 2;
		}

		return $min_max;
	} // get_primary_price_min_max

} // API
