# inx_property_core_data (Filter)

Über diesen Filter-Hook können die **Kerndaten** der Immobilien angepasst werden, die in den Listen- und Detailansichten ausgegeben werden.

Mit dem Hook [inx_property_core_data_custom_fields](filter-inx-property-core-data-custom-fields) können bei Bedarf die [Custom Fields](../beitragsarten-taxonomien?id=custom-fields) geändert oder ergänzt werden, die die Kerndaten enthalten.

> **Achtung!** Es sollten nur die **formatierten Werte** geändert werden, da ein Großteil der weiteren Daten für die interne Verarbeitung benötigt wird.

## Parameter

| Name | Beschreibung |
| ---- | ------------ |
| `$core_data` (array) | Kerndaten |
| `$meta` (array) | Kontextspezifische Metadaten |

### Das Core-Data-Array im Detail

Die Elemente enthalten jeweils den ursprünglichen Wert (`value`), die für die Ausgabe maßgebliche **formatierte Variante** (`value_formatted`), Titel/Bezeichnung (`title`) sowie zugehörige Metadaten (`meta`) wie bspw. Mapping-Attribute. Diese Struktur ist auch bei Angaben vorhanden, für die – bezogen auf das betreffende Objekt – keine Werte verfügbar sind (siehe `commercial_area` in den nachfolgenden Beispieldaten).

