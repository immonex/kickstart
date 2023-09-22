<?php
/**
 * Class Property
 *
 * @package immonex\Kickstart
 */

namespace immonex\Kickstart;

/**
 * Property Rendering.
 */
class Property {

	/**
	 * Default property list template file
	 */
	const DEFAULT_TEMPLATE = 'single-property/element-hub';

	/**
	 * Property description excerpt length
	 */
	const
		EXCERPT_LENGTH = 128;

	/**
	 * Property post object
	 *
	 * @var \WP_Post
	 */
	public $post;

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
	 * Array of "grouped" sub-arrays of property detail records
	 *
	 * @var mixed[]
	 */
	private $details;

	/**
	 * Template data cache
	 *
	 * @var mixed[]
	 */
	private $cache;

	/**
	 * Constructor
	 *
	 * @since 1.0.0
	 *
	 * @param \WP_Post|int|string|bool $post_or_id Property post object or ID (false if undefined).
	 * @param mixed[]                  $config Various component configuration data.
	 * @param object[]                 $utils Helper/Utility objects.
	 */
	public function __construct( $post_or_id, $config, $utils ) {
		if ( false !== $post_or_id ) {
			$this->set_post( $post_or_id );
		}

		$this->config = $config;
		$this->utils  = $utils;
	} // __construct

	/**
	 * (Re)Set the current property post ID or object.
	 *
	 * @since 1.6.18-beta
	 *
	 * @param \WP_Post|int|string|bool $post_or_id Property post object or ID (false if undefined).
	 */
	public function set_post( $post_or_id ) {
		if ( is_numeric( $post_or_id ) ) {
			$this->post = get_post( $post_or_id );
		} elseif ( is_object( $post_or_id ) ) {
			$this->post = $post_or_id;
		}
	} // set_post

	/**
	 * Render property details (PHP template).
	 *
	 * @since 1.0.0
	 *
	 * @param string  $template Template file name (without suffix).
	 * @param mixed[] $atts Rendering Attributes.
	 *
	 * @return string Rendered contents (HTML).
	 */
	public function render( $template = '', $atts = array() ) {
		if ( ! is_a( $this->post, 'WP_Post' ) ) {
			return '';
		}

		if ( empty( $template ) ) {
			$template = self::DEFAULT_TEMPLATE;
		}

		$atts = apply_filters( 'inx_apply_auto_rendering_atts', $atts );

		if ( ! isset( $atts['template'] ) ) {
			$atts['template'] = $template;
		}

		/**
		 * Generate a property/attribute specific hash value for caching purposes.
		 */
		$hash_array = array_merge(
			array(
				$this->post->ID,
				$template,
			),
			$atts
		);
		$hash       = md5( wp_json_encode( $hash_array ) );

		// Return cached contents if available.
		if ( isset( $this->cache['rendered_template_contents'][ $hash ] ) ) {
			return $this->cache['rendered_template_contents'][ $hash ];
		}

		$template_data = $this->get_property_template_data( $atts );

		$this->cache['rendered_template_contents'][ $hash ] = apply_filters(
			'inx_rendered_property_template_contents',
			$this->utils['template']->render_php_template( $template, $template_data, $this->utils ),
			$template,
			$template_data,
			$atts
		);

		return $this->cache['rendered_template_contents'][ $hash ];
	} // render

