# inx_property_location_map_options (Filter)

Über diesen Filter Hook können *anbieter-/variantenspezifische* **Standardvorgaben** für die Optionen bestimmter Objekte angepasst werden, die in der **JavaScript-Komponente** der Immobilien-Standortkarte ([Detailansicht](/komponenten/detailansicht)) instanziiert werden.

!> Dieser Filter Hook nur für spezielle Anpassungen **in Sonderfällen** vorgesehen.<br>Individuelle Optionen der Kartenkomponente werden üblicherweise per [Shortcode-Attribut](/komponenten/detailansicht?id=standortkarte) festgelegt, Beispiel: `[inx-property-details elements="location_map" options="maxZoom:14, opaque: false"]`

## Parameter

| Name | Beschreibung |
| ---- | ------------ |
| **`$defaults`** (array) | spezielle Optionen für das Standortkarten-JS-Element |

### Das Defaults-Array im Detail

Jedes Array-Hauptelement bezieht sich auf einen Kartentyp, der in den [Plugin-Optionen](/schnellstart/einrichtung?id=standortkarte) ausgewählt oder per [Attribut](/komponenten/detailansicht?id=standortkarte) `type` des Shortcodes [`[inx-property-details]`](/komponenten/detailansicht?id=detail-abschnitte-gruppierte-angaben) festgelegt werden kann.

Die jeweils verfügbaren Optionen sind abhängig vom Kartenanbieter bzw. dem für die Einbindung verwendeten System:

- [OpenStreetMap/OpenTopoMap via OpenLayers](https://openlayers.org/en/latest/apidoc/module-ol_source_OSM-OSM.html
) (`ol_osm_map_*`)
- [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/reference/map?hl=de#MapOptions) (`gmap_*`)

Die im Plugin enthaltenen Standardvorgaben umfassen nur einige grundlegende Optionen, d. h. bei Bedarf können weitere ergänzt werden, die in den o. g. Dokumentationsseiten aufgeführt sind.

```php
[
	'ol_osm_map_marker' => [
		'crossOrigin' => 'anonymous',
		'maxZoom' => 18,
		'opaque' => true
	],
	'ol_osm_map_german' => [
		'crossOrigin' => 'anonymous',
		'maxZoom' => 18,
		'opaque' => true,
		'url' => 'https://tile.openstreetmap.de/{z}/{x}/{y}.png',
		'attributions' => 'Daten von <a href="https://www.openstreetmap.org/">OpenStreetMap</a> - Veröffentlicht unter <a href="https://opendatacommons.org/licenses/odbl/">ODbL</a>'
	],
	'ol_osm_map_otm' => [
		'crossOrigin' => 'anonymous',
		'maxZoom' => 15,
		'opaque' => true,
		'url' => 'https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png',
		'attributions' => 'Kartendaten: © <a href="https://openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>-Mitwirkende, <a href="https://viewfinderpanoramas.org/" target="_blank">SRTM</a> | Kartendarstellung: © <a href="https://opentopomap.org" target="_blank">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/"">CC-BY-SA</a>)'
	],
	'gmap_marker' => [
		'mapTypeId' => 'roadmap',
		'disableDefaultUI' => true,
		'zoomControl' => true
	],
	'gmap_terrain' => [
		'mapTypeId' => 'terrain',
		'disableDefaultUI' => true,
		'zoomControl' => true
	],
	'gmap_hybrid' => [
		'mapTypeId' => 'hybrid',
		'disableDefaultUI' => true,
		'zoomControl' => true
	],
	'gmap_embed' => [
		'mapType' => 'roadmap'
	],
	'gmap_embed_sat' => [
		'mapType' => 'satellite'
	]
]
```

## Rückgabewert

angepasstes Standardvorgaben-Array

## Rahmenfunktion

[](_info-snippet-einbindung.md ':include')

```php
/**
 * [immonex Kickstart] Optionen für die Instanziierung der OpenLayers- bzw.
 * Google-Maps-Objekte der Standortkarten-JS-Elemente anpassen.
 */

add_filter( 'inx_property_location_map_options', 'mysite_modify_location_map_js_options' );

function mysite_modify_location_map_js_options( $defaults ) {
	// ...Vorgaben im Array $defaults anpassen...

	return $defaults;
} // mysite_modify_location_map_js_options
```

## Siehe auch

- [Kartentyp-Auswahl in den Plugin-Optionen](/schnellstart/einrichtung?id=standortkarte)
- [OpenLayers Source Optionen (OpenStreetMap/OpenTopoMap)](https://openlayers.org/en/latest/apidoc/module-ol_source_OSM-OSM.html
)
- [Google Maps JavaScript API Optionen](https://developers.google.com/maps/documentation/javascript/reference/map?hl=de#MapOptions)

[](_backlink.md ':include')