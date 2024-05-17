# inx_property_list_map_atts (Filter)

Mit diesem Filter können die für die Generierung einer [Immobilien-Übersichtskarte](/komponenten/karte) relevanten Attribute angepasst werden.

## Parameter

| Name | Beschreibung |
| ---- | ------------ |
| **`$atts`** (array) | Abfrage/Rendering-Attribute |

### Das Attribut-Array im Detail

Die Attributliste enthält neben den geo- bzw. kartenspezifischen Angaben (Kartentyp, Breitengrad, Längengrad, Zoom etc.) u. a. auch die für die Abfrage der darzustellenden Immobilienstandorte maßgeblichen Parameter (*inx-...*).

![Standard-Kartenmarker](../assets/standard-map-marker.png)\
Standard-Kartenmarker (*SVG*)

Die Optik der [Standortmarker](/komponenten/karte?id=marker) kann über die Elemente `marker_*` (außer `marker_set_id`) angepasst werden.

Das Element `options` enthält die Standardvorgaben für das [OpenLayers-Source-Objekt](https://openlayers.org/en/latest/apidoc/module-ol_source_Source-Source.html) der [JS-Übersichtskarten-Komponente](/komponenten/karte), die abhängig vom Kartentyp sind (`type`). Letzterer wird standardmäßig in den [Plugin-Optionen](/schnellstart/einrichtung?id=%c3%9cbersichtskarten) ausgewählt, kann alternativ aber auch per [Shortcode-Attribut](/komponenten/karte?id=attribute) festgelegt werden.

```php
[
	'type' => 'osm_german',
	'options' => [
		'crossOrigin' => 'anonymous',
		'maxZoom' => 19,
		'opaque' => true,
		'url' => 'https://tile.openstreetmap.de/{z}/{x}/{y}.png',
		'attributions'=> 'Daten von <a href="https://www.openstreetmap.org/">OpenStreetMap</a> - Veröffentlicht unter <a href="https://opendatacommons.org/licenses/odbl/">ODbL</a>'
	],
	'lat' => '49.858784',
	'lng' => '6.785441',
	'zoom' => '12',
	'auto_fit' => true,
	'require-consent' => true,
	'marker_set_id' => 'inx-property-map',
	'marker_fill_color' => '#E77906',
	'marker_fill_opacity' => .8,
	'marker_stroke_color' => '#404040',
	'marker_stroke_width' => .3,
	'marker_scale' => .75,
	'marker_icon_url' => '',
	'google_api_key' => '',
	'cid' => 'inx-property-map',
	'inx-limit' => '',
	'inx-limit-page' => '',
	'inx-sort' => '',
	'inx-order' => '',
	'inx-references' => '',
	'inx-available' => '',
	'inx-sold' => '',
	'inx-reserved' => '',
	'inx-featured' => '',
	'inx-front-page-offer' => '',
	'inx-demo' => '',
	'inx-backlink-url' => '',
	'inx-iso-country' => '',
	'inx-author' => '',
	'inx-ref' => '',
	'inx-force-lang' => '',
	'inx-agency' => '',
	'inx-agent' => '',
	'inx-primary-agent' => '',
	'inx-search-title-desc' => '',
	'inx-search-description' => '',
	'inx-search-type-of-use' => '',
	'inx-search-property-type' => '',
	'inx-search-marketing-type' => '',
	'inx-search-locality' => '',
	'inx-search-min-rooms' => '',
	'inx-search-min-area' => '',
	'inx-search-price-range' => '',
	'inx-search-submit' => '',
	'inx-search-reset' => '',
	'inx-search-toggle-extended' => '',
	'inx-search-distance-search-location' => '',
	'inx-search-distance-search-radius' => '',
	'inx-search-features' => '',
	'inx-search-labels' => '',
	'render_count' => true
]
```

## Rückgabewert

angepasstes Attribut-Array

## Rahmenfunktion

[](_info-snippet-einbindung.md ':include')

```php
/**
 * [immonex Kickstart] Attribute für die Generierung der Übersichtskarte anpassen.
 */

add_filter( 'inx_property_list_map_atts', 'mysite_modify_property_list_map_atts' );

function mysite_modify_property_list_map_atts( $atts ) {
	// ...Attribute im Array $atts anpassen...

	return $atts;
} // mysite_modify_property_list_map_atts
```

## Siehe auch

- [inx_property_list_map_options](filter-inx-property-list-map-options) (Standardvorgaben für das Quellobjekt der JS-Übersichtskarten-Komponente)


[](_backlink.md ':include')