	/**
	 * Compile all data and tools relevant for rendering a property template.
	 *
	 * @since 1.6.9
	 *
	 * @param mixed[] $atts Rendering Attributes.
	 *
	 * @return mixed[] Property and related meta data.
	 */
	public function get_property_template_data( $atts = array() ) {
		global $wp;
		global $wp_query;

		if ( ! is_a( $this->post, 'WP_Post' ) ) {
			return '';
		}

		$atts          = apply_filters( 'inx_apply_auto_rendering_atts', $atts );
		$post          = $this->post;
		$prefix        = $this->config['plugin_prefix'];
		$public_prefix = $this->config['public_prefix'];

		/**
		 * Generate a property/attribute specific hash value for caching purposes.
		 */
		$hash_array = array_merge(
			array( $this->post->ID ),
			$atts
		);
		$hash       = md5( wp_json_encode( $hash_array ) );

		// Return cached contents if available.
		if ( isset( $this->cache['template_raw_data'][ $hash ] ) ) {
			return $this->cache['template_raw_data'][ $hash ];
		}

		// Get property core data (individual custom fields).
		$core_data = $this->get_core_data( 'get_property_template_data', $atts );

		// Extract some OpenImmo related property base data.
		$oi_data = $this->get_openimmo_data();

		// Fetch details (group sections).
		$property_details = $this->get_details();

		/**
		 * Type of use
		 */
		$type_of_use       = '';
		$type_of_use_terms = get_the_terms( $post->ID, $prefix . 'type_of_use' );
		if ( $type_of_use_terms && count( $type_of_use_terms ) > 0 ) {
			$type_of_use = $type_of_use_terms[0]->name;
		}

		/**
		 * Property type
		 */
		$property_type       = '';
		$property_type_terms = get_the_terms( $post->ID, $prefix . 'property_type' );
		if ( $property_type_terms && count( $property_type_terms ) > 0 ) {
			foreach ( $property_type_terms as $i => $term ) {
				if ( $i > 0 ) {
					$property_type .= ' &gt; ';
				}
				$property_type .= $term->name;
			}
		}

		/**
		 * Location(s)
		 */
		$location  = '';
		$locations = get_the_terms( $post->ID, $prefix . 'location' );
		if ( $locations && count( $locations ) > 0 ) {
			$location_names = array();
			foreach ( $locations as $location_term ) {
				$term_name = $location_term->name;
				if ( $location_term->parent ) {
					$parent_term = get_term_by( 'id', $location_term->parent, $prefix . 'location' );
					if ( $parent_term ) {
						$term_name = $parent_term->name . '-' . $term_name;
					}
				}

				$location_names[] = $term_name;
			}

			$location = array_shift( $location_names );
			if ( count( $location_names ) > 0 ) {
				$location .= ' (' . implode( ', ', $location_names ) . ')';
			}
		}

		/**
		 * Features
		 */
		$features = get_the_terms( $post->ID, $prefix . 'feature' );

		/**
		 * Labels (Marketing Type + Labels)
		 */
		$labels           = array();
		$label_taxonomies = array(
			$prefix . 'marketing_type',
			$prefix . 'label',
		);

		$sold_label_exists = false;

		foreach ( $label_taxonomies as $tax ) {
			$label_terms = get_the_terms( $post->ID, $tax );
			if ( $label_terms && is_array( $label_terms ) && count( $label_terms ) > 0 ) {
				foreach ( $label_terms as $term ) {
					$css_classes = array( "{$public_prefix}property-label" );

					$is_for_sale_or_rent = false;
					$term_meta           = get_term_meta( $term->term_id, '_' . $prefix . 'term_meta', true );

					if (
						is_array( $term_meta ) &&
						isset( $term_meta['mapping']['source'] ) &&
						false !== strpos( $term_meta['mapping']['source'], ':' )
					) {
						$mapping_source_split = explode( ':', str_replace( '->', ':', $term_meta['mapping']['source'] ) );
						$mapping_source_count = count( $mapping_source_split );

						if ( 2 === $mapping_source_count ) {
							$bem_modifier = '--' . str_replace( '_', '-', $this->utils['string']->slugify( $mapping_source_split[1] ) );
						} elseif ( $mapping_source_count >= 3 ) {
							$bem_modifier = '--' . str_replace(
								'_',
								'-',
								$this->utils['string']->slugify( $mapping_source_split[ $mapping_source_count - 2 ] ) . '--' .
								$this->utils['string']->slugify( $mapping_source_split[ $mapping_source_count - 1 ] )
							);
						} else {
							$bem_modifier = '';
						}

						if (
							in_array(
								$term_meta['mapping']['source'],
								array(
									'zustand_angaben->verkaufstatus:stand:VERKAUFT',
									'zustand_angaben->verkaufstatus:stand:RESERVIERT',
								),
								true
							)
						) {
							$sold_label_exists = true;
						}

						if (
							$prefix . 'marketing_type' === $tax &&
							in_array(
								$term_meta['mapping']['source'],
								array(
									'objektkategorie->vermarktungsart:KAUF',
									'objektkategorie->vermarktungsart:MIETE',
									'objektkategorie->vermarktungsart:MIETE_PACHT',
								),
								true
							)
						) {
							$is_for_sale_or_rent = true;
						}
					} else {
						$bem_modifier = '--' . $term->slug;
					}

					$css_classes[] = "{$public_prefix}property-label{$bem_modifier}";

					$labels[] = array(
						'name'                => $term->name,
						'css_classes'         => $css_classes,
						'is_for_sale_or_rent' => $is_for_sale_or_rent,
						'show'                => true,
					);
				}

				if ( count( $labels ) > 0 ) {
					if ( $sold_label_exists ) {
						// Hide "for sale" and "for rent" labels if also a "sold/rented"
						// or "reserved" label exists.
						foreach ( $labels as $i => $label ) {
							if ( $label['is_for_sale_or_rent'] ) {
								$labels[ $i ]['show'] = false;
							}
						}
					}

					$label_names = array();
					foreach ( $labels as $i => $label ) {
						if ( false === $label['show'] ) {
							continue;
						}

						if ( in_array( $label['name'], $label_names, true ) ) {
							// Hide duplicate labels.
							$labels[ $i ]['show'] = false;
						} else {
							$label_names[] = $label['name'];
						}
					}
				}
			}
		}

		// Fetch external video data.
		$video_data = $this->get_video_data( $atts );

		// Fetch virtual tour embed code.
		$virtual_tour_embed_code = get_post_meta( $post->ID, "_{$prefix}virtual_tour_embed_code", true );

		// Fetch file attachments.
		$file_attachments = $this->get_file_attachments();

		// Fetch links.
		$links = get_post_meta( $post->ID, "_{$prefix}links", true );

		$permalink_url = get_permalink( $post->ID );

		/**
		 * Generate overview/backlink URL.
		 */
		$backlink_url = $this->get_backlink_url( $permalink_url );
		$url          = $this->extend_url( $permalink_url, false, $atts );

		$get_query_backlink_url = $this->utils['data']->get_query_var_value( "{$public_prefix}backlink-url" );
		if ( $get_query_backlink_url ) {
			$overview_url = stripslashes( urldecode( $get_query_backlink_url ) );
		} else {
			$overview_url = $backlink_url;
		}

		$thumbnail_tag = get_the_post_thumbnail( $this->post->ID, 'large', array( 'sizes' => '(max-width: 680px) 100vw, (max-width: 970px) 50vw, 800px' ) );
		$flags         = $this->get_flags();

		$disable_link       = false;
		$disable_links_attr = ! empty( $atts['disable_links'] ) ?
			strtolower( trim( $atts['disable_links'] ) ) : '';

		if (
			'all' === $disable_links_attr
			|| ! empty( $flags[ $disable_links_attr ] )
			|| (
				'unavailable' === $disable_links_attr &&
				empty( $flags['is_available'] )
			)
			|| (
				'references' === $disable_links_attr &&
				! empty( $flags['is_reference'] )
			)
		) {
			$disable_link = true;
		}

		$excerpt_content = trim( $post->post_excerpt ) ? $post->post_excerpt : $post->post_content;

		$template_data = array_merge(
			$this->config,
			$core_data,
			$oi_data,
			array(
				'details' => $property_details,
			),
			array(
				'instance'                => $this,
				'post_id'                 => $post->ID,
				'type_of_use'             => $type_of_use,
				'property_type'           => $property_type,
				'title'                   => $post->post_title,
				'main_description'        => $post->post_content,
				'excerpt'                 => $this->utils['string']->get_excerpt( $excerpt_content, self::EXCERPT_LENGTH, '…' ),
				'full_address'            => $this->utils['data']->get_custom_field_by( 'key', '_' . $prefix . 'full_address', $post->ID, true ),
				'permalink_url'           => $permalink_url,
				'url'                     => $url,
				'overview_url'            => $overview_url,
				'thumbnail_tag'           => $thumbnail_tag,
				'locations'               => $locations ? $locations : array(),
				'location'                => $location,
				'features'                => $features ? $features : array(),
				'labels'                  => $labels,
				'video'                   => $video_data,
				'virtual_tour_embed_code' => $virtual_tour_embed_code,
				'file_attachments'        => $file_attachments,
				'links'                   => $links ? $links : array(),
				'detail_page_elements'    => $this->get_detail_page_elements( ! empty( $atts['element_atts'] ) ? $atts['element_atts'] : array() ),
				'flags'                   => $flags,
				'disable_link'            => $disable_link,
				'tabbed_content_elements' => $this->get_tabbed_content_elements(),
			),
			$atts
		);

		if ( $flags['is_reference'] ) {
			if ( ! $this->config['show_reference_prices'] ) {
				if ( isset( $template_data['tabbed_content_elements']['tabs']['prices'] ) ) {
					unset( $template_data['tabbed_content_elements']['tabs']['prices'] );
				}

				if ( isset( $template_data['detail_page_elements']['prices'] ) ) {
					unset( $template_data['detail_page_elements']['prices'] );
				}
			}

			if (
				! $this->config['enable_contact_section_for_references']
				&& isset( $template_data['detail_page_elements']['contact_person'] )
			) {
				unset( $template_data['detail_page_elements']['contact_person'] );
			}
		}

		$this->cache['template_raw_data'][ $hash ] = $template_data;

		return $template_data;
	} // get_property_template_data

