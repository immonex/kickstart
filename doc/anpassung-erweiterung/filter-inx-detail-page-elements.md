---
title: Elemente der Detailansicht (Filter)
search: 1
---

# inx_detail_page_elements (Filter)

Mit diesem Filter können die Eigenschaften der für die Ausgabe verfügbaren Elemente der [Immobilien-Detailansicht](../komponenten/detailansicht.html) angepasst werden.

## Parameter

| Name | Beschreibung |
| ---- | ------------ |
| `$elements` | Array der verfügbaren [Detailabschnitt-Elemente](../komponenten/detailansicht.html#Elemente-Detail-Abschnitte) |

### Das Elements-Array im Detail

Die folgenden Haupt-Array-Keys entsprechen den [Element- bzw. Abschnittsnamen](../komponenten/detailansicht.html#Elemente-Detail-Abschnitte), die in den Attributen der Detailansicht-Shortcodes Verwendung finden.

```php
[
	'head' => [
		'template' => 'head'
	],
	'gallery' => [
		'template' => 'gallery',
		'animation_type' => 'push',
		'enable_caption_display' => true,
		'enable_video' => true,
		'enable_virtual_tour' => true,
		'enable_ken_burns_effect' => true
	],
	'main_description' => [
		'template' => 'description-text'
	],
	'prices' => [
		'template' => 'details',
		'groups' => 'preise',
		'headline' => __( 'Prices', 'inx' )
	],
	'areas' => [
		'template' => 'details',
		'groups' => 'flaechen',
		'headline' => __( 'Areas', 'inx' )
	],
	'condition' => [
		'template' => 'details',
		'groups' => 'zustand',
		'headline' => __( 'Condition & Development', 'inx' )
	],
	'epass' => [
		'template' => 'details',
		'groups' => 'epass',
		'headline' => ''
	],
	'epass_images' => [
		'template' => 'gallery',
		'image_selection_custom_field' => '_inx_epass_images',
		'headline' => '',
		'animation_type' => 'scale',
		'enable_caption_display' => false,
		'enable_ken_burns_effect' => false
	],
	'epass_energy_scale' => [
		'template' => 'shortcodes',
		'shortcodes' => [ '[immonex-energy-scale]' ]
	],
	'location' => [
		'template' => 'location-info'
	],
	'location_description' => [
		'template' => 'location-description',
		'no_headline_in_tabs' => true
	],
	'location_map' => [
		'template' => 'location-map',
		'no_headline_in_tabs' => true
	],
	'features' => [
		'template' => 'features',
		'groups' => 'ausstattung',
		'headline' => __( 'Features', 'inx' )
	],
	'floor_plans' => [
		'template' => 'gallery',
		'image_selection_custom_field' => '_inx_floor_plans',
		'headline' => __( 'Floor Plans', 'inx' ),
		'animation_type' => 'scale',
		'enable_caption_display' => true,
		'enable_ken_burns_effect' => false
	],
	'misc' => [
		'template' => 'details',
		'description_text_field' => 'freitexte.sonstige_angaben',
		'groups' => 'sonstiges',
		'headline' => __( 'Miscellaneous', 'inx' )
	],
	'downloads_links' => [
		'template' => 'downloads-and-links',
		'headline' => __( 'Downloads & Links', 'inx' )
	],
	'contact_person' => [
		'template' => 'contact-person',
		'groups' => 'kontakt',
		'headline' => __( 'Your Agent', 'inx' )
	],
	'footer' => [
		'template' => 'footer'
	]
]
```

#### Element-Eigenschaften

Die folgenden Eigenschaften sind größtenteils **templatespezifisch**, können also je nach Vorlage unterschiedlich interpretiert oder auch gar nicht berücksichtigt werden.

##### Allgemein (templateübergreifend)

| Name (Typ) | Beschreibung / Werte |
| ---------- | -------------------- |
| `template` (string) | Name der Template-Datei (ohne Endung .php) im **Unterordner** `single-property` des [Skin-Ordners](skins.html) |
| `headline` (string) | Titel/Überschrift des Abschnitts |
| `no_headline_in_tabs` (bool) | Überschriften bei **tab-basierter Ausgabe** ausblenden |

##### Template **details**

| Name (Typ) | Beschreibung / Werte |
| ---------- | -------------------- |
| `groups` (string) | kommagetrennte Liste von Bezeichnungen der Gruppen, deren zugehörige Angaben angezeigt werden sollen (Mit Gruppen werden in der <i>Import-Mapping-Tabelle</i> thematisch verwandte OpenImmo-Daten zusammengefasst.) |
| `description_text_field` (string) | alternativer Name des einzubindenden **Custom Fields**, der in der <i>Import-Mapping-Tabelle</i> definiert wurde |

##### Template **gallery**

| Name (Typ) | Beschreibung / Werte |
| ---------- | -------------------- |
| `animation_type` (string) | Animationsart für Bildübergänge: *slide*, *fade*, *scale*, *pull* oder *push* |
| `image_selection_custom_field` (string) | Name des Custom Fields, das die IDs der einzubindenden Bildanhänge enthält (optional, Standard: *\_inx_gallery_images*) |
| `enable_caption_display` (bool) | Bildbezeichnungen anzeigen? |
| `enable_video` (bool) | externe Videos (YouTube/Vimeo) in der Galerie anzeigen? |
| `enable_virtual_tour` (bool) | externe 360°-Ansichten/virtuelle Touren (z. B. Ogulo oder IS24) in der Galerie anzeigen? |
| `enable_ken_burns_effect` (bool) | Ken-Burns-Effekt aktivieren? (Animation statischer Bilder **bei ausreichender Bildgröße**) |

##### Template **shortcodes**

| Name (Typ) | Beschreibung / Werte |
| ---------- | -------------------- |
| `shortcodes` (string[]) | **Array** mit einzubindenden Shortcodes |

## Rückgabewert

angepasstes Array verfügbarer Detailabschnitt-Elemente

## Rahmenfunktion

Eine Funktion zur Nutzung des Filters wird typischerweise in der folgenden Form in der Datei **functions.php** des **Child-Themes** oder per Code-Snippets-Plugin eingebunden.

```php
add_filter( 'inx_detail_page_elements', 'mysite_modify_available_detail_elements' );

function mysite_modify_available_detail_elements( $elements ) {
	// ...Eigenschaften der Detailabschnitt-Elemente im Array $elements anpassen...

	return $elements;
} // mysite_modify_available_detail_elements
```