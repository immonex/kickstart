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
	'type-of-use' => [
		'enabled' => true,
		'hidden' => true,
		'extended' => false,
		'type' => 'tax-select',
		'key' => 'inx_type_of_use',
		'compare' => '=',
		'numeric' => false,
		'label' => __( 'Type Of Use', 'immonex-kickstart' ),
		'multiple' => false,
		'empty_option' => __( 'All Types Of Use', 'immonex-kickstart' ),
		'default' => '',
		'class' => '',
		'order' => 15
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
		'multiple' => false,
		'empty_option' => __( 'All Property Types', 'immonex-kickstart' ),
		'default' => '',
		'class' => '',
		'order' => 20
	],
	'marketing-type' => [
		'enabled' => true,
		'hidden' => false,
		'extended' => false,
		'type' => 'tax-select',
		'key' => 'inx_marketing_type',
		'compare' => '=',
		'numeric' => false,
		'label' => __( 'Marketing Type', 'immonex-kickstart' ),
		'multiple' => false,
		'empty_option' => __( 'For Sale or For Rent', 'immonex-kickstart' ),
		'default' => '',
		'class' => '',
		'order' => 30
	],
	'locality' => [
		'enabled' => true,
		'hidden' => false,
		'extended' => false,
		'type' => 'tax-select',
		'key' => 'inx_location',
		'compare' => '=',
		'numeric' => false,
		'label' => __( 'Locality', 'immonex-kickstart' ),
		'multiple' => false,
		'empty_option' => __( 'All Localities', 'immonex-kickstart' ),
		'default' => '',
		'class' => '',
		'order' => 40
	],
	'project' => [
		'enabled' => true,
		'hidden' => true,
		'extended' => false,
		'type' => 'tax-select',
		'key' => 'inx_project',
		'compare' => '=',
		'numeric' => false,
		'label' => __( 'Project', 'immonex-kickstart' ),
		'empty_option' => __( 'All Projects', 'immonex-kickstart' ),
		'option_text_source' => 'description',
		'default' => '',
		'class' => '',
		'order' => 45
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
	'reset' => [
		'enabled' => true,
		'hidden' => false,
		'extended' => false,
		'type' => 'reset',
		'key' => '',
		'compare' => '',
		'numeric' => false,
		'label' => __( 'Reset Search Form', 'immonex-kickstart' ),
		'class' => 'inx-property-search__element--is-full-width',
		'order' => 90
	],
	'toggle-extended' => [
		'enabled' => true,
		'hidden' => false,
		'extended' => false,
		'type' => 'extended-search-toggle',
		'key' => '',
		'compare' => '',
		'numeric' => false,
		'label' => __( 'Extended and Distance Search', 'immonex-kickstart' ),
		'class' => 'inx-property-search__element--is-full-width',
		'order' => 100
	],
	'distance-search-location' => [
		'enabled' => true,
		'hidden' => false,
		'extended' => true,
		'type' => 'photon-autocomplete',
		'key' => 'distance_search_location',
		'compare' => '=',
		'numeric' => false,
		'label' => __( 'Distance Search', 'immonex-kickstart' ),
		'placeholder' => __( 'Locality Name (Distance Search)', 'immonex-kickstart' ),
		'no_options' => __( 'Type to search...', 'immonex-kickstart' ),
		'no_results' => __( 'No matching localities found.', 'immonex-kickstart' ),
		'class' => 'inx-property-search__element--is-first-grid-col',
		'order' => 200
	],
	'distance-search-radius' => [
		'enabled' => true,
		'hidden' => false,
		'extended' => true,
		'type' => 'select',
		'key' => 'distance_search_radius',
		'compare' => '<=',
		'numeric' => true,
		'label' => __( 'Distance Search Radius', 'immonex-kickstart' ),
		'options' => [
			5 => '5 km',
			10 => '10 km',
			25 => '25 km',
			50 => '50 km',
			100 => '100 km'
		],
		'empty_option' => __( 'Radius (km)', 'immonex-kickstart' ),
		'default' => '',
		'class' => '',
		'order' => 210
	],
	'features' => [
		'enabled' => true,
		'hidden' => false,
		'extended' => true,
		'type' => 'tax-checkbox',
		'key' => 'inx_feature',
		'compare' => 'AND',
		'numeric' => false,
		'label' => __( 'Features', 'immonex-kickstart' ),
		'class' => 'inx-property-search__element--is-full-width',
		'order' => 220
	],
	'labels' => [
		'enabled' => true,
		'hidden' => true,
		'extended' => true,
		'type' => 'tax-checkbox',
		'key' => 'inx_label',
		'compare' => 'IN',
		'numeric' => false,
		'label' => __( 'Labels', 'immonex-kickstart' ),
		'multiple' => true,
		'default' => '',
		'class' => 'inx-property-search__element--is-full-width',
		'order' => 900
	]
]
```

#### Element-Eigenschaften

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| `enabled` (bool) | aktiv/verfügbar |
| `hidden` (bool) | *true* bei Elementen, die für die Suche/Filterung zum Einsatz kommen, aber **nicht** direkt im Formular auswählbar sind (**Sonderfälle**) |
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
| `numeric` (bool) | Abfrage eines numerischen Werts (*true* / *false*) |
| `multiple` (bool) | Mehrfachauswahl bei Elementen des Typs `select` oder `tax-select` (*true* / *false*) |
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
| `step_ranges` (array\|int\|bool) | Schrittweite(n) bei Wertslider-Elementen (Typ *range*): Einzelwert, Key-Value-Array (jeweils *Schwellenwert ➞ Schrittweite*) oder *false* für Standardvorgabe |
| `unlimited_term` | angezeigter Text bei *range*-Elementen ohne ausgewählten Wertebereich (= unbegrenzt) |
| `default` (mixed) | Standardwert |
| `replace_null` (string) | Null- oder Leerwerte durch diesen String ersetzen |
| `unit` (string) | Einheit (z. B. m², nur beim Elementtyp *range* relevant) |
| `currency` (string) | Währung (nur beim Elementtyp *range* relevant) |
| `label` (string) | Bezeichnung des Elements (wird nur bei bestimmten Elementarten angezeigt bzw. sofern vom ausgewählten Skin unterstützt) |
| `options` (array) | Key-Value-Array der Auswahloptionen beim Elementtyp *select* |
| `empty_option` (string) | Bezeichnung der "leeren Option" (sofern vorhanden) bei Elementen des Typs *select* oder *tax-select* |
| `option_text_source` (string) | primäre Quelle der angezeigten Auswahloptionen bei *tax-select*-Elementen (**Sonderfälle**) |
| | *name* (Standard): Namen der Terms |
| | *description*: Beschreibungen der Terms sofern vorhanden, ansonsten Namen |
| `no_options` | angezeigter Text, wenn bei Autocomplete-Auswahlfeldern (noch) kein Suchbegriff eingegeben wurde |
| `no_results` | angezeigter Text, wenn bei Autocomplete-Auswahlfeldern keine zum Suchbegriff passenden Orte gefunden wurden |
| `placeholder` (string) | Platzhaltertext bei Eingabefeldern |
| `class` (string) | Extra-CSS-Klassen des Containerelements |
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