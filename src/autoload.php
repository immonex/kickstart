<?php
/**
 * Autoloader registration
 *
 * @package immonex\Kickstart
 */

namespace immonex\Kickstart;

/**
 * Initialize the Composer autoloader first (optional).
 */
require_once __DIR__ . '/vendor/autoload.php';

/**
 * The base classes of immonex WP Free Plugin core have their own autoloader.
 */
require_once __DIR__ . '/vendor/immonex/wp-free-plugin-core/src/autoload.php';

if ( ! is_callable( __NAMESPACE__ . '\autoload' ) ) {
	/**
	 * Automatically locate and load files based on their namespaces and their
	 * class/file names whenever they are instantiated.
	 *
	 * Based on / inspired by:
	 * https://github.com/tommcfarlin/simple-autoloader-for-wordpress
	 * https://gist.github.com/sheabunge/50a9d9f8234820a989ab
	 *
	 * @param string $class_name Name of the class to be instantiated.
	 */
	function autoload( $class_name ) {
		/* Only autoload classes from this namespace. */
		if ( false === strpos( $class_name, __NAMESPACE__ ) ) {
			return;
		}

		// First, separate the components of the incoming file.
		$file_path = explode( '\\', $class_name );

		/**
		 * - The first index will always be the namespace since it's part of the plugin.
		 * - All but the last index will be the path to the file.
		 * - The final index will be the filename. If it doesn't begin with 'I' then it's a class.
		 */

		// Get the last index of the array. This is the class we're loading.
		$file_name = '';
		if ( isset( $file_path[ count( $file_path ) - 1 ] ) ) {
			$file_name = strtolower(
				$file_path[ count( $file_path ) - 1 ]
			);

			$file_name       = str_ireplace( '_', '-', $file_name );
			$file_name_parts = explode( '-', $file_name );

			// Interface support: handle both Interface_Foo or Foo_Interface.
			$index = array_search( 'interface', $file_name_parts, true );

			if ( false !== $index ) {
				// Remove the 'interface' part.
				unset( $file_name_parts[ $index ] );

				// Rebuild the file name.
				$file_name = implode( '-', $file_name_parts );
				$file_name = "interface-{$file_name}.php";
			} else {
				$file_name = "class-$file_name.php";
			}
		}

		/**
		 * Find the fully qualified path to the class file by iterating through
		 * the $file_path array. We ignore the first and second index since these
		 * are the vendor and plugin name parts. The last index is always
		 * the file so we append that at the end.
		 */
		$fully_qualified_path = trailingslashit( dirname( __FILE__ ) ) . 'includes/';
		$cnt_file_path        = count( $file_path ) - 1;

		for ( $i = 2; $i < $cnt_file_path; $i++ ) {
			$dir                   = strtolower( $file_path[ $i ] );
			$fully_qualified_path .= trailingslashit( $dir );
		}
		$fully_qualified_path .= $file_name;

		// Now include the file.
		if ( stream_resolve_include_path( $fully_qualified_path ) ) {
			include_once $fully_qualified_path;
		}
	} // autoload

	spl_autoload_register( __NAMESPACE__ . '\autoload' );
}
