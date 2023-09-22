<?php
/**
 * Class Property_Hooks
 *
 * @package immonex\Kickstart
 */

namespace immonex\Kickstart;

/**
 * Property related actions and filters.
 */
class Property_Hooks {

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
	 * API object
	 *
	 * @var \immonex\Kickstart\API
	 */
	private $api;

	/**
	 * Current property object instance
	 *
	 * @var \immonex\Kickstart\Property
	 */
	private $current_property = false;

	/**
	 * Constructor
	 *
	 * @since 1.0.0
	 *
	 * @param mixed[]  $config Various component configuration data.
	 * @param object[] $utils Helper/Utility objects.
	 */
	public function __construct( $config, $utils ) {
		global $pagenow;

		$this->config = $config;
		$this->utils  = $utils;
		$this->api    = new API( $config, $utils );

		/**
		 * WP actions and filters
		 */

		add_filter( 'single_template', array( $this, 'register_single_property_template' ) );
		add_filter( 'archive_template', array( $this, 'register_property_archive_template' ) );
		add_filter( 'document_title_parts', array( $this, 'update_template_document_title' ) );
		add_filter( 'the_title', array( $this, 'update_template_page_title' ), 10, 2 );
		add_filter( 'get_post_metadata', array( $this, 'update_template_page_featured_image' ), 10, 4 );
		add_filter( 'body_class', array( $this, 'maybe_add_body_class' ) );

		// @codingStandardsIgnoreLine
		$is_frontend_page_request = isset( $pagenow ) && 'index.php' === $pagenow && ! preg_match( '/\/wp-json\/|preview\=/', $_SERVER['REQUEST_URI'] );

		if ( $is_frontend_page_request && $this->config['property_details_page_id'] ) {
			add_filter( 'request', array( $this, 'internal_page_rewrite' ), 5 );
		}

		/**
		 * OpenImmo2WP actions and filters
		 */

		add_action( 'immonex_oi2wp_import_zip_file_processed', array( $this, 'update_min_max_transients' ), 90 );

		/**
		 * Plugin-specific actions and filters
		 */

		add_action( 'inx_render_property_contents', array( $this, 'render_property_contents' ), 10, 3 );

		add_filter( 'inx_get_property_template_data', array( $this, 'get_property_template_data' ), 10, 2 );
		add_filter( 'inx_get_property_images', array( $this, 'get_property_images' ), 10, 3 );
		add_filter( 'inx_get_property_detail_item', array( $this, 'get_property_detail_item' ), 10, 3 );
		add_filter( 'inx_current_property_post_id', array( $this, 'get_current_property_post_id' ) );
		add_filter( 'inx_property_template_data_details', array( $this, 'adjust_rental_details' ), 10, 2 );
		add_filter( 'inx_property_detail_element_output', array( $this, 'render_property_detail_element_output' ), 10, 2 );

		/**
		 * Shortcodes
		 */

		add_shortcode( 'inx-property-details', array( $this, 'shortcode_property_details' ) );
		add_shortcode( 'inx-property-detail-element', array( $this, 'shortcode_property_detail_element' ) );
	} // __construct

	/**
	 * Register single template for the property custom post type.
	 *
	 * @since 1.0.0
	 *
	 * @param string $original_template The current template file determined by
	 *                                  the WP core system.
	 *
	 * @return string Selected single property template or original template for
	 *                other post types.
	 */
	public function register_single_property_template( $original_template ) {
		if ( -1 === (int) $this->config['property_details_page_id'] ) {
			return $original_template;
		}

		global $post;

		if ( $post->post_type === $this->config['property_post_type_name'] ) {
			$plain_post_type_name = str_replace( $this->config['plugin_prefix'], '', $this->config['property_post_type_name'] );
			$single_template      = $this->utils['template']->locate_template_file( 'single-' . $plain_post_type_name );
		}

		return isset( $single_template ) && $single_template ? $single_template : $original_template;
	} // register_single_property_template

