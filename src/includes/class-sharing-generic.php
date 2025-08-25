<?php
/**
 * Class Sharing_Open_Graph
 *
 * @package immonex\Kickstart
 */

namespace immonex\Kickstart;

/**
 * Sharing/SEO-related functionality (generic meta tags).
 */
class Sharing_Generic extends Sharing {

	/**
	 * Constructor
	 *
	 * @since 1.11.12-beta
	 *
	 * @param mixed[]  $bootstrap_data Bootstrap data.
	 * @param object[] $utils Helper/Utility objects.
	 */
	public function __construct( $bootstrap_data, $utils ) {
		parent::__construct( $bootstrap_data, $utils );

		add_filter( 'inx_enable_doc_head_buffering', '__return_true' );
		add_filter( 'inx_doc_head_contents', array( $this, 'maybe_extend_doc_head' ) );
	} // __construct

	/**
	 * Get meta tag data according to the page type.
	 *
	 * @since 1.11.12-beta
	 *
	 * @param string             $type       Page type (list, single or tax_archive).
	 * @param int|string|WP_Term $id_or_term Page/Post ID or term object.
	 *
	 * @return mixed[] Tag data.
	 */
	protected function get_type_head_tags( $type, $id_or_term ) {
		$page_post_id = is_int( $id_or_term ) && ! empty( $id_or_term ) ? $id_or_term : false;

		$all_tags = array(
			array(
				'name'    => 'description',
				'content' => $this->get_description( $page_post_id ),
				'scope'   => array( 'single' ),
			),
		);

		$tags = array_filter(
			$all_tags,
			function ( $tag ) use ( $type ) {
				return empty( $tag['scope'] )
					|| ( is_array( $tag['scope'] ) && in_array( $type, $tag['scope'], true ) );
			}
		);

		$context = array(
			'protocol_platform' => static::KEY,
			'type'              => $type,
			'id'                => $id_or_term,
			'name_attr_key'     => static::NAME_ATTR_KEY,
		);

		// @codingStandardsIgnoreLine
		return apply_filters( wp_sprintf( 'inx_sharing_%s_meta_tags', static::KEY ), $tags, $context );
	} // get_type_head_tags

} // Sharing_Generic
