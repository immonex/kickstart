# Übersichtskarte

Kickstart stellt eine dynamische Kartenansicht auf [OpenStreetMap- oder Google-Maps-Basis](#anbieterdienste) für die Darstellung beliebig vieler Immobilienstandorte bereit, die als Einzelkomponente oder in Kombination mit einer [Listenansicht](liste) und/oder einem [Suchformular](suchformular) eingesetzt werden kann.

In der [Standard-Übersichtsseite](/beitragsarten-taxonomien#immobilien-beiträge) wird eine Karte dieser Art angezeigt, sofern in den Plugin-Optionen ein [Kartentyp](/schnellstart/einrichtung?id=kartentyp) ausgewählt wurde (Standardeinstellung: *OpenStreetMap-Straßenkarte, deutscher Stil*).

!> In der [Detailansicht](detailansicht) ist ebenfalls eine Kartenansicht enthalten, die aber unabhängig von dieser Übersichtskarte gerendert wird.

![Übersichtskarte mit Immobilien-Standortmarkern (OpenStreetMap Straßenkarte)](../assets/scst-property-map-1.png)\
Beispiel: Straßenkarte mit Immobilien-Standortmarkern (OpenStreetMap)

## Marker

![Standard-Kartenmarker](../assets/standard-map-marker.png)\
Standard-Kartenmarker (*SVG*) in Originalgröße (Standardgröße in Karten: 75%)

Die Standorte werden in Form von klickbaren Markern und zugehörigen Pop-Ups dargestellt, die Fotos und Detail-Links enthalten. Grundlage für die Darstellung der Marker ist eine skalierbare Grafik (*SVG*), deren Größe, Farben, Transparenzgrad und Linienstärke per [Attribut](#attribute) (`marker_*`) oder Filterfunktion ([`inx_property_list_map_atts`](/anpassung-erweiterung/filter-inx-property-list-map-atts)) angepasst werden können.

Alternativ kann auch eine eigene Markergrafik (*PNG*-Datei) verwendet werden, die entweder mit dem Namen `map-location-pin.png` im Unterordner `images` des [Skin-Ordners](/anpassung-erweiterung/standard-skin?id=archiv-amp-listenansicht) hinterlegt ...

`.../wp-content/themes/(CHILD-)THEME-NAME/immonex-kickstart/[CUSTOM-SKIN-NAME bzw. default]/images/map-location-pin.png`

... oder per [Shortcode-Attribut](#attribute) (`marker_icon_url`) bzw. Filterfunktion ([`inx_property_list_map_atts`](/anpassung-erweiterung/filter-inx-property-list-map-atts)) definiert wird.

Abhängig von der Zoomstufe und der Anzahl der enthaltenen Immobilien erfolgt ein *Clustering*, bei dem mehrere Standorte – inkl. Anzeige der jeweiligen Objektanzahl – in einem Marker zusammengefasst werden.

## Kartenausschnitt

Sofern die [betreffende Option](/schnellstart/einrichtung?id=%c3%9cbersichtskarten) (***Auto-Kartengrenzen***) aktiviert ist, wird der Kartenausschnitt anhand der Koordinaten der enthaltenen Immobilien automatisch ermittelt. Ist das nicht der Fall oder enthält die Karte keine Marker, wird auf die ebenfalls in den [Plugin-Optionen](/schnellstart/einrichtung#karten-in-immobilien-listenseiten) hinterlegten Standard-Koordinaten zurückgegriffen.

## Nutzereinwilligung

Das Laden der Karte muss durch eine (einmalige) Nutzer-Einwilligung bestätigt werden, sofern [diese Option](/schnellstart/einrichtung?id=benutzereinwilligung) nicht deaktiviert wurde:

![Nutzereinwilligung](../assets/scst-property-map-consent.png)

## Anbieter/Dienste

Die grundlegende Optik ist abhängig vom Geodaten-Anbieter bzw. -Dienst, der in den [Plugin-Optionen](/schnellstart/einrichtung?id=%c3%9cbersichtskarten) oder per [Shortcode-Attribut](#attribute) ausgewählt werden kann:

- OpenStreetMap ([openstreetmap.de](https://www.openstreetmap.de/)/[openstreetmap.org](https://www.openstreetmap.org/))
- [OpenTopoMap](https://opentopomap.org/) ([OSM-Wiki](https://wiki.openstreetmap.org/wiki/DE:OpenTopoMap))
- [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview?hl=de)

### Beispiele

![Topographische Karte mit Immobilien-Standortmarkern (Google Maps Terrain)](../assets/scst-property-map-2.png)\
Topographische Karte mit Höhenrelief (Google Maps *Terrain*)

![Satellitenbilder mit Straßenkartenebene (Google Maps Hybrid)](../assets/scst-property-map-3.png)\
Kombinierte Satelliten- und Straßenkartenansicht (Google Maps *Hybrid*)

## Shortcode

`[inx-property-map]`

### Attribute

Die Attribute, mit denen Art und Umfang der in der Karte anzuzeigenden Immobilienmarker bestimmt werden können, entsprechen weitestgehend denen der [Listenansicht](liste?id=attribute).

Hinzu kommen die folgenden (**optionalen**) geospezifischen Angaben:

| Name | Beschreibung / Attributwerte |
| ---- | ----------------------------- |
| `type` | [Kartenanbieter/-stil](anbieterdienste) \* |
| | *osm* : OpenStreetMap-Straßenkarte |
| | *osm_german* : OpenStreetMap-Straßenkarte, [deutscher Stil](https://openstreetmap.de/germanstyle/) (**Standardvorgabe**) |
| | *osm_otm* : topographische Karte mit Höhenrelief auf Basis von OpenTopoMap/OpenStreetMap |
| | *gmap* : Google Map (Straßenkarte) |
| | *gmap_terrain* : Google Map *Terrain* (topographische Ansicht mit Straßenkarten-Ebene) |
| | *gmap_hybrid* : Google Map *Hybrid* (Satellitenbilder mit Straßenkarten-Ebene) |
| `template` | alternative **PHP**-Template-Datei im [Skin-Ordner](/anpassung-erweiterung/skins) (relativer Pfad, Standard: *property-list/map*) |
| `auto_fit` | Kartenausschnitt und Zoomstufe anhand der enthaltenen Marker automatisch anpassen \* / \** |
| | *1* : aktivieren |
| | *0* : deaktivieren |
| `lat` | Standard-Breitengrad des Karten-Mittelpunkts als **Float-Wert** (-90 bis 90), z. B. *49.8587840* \* / \** |
| `lng` | Standard-Längengrad des Karten-Mittelpunkts als **Float-Wert** (-180 bis 180), z. B. *6.7854410* \* / \** |
| `zoom` | Initial-Zoomstufe der Karte als **Ganzzahl** (8 bis 18) \* / \** |
| `require-consent` | [Benutzereinwilligung](/schnellstart/einrichtung#benutzereinwilligung) vor Einbettung der Karte aktivieren (*1*) oder deaktivieren (*0*) \* |
| `google_api_key` | API-Schlüssel für die Nutzung der Google Maps JavaScript API \* |
| `marker_fill_color` | Marker-Füllfarbe (Standard: <span style="font-weight:500; font-style:italic; color:#E77906">#E77906</span>) |
| `marker_fill_opacity` | Marker-Transparenz (*0 - 1*, Standard: *0.8*) |
| `marker_stroke_color` | Marker-Linienfarbe (Standard: <span style="font-weight:500; font-style:italic; color:#404040">#404040</span>) |
| `marker_stroke_width` | Marker-Linienstärke (Standard: *3*) |
| `marker_scale` | Marker-Skalierung (*0 - 1*, Standard: *0.75*) |
| `marker_icon_url` | URL einer **alternativen** PNG-Markergrafik, die anstelle der Standard-SVG-Variante verwendet werden soll (Ist die Datei `images/map-location-pin.png`) im [Skin-Ordner](/anpassung-erweiterung/skins) enthalten, wird diese automatisch übernommen.) |
| `options` | zusätzliche Optionen für die Instanziierung des **Quellobjekts** der [OpenLayers](https://openlayers.org/)-basierten JavaScript-Kartenkomponente ([OSM](https://openlayers.org/en/latest/apidoc/module-ol_source_OSM-OSM.html)/[Google Maps](https://openlayers.org/en/latest/apidoc/module-ol_source_Google-Google.html)) als kommagetrennte Liste von Key/Value-Paaren<br>Beispiel: *maxZoom: 14, opaque: true* |

\* überschreibt die jeweilige Einstellung der [Plugin-Optionen](/schnellstart/einrichtung?id=%c3%9cbersichtskarten)

\** Mittelpunkt und Zoom der Karte werden normalerweise™ anhand der Koordinaten der enthaltenen Standortmarker automatisch ermittelt.

##### Beispiel

Karte mit Häusern und Initial-Zoomstufe 14:\
`[inx-property-map property-type="haeuser" zoom=14]`

## Erweiterte Anpassungen

- [Filter-Referenz](/anpassung-erweiterung/filters-actions?id=%c3%9cbersichtskarten)
- [Templates](/anpassung-erweiterung/skins#partiell)
- [Custom Skin](/anpassung-erweiterung/standard-skin#archiv-amp-listenansicht)