# inx_property_sort_options (Filter)

Die Sortieroptionen der der [Auswahlbox](/komponenten/sortierung), die per Shortcode `[inx-filters-sort]` eingebunden wird, können über diesen Filter-Hook angepasst werden.

## Parameter

| Name | Beschreibung |
| ---- | ------------ |
| `$sort_options` | Array mit allen Daten der Sortieroptionen |

### Sort-Options-Array im Detail

```php
[
    'distance' => [ // nur bei aktiver Umkreissuche enthalten
        'field' => 'distance',
        'title' => __( 'Distance', 'immonex-kickstart' ), // Distanz
        'order' => 'ASC'
    ],
    'date_desc' => [
        'field' => 'date',
        'title' => __( 'Newest', 'immonex-kickstart' ), // Aktuellste
        'order' => 'DESC'
    ],
    'marketing_type_desc' => [
        'field' => '_inx_is_sale',
        'title' => __( 'For Sale first', 'immonex-kickstart' ), // Kaufobjekte zuerst
        'order' => 'DESC'
    ],
    'marketing_type_asc' => [
        'field' => '_inx_is_sale',
        'title' => __( 'For Rent first', 'immonex-kickstart' ), // Mietobjekte zuerst
        'order' => 'ASC'
    ]
    'availability_desc' => [
        'field' => '_immonex_is_available',
        'title' => __( 'Available first', 'immonex-kickstart' ), //Verfügbare zuerst,
        'order' => 'DESC'
    ],
    'price_asc' => [
        'field' => '_inx_primary_price',
        'title' => __( 'Available first', 'immonex-kickstart' ), // Preis (aufsteigend)
        'order' => 'ASC',
        'type' => 'NUMERIC'
    ],
    'price_desc' => [
        'field' => '_inx_primary_price',
        'title' => __( 'Price (high to low)', 'immonex-kickstart' ), // Preis (absteigend)
        'order' => 'DESC',
        'type' => 'NUMERIC'
    ],
    'area_asc' => [
        'field' => '_inx_primary_area',
        'title' => __( 'Area', 'immonex-kickstart' ), // Fläche
        'order' => 'ASC',
        'type' => 'NUMERIC'
    ],
    'rooms_asc' => [
        'field' => '_inx_primary_rooms',
        'title' => __( 'Rooms', 'immonex-kickstart' ), // Zimmer
        'order' => 'ASC',
        'type' => 'NUMERIC'
    ]
]
```

Die Keys der Unter-Arrays entsprechen den Elementnamen, die auch in den [Shortcode-Attributen](/komponenten/sortierung#attribute) oder im Zusammenhang mit dem [GET-Parameter](/schnellstart/einbindung#get-parameter) `inx-sort` bzw. dem Filter-Hook [`inx_default_sort_key`](filter-inx-default-sort-key) verwendet werden können.

## Rückgabewert

angepasstes Sortier-Optionen-Array

## Rahmenfunktion

Eine Funktion zur Nutzung des Filters wird typischerweise in der folgenden Form in der Datei **functions.php** des **Child-Themes** oder per Code-Snippets-Plugin eingebunden.

```php
add_filter( 'inx_property_sort_options', 'mysite_modify_property_sort_options' );

function mysite_modify_property_sort_options( $sort_options ) {
    // Sortieroptionen anpassen.
    // $sort_options['...']['field'] = '...';

    return $sort_options;
} // mysite_modify_property_sort_options
```