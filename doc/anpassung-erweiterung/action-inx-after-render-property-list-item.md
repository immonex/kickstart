# inx_after_render_property_list_item (Action)

Ist das [Standard-Skin](standard-skin) (oder ein hierauf aufbauendes [Custom Skin](skins?id=custom-skins)) im Einsatz, können über diesen Action-Hook beliebige Inhalte **nach** der Ausgabe **jeder** Immobilie innerhalb einer [Immobilien-Listenansicht](/komponenten/liste) eingefügt werden.

## Rahmenfunktion/Beispiel

[](_info-snippet-einbindung.md ':include')

```php
/**
 * [immonex Kickstart] Inhalt nach jedem Immobilien-Listenelement einfügen.
 */

add_action( 'inx_after_render_property_list_item', 'mysite_add_contents_after_property_list_item' );

function mysite_add_contents_after_property_list_item() {
	echo '<p>Hello, World!</p>';
} // mysite_add_contents_after_property_list_item
```

## Siehe auch

- [inx_before_render_property_list_item](action-inx-before-render-property-list-item) (Inhalte **vor** der Ausgabe eines Immobilien-Listenelements einfügen)

[](_backlink.md ':include')