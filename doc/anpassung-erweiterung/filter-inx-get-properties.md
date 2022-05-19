# inx_get_properties (Filter)

Mit diesem Filter können Immobilienbeiträge anhand der angegebenen Kriterien abgerufen oder deren Anzahl ermittelt werden.

> Der Filter wird vor allem in [Add-ons](/add-ons) oder anderen Plugins/Themes eingesetzt.

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| `$properties` (array\|int) | Array der Immobilien-Posts/IDs oder Anzahl |
| `$args` (array) | Kriterien für [WP_Query-Abfragen](https://developer.wordpress.org/reference/classes/wp_query/parse_query/) (Hier können auch [allgemeine Kickstart-Parameter](/schnellstart/einbindung#get-parameter) verwendet werden. Ist `count` mit dem Wert *true* enthalten, wird nur die Anzahl der Ergebnisse zurückgeliefert.) |

## Rückgabewert

Array mit – abhängig von den Abfrage-Parametern – Post-Objekten oder IDs der abgefragten Immobilien bzw. die entsprechende Anzahl

## Code-Beispiele

```php
$properties = apply_filters(
	'inx_get_properties',
	[],
	[
		'inx-primary-agent' => 4711,
		'fields' => 'ids',
	]
);

// $properties
[ 17286, 17289, 18434, 18512, 18669 ]
```

```php
$property_count = apply_filters(
	'inx_get_properties',
	[],
	[
		'inx-primary-agent' => 4711,
		'count' => true,
	]
);

// $property_count
5
```