	/**
	 * Register list (archive) template for the property custom post type.
	 *
	 * @since 1.0.0
	 *
	 * @param string $original_template The current template file determined by
	 *                                  the WP core system.
	 *
	 * @return string Selected property archive template or original template for
	 *                other post types.
	 */
	public function register_property_archive_template( $original_template ) {
		if ( -1 === (int) $this->config['property_list_page_id'] ) {
			return $original_template;
		}

		$inx_taxonomies = apply_filters( 'inx_get_taxonomies', array() );

		if (
			is_post_type_archive( $this->config['property_post_type_name'] )
			|| is_tax( array_keys( $inx_taxonomies ) )
			|| (
				is_archive() &&
				get_query_var( 'post_type' ) === $this->config['property_post_type_name']
			)
		) {
			$plain_post_type_name = str_replace( $this->config['plugin_prefix'], '', $this->config['property_post_type_name'] );
			$archive_template     = $this->utils['template']->locate_template_file( 'archive-' . $plain_post_type_name );
		}

		return isset( $archive_template ) && $archive_template ? $archive_template : $original_template;
	} // register_property_archive_template

	/**
	 * Set the property title as DOCUMENT title if a custom page ist used as
	 * layout template.
	 *
	 * @since 1.1.0
	 *
	 * @param string[] $title_parts Original page/post title parts.
	 *
	 * @return string[] Possibly updated title parts.
	 */
	public function update_template_document_title( $title_parts ) {
		$property_post_id = $this->get_current_property_post_id( $this->utils['general']->get_the_ID() );

		if (
			is_admin()
			|| is_archive()
			|| empty( $this->config['property_details_page_id'] )
			|| false === $property_post_id
		) {
			return $title_parts;
		}

		$property_post_title = get_post_field( 'post_title', $property_post_id, 'raw' );
		if ( $property_post_title ) {
			$title_parts['title'] = $property_post_title;
		}

		return $title_parts;
	} // update_template_document_title

	/**
	 * Set the property title as PAGE title if a custom page ist used as
	 * layout template.
	 *
	 * @since 1.1.0
	 *
	 * @param string $title Original page/post title.
	 * @param int    $post_id ID of the related post/page.
	 *
	 * @return string Possibly updated title.
	 */
	public function update_template_page_title( $title, $post_id ) {
		$property_post_id = $this->get_current_property_post_id( $this->utils['general']->get_the_ID() );

		if (
			is_admin()
			|| empty( $this->config['property_details_page_id'] )
			|| $post_id !== $this->config['property_details_page_id']
			|| false === $property_post_id
		) {
			return $title;
		}

		$property_post_title = get_post_field( 'post_title', $property_post_id, 'raw' );
		if ( $property_post_title ) {
			return $property_post_title;
		}

		return $title;
	} // update_template_page_title
	/**
	 * Add a body class on custom property detail pages.
	 *
	 * @since 1.5.5
	 *
	 * @param string[] $classes Original class list.
	 *
	 * @return string[] Extended class list if page ID matches the related
	 *                  plugin option.
	 */
	public function maybe_add_body_class( $classes ) {
		if ( get_the_ID() === (int) $this->config['property_details_page_id'] ) {
			$classes[] = $this->config['plugin_slug'] . '-custom-details-page';
		}

		return $classes;
	} // maybe_add_body_class

	/**
	 * Dynamically replace the featured image of a template page for property
	 * detail views with the related real property image.
	 *
	 * @since 1.1.0
	 *
	 * @param null|array|string $null The value get_metadata() should return as
	 *                                single metadata value, or an array of values.
	 * @param int               $object_id Post ID.
	 * @param string            $meta_key Meta key.
	 * @param string|string[]   $single Single meta value or an array of values.
	 *
	 * @return int|string Alternative featured image ID if required.
	 */
	public function update_template_page_featured_image( $null, $object_id, $meta_key, $single ) {
		if (
			'_thumbnail_id' !== $meta_key
			|| is_admin()
			|| empty( $this->config['property_details_page_id'] )
			|| $object_id !== $this->config['property_details_page_id']
		) {
			return $null;
		}

		remove_filter( 'get_post_metadata', array( $this, __FUNCTION__ ), 10, 4 );
		$property_post_id = $this->get_current_property_post_id( $this->utils['general']->get_the_ID() );
		if ( false === $property_post_id ) {
			return $null;
		}
		$property_featured_image_id = get_post_thumbnail_id( $property_post_id );
		add_filter( 'get_post_metadata', array( $this, __FUNCTION__ ), 10, 4 );

		if ( $property_featured_image_id ) {
			return $property_featured_image_id;
		}

		return $null;
	} // update_template_page_featured_image

