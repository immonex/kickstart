# inx_get_properties (Filter)

Mit diesem Filter können Immobilienbeiträge anhand der angegebenen Kriterien abgerufen oder deren Anzahl ermittelt werden.

?> Der Filter wird vor allem in [Add-ons](/add-ons) oder anderen Plugins/Themes eingesetzt.

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| **`$properties`** (array\|int) | Array der Immobilien-Posts/IDs oder Anzahl |
| `$args` (array) | [Abfrage-Parameter](/schnellstart/einbindung#globale-abfrage-parameter) (Ist `count` mit dem Wert *true* enthalten, wird nur die Anzahl der Ergebnisse zurückgeliefert, `disable_cache` ermöglicht die *Ad-hoc-Deaktivierung* des [Caches](/schnellstart/einrichtung?id=performance).) |

## Rückgabewert

Array mit – abhängig von den Abfrage-Parametern – Post-Objekten oder IDs der abgefragten Immobilien bzw. die entsprechende Anzahl

## Code-Beispiele

Nur Häuser und Wohnungen bei deaktiviertem Cache abrufen (Taxonomie [inx_property_type](/beitragsarten-taxonomien)):
```php
$properties = apply_filters(
	'inx_get_properties',
	[],
	[
		'inx-search-property-type' => 'haeuser, wohnungen',
		'disable_cache'            => true,
	]
);
```

Grundstücke **ausschließen**:

```php
$properties = apply_filters(
	'inx_get_properties',
	[],
	[ 'inx-search-property-type' => '-grundstuecke' ]
);
```

**Beitrags-IDs** der Objekte, denen die primäre Kontaktperson mit der ID 4711 zugeordnet ist:

```php
$properties = apply_filters(
	'inx_get_properties',
	[],
	[
		'inx-primary-agent' => 4711,
		'fields'            => 'ids',
	]
);

// $properties
[ 17286, 17289, 18434, 18512, 18669 ]
```

**Anzahl** der Objekte, denen die primäre Kontaktperson mit der ID 4711 zugeordnet ist:

```php
$property_count = apply_filters(
	'inx_get_properties',
	[],
	[
		'inx-primary-agent' => 4711,
		'count'             => true,
	]
);

// $property_count
5
```

[](_backlink.md ':include')