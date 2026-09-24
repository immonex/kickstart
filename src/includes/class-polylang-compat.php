<?php
/**
 * Class Polylang_Compat
 *
 * @package immonex\Kickstart
 */

namespace immonex\Kickstart;

/**
 * Polylang Compatibility.
 */
class Polylang_Compat {

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

		add_filter( 'home_url', array( $this, 'fix_subdomain_home_url' ), 10, 4 );

		add_filter( 'inx_element_translation_id', array( $this, 'get_translation_id' ), 10, 3 );
		add_filter( 'inx_element_language', array( $this, 'get_element_language' ), 10, 2 );
		add_filter( 'inx_is_translated_post_type', array( $this, 'is_translated_post_type' ), 10, 2 );
		add_filter( 'inx_fix_multilingual_home_url', array( $this, 'fix_subdomain_home_url' ) );

		add_filter( 'pll_the_language_link', array( $this, 'extend_language_switcher_urls' ), 10, 2 );
		add_filter( 'pll_the_language_link', array( $this, 'fix_custom_taxonomy_switcher_links' ), 10, 3 );

		// DEPRECATED.
		add_action( 'inx_rest_set_query_language', array( $this, 'switch_language' ), 10, 2 );
	} // __construct

	/**
	 * Get the related translation ID for the given element ID (page, post...).
	 *
	 * @since 1.2.9-beta
	 *
	 * @param int|string  $source_id Element ID.
	 * @param string|null $type      Element type (not relevant for Polylang).
	 * @param string|bool $lang      Two-letter language code (optional, language
	 *                               from current locale is used by default).
	 *
	 * @return int ID of translated version or source ID if unavailable.
	 */
	public function get_translation_id( $source_id, $type = null, $lang = false ) {
		if ( ! function_exists( 'pll_get_post' ) ) {
			return $source_id;
		}

		if ( ! $lang ) {
			$lang = substr( get_locale(), 0, 2 );
		}

		$cache_key = "{$source_id},{$lang}";
		if ( isset( $this->cache['translation_ids'][ $cache_key ] ) ) {
			return $this->cache['translation_ids'][ $cache_key ];
		}

		$translation_id = pll_get_post( $source_id, $lang );
		if ( ! $translation_id ) {
			$translation_id = $source_id;
		}

		$this->cache['translation_ids'][ $cache_key ] = $translation_id;

		return $translation_id;
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
		if ( ! function_exists( 'pll_get_post_language' ) ) {
			return $lang;
		}

		if ( isset( $this->cache['element_languages'][ $element_id ] ) ) {
			return $this->cache['element_languages'][ $element_id ];
		}

		$this->cache['element_languages'][ $element_id ] = pll_get_post_language( $element_id );

		return $this->cache['element_languages'][ $element_id ];
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
		if ( ! function_exists( 'pll_is_translated_post_type' ) ) {
			return false;
		}

		if ( in_array( $post_type, $this->cache['translatable'], true ) ) {
			return true;
		}

		$translatable = pll_is_translated_post_type( $post_type );
		if ( $translatable ) {
			$this->cache['translatable'][] = $post_type;
		}

		return $translatable;
	} // is_translated_post_type

	/**
	 * Extend Polylang language switch URLs by the immonex property ID
	 * GET parameter if given and filter out any search parameters.
	 *
	 * @since 1.2.9-beta
	 *
	 * @param string $url  Source URL.
	 * @param string $lang Two-letter language code.
	 *
	 * @return string Possibly extended URL.
	 */
	public function extend_language_switcher_urls( $url, $lang ) {
		$property_id = apply_filters( 'inx_current_property_post_id', 0 );
		if ( ! $property_id ) {
			return $url;
		}

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

		$pl_url = get_permalink( $property_translation_id );

		if ( $pl_url ) {
			$url = $pl_url;
		} elseif ( ! isset( $get_vars['inx-property-id'] ) ) {
			$get_vars['inx-property-id'] = $property_translation_id;
		}

		$raw_url = false === strpos( $url, '?' ) ? $url : substr( $url, 0, strpos( $url, '?' ) );

		return add_query_arg( $get_vars, trailingslashit( $raw_url ) );
	} // extend_language_switcher_urls

	/**
	 * Switch current language using the WPML(!) API (action callback).
	 *
	 * @deprecated This method will be removed in a future version.
	 *             Use the `inx_wpml_open_language_switch` filter instead.
	 *
	 * @since 1.7.26-beta
	 *
	 * @param string           $lang    Language code (ISO-639-1).
	 * @param \WP_REST_Request $request Request object.
	 */
	public function switch_language( $lang, $request ) {
		$previous_lang = apply_filters( 'inx_wpml_open_language_switch', $lang );
	} // switch_language

	/**
	 * Fixes the home URL for subdomain setups in Polylang.
	 *
	 * @since 1.18.0
	 *
	 * @param string      $url         Home URL.
	 * @param string      $path        Path to append (optional).
	 * @param string|null $orig_scheme Original scheme (optional).
	 * @param int|null    $blog_id     Blog ID (optional).
	 *
	 * @return string The (possibly) fixed home URL.
	 */
	public function fix_subdomain_home_url( $url, $path = '', $orig_scheme = null, $blog_id = null ) {
		if (
			is_admin()
			|| ( function_exists( 'wp_is_rest_endpoint' ) && wp_is_rest_endpoint() )
		) {
			return $url;
		}

		if ( empty( $path ) ) {
			$path = wp_parse_url( $url, PHP_URL_PATH );
		}

		if ( empty( $path ) || '/' === $path ) {
			// Avoid infinite loop by only running if we aren't filtering the root home URL itself.
			return $url;
		}

		if (
			function_exists( 'pll_home_url' )
			&& function_exists( 'pll_languages_list' )
			&& function_exists( 'pll_current_language' )
		) {
			$languages    = pll_languages_list();
			$current_lang = ! empty( $_GET['inx-r-lang'] ) ? sanitize_key( $_GET['inx-r-lang'] ) : '';
			if ( ! $current_lang || ! in_array( $current_lang, $languages, true ) ) {
				$current_lang = pll_current_language( 'slug' );
			}
			$current_home_host = wp_parse_url( pll_home_url( $current_lang ), PHP_URL_HOST );
			$default_home_host = wp_parse_url( get_option( 'home' ), PHP_URL_HOST );

			if ( $current_home_host !== $default_home_host ) {
				// Replace the default domain host with the localized subdomain host.
				$url = str_replace( "://{$default_home_host}", "://{$current_home_host}", $url );
			}
		}

		return $url;
	} // fix_subdomain_home_url

	/**
	 * Modify language switcher URLs to map custom taxonomy GET variables
	 * to their correctly translated counterpart terms or remove them if
	 * these do not exist.
	 *
	 * @since 1.18.0
	 *
	 * @param string $url    Original language switcher URL.
	 * @param string $slug   Target language slug.
	 * @param string $locale Target locale (e.g., 'en_US').
	 *
	 * @return string The (possibly) fixed language switcher URL.
	 */
	public function fix_custom_taxonomy_switcher_links( $url, $slug, $locale ) {
		if ( ! function_exists( 'pll_get_term' ) ) {
			return $url;
		}

		$url_parts = wp_parse_url( $url );

		if ( ! empty( $url_parts['query'] ) ) {
			parse_str( $url_parts['query'], $get_query_vars );

			if ( ! empty( $get_query_vars ) ) {
				foreach ( $get_query_vars as $var_name => $value ) {
					if ( 'inx-search-distance' === substr( $var_name, 0, 19 ) ) {
						continue;
					}

					$multi_value_args = [];

					if ( 'inx-search-' === substr( $var_name, 0, 11 ) ) {
						$taxonomy = preg_replace(
							[ '/-/', '/\[[0-9]+\]/' ],
							[ '_', '' ],
							str_replace( 'inx-search-', 'inx_', $var_name )
						);
						if ( ! taxonomy_exists( $taxonomy ) && 's' === substr( $taxonomy, -1 ) ) {
							// Convert plural to singular (e.g., inx_features to inx_feature).
							$taxonomy = substr( $taxonomy, 0, -1 );
						}
						if ( ! taxonomy_exists( $taxonomy ) ) {
							continue;
						}

						if ( is_array( $value ) ) {
							$values = $value;
							$multi  = true;
						} else {
							$values = [ $value ];
							$multi  = false;
						}

						foreach ( $values as $value ) {
							$current_term_slug = sanitize_text_field( $value );
							$term              = get_term_by( 'slug', $current_term_slug, $taxonomy );

							if ( $term && ! is_wp_error( $term ) ) {
								$translated_term_id = pll_get_term( $term->term_id, $slug );

								if ( $translated_term_id ) {
									$translated_term = get_term( $translated_term_id, $taxonomy );

									if ( $translated_term && ! is_wp_error( $translated_term ) ) {
										if ( $multi ) {
											$multi_value_args[ $var_name ][] = $translated_term->slug;
										} else {
											$url = add_query_arg( $var_name, $translated_term->slug, $url );
										}
									}
								} else {
									remove_query_arg( $var_name, $url );
								}
							} else {
								remove_query_arg( $var_name, $url );
							}
						}
					}
				}

				if ( ! empty( $multi_value_args ) ) {
					foreach ( $multi_value_args as $var_name => $values ) {
						$url = add_query_arg( $var_name, $values, $url );
					}
				}
			}
		}

		return $url;
	} // fix_custom_taxonomy_switcher_links

} // Polylang_Compat