	/**
	 * Retrieve all data and tools relevant for rendering a property template
	 * (filter callback).
	 *
	 * @since 1.6.9
	 *
	 * @param mixed[] $template_data Dummy template data (empty).
	 * @param mixed[] $atts Rendering attributes (optional).
	 *
	 * @return mixed[] Property and related meta data.
	 */
	public function get_property_template_data( $template_data = array(), $atts = array() ) {
		$post_id = is_array( $atts ) && ! empty( $atts['post_id'] ) ?
			$atts['post_id'] :
			$this->get_current_property_post_id( $this->utils['general']->get_the_ID() );

		$property = $this->get_property_instance( $post_id );
		if ( ! $property ) {
			return array();
		}

		return $property->get_property_template_data( $atts );
	} // get_property_template_data

	/**
	 * Render and return or output the contents of a property related template
	 * (action based).
	 *
	 * @since 1.0.0
	 *
	 * @param int|string|bool $post_id Property post ID (optional).
	 * @param string          $template Template file (without suffix).
	 * @param mixed[]         $atts Rendering attributes.
	 * @param bool            $output Flag for directly output the rendered contents (true by default).
	 *
	 * @return string Rendered template contents.
	 */
	public function render_property_contents( $post_id = false, $template = '', $atts = array(), $output = true ) {
		$post_id = $this->get_current_property_post_id( $post_id );

		if ( empty( $template ) ) {
			$template = Property::DEFAULT_TEMPLATE;
		}

		$property = $this->get_property_instance( $post_id );
		if ( ! $property ) {
			return '';
		}

		$element_atts = array();

		if ( count( $atts ) > 0 ) {
			if ( ! empty( $atts['elements'] ) ) {
				$shortcode_elements = explode(
					',',
					str_replace(
						array( '(', ')' ),
						array( '', '' ),
						$atts['elements']
					)
				);
			} else {
				$shortcode_elements = array();
			}

			$elements = $this->current_property ?
				$this->current_property->get_detail_page_element_keys() :
				$shortcode_elements;

			if ( count( $elements ) > 0 ) {
				/**
				 * Assign shortcode attributes to the related elements for output
				 * rendering (only if required - given default values will be
				 * overridden).
				 */
				foreach ( $elements as $i => $element_key ) {
					$element_atts[ $element_key ] = array();
					foreach ( $atts as $attr_key => $attr_value ) {
						if ( 'elements' === $attr_key ) {
							continue;
						}

						if ( substr( $attr_key, 0, strlen( $element_key ) + 1 ) === $element_key . '-' ) {
							// Prefixed shortcode attribute belongs to a specific element (example: epass-headline).
							$element_attr_key                                  = substr( $attr_key, strlen( $element_key ) + 1 );
							$element_atts[ $element_key ][ $element_attr_key ] = $attr_value;
						} elseif ( count( $shortcode_elements ) === 1 ) {
							// Assign unprefixed attributes to single element defined inside the shortcode.
							$element_atts[ trim( $shortcode_elements[0] ) ][ $attr_key ] = $attr_value;
						}
					}
				}
			}
		}

		$atts['element_atts'] = $element_atts;

		$contents = $property->render( $template, $atts );
		if ( $output ) {
			echo $contents;
		}

		return $contents;
	} // render_property_contents

	/**
	 * Return property image data for action based rendering.
	 *
	 * @since 1.0.0
	 *
	 * @param mixed[]         $images Empty array (placeholder).
	 * @param int|string|bool $post_id Property post ID or false to use current.
	 * @param mixed[]         $args Image and return type.
	 *
	 * @return mixed[] List of property objects, post IDs of URLs.
	 */
	public function get_property_images( $images = array(), $post_id = false, $args = array() ) {
		if ( ! $post_id ) {
			$post_id = $this->get_current_property_post_id( $this->utils['general']->get_the_ID() );
		}

		$valid_image_types  = array( 'gallery', 'floor_plans' );
		$valid_return_types = array( 'objects', 'ids', 'urls' );

		if (
			! empty( $args['type'] ) &&
			in_array( $args['type'], $valid_image_types, true )
		) {
			$type = $args['type'];
		} else {
			$type = $valid_image_types[0];
		}

		if (
			! empty( $args['return'] ) &&
			in_array( $args['return'], $valid_return_types, true )
		) {
			$return = $args['return'];
		} else {
			$return = $valid_return_types[0];
		}

		$property = $this->get_property_instance( $post_id );

		return $property->get_images( $type, $return );
	} // get_property_images

