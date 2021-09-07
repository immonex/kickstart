---
title: Suchformular-Elemente (Filter)
search: 1
---

# inx_search_form_elements (Filter)

Mit diesem Filter können die Eigenschaften der Elemente des [Immobilien-Suchformulars](../komponenten/index.html) angepasst werden.

## Parameter

| Name | Beschreibung |
| ---- | ------------ |
| `$elements` (array) | Array aller Suchformular-Elemente |

### Das Elements-Array im Detail

```php
[
	'description' => [
		'enabled' => true,
		'hidden' => false,
		'extended' => false,
		'type' => 'text',
		'key' => '',
		'compare' => 'LIKE',
		'numeric' => false,
		'label' => '',
		'placeholder' => __( 'Keyword or Property ID', 'immonex-kickstart' ),
		'class' => '',
		'order' => 10
	],
	'property-type' => [
		'enabled' => true,
		'hidden' => false,
		'extended' => false,
		'type' => 'tax-select',
		'key' => 'inx_property_type',
		'compare' => '=',
		'numeric' => false,
		'label' => __( 'Property Type', 'immonex-kickstart' ),
		'options' => [],
		'multiple' => false,
		'empty_option' => __( 'All Property Types', 'immonex-kickstart' ),
		'default' => '',
		'class' => '',
		'order' => 20
	],
	'min-rooms' => [
		'enabled' => true,
		'hidden' => false,
		'extended' => false,
		'type' => 'range',
		'key' => '_inx_primary_rooms',
		'compare' => '>=',
		'range' => '0,10',
		'step_ranges' => false,
		'default' => 0,
		'replace_null' => __( 'not specified', 'immonex-kickstart' ),
		'unit' => false,
		'currency' => false,
		'numeric' => true,
		'label' => __( 'Min. Rooms', 'immonex-kickstart' ),
		'class' => '',
		'order' => 50
	],
	'min-area' => [
		'enabled' => true,
		'hidden' => false,
		'extended' => false,
		'type' => 'range',
		'key' => '_inx_living_area',
		'compare' => '>=',
		'range' => 'living_area_min_max',
		'step_ranges' => false,
		'default' => 0,
		'replace_null' => __( 'not specified', 'immonex-kickstart' ),
		'unit' => 'm²',
		'currency' => false,
		'numeric' => true,
		'label' => __( 'Min. Living Area', 'immonex-kickstart' ),
		'class' => '',
		'order' => 60
	],
	'price-range' => [
		'enabled' => true,
		'hidden' => false,
		'extended' => false,
		'type' => 'range',
		'key' => '_inx_primary_price',
		'compare' => 'BETWEEN',
		'range' => 'primary_price_min_max',
		'step_ranges' => false,
		'default' => 'primary_price_min_max',
		'unlimited_term' => __( 'unlimited', 'immonex-kickstart' ),
		'currency' => 'EUR',
		'numeric' => true,
		'label' => __( 'Price Range', 'immonex-kickstart' ),
		'class' => '',
		'order' => 70
	],
	'submit' => [
		'enabled' => true,
		'hidden' => false,
		'extended' => false,
		'type' => 'submit',
		'key' => '',
		'compare' => '',
		'numeric' => false,
		'label' => __( 'Show', 'immonex-kickstart' ),
		'class' => 'inx-property-search__element--is-last-grid-col',
		'order' => 80
	],
	...
]
```

