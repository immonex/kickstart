# inx_add_special_vars_from_post_meta (Filter)

Mit diesem Filter-Hook können [globale Abfrage-Parameter](/schnellstart/einbindung?id=globale-abfrage-parameter) (aka *Query-Parameter*), die in Form [individueller Felder](/schnellstart/einbindung?id=individuelle-felder) einer Seite definiert wurden, abgerufen bzw. zu einem vorhandenen *Key-Value-Array* hinzugefügt werden, sofern noch keine Elemente mit dem entsprechenden Keys vorhanden sind.

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| **`$atts`** (array) | Attribut/Parameter-Array oder leeres Array |
| `$post_id_or_url` (int\|string) | ID oder URL der Seite, die die Kickstart-Komponenten und Parameter-Felder enthält |

## Rückgabewert

Key-Value-Array der abgerufenen Parameter

## Code-Beispiel

[](_info-snippet-einbindung.md ':include')

```php
// [immonex Kickstart] Globale Abfrage-Parameter aus individuellen Feldern der Seite 123 abrufen.
$atts = apply_filters( 'inx_add_special_vars_from_post_meta', [], 123 );
```

## Siehe auch

- [inx_special_query_vars](filter-inx-special-query-vars) (allgemeine Abfrage-Parameter ergänzen)
- [Globale Abfrage-Parameter](/schnellstart/einbindung?id=globale-abfrage-parameter)

[](_backlink.md ':include')