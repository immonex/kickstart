<?php
/**
 * Class Property_Schema
 *
 * @package immonex\Kickstart
 */

namespace immonex\Kickstart;

/**
 * Schema.org related processing of property data.
 */
class Property_Schema extends Base_Schema {

	/**
	 * Property post object
	 *
	 * @var \WP_Post
	 */
	public $post;

	/**
	 * Property data
	 *
	 * @var mixed[]
	 */
	private $property_data = [];

	/**
	 * Accomodation type (Schema.org)
	 *
	 * @var string
	 */
	private $property_schema_types = [];

	/**
	 * Availability data
	 *
	 * @var mixed[]
	 */
	private $availability_data = [];

	/**
	 * Main entity element data
	 *
	 * @var mixed[]
	 */
	private $main_entity_element = [];

	/**
	 * Detail page graph data
	 *
	 * @var mixed[]
	 */
	private $detail_page_graph = [];

	/**
	 * Set the current property post object and reset existing object properties.
	 *
	 * @since 1.12.0-beta
	 *
	 * @param int $post_id Property post ID.
	 */
	public function set_post_id( $post_id ): void {
		$this->post = get_post( $post_id );
		if (
			! is_a( $this->post, '\WP_Post' )
			|| 'publish' !== $this->post->post_status
		) {
			$this->post = null;
		}

		$this->property_data         = [];
		$this->property_schema_types = [];
		$this->availability_data     = [];
		$this->main_entity_element   = [];
		$this->detail_page_graph     = [];
	} // set_post_id


	/**
	 * Return the complete schema graph data for embedding in detail pages.
	 *
	 * @since 1.12.0-beta
	 *
	 * @param bool $as_script_block Optional return format: true for an embed-ready
	 *                              script block, false for the raw data array (default).
	 *
	 * @return mixed[]|string Schema graph.
	 */
	public function get_detail_page_graph( $as_script_block = false ): array|string {
		if ( empty( $this->post ) ) {
			return $as_script_block ? '' : [];
		}

		if ( ! empty( $this->detail_page_graph ) ) {
			return $as_script_block ?
				$this->utils['format']->get_json_ld_script_block( $this->detail_page_graph ) :
				$this->detail_page_graph;
		}

		$this->detail_page_graph = array_filter(
			[
				$this->get_web_page_element(),
				$this->get_main_entity_element(),
				$this->get_event_element(),
			]
		);

		return $as_script_block ?
			$this->utils['format']->get_json_ld_script_block( [ '@graph' => $this->detail_page_graph ], true ) :
			$this->detail_page_graph;
	} // get_detail_page_graph

