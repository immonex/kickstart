# inxkick_pagination_default_atts (Filter)

Mit diesem Filter können die Standardattribute für das Rendern von [Immobilien-Seitennavigationen](/komponenten/seitennavigation) angepasst werden.

## Parameter

| Name | Beschreibung |
| ---- | ------------ |
| **`$atts`** (array) | Rendering-Attribute |

### Das Original-Attribut-Array

```php
$atts = [
    'pagination_template' => 'property-list/pagination',
    'screen_reader_text'  => '',
    'aria_label'          => '',
    'prev_next'           => 1,
    'prev_text'           => __( 'Previous Page', 'immonex-kickstart' ),
    'next_text'           => __( 'Next Page', 'immonex-kickstart' ),
    'show_all'            => false,
    'end_size'            => 1,
    'mid_size'            => 2,
    'before_page_number'  => '',
    'after_page_number'   => '',
    'add_fragment'        => '',
]
```

## Rückgabewert

angepasstes Attribut-Array

## Rahmenfunktion

[](_info-snippet-einbindung.md ':include')

```php
/**
 * [immonex Kickstart] Standardattribute für die Generierung von
 * Immobilien-Seitennavigationen anpassen.
 */

add_filter( 'inxkick_pagination_default_atts', 'mysite_modify_property_list_pagination_map_atts' );

function mysite_modify_property_list_pagination_map_atts( $atts ) {
	// ...Attribute im Array $atts anpassen...

	return $atts;
} // mysite_modify_property_list_pagination_map_atts
```

## Siehe auch

- Filter: [inx_rendered_pagination_template_contents](filter-inx-rendered-pagination-template-contents) (Anpassung der gerenderten Inhalte von Immobilienlisten-Seitennavigationen)
- Plugin-Optionen: [Seitennavigation](/schnellstart/einrichtung?id=seitennavigation)

[](_backlink.md ':include')