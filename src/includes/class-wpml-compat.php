<?php
/**
 * Class WPML_Compat
 *
 * @package immonex\Kickstart
 */

namespace immonex\Kickstart;

/**
 * WPML Compatibility.
 */
class WPML_Compat {

	/**
	 * Various component configuration data
	 *
	 * @var mixed[]
	 */
	private $config;

	/**
	 * Helper/Utility objects
	 *
	 * @var object[]
	 */
	private $utils;

	/**
	 * Translation ID cache
	 *
	 * @var mixed[]
	 */
	public $cache = array(
		'translatable'      => array(),
		'translation_ids'   => array(),
		'element_languages' => array(),
	);

	/**
	 * Constructor
	 *
	 * @since 1.2.12-beta
	 *
	 * @param mixed[]  $config Various component configuration data.
	 * @param object[] $utils Helper/Utility objects.
	 */
	public function __construct( $config, $utils ) {
		$this->config = $config;
		$this->utils  = $utils;

		add_filter( 'inx_element_translation_id', array( $this, 'get_translation_id' ), 10, 3 );
		add_filter( 'inx_element_language', array( $this, 'get_element_language' ), 10, 2 );
		add_filter( 'inx_translated_slug', array( $this, 'get_translated_slug' ), 10, 4 );
		add_filter( 'inx_is_translated_post_type', array( $this, 'is_translated_post_type' ), 10, 2 );
		add_filter( 'inx_page_list_all_languages', array( $this, 'get_all_pages' ) );

		add_filter( 'icl_ls_languages', array( $this, 'extend_language_switcher_urls' ) );

		add_action( 'inx-rest-set-query-language', array( $this, 'switch_language' ), 10, 2 );
	} // __construct

	/**
	 * Get the related translation ID for the given element ID (page, post...).
	 *
	 * @since 1.2.12-beta
	 *
	 * @param int|string  $source_id Element ID.
	 * @param string      $type      Element type (optional, defaults to "page").
	 * @param string|bool $lang      Two-letter language code (optional, language
	 *                               from current locale is used by default).
	 *
	 * @return int ID of translated version or source ID if unavailable.
	 */
	public function get_translation_id( $source_id, $type = 'page', $lang = false ) {
		if ( ! $lang ) {
			$lang = substr( get_locale(), 0, 2 );
		}

		$cache_key = "{$source_id},{$lang}";
		if ( isset( $this->cache['translation_ids'][ $cache_key ] ) ) {
			return $this->cache['translation_ids'][ $cache_key ];
		}

		// @codingStandardsIgnoreLine
		$this->cache['translation_ids'][ $cache_key ] = apply_filters( 'wpml_object_id', $source_id, $type, true, $lang );

		return $this->cache['translation_ids'][ $cache_key ];
	} // get_translation_id

	/**
	 * Get the language of the element with the given ID.
	 *
	 * @since 1.2.12-beta
	 *
	 * @param string     $lang       Default language code or empty value.
	 * @param int|string $element_id Element ID.
	 *
	 * @return string Two-letter language code.
	 */
	public function get_element_language( $lang, $element_id ) {
		if ( isset( $this->cache['element_languages'][ $element_id ] ) ) {
			return $this->cache['element_languages'][ $element_id ];
		}

		// @codingStandardsIgnoreLine
		$lang_details = apply_filters( 'wpml_post_language_details', '', $element_id );
		if ( ! is_array( $lang_details ) || empty( $lang_details ) ) {
			return $lang;
		}

		if ( isset( $lang_details['language_code'] ) ) {
			$lang = $lang_details['language_code'];
		}

		$this->cache['element_languages'][ $element_id ] = $lang;

		return $lang;
	} // get_element_language

	/**
	 * Get the translated version of a post type slug.
	 *
	 * @since 1.2.12-beta
	 *
	 * @param string      $source_slug         Source slug.
	 * @param string      $post_type           Post type.
	 * @param string|null $lang                Translation language code (optional).
	 * @param bool        $ignore_default_lang Don't get slug translations for the
	 *                                         default language if true.
	 *
	 * @return string Two-letter language code.
	 */
	public function get_translated_slug( $source_slug, $post_type, $lang = null, $ignore_default_lang = false ) {
		// @codingStandardsIgnoreLine
		if ( $ignore_default_lang && apply_filters( 'wpml_default_language', null ) === $lang ) {
			return $source_slug;
		}

		// @codingStandardsIgnoreLine
		return apply_filters( 'wpml_get_translated_slug', $source_slug, $post_type, $lang );
	} // get_translated_slug

