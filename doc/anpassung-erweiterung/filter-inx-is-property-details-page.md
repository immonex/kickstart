# inx_is_property_details_page (Filter)

Über diesen Filter-Hook kann abgefragt werden, ob die **aktuelle oder eine per ID definierte Seite** eine *Immobilien-Detailseite* ist, d. h. ein *Beitrag* des [Custom Post Types (CPT) für Immobilienangebote](/beitragsarten-taxonomien).

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| **`$post_id`** (int\|bool) | Seiten/Beitrags-ID oder `false` zur automatischen Ermittlung |

## Rückgabewert

**Beitrags-ID** bei Immobilien-Detailseite, andernfalls `false`

## Beispiel

```php
$is_property_details_page = apply_filters( 'inx_is_property_details_page', false );
```

[](_backlink.md ':include')