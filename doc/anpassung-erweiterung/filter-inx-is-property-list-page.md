# inx_is_property_list_page (Filter)

Über diesen Filter-Hook kann abgefragt werden, ob die **aktuelle oder eine per ID definierte Seite** eine *Immobilien-Listenseite* ist, d. h. entweder eine *Archivseite* der [Immobilien-Beitragsart](/beitragsarten-taxonomien) oder die in den [Plugin-Optionen](/schnellstart/einrichtung?id=listen) festgelegten Haupt-Übersichtsseite für Immobilien.

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| **`$page_id`** (int\|bool) | Seiten-ID oder `false` zur automatischen Ermittlung |

## Rückgabewert

- `true` bei regulärer Archivseite der Beitragsart (CPT) `inx_property`
- **Seiten-ID** bei Immobilien-Übersichtsseite gem. Plugin-Option

## Beispiel

```php
$is_property_list_page = apply_filters( 'inx_is_property_list_page', false );
```

[](_backlink.md ':include')