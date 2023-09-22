<?php
/**
 * Plugin Name:       immonex Kickstart
 * Plugin URI:        https://wordpress.org/plugins/immonex-kickstart/
 * Description:       Essential components and add-on framework for embedding and searching/filtering imported OpenImmo-XML-based real estate offers
 * Version:           1.8.0
 * Requires at least: 5.1
 * Requires PHP:      5.6
 * Author:            inveris OHG / immonex
 * Author URI:        https://immonex.dev/
 * License:           GPLv2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       immonex-kickstart
 *
 * The Plugin immonex Kickstart is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or any
 * later version.
 *
 * immonex Kickstart is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with immonex Kickstart. If not, see https://www.gnu.org/licenses/gpl-2.0.html.
 *
 * @package immonex\Kickstart
 */

namespace immonex\Kickstart;

// Prevent direct access.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Initialize autoloaders (Composer (optional) AND WP/plugin-specific).
 */
require_once __DIR__ . '/autoload.php';

/**
 * Load and register TGMPA.
 */
require __DIR__ . '/tgmpa.php';

/**
 * Instantiate plugin main class.
 */
$immonex_kickstart = new Kickstart( basename( __FILE__, '.php' ) );
$immonex_kickstart->init( 9 );

// Global alias.
$inx = $immonex_kickstart;
