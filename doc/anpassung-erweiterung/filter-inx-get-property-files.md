# inx_get_property_files (Filter)

Dieser Filter dient dem **Abrufen** aller Dateianhang-Daten eines [Immobilien-Beitrags](/beitragsarten-taxonomien).

[](_info_add_on_hooks.md ':include')

## Parameter

| Name | Beschreibung |
| ---- | ------------ |
| **`$files`** (array) | leeres Array |
| `$post_id` (int\|string) | ID des Immobilien-Beitrags (optional, Standard: aktueller Beitrag) |

## Rückgabewert

Array mit Anhangdaten (Umfang/Format: [wp_prepare_attachment_for_js](https://developer.wordpress.org/reference/functions/wp_prepare_attachment_for_js/))

## Code-Beispiel

```php
$property_files = apply_filters( 'inx_get_property_files', [] );

// $property_files
[
    [
        'id' => '26394',
        'title' => 'Grundrisse und Lageplan',
        'filename' => 'grundrisse-lageplan.pdf',
        'url' => 'https://…',
        'link' => 'https://…',
        'alt' => 'Grundrisse und Lageplan',
        'author' => '1',
        'description' => '',
        'caption' => 'Grundrisse und Lageplan',
        'name' => 'grundrisse-und-lageplan',
        'status' => 'inherit',
        'uploadedTo' => '26201',
        'date' => '1755073167000',
        'modified' => '1755073168000',
        'menuOrder' => '9',
        'mime' => 'application/pdf',
        'type' => 'application',
        'subtype' => 'pdf',
        'icon' => 'https://domain.tld/dev/wp-includes/images/media/document.svg',
        'dateFormatted' => '…',
        'nonces' => [ … ],
        'editLink' => 'https://…',
        'meta' => '',
        'authorName' => 'I. C. Wiener',
        'authorLink' => 'https://…',
        'uploadedToTitle' => '…',
        'uploadedToLink' => 'https://…',
        'filesizeInBytes' => '16269',
        'filesizeHumanReadable' => '16 kB',
        'context' => '',
        'compat' => [ … ]
    ],
    [
        'id' => '26395',
        'title' => 'Energieausweis',
        'filename' => 'energieausweis.pdf',
        'url' => 'https://…',
        'link' => 'https://…',
        'alt' => 'Energieausweis',
        'author' => '1',
        'description' => '',
        'caption' => 'Energieausweis',
        'name' => 'energieausweis',
        'status' => 'inherit',
        'uploadedTo' => '26201',
        'date' => '1755073167000',
        'modified' => '1755073168000',
        'menuOrder' => '10',
        'mime' => 'application/pdf',
        'type' => 'application',
        'subtype' => 'pdf',
        'icon' => 'https://domain.tld/dev/wp-includes/images/media/document.svg',
        'dateFormatted' => '…',
        'nonces' => [],
        'editLink' => 'https://…',
        'meta' => '',
        'authorName' => 'I. C. Wiener',
        'authorLink' => 'https://…',
        'uploadedToTitle' => '…',
        'uploadedToLink' => 'https://…',
        'filesizeInBytes' => '16269',
        'filesizeHumanReadable' => '16 kB',
        'context' => '',
        'compat' => [ … ],
    ]
]
```

[](_backlink.md ':include')