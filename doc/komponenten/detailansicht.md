# Detailansicht

## Standard-Template

Kickstart bzw. die verfügbaren [Skins](/anpassung-erweiterung/skins) enthalten eine **Seitenvorlage** für den [Immobilien-Beitragstyp](/beitragsarten-taxonomien), die alle wesentlichen Inhalte umfasst (inkl. Foto- und Grundriss-Galerien, [Standortkarten](/schnellstart/einrichtung#standortkarte), 360°-Panoramen, eingebundenen YouTube- oder Vimeo-Videos etc.). Hierfür ist keine weitergehende Konfiguration erforderlich.

?> Die Standard-Detailansicht kann auch durch die Ergänzung von **Widgets** in der zugehörigen [Sidebar](/schnellstart/sidebars) erweitert werden.

![Standard-Detailansicht](../assets/scst-property-details-1.jpg)

## Seite als Vorlage

**Alternativ** kann eine beliebige Seite als Rahmenvorlage verwendet werden, die unter ***immonex → Einstellungen → Allgemein*** ausgewählt wird (Option [Immobilien-Detailseite](/schnellstart/einrichtung#immobilien-detailseite)).

Innerhalb dieser Vorlageseite können die gewünschten Immobiliendetails dann per **Shortcode** - entweder komplett, gruppiert oder einzeln - eingefügt werden. Die Einbindung in Form von Absätzen (gruppierte Daten) und einzelnen Werten ist vor allem dann relevant, wenn das Rahmenlayout auf Basis diverser Containerelemente mit [Gutenberg](https://de.wordpress.org/gutenberg/) oder einer anderen Page-Builder-Lösung (Elementor, WPBakery Page Builder etc.) aufbaut, die mit unterschiedlichen Objektdaten befüllt werden sollen.

![Detailseiten-Layout mit Gutenberg](../assets/scst-gutenberg-layout-1.png)\
Beispiel: Detailseiten-Layout mit Gutenberg

![Gutenberg-Layout im Frontend](../assets/scst-gutenberg-layout-2.jpg)\
Gutenberg-Layout im Frontend

## Shortcodes

Die folgenden Shortcodes können mehrfach pro Seite verwendet werden.

### Detail-Abschnitte (gruppierte Angaben)

`[inx-property-details]`

Wie in den obigen Beispiel-Screenshots des [Standard-Templates](#standard-template) zu sehen ist, sind Immobilien-Detailseiten in der Regel in mehrere Abschnitte (a.k.a. *Elemente*) unterteilt, die die OpenImmo-Daten der importierten Objekte thematisch gruppiert und in einer passenden Form enthalten (z. B. Haupt-Beschreibungstext, Flächen, Ausstattung, Preise, Standort etc.).

Enthält der o. g. Shortcode **keine** Attribute, werden hiermit – analog zum [Standard-Template](#standard-template) – alle der folgenden Elemente eingebunden, die nicht als optional gekennzeichnet sind.

Soll die Ausgabe stattdessen nur bestimmte Abschnitte umfassen, kann der Umfang mit den nachfolgend beschriebenen [Attributen](#attribute) `elements` **oder** `exclude` festgelegt werden.

#### Elemente

| Key | Beschreibung |
| --- | ------------ |
| `head` (1) | Header mit Objekttitel, Nutzungs-/Objektart, Standort und Kerndaten |
| `gallery` (2) | **primäre** Fotogalerie, die standardmäßig auch Videos und virtuelle 360°-Touren enthält<br><br>Bei Verwendung des Standard-Skins werden Bilder in der passenden Größe hier per "*Ken-Burns-Effekt*" animiert, der unter ***immonex → Einstellungen → Layout & Design*** oder per [Filterfunktion (inx_detail_page_elements)](/anpassung-erweiterung/filter-inx-detail-page-elements) deaktiviert werden kann. |
| `main_description` (8) | Haupt-Beschreibungstext |
| `prices` | Preise und Angaben zur Courtage etc. |
| `areas` | Flächenangaben |
| `condition` | Angaben zum Zustand der Immobilie |
| `epass` | Daten des Energieausweises |
| `epass_images` | übermittelte Bildanhänge, die zum Energieausweis gehören |
| `epass_energy_scale` | Energieskala (grafische Visualisierung der Energieklasse), sofern das Plugin [immonex Energy Scale Pro](/systemvoraussetzungen#datenimport-amp-energieskalen) installiert ist |
| `location_map` (9) | Standortkarte (OpenStreetMap/OpenTopoMap oder Google Maps)<br><br>Typauswahl unter ***immonex → Einstellungen → Detailansicht → Standortkarte*** (alternativ auch per [Shortcode-Attribut](#standortkarte) oder Filterfunktion) |
| `location_description` (9) | Standortbeschreibung und -details |
| `location` | Kombination von `location_map` und `location_description`: Standortbeschreibung/-details **und** Karte (**optionales Element \***) |
| `features` (4) | Ausstattung der Immobilie (Beschreibung, Merkmale etc.) |
| `floor_plans` (5) | Grundriss-Galerie |
| `misc` | sonstige Angaben |
| `downloads_links` | Downloads (z. B. PDF-Dateien) und Links zu externen Websites |
| `video` | Immobilien-Video (**optionales Element \***, normalerweise Bestandteil der Galerie, s. o.) |
| `virtual_tour` | Virtuelle 360°-Tour - im Regelfall von einem externen Anbieter per iFrame eingebunden (**optionales Element \***, normalerweise Bestandteil der Galerie, s. o.) |
| `contact_person` (6) | Kontaktinformationen (5) |
| `footer` (7) | Footer mit Link zur Übersichtsseite |

**\* Optionale Elemente** werden nur bei expliziter Nennung im Shortcode-Attribut `elements` eingebunden.

#### Attribute

Bei diesem Shortcode wird zwischen allgemeinen, elementspezifischen und speziellen *Template-Parameter-Attributen* unterschieden.

##### Allgemein

Diese Attribute beziehen sich auf die komplette Shortcode-Ausgabe:

| Name | Beschreibung / Attributwerte |
| ---- | ---------------------------- |
| `elements` | Keys explizit **einzubindender** Detail-Abschnitte (optional) |
| `exclude` | Keys explizit **auszuschließender** Detail-Abschnitte (optional) |
| `enable-tabs` (3) | **tab-basierte Darstellung** der zentralen Info-Blöcke (siehe Screenshot), sofern vom gewählten Skin unterstützt (Umfang und Aufteilung können via Filter-Hook [inx_tabbed_content_elements](/anpassung-erweiterung/filter-inx-tabbed-content-elements) angepasst werden) |
| | *0* : deaktivieren (Standard bei Nutzung von `elements` oder `exclude`) |
| | *1* : aktivieren (Standard bei Einbindung aller Elemente) |
| `template` | alternative/benutzerdefinierte **Template-Datei** im Skin-Ordner zum Rendern der Inhalte verwenden (Dateiname ohne .php, z. B. *single-property/foobar*) |

##### Video

Für die [Elemente](#elemente) `gallery` und `video` relevante Attribute:

| Name | Beschreibung / Attributwerte |
| ---- | ---------------------------- |
| `autoplay` | YouTube-Videos automatisch starten: *0* (nein, Standard) oder *1* (ja) |
| `automute` | YouTube-Videos stummschalten: *1* (ja, Standard) oder *0* (nein) |
| `youtube-nocookie` | Domain ohne Tracking für YouTube-iFrames verwenden: *1* (ja, `www.youtube-nocookie.com`, Standard) oder *0* (nein, `www.youtube.com`) |
| `youtube-allow` | Inhalte des `allow`-Attributs für YouTube-iFrames (Standard: *accelerometer; encrypted-media; gyroscope*, zusätzlich *autoplay* sofern aktiviert) |

##### Standortkarte

Die folgenden Attribute beziehen sich auf die [Kartenelemente](#elemente) `location_map` und `location`. Hiermit können der Kartentyp und die Optik der enthaltene Markergrafik angepasst werden.

![Standard-Kartenmarker](../assets/standard-map-marker.png)\
Der Standard-Kartenmarker (*SVG*): Größe, Farbe, Linienstärke und Transparenzgrad können mit den `marker_*`-Attributen modifiziert werden.

!> Der reguläre Typ der Standortkarte wird in den [Plugin-Optionen](/schnellstart/einrichtung?id=standortkarte) festgelegt, eine Änderung per Shortcode-Attribut ist nur in Sonderfällen notwendig.

| Name | Beschreibung / Attributwerte |
| ---- | ---------------------------- |
| `type` | Kartenanbieter/-stil (überschreibt den in den Plugin-Optionen [ausgewählten Kartentyp](/schnellstart/einrichtung?id=standortkarte)) |
| | *ol_osm_map_marker* : OpenStreetMap-Straßenkarte mit Marker |
| | *ol_osm_map_german* : OpenStreetMap-Straßenkarte mit Marker, [deutscher Stil](https://openstreetmap.de/germanstyle/) (**Standardvorgabe**) |
| | *ol_osm_map_otm* : topographische Karte mit Höhenrelief und Marker auf Basis von OpenTopoMap/OpenStreetMap |
| | *gmap_marker* : Google Map mit Marker (Straßenkarte) |
| | *gmap_terrain* : Google Map *Terrain* mit Marker (topographische Ansicht mit Straßenkarten-Ebene) |
| | *gmap_hybrid* : Google Map *Hybrid* mit Marker (Satellitenbilder mit Straßenkarten-Ebene) |
| | *gmap_embed* : Google Umgebungskarte mit Ort oder Stadtteil (Straßenkarten) |
| | *gmap_embed_sat* : Google Umgebungskarte mit Ort oder Stadtteil (Satellitenbilder mit Straßenkarten-Ebene) |
| `template` | alternative **PHP**-Template-Datei im [Skin-Ordner](/anpassung-erweiterung/skins) (relativer Pfad, Standard: *property-list/map*) |
| `marker_fill_color` | Marker-Füllfarbe (Standard: <span style="font-weight:500; font-style:italic; color:#E77906">#E77906</span>) |
| `marker_fill_opacity` | Marker-Transparenz (*0 - 1*, Standard: *0.8*) |
| `marker_stroke_color` | Marker-Linienfarbe (Standard: <span style="font-weight:500; font-style:italic; color:#404040">#404040</span>) |
| `marker_stroke_width` | Marker-Linienstärke (Standard: *3*) |
| `marker_scale` | Marker-Skalierung (*0 - 1*, Standard: *0.75*) |
| `marker_icon_url` | URL einer **alternativen** PNG-Markergrafik, die anstelle der Standard-SVG-Variante verwendet werden soll (Ist die Datei `images/map-location-pin.png`) im [Skin-Ordner](/anpassung-erweiterung/skins) enthalten, wird diese automatisch übernommen.) |
| `google_api_key` | API-Schlüssel für die Nutzung der Google Maps JavaScript und APIs (überschreibt die in den [Plugin-Optionen](/schnellstart/einrichtung?id=google-maps-api-key) hinterlegte Angabe) |
| `options` | zusätzliche Optionen für die JavaScript-Karten-Objekte als kommagetrennte Liste von Key/Value-Paaren – abhängig vom Kartentyp bzw. der Plattform dahinter (Beispiel: *maxZoom: 15, opaque: false*) |
| | *ol_osm_\** : [OpenLayers/OpenStreetMap](https://openlayers.org/en/latest/apidoc/module-ol_source_OSM-OSM.html) |
| | *gmap_[marker\|terrain\|hybrid]* : [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/reference/map?hl=de#MapOptions) |

##### Template-Parameter

Variable Daten werden in den PHP-Template-Dateien des [Skins](/anpassung-erweiterung/standard-skin) für die Ausgabe im Website-Frontend in einem Array namens `$template_data` bereitgestellt. Bei diesem Shortcode besteht die Möglichkeit, bestimmte Inhalte dieses Arrays per Attribut zu ergänzen bzw. anzupassen. Das kann **in Sonderfällen** nützlich sein kann, bspw. wenn eine vom Plugin vorgegebene Standardbezeichnung ersetzt werden soll.

Ein Beispiel: Es soll ein Abschnitt eingebunden werden, der die Energieausweis-Daten der Immobilie enthält. Anstatt dem Standardtitel "Energieausweis" (→ `$template_data['headline']`) soll dieser mit der alternativen Überschrift "Energieeffizienz" versehen werden: 

Der Key des *Array-Elements* wird in diesem Fall eins zu eins als Attributname übernommen:

`[inx-property-details elements="epass" headline="Energieeffizenz"]`

Werden mit einem Shortcode anstatt eines einzelnen mehrere Elemente eingebunden, müssen die betr. Attributnamen durch Voranstellen des Elementnamens gefolgt von einem `-` erweitert werden, um eine eindeutige Zuordnung zu gewährleisten: `ELEMENTNAME-ARRAY_KEY`

Hierzu ein weiteres Beispiel mit den Überschriften "Energieeffizienz" für den Energieausweis-Abschnitt und "Grundrisse/Lagepläne" für die Grundriss-Galerie:

`[inx-property-details elements="epass, floor_plans" epass-headline="Energieeffizenz" floor_plans-headline="Grundrisse/Lagepläne"]`

#### Beispiele

alle Abschnitte außer Header und Footer + tab-basierte Darstellung:\
`[inx-property-details exclude="head, footer" enable-tabs=1]`

nur Energieausweis-Abschnitte:\
`[inx-property-details elements="epass, epass_images, epass_energy_scale"]`

### Einzelne Angaben

`[inx-property-detail-element name="ELEMENT_ODER_FELDNAME"]`

Eine *granularere* Form der Einbindung der Immobilien-Details ist mit diesem Shortcode möglich. Die Auswahl des anzuzeigenden Wertes kann hierbei entweder auf Basis der von der [OpenImmo-Schnittstelle](/schnellstart/import) genutzten *Mapping-Tabelle* (Element- bzw. Custom-Field-Name) oder mit einer XML-Pfadangabe ([XPath](https://de.wikipedia.org/wiki/XPath)).

![Ausschnitt aus der OpenImmo2WP-Mapping-Tabelle für Kickstart](../assets/scst-mapping-1.png)\
Ausschnitt aus der [OpenImmo2WP](https://plugins.inveris.de/shop/immonex-openimmo2wp/)-Mapping-Tabelle für Kickstart

#### Attribute

| Name | Beschreibung / Attributwerte |
| ---- | ---------------------------- |
| `name` | einzubindendes Detailelement als... |
| | **Mapping-Name**, z. B. *freitexte.objektbeschreibung* (Bezeichnung, die in der Spalte *Name* der *Mapping-Tabelle* hinterlegt ist, die für den [OpenImmo-Import](/schnellstart/import) eingesetzt wird) |
| | **Custom-Field-Name**, z. B. *\_inx_property_id* (Name des als Zielfeld in der Spalte *Destination* der Import-Mapping-Tabelle hinterlegten **Custom Fields**) |
| | [XPath-Angabe](https://de.wikipedia.org/wiki/XPath) zur Abfrage eines beliebigen Werts innerhalb des **Import-XML-Elements** `<immobilie>` des Objekts, z. B. *//zustand_angaben/baujahr* (beginnt immer mit `//`) |
| `group` | in der Mapping-Tabelle angegebene **Gruppenbezeichnung** als Ergänzung zum Elementnamen - wird nur in Sonderfällen benötigt (optional) |
| `template` | Vorlage für die Ausgabe, in der folgende Platzhalter verwendet werden können (optional) |
| | *{value}* : Wert des Elements |
| | *{value,number,2}* : Variante des Elementwerts, formatiert als Zahl mit der angegebenen Anzahl an Nachkommastellen |
| | *{title}* : Bezeichnung des Elements aus der entsprechenden *Title-Spalte* der Mapping-Tabelle, sofern vorhanden |
| | *{title,: }* : Variante der Bezeichnung mit einem Zusatztext (im Beispiel: *Doppelpunkt und Leerzeichen*), der angehangen wird, wenn ein Titel verfügbar ist |
| | *{currency}* : Standard-Währung, z. B. *EUR* (➞ [Plugin-Optionen](/schnellstart/einrichtung)) |
| | *{currency_symbol}* : Standard-Währungssymbol, z. B. *€* (➞ [Plugin-Optionen](/schnellstart/einrichtung)) |
| | *{area_unit}* : Standard-Flächeneinheit, im Regelfall *m²* (➞ [Plugin-Optionen](/schnellstart/einrichtung)) |
| `type` | Typ des Elements, mit dem ein **vordefiniertes** Template für die Ausgabe ausgewählt werden kann (optional) |
| | *price* : formatierte Preisangabe inkl. Währung, z. B. *350.000,00 €* (entspricht dem Template `{value,number,2} {currency_symbol}`) |
| | *area* : formatierte Flächenangabe, z. B. *814,00 m²* (entspricht dem Template `{value,number,2} {area_unit}`) |
| `convert_urls` | Wert *1* zum Konvertieren enthaltener URLs in Links (optional) |
| `if_empty` | auszugebender **Alternativtext**, falls das Element leer oder nicht verfügbar ist (optional) |
| `post_id` | **optionale** Angabe einer alternativen Immobilien-Beitrags-ID (Standard: ID des aktuellen Objekts) |

#### Beispiele

Wohnfläche anzeigen (formatiert mit zwei Nachkommastellen und Flächeneinheit):\
`[inx-property-detail-element name="wohnflaeche" type="area"]`

Primäre Preisangabe anhand des Custom-Field-Namens abrufen und formatiert anzeigen:\
`[inx-property-detail-element name="_inx_primary_price" type="price"]`

Alternative Variante der Preiseinbindung mit identischer Ausgabe:\
`[inx-property-detail-element name="primaerpreis" template="{value,number,2} {currency_symbol}"]`

Kaufpreis pro m² per [XPath](https://de.wikipedia.org/wiki/XPath)-Angabe ermitteln und Alternativtext anzeigen, falls nicht verfügbar:\
`[inx-property-detail-element name="//preise/kaufpreis_pro_qm" if_empty="auf Anfrage"]`

?> Weitergehende individuelle Anpassungen der Ausgabe einzelner Angaben können über den Filter-Hook [`inx_property_detail_element_output`](/anpassung-erweiterung/filter-inx-property-detail-element-output) realisiert werden.

## Erweiterte Anpassungen

- [Filter-Referenz](/anpassung-erweiterung/filters-actions#detailansicht)
- [Templates](/anpassung-erweiterung/skins#partiell)
- [Custom Skin](/anpassung-erweiterung/standard-skin#detailansicht)
