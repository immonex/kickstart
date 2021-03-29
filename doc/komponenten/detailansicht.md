---
title: Detailansicht
category: komponenten
order: 60
search: 1
---

# Detailansicht

## Standard-Template

Kickstart bzw. die verfügbaren [Skins](../anpassung-erweiterung/skins.html) enthalten eine **Seitenvorlage** für den [Immobilien-Beitragstyp](../beitragsarten-taxonomien.html), die alle wesentlichen Inhalte umfasst (inkl. Foto- und Grundriss-Galerien, [Standortkarten](../schnellstart/einrichtung.html#Karten-amp-Umkreissuche), 360°-Panoramen, eingebundenen YouTube- oder Vimeo-Videos etc.). Hierfür ist keine weitergehende Konfiguration erforderlich.

> Die Standard-Detailansicht kann auch durch die Ergänzung von **Widgets** in der zugehörigen [Sidebar](../schnellstart/sidebars.html) erweitert werden.

![Standard-Detailansicht](../assets/scst-property-details-1.jpg)

## Seite als Vorlage

**Alternativ** kann eine beliebige Seite als Rahmenvorlage verwendet werden, die unter ***immonex → Einstellungen → Allgemein*** ausgewählt wird (Option [Immobilien-Detailseite](../schnellstart/einrichtung.html#Immobilien-Detailseite)).

Innerhalb dieser Vorlageseite können die gewünschten Immobiliendetails dann per **Shortcode** - entweder komplett oder auch **absatzweise** - eingefügt werden. Letzteres ist vor allem dann relevant, wenn das Rahmenlayout auf mehreren per [Gutenberg](https://de.wordpress.org/gutenberg/) oder einer anderen Page-Builder-Lösung erstellten Block-Elementen aufbaut, die mit unterschiedlichen Objektdaten befüllt werden sollen.

![Detailseiten-Layout mit Gutenberg](../assets/scst-gutenberg-layout-1.png)
Beispiel: Detailseiten-Layout mit Gutenberg

![Gutenberg-Layout im Frontend](../assets/scst-gutenberg-layout-2.jpg)
Gutenberg-Layout im Frontend

## Shortcode

`[inx-property-details]`

Der Shortcode kann mehrfach pro Seite verwendet werden. Ohne Attribute werden - analog zum Standard-Template - alle Detail-Abschnitte eingebunden.

### Attribute

Sollen nur bestimmte Detail-Abschnitte eingebunden werden, kann der entsprechende Umfang mit den Attributen `elements` **oder** `exclude` festgelegt werden (einzeln oder als kommagetrennte Liste).

| Name | Beschreibung / Attributwerte |
| ---- | ---------------------------- |
| `elements` | explizit **einzubindende** Detail-Abschnitte (optional) |
| `exclude` | explizit **auszuschließende** Detail-Abschnitte (optional) |
| `enable-tabs` (3) | **tab-basierte Darstellung** der zentralen Info-Blöcke (siehe Screenshot), sofern vom gewählten Skin unterstützt (Umfang und Aufteilung können via Filter-Hook [inx_tabbed_content_elements](../anpassung-erweiterung/filter-inx-tabbed-content-elements.html) angepasst werden) |
| | *0*: deaktivieren (Standard bei Nutzung von `elements` oder `exclude`) |
| | *1*: aktivieren (Standard bei Einbindung aller Elemente) |

#### Template-Parameter per Attribut setzen

Eine Besonderheit stellt bei diesem Shortcode die Möglichkeit dar, **Template-Parameter** durch die Ergänzung beliebiger weiterer Attribute "durchzuschleifen". Das kann in **Sonderfällen** nützlich sein, bspw. wenn mit einem Element gleichzeitig eine **alternative** Überschrift (`headline`) für dessen Abschnitt übergeben werden soll.

Beispiel: Energieausweis-Daten mit Überschrift "Energieeffizienz" einbinden
`[inx-property-details elements="epass" headline="Energieeffizenz"]`

Die Angabe "Energieeffizienz" ist so bei der Ausgabe des betreffenden Templates der Energieausweis-Daten ([PHP-Datei im Skin](../anpassung-erweiterung/skins.html)) im Template-Daten-Array verfügbar, wobei der **Key dem Attributnamen entspricht**: `$template_data['headline']`

Werden mit einem Shortcode mehrere Elemente gleichzeitig eingebunden, für die jeweils eigene Template-Parameter übergeben werden sollen, enthält der jeweilige **Attributname** den zugehörigen **Elementnamen als Präfix**: `ELEMENTNAME-KEY`

Beispiel: Energieausweis-Daten mit Überschrift "Energieeffizienz" und Grundriss-Galerie mit Überschrift "Grundrisse" einbinden
`[inx-property-details elements="epass, floor_plans" epass-headline="Energieeffizenz" floor_plans-headline="Grundrisse"]`


(Eventuell vorhandene Standardwerte werden von den per Attribut übermittelten Angaben überschrieben.)

#### Elemente (Detail-Abschnitte)

Folgende Schlüssel können als **Attributwerte** für `elements` und `exclude` übernommen werden, wobei jeder <i>Key</i> für einen bestimmten Abschnitt steht.

| Key | Beschreibung |
| --- | ------------ |
| `head` (1) | Header mit Objekttitel, Nutzungs-/Objektart, Standort und Kerndaten |
| `gallery` (2) | primäre Fotogalerie |
| `main_description` (8) | Haupt-Beschreibungstext |
| `prices` | Preise und Angaben zur Courtage etc. |
| `areas` | Flächenangaben |
| `condition` | Angaben zum Zustand der Immobilie |
| `epass` | Daten des Energieausweises |
| `epass_images` | übermittelte Bildanhänge, die zum Energieausweis gehören |
| `epass_energy_scale` | Energieskala (grafische Visualisierung der Energieklasse), sofern das Plugin [immonex Energy Scale Pro](../systemvoraussetzungen.html#Datenimport-amp-Energieskalen) installiert ist |
| `location_map` (9) | Standortkarte |
| `location_description` (9) | Standortbeschreibung und -details |
| `location` | Kombination von `location_map` und `location_description`: Standortbeschreibung/-details **und** Karte (**optionales Element** ➞ Anzeige nur bei expliziter Nennung im Shortcode-Attribut `elements`) |
| `features` (4) | Ausstattung der Immobilie (Beschreibung, Merkmale etc.) |
| `floor_plans` (5) | Grundriss-Galerie |
| `misc` | sonstige Angaben |
| `downloads_links` | Downloads (z. B. PDF-Dateien) und Links zu externen Websites |
| `contact_person` (6) | Kontaktinformationen (5) |
| `footer` (7) | Footer mit Link zur Übersichtsseite |

##### Beispiele

alle Abschnitte außer Header und Footer + tab-basierte Darstellung:
`[inx-property-details exclude="head, footer" enable-tabs=1]`

nur Energieausweis-Abschnitte:
`[inx-property-details elements="epass, epass_images, epass_energy_scale"]`

## Erweiterte Anpassungen

- [Filter-Referenz](../anpassung-erweiterung/filters-actions.html#Detailansicht)
- [Templates](../anpassung-erweiterung/skins.html#Partiell)
- [Custom Skin](../anpassung-erweiterung/standard-skin.html#Detailansicht)