	/**
	 * Generate and return the "main entity" element of the current property.
	 *
	 * @since 1.12.0-beta
	 *
	 * @param string $scope           Optional scope:
	 *                                  - full (default): complete data set incl. agent/agency
	 *                                  - extended: like "full", but with agent/agency references (ID/URL only)
	 *                                  - reference: ID/URL only.
	 * @param bool   $as_script_block Optional return format: true for an embed-ready
	 *                                script block, false for the raw data array (default).
	 *
	 * @return mixed[]|string Main entity element (or empty array if indeterminable).
	 */
	public function get_main_entity_element( $scope = 'full', $as_script_block = false ): array|string {
		if ( empty( $this->post ) ) {
			return $as_script_block ? '' : [];
		}

		if ( ! empty( $this->main_entity_element[ $scope ] ) ) {
			return $as_script_block ?
				$this->utils['format']->get_json_ld_script_block( $this->main_entity_element[ $scope ] ) :
				$this->main_entity_element[ $scope ];
		}

		$property_data = $this->get_property_data();
		if ( empty( $property_data ) ) {
			return $as_script_block ? '' : [];
		}

		$property_schema_types = $this->get_property_schema_types();
		$is_accomodation       = ! in_array( 'Place', $property_schema_types, true );
		$schema_type           = 'reference' === $scope ?
			[ 'RealEstateListing', $property_schema_types[ count( $property_schema_types ) - 1 ] ] :
			array_merge( [ 'RealEstateListing' ], $property_schema_types, [ 'Product' ] );

		$entity = [
			'@type' => $schema_type,
			'@id'   => $this->get_schema_id( $property_data['permalink_url'], $property_schema_types ),
		];
		if ( ! $property_data['disable_link'] ) {
			$entity['url'] = $property_data['permalink_url'];
		}

		if ( 'reference' === $scope && ! $property_data['disable_link'] ) {
			$this->main_entity_element[ $scope ] = $entity;
			return $as_script_block ?
				$this->utils['format']->get_json_ld_script_block( $entity ) :
				$entity;
		}

		$featured_image    = get_the_post_thumbnail_url( $this->post->ID, 'full' );
		$availability_data = $this->get_availability_data();
		$geo_elements      = $this->get_geo_elements();
		$video_element     = $this->get_video_element( $entity['@id'] );

		$offers_scope   = 'extended' === $scope ? 'reference' : 'full';
		$offers_element = $this->get_offers_element( $offers_scope );

		if ( $is_accomodation ) {
			$bedrooms    = ! empty( $property_data['bedrooms']['value'] ) ? (int) $property_data['bedrooms']['value'] : 0;
			$bathrooms   = ! empty( $property_data['bathrooms']['value'] ) ? (int) $property_data['bathrooms']['value'] : 0;
			$total_rooms = ! empty( $property_data['total_rooms']['value'] ) ? (int) $property_data['total_rooms']['value'] : 0;
			$rooms       = ! empty( $property_data['living_bedrooms']['value'] ) ?
				(int) $property_data['living_bedrooms']['value'] :
				$total_rooms - $bathrooms;
			$year_built  = ! empty( $property_data['build_year']['value'] ) ? $property_data['build_year']['value'] : '';

			if ( ! empty( $property_data['primary_area']['value'] ) ) {
				$floor_size = [
					'@type'    => 'QuantitativeValue',
					'@id'      => $this->get_schema_id( $property_data['permalink_url'], 'floorSize' ),
					'value'    => (int) $property_data['primary_area']['value'],
					'unitCode' => 'MTK', // Square meter (m²).
				];
			}

			if (
				! $property_data['flags']['is_sale']
				&& ! empty( $availability_data['to_date'] )
			) {
				$lease_length = $availability_data['to_date'];
			}
		}

		$entity = array_merge(
			$entity,
			[
				'datePosted'             => get_the_date( 'Y-m-d', $this->post ),
				'leaseLength'            => ! empty( $lease_length ) ? $lease_length : null,
				'name'                   => $this->post->post_title,
				'description'            => wp_strip_all_tags( $this->post->post_content ),
				'image'                  => $featured_image ? $featured_image : null,
				'numberOfRooms'          => ! empty( $rooms ) && $rooms !== $bedrooms ? $rooms : null,
				'numberOfBedrooms'       => ! empty( $bedrooms ) ? $bedrooms : null,
				'numberOfBathroomsTotal' => ! empty( $bathrooms ) ? $bathrooms : null,
				'floorSize'              => ! empty( $floor_size ) ? $floor_size : null,
				'yearBuilt'              => ! empty( $year_built ) ? $year_built : null,
			],
			$geo_elements,
			$video_element,
			$offers_element
		);

		$this->main_entity_element[ $scope ] = array_filter( $entity );

		return $as_script_block ?
			$this->utils['format']->get_json_ld_script_block( $this->main_entity_element[ $scope ] ) :
			$this->main_entity_element[ $scope ];
	} // get_main_entity_element

	/**
	 * Generate and return a WebPage element for the current property.
	 *
	 * @since 1.12.0-beta2
	 *
	 * @return mixed[] WebPage element (or empty array if indeterminable).
	 */
	private function get_web_page_element(): array {
		$property_schema_types = $this->get_property_schema_types();
		if ( empty( $property_schema_types ) ) {
			return [];
		}

		$property_data = $this->get_property_data();

		return [
			'@type'      => 'WebPage',
			'@id'        => $this->get_schema_id( $property_data['permalink_url'], 'WebPage' ),
			'url'        => $property_data['permalink_url'],
			'mainEntity' => [
				'@id' => $this->get_schema_id( $property_data['permalink_url'], $property_schema_types ),
			],
		];
	} // get_web_page_element

