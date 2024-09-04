<?php
/**
 * Unit tests for Kickstart class.
 *
 * @package immonex\Kickstart
 */

use immonex\Kickstart\Kickstart;

class Kickstart_Test extends WP_UnitTestCase {

	private $kickstart;

	public function setUp() {
		$this->kickstart = new Kickstart( 'immonex-kickstart' );
	} // setUp

	public function test_bootstrap_data() {
		$expected = array(
			'plugin_name' => 'immonex Kickstart',
			'plugin_slug' => 'immonex-kickstart',
			'plugin_prefix' => 'inx_',
			'public_prefix' => 'inx-'
		);

		$bootstrap_data = $this->kickstart->bootstrap_data;

		foreach ( $expected as $key => $expected_value ) {
			$this->assertEquals( $expected_value, $bootstrap_data[$key] );
		}
	} // test_bootstrap_data

} // class Kickstart_Test
