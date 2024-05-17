# inx_render_property_map (Action)

Über diesen Action-Hook kann eine [Immobilien-Übersichtskarte](/komponenten/karte) in eine Template-Datei eingebunden werden.

?> Das Rendern von (Teil)Komponenten erfolgt **anstelle von direkten Funktionsaufrufen** per Action-Hook, da so u. a. auch in [Add-ons](/add-ons) oder anderen Plugins/Themes **nicht** explizit die Verfügbarkeit des Kickstart-Basisplugins geprüft werden muss. *Render Actions* können auch als *Low-Level-Varianten* der hierauf aufbauenden Shortcodes betrachtet werden.

## Parameter

| Name | Beschreibung |
| ---- | ------------ |
| `$atts` | Array optionaler Attribute (Keys und mögliche Werte entsprechen den [Attributen des Karten-Shortcodes](/komponenten/karte?id=attribute)) |

## Code-Beispiel

Die folgenden Aufrufe der *Render-Action* erfolgen typischerweise in einer **Template-Datei** ([Skin](skins), Theme/Child-Theme oder Plugin).

```php
/**
 * [immonex Kickstart] Immobilienstandort-Übersichtskarte generieren und einbinden.
 */

do_action( 'inx_render_property_map', [
	'lat' => 49.8587840,
	'lng' => 6.7854410,
	'zoom' => 14
] );
```

[](_backlink.md ':include')