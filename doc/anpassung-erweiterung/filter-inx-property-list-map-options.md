# inx_property_list_map_options (Filter)

Über diesen Filter Hook können die *anbieter-/variantenspezifischen* **Standardvorgaben** für die Optionen der [OpenLayers-Source-Objekte](https://openlayers.org/en/latest/apidoc/module-ol_source_Source-Source.html) angepasst werden, die in der **JavaScript-Komponente** der [Immobilien-Übersichtskarte](/komponenten/karte) instanziiert werden.

!> Dieser Filter Hook bezieht sich auf das **OpenLayers-Quellobjekt** auf der **JavaScript-Ebene** und ist nur für spezielle Anpassungen **in Sonderfällen** vorgesehen.<br>Individuelle Optionen der Kartenkomponente werden üblicherweise per [Shortcode-Attribut](/komponenten/karte?id=attribute) festgelegt, Beispiel: `[inx-property-map options="maxZoom: 15, opaque: false"]`<br>Erweiterte Möglichkeiten hierfür bietet alternativ auch der Hook [`inx_property_list_map_atts`](filter-inx-property-list-map-atts).

## Parameter

| Name | Beschreibung |
| ---- | ------------ |
| **`$defaults`** (array) | speziell Optionen für das Übersichtskarten-JS-Element |

### Das Defaults-Array im Detail

Jedes Array-Hauptelement bezieht sich auf einen Kartentyp, der in den [Plugin-Optionen](/schnellstart/einrichtung?id=%c3%9cbersichtskarten) ausgewählt oder per [Attribut](/komponenten/karte?id=attribute) `type` des Shortcodes [`[inx-property-map]`](/komponenten/karte?id=shortcode) festgelegt werden kann.

Die jeweils verfügbaren Optionen sind abhängig vom gewählten Kartenanbieter:

- [OpenStreetMap/OpenTopoMap](https://openlayers.org/en/latest/apidoc/module-ol_source_OSM-OSM.html
) (`osm*`)
- [Google Maps](https://openlayers.org/en/latest/apidoc/module-ol_source_Google-Google.html) (`gmap*`)

Die im Plugin enthaltenen Standardvorgaben umfassen nur einige grundlegende Optionen, d. h. bei Bedarf können weitere ergänzt werden, die in den o. g. Dokumentationsseiten aufgeführt sind.

```php
[
	'osm' => [
		'crossOrigin' => 'anonymous',
		'maxZoom' => 19,
		'opaque' => true
	],
	'osm_german' => [
		'crossOrigin' => 'anonymous',
		'maxZoom' => 19,
		'opaque' => true,
		'url' => 'https://tile.openstreetmap.de/{z}/{x}/{y}.png',
		'attributions' => 'Daten von <a href="https://www.openstreetmap.org/">OpenStreetMap</a> - Veröffentlicht unter <a href="https://opendatacommons.org/licenses/odbl/">ODbL</a>'
	],
	'osm_otm' => [
		'crossOrigin' => 'anonymous',
		'maxZoom' => 15,
		'opaque' => true,
		'url' => 'https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png',
		'attributions' => 'Kartendaten: © <a href="https://openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>-Mitwirkende, <a href="https://viewfinderpanoramas.org/" target="_blank">SRTM</a> | Kartendarstellung: © <a href="https://opentopomap.org" target="_blank">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/"">CC-BY-SA</a>)'
	],
	'gmap' => [
		'mapType' => 'roadmap',
		'language' => 'de-DE',
		'region' => 'DE'
	],
	'gmap_terrain' => [
		'mapType' => 'terrain',
		'language' => 'de-DE',
		'region' => 'DE',
		'layerTypes' => [ 'layerRoadmap' ]
	],
	'gmap_hybrid' => [
		'mapType' => 'satellite',
		'language' => 'de-DE',
		'region' => 'DE',
		'layerTypes' => [ 'layerRoadmap' ]
	]
]
```

## Rückgabewert

angepasstes Standardvorgaben-Array

## Rahmenfunktion

[](_info-snippet-einbindung.md ':include')

```php
/**
 * [immonex Kickstart] Optionen für die Instanziierung der OpenLayers-Source-Objekte
 * (Übersichtskarten-JS-Komponente) anpassen.
 */

add_filter( 'inx_property_list_map_options', 'mysite_modify_list_map_js_options' );

function mysite_modify_list_map_js_options( $defaults ) {
	// ...Vorgaben im Array $defaults anpassen...

	return $defaults;
} // mysite_modify_list_map_js_options
```

## Siehe auch

- [Kartentyp-Auswahl in den Plugin-Optionen](/schnellstart/einrichtung?id=%c3%9cbersichtskarten)
- Filter [inx_property_list_map_atts](filter-inx-property-list-map-atts) (Abfrage/Rendering-Attribute der Kartenansicht)
- OpenLayers-Source-Dokumentation
  - [OpenStreetMap](https://openlayers.org/en/latest/apidoc/module-ol_source_OSM-OSM.html
)
  - [Google Maps](https://openlayers.org/en/latest/apidoc/module-ol_source_Google-Google.html)

[](_backlink.md ':include')