	/**
	 * Return a list of all detail page element keys.
	 *
	 * @since 1.3.4-beta
	 *
	 * @return string[] Detail page element key list.
	 */
	public function get_detail_page_element_keys() {
		return array_keys( $this->get_detail_page_elements() );
	} // get_detail_page_element_keys

	/**
	 * Return the content structure for the tab-based property detail output.
	 *
	 * @since 1.3.7-beta
	 *
	 * @return mixed[] Element structure including meta data (tab titles etc.).
	 */
	public function get_tabbed_content_elements() {
		$before_tabs = array( 'head', 'gallery' );
		$after_tabs  = array( 'floor_plans', 'contact_person', 'footer' );

		$tabs = array(
			'main_description' => array(
				'title'    => __( 'The Property', 'immonex-kickstart' ),
				'elements' => array( 'main_description' ),
			),
			'details'          => array(
				'title'    => __( 'Details', 'immonex-kickstart' ),
				'elements' => array( 'areas', 'condition', 'misc' ),
			),
			'features'         => array(
				'title'    => __( 'Features', 'immonex-kickstart' ),
				'elements' => array( 'features' ),
			),
			'epass'            => array(
				'title'    => __( 'Energy Pass', 'immonex-kickstart' ),
				'elements' => array( 'epass', 'epass_energy_scale', 'epass_images' ),
			),
			'location'         => array(
				'title'    => __( 'Location & Infrastructure', 'immonex-kickstart' ),
				'elements' => array( 'location_map', 'location_description' ),
			),
			'prices'           => array(
				'title'    => __( 'Prices', 'immonex-kickstart' ),
				'elements' => array( 'prices' ),
			),
			'downloads_links'  => array(
				'title'    => __( 'Downloads & Links', 'immonex-kickstart' ),
				'elements' => array( 'downloads_links' ),
			),
		);

		return apply_filters(
			'inx_tabbed_content_elements',
			array(
				'before_tabs' => $before_tabs,
				'tabs'        => $tabs,
				'after_tabs'  => $after_tabs,
			)
		);
	} // get_tabbed_content_elements

