<?php
/**
 * Class Sharing
 *
 * @package immonex\Kickstart
 */

namespace immonex\Kickstart;

/**
 * Base class for sharing-related components.
 */
abstract class Sharing {

	/**
	 * Protocol/Platform key and name
	 */
	const KEY  = 'generic';
	const NAME = 'Sharing';

	/**
	 * Name attribute key for meta tags
	 */
	const NAME_ATTR_KEY = 'name';

	const IMAGE_MIN_WIDTH  = 200;
	const IMAGE_MIN_HEIGHT = 200;
	const IMAGE_MAX_WIDTH  = 1200;
	const IMAGE_MAX_HEIGHT = 900;

	const DESCRIPTION_MAX_LENGTH = 120;

	/**
	 * Array of bootstrap data
	 *
	 * @var mixed[]
	 */
	protected $data;

	/**
	 * Helper/Utility objects
	 *
	 * @var object[]
	 */
	protected $utils;

	/**
	 * Constructor
	 *
	 * @since 1.9.18-beta
	 *
	 * @param mixed[]  $bootstrap_data Bootstrap data.
	 * @param object[] $utils Helper/Utility objects.
	 */
	public function __construct( $bootstrap_data, $utils ) {
		$this->data  = $bootstrap_data;
		$this->utils = $utils;
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
	abstract protected function get_type_head_tags( $type, $id_or_term );

	/**
	 * Maybe extend the given HTML head contents by sharing-related meta tags
	 * (filter callback).
	 *
	 * @since 1.9.18-beta
	 *
	 * @param string $head_contents Content string.
	 *
	 * @return string Possibly extended head contents.
	 */
	public function maybe_extend_doc_head( $head_contents ) {
		$id_or_term = apply_filters( 'inx_is_property_list_page', false );
		$type       = $id_or_term ? 'list' : false;

		if ( ! $id_or_term ) {
			$id_or_term = apply_filters( 'inx_is_property_details_page', false );
			$type       = $id_or_term ? 'single' : false;
		}

		if ( ! $id_or_term ) {
			$id_or_term = apply_filters( 'inx_is_property_tax_archive', false );
			$type       = $id_or_term ? 'tax_archive' : false;
		}

		if ( ! $type ) {
			return $head_contents;
		}

		$tags = $this->get_type_head_tags( $type, $id_or_term );
		if ( empty( $tags ) ) {
			return $head_contents;
		}

		$tag_identifiers = $this->get_tag_identifiers( $tags, 'meta' );
		$block_info      = wp_sprintf(
			'%1$s tags generated by immonex® Kickstart Real Estate Plugin (Open Source) - %2$s - %3$s',
			static::NAME,
			$this->data['plugin_version'],
			$this->data['plugin_home_url']
		);

		if ( 'extend' === $this->data['sharing_tag_insert_mode'] ) {
			/**
			 * Only add tags that are not already present in the head. (Filter out
			 * existing tags from the array of tags to add.)
			 */
			$existing_tags = $this->find_tags( $head_contents, $tag_identifiers );

			if ( ! empty( $existing_tags ) ) {
				$tags = array_filter(
					$tags,
					function ( $tag_data ) use ( $existing_tags ) {
						if ( ! isset( $tag_data['name'] ) ) {
							return false;
						}

						$tag = wp_sprintf( 'meta %1$s="%2$s"', static::NAME_ATTR_KEY, $tag_data['name'] );

						preg_match_all( '/:/', $tag_data['name'], $colons );
						$base_tag = ! empty( $colons[0] ) && count( $colons[0] ) >= 2 ?
							wp_sprintf(
								'meta %1$s="%2$s"',
								substr( $tag_data['name'], 0, strrpos( $tag_data['name'], ':' ) )
							) : '';
						return ! in_array( $tag, $existing_tags, true )
							&& ( ! $base_tag || ! in_array( $base_tag, $existing_tags, true ) );
					}
				);
			}
		}

		$tag_html = $this->get_tag_html( $tags, $block_info );

		if ( 'append' === $this->data['sharing_tag_insert_mode'] ) {
			return $head_contents . $tag_html;
		}

		if ( 'replace' === $this->data['sharing_tag_insert_mode'] ) {
			$head_contents = $this->remove_tags( $head_contents, $tag_identifiers );
		}

		return $head_contents . $tag_html;
	} // maybe_extend_doc_head

	/**
	 * Find existing tags with the given names in a content string.
	 *
	 * @since 1.9.18-beta
	 *
	 * @param string          $content Content string.
	 * @param string|string[] $tags    Tag(s) to look up.
	 *
	 * @return string[] Existing tag names.
	 */
	protected function find_tags( $content, $tags ) {
		if ( ! is_array( $tags ) ) {
			$tags = array( (string) $tags );
		}

		$existing_tags = array();

		foreach ( $tags as $tag ) {
			$tag_regex = preg_quote( $tag, '/' );
			if ( preg_match( "/<{$tag_regex}[ \/>]/", $content ) ) {
				$existing_tags[] = $tag;
			}
		}

		return $existing_tags;
	} // find_tags

	/**
	 * Remove all tags with the given names from a content string.
	 *
	 * @since 1.9.18-beta
	 *
	 * @param string          $content Content string.
	 * @param string|string[] $tags    Tag(s) to remove (name + optional attribute).
	 *
	 * @return string Content string with the tags removed.
	 */
	protected function remove_tags( $content, $tags ) {
		if ( ! is_array( $tags ) ) {
			$tags = array( (string) $tags );
		}

		$add_comments = apply_filters( 'inx_add_html_comments', true );
		$repl_count   = 0;
		$repl_info    = wp_sprintf(
			'<!-- * %1$s tags replaced by immonex® Kickstart Real Estate Plugin (Open Source) - %2$s - %3$s -->',
			static::NAME,
			$this->data['plugin_version'],
			$this->data['plugin_home_url']
		);

		foreach ( $tags as $tag ) {
			$tag_regex = preg_quote( $tag, '/' );

			if ( $add_comments ) {
				$tag_comment = false !== strpos( $tag, ' ' ) ?
					substr( $tag, 0, strpos( $tag, ' ' ) ) : '';
			}

			$content = preg_replace(
				"/\h{0,}<({$tag_regex})(?=[ \/>]).*?(>.*<\/{$tag_regex}>|\/>|>)((\h+)?(\n|$)?)/",
				$add_comments ? "<!-- {$tag_comment} tag replaced* -->" . PHP_EOL : '',
				$content,
				-1,
				$count
			);

			$repl_count += $count;
		}

		if ( $add_comments && $repl_count > 0 ) {
			$content .= PHP_EOL . $repl_info . PHP_EOL;
		}

		return $content;
	} // remove_tags

	/**
	 * Generate the HTML code block for the given tags.
	 *
	 * @since 1.9.18-beta
	 *
	 * @param string[] $tags         Tag data.
	 * @param string   $html_comment HTML comment (before and after the block).
	 *
	 * @return string Tag HTML block.
	 */
	protected function get_tag_html( $tags, $html_comment ) {
		if ( empty( $tags ) || ! is_array( $tags ) ) {
			return '';
		}

		$tag_lines = array();

		foreach ( $tags as $tag ) {
			$tag_lines[] = wp_sprintf(
				'<meta %1$s="%2$s" content="%3$s" />',
				static::NAME_ATTR_KEY,
				esc_attr( $tag['name'] ),
				esc_attr( $tag['content'] )
			);
		}

		$k_pos              = strpos( $html_comment, 'Kickstart' );
		$html_comment_after = false !== $k_pos ? substr( $html_comment, 0, $k_pos + 9 ) : $html_comment;

		if ( apply_filters( 'inx_add_html_comments', true ) ) {
			array_unshift( $tag_lines, '<!-- ' . $html_comment . ' -->' );
			$tag_lines[] = '<!-- / ' . $html_comment_after . ' -->';
		}

		return PHP_EOL . implode( PHP_EOL, $tag_lines ) . PHP_EOL;
	} // get_tag_html

	/**
	 * Get identifiers ("meta" + name/property attribute).
	 *
	 * @since 1.9.18-beta
	 *
	 * @param string[] $tags         Tag data.
	 *
	 * @return string[] Tag identifier strings.
	 */
	protected function get_tag_identifiers( $tags ) {
		if ( empty( $tags ) || ! is_array( $tags ) ) {
			return '';
		}

		$tag_identifiers = array();

		foreach ( $tags as $tag ) {
			if ( empty( $tag['name'] ) ) {
				continue;
			}

			$tag_identifiers[] = wp_sprintf( 'meta %1$s="%2$s"', static::NAME_ATTR_KEY, $tag['name'] );
		}

		return array_unique( $tag_identifiers );
	} // get_tag_identifiers

	/**
	 * Get image-related meta tag data for a property.
	 *
	 * @since 1.9.18-beta
	 *
	 * @param int    $post_id    Property post ID.
	 * @param string $prefix     Tag name prefix (optional, defaults to "og").
	 * @param bool   $url_only   True to return image URL tags only (optional,
	 *                           false by default).
	 * @param bool   $max_images Force max. number of images (optional,
	 *                           false = use option value).
	 *
	 * @return string[] Image meta tag data.
	 */
	protected function get_property_image_tags( $post_id, $prefix = 'og', $url_only = false, $max_images = false ) {
		if ( false === $max_images ) {
			$max_images = (int) $this->data['sharing_max_images'];
		}

		$images = apply_filters(
			'inx_get_property_images',
			array(),
			$post_id,
			array(
				'type'   => 'gallery',
				'return' => 'objects',
			)
		);

		if ( empty( $images ) ) {
			return array();
		}

		$image_tags  = array();
		$image_count = 0;

		foreach ( $images as $image ) {
			$image_data = wp_get_attachment_image_src( $image->ID, 'full' );

			if (
				empty( $image_data )
				|| $image_data[1] < static::IMAGE_MIN_WIDTH
				|| $image_data[2] < static::IMAGE_MIN_HEIGHT
			) {
				continue;
			}

			if (
				$image_data[1] > static::IMAGE_MAX_WIDTH
				|| $image_data[2] > static::IMAGE_MAX_HEIGHT
			) {
				$image_data = wp_get_attachment_image_src( $image->ID, 'large' );
			}

			$image_tags[] = array(
				'name'    => "{$prefix}:image",
				'content' => $image_data[0],
				'scope'   => array( 'single' ),
			);
			if ( ! $url_only ) {
				$image_tags[] = array(
					'name'    => "{$prefix}:image:width",
					'content' => $image_data[1],
					'scope'   => array( 'single' ),
				);
				$image_tags[] = array(
					'name'    => "{$prefix}:image:height",
					'content' => $image_data[2],
					'scope'   => array( 'single' ),
				);
			}
			if ( ! $url_only && $image->post_mime_type ) {
				$image_tags[] = array(
					'name'    => "{$prefix}:image:type",
					'content' => $image->post_mime_type,
					'scope'   => array( 'single' ),
				);
			}

			$image_count++;
			if (
				-1 !== $max_images
				&& $image_count >= $max_images
			) {
				break;
			}
		}

		return $image_tags;
	} // get_property_image_tags

} // Sharing