	/**
	 * If applicable, determine and return the accomodation type according to
	 * Schema.org as array (type + subtype) or the generic type "Place" if not.
	 *
	 * @since 1.12.0-beta
	 *
	 * @return string Suitable Schema.org type(s).
	 */
	private function get_property_schema_types(): array {
		if ( $this->property_schema_types ) {
			return $this->property_schema_types;
		}

		$property_data = $this->get_property_data();
		$immobilie     = $property_data['oi_immobilie'];
		if ( ! is_a( $immobilie, '\SimpleXMLElement' ) ) {
			$this->property_schema_types = [ 'Place' ];
			return $this->property_schema_types;
		}

		$type        = $immobilie->objektkategorie->objektart->children()[0]->getName();
		$subtype_att = $immobilie->objektkategorie->objektart->{$type}->attributes()[0];
		$subtype     = ! empty( $subtype_att ) ? (string) $subtype_att[0] : '';

		if ( ! in_array( $type, [ 'zimmer', 'wohnung', 'haus', 'zinshaus_renditeobjekt' ], true ) ) {
			$this->property_schema_types = [ 'Place' ];
			return $this->property_schema_types;
		}

		$non_single_family_house_subtypes = [
			'KEINE_ANGABE',
			'SCHLOSS',
			'ZWEIFAMILIENHAUS',
			'MEHRFAMILIENHAUS',
			'LAUBE-DATSCHE-GARTENHAUS',
			'BURG',
		];

		$income_property_subtypes = [
			'MEHRFAMILIENHAUS'        => [ 'House' ],
			'WOHN_UND_GESCHAEFTSHAUS' => [ 'House' ],
			'WOHNANLAGEN'             => [ 'House', 'ApartmentComplex' ],
			'SENIORENHEIM'            => [ 'House', 'ApartmentComplex' ],
			'BETREUTES-WOHNEN'        => [ 'Apartment' ],
		];

		switch ( $type ) {
			case 'wohnung':
				$this->property_schema_types = [ 'Apartment' ];
				break;
			case 'zimmer':
				$this->property_schema_types = [ 'Room' ];
				break;
			case 'zinshaus_renditeobjekt':
				if ( isset( $income_property_subtypes[ $subtype ] ) ) {
					$this->property_schema_types = $income_property_subtypes[ $subtype ];
				}
				break;
			default:
				if ( 'APARTMENTHAUS' === $subtype ) {
					$this->property_schema_types = [ 'House', 'ApartmentComplex' ];
				} else {
					$this->property_schema_types = in_array( $subtype, $non_single_family_house_subtypes, true ) ?
						[ 'House' ] : [ 'SingleFamilyResidence' ];
				}
		}

		return $this->property_schema_types;
	} // get_property_schema_types

	/**
	 * Create and return "address" and "geo" elements based on the current property data.
	 *
	 * @since 1.12.0-beta
	 *
	 * @return mixed[] Property geo elements.
	 */
	private function get_geo_elements(): array {
		$property_data = $this->get_property_data();
		$immobilie     = $property_data['oi_immobilie'];

		if ( ! is_a( $immobilie, '\SimpleXMLElement' ) ) {
			return [];
		}

		$schema_data                 = [];
		$address_publishing_approved = ! in_array( (string) $immobilie->verwaltung_objekt->objektadresse_freigeben, [ 'false', '0' ], true );

		$street   = $address_publishing_approved ?
			trim( (string) $immobilie->geo->strasse . ' ' . (string) $immobilie->geo->hausnummer ) : '';
		$postcode = (string) $immobilie->geo->plz;
		$locality = (string) $immobilie->geo->ort;
		$region   = (string) $immobilie->geo->bundesland;
		$country  = (string) $immobilie->geo->land['iso_land'];

		if ( $street || $postcode || $locality || $region || $country ) {
			$schema_data['address'] = array_filter(
				[
					'@type'           => 'PostalAddress',
					'@id'             => $this->get_schema_id( $property_data['permalink_url'], 'address' ),
					'streetAddress'   => $street ? $street : null,
					'postalCode'      => $postcode ? $postcode : null,
					'addressLocality' => $locality ? $locality : null,
					'addressRegion'   => $region ? $region : null,
					'addressCountry'  => $country ? $country : null,
				]
			);
		}

		$lat = get_post_meta( $this->post->ID, '_inx_lat', true );
		$lng = get_post_meta( $this->post->ID, '_inx_lng', true );

		if ( $lat && $lng ) {
			$schema_data['geo'] = [
				'@type'     => 'GeoCoordinates',
				'@id'       => $this->get_schema_id( $property_data['permalink_url'], 'geo' ),
				'latitude'  => (float) $lat,
				'longitude' => (float) $lng,
			];
		}

		return $schema_data;
	} // get_geo_elements