	/**
	 * Return property image data in the given format.
	 *
	 * @since 1.0.0
	 *
	 * @param string $type Image/Gallery type (gallery or floor_plans).
	 * @param string $return Return type (objects, ids or urls).
	 *
	 * @return mixed[] List of property objects, post IDs of URLs.
	 */
	public function get_images( $type = 'gallery', $return = 'objects' ) {
		$return = strtolower( $return );

		$field_prefix      = '_' . $this->config['plugin_prefix'];
		$custom_field_name = 'floor_plans' === $type ? "{$field_prefix}floor_plans" : "{$field_prefix}gallery_images";

		$image_list = get_post_meta( $this->post->ID, $custom_field_name, true );

		if (
			! is_array( $image_list ) ||
			0 === count( $image_list )
		) {
			return array();
		}

		if ( is_numeric( $image_list[ key( $image_list ) ] ) ) {
			// Image list array contains attachment IDs only.
			$attachment_ids = array_values( $image_list );
		} else {
			// Image list array contains key-value pairs (attachment ID : URL).
			if ( 'ids' === $return ) {
				return array_keys( $image_list );
			} elseif ( 'urls' === $return ) {
				return array_values( $image_list );
			}

			$attachment_ids = array_keys( $image_list );
		}

		if ( 'ids' === $return ) {
			return $attachment_ids;
		}

		$images = array();
		if ( ! empty( $attachment_ids ) > 0 ) {
			foreach ( $attachment_ids as $id ) {
				if ( 'urls' === $return ) {
					$images[] = wp_get_attachment_url( $id );
				} else {
					$image = get_post( $id );
					if ( $image ) {
						$images[] = $image;
					}
				}
			}
		}

		return $images;
	} // get_images

	/**
	 * Return a property detail item.
	 *
	 * @since 1.0.0
	 *
	 * @param string $name Item name (as in the import mapping table).
	 * @param string $group Item group (as in the import mapping table).
	 * @param bool   $value_only Return value only instead of full data?
	 *                           (true by default).
	 *
	 * @return mixed[]|string|int Item data as array or single value.
	 */
	public function get_detail_item( $name, $group = false, $value_only = true ) {
		return $this->utils['data']->get_details_item( $this->get_details(), $name, $group, $value_only );
	} // get_detail_item

	/**
	 * Retrieve and return the property core data (custom fields).
	 *
	 * @since 1.0.0
	 *
	 * @param string  $context      Context in which the data are requested (optional).
	 * @param mixed[] $context_atts Contextual attributes (optional).
	 *
	 * @return mixed[] Property core data.
	 */
	public function get_core_data( $context = '', $context_atts = array() ) {
		if ( ! is_a( $this->post, 'WP_Post' ) ) {
			return array();
		}

		if ( $this->post->ID && isset( $this->cache['core_data'][ $this->post->ID ] ) ) {
			return $this->cache['core_data'][ $this->post->ID ];
		}

		$prefix       = $this->config['plugin_prefix'];
		$is_reference = get_post_meta( $this->post->ID, '_immonex_is_reference', true );

		$custom_fields = apply_filters(
			'inx_property_core_data_custom_fields',
			array(
				'property_id',
				'build_year',
				'primary_area',
				'plot_area',
				'commercial_area',
				'retail_area',
				'office_area',
				'gastronomy_area',
				'storage_area',
				'usable_area',
				'living_area',
				'basement_area',
				'attic_area',
				'misc_area',
				'garden_area',
				'total_area',
				'primary_rooms',
				'bedrooms',
				'living_bedrooms',
				'bathrooms',
				'total_rooms',
				'primary_price',
				'price_time_unit',
				'primary_units',
				'living_units',
				'commercial_units',
				'zipcode',
				'city',
				'state',
			)
		);
		$core_data     = array();

		foreach ( $custom_fields as $field_name ) {
			$field_meta_key  = "_{$prefix}{$field_name}";
			$field_meta_data = get_post_meta( $this->post->ID, '_' . $field_meta_key, true );

			$value = get_post_meta( $this->post->ID, $field_meta_key, true );

			switch ( $field_name ) {
				case 'primary_area':
				case 'plot_area':
					if ( ! $value ) {
						$value = 0;
					}
					$value_formatted = $value ? number_format( $value, 0, ',', '.' ) . '&nbsp;' . $this->config['area_unit'] : '';
					break;
				case 'primary_rooms':
					if ( ! $value ) {
						$value = 0;
					}
					$value_formatted = $this->utils['string']->get_nice_number( $value );
					break;
				case 'price_time_unit':
					if ( strlen( trim( $value ) ) > 0 && '/' === trim( $value )[0] ) {
						$value = '/ ' . trim( substr( $value, 1 ) );
					}
					$value_formatted = $value;
					break;
				case 'primary_price':
					if ( empty( $value ) ) {
						$value = 0;
					}
					if ( $is_reference && ! $this->config['show_reference_prices'] ) {
						$value_formatted = $this->config['reference_price_text'];
					} else {
						$value_formatted = $this->utils['format']->format_price( $value, 9, '', __( 'Price on demand', 'immonex-kickstart' ) );
					}
					break;
				default:
					$value_formatted = $value;
			}

			$core_data[ $field_name ] = array(
				'value'           => $value,
				'value_formatted' => $value_formatted,
				'meta'            => $field_meta_data,
				'title'           => $field_meta_data && isset( $field_meta_data['mapping_parent'] ) ? $field_meta_data['mapping_parent'] : '',
			);
		}

		$meta      = array_merge(
			$context_atts,
			array(
				'property_id' => $this->post->ID,
				'context'     => $context,
			)
		);
		$core_data = apply_filters( 'inx_property_core_data', $core_data, $meta );

		$this->cache['core_data'][ $this->post->ID ] = $core_data;

		return $core_data;
	} // get_core_data

