# inx_get_query_var_value (Filter)

Über diesen Filter-Hook kann der aktuelle Wert einer beliebigen [WP-Query-Variable](https://developer.wordpress.org/reference/classes/wp_query/) abgerufen werden, der ggfls. Kickstart-spezifisch angepasst wurde.

?> Der Filter wird typischerweise in [Add-ons](/add-ons) oder anderen Plugins/Themes **anstelle von direkten Funktionsaufrufen** eingesetzt, bei denen ansonsten immer die Verfügbarkeit des Kickstart-Basisplugins geprüft werden müsste.

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| **`$value`** (mixed\|bool) | Wert der Query-Variable (nur für die Rückgabe; bei Abfrage: *false*) |
| `$var_name` (string) | Name der Query-Variable |
| `$query` (WP_Query\|bool) | `WP_Query`-Objekt (*false* für Standard-Query) |

## Rückgabewert

Wert der Query-Variable, sofern verfügbar, ansonsten *false*

## Code-Beispiele

```php
$limit = apply_filters( 'inx_get_query_var_value', false, 'inx-limit', false );
```

[](_backlink.md ':include')