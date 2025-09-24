# inx_before_render_property_list_item (Action)

Ist das [Standard-Skin](standard-skin) (oder ein hierauf aufbauendes [Custom Skin](skins?id=custom-skins)) im Einsatz, können über diesen Action-Hook beliebige Inhalte **vor** der Ausgabe **jeder** Immobilie innerhalb einer [Immobilien-Listenansicht](/komponenten/liste) eingefügt werden.

## Rahmenfunktion/Beispiel

[](_info-snippet-einbindung.md ':include')

```php
/**
 * [immonex Kickstart] Inhalt vor jedem Immobilien-Listenelement einfügen.
 */

add_action( 'inx_before_render_property_list_item', 'mysite_add_contents_before_property_list_item' );

function mysite_add_contents_before_property_list_item() {
	echo '<p>Hello, World!</p>';
} // mysite_add_contents_before_property_list_item
```

## Siehe auch

- [inx_after_render_property_list_item](action-inx-after-render-property-list-item) (Inhalte **nach** der Ausgabe eines Immobilien-Listenelements einfügen)

[](_backlink.md ':include')