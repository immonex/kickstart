# inx_get_property_detail_item (Filter)

Dieser Filter dient dem **Abrufen eines Detail-Elements** einer [Immobilie](/beitragsarten-taxonomien) anhand von Namen und Gruppenbezeichnungen, die in der für den [OpenImmo-Import verwendeten Mapping-Tabelle](/schnellstart/import) hinterlegt sind.

[](_info_add_on_hooks.md ':include')

## Parameter

| Name | Beschreibung |
| ---- | ------------ |
| **`$item`** (array\|bool) | Standardvorgabe (im Regelfall *false*) |
| `$post_id` (int\|string) | ID des Immobilien-Beitrags (optional, Standard: aktueller Beitrag) |
| `$args` (array) | zusätzliche Parameter |
| | **`name`** (string) → *Mapping-Name* des gewünschten Elements (**obligatorisch**) |
| | `group` (string) → *Mapping-Gruppe* des Elements |
| | `value_only` (bool) → *true* (nur Wert zurückliefern; Standard) oder *false* (Array mit Wert und *Import-Metadaten*) |

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

[](_backlink.md ':include')