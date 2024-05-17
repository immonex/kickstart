# inx_property_template_data (Filter)

Über diesen Filter Hook können **alle** Daten angepasst werden, die im Rahmen des Immobilien-Template-Renderings (Listen- und Detailansicht) eingefügt oder anderweitig verarbeitet werden.

!> Dieser Hook ist nur für *Sonderfälle* vorgesehen. Im Regelfall sollte auf **speziellere** Filter Hooks zurückgegriffen werden, die sich nur auf eine bestimmte Teilmenge anzupassender Inhalte beziehen.

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| **`$template_data`** (array) | Template-Rendering-Daten (komplett) |
| `$atts` (array) | templatespezifische Attribute (separat/auch in `$template_data` enthalten) |

### Das Template-Data-Array im Detail

```php
[
	'property_post_type_name' => 'inx_property',
	'special_query_vars' => Function () {
		return [
			'inx-limit',
			'inx-limit-page',
			'inx-sort',
			'inx-order',
			'inx-references',
			'inx-masters',
			'inx-available',
			'inx-sold',
			'inx-reserved',
			'inx-featured',
			'inx-front-page-offer',
			'inx-demo',
			'inx-backlink-url',
			'inx-iso-country',
			'inx-author',
			'inx-ref',
			'inx-force-lang'
		]
	},
	'auto_applied_rendering_atts' => [ 'inx-ref', 'inx-force-lang' ],
	'required_prop_cf_defaults' => [
		'_immonex_is_available' => 1,
		'_immonex_is_reserved' => 0,
		'_immonex_is_sold' => 0,
		'_immonex_is_reference' => 0,
		'_immonex_is_demo' => 0,
		'_immonex_is_featured' => 0,
		'_immonex_is_front_page_offer' => 0,
		'_immonex_group_master' => 0
	],
	'plugin_name' => 'immonex Kickstart',
	'plugin_slug' => 'immonex-kickstart',
	'plugin_version' => 'X.X.X',
	'plugin_prefix' => 'inx_',
	'public_prefix' => 'inx-',
	'plugin_dir' => '/var/www/wp-content/plugins/immonex-kickstart',
	'plugin_fs_dir' => '/var/www/wp-content/plugins/immonex-kickstart',
	'plugin_main_file' => '/var/www/wp-content/plugins/immonex-kickstart/immonex-kickstart.php',
	'plugin_options_name' => 'immonex-kickstart_options',
	'skin' => 'default',
	'property_list_page_id' => 0,
	'properties_per_page' => 4,
	'property_details_page_id' => 393,
	'apply_wpautop_details_page' => true,
	'heading_base_level' => true,
	'enable_gallery_image_links' => false,
	'enable_ken_burns_effect' => true,
	'area_unit' => 'm²',
	'currency' => 'EUR',
	'currency_symbol' => '€',
	'show_reference_prices' => false,
	'reference_price_text' => 'Preis auf Anfrage',
	'property_search_dynamic_update' => false,
	'property_search_no_results_text' => 'Aktuell sind keine Immobilien vorhanden, die den Suchkriterien entsprechen.',
	'enable_contact_section_for_references' => false,
	'show_seller_commission' => false,
	'distance_search_autocomplete_type' => 'google-places',
	'distance_search_autocomplete_require_consent' => true,
	'maps_require_consent' => true,
	'videos_require_consent' => true,
	'virtual_tours_require_consent' => true,
	'property_list_map_type' => 'gmap_hybrid',
	'property_list_map_lat' => 49.858784,
	'property_list_map_lng' => 6.78534287,
	'property_list_map_zoom' => 12,
	'property_list_map_auto_fit' => true,
	'property_details_map_type' => 'ol_osm_map_german',
	'property_details_map_zoom' => 12,
	'property_details_map_infowindow_contents' => 'Der reale Standort der Immobilie kann von der Markerposition abweichen.',
	'property_details_map_note_map_marker' => 'Die genaue Adresse des Objekts teilen wir Ihnen gerne auf Anfrage mit.',
	'property_details_map_note_map_embed' => 'Die Karte zeigt grob den Ortsteil bzw. die Lage an, in der sich die Immobilie befindet.',
	'google_api_key' => 'XXX',
	'required_property_custom_field_defaults' => [
		'_immonex_is_available' => 1,
		'_immonex_is_reserved' => 0,
		'_immonex_is_sold' => 0,
		'_immonex_is_reference' => 0,
		'_immonex_is_demo' => 0,
		'_immonex_is_featured' => 0,
		'_immonex_is_front_page_offer' => 0,
		'_immonex_group_master' => 0
	],
	'property_id' => [
		'value' => 'Ext-38',
		'value_formatted' => 'Ext-38',
		'meta' => [
			'mapping_source' => 'verwaltung_techn->objektnr_extern',
			'mapping_destination' => '_inx_property_id',
			'mapping_parent' => 'Objektnummer',
			'meta_key' => '_inx_property_id',
			'meta_value' => 'Ext-38',
			'meta_value_before_filter' => 'Ext-38',
			'meta_name' => 'verwaltung_techn.objektnr_extern',
			'meta_group' => false,
			'unique' => true,
			'join_multiple_values' => false,
			'join_divider' => false
		],
		'title' => 'Objektnummer'
	],
	'build_year' => [
		'value' => '1973',
		'value_formatted' => '1973',
		'meta' => [
			'mapping_source' => 'zustand_angaben->baujahr',
			'mapping_destination' => '_inx_build_year',
			'mapping_parent' => 'Baujahr',
			'meta_key' => '_inx_build_year',
			'meta_value' => '1973',
			'meta_value_before_filter' => '1973',
			'meta_name' => 'baujahr',
			'meta_group' => false,
			'unique' => true,
			'join_multiple_values' => false,
			'join_divider' => false
		],
		'title' => 'Baujahr'
	],
	'primary_area' => [
		'value' => 240,
		'value_formatted' => '240&nbsp;m²',
		'meta' => [
			'mapping_source' => 'flaechen->wohnflaeche',
			'mapping_destination' => '_inx_primary_area',
			'mapping_parent' => 'Wohnfläche',
			'meta_key' => '_inx_primary_area',
			'meta_value' => 240,
			'meta_value_before_filter' => 240,
			'meta_name' => 'primaerflaeche',
			'meta_group' => false,
			'unique' => true,
			'join_multiple_values' => false,
			'join_divider' => false
		],
		'title' => 'Wohnfläche'
	],
	'plot_area' => [
		'value' => 1800,
		'value_formatted' => '1.800&nbsp;m²',
		'meta' => [
			'mapping_source' => 'flaechen->grundstuecksflaeche',
			'mapping_destination' => '_inx_plot_area',
			'mapping_parent' => 'Grundstücksfläche',
			'meta_key' => '_inx_plot_area',
			'meta_value' => 1800,
			'meta_value_before_filter' => 1800,
			'meta_name' => 'grundstuecksflaeche',
			'meta_group' => false,
			'unique' => true,
			'join_multiple_values' => false,
			'join_divider' => false
		],
		'title' => 'Grundstücksfläche',
	],
	...
	'total_rooms' => [
		'value' => 7,
		'value_formatted' => 7,
		'meta' => [
			'mapping_source' => 'flaechen->anzahl_zimmer',
			'mapping_destination' => '_inx_total_rooms',
			'mapping_parent' => 'Zimmer',
			'meta_key' => '_inx_total_rooms',
			'meta_value' => 7,
			'meta_value_before_filter' => 7,
			'meta_name' => 'anzahl_zimmer_gesamt',
			'meta_group' => false,
			'unique' => true,
			'join_multiple_values' => false,
			'join_divider' => false
		],
		'title' => 'Zimmer'
	],
	'primary_price' => [
		'value' => 186000,
		'value_formatted' => '186.000&nbsp;€',
		'meta' => [
			'mapping_source' => 'preise->kaufpreis',
			'mapping_destination' => '_inx_primary_price',
			'mapping_parent' => 'Kaufpreis',
			'meta_key' => '_inx_primary_price',
			'meta_value' => 186000,
			'meta_value_before_filter' => 186000,
			'meta_name' => 'primaerpreis',
			'meta_group' => false,
			'unique' => true,
			'join_multiple_values' => false,
			'join_divider' => false
		],
		'title' => 'Kaufpreis'
	],
	...
	'zipcode' => [
		'value' => '17225',
		'value_formatted' => '17225',
		'meta' => [
			'mapping_source' => 'geo->plz',
			'mapping_destination' => '_inx_zipcode',
			'mapping_parent' => 'PLZ',
			'meta_key' => '_inx_zipcode',
			'meta_value' => '17225',
			'meta_value_before_filter' => '17225',
			'meta_name' => 'geo.plz',
			'meta_group' => false,
			'unique' => true,
			'join_multiple_values' => false,
			'join_divider' => false
		],
		'title' => 'PLZ'
	],
	'city' => [
		'value' => 'Seeburg',
		'value_formatted' => 'Seeburg',
		'meta' => [
			'mapping_source' => 'geo->ort',
			'mapping_destination' => '_inx_city',
			'mapping_parent' => 'Ort',
			'meta_key' => '_inx_city',
			'meta_value' => 'Seeburg',
			'meta_value_before_filter' => 'Seeburg',
			'meta_name' => 'geo.ort',
			'meta_group' => false,
			'unique' => true,
			'join_multiple_values' => false,
			'join_divider' => false
		],
		'title' => 'Ort'
	],
	'oi_xml_source' => '<!--?xml version="1.0"?-->
<immobilie>
	<objektkategorie>
		<nutzungsart WOHNEN="1" GEWERBE="0" ANLAGE="0" WAZ="0"/>
		<vermarktungsart KAUF="1" MIETE_PACHT="0" ERBPACHT="0" LEASING="0"/>
		<objektart>
		<haus haustyp="EINFAMILIENHAUS"/></objektart>
	</objektkategorie>
<geo>
<plz>17225</plz>
<ort>Seeburg</ort>
...
</immobilie>',
	'oi_immobilie' => SimpleXMLElement Object(...),
	'oi_nutzungsart' => [ 'wohnen' ],
	'oi_vermarktungsart' => [ 'kauf' ],
	'oi_css_classes' => [ 'inx-oi--nutzungsart--wohnen', 'inx-oi--vermarktungsart--kauf' ],
	'details' => [
		'flaechen' => [
			[
				'title' => 'Wohnfläche',
				'group' => 'flaechen',
				'name' => 'flaechen.wohnflaeche',
				'value' => '240 m²',
				'meta_json' => '{"mapping_source":"flaechen->wohnflaeche","value_before_filter":"240"}'
			],
			[
				'title' => 'Grundstücksfläche',
				'group' => 'flaechen',
				'name' => 'flaechen.grundstuecksflaeche',
				'value' => '1.800 m²',
				'meta_json' => '{"mapping_source":"flaechen->grundstuecksflaeche","value_before_filter":"1800"}'
			],
			[
				'title' => 'Schlafzimmer',
				'group' => 'flaechen',
				'name' => 'flaechen.anzahl_schlafzimmer',
				'value' => 4,
				'meta_json' => '{"mapping_source":"flaechen->anzahl_schlafzimmer","value_before_filter":"4"}'
			]
		],
		'zustand' => [
			'title' => 'Baujahr',
			'group' => 'zustand',
			'name' => 'zustand_angaben.baujahr',
			'value' => '1973',
			'meta_json' => '{"mapping_source":"zustand_angaben->baujahr","value_before_filter":"1973"}'
		],
		[
			'title' => 'Zustand',
			'group' => 'zustand',
			'name' => 'zustand_angaben.zustand',
			'value' => 'neuwertig',
			'meta_json' => '{"mapping_source":"zustand_angaben->zustand:zustand_art:NEUWERTIG","value_before_filter":"neuwertig"}'
		],
		...
		'epass' => [
			[
				'title' => 'Energieausweis-Art',
				'group' => 'epass',
				'name' => 'zustand_angaben.energiepass.epart',
				'value' => 'Bedarf',
				'meta_json' => '{"mapping_source":"zustand_angaben->energiepass->epart","value_before_filter":"BEDARF"}'
			],
			[
				'title' => 'Endenergiebedarf',
				'group' => 'epass',
				'name' => 'zustand_angaben.energiepass.endenergiebedarf',
				'value' => '117 kWh/(m²*a)',
				'meta_json' => '{"mapping_source":"zustand_angaben->energiepass->endenergiebedarf","value_before_filter":"117"}'
			],
		],
		'ausstattung' => [
			[
				'title' => 'Heizungsart',
				'group' => 'ausstattung',
				'name' => 'ausstattung.heizungsart',
				'value' => 'Fernheizung',
				'meta_json' => '{"mapping_source":"ausstattung->heizungsart:FERN+","value_before_filter":"Fernheizung"}'
			],
			[
				'title' => 'Befeuerung',
				'group' => 'ausstattung',
				'name' => 'ausstattung.befeuerung',
				'value' => 'Gas, Erdwärme, Fernwärme',
				'meta_json' => '{"mapping_source":"ausstattung->befeuerung:GAS+","value_before_filter":"Gas, Erdwu00e4rme, Fernwu00e4rme"}'
			],
			[
				'title' => 'Bodenbelag',
				'group' => 'ausstattung',
				'name' => 'ausstattung.boden',
				'value' => 'Fliesen, Parkett, Laminat',
				'meta_json' => '{"mapping_source":"ausstattung->boden:FLIESEN+","value_before_filter":"Fliesen, Parkett, Laminat"}'
			],
			...
		'lage' => [
			[
				'title' => 'Ausblick',
				'group' => 'lage',
				'name' => 'infrastruktur.ausblick',
				'value' => 'Bergblick',
				'meta_json' => '{"mapping_source":"infrastruktur->ausblick:blick:BERGE","value_before_filter":"Bergblick"}'
			],
			...
		],
		'kontakt' => [
			[
				'title' => 'E-Mail',
				'group' => 'kontakt',
				'name' => 'kontaktperson.email_direkt',
				'value' => 'dieter.demo@immonex.one',
				'meta_json' => '{"mapping_source":"kontaktperson->email_direkt","value_before_filter":"dieter.demo@immonex.one"}'
			],
			[
				'title' => 'E-Mail (Zentrale)',
				'group' => 'kontakt',
				'name' => 'kontaktperson.email_zentrale',
				'value' => 'info@immonex.one',
				'meta_json' => '{"mapping_source":"kontaktperson->email_zentrale","value_before_filter":"info@immonex.one"}'
			],
			...
		],
		'preise' => [
			[
				'title' => 'Kaufpreis',
				'group' => 'preise',
				'name' => 'preise.kaufpreis',
				'value' => '186.000 €',
				'meta_json' => '{"mapping_source":"preise->kaufpreis","value_before_filter":"186000"}'
			],
			[
				'title' => 'Käuferprovision',
				'group' => 'preise',
				'name' => 'preise.aussen_courtage*',
				'value' => '3,57 % inkl. MwSt.',
				'meta_json' => '{"mapping_source":"preise->aussen_courtage*","value_before_filter":"3,57 % inkl. MwSt."}'
			],
			...
		],
		'infrastruktur' => [
			[
				'title' => 'Distanz zum Flughafen',
				'group' => 'infrastruktur',
				'name' => 'infrastruktur.distanzen.flughafen',
				'value' => '70,0 km',
				'meta_json' => '{"mapping_source":"infrastruktur->distanzen:distanz_zu:FLUGHAFEN","value_before_filter":"70"}'
			],
			[
				'title' => 'Distanz zur Autobahn',
				'group' => 'infrastruktur',
				'name' => 'infrastruktur.distanzen.autobahn',
				'value' => '14,0 km',
				'meta_json' => '{"mapping_source":"infrastruktur->distanzen:distanz_zu:AUTOBAHN","value_before_filter":"14"}'
			],
			...
		],
		'sonstiges' => [
			[
				'title' => 'Immobilie ist verfügbar ab',
				'group' => 'sonstiges',
				'name' => 'verwaltung_objekt.verfuegbar_ab',
				'value' => 'sofort',
				'meta_json' => '{"mapping_source":"verwaltung_objekt->verfuegbar_ab","value_before_filter":"sofort"}'
			],
			[
				'title' => 'gewerbliche Nutzung möglich',
				'group' => 'sonstiges',
				'name' => 'verwaltung_objekt.gewerbliche_nutzung',
				'value' => 'ja',
				'meta_json' => '{"mapping_source":"verwaltung_objekt->gewerbliche_nutzung","value_before_filter":"1"}'
			]
		]
	],
	'post_id' => 16791,
	'type_of_use' => 'Wohnimmobilie',
	'property_type' => 'Einfamilienhaus',
	'title' => 'Traumhaft für Familien! Einfamilienhaus in Top-Lage!',
	'main_description' => 'Das wohl durchdachte Neubauensemble direkt am Park unterstreicht mit Weitblick und viel Grün sein einzigartiges Architekturkonzept...',
	'excerpt' => 'Das wohl durchdachte Neubauensemble...',
	'full_address' => 'Am Sägewerk 82, 17225 Seeburg',
	'permalink_url' => 'https://immobilienmakler-website.de/immobilien/traumhaft-fuer-familien-einfamilienhaus-in-top-lage/',
	'url' => 'https://immobilienmakler-website.de/immobilien/traumhaft-fuer-familien-einfamilienhaus-in-top-lage/?inx-backlink-url=https%3A%2F%2Fimmobilienmakler-website.de%2Fimmobilien%2F',
	'overview_url' => 'https://immobilienmakler-website.de/immobilien/',
	'thumbnail_tag' => '<img width="'840" height="630" src="https://immobilienmakler-website.de/wp-content/uploads/...">',
	'locations' => [
		WP_Term Object(
			'term_id' => 988,
			'name' => 'Seeburg',
			'slug' => 'seeburg',
			'term_group' => 0,
			'term_taxonomy_id' => 988,
			'taxonomy' => 'inx_location',
			'description' => false,
			'parent' => 0,
			'count' => 17,
			'filter' => 'raw',
		)
	],
	'location' => 'Seeburg',
	'features' => [
		WP_Term Object(
			'term_id' => 59,
			'name' => 'Abstellraum',
			'slug' => 'abstellraum',
			'term_group' => 0,
			'term_taxonomy_id' => 59,
			'taxonomy' => 'inx_feature',
			'description' => false,
			'parent' => 0,
			'count' => 14,
			'filter' => 'raw',
		),
		WP_Term Object(
			'term_id' => 29,
			'name' => 'DV-Verkabelung',
			'slug' => 'dv-verkabelung',
			'term_group' => 0,
			'term_taxonomy_id' => 29,
			'taxonomy' => 'inx_feature',
			'description' => false,
			'parent' => 0,
			'count' => 15,
			'filter' => 'raw',
		),
		WP_Term Object(
			'term_id' => 58,
			'name' => 'DVBT-Empfang',
			'slug' => 'dvbt-empfang',
			'term_group' => 0,
			'term_taxonomy_id' => 58,
			'taxonomy' => 'inx_feature',
			'description' => false,
			'parent' => 0,
			'count' => 27,
			'filter' => 'raw',
		),
		...
	]
	'labels' => [
		[
			'name' => 'Demo',
			'css_classes' => [
				'inx-property-label',
				'inx-property-label--feldname--immonex-is-demo',
			],
			'is_for_sale_or_rent' => false,
			'show' => true,
		]
	],
	'video' => false,
	'virtual_tour_embed_code' => false,
	'virtual_tour_url' => false,
	'file_attachments' => [],
	'links' => [],
	'detail_page_elements' => [
		'head' => [
			'template' => 'head'
		],
		'gallery' => [
			'template' => 'gallery',
			'animation_type' => 'push',
			'enable_caption_display' => true,
			'enable_video' => true,
			'enable_virtual_tour' => true,
			'enable_ken_burns_effect' => true
		],
		'main_description' => [
			'template' => 'description-text'
		],
		'prices' => [
			'template' => 'details',
			'groups' => 'preise',
			'headline' => 'Preise'
		],
		'areas' => [
			'template' => 'details',
			'groups' => 'flaechen',
			'headline' => 'Flächen'
		],
		'condition' => [
			'template' => 'details',
			'groups' => 'zustand',
			'headline' => 'Zustand & Erschließung'
		],
		'epass' => [
			'template' => 'details',
			'groups' => 'epass',
			'headline' => false
		],
		'epass_images' => [
			'template' => 'gallery',
			'image_selection_custom_field' => '_inx_epass_images',
			'headline' => false,
			'animation_type' => 'scale',
			'enable_caption_display' => false,
			'enable_ken_burns_effect' => false
		],
		'epass_energy_scale' => [
			'template' => 'shortcodes',
			'shortcodes' => [ '[immonex-energy-scale]' ]
		],
		'location' => [
			'template' => 'location-info',
			'optional' => true
		],
		'location_description' => [
			'template' => 'location-description',
			'no_headline_in_tabs' => true
		],
		'location_map' => [
			'template' => 'location-map',
			'type' => 'ol_osm_map_german',
			'zoom' => 12,
			'marker_fill_color' => '#E77906',
			'marker_fill_opacity' => 0.8,
			'marker_stroke_color' => '#404040',
			'marker_stroke_width' => 3,
			'marker_scale' => 0.75,
			'marker_icon_url' => false,
			'no_headline_in_tabs' => true,
			'options' => [
				'crossOrigin' => 'anonymous',
				'maxZoom' => 18,
				'opaque' => true,
				'url' => 'https://tile.openstreetmap.de/{z}/{x}/{y}.png',
				'attributions' => 'Daten von <a href="https://www.openstreetmap.org/">OpenStreetMap</a> - Veröffentlicht unter <a href="https://opendatacommons.org/licenses/odbl/">ODbL</a>'
			]
		]
		'features' => [
			'template' => 'features',
			'groups' => 'ausstattung',
			'headline' => 'Ausstattung'
		]
		'floor_plans' => [
			'template' => 'gallery',
			'image_selection_custom_field' => '_inx_floor_plans',
			'headline' => 'Grundrisse',
			'animation_type' => 'scale',
			'enable_caption_display' => true,
			'enable_ken_burns_effect' => false
		]
		'misc' => [
			'template' => 'details',
			'description_text_field' => 'freitexte.sonstige_angaben',
			'groups' => 'sonstiges',
			'headline' => 'Sonstiges'
		]
		'downloads_links' => [
			'template' => 'downloads-and-links',
			'headline' => 'Downloads & Links'
		]
		'video' => [
			'template' => 'video',
			'optional' => true
		]
		'virtual_tour' => [
			'template' => 'virtual-tour',
			'optional' => true
		]
		'contact_person' => [
			'do_action' => [
				'inx_team_render_single_agent',
				89,
				'single-agent/default-contact-element-replacement',
				[
					'type' => 'default_contact_element_replacement',
					'convert_links' => true
				]
			],
			'template' => false
		],
		'footer' => [
			'template' => 'footer'
		]
	],
	'flags' => [
		'is_sale' => true,
		'is_reference' => false,
		'is_sold' => false,
		'is_reserved' => false,
		'is_available' => true,
		'is_demo' => true,
	],
	'disable_link' => false,
	'tabbed_content_elements' => [
		'before_tabs' => [ 'head', 'gallery' ],
		'tabs' => [
			'main_description' => [
				'title' => 'Die Immobilie',
				'elements' => [ 'main_description' ]
			],
			'details' => [
				'title' => 'Details',
				'elements' => [ 'areas', 'condition', 'misc' ]
			],
			'features' => [
				'title' => 'Ausstattung',
				'elements' => [ 'features' ]
			],
			'epass' => [
				'title' => 'Energieausweis',
				'elements' => [ 'epass', 'epass_energy_scale', 'epass_images' ]
			],
			'location' => [
				'title' => 'Lage & Infrastruktur',
				'elements' => [ 'location_map', 'location_description', 'infrastruktur' ]
			],
			'prices' => [
				'title' => 'Preise',
				'elements' => [ 'prices' ]
			],
			'downloads_links' => [
				'title' => 'Downloads & Links',
				'elements' => [ 'downloads_links' ]
			]
		],
		'after_tabs' => [ 'floor_plans', 'contact_person', 'footer' ]
	],
	'template' => 'footer',
	'element_atts' => [
		'head' => [],
		'gallery' => [],
		'main_description' => [],
		'prices' => [],
		'areas' => [],
		'condition' => [],
		'epass' => [],
		'epass_images' => [],
		'epass_energy_scale' => [],
		'location' => [],
		'location_description' => [],
		'location_map' => [],
		'features' => [],
		'floor_plans' => [],
		'misc' => [],
		'downloads_links' => [],
		'video' => [],
		'virtual_tour' => [],
		'contact_person' => [],
		'footer' => []
	],
	'inx-ref' => false,
	'inx-force-lang' => false
]
```

## Rückgabewert

angepasste Template-Inhalte

## Rahmenfunktion

[](_info-snippet-einbindung.md ':include')

```php
add_filter( 'inx_property_template_data', 'mysite_modify_property_template_data', 10, 2 );

function mysite_modify_property_template_data( $template_data, $atts ) {
	// Template-Daten anpassen...

	return $template_data;
} // mysite_modify_property_template_data
```

## Siehe auch

- [inx_property_core_data](filter-inx-property-core-data) (Immobilien-Kerndaten)
- [inx_property_template_data_details](filter-inx-property-template-data-details) (Detaildaten einer Immobilie vor dem Rendern des Templates)

[](_backlink.md ':include')