	/**
	 * Return property detail item for action based rendering.
	 *
	 * @since 1.0.0
	 *
	 * @param mixed           $item Empty variable (placeholder).
	 * @param int|string|bool $post_id Property post ID or false to use current.
	 * @param mixed[]         $args Item name, group and return type.
	 *
	 * @return mixed[]|string|int Item data as array or single value.
	 */
	public function get_property_detail_item( $item, $post_id = false, $args = array() ) {
		if ( ! $post_id ) {
			$post_id = $this->get_current_property_post_id( $this->utils['general']->get_the_ID() );
		}

		$name = ! empty( $args['name'] ) ? $args['name'] : false;
		if ( ! $name ) {
			return false;
		}

		$group      = ! empty( $args['group'] ) ? $args['group'] : false;
		$value_only = ! isset( $args['value_only'] ) || ! empty( $args['value_only'] );

		$property = $this->get_property_instance( $post_id );

		return $property->get_detail_item( $name, $group, $value_only );
	} // get_property_detail_item

	/**
	 * Check and/or update the current property post ID (filter callback).
	 *
	 * @since 1.1.0
	 *
	 * @param int|string|bool $post_id Current property post ID or false if unknown.
	 *
	 * @return int|string|bool Possibly updated current post ID.
	 */
	public function get_current_property_post_id( $post_id = false ) {
		if ( is_singular() || is_page() ) {
			if ( ! empty( $_GET['inx-property-id'] ) ) {
				$post_id = (int) $_GET['inx-property-id'];
			} else {
				global $wp_query;

				if ( isset( $wp_query->query ) && ! empty( $wp_query->query['inx-property-id'] ) ) {
					$post_id = $wp_query->query['inx-property-id'];
				} else {
					foreach ( array( 'inx-property-id', 'inx_property_id', '_inx_post_id' ) as $field_name ) {
						$temp_id = get_post_meta( get_the_ID(), $field_name, true );
						if ( $temp_id ) {
							$post_id = $temp_id;
							break;
						}
					}
				}
			}
		}

		if (
			$post_id
			&& get_post_type( $post_id ) === $this->config['property_post_type_name']
		) {
			return $post_id;
		} else {
			$post_id = false;
		}

		if ( ! $post_id ) {
			$post_id = $this->utils['general']->get_the_ID();
		}

		if (
			$post_id
			&& get_post_type( $post_id ) === $this->config['property_post_type_name']
		) {
			return $post_id;
		}

		return false;
	} // get_current_property_post_id

	/**
	 * Return the rendered property details (based on the shortcode
	 * [inx-property-details]).
	 *
	 * @since 1.0.0
	 *
	 * @param mixed[] $atts Rendering attributes.
	 *
	 * @return string Rendered shortcode contents.
	 */
	public function shortcode_property_details( $atts ) {
		$post_id = $this->get_current_property_post_id( $this->utils['general']->get_the_ID() );
		if ( ! $post_id ) {
			return '';
		}

		if ( empty( $atts ) ) {
			$atts = array();
		}

		// Permit arbitrary attributes for passing template parameters (special case!).
		$shortcode_atts = $this->utils['string']->decode_special_chars(
			shortcode_atts( $atts, $atts, 'inx-property-details' )
		);
		$template       = ! empty( $shortcode_atts['template'] ) ?
			$shortcode_atts['template'] :
			Property::DEFAULT_TEMPLATE;

		return $this->render_property_contents( $post_id, $template, $shortcode_atts, false );
	} // shortcode_property_details

