# inx_after_render_single_property (Action)

Sind das [Standard-Skin](standard-skin) (oder ein hierauf aufbauendes [Custom Skin](skins?id=custom-skins)) sowie das hierin enthaltene **Standard-Template** der Immobilien-Detailseite (`single-property.php`) im Einsatz, können über diesen Filter-Hook beliebige Inhalte **nach** der Ausgabe der eigentlichen Objektdaten eingefügt werden.

## Rahmenfunktion/Beispiel

[](_info-snippet-einbindung.md ':include')

```php
/**
 * [immonex Kickstart] Textabschnitt nach Immobiliendaten (Single Template) ergänzen.
 */

add_action( 'inx_after_render_single_property', 'mysite_add_contents_after_single_property' );

function mysite_add_contents_after_single_property() {
	echo '<p>Hello, World!</p>';
} // mysite_add_contents_after_single_property
```

## Siehe auch

- [inx_before_render_single_property](action-inx-before-render-single-property) (Inhalte **vor** der Objektdatenausgabe per Standard-Template einfügen)

[](_backlink.md ':include')