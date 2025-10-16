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

	const SCOPES = array(
		'global',
		'property_details',
	);

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
	 * Register filters.
	 *
	 * @since 1.9.53-beta
	 */
	public function init() {
		add_filter( 'inx_dynamic_css_scopes', array( $this, 'get_scopes' ) );
		add_filter( 'inx_dynamic_css_global', array( $this, 'get_global_props' ) );
		add_filter( 'inx_dynamic_css_property_details', array( $this, 'get_property_details_props' ) );
	} // init

	/**
	 * Get available dynamic CSS scopes (filter callback).
	 *
	 * @since 1.9.53-beta
	 *
	 * @param string[] $scopes Current dynamic CSS scopes or empty array.
	 *
	 * @return string[] Dynamic CSS scopes.
	 */
	public function get_scopes( $scopes ) {
		if ( ! empty( $scopes ) && is_array( $scopes ) ) {
			return array_unique( array_merge( self::SCOPES, $scopes ) );
		}

		return self::SCOPES;
	} // get_scopes

	/**
	 * Check if the current request URI contains a dynamic CSS "filename".
	 * If so, send the related contents and exit.
	 *
	 * @since 1.9.53-beta
	 */
	public function send_on_request() {
		if ( ! isset( $_SERVER['REQUEST_URI'] ) ) {
			return;
		}

		$uri = sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) );

		if ( strlen( $uri ) < 10 ) {
			return;
		}

		$scopes = apply_filters( 'inx_dynamic_css_scopes', self::SCOPES );

		if ( empty( $scopes ) || ! is_array( $scopes ) ) {
			$scopes = self::SCOPES;
		}

		foreach ( $scopes as $scope ) {
			$uri_scope = str_replace( '_', '-', $scope );

			if ( false !== strpos( $uri, "/inx-dyn-{$uri_scope}.css" ) ) {
				$this->send( $scope );
			}
		}
	} // send_on_request

	/**
	 * Send CSS property contents.
	 *
	 * @since 1.9.49-beta
	 *
	 * @param string $scope CSS scope (optional).
	 */
	public function send( $scope = 'global' ) {
		header( 'Content-Type: text/css; charset=utf-8' );

		$prop_blocks = apply_filters( "inx_dynamic_css_{$scope}", array() );

		if ( empty( $prop_blocks ) ) {
			exit;
		}

		$css = '';

		foreach ( $prop_blocks as $selector => $properties ) {
			$css .= $this->get_css_property_code( $properties, $selector );
		}

		echo $css;

		exit;
	} // send

	/**
	 * Generate global CSS properties (filter callback).
	 *
	 * @since 1.11.14
	 *
	 * @param mixed[] $props Current global properties or empty array.
	 *
	 * @return mixed[] CSS properties (['selector' => ['prop1' => 'value1', 'prop2' => 'value2'...]]).
	 */
	public function get_global_props( $props ) {
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
			// The following properties NOT available in the plugin options yet.
			'--inx-border-radius-subtle'          => '4px',
			'--inx-signature-border-radius'       => '0 0 8px 0',
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
				}
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
				$defaults[ "--inx-gradient-{$name_part}" ] = $this->plugin_options['color_gradients'] ?
					wp_sprintf(
						'linear-gradient(60deg, %1$s 50%%, %2$s 100%%);',
						$defaults[ "{$property}-lighter" ],
						$defaults[ "{$property}-darker" ]
					) :
					"var($property)";
			}
		}

		$properties = array( ':root' => $defaults );

		if ( ! empty( $props ) && is_array( $props ) ) {
			$properties = array_merge( $properties, $props );
		}

		return $properties;
	} // get_global_props

	/**
	 * Generate property details CSS properties (filter callback).
	 *
	 * @since 1.11.14
	 *
	 * @param mixed[] $props Current property details properties or empty array.
	 *
	 * @return mixed[] CSS properties (['selector' => ['prop1' => 'value1', 'prop2' => 'value2'...]]).
	 */
	public function get_property_details_props( $props ) {
		if ( defined( 'INX_SKIN_KEN_BURNS_MIN_IMAGE_WIDTH' ) && (int) INX_SKIN_KEN_BURNS_MIN_IMAGE_WIDTH ) {
			$ken_burns_effect_min_image_width = ( (int) INX_SKIN_KEN_BURNS_MIN_IMAGE_WIDTH ) . 'px';
		}
		if ( empty( $ken_burns_effect_min_image_width ) ) {
			$ken_burns_effect_min_image_width = $this->plugin_options['ken_burns_effect_min_image_width'] ?
				$this->plugin_options['ken_burns_effect_min_image_width'] . 'px' : '800px';
		}

		if ( defined( 'INX_SKIN_MAX_IMAGE_HEIGHT' ) && (int) INX_SKIN_MAX_IMAGE_HEIGHT ) {
			$gallery_image_max_height = ( (int) INX_SKIN_MAX_IMAGE_HEIGHT ) . 'px';
		}
		if ( empty( $gallery_image_max_height ) ) {
			$gallery_image_max_height = $this->plugin_options['gallery_image_max_height'] ?
				$this->plugin_options['gallery_image_max_height'] . 'px' : 'initial';
		}

		$defaults = array(
			'.inx-gallery' => array(
				'--inx-gallery-image-slider-bg-color'   => $this->plugin_options['gallery_image_slider_bg_color'] ?
					$this->plugin_options['gallery_image_slider_bg_color'] : 'transparent',
				'--inx-gallery-image-slider-min-height' => $this->plugin_options['gallery_image_slider_min_height'] ?
					$this->plugin_options['gallery_image_slider_min_height'] . 'px' : 'initial',
				// The following default values are "read-only" - CSS-based changes have no effect.
				'--inx-gallery-ken-burns-effect-min-image-width' => $ken_burns_effect_min_image_width,
				'--inx-gallery-image-max-height'        => $gallery_image_max_height,
			),
		);

		if ( ! empty( $props ) && is_array( $props ) ) {
			return array_merge( $defaults, $props );
		}

		return $defaults;
	} // get_property_details_props

	/**
	 * Generate the CSS custom property code block for the given selector.
	 *
	 * @since 1.9.53-beta
	 *
	 * @param mixed[] $properties CSS properties.
	 * @param string  $selector   CSS selector.
	 *
	 * @return string CSS code block.
	 */
	private function get_css_property_code( $properties, $selector ) {
		if ( empty( $properties ) ) {
			return '';
		}

		$css = "{$selector} {" . PHP_EOL;

		foreach ( $properties as $property => $value ) {
			$css .= wp_sprintf( '%s: %s;', $property, $value ) . PHP_EOL;
		}

		$css .= '}' . PHP_EOL;

		return $css;
	} // get_css_property_code

} // Dynamic_CSS