	/**
	 * Return a single rendered property detail element (based on the shortcode
	 * [inx-property-detail-element]).
	 *
	 * @since 1.4.0
	 *
	 * @param mixed[] $atts Rendering attributes.
	 *
	 * @return string Rendered shortcode contents.
	 */
	public function shortcode_property_detail_element( $atts ) {
		$default_atts = array(
			'post_id'      => '',
			'name'         => '',
			'group'        => '',
			'type'         => '',
			'template'     => '{value}',
			'convert_urls' => false,
			'if_empty'     => '',
		);

		$shortcode_atts = $this->utils['string']->decode_special_chars(
			shortcode_atts( $default_atts, $atts, 'inx-property-detail-element' )
		);

		if ( empty( $shortcode_atts['name'] ) ) {
			return $shortcode_atts['if_empty'];
		}

		$property_id = ! empty( $atts['post_id'] ) ?
			(int) $atts['post_id'] :
			$this->get_current_property_post_id();
		$property    = $this->get_property_instance( $property_id );

		if (
			! is_a( $property, '\immonex\Kickstart\Property' )
			|| ! is_a( $property->post, 'WP_Post' )
		) {
			return $shortcode_atts['if_empty'];
		}

		$core_data   = $property->get_core_data( 'inx-property-detail-element shortcode', $shortcode_atts );
		$oi_data     = $property->get_openimmo_data();
		$name        = html_entity_decode( trim( sanitize_text_field( $shortcode_atts['name'] ) ) );
		$value       = false;
		$raw_value   = false;
		$title       = '';
		$detail_item = false;

		if ( '//' === substr( $name, 0, 2 ) && $oi_data['oi_immobilie'] ) {
			/**
			 * Queried element most likely is an XML path -> apply XPath to
			 * property XML source if available.
			 */
			$value_xpath = $oi_data['oi_immobilie']->xpath( $name );
			if ( ! empty( $value_xpath ) ) {
				$value = (string) $value_xpath[0];
			}
		} else {
			/**
			 * Try to retrieve an OpenImmo value based on its name stated in
			 * the mapping table used to import it.
			 */
			$args = array(
				'name'       => $name,
				'value_only' => false,
			);

			if ( ! empty( $shortcode_atts['group'] ) ) {
				$args['group'] = trim( sanitize_text_field( $shortcode_atts['group'] ) );
			}

			$detail_item = apply_filters(
				'inx_get_property_detail_item',
				false,
				$property_id,
				$args
			);

			if ( ! empty( $detail_item['value'] ) ) {
				$value = $detail_item['value'];

				if ( ! empty( $detail_item['meta_json'] ) ) {
					$detail_item['meta'] = json_decode( $detail_item['meta_json'], true );
					if ( ! empty( $detail_item['meta']['value_before_filter'] ) ) {
						$raw_value = $detail_item['meta']['value_before_filter'];
					}
				}
			}

			if ( ! empty( $detail_item['title'] ) ) {
				$title = $detail_item['title'];
			}
		}

		if ( ! $value ) {
			// Alternative: Look up the name in the property core data.
			if ( ! empty( $core_data[ $name ] ) ) {
				$detail_item = $core_data[ $name ];
				$value       = ! empty( $detail_item['value_formatted'] ) ?
					$detail_item['value_formatted'] :
					$detail_item['value'];
				$raw_value   = ! empty( $detail_item['meta']['meta_value_before_filter'] ) ?
					$detail_item['meta']['meta_value_before_filter'] :
					$detail_item['value'];

				if ( ! empty( $detail_item['meta']['mapping_parent'] ) ) {
					$title = $detail_item['meta']['mapping_parent'];
				}
			}
		}

		if ( ! $value ) {
			// Alternative: Fetch the value of a Kickstart-specific custom field.
			$value = get_post_meta( $property_id, "_inx_{$name}", true );
		}

		if ( ! $value ) {
			// Alternative: Fetch the value of a generic custom field.
			$value = get_post_meta( $property_id, $name, true );

			if ( $value ) {
				// Try to retrieve the actual value from a field with the same name as the value determined before.
				$value_temp = get_post_meta( $property_id, $value, true );
				if ( $value_temp ) {
					$value = $value_temp;
				}
			}
		}

		if (
			( $shortcode_atts['template'] === $default_atts['template'] || empty( $shortcode_atts['template'] ) )
			&& $shortcode_atts['type']
		) {
			switch ( $shortcode_atts['type'] ) {
				case 'price':
					$shortcode_atts['template'] = '{value,number,2} {currency_symbol}';
					break;
				case 'area':
					$shortcode_atts['template'] = '{value,number,2} {area_unit}';
					break;
			}
		}

		if ( $shortcode_atts['convert_urls'] && is_string( $value ) ) {
			$value = $this->utils['string']->convert_urls( $value );
		}

		$rendered_content = apply_filters(
			'inx_property_detail_element_output',
			$value,
			array(
				'name'          => $name,
				'initial_value' => $value,
				'raw_value'     => $raw_value,
				'title'         => $title,
				'template'      => html_entity_decode( $shortcode_atts['template'] ),
				'if_empty'      => $shortcode_atts['if_empty'],
				'detail_item'   => $detail_item,
				'post_id'       => $property_id,
				'immobilie'     => $oi_data['oi_immobilie'],
			)
		);

		return $rendered_content;
	} // shortcode_property_detail_element

