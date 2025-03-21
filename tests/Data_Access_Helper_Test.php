<?php
/**
 * Unit tests for Data Access Helper class.
 *
 * @package immonex\Kickstart
 */

use immonex\Kickstart\Kickstart;
use immonex\Kickstart\Data_Access_Helper;

class Data_Access_Helper_Test extends WP_UnitTestCase {

	private $dah;
	private $items;
	private $areas;
	private $prices;

	public function setUp(): void {
		$kickstart = new Kickstart( 'immonex-kickstart' );
		$this->dah = new Data_Access_Helper(
			$kickstart->plugin_options,
			$kickstart->bootstrap_data,
			$kickstart->utils
		);

		$this->items = [
			[
				'title'     => 'Wohnfläche',
				'group'     => 'flaechen',
				'name'      => 'flaechen.wohnflaeche',
				'value'     => '240 m²',
				'meta_json' => '{"mapping_source":"flaechen->wohnflaeche","value_before_filter":"240"}',
			],
			[
				'title'     => 'Grundstücksfläche',
				'group'     => 'flaechen',
				'name'      => 'flaechen.grundstuecksflaeche',
				'value'     => '1.800 m²',
				'meta_json' => '{"mapping_source":"flaechen->grundstuecksflaeche","value_before_filter":"1800"}',
			],
			[
				'title'     => 'Kaufpreis',
				'group'     => 'preise',
				'name'      => 'preise.kaufpreis',
				'value'     => '186.000 €',
				'meta_json' => '{"mapping_source":"preise->kaufpreis","value_before_filter":"186000"}',
			],
			[
				'title'     => 'Käuferprovision',
				'group'     => 'preise',
				'name'      => 'preise.aussen_courtage',
				'value'     => '3,57 % inkl. MwSt.',
				'meta_json' => '{"mapping_source":"preise->aussen_courtage","value_before_filter":"3,57 % inkl. MwSt."}',
			],
		];

		$this->areas  = array_values( array_filter( $this->items, function ( $item ) { return 'flaechen' === $item['group']; } ) );
		$this->prices = array_values( array_filter( $this->items, function ( $item ) { return 'preise' === $item['group']; } ) );
	} // setUp

	public function test_filter_detail_items_by_name() {
		$expected = [ $this->items[1] ];
		$this->assertEquals( $expected, $this->dah->filter_detail_items( $this->items, [ 'flaechen.grundstuecksflaeche' ], [ 'name' ] ) );
		$this->assertEquals( $expected, $this->dah->filter_detail_items( $this->items, 'flaechen.grundstuecksflaeche', [ 'name' ] ) );
		$this->assertEquals( $expected, $this->dah->filter_detail_items( $this->items, '/flaechen.grundstuecksfl[a-z]+/', [ 'name' ] ) );

		$expected = [ $this->items[0], $this->items[3] ];
		$this->assertEquals( $expected, $this->dah->filter_detail_items( $this->items, [ 'flaechen.wohnflaeche', 'preise.aussen_courtage' ], [ 'name' ] ) );

		$this->assertEquals( [], $this->dah->filter_detail_items( $this->items, 'flaechen.grundstuecksfl', [ 'name' ] ) );

		$expected = $this->items;
		unset( $expected[1] );
		$this->assertEquals( array_values( $expected ), $this->dah->filter_detail_items( $this->items, [ '-flaechen.grundstuecksflaeche' ] ) );
	} // test_filter_detail_items_by_name

	public function test_filter_detail_items_by_group() {
		$this->assertEquals( $this->areas, $this->dah->filter_detail_items( $this->items, [ 'flaechen' ] ) );
		$this->assertEquals( $this->prices, $this->dah->filter_detail_items( $this->items, [ '-flaechen' ] ) );
	} // test_filter_detail_items_by_group

	public function test_filter_detail_items_by_mapping_source() {
		$this->assertEquals( $this->areas, $this->dah->filter_detail_items( $this->items, [ 'flaechen->wohnflaeche', 'flaechen->grundstuecksflaeche' ] ) );
		$this->assertEquals( $this->prices, $this->dah->filter_detail_items( $this->items, [ '-flaechen->wohnflaeche', '-flaechen->grundstuecksflaeche' ] ) );

		$expected = [ $this->items[2] ];
		$this->assertEquals( $expected, $this->dah->filter_detail_items( $this->items, [ 'preise->kaufpreis' ] ) );

		$expected = $this->items;
		unset( $expected[2] );
		$this->assertEquals( array_values( $expected ), $this->dah->filter_detail_items( $this->items, [ '-preise->kaufpreis' ] ) );
	} // test_filter_detail_items_by_mapping_source

	public function test_filter_detail_items_by_mapping_source_regex() {
		$this->assertEquals( $this->areas, $this->dah->filter_detail_items( $this->items, [ '/flaechen->[a-z]+/' ] ) );
		$this->assertEquals( $this->prices, $this->dah->filter_detail_items( $this->items, [ '-/flaechen->[a-z]+/' ] ) );
	} // test_filter_detail_items_by_mapping_source_regex

	public function test_filter_mixed_detail_items() {
		$expected = $this->items;
		unset( $expected[1] );
		$this->assertEquals( array_values( $expected ), $this->dah->filter_detail_items( $this->items, [ 'flaechen.wohnflaeche', 'preise' ] ) );

		$expected = [ $this->items[1] ];
		$this->assertEquals( $expected, $this->dah->filter_detail_items( $this->items, [ '-flaechen.wohnflaeche', '-preise' ] ) );
	} // test_filter_mixed_detail_items

} // class Data_Access_Helper_Test
