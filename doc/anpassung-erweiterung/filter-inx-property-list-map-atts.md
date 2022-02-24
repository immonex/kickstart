---
title: Abfrage/Rendering-Attribute von Standortkarten (Filter)
search: 1
---

# inx_property_list_map_atts (Filter)

Mit diesem Filter können die für die Generierung einer [Kartenansicht](../komponenten/karte.html) relevanten Attribute angepasst werden.

## Parameter

| Name | Beschreibung |
| ---- | ------------ |
| `$atts` | Array der Abfrage/Rendering-Attribute |

### Das Attribut-Array im Detail

Die Attributliste enthält neben den geo- bzw. kartenspezifischen Angaben (Breitengrad, Längengrad, Zoom etc.) u. a. auch die für die Abfrage der darzustellenden Immobilien(standorte) maßgeblichen Parameter (*inx-...*).

```php
[
	'lat' => '49.858784',
	'lng' => '6.785441',
	'zoom' => '12',
	'require-consent' => true,
	'marker_set_id' => 'inx-property-map',
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
	'render_count' => 1
]
```

## Rückgabewert

angepasstes Attribut-Array

## Rahmenfunktion

Eine Funktion zur Nutzung des Filters wird typischerweise in der folgenden Form in der Datei **functions.php** des **Child-Themes** oder per Code-Snippets-Plugin eingebunden.

```php
add_filter( 'inx_property_list_map_atts', 'mysite_modify_property_map_atts' );

function mysite_modify_property_map_atts( $atts ) {
	// ...Attribute im Array $atts anpassen...

	return $atts;
} // mysite_modify_property_map_atts
```