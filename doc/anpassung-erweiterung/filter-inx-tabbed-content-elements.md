---
title: Elemente der Detailansicht (Filter)
search: 1
---

# inx_tabbed_content_elements (Filter)

Mit diesem Filter kann die Aufteilung der Elemente der [Immobilien-Detailansicht](../komponenten/detailansicht.html) angepasst werden, wenn diese (teilweise) **in Tabs gruppiert** werden.

## Parameter

| Name | Beschreibung |
| ---- | ------------ |
| `$elements` | Array mit folgenden Unterarrays, die die Tab-Definitionen sowie Key-Listen von [Detailabschnitt-Elementen](../komponenten/detailansicht.html#Elemente-Detail-Abschnitte) enthalten |
| | `before_tabs`: Elemente, die **vor** dem Tab-Abschnitt angezeigt werden |
| | `tabs`: Liste der Tabs inkl. Bezeichnungen und enthaltenen Elementen |
| | `after_tabs`: Elemente, die **nach** dem Tab-Abschnitt angezeigt werden |

### Das Elements-Array im Detail

Die Array-Elemente `before_tabs` und `after_tabs` enthalten jeweils "flache" Listen der [Keys der Elemente](../komponenten/detailansicht.html#Elemente-Detail-Abschnitte), die vor bzw. nach dem Tab-Abschnitt angezeigt werden sollen.

In `tabs` können beliebige Tabs definiert werden: Jeweils ein Unterarray inkl. Titel (Bezeichnung des Tabs) und einer Liste der hierin enthaltenen Detail-Elemente (Keys).

```php
[
	'before_tabs' => [
		'head',
		'gallery'
	],
	'tabs' => [
		'main_description' => [
			'title' => __( 'The Property', 'immonex-kickstart' ),
			'elements' => [ 'main_description' ]
		],
		'details' => [
			'title' => __( 'Details', 'immonex-kickstart' ),
			'elements' => [ 'areas', 'condition', 'misc' ]
		],
		'features' => [
			'title' => __( 'Features', 'immonex-kickstart' ),
			'elements' => [ 'features' ]
		],
		'epass' => [
			'title' => __( 'Energy Pass', 'immonex-kickstart' ),
			'elements' => [ 'epass', 'epass_energy_scale', 'epass_images' ]
		],
		'location' => [
			'title' => __( 'Location & Infrastructure', 'immonex-kickstart' ),
			'elements' => [ 'location_map', 'location_description' ]
		],
		'prices' => [
			'title' => __( 'Prices', 'immonex-kickstart' ),
			'elements' => [ 'prices' ]
		],
		'downloads_links' => [
			'title' => __( 'Downloads & Links', 'immonex-kickstart' ),
			'elements' => [ 'downloads_links' ]
		]
	],
	'after_tabs' => [
		'floor_plans',
		'contact_person',
		'footer'
	]
]
```

## Rückgabewert

angepasstes Tab-Array

## Rahmenfunktion

Eine Funktion zur Nutzung des Filters wird typischerweise in der folgenden Form in der Datei **functions.php** des **Child-Themes** oder per Code-Snippets-Plugin eingebunden.

```php
add_filter( 'inx_tabbed_content_elements', 'mysite_modify_tabbed_content_elements' );

function mysite_modify_tabbed_content_elements( $elements ) {
	// Karte aus Standort-Tab entfernen...
	$elements['tabs']['location']['elements'] = array( 'location_description' );

	// ...und stattdessen unterhalb des Tab-Bereichs anzeigen.
	array_unshift( $elements['after_tabs'], 'location_map' );

	return $elements;
} // mysite_modify_tabbed_content_elements
```