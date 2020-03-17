<?php
/**
 * PHPUnit bootstrap file
 */

$_tests_dir = getenv( 'WP_TESTS_DIR' );

if ( ! $_tests_dir ) {
	$_tests_dir = rtrim( sys_get_temp_dir(), '/\\' ) . '/wordpress-tests-lib';
}

if ( ! file_exists( $_tests_dir . '/includes/functions.php' ) ) {
	echo "Could not find $_tests_dir/includes/functions.php, have you run bin/install-wp-tests.sh ?" . PHP_EOL; // WPCS: XSS ok.
	exit( 1 );
}

// Give access to tests_add_filter() function.
require_once $_tests_dir . '/includes/functions.php';

// inveris/immonex: Register WP style autoloader.
require_once __DIR__ . '/../src/autoload.php';

/**
 * Manually load the plugin being tested.
 */
function _manually_load_plugin() {
	// inveris/immonex
	$src_folder = dirname( dirname( __FILE__ ) ) . '/src';
	$plugin_main_file = '';

	$plugin_root_level_files = glob( "{$src_folder}/*.php" );
	if ( count( $plugin_root_level_files ) ) {
		foreach ( $plugin_root_level_files as $php_file ) {
			if ( false !== stripos( file_get_contents( $php_file ), 'Plugin Name:' ) ) {
				$plugin_main_file = $php_file;
				break;
			}
		}
	}

	if ( ! $plugin_main_file ) {
		echo "No main plugin file not found in source folder ({$src_folder})." . PHP_EOL;
		exit( 1 );
	}

	require $plugin_main_file;
	// /inveris/immonex
}
tests_add_filter( 'muplugins_loaded', '_manually_load_plugin' );

// Start up the WP testing environment.
require $_tests_dir . '/includes/bootstrap.php';
