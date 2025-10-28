<?php
/**
 * Class Property_Schema
 *
 * @package immonex\Kickstart
 */

namespace immonex\Kickstart;

/**
 * Schema.org related processing of property list data.
 */
class Property_List_Schema extends Base_Schema {

	/**
	 * Generate and return the Schema.org entity data for a real estate
	 * overview page.
	 *
	 * @since 1.12.0-beta2
	 *
	 * @param string $type            Page type: list or tax_archive.
	 * @param bool   $as_script_block Optional return format: true for an embed-ready
	 *                                script block, false for the raw data array (default).
	 * @param bool   $add_wrap        Whether to add a wrapper span element
	 *                                (optional, true by default).
	 *
	 * @return mixed[]|string Web page element data.
	 */
	public function get_web_page_entity( $type, $as_script_block = false, $add_wrap = true ) {
		global $wp;

		switch ( $type ) {
			case 'archive':
			case 'tax_archive':
				$url = home_url( $wp->request );
				break;
			default:
				$url = get_permalink();
		}

		$entity = [
			'@type' => [ 'WebPage', 'RealEstateListing' ],
			'@id'   => $this->get_schema_id( $url, 'RealEstateListing' ),
			'url'   => $url,
		];

		return $as_script_block ? $this->utils['format']->get_json_ld_script_block( $entity, true, $add_wrap ) : $entity;
	} // get_web_page_entity

} // Property_List_Schema
