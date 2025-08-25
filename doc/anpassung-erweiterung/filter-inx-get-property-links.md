# inx_get_property_links (Filter)

Dieser Filter dient dem **Abrufen** der externen Link-URLs, die einem [Immobilien-Beitrag](/beitragsarten-taxonomien) zugeordnet sind.

[](_info_add_on_hooks.md ':include')

## Parameter

| Name | Beschreibung |
| ---- | ------------ |
| **`$links`** (array) | leeres Array |
| `$post_id` (int\|string) | ID des Immobilien-Beitrags (optional, Standard: aktueller Beitrag) |

## Rückgabewert

Array mit jew. einem Unterelement pro Link (URL und Titel)

## Code-Beispiel

```php
$property_links = apply_filters( 'inx_get_property_links', [] );

// $property_links
[
    [
        'url' => 'https://domain1.tld/',
        'title' => 'Infowebsite zum Bauprojekt'
    ],
    [
        'url' => 'https://domain2.tld/',
        'title' => 'Infos zum Stadtteil'
    ]
]
```

[](_backlink.md ':include')