	/**
	 * Create and return "video" elements based on the current property data.
	 *
	 * @since 1.12.0-beta2
	 *
	 * @param string $property_schema_id Property schema ID.
	 *
	 * @return mixed[] Property video elements.
	 */
	private function get_video_element( $property_schema_id ): array {
		$property_data = $this->get_property_data();

		if ( empty( $property_data['videos'] ) ) {
			return [];
		}

		$schema_data = [];

		foreach ( $property_data['videos'] as $i => $video ) {
			$content_url = '';
			$embed_url   = '';

			if ( 'local' === $video['provider'] ) {
				if ( empty( $video['id'] ) ) {
					continue;
				}

				$video_post = get_post( $video['id'] );
				if ( ! $video_post ) {
					continue;
				}

				$content_url = $video['url'];
				$upload_date = get_the_date( 'c', $video_post );
				$description = wp_strip_all_tags( $video_post->post_content );
			} else {
				$embed_url   = ! empty( $video['embed_url'] ) ?
					$video['embed_url'] : $video['url'];
				$upload_date = ! empty( $video['oembed']['upload_date'] ) ?
					$video['oembed']['upload_date'] : get_the_date( 'c', $this->post );
				$description = ! empty( $video['oembed']['description'] ) ?
					wp_strip_all_tags( $video['oembed']['description'] ) : '';
			}

			$thumbnail_url = ! empty( $video['thumbnail_url'] ) ?
				$video['thumbnail_url'] : get_the_post_thumbnail_url( $this->post->ID, 'full' );

			if ( ! $description ) {
				$description = wp_sprintf(
					/* translators: %s = property title. */
					__( 'Video about the property "%s"', 'immonex-kickstart' ),
					$property_data['title']
				);
			}

			if (
				false === strpos( $upload_date, '+' )
				&& false === strpos( $upload_date, 'Z' )
			) {
				$upload_date .= 'Z';
			}

			$video_schema = array_filter(
				[
					'@type'           => 'VideoObject',
					'@id'             => $this->get_schema_id( $property_data['permalink_url'], 'video-' . ( $i + 1 ) ),
					'name'            => $video['title'] ? $video['title'] : $this->post->post_title,
					'description'     => $description,
					'uploadDate'      => $upload_date,
					'thumbnailUrl'    => $thumbnail_url,
					'contentUrl'      => $content_url ? $content_url : null,
					'embedUrl'        => $embed_url ? $embed_url : null,
					'contentLocation' => [
						'@type'   => 'Place',
						'@id'     => $this->get_schema_id( $property_data['permalink_url'], 'location' ),
						'address' => [
							'@id' => $this->get_schema_id( $property_data['permalink_url'], 'address' ),
						],
						'geo'     => [
							'@id' => $this->get_schema_id( $property_data['permalink_url'], 'geo' ),
						],
					],
				]
			);

			$schema_data['video'][] = $video_schema;
		}

		return $schema_data;
	} // get_video_element

	/**
	 * Create and return an "offers" element to based on the current property data.
	 *
	 * @since 1.12.0-beta
	 *
	 * @param string $offerer_scope Optional scope for agency/agent data: "full" (default)
	 *                              for a complete data set, "reference" for ID/URL only.
	 *
	 * @return mixed[] Offers element.
	 */
	private function get_offers_element( $offerer_scope = 'full' ): array {
		$property_data     = $this->get_property_data();
		$availability_data = $this->get_availability_data();

		if (
			empty( $property_data['primary_price']['value'] )
			|| ! $this->utils['string']->get_float( $property_data['primary_price']['value_formatted'] )
		) {
			return [];
		}

		$business_function = $property_data['flags']['is_sale'] ? 'Sell' : 'LeaseOut';
		$offer_types       = [
			'Offer',
			'OfferFor' . ( $property_data['flags']['is_sale'] ? 'Purchase' : 'Lease' ),
		];
		$offered_by        = [];

		$agent_schema_element = apply_filters(
			'inx_team_get_schema_data',
			[],
			[
				'entity_type' => 'agent',
				'property_id' => $property_data['post_id'],
				'scope'       => $offerer_scope,
			]
		);
		if ( ! empty( $agent_schema_element ) ) {
			$offered_by[] = $agent_schema_element;
		}

		$agency_schema_element = apply_filters(
			'inx_team_get_schema_data',
			[],
			[
				'entity_type' => 'agency',
				'property_id' => $property_data['post_id'],
				'scope'       => $offerer_scope,
			]
		);
		if ( ! empty( $agency_schema_element ) ) {
			$offered_by[] = $agency_schema_element;
		}

		if ( 1 === count( $offered_by ) ) {
			$offered_by = $offered_by[0];
		}

		return [
			'offers' => array_filter(
				[
					'@type'              => $offer_types,
					'@id'                => $this->get_schema_id( $property_data['permalink_url'], 'offers' ),
					'price'              => $property_data['primary_price']['value'],
					'priceCurrency'      => $property_data['currency'],
					'availability'       => $availability_data['offer_availability'],
					'availabilityStarts' => ! empty( $availability_data['from_date'] ) ? $availability_data['from_date'] : null,
					'availabilityEnds'   => ! empty( $availability_data['to_date'] ) ? $availability_data['to_date'] : null,
					'businessFunction'   => "http://purl.org/goodrelations/v1#{$business_function}",
					'offeredBy'          => ! empty( $offered_by ) ? $offered_by : null,
				]
			),
		];
	} // get_offers_element