	/**
	 * Maybe adjust rental property specific titles etc. (callback).
	 *
	 * @since 1.7.18-beta
	 *
	 * @param mixed[] $details     Grouped array of property details (template data).
	 * @param int     $property_id Property post ID.
	 *
	 * @return string Rendered output value based on the given template string.
	 */
	public function adjust_rental_details( $details, $property_id ) {
		if ( empty( $details ) || get_post_meta( $property_id, '_inx_is_sale', true ) ) {
			return $details;
		}

		$replace = array(
			__( "Buyer's Commission", 'immonex-kickstart' ) => __( 'Tenant Commission', 'immonex-kickstart' ),
		);

		foreach ( $details as $group => $items ) {
			if ( empty( $items ) ) {
				continue;
			}

			foreach ( $items as $i => $item ) {
				if ( ! empty( $item['title'] ) && isset( $replace[ $item['title'] ] ) ) {
					$details[ $group ][ $i ]['title'] = $replace[ $item['title'] ];
				}
			}
		}

		return $details;
	} // adjust_rental_details

	/**
	 * Render the output of the property detail element shortcode (callback).
	 *
	 * @since 1.4.0
	 *
	 * @param string|int $value Current output value.
	 * @param mixed[]    $meta Metadata related to the queried element.
	 *
	 * @return string Rendered output value based on the given template string.
	 */
	public function render_property_detail_element_output( $value, $meta = array() ) {
		if ( empty( $value ) ) {
			return $meta['if_empty'];
		}

		$template_tags = $this->extract_template_tags( $meta['template'] );

		if ( count( $template_tags ) > 0 ) {
			$rendered_value = $meta['template'];

			foreach ( $template_tags as $tag ) {
				switch ( $tag['tag'] ) {
					case 'value':
						$replace_by = $value;

						if (
							isset( $tag['args'][0] )
							&& 'number' === strtolower( trim( $tag['args'][0] ) )
						) {
							if (
								! is_numeric( $replace_by )
								&& $meta['raw_value']
								&& is_numeric( $meta['raw_value'] )
							) {
								$replace_by = $meta['raw_value'];
							}

							if ( is_numeric( $replace_by ) ) {
								$decimals = isset( $tag['args'][1] ) ? (int) $tag['args'][1] : 0;
								if ( $decimals > 4 ) {
									$decimals = 2;
								}
								$replace_by = number_format( $replace_by, $decimals, ',', '.' );
							}
						}
						break;
					case 'title':
						$title = $meta['title'];
						if ( $title && ! empty( $tag['args'][0] ) ) {
							$title .= $tag['args'][0];
						}
						$replace_by = $title;
						break;
					case 'currency':
						$replace_by = $this->config['currency'];
						break;
					case 'currency_symbol':
						$replace_by = $this->config['currency_symbol'];
						break;
					case 'area_unit':
						$replace_by = $this->config['area_unit'];
						break;
				}

				$rendered_value = str_replace( $tag['raw_tag'], $replace_by, $rendered_value );
			}
		}

		return trim( $rendered_value );
	} // render_property_detail_element_output

