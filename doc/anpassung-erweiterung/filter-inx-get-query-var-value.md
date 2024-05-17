# inx_get_query_var_value (Filter)

Über diesen Filter-Hook kann der aktuelle Wert einer beliebigen [WP-Query-Variable](https://developer.wordpress.org/reference/classes/wp_query/) abgerufen werden, der ggfls. Kickstart-spezifisch angepasst wurde.

[](_info_add_on_hooks.md ':include')

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