```php
[
	'property_id' => [
		'value' => 'Ext-777',
		'value_formatted' => 'Ext-777',
		'meta' => [
			'mapping_source' => 'verwaltung_techn->objektnr_extern',
			'mapping_destination' => '_inx_property_id',
			'mapping_parent' => 'Objektnummer',
			'meta_key' => '_inx_property_id',
			'meta_value' => 'Ext-777',
			'meta_value_before_filter' => 'Ext-777',
			'meta_name' => 'verwaltung_techn.objektnr_extern',
			'meta_group' => false,
			'unique' => 1,
			'join_multiple_values' => false,
			'join_divider' => false
		],
		'title' => 'Objektnummer'
	],
	'build_year' => [
		'value' => 1989,
		'value_formatted' => '1989',
		'meta' => [
			'mapping_source' => 'zustand_angaben->baujahr',
			'mapping_destination' => '_inx_build_year',
			'mapping_parent' => 'Baujahr',
			'meta_key' => '_inx_build_year',
			'meta_value' => 1989,
			'meta_value_before_filter' => 1989,
			'meta_name' => 'baujahr',
			'meta_group' => false,
			'unique' => 1,
			'join_multiple_values' => false,
			'join_divider' => false
		],
		'title' => 'Baujahr'
	],
	'primary_area' => [
		'value' => 150,
		'value_formatted' => '150&nbsp;m²',
		'meta' => [
			'mapping_source' => 'flaechen->wohnflaeche',
			'mapping_destination' => '_inx_primary_area',
			'mapping_parent' => 'Wohnfläche',
			'meta_key' => '_inx_primary_area',
			'meta_value' => 150,
			'meta_value_before_filter' => 150,
			'meta_name' => 'primaerflaeche',
			'meta_group' => false,
			'unique' => 1,
			'join_multiple_values' => false,
			'join_divider' => false
		],
		'title' => 'Wohnfläche'
	],
	'plot_area' => [
		'value' => 1100,
		'value_formatted' => '1.100&nbsp;m²',
		'meta' => [
			'mapping_source' => 'flaechen->grundstuecksflaeche',
			'mapping_destination' => '_inx_plot_area',
			'mapping_parent' => 'Grundstücksfläche',
			'meta_key' => '_inx_plot_area',
			'meta_value' => 1100,
			'meta_value_before_filter' => 1100,
			'meta_name' => 'grundstuecksflaeche',
			'meta_group' => false,
			'unique' => 1,
			'join_multiple_values' => false,
			'join_divider' => false,
		],
		'title' => 'Grundstücksfläche'
	],
	'commercial_area' => [
		'value' => 0,
		'value_formatted' => '0',
		'meta' => false,
		'title' => false
	],
	'retail_area' => [ ... ],
	'office_area' => [ ... ],
	'gastronomy_area' => [ ... ],
	'storage_area' => [ ... ],
	'usable_area' => [
		'value' => 21,
		'value_formatted' => '21',
		'meta' => [
			'mapping_source' => 'flaechen->nutzflaeche',
			'mapping_destination' => '_inx_usable_area',
			'mapping_parent' => 'Nutzfläche',
			'meta_key' => '_inx_usable_area',
			'meta_value' => 21,
			'meta_value_before_filter' => 21,
			'meta_name' => 'nutzflaeche',
			'meta_group' => false,
			'unique' => 1,
			'join_multiple_values' => false,
			'join_divider' => false
		],
		'title' => 'Nutzfläche'
	],
	'living_area' => [
		'value' => 150,
		'value_formatted' => '150',
		'meta' => [
			'mapping_source' => 'flaechen->wohnflaeche',
			'mapping_destination' => '_inx_living_area',
			'mapping_parent' => 'Wohnfläche',
			'meta_key' => '_inx_living_area',
			'meta_value' => 150,
			'meta_value_before_filter' => 150,
			'meta_name' => 'wohnflaeche',
			'meta_group' => false,
			'unique' => 1,
			'join_multiple_values' => false,
			'join_divider' => false
		],
		'title' => 'Wohnfläche'
	],
	'basement_area' => [ ... ],
	'attic_area' => [ ... ],
	'misc_area' => [ ... ],
	'garden_area' => [
		'value' => 700,
		'value_formatted' => '700',
		'meta' => [
			'mapping_source' => 'flaechen->gartenflaeche',
			'mapping_destination' => '_inx_garden_area',
			'mapping_parent' => 'Gartenfläche',
			'meta_key' => '_inx_garden_area',
			'meta_value' => 700,
			'meta_value_before_filter' => 700,
			'meta_name' => 'gartenflaeche',
			'meta_group' => false,
			'unique' => 1,
			'join_multiple_values' => false,
			'join_divider' => false
		],
		'title' => 'Gartenfläche'
	],
	'total_area' => [ ... ],
	'primary_rooms' => [
		'value' => 5,
		'value_formatted' => '5',
		'meta' => [
			'mapping_source' => 'flaechen->anzahl_zimmer',
			'mapping_destination' => '_inx_primary_rooms',
			'mapping_parent' => 'Zimmer',
			'meta_key' => '_inx_primary_rooms',
			'meta_value' => 5,
			'meta_value_before_filter' => 5,
			'meta_name' => 'primaeranzahl_zimmer',
			'meta_group' => false,
			'unique' => 1,
			'join_multiple_values' => false,
			'join_divider' => false
		],
		'title' => 'Zimmer'
	],
	'bedrooms' => [
		'value' => 4,
		'value_formatted' => '4',
		'meta' => [
			'mapping_source' => 'flaechen->anzahl_schlafzimmer',
			'mapping_destination' => '_inx_bedrooms',
			'mapping_parent' => 'Schlafzimmer',
			'meta_key' => '_inx_bedrooms',
			'meta_value' => 4,
			'meta_value_before_filter' => 4,
			'meta_name' => 'anzahl_schlafzimmer',
			'meta_group' => false,
			'unique' => 1,
			'join_multiple_values' => false,
			'join_divider' => false
		],
		'title' => 'Schlafzimmer'
	],
	'living_bedrooms' => [ ... ],
	'bathrooms' => [
		'value' => 1,
		'value_formatted' => '1',
		'meta' => [
			'mapping_source' => 'flaechen->anzahl_badezimmer',
			'mapping_destination' => '_inx_bathrooms',
			'mapping_parent' => 'Badezimmer',
			'meta_key' => '_inx_bathrooms',
			'meta_value' => 1,
			'meta_value_before_filter' => 1,
			'meta_name' => 'anzahl_badezimmer',
			'meta_group' => false,
			'unique' => 1,
			'join_multiple_values' => false,
			'join_divider' => false
		],
		'title' => 'Badezimmer'
	],
	'total_rooms' => [
		'value' => 5,
		'value_formatted' => '5',
		'meta' => [
			'mapping_source' => 'flaechen->anzahl_zimmer',
			'mapping_destination' => '_inx_total_rooms',
			'mapping_parent' => 'Zimmer',
			'meta_key' => '_inx_total_rooms',
			'meta_value' => 5,
			'meta_value_before_filter' => 5,
			'meta_name' => 'anzahl_zimmer_gesamt',
			'meta_group' => false,
			'unique' => 1,
			'join_multiple_values' => false,
			'join_divider' => false,
		],
		'title' => 'Zimmer'
	],
	'primary_price' => [
		'value' => 330000,
		'value_formatted' => '330.000&nbsp;€',
		'meta' => [
			'mapping_source' => 'preise->kaufpreis',
			'mapping_destination' => '_inx_primary_price',
			'mapping_parent' => 'Kaufpreis',
			'meta_key' => '_inx_primary_price',
			'meta_value' => 330000,
			'meta_value_before_filter' => 330000,
			'meta_name' => 'primaerpreis',
			'meta_group' => false,
			'unique' => 1,
			'join_multiple_values' => false,
			'join_divider' => false
		],
		'title' => 'Kaufpreis'
	],
	'price_time_unit' => [ ... ],
	'primary_units' => [ ... ],
	'living_units' => [ ... ],
	'commercial_units' => [ ... ],
	'zipcode' => [
		'value' => 72191,
		'value_formatted' => '72191',
		'meta' => [
			'mapping_source' => 'geo->plz',
			'mapping_destination' => '_inx_zipcode',
			'mapping_parent' => 'PLZ',
			'meta_key' => '_inx_zipcode',
			'meta_value' => 72191,
			'meta_value_before_filter' => 72191,
			'meta_name' => 'geo.plz',
			'meta_group' => false,
			'unique' => 1,
			'join_multiple_values' => false,
			'join_divider' => false
		],
		'title' => 'PLZ'
	],
	'city' => [
		'value' => 'Nagold',
		'value_formatted' => 'Nagold',
		'meta' => [
			'mapping_source' => 'geo->ort',
			'mapping_destination' => '_inx_city',
			'mapping_parent' => 'Ort',
			'meta_key' => '_inx_city',
			'meta_value' => 'Nagold',
			'meta_value_before_filter' => 'Nagold',
			'meta_name' => 'geo.ort',
			'meta_group' => false,
			'unique' => 1,
			'join_multiple_values' => false,
			'join_divider' => false,
		],
		'title' => 'Ort'
	],
	'state' => [ ... ]
]
```