	/**
	 * "Rewrite" the current request to use the selected property detail page
	 * as frame template or redirect to the default list view if the detail page
	 * has been called up directly.
	 *
	 * @since 1.5.10-beta
	 *
	 * @param string[] $request WP Request arguments.
	 *
	 * @return mixed[] Original or modified WP Request arguments.
	 */
	public function internal_page_rewrite( $request ) {
		$details_page_id = $this->config['property_details_page_id'];
		if ( empty( $details_page_id ) ) {
			return $request;
		}

		$forward_to_list_view = false;

		if (
			isset( $request['post_type'] )
			&& $this->config['property_post_type_name'] === $request['post_type']
			&& ! empty( $request[ $this->config['property_post_type_name'] ] )
			&& ! empty( $request['name'] )
		) {
			$details_page_id = apply_filters( 'inx_element_translation_id', $details_page_id );
			$details_page    = $details_page_id ? get_post( $details_page_id, 'OBJECT', 'display' ) : false;
			if ( empty( $details_page ) ) {
				return $request;
			}

			$property_post = get_posts(
				array(
					'post_type' => $this->config['property_post_type_name'],
					'name'      => $request['name'],
				)
			);
			if ( empty( $property_post ) ) {
				return $request;
			}

			$ancestors = '';

			if ( $details_page->post_parent ) {
				// Create a list of parent page names to be added to the details page rewrite name.
				foreach ( get_post_ancestors( $details_page ) as $ancestor_id ) {
					$ancestors .= basename( get_permalink( $ancestor_id ) ) . '/';
				}
			}

			$request['pagename']        = $ancestors . $details_page->post_name;
			$request['inx-property-id'] = $property_post[0]->ID;

			unset( $request['post_type'] );
			unset( $request['inx_property'] );
			unset( $request['name'] );
		} elseif (
			! empty( $request['page_id'] )
			&& $request['page_id'] === $details_page_id
		) {
			if ( ! empty( $_GET['inx-property-id'] ) ) {
				$request['inx-property-id'] = (int) $_GET['inx-property-id'];
			} else {
				$forward_to_list_view = true;
			}
		} elseif ( ! empty( $request['pagename'] ) ) {
			$details_page = get_page_by_path( $request['pagename'] );
			if ( ! empty( $_GET['inx-property-id'] ) ) {
				$request['inx-property-id'] = (int) $_GET['inx-property-id'];
			} elseif ( ! empty( $details_page ) && $details_page->ID === (int) $details_page_id ) {
				$forward_to_list_view = true;
			}
		}

		if ( $forward_to_list_view ) {
			/**
			 * Redirect selected detail page to the default list view if called up
			 * directly (without property ID).
			 */
			if ( $this->config['property_list_page_id'] ) {
				// Specific page stated as overview page.
				$page_id           = apply_filters( 'inx_element_translation_id', $this->config['property_list_page_id'] );
				$property_list_url = get_permalink( $page_id );
			}

			if ( empty( $property_list_url ) ) {
				$property_list_url = get_post_type_archive_link( $this->config['property_post_type_name'] );
			}

			$property_list_url = apply_filters( 'inx_forward_to_list_view_url', $property_list_url );

			if ( $property_list_url ) {
				wp_safe_redirect( $property_list_url, 301 );
				exit;
			}
		}

		return $request;
	} // internal_page_rewrite

	/**
	 * Update cached area max and primary price min/max values (transients)
	 * after every processed import ZIP file.
	 *
	 * @since 1.7.28-beta
	 *
	 * @param string $import_zip_file Recently processed ZIP import file (full path).
	 */
	public function update_min_max_transients( $import_zip_file ) {
		$area_types = array(
			'primary',
			'living',
			'commercial',
			'retail',
			'office',
			'gastronomy',
			'plot',
			'usable',
			'basement',
			'attic',
			'misc',
			'garden',
			'total',
		);

		foreach ( $area_types as $type ) {
			$area_max = $this->api->get_area_max( $type, true, 0 );
		}

		$primary_price_min_max = $this->api->get_primary_price_min_max( true );
	} // update_min_max_transients

	/**
	 * Extract "tags" and related arguments used in the property detail element
	 * shortcode "template" attribute.
	 *
	 * @since 1.4.0
	 *
	 * @param string $template Template string.
	 *
	 * @return mixed[] Array of structured tag data.
	 */
	private function extract_template_tags( $template ) {
		$tags = array();

		$found = preg_match_all( '/{([a-zA-Z0-9_,:;\-\(\)\<\> ]+)}/', $template, $raw_tags );

		if ( $found ) {
			foreach ( $raw_tags[1] as $raw_tag ) {
				$tag_parts = explode( ',', $raw_tag );
				$tag       = array_shift( $tag_parts );

				$tags[] = array(
					'tag'     => $tag,
					'raw_tag' => "{{$raw_tag}}",
					'args'    => $tag_parts,
				);
			}
		}

		return $tags;
	} // extract_template_tags

	/**
	 * Return the current property object instance, create if not existing yet.
	 *
	 * @since 1.0.0
	 *
	 * @param int|string|bool $post_id Property post ID or false to use current.
	 *
	 * @return \immonex\Kickstart\Property Current property object.
	 */
	private function get_property_instance( $post_id = false ) {
		if (
			! is_object( $this->current_property ) ||
			'Property' !== get_class( $this->current_property ) ||
			( $post_id && $this->current_property->ID !== $post_id )
		) {
			$this->current_property = new Property( $post_id, $this->config, $this->utils );
		}

		return $this->current_property;
	} // get_property_instance

} // Property_Hooks