	/**
	 * Check if the given post type is subject of translation.
	 *
	 * @since 1.2.12-beta
	 *
	 * @param bool   $translatable Default status.
	 * @param string $post_type    Post type key.
	 *
	 * @return bool True if translatable, false otherwise.
	 */
	public function is_translated_post_type( $translatable, $post_type ) {
		global $sitepress_settings;

		if ( in_array( $post_type, $this->cache['translatable'], true ) ) {
			return true;
		}

		$translatable = false;
		if ( isset( $sitepress_settings['custom_posts_sync_option'][ $post_type ] ) ) {
			$translatable = $sitepress_settings['custom_posts_sync_option'][ $post_type ] ? true : false;
		}

		if ( $translatable ) {
			$this->cache['translatable'][] = $post_type;
		}

		return $translatable;
	} // is_translated_post_type

	/**
	 * Get a sorted full list of pages including all language versions.
	 *
	 * @since 1.2.12-beta
	 *
	 * @param mixed[]|null $pages Current page list or null.
	 *
	 * @return mixed[] Page list.
	 */
	public function get_all_pages( $pages ) {
		// @codingStandardsIgnoreLine
		$languages = apply_filters( 'wpml_active_languages', null, array( 'skip_missing' => 0 ) );
		if ( empty( $languages ) ) {
			return $pages;
		}

		// @codingStandardsIgnoreLine
		$current_lang = apply_filters( 'wpml_current_language', null );
		$all_pages    = array();

		foreach ( $languages as $lang ) {
			// @codingStandardsIgnoreLine
			do_action( 'wpml_switch_language', $lang['code'] );

			$args = array(
				'post_type'      => 'page',
				'post_status'    => 'publish',
				'posts_per_page' => -1,
				'lang'           => $lang['code'],
			);

			$posts = get_posts( $args );

			if ( count( $posts ) > 0 ) {
				foreach ( $posts as $post ) {
					$all_pages[ $post->ID ] = $post->post_title;
				}
			}
		}

		// @codingStandardsIgnoreLine
		do_action( 'wpml_switch_language', $current_lang );

		asort( $all_pages );

		return $all_pages;
	} // get_all_pages

	/**
	 * Extend WPML language switcher URLs by the immonex property ID
	 * GET parameter if given and filter out any search parameters.
	 *
	 * @since 1.2.12-beta
	 *
	 * @param mixed[] $urls Language switcher link data array.
	 *
	 * @return mixed[] Link array with (possibly) extended URLs.
	 */
	public function extend_language_switcher_urls( $urls ) {
		$property_id = apply_filters( 'inx_current_property_post_id', '' );
		if ( ! $property_id || empty( $urls ) ) {
			return $urls;
		}

		foreach ( $urls as $lang => $link ) {
			$url                     = $link['url'];
			$get_vars                = array();
			$url_parts               = wp_parse_url( $url );
			$property_translation_id = $this->get_translation_id( $property_id, 'post', $lang );

			if ( ! empty( $url_parts['query'] ) ) {
				parse_str( $url_parts['query'], $get_query_vars );

				if ( ! empty( $get_query_vars ) ) {
					foreach ( $get_query_vars as $var_name => $value ) {
						if ( 'inx-search-' !== substr( $var_name, 0, 11 ) ) {
							$get_vars[ $var_name ] = $value;
						}
					}
				}
			}

			// @codingStandardsIgnoreStart
			$current_lang = apply_filters( 'wpml_current_language', null );
			do_action( 'wpml_switch_language', $lang );
			$pl_url = get_permalink( $property_translation_id );
			do_action( 'wpml_switch_language', $current_lang );
			// @codingStandardsIgnoreEnd

			if ( $pl_url ) {
				$url = $pl_url;
			} elseif ( ! isset( $get_vars['inx-property-id'] ) ) {
				$get_vars['inx-property-id'] = $property_translation_id;
			}

			$raw_url = false === strpos( $url, '?' ) ? $url : substr( $url, 0, strpos( $url, '?' ) );

			$urls[ $lang ]['url'] = add_query_arg( $get_vars, trailingslashit( $raw_url ) );
		}

		return $urls;
	} // extend_language_switcher_urls

	/**
	 * Switch current WPML language (action callback).
	 *
	 * @since 1.7.26-beta
	 *
	 * @param string           $lang    Language code (ISO-639-1).
	 * @param \WP_REST_Request $request Request object.
	 */
	public function switch_language( $lang, $request ) {
		// @codingStandardsIgnoreLine
		do_action( 'wpml_switch_language', $lang );
	} // switch_language

} // WPML_Compat
