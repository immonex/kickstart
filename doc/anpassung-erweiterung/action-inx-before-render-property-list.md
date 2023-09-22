# inx_before_render_property_list (Action)

Ist das [Standard-Skin](standard-skin) (oder ein hierauf aufbauendes [Custom Skin](skins?id=custom-skins)) im Einsatz, können über diesen Filter-Hook beliebige Inhalte **vor** der Ausgabe einer [Immobilien-Listenansicht](/komponenten/liste) eingefügt werden.

## Parameter

| Name | Inhalt/Beschreibung |
| ---- | ------------ |
| `$has_properties` (bool) | Immobilien enthalten? |

## Rahmenfunktion/Beispiel

[](_info-snippet-einbindung.md ':include')

```php
/**
 * [immonex Kickstart] Infotext vor der Ausgabe aller Immobilienlisten einfügen.
 */

add_action( 'inx_before_render_property_list', 'mysite_add_contents_before_property_list' );

function mysite_add_contents_before_property_list( $has_properties ) {
	if ( $has_properties ) {
		echo '<p>Hello, World!</p>';
	}
} // mysite_add_contents_before_property_list
```

## Siehe auch

- [inx_after_render_property_list](action-inx-after-render-property-list) (Inhalte **nach** der Ausgabe einer Immobilienliste einfügen)

[](_backlink.md ':include')