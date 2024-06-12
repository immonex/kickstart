<?php
/**
 * Class Sharing_Open_Graph
 *
 * @package immonex\Kickstart
 */

namespace immonex\Kickstart;

/**
 * Sharing-related functionality (X fka Twitter).
 */
class Sharing_X extends Sharing {

	/**
	 * Protocol/Platform key and name
	 */
	const KEY  = 'x';
	const NAME = 'X fka Twitter';

	/**
	 * Constructor
	 *
	 * @since 1.9.18-beta
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
	 * Get meta tag data according to the platform and page type.
	 *
	 * @since 1.9.18-beta
	 *
	 * @param string             $type       Page type (list, single or tax_archive).
	 * @param int|string|WP_Term $id_or_term Page/Post ID or term object.
	 *
	 * @return mixed[] Tag data.
	 */
	protected function get_type_head_tags( $type, $id_or_term ) {
		$page_post_id = is_int( $id_or_term ) && ! empty( $id_or_term ) ? $id_or_term : null;
		$x_site       = false;
		$x_creator    = false;

		$all_tags = array(
			array(
				'name'    => 'twitter:card',
				'content' => 'summary_large_image',
				'scope'   => array( 'single' ),
			),
		);

		if (
			$page_post_id
			&& 'single' === $type
			&& 0 !== (int) $this->data['sharing_max_images']
		) {
			$image_tags = $this->get_property_image_tags( $page_post_id, 'twitter', true, 1 );
			if ( ! empty( $image_tags ) ) {
				$image_tags[0]['scope'] = array( 'single' );
				$all_tags[]             = $image_tags[0];
			}
		}

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

		if ( 'single' === $type ) {
			$agency_data = apply_filters( 'inx_team_get_agency_template_data', array() );
			if ( ! empty( $agency_data['elements']['network_urls']['value']['twitter'] ) ) {
				$x_site = $this->get_x_id( $agency_data['elements']['network_urls']['value']['twitter']['url'] );

				if ( $x_site ) {
					$tags[] = array(
						'name'    => 'twitter:site',
						'content' => $x_site,
						'scope'   => array( 'single' ),
					);
				}
			}

			$agent_data = apply_filters( 'inx_team_get_agent_template_data', array() );
			if ( ! empty( $agent_data['elements']['network_urls']['value']['twitter'] ) ) {
				$x_creator = $this->get_x_id( $agent_data['elements']['network_urls']['value']['twitter']['url'] );

				if ( $x_creator && $x_creator !== $x_site ) {
					$tags[] = array(
						'name'    => 'twitter:creator',
						'content' => $x_creator,
						'scope'   => array( 'single' ),
					);
				}
			}
		}

		// @codingStandardsIgnoreLine
		return apply_filters( wp_sprintf( 'inx_sharing_%s_meta_tags', static::KEY ), $tags, $context );
	} // get_type_head_tags

	/**
	 * Extract the X ID from the given string if it's an URL.
	 *
	 * @since 1.9.18-beta
	 *
	 * @param string $url URL.
	 *
	 * @return string X ID.
	 */
	private function get_x_id( $url ) {
		if ( '@' === $url[0] || false === strpos( $url, '/' ) ) {
			return $url;
		}

		return '@' . substr( $url, strrpos( untrailingslashit( $url ), '/' ) + 1 );
	} // get_x_id

} // Sharing_X