#### Element-Eigenschaften

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| `enabled` (bool) | aktiv/verfügbar |
| `hidden` (bool) | *true* bei Elementen, die für die Suche/Filterung zum Einsatz kommen, aber **nicht** direkt im Formular auswählbar sind (**Sonderfall**) |
| `extended` (bool) | *true*, wenn das Element im Abschnitt der **erweiterten Suche** erscheinen soll |
| `type` (string) | Typ des Elements |
| | *text*: Texteingabefeld |
| | *select*: Auswahlbox mit vorgegebenen Optionen für Custom-Field-Abfragen |
| | *tax-select*: Taxonomie-Auswahlbox |
| | *checkbox*: Checkboxen mit vorgegebenen Optionen/Labels für Custom-Field-Abfragen |
| | *tax-checkbox*: taxonomiebasierte Checkboxen |
| | *radio*: Radio-Elemente mit vorgegebenen Optionen/Labels für Custom-Field-Abfragen |
| | *tax-radio*: taxonomiebasierte Radio-Elemente |
| | *range*: Auswahlslider für einzelne Zahlenwerte oder Wertebereiche |
| | *submit*: Suchen/Absenden-Button |
| | *reset*: Zurücksetzen des Formulars |
| | *extended-search-toggle*: erweiterte Suche ein-/ausblenden |
| | *photon-autocomplete*: Ortsauswahl für Umkreissuche, Autovervollständigung via Photon (sofern in den [Plugin-Optionen](../schnellstart/einrichtung.html#Karten-amp-Umkreissuche) ausgewählt)
| | *google-places-autocomplete*: Ortsauswahl für Umkreissuche, Autovervollständigung via Goople-Places-API (sofern in den [Plugin-Optionen](../schnellstart/einrichtung.html#Karten-amp-Umkreissuche) ausgewählt)
| `subtype` (string) | Subtyp des Elements |
| | *date*: Datumsauswahl (Datepicker) bei Elementen des Typs *text* |
| `key` (string) | Name des **Custom Fields** oder der **Taxonomie**, auf den sich die Suchauswahl/-eingabe bezieht |
| `compare` (string) | WP Query Compare Operator |
| `numeric` (bool) | Abfrage eines numerischen Werts? |
| `range` (string) | Minimal- und Maximalwert beim gleichnamigen Elementtyp im Format *MIN,MAX* (z. B. 0,10) **oder** alternativ... |
| | *primary_price_min_max*: automatische Preisrahmen-Ermittlung (Kauf- und Mietpreise) |
| | *primary_area_min_max*: automatische Ermittlung des Primärflächen-Rahmens |
| | *living_area_min_max*: automatische Ermittlung des Wohnflächen-Rahmens |
| | *commercial_area_min_max*: automatische Ermittlung des Gewerbeflächen-Rahmens |
| | *retail_area_min_max*: automatische Ermittlung des Verkaufsflächen-Rahmens |
| | *office_area_min_max*: automatische Ermittlung des Büroflächen-Rahmens |
| | *gastronomy_area_min_max*: automatische Ermittlung des Gastronomie/Hotellerie-Flächen-Rahmens |
| | *plot_area_min_max*: automatische Ermittlung des Grundstücksflächen-Rahmens |
| | *usable_area_min_max*: automatische Ermittlung des Nutzflächen-Rahmens |
| | *basement_area_min_max*: automatische Ermittlung des Kellerflächen-Rahmens |
| | *attic_area_min_max*: automatische Ermittlung des Dachbodenflächen-Rahmens |
| | *garden_area_min_max*: automatische Ermittlung des Gartenflächen-Rahmens |
| | *misc_area_min_max*: automatische Ermittlung des Rahmens sonstiger Flächen |
| | *total_area_min_max*: automatische Ermittlung des Gesamtflächen-Rahmens |
| `step_ranges` (array\|int\|bool) | Schrittweite(n) bei Wertslider-Elementen (Typ `range`): Einzelwert, Key-Value-Array (jeweils *Schwellenwert ➞ Schrittweite*) oder *false* für Standardvorgabe |
| `default` (mixed) | Standardwert |
| `replace_null` (string) | Null- oder Leerwerte durch diesen String ersetzen |
| `unit` (string) | Einheit (z. B. m², nur beim Elementtyp `range` relevant) |
| `currency` (string) | Währung (nur beim Elementtyp `range` relevant) |
| `label` (string) | Bezeichnung des Elements (wird nur bei bestimmten Elementarten angezeigt bzw. sofern vom ausgewählten Skin unterstützt) |
| `placeholder` (string) | Platzhaltertext bei Eingabefeldern |
| `classes` (string) | Extra-CSS-Klassen des Containerelements |
| `order` (int) | Reihenfolge/Position des Elements im Formular |

## Rückgabewert

angepasstes Array aller Suchformular-Elemente (siehe oben)

## Rahmenfunktion

Eine Funktion zur Nutzung des Filters wird typischerweise in der folgenden Form in der Datei **functions.php** des **Child-Themes** oder per Code-Snippets-Plugin eingebunden.

```php
add_filter( 'inx_search_form_elements', 'mysite_modify_search_form_elements' );

function mysite_modify_search_form_elements( $elements ) {
	// ...Eigenschaften der Formular-Elemente im Array $elements anpassen...

	return $elements;
} // mysite_modify_search_form_elements
```