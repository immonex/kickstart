<?php
/**
 * Class Dynamic_CSS
 *
 * @package immonex\Kickstart
 */

namespace immonex\Kickstart;

/**
 * Dynamic CSS generation.
 */
class Dynamic_CSS {

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
	 * @since 1.9.49-beta
	 *
	 * @param mixed[]  $plugin_options Plugin options.
	 * @param object[] $utils          Helper/Utility objects.
	 */
	public function __construct( $plugin_options, $utils ) {
		global $wp_embed;

		$this->plugin_options = $plugin_options;
		$this->utils          = $utils;
	} // __construct

	/**
	 * Send CSS contents.
	 *
	 * @since 1.9.49-beta
	 *
	 * @param string $type CSS type (optional, maybe used in future versions).
	 */
	public function send( $type = 'global' ) {
		header( 'Content-Type: text/css; charset=utf-8' );

		if ( 'global' === $type ) {
			echo $this->get_global_css();
		}

		exit;
	} // send

	/**
	 * Generate global CSS properties.
	 *
	 * @since 1.9.49-beta
	 */
	public function get_global_css() {
		$brightness_variant_pct = apply_filters( 'inx_brightness_variant_pct', 15 );
		if (
			! is_numeric( $brightness_variant_pct )
			|| $brightness_variant_pct < 1
			|| $brightness_variant_pct > 100
		) {
			$brightness_variant_pct = 15;
		}

		$muted_color_opacity_pct    = $this->plugin_options['muted_color_opacity_pct'] * 0.01;
		$color_bg_muted_default_rgb = $this->utils['color']->hex2rgb( $this->plugin_options['color_bg_muted_default'] );
		$color_bg_muted_default     = wp_sprintf(
			'rgba(%1$s, %2$s)',
			implode( ', ', $color_bg_muted_default_rgb ),
			number_format( $muted_color_opacity_pct, 2 )
		);

		$defaults = array(
			'--inx-color-label-default'           => $this->plugin_options['color_label_default'],
			'--inx-color-marketing-type-sale'     => $this->plugin_options['color_marketing_type_sale'],
			'--inx-color-marketing-type-rent'     => $this->plugin_options['color_marketing_type_rent'],
			'--inx-color-marketing-type-leasing'  => $this->plugin_options['color_marketing_type_leasing'],
			'--inx-color-action-element'          => $this->plugin_options['color_action_element'],
			'--inx-color-action-element-inverted' => $this->plugin_options['color_action_element_inverted'],
			'--inx-color-text-inverted-default'   => $this->plugin_options['color_text_inverted_default'],
			'--inx-color-demo'                    => $this->plugin_options['color_demo'],
			'--inx-color-bg-muted-default'        => $color_bg_muted_default,
		);

		$add_gradients_for = array(
			'label-default',
			'marketing-type-sale',
			'marketing-type-rent',
			'marketing-type-leasing',
			'action-element',
			'demo',
		);

		foreach ( $defaults as $property => $value ) {
			if ( '--inx-color-' !== substr( $property, 0, 12 ) ) {
				continue;
			}

			$opacity = false;
			if ( 'rgba' === strtolower( substr( $value, 0, 4 ) ) ) {
				if ( preg_match( '/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([0-9.]+)\)/i', $value, $matches ) ) {
					$value   = $this->utils['color']->rgb2hex( array( $matches[1], $matches[2], $matches[3] ) );
					$opacity = $matches[4];
				};
			}

			if ( ! isset( $defaults[ "{$property}-lighter" ] ) ) {
				$lighter = $this->utils['color']->set_lightness( $value, $brightness_variant_pct, true );
				if ( $opacity ) {
					$rgb = $this->utils['color']->hex2rgb( $lighter );
					if ( ! empty( $rgb ) ) {
						$lighter = wp_sprintf( 'rgba(%1$s, %2$s, %3$s, %4$s)', $rgb[0], $rgb[1], $rgb[2], $opacity );
					}
				}
				$defaults[ "{$property}-lighter" ] = $lighter;
			}

			if ( ! isset( $defaults[ "{$property}-darker" ] ) ) {
				$darker = $this->utils['color']->set_lightness( $value, $brightness_variant_pct * -1, true );
				if ( $opacity ) {
					$rgb = $this->utils['color']->hex2rgb( $darker );
					if ( ! empty( $darker ) ) {
						$darker = wp_sprintf( 'rgba(%1$s, %2$s, %3$s, %4$s)', $rgb[0], $rgb[1], $rgb[2], $opacity );
					}
				}
				$defaults[ "{$property}-darker" ] = $darker;
			}

			$name_part = substr( $property, 12 );

			if (
				in_array( $name_part, $add_gradients_for, true )
				&& ! isset( $defaults[ "--inx-gradient-{$name_part}" ] )
			) {
				$defaults[ "--inx-gradient-{$name_part}" ] = wp_sprintf(
					'linear-gradient(60deg, %1$s 50%%, %2$s 100%%);',
					$defaults[ "{$property}-lighter" ],
					$defaults[ "{$property}-darker" ]
				);
			}
		}

		$css = ':root {' . PHP_EOL;

		foreach ( $defaults as $property => $value ) {
			$css .= sprintf( '%s: %s;', $property, $value ) . PHP_EOL;
		}

		$css .= '}' . PHP_EOL;

		return $css;
	} // get_global_css

} // Dynamic_CSS
