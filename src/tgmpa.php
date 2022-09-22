<?php
/**
 * TGMPA handling
 *
 * @package immonex\Kickstart
 */

namespace immonex\Kickstart;

require_once __DIR__ . '/includes/third_party/class-tgm-plugin-activation.php';

add_action( 'tgmpa_register', __NAMESPACE__ . '\register_required_plugins' );

if ( ! is_callable( __NAMESPACE__ . '\register_required_plugins' ) ) {
	/**
	 * Register required plugins.
	 */
	function register_required_plugins() {
		$plugins = array(
			array(
				'name'        => 'immonex Kickstart Team',
				'slug'        => 'immonex-kickstart-team',
				'is_callable' => array( '\immonex\Kickstart\Team', 'init_plugin' ),
				'required'    => false,
			),
		);

		$config = array(
			'id'           => 'immonex-kickstart',
			'default_path' => '',
			'menu'         => 'tgmpa-install-plugins',
			'parent_slug'  => 'plugins.php',
			'capability'   => 'manage_options',
			'has_notices'  => true,
			'dismissable'  => true,
			'dismiss_msg'  => '',
			'is_automatic' => false,
			'message'      => '',
		);

		tgmpa( $plugins, $config );
	} // register_required_plugins
}
