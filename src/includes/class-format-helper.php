<?php
/**
 * Class Format_Helper
 *
 * @package immonex\Kickstart
 */

namespace immonex\Kickstart;

/**
 * Output related helper methods and filters.
 */
class Format_Helper {

	/**
	 * Plugin options
	 *
	 * @var mixed[]
	 */
	private $plugin_options;

	/**
	 * Helper/Utility objects
	 *
	 * @var object[]
	 */
	private $utils;

	/**
	 * Constructor
	 *
	 * @since 1.0.0
	 *
	 * @param mixed[]  $plugin_options Plugin options.
	 * @param object[] $utils          Helper/Utility objects.
	 */
	public function __construct( $plugin_options, $utils ) {
		global $wp_embed;

		$this->plugin_options = $plugin_options;
		$this->utils          = $utils;

		/**
		 * Plugin-specific actions and filters
		 */

		if ( ! empty( $wp_embed ) ) {
			add_filter( 'inx_the_content', array( $wp_embed, 'autoembed' ), 8 );
		}
		add_filter( 'inx_the_content', 'do_blocks', 9 );
		add_filter( 'inx_the_content', 'wptexturize' );
		add_filter( 'inx_the_content', 'convert_smilies', 20 );
		add_filter( 'inx_the_content', 'convert_chars' );
		add_filter( 'inx_the_content', 'wpautop' );
		add_filter( 'inx_the_content', 'shortcode_unautop' );
		add_filter( 'inx_the_content', 'do_shortcode' );
		add_filter( 'inx_the_content', 'prepend_attachment' );
		add_filter( 'inx_the_content', 'wp_filter_content_tags' );
		add_filter( 'inx_the_content', 'wp_replace_insecure_home_url' );

		if ( ! empty( $wp_embed ) ) {
			add_filter( 'inx_the_content_noautop', array( $wp_embed, 'autoembed' ), 8 );
		}
		add_filter( 'inx_the_content_noautop', 'do_blocks', 9 );
		add_filter( 'inx_the_content_noautop', 'wptexturize' );
		add_filter( 'inx_the_content_noautop', 'convert_smilies', 20 );
		add_filter( 'inx_the_content_noautop', 'convert_chars' );
		add_filter( 'inx_the_content_noautop', 'do_shortcode' );
		add_filter( 'inx_the_content_noautop', 'prepend_attachment' );
		add_filter( 'inx_the_content_noautop', 'wp_filter_content_tags' );
		add_filter( 'inx_the_content_noautop', 'wp_replace_insecure_home_url' );
	} // __construct

	/**
	 * Return heading code.
	 *
	 * @since 1.0.0
	 *
	 * @param string $title Heading text.
	 * @param int    $level Heading level.
	 * @param string $classes CSS classes to be added.
	 *
	 * @return string HTML heading code.
	 */
	public function get_heading( $title, $level, $classes = '' ) {
		$title = trim( $title );
		if ( ! $title ) {
			return '';
		}

		$start_tag = $this->get_heading_tag( $level, false, $classes );
		$end_tag   = $this->get_heading_tag( $level, true, $classes );

		return wp_sprintf( '%s%s%s', $start_tag, $title, $end_tag );
	} // get_heading

	/**
	 * Return heading tag with given level and classes.
	 *
	 * @since 1.0.0
	 *
	 * @param int    $level Heading level.
	 * @param bool   $close Close tag? (false by default).
	 * @param string $classes CSS classes to be added.
	 *
	 * @return string HTML heading tag code.
	 */
	public function get_heading_tag( $level, $close = false, $classes = '' ) {
		$level += $this->plugin_options['heading_base_level'] - 1;
		if ( $level > 6 ) {
			$level = 6;
		}

		if ( $close ) {
			$tag = '</h' . $level . '>';
		} else {
			$tag = '<h' . $level;
			if ( $classes ) {
				$tag .= wp_sprintf( ' class="%s"', $classes );
			}
			$tag .= '>';
		}

		return $tag;
	} // get_heading