	/**
	 * Retrieve and return the property OpenImmo data (XML source, SimpleXML object
	 * + extracted type(s) of use, marketing type(s) and corresponding CSS classes).
	 *
	 * @since 1.0.0
	 *
	 * @return mixed[] Property OpenImmo data.
	 */
	public function get_openimmo_data() {
		if ( ! is_a( $this->post, 'WP_Post' ) ) {
			return array();
		}

		if ( $this->post->ID && isset( $this->cache['openimmo_data'][ $this->post->ID ] ) ) {
			return $this->cache['openimmo_data'][ $this->post->ID ];
		}

		$prefix         = $this->config['public_prefix'];
		$no_data_return = array(
			'oi_xml_source'      => '',
			'oi_immobilie'       => false,
			'oi_nutzungsart'     => array(),
			'oi_vermarktungsart' => array(),
			'oi_css_classes'     => array(),
		);

		$xml_source = get_post_meta( $this->post->ID, '_immonex_property_xml_source', true );
		if ( ! $xml_source ) {
			// DEPRECATED!
			$xml_source = get_post_meta( $this->post->ID, '_' . $this->config['plugin_prefix'] . 'property_xml_source', true );
		}
		if ( ! $xml_source ) {
			return $no_data_return;
		}

		try {
			$immobilie = new \SimpleXMLElement( $xml_source );
		} catch ( \Exception $e ) {
			return $no_data_return;
		}

		// Initiate OpenImmo CSS classes.
		$oi_css_classes = array();

		/**
		 * Nutzungsart
		 */
		if ( isset( $immobilie->objektkategorie->nutzungsart ) ) {
			$oi_nutzungsart_attributes = array(
				'WOHNEN',
				'GEWERBE',
				'ANLAGE',
				'WAZ',
			);

			$oi_nutzungsart = array();
			foreach ( $oi_nutzungsart_attributes as $attr ) {
				if ( in_array( (string) $immobilie->objektkategorie->nutzungsart[ $attr ], array( 'true', '1' ), true ) ) {
					$oi_nutzungsart[] = strtolower( $attr );
					$oi_css_classes[] = $prefix . 'oi--nutzungsart--' . strtolower( $attr );
				}
			}
		} else {
			$oi_nutzungsart = array();
		}

		/**
		 * Vermarktungsart
		 */
		if ( isset( $immobilie->objektkategorie->vermarktungsart ) ) {
			$oi_vermarktungsart_attributes = array(
				'KAUF',
				'MIETE',
				'MIETE_PACHT',
				'ERBPACHT',
				'LEASING',
			);

			$oi_vermarktungsart = array();
			foreach ( $oi_vermarktungsart_attributes as $attr ) {
				if ( in_array( (string) $immobilie->objektkategorie->vermarktungsart[ $attr ], array( 'true', '1' ), true ) ) {
					$oi_vermarktungsart[] = strtolower( $attr );
					$css_class            = $prefix . 'oi--vermarktungsart--' . str_replace( '_', '-', $this->utils['string']->slugify( $attr ) );
					$oi_css_classes[]     = $css_class;
				}
			}
		} else {
			$oi_vermarktungsart = array();
		}

		$this->cache['openimmo_data'][ $this->post->ID ] = array(
			'oi_xml_source'      => $xml_source,
			'oi_immobilie'       => $immobilie,
			'oi_nutzungsart'     => $oi_nutzungsart,
			'oi_vermarktungsart' => $oi_vermarktungsart,
			'oi_css_classes'     => $oi_css_classes,
		);

		return $this->cache['openimmo_data'][ $this->post->ID ];
	} // get_openimmo_data