	/**
	 * Generate and return a "virtual event" element for the current property if
	 * a virtual tour is available.
	 *
	 * @since 1.12.0-beta2
	 *
	 * @return mixed[] Event element (or empty array if no virtual tour is available).
	 */
	private function get_event_element(): array {
		$property_data = $this->get_property_data();

		if ( empty( $property_data['virtual_tour_url'] ) ) {
			return [];
		}

		$today = function_exists( 'wp_date' ) ? wp_date( 'Y-m-d' ) : date_i18n( 'Y-m-d' );

		return [
			'@type'               => 'Event',
			'@id'                 => $this->get_schema_id( $property_data['permalink_url'], 'Event' ),
			'eventAttendanceMode' => 'https://schema.org/OnlineEventAttendanceMode',
			'eventStatus'         => 'https://schema.org/EventScheduled',
			'startDate'           => $today,
			'endDate'             => $today,
			'url'                 => $property_data['permalink_url'],
			'location'            => [
				[
					'@type' => 'VirtualLocation',
					'url'   => $property_data['permalink_url'],
				],
				[
					'@type'   => 'Place',
					'@id'     => $this->get_schema_id( $property_data['permalink_url'], 'location' ),
					'address' => [
						'@id' => $this->get_schema_id( $property_data['permalink_url'], 'address' ),
					],
					'geo'     => [
						'@id' => $this->get_schema_id( $property_data['permalink_url'], 'geo' ),
					],
				],
			],
			'offers'              => [
				'@id' => $this->get_schema_id( $property_data['permalink_url'], 'offers' ),
			],
		];
	} // get_event_element

	/**
	 * Determine availability data (from/to dates etc.) for the current property.
	 *
	 * @since 1.12.0-beta
	 *
	 * @return mixed[] Availability data.
	 */
	private function get_availability_data(): array {
		if ( ! empty( $this->availability_data ) ) {
			return $this->availability_data;
		}

		$property_data = $this->get_property_data();

		if (
			$property_data['flags']['is_sold']
			|| $property_data['flags']['is_reference']
		) {
			$offer_availability = 'SoldOut';
		} elseif ( $property_data['flags']['is_reserved'] ) {
			$offer_availability = 'Reserved';
		} else {
			$offer_availability = 'InStock';
		}

		$items        = [];
		$item_mapping = [
			'verfuegbar_ab' => 'verwaltung_objekt.verfuegbar_ab',
			'abdatum'       => 'verwaltung_objekt.abdatum',
			'bisdatum'      => 'verwaltung_objekt.bisdatum',
		];

		foreach ( $item_mapping as $key => $mapping_name ) {
			$item = $this->utils['data']->get_details_item( $property_data['details'], $mapping_name );

			if ( ! empty( $item ) && isset( $item['meta_json'] ) ) {
				$meta              = json_decode( $item['meta_json'], true );
				$item['org_value'] = ! empty( $meta['value_before_filter'] ) ? $meta['value_before_filter'] : $item['value'];
			}

			$items[ $key ] = $item;
		}

		$from_date = ! empty( $items['abdatum'] ) ? $items['abdatum']['org_value'] : '';
		if ( ! $from_date && ! empty( $items['verfuegbar_ab'] ) ) {
			$temp      = strtotime( $items['verfuegbar_ab']['value'] );
			$from_date = $temp ? gmdate( 'Y-m-d', $temp ) : '';
		}
		if ( ! $from_date ) {
			$from_date = get_the_date( 'Y-m-d', $this->post );
		}

		$to_date = ! empty( $items['bisdatum'] ) ? $items['bisdatum']['org_value'] : '';

		$this->availability_data = [
			'offer_availability' => "https://schema.org/{$offer_availability}",
			'from_date'          => $from_date,
			'to_date'            => $to_date,
		];

		return $this->availability_data;
	} // get_availability_data

	/**
	 * Retrieve (if not already done) and return a complete template data array
	 * of the current property.
	 *
	 * @since 1.12.0-beta
	 *
	 * @return mixed[] Property data.
	 */
	private function get_property_data(): array {
		if (
			! empty( $this->property_data )
			|| empty( $this->post )
			|| ! is_a( $this->post, '\WP_Post' )
		) {
			return $this->property_data;
		}

		$this->property_data = apply_filters( 'inx_get_property_template_data', [ 'post_id' => $this->post->ID ] );

		return $this->property_data;
	} // get_property_data

} // Property_Schema
