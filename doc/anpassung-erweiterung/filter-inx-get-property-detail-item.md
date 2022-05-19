# inx_get_property_detail_item (Filter)

Dieser Filter dient dem **Abrufen eines Detail-Elements** einer [Immobilie](/beitragsarten-taxonomien) anhand von Namen und Gruppenbezeichnungen, die in der für den [OpenImmo-Import verwendeten Mapping-Tabelle](/schnellstart/import) hinterlegt sind.

> Der Filter wird typischerweise in [Add-ons](/add-ons) oder anderen Plugins/Themes **anstelle von direkten Funktionsaufrufen** eingesetzt, bei denen ansonsten immer die Verfügbarkeit des Kickstart-Basisplugins geprüft werden müsste.

## Parameter

| Name | Beschreibung |
| ---- | ------------ |
| `$item` | Standardvorgabe (im Regelfall *false*) |
| `$post_id` | ID des Immobilien-Beitrags (optional, Standard: aktueller Beitrag) |
| `$args` | zusätzliche Parameter |
| | **`name`** (**obligatorisch**, <i>Mapping-Name</i> des gewünschten Elements) |
| | `group` (<i>Mapping-Gruppe</i> des Elements) |
| | `value_only` (nur Wert zurückliefern?): *true* (Standard) oder *false* (Array mit Wert und <i>Import-Metadaten</i>) |

## Rückgabewert

Wert des angegebenen Elements (sofern verfügbar) oder Array mit Elementdaten (bei `value_only` = *false*)

## Code-Beispiele

```php
/**
 * Energieausweistyp des aktuellen Immobilien-Beitrags abrufen
 */

// nur Wert
$epass_type = apply_filters(
	'inx_get_property_detail_item',
	false,
	get_the_ID(),
	[
		'name' => 'zustand_angaben.energiepass.epart',
		'group' => 'epass'
	]
);

// $epass_type
Bedarf

// Wert und Import-Metadaten
$epass_type = apply_filters(
	'inx_get_property_detail_item',
	false,
	get_the_ID(),
	[
		'name' => 'zustand_angaben.energiepass.epart',
		'group' => 'epass',
		'value_only' => false
	]
);

// $epass_type
[
	'group' => 'epass',
	'title' => 'Energieausweis-Art',
	'name' => 'zustand_angaben.energiepass.epart',
	'value' => 'Bedarf',
	'meta_json' => '{"mapping_source":"zustand_angaben->energiepass->epart","value_before_filter":"BEDARF"}'
]
```