	/**
	 * Retrieve and return "grouped" property details (serialized custom field data).
	 *
	 * @since 1.0.0
	 *
	 * @return mixed[] Property details.
	 */
	private function get_details() {
		if ( ! is_a( $this->post, 'WP_Post' ) ) {
			return array();
		}

		if ( ! empty( $this->details ) ) {
			return $this->details;
		}

		$exclude = array();
		if ( ! $this->config['show_seller_commission'] ) {
			$exclude[] = 'preise->innen_courtage*';
		}

		$grouped_details = $this->utils['data']->fetch_property_details( $this->post->ID, $exclude );
		$this->details   = $grouped_details;

		return apply_filters( 'inx_property_template_data_details', $grouped_details, $this->post->ID );
	} // get_details

	/**
	 * Create and return an array of available property detail view elements
	 * including the specific configuration attributes.
	 *
	 * @since 1.0.0
	 *
	 * @param mixed[] $element_atts Attributes to override default values.
	 *
	 * @return mixed[] Property detail elements.
	 */
	private function get_detail_page_elements( $element_atts = array() ) {
		$elements = array(
			'head'                 => array(
				'template' => 'head',
			),
			'gallery'              => array(
				'template'                => 'gallery',
				'animation_type'          => 'push',
				'enable_caption_display'  => true,
				'enable_video'            => true,
				'enable_virtual_tour'     => true,
				'enable_ken_burns_effect' => $this->config['enable_ken_burns_effect'],
			),
			'main_description'     => array(
				'template' => 'description-text',
			),
			'prices'               => array(
				'template' => 'details',
				'groups'   => 'preise',
				'headline' => __( 'Prices', 'immonex-kickstart' ),
			),
			'areas'                => array(
				'template' => 'details',
				'groups'   => 'flaechen',
				'headline' => __( 'Areas', 'immonex-kickstart' ),
			),
			'condition'            => array(
				'template' => 'details',
				'groups'   => 'zustand',
				'headline' => __( 'Condition & Development', 'immonex-kickstart' ),
			),
			'epass'                => array(
				'template' => 'details',
				'groups'   => 'epass',
				'headline' => '',
			),
			'epass_images'         => array(
				'template'                     => 'gallery',
				'image_selection_custom_field' => '_inx_epass_images',
				'headline'                     => '',
				'animation_type'               => 'scale',
				'enable_caption_display'       => false,
				'enable_ken_burns_effect'      => false,
			),
			'epass_energy_scale'   => array(
				'template'   => 'shortcodes',
				'shortcodes' => array( '[immonex-energy-scale]' ),
			),
			'location'             => array(
				'template' => 'location-info',
				'optional' => true,
			),
			'location_description' => array(
				'template'            => 'location-description',
				'no_headline_in_tabs' => true,
			),
			'location_map'         => array(
				'template'            => 'location-map',
				'no_headline_in_tabs' => true,
			),
			'features'             => array(
				'template' => 'features',
				'groups'   => 'ausstattung',
				'headline' => __( 'Features', 'immonex-kickstart' ),
			),
			'floor_plans'          => array(
				'template'                     => 'gallery',
				'image_selection_custom_field' => '_inx_floor_plans',
				'headline'                     => __( 'Floor Plans', 'immonex-kickstart' ),
				'animation_type'               => 'scale',
				'enable_caption_display'       => true,
				'enable_ken_burns_effect'      => false,
			),
			'misc'                 => array(
				'template'               => 'details',
				'description_text_field' => 'freitexte.sonstige_angaben',
				'groups'                 => 'sonstiges',
				'headline'               => __( 'Miscellaneous', 'immonex-kickstart' ),
			),
			'downloads_links'      => array(
				'template' => 'downloads-and-links',
				'headline' => __( 'Downloads & Links', 'immonex-kickstart' ),
			),
			'video'                => array(
				'template' => 'video',
				'optional' => true,
			),
			'virtual_tour'         => array(
				'template' => 'virtual-tour',
				'optional' => true,
			),
			'contact_person'       => array(
				'template' => 'contact-person',
				'groups'   => 'kontakt',
				'headline' => __( 'Your contact person with us', 'immonex-kickstart' ),
			),
			'footer'               => array(
				'template' => 'footer',
			),
		);

		if ( count( $element_atts ) > 0 ) {
			/**
			 * Override default element attributes with alternative values
			 * stated via shortcode attribute or the like.
			 */
			foreach ( $element_atts as $element_key => $atts ) {
				if ( isset( $elements[ $element_key ] ) ) {
					$elements[ $element_key ] = array_merge( $elements[ $element_key ], $atts );
				}
			}
		}

		return apply_filters( 'inx_detail_page_elements', $elements );
	} // get_detail_page_elements

	/**
	 * Retrieve, split and return data of an external, property related video,
	 * if existent (custom field).
	 *
	 * @since 1.0.0
	 *
	 * @param mixed[] $atts Template rendering attributes (optional).
	 *
	 * @return mixed[] Property video data.
	 */
	private function get_video_data( $atts = array() ) {
		if ( $this->post->ID && isset( $this->cache['video_data'][ $this->post->ID ] ) ) {
			return $this->cache['video_data'][ $this->post->ID ];
		}

		$video_url = get_post_meta( $this->post->ID, '_' . $this->config['plugin_prefix'] . 'video_url', true );
		if ( ! $video_url ) {
			return false;
		}

		$video_parts = $this->utils['string']->is_video_url( $video_url );
		if ( ! $video_parts ) {
			return false;
		}

		$autoplay   = isset( $atts['autoplay'] ) && in_array( (string) $atts['autoplay'], array( '1', 'true' ), true );
		$video_atts = array(
			'autoplay'       => $autoplay,
			'automute'       => ! isset( $atts['automute'] ) || in_array( (string) $atts['automute'], array( '1', 'true' ), true ),
			'youtube_domain' => ! isset( $atts['youtube-nocookie'] ) || in_array( (string) $atts['youtube-nocookie'], array( '1', 'true' ), true )
				? 'www.youtube-nocookie.com' : 'www.youtube.com',
			'youtube_allow'  => ! empty( $atts['youtube-allow'] ) ?
				$atts['youtube-allow'] :
				'accelerometer; encrypted-media; gyroscope' . ( $autoplay ? '; autoplay' : '' ),
		);

		$this->cache['video_data'][ $this->post->ID ] = array_merge(
			$video_parts,
			array( 'url' => $video_url ),
			$video_atts
		);

		return $this->cache['video_data'][ $this->post->ID ];
	} // get_video_data

	/**
	 * Retrieve and return property attachment data (prepared for JS).
	 *
	 * @since 1.0.0
	 *
	 * @return mixed[] Array of attachment data, if any.
	 */
	private function get_file_attachments() {
		if ( $this->post->ID && isset( $this->cache['file_attachments'][ $this->post->ID ] ) ) {
			return $this->cache['file_attachments'][ $this->post->ID ];
		}

		$attachment_ids = get_post_meta( $this->post->ID, '_' . $this->config['plugin_prefix'] . 'file_attachments', true );
		if ( ! $attachment_ids ) {
			return array();
		}

		if ( ! is_numeric( $attachment_ids[ key( $attachment_ids ) ] ) ) {
			// Convert an extended attachment ID list including URLs to a simple ID array.
			$attachment_ids = array_keys( $attachment_ids );
		}

		$attachments = array();

		foreach ( $attachment_ids as $id ) {
			$attachments[] = wp_prepare_attachment_for_js( $id );
		}

		$this->cache['file_attachments'][ $this->post->ID ] = $attachments;

		return $attachments;
	} // get_file_attachments

	/**
	 * Retrieve and return special property flags (custom fields).
	 *
	 * @since 1.0.0
	 *
	 * @return bool[] Property flag list.
	 */
	private function get_flags() {
		if ( $this->post->ID && isset( $this->cache['flags'][ $this->post->ID ] ) ) {
			return $this->cache['flags'][ $this->post->ID ];
		}

		$prefix = '_' . $this->config['plugin_prefix'];

		$flag_mapping = array(
			'is_sale'      => "{$prefix}is_sale",
			'is_reference' => '_immonex_is_reference',
			'is_sold'      => '_immonex_is_sold',
			'is_reserved'  => '_immonex_is_reserved',
			'is_available' => '_immonex_is_available',
			'is_demo'      => '_immonex_is_demo',
		);

		$flags = array();
		foreach ( $flag_mapping as $key => $cpt_name ) {
			$flags[ $key ] = in_array(
				strtolower( (string) get_post_meta( $this->post->ID, $cpt_name, true ) ),
				array( '1', 'on', 'yes' ),
				true
			);
		}

		$this->cache['flags'][ $this->post->ID ] = $flags;

		return $flags;
	} // get_flags

	/**
	 * Add the backlink URL and special params (if set) to the property URL.
	 *
	 * @since 1.6.18-beta
	 *
	 * @param string      $permalink_url The current permalink URL.
	 * @param bool|string $backlink_url Backlink URL (optional).
	 * @param mixed[]     $atts Rendering attributes (optional).
	 *
	 * @return string Backlink URL.
	 */
	public function extend_url( $permalink_url, $backlink_url = false, $atts = array() ) {
		$public_prefix = $this->config['public_prefix'];
		$url           = $permalink_url;

		if ( ! $backlink_url ) {
			$base_url     = ! empty( $atts['base_url'] ) ? str_replace( '%_%', '', $atts['base_url'] ) : false;
			$backlink_url = $this->get_backlink_url( $permalink_url, $base_url );
		}

		if ( ! empty( $atts[ "{$public_prefix}ref" ] ) ) {
			$url .= ( false === strpos( $url, '?' ) ? '?' : '&' ) . "{$public_prefix}ref=" . rawurlencode( $atts[ "{$public_prefix}ref" ] );
		}
		if ( ! empty( $atts[ "{$public_prefix}force-lang" ] ) ) {
			$url .= ( false === strpos( $url, '?' ) ? '?' : '&' ) . "{$public_prefix}force-lang=" . rawurlencode( $atts[ "{$public_prefix}force-lang" ] );
		}
		if ( ! empty( $backlink_url ) ) {
			$url .= ( false === strpos( $url, '?' ) ? '?' : '&' ) . "{$public_prefix}backlink-url=" . rawurlencode( $backlink_url );
		}

		return $url;
	} // extend_url

