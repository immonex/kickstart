<?php
/**
 * Class Property_Hooks
 *
 * @package immonex-kickstart
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
		$this->config = $config;
		$this->utils  = $utils;

		/**
		 * WP actions and filters
		 */

		add_filter( 'single_template', array( $this, 'register_single_property_template' ) );
		add_filter( 'archive_template', array( $this, 'register_property_archive_template' ) );
		add_filter( 'document_title_parts', array( $this, 'update_template_document_title' ) );
		add_filter( 'the_title', array( $this, 'update_template_page_title' ), 10, 2 );
		add_filter( 'get_post_metadata', array( $this, 'update_template_page_featured_image' ), 10, 4 );

		/**
		 * Plugin-specific actions and filters
		 */

		add_action( 'inx_render_property_contents', array( $this, 'render_property_contents' ), 10, 3 );

		add_filter( 'inx_get_property_images', array( $this, 'get_property_images' ), 10, 3 );
		add_filter( 'inx_get_property_detail_item', array( $this, 'get_property_detail_item' ), 10, 3 );
		add_filter( 'inx_current_property_post_id', array( $this, 'get_current_property_post_id' ) );
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
		$property_post_id = apply_filters( 'inx_current_property_post_id', $this->utils['general']->get_the_ID() );

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
		$property_post_id = apply_filters( 'inx_current_property_post_id', $this->utils['general']->get_the_ID() );

		if (
			is_admin()
			|| empty( $this->config['property_details_page_id'] )
			|| $post_id != $this->config['property_details_page_id']
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
			|| $object_id != $this->config['property_details_page_id']
		) {
			return $null;
		}

		remove_filter( 'get_post_metadata', array( $this, __FUNCTION__ ), 10, 4 );
		$property_post_id = apply_filters( 'inx_current_property_post_id', $this->utils['general']->get_the_ID() );
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
	 * Render and return or output the contents of a property related template
	 * (action based).
	 *
	 * @since 1.0.0
	 *
	 * @param int|string|bool $post_id Property post ID (optional).
	 * @param string          $template Template file (without suffix).
	 * @param mixed[]         $atts Rendering Attributes.
	 * @param bool            $output Flag for directly output the rendered contents (true by default).
	 *
	 * @return string Rendered template contents.
	 */
	public function render_property_contents( $post_id = false, $template = 'single-property/element-hub', $atts = array(), $output = true ) {
		$post_id = apply_filters( 'inx_current_property_post_id', $post_id );

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
				// Assign shortcode attributes to the related elements for output
				// rendering (only if required - given default values will be
				// overridden).
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
			$post_id = $this->utils['general']->get_the_ID();
		}

		$valid_image_types  = array( 'gallery', 'floor_plans' );
		$valid_return_types = array( 'objects', 'ids', 'urls' );

		if (
			! empty( $args['type'] ) &&
			in_array( $args['type'], $valid_image_types )
		) {
			$type = $args['type'];
		} else {
			$type = $valid_image_types[0];
		}

		if (
			! empty( $args['return'] ) &&
			in_array( $args['return'], $valid_return_types )
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
			$post_id = get_the_ID();
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
		if ( is_singular() && ! empty( $_GET['inx-property-id'] ) ) {
			$post_id = (int) $_GET['inx-property-id'];
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
		$post_id = apply_filters( 'inx_current_property_post_id', $this->utils['general']->get_the_ID() );
		if ( ! $post_id ) {
			return '';
		}

		if ( empty( $atts ) ) {
			$atts = array();
		}

		// Permit arbritrary attributes for passing template parameters (special case!).
		$shortcode_atts = shortcode_atts( $atts, $atts, 'inx-property-details' );

		return $this->render_property_contents( $post_id, 'single-property/element-hub', $shortcode_atts, false );
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
			'name'     => '',
			'group'    => '',
			'type'     => '',
			'template' => '{value}',
			'if_empty' => '',
		);

		$shortcode_atts = shortcode_atts( $default_atts, $atts, 'inx-property-detail-element' );

		if ( empty( $shortcode_atts['name'] ) ) {
			return $shortcode_atts['if_empty'];
		}

		if ( empty( $shortcode_atts['template'] ) ) {
			$shortcode_atts['template'] = '{value}';
		}

		$name        = trim( sanitize_text_field( $shortcode_atts['name'] ) );
		$value       = false;
		$raw_value   = false;
		$title       = '';
		$property_id = apply_filters( 'inx_current_property_post_id', false );
		$detail_item = false;

		if ( '//' === substr( $name, 0, 2 ) ) {
			/**
			 * Queried element most likely is an XML path -> apply XPath to
			 * property XML source if available.
			 */
			$property_xml_source = get_post_meta( $property_id, '_immonex_property_xml_source', true );

			if ( $property_xml_source ) {
				$property = new \SimpleXMLElement( $property_xml_source );
				$value    = (string) $property->xpath( $name )[0];
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
					$meta_meta = json_decode( $detail_item['meta_json'], true );
					if ( ! empty( $meta_meta['value_before_filter'] ) ) {
						$raw_value = $meta_meta['value_before_filter'];
					}
				}
			}

			if ( ! empty( $detail_item['title'] ) ) {
				$title = $detail_item['title'];
			}
		}

		if ( ! $value ) {
			// Alternative: Fetch the value of a Kickstart-specific custom field.
			$value = get_post_meta( $property_id, "_inx_{$name}", true );
		}

		if ( ! $value ) {
			// Alternative: Fetch the value of a generic custom field.
			$value = get_post_meta( $property_id, $name, true );

			if ( $value && '_inx_' === substr( $value, 0, 5 ) ) {
				// Retrieve the actual value from the field determined before.
				$value = get_post_meta( $property_id, $value, true );
			}
		}

		if ( empty( $shortcode_atts['template'] ) && $shortcode_atts['type'] ) {
			switch ( $shortcode_atts['type'] ) {
				case 'price':
					$shortcode_atts['template'] = '{value,number,2} {currency_symbol}';
					break;
				case 'area':
					$shortcode_atts['template'] = '{value,number,2} {area_unit}';
					break;
			}
		}

		$rendered_content = apply_filters(
			'inx_property_detail_element_output',
			$value,
			array(
				'name'          => $name,
				'initial_value' => $value,
				'raw_value'     => $raw_value,
				'title'         => $title,
				'template'      => $shortcode_atts['template'],
				'if_empty'      => $shortcode_atts['if_empty'],
				'detail_item'   => $detail_item,
			)
		);

		return $rendered_content;
	} // shortcode_property_detail_element

	/**
	 * Render the output of the property detail element shortcode (callback).
	 *
	 * @since 1.4.0
	 *
	 * @param string|int $value Current output value.
	 * @param mixed[]    $meta Metadata about the queried element.
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
