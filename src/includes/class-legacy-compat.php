<?php
/**
 * Class Legacy_Compat
 *
 * @package immonex\Kickstart
 */

namespace immonex\Kickstart;

/**
 * Compatibility/Cleanup regarding previous plugin versions.
 */
class Legacy_Compat {

	/**
	 * Array of bootstrap data
	 *
	 * @var mixed[]
	 */
	private $data;

	/**
	 * Constructor
	 *
	 * @since 1.9.12-beta
	 *
	 * @param mixed[] $bootstrap_data Bootstrap data.
	 */
	public function __construct( $bootstrap_data ) {
		$this->data = $bootstrap_data;

		add_filter( 'inx_remove_outdated_plugin_options', array( $this, 'convert_outdated_plugin_options' ) );
		add_filter( 'inx_options_after_activation', array( $this, 'add_missing_option_values' ) );
	} // __construct

	/**
	 * Convert outdated plugin options if required (filter callback).
	 *
	 * @since 1.9.12-beta
	 *
	 * @param mixed[] $options Current and removed plugin options as separate
	 *                         key/value arrays.
	 *
	 * @return mixed[] Possibly updated plugin options.
	 */
	public function convert_outdated_plugin_options( $options ) {
		if (
			isset( $options['outdated']['property_list_map_display_by_default'] )
			&& ! $options['outdated']['property_list_map_display_by_default']
		) {
			// Convert outdated property list map option.
			$options['current']['property_list_map_type'] = '';
		}

		return $options;
	} // convert_outdated_plugin_options

	/**
	 * Add missing or modify invalid/outdated plugin option values (filter callback).
	 *
	 * @since 1.9.12-beta
	 *
	 * @param mixed[] $options Plugin options directly after activation.
	 *
	 * @return mixed[] Possibly updated plugin options.
	 */
	public function add_missing_option_values( $options ) {
		if ( empty( $options['properties_per_page'] ) ) {
			$options['properties_per_page'] = get_option( 'posts_per_page' );
		}

		return $options;
	} // add_missing_option_values

} // Legacy_Compat