	/**
	 * Retrieve and return special property flags (custom fields).
	 *
	 * @since 1.1.0
	 *
	 * @param string      $permalink_url The current permalink URL.
	 * @param bool|string $base_url      Base URL (optional).
	 *
	 * @return string Backlink URL.
	 */
	public function get_backlink_url( $permalink_url, $base_url = false ) {
		if ( $this->post->ID && isset( $this->cache['backlink_url'][ $this->post->ID ] ) ) {
			return $this->cache['backlink_url'][ $this->post->ID ];
		}

		global $wp;

		$public_prefix = $this->config['public_prefix'];
		$backlink_url  = $this->utils['data']->get_query_var_value( "{$public_prefix}backlink-url" );

		if ( $backlink_url ) {
			$this->cache['backlink_url'][ $this->post->ID ] = $backlink_url;
			return $backlink_url;
		}

		if ( $base_url ) {
			$backlink_url = $base_url;
		} else {
			$path           = $wp->request;
			$is_api_request = 'wp-json' === substr( $path, 0, 7 );
			$backlink_url   = home_url( ! $is_api_request ? add_query_arg( array(), $path ) : null );
		}

		if ( false === strpos( $backlink_url, '?' ) ) {
			$backlink_url = trailingslashit( $backlink_url );
		}

		$details_page_id = $this->config['property_details_page_id'] ?
			apply_filters( 'inx_element_translation_id', $this->config['property_details_page_id'] ) :
			false;

		$home_url = get_home_url();
		if ( false === strpos( $home_url, '?' ) ) {
			$home_url = trailingslashit( $home_url );
		}

		if (
			$home_url === $backlink_url ||
			$backlink_url === $permalink_url ||
			( $details_page_id && get_permalink( $details_page_id ) === $backlink_url )
		) {
			// Link to property post type archive page if default URL belongs to
			// the front page or equals the current permalink URL.
			$backlink_url = false;

			if ( $this->config['property_list_page_id'] ) {
				// Specific page stated as overview page: overwrite archive URL.
				$page_id  = apply_filters( 'inx_element_translation_id', $this->config['property_list_page_id'] );
				$page_url = get_permalink( $page_id );
				if ( $page_url ) {
					$backlink_url = $page_url;
				}
			}

			if ( ! $backlink_url ) {
				$backlink_url = get_post_type_archive_link( $this->config['property_post_type_name'] );
			}

			// Exclude limit query variables from backlink in this case.
			$exclude_backlink_vars = array(
				"{$public_prefix}limit",
				"{$public_prefix}limit-page",
				$this->config['property_post_type_name'],
			);
		} else {
			$exclude_backlink_vars = array();
		}

		$auto_applied_rendering_atts = apply_filters( 'inx_auto_applied_rendering_atts', array(), $public_prefix );
		$exclude_backlink_vars       = apply_filters(
			'inx_exclude_backlink_vars',
			array_merge(
				$auto_applied_rendering_atts,
				$exclude_backlink_vars,
				array( "{$public_prefix}property-id" )
			)
		);

		if ( ! empty( $_GET ) ) {
			$query_vars        = array();
			$existing_get_vars = array();

			// @codingStandardsIgnoreStart
			if ( $details_page_id && isset( $_GET['page_id'] ) ) {
				$exclude_backlink_vars[] = 'page_id';
			}

			if ( false !== strpos( $backlink_url, '?' ) ) {
				$matched = preg_match_all( '/[\?|&](([a-zA-Z0-9_-]+)=[^&]+)/', $backlink_url, $matches );
				if ( isset( $matches[2] ) ) {
					$existing_get_vars = $matches[2];
				}
			}

			foreach ( $_GET as $var_name => $value ) {
				if (
					'' !== $value &&
					"{$public_prefix}backlink-url" !== $var_name &&
					! in_array( $var_name, $exclude_backlink_vars, true ) &&
					! in_array( $var_name, $existing_get_vars, true ) &&
					! isset( $query_vars[ $var_name ] ) &&
					'inx-r-' !== substr( $var_name, 0, 6 )
				) {
					$query_vars[ $var_name ] = $value;
				}
			}

			if ( count( $query_vars ) > 0 ) {
				$query_params = http_build_query( $query_vars );
				$backlink_url = $backlink_url . ( false === strpos( $backlink_url, '?' ) ? '?' : '&' ) . $query_params;
			}
		}

		$this->cache['backlink_url'][ $this->post->ID ] = $backlink_url;

		return $backlink_url;
	} // get_backlink_url

} // Property
