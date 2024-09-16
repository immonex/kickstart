<?php
/**
 * Unit tests for Format Helper class.
 *
 * @package immonex\Kickstart
 */

use immonex\Kickstart\Kickstart;
use immonex\Kickstart\Format_Helper;

class Format_Helper_Test extends WP_UnitTestCase {

	private $fh;

	public function setUp() {
		$kickstart = new Kickstart( 'immonex-kickstart' );
		$this->fh = new Format_Helper( $kickstart->plugin_options, $kickstart->utils );

		switch_to_locale('de_DE');
	} // setUp

	public function test_format_price() {
		$this->assertEquals( '123.005,20&nbsp;€', $this->fh->format_price( 123005.2 ) );
		$this->assertEquals( '123.005&nbsp;€', $this->fh->format_price( 123005.2, 0 ) );
		$this->assertEquals( '123.005&nbsp;€', $this->fh->format_price( 123005.2, 0 ) );
		$this->assertEquals( '123.005,20&nbsp;€', $this->fh->format_price( 123005.2, 9 ) );
		$this->assertEquals( '123.005&nbsp;€ <span class="inx-price-time-unit">per month</span>', $this->fh->format_price( '123005.00', 9, 'per month' ) );
		$this->assertEquals( 'not specified', $this->fh->format_price( 0, 9, '', 'not specified' ) );
		$this->assertEquals( '123.005,20&nbsp;EUR', $this->fh->format_price( 123005.2, 9, '', '', 'EUR' ) );
	} // test_format_price

	public function test_format_area() {
		$this->assertEquals( '123,20&nbsp;m²', $this->fh->format_area( 123.2 ) );
		$this->assertEquals( '1.230,20&nbsp;m²', $this->fh->format_area( 1230.2, 2 ) );
		$this->assertEquals( '1.230,20&nbsp;m²', $this->fh->format_area( 1230.2, 9 ) );
		$this->assertEquals( '1.230,20&nbsp;m²', $this->fh->format_area( 1230.2, 99 ) );
		$this->assertEquals( 'not specified', $this->fh->format_area( 0, 9, 'not specified' ) );
		$this->assertEquals( '1.235,20&nbsp;qm', $this->fh->format_area( 1235.2, 9, '', 'qm' ) );
	} // test_format_area

} // class Format_Helper_Test
