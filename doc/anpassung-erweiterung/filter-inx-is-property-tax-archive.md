# inx_is_property_tax_archive (Filter)

Über diesen Filter-Hook kann abgefragt werden, ob die aktuelle Seite eine *Archivseite* einer [Immobilien-Taxonomie](/beitragsarten-taxonomien) ist bzw. um welche Taxonomie es sich konkret handelt.

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| **`$tax_archive_term`** (WP_Term\|bool) | Standardvorgabe (`false`) |

## Rückgabewert

`WP_Term`-Objekt bei Taxonomie-Archivseite, ansonsten `false`

## Beispiel

```php
$is_property_tax_archive = apply_filters( 'inx_is_property_tax_archive', false );
```

[](_backlink.md ':include')