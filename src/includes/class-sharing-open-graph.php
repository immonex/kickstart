<?php
/**
 * Class Sharing_Open_Graph
 *
 * @package immonex\Kickstart
 */

namespace immonex\Kickstart;

/**
 * Sharing-related functionality (Open Graph).
 */
class Sharing_Open_Graph extends Sharing {

	/**
	 * Protocol/Platform key and name
	 */
	const KEY  = 'open_graph';
	const NAME = 'Open Graph';

	/**
	 * Name attribute key for meta tags (<meta property="..." content="...">)
	 *                                         --------
	 */
	const NAME_ATTR_KEY = 'property';

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
		$image_tags   = array();
		$fb_publisher = false;
		$fb_author    = false;

		if ( $page_post_id ) {
			$url        = get_permalink( $page_post_id );
			$title      = get_the_title( $page_post_id );
			$excerpt    = get_the_excerpt( $page_post_id );
			$image_tags = ( -1 === (int) $this->data['sharing_max_images'] || (int) $this->data['sharing_max_images'] > 0 ) && 'single' === $type ?
				$this->get_property_image_tags( $page_post_id ) : array();
		} else {
			$url     = 'tax_archive' === $type ?
				get_term_link( $id_or_term ) :
				get_post_type_archive_link( $this->data['property_post_type_name'] );
			$title   = get_the_archive_title();
			$excerpt = get_the_archive_description();
		}

		$description = $this->utils['string']->get_excerpt(
			wp_strip_all_tags( preg_replace( '/<a[^>]*>.*?(<\/a>|$)/', static::DESCRIPTION_MAX_LENGTH, $excerpt ) ),
			120,
			'…'
		);

		$all_tags = array(
			array(
				'name'    => 'og:type',
				'content' => 'single' === $type ? 'article' : 'website',
			),
			array(
				'name'    => 'og:url',
				'content' => $url,
			),
			array(
				'name'    => 'og:title',
				'content' => $title,
			),
			array(
				'name'    => 'og:description',
				'content' => $description,
			),
			array(
				'name'    => 'og:site_name',
				'content' => get_bloginfo( 'name' ),
			),
			array(
				'name'    => 'og:locale',
				'content' => substr( determine_locale(), 0, 5 ),
			),
			array(
				'name'    => 'article:section',
				'content' => __( 'Real Estate', 'immonex-kickstart' ),
				'scope'   => array( 'single' ),
			),
			array(
				'name'    => 'article:modified_time',
				'content' => get_the_time( 'c', $page_post_id ),
				'scope'   => array( 'single' ),
			),
		);

		if ( ! empty( $image_tags ) ) {
			$all_tags = array_merge( $all_tags, $image_tags );
		}

		$tags = array_filter(
			$all_tags,
			function ( $tag ) use ( $type ) {
				return empty( $tag['scope'] )
					|| ( is_array( $tag['scope'] ) && in_array( $type, $tag['scope'], true ) );
			}
		);

		if ( 'single' === $type ) {
			$agency_data = apply_filters( 'inx_team_get_agency_template_data', array() );
			if ( ! empty( $agency_data['elements']['network_urls']['value']['facebook']['url'] ) ) {
				$fb_publisher = $agency_data['elements']['network_urls']['value']['facebook']['url'];

				$tags[] = array(
					'name'    => 'article:publisher',
					'content' => $fb_publisher,
					'scope'   => array( 'single' ),
				);
			}

			$agent_data = apply_filters( 'inx_team_get_agent_template_data', array() );
			if (
				! empty( $agent_data['elements']['network_urls']['value']['facebook']['url'] )
				&& $agent_data['elements']['network_urls']['value']['facebook']['url'] !== $fb_publisher
			) {
				$tags[] = array(
					'name'    => 'article:author',
					'content' => $agent_data['elements']['network_urls']['value']['facebook']['url'],
					'scope'   => array( 'single' ),
				);
			}
		}

		$context = array(
			'protocol_platform' => static::KEY,
			'type'              => $type,
			'id'                => $id_or_term,
			'name_attr_key'     => static::NAME_ATTR_KEY,
		);

		// @codingStandardsIgnoreLine
		return apply_filters( wp_sprintf( 'inx_sharing_%s_meta_tags', static::KEY ), $tags, $context );
	} // get_type_head_tags

} // Sharing_Open_Graph
