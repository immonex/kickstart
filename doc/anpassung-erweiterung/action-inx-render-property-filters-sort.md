# inx_render_property_filters_sort (Action)

Über diesen Action-Hook kann eine [Auswahlbox für die Sortierung der Listenansicht](/komponenten/sortierung) in eine Template-Datei eingebunden werden.

?> Das Rendern von (Teil)Komponenten erfolgt **anstelle von direkten Funktionsaufrufen** per Action-Hook, da so u. a. auch in [Add-ons](/add-ons) oder anderen Plugins/Themes **nicht** explizit die Verfügbarkeit des Kickstart-Basisplugins geprüft werden muss. *Render Actions* können auch als *Low-Level-Varianten* der hierauf aufbauenden Shortcodes betrachtet werden.

## Parameter

| Name | Beschreibung |
| ---- | ------------ |
| `$template` | Name der zu rendernden Template-Datei (ohne Suffix .php) im [Skin-Ordner](skins#ordner) (Standard: *property-list/filters-sort*) |
| `$atts` | Array beliebiger optionaler Attribute, die zum PHP-Template "durchgeschleift" werden (hier verfügbar im Array `$template_data`) |

## Code-Beispiel

Die folgenden Aufrufe der *Render-Action* erfolgen typischerweise in einer **Template-Datei** ([Skin](skins), Theme/Child-Theme oder Plugin).

```php
do_action( 'inx_render_property_filters_sort' );
```

[](_backlink.md ':include')