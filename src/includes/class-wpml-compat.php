<?php
/**
 * Class WPML_Compat
 *
 * @package immonex-kickstart
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
	 * @since 1.2.9-beta
	 *
	 * @param mixed[]  $config Various component configuration data.
	 * @param object[] $utils Helper/Utility objects.
	 */
	public function __construct( $config, $utils ) {
		$this->config = $config;
		$this->utils  = $utils;

		add_filter( 'inx_element_translation_id', array( $this, 'get_translation_id' ), 10, 3 );
		add_filter( 'inx_element_language', array( $this, 'get_element_language' ), 10, 2 );
		add_filter( 'inx_is_translated_post_type', array( $this, 'is_translated_post_type' ), 10, 2 );
	} // __construct

	/**
	 * Get the related translation ID for the given element ID (page, post...).
	 *
	 * @since 1.2.9-beta
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
	 * @since 1.2.9-beta
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
		if ( isset( $lang_details['language_code'] ) ) {
			$lang = $lang_details['language_code'];
		}

		$this->cache['element_languages'][ $element_id ] = $lang;

		return $lang;
	} // get_element_language

	/**
	 * Check if the given post type is subject of translation.
	 *
	 * @since 1.2.9-beta
	 *
	 * @param bool   $translatable Default status.
	 * @param string $post_type    Post type key.
	 *
	 * @return bool True if translatable, false otherwise.
	 */
	public function is_translated_post_type( $translatable, $post_type ) {
		global $sitepress_settings;

		if ( in_array( $post_type, $this->cache['translatable'] ) ) {
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

} // WPML_Compat