	/**
	 * Prepare given continuous text for output (filters etc.).
	 *
	 * @since 1.0.0
	 *
	 * @param string      $text Text to prepare.
	 * @param bool|string $apply_the_content Flag for applying the_content WP filter:
	 *                                       true (default) for all the_content
	 *                                       filters or "noautop" for a reduced set.
	 *
	 * @return string Prepared text/HTML code.
	 */
	public function prepare_continuous_text( $text, $apply_the_content = true ) {
		$text = trim( $text );
		if ( true === $apply_the_content ) {
			$text = apply_filters( 'inx_the_content', $text );
		} elseif ( 'noautop' === $apply_the_content ) {
			$text = apply_filters( 'inx_the_content_noautop', $text );

			if ( false !== strpos( $text, PHP_EOL ) ) {
				// Add extra breaks if required.
				$text = preg_replace( '/([a-zA-ZäöüÄÖÜ0-9.,;:²³\-\!\?])' . PHP_EOL . '/', '$1<br>' . PHP_EOL, $text );
				$text = preg_replace( '/(' . PHP_EOL . PHP_EOL . ')/', PHP_EOL . '<br>' . PHP_EOL, $text );
			}
		}

		return $text;
	} // prepare_continuous_text

	/**
	 * Prepare the given value for output, if it seems to be a as continuous text.
	 *
	 * @since 1.0.0
	 *
	 * @param string $value Text to (possibly) prepare.
	 *
	 * @return string Prepared text/HTML code or original value.
	 */
	public function prepare_single_value( $value ) {
		$value = trim( $value );
		if ( false !== strpos( $value, "\n" ) ) {
			// Value seems to be a continuous text: apply WP content filter etc.
			$value = $this->prepare_continuous_text( $value );
		}

		return $value;
	} // prepare_single_value

	/**
	 * Format the given value as property price or return a special value if
	 * zero or empty.
	 *
	 * @since 1.0.0
	 *
	 * @param int|float $value Price value.
	 * @param int       $decimals Number of decimals (optional, 2 by default, 9 = auto).
	 * @param string    $price_time_unit Unit to add the given price relates to (optional).
	 * @param string    $if_zero Return value if original value is zero or empty (optional).
	 * @param string    $currency Currency acronym or symbol (optional, system setting by default).
	 *
	 * @return string Formatted price or default value.
	 */
	public function format_price( $value, $decimals = 2, $price_time_unit = '', $if_zero = '', $currency = '' ) {
		if ( ! $value ) {
			return $if_zero ? $if_zero : '';
		}

		if ( ! is_numeric( $value ) ) {
			return $value;
		}

		$currency = ! empty( $currency ) ? $currency : $this->plugin_options['currency_symbol'];
		$decimals = 9 === $decimals ? 99 : $decimals;
		$args     = array(
			'if_zero'  => $if_zero,
			'unit_sep' => '&nbsp;',
		);

		$price = $this->utils['string']->format_number( $value, $decimals, $currency, $args );

		if ( $price !== $if_zero && $price_time_unit ) {
			$price .= ' <span class="inx-price-time-unit">' . $price_time_unit . '</span>';
		}

		return $price;
	} // format_price

	/**
	 * Format the given value as property price or return a special value if
	 * zero or empty.
	 *
	 * @since 1.9.33-beta
	 *
	 * @param int|float $value Area value.
	 * @param int       $decimals Number of decimals (optional, 2 by default, 9 = auto).
	 * @param string    $if_zero Return value if original value is zero or empty (optional).
	 * @param string    $unit Area unit (optional, system setting by default).
	 *
	 * @return string Formatted price or default value.
	 */
	public function format_area( $value, $decimals = 2, $if_zero = '', $unit = '' ) {
		if ( ! $value ) {
			return $if_zero ? $if_zero : '';
		}

		if ( ! is_numeric( $value ) ) {
			return $value;
		}

		$unit     = ! empty( $unit ) ? $unit : $this->plugin_options['area_unit'];
		$decimals = 9 === $decimals ? 99 : $decimals;
		$args     = array(
			'if_zero'  => $if_zero,
			'unit_sep' => '&nbsp;',
		);

		return $this->utils['string']->format_number( $value, $decimals, $unit, $args );
	} // format_area

} // Format_Helper