### Das Meta-Array im Detail

Die Meta-Angaben können für die Umsetzung bedingter Anpassungen verwendet werden, bspw. wenn Ausgabewerte nur beim Rendern eines bestimmten Templates geändert werden sollen. Hier sind vor allem die Elemente `template` und `context` relevant.

```php
[
    'template' => 'slideshow/property',
    'context' => 'get_property_template_data',
    'property_id' => 4079,
    'logo_url' => '',
    'site_title' => 'WordPress Immobilien',
    'template_folders' => [
		'/var/www/wp-immo-site/wp-content/plugins/immonex-kickstart-showtime/skins/default'
	],
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
    'inx-ref' => '',
    'inx-force-lang' => ''
]
```

## Rückgabewert

Orinal-Array mit angepassten **Ausgabewerten**.

## Rahmenfunktion

Eine Funktion zur Nutzung des Filters wird typischerweise in der folgenden Form in der Datei **functions.php** des **Child-Themes** oder per Code-Snippets-Plugin eingebunden. Nachfolgend eine konkrete Beispielfunktion, mit der die Ausgabe der Kaltmiete durch einen Zusatz ergänzt wird, wenn ein Template des Kickstart-Add-ons *Showtime* gerendert wird.

```php
/**
 * [immonex Kickstart Showtime] "zzgl. NK" bei (Netto)Kaltmiete ergänzen.
 */

add_filter( 'inx_property_core_data', 'mysite_extend_cold_rent', 10, 2 );

function mysite_extend_cold_rent( $core_data, $meta ) {
	if (
		isset( $meta['template'] )
		&& 'slideshow/property' === $meta['template']
		&& isset( $core_data['primary_price']['meta']['mapping_source'] )
		&& in_array(
			$core_data['primary_price']['meta']['mapping_source'],
			array( 'preise->kaltmiete', 'preise->nettokaltmiete' )
		)
	) {
		$core_data['primary_price']['value_formatted'] .= ' zzgl. NK';
	}

	return $core_data;
} // mysite_extend_cold_rent
```