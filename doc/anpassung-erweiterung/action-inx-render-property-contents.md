# inx_render_property_contents (Action)

Über diesen Action-Hook können alle relevanten **Details** (bzw. Detail-Abschnitte) eines [Immobilien-Beitrags](/beitragsarten-taxonomien) in eine Template-Datei eingebunden werden.

> Das Rendern von (Teil)Komponenten erfolgt **anstelle von direkten Funktionsaufrufen** per Action-Hook, da so u. a. auch in [Add-ons](/add-ons) oder anderen Plugins/Themes **nicht** explizit die Verfügbarkeit des Kickstart-Basisplugins geprüft werden muss. <i>Render Actions</i> können auch als <i>Low-Level-Varianten</i> der hierauf aufbauenden Shortcodes betrachtet werden.

## Parameter

| Name | Beschreibung |
| ---- | ------------ |
| `$post_id` | ID des Immobilien-Beitrags (optional, Standard: aktueller Beitrag) |
| `$template` | Name der zu rendernden Template-Datei (ohne Suffix .php) im [Skin-Ordner](skins#ordner) (Standard: *single-property/element-hub*) |
| `$atts` | Array optionaler Attribute (Keys und mögliche Werte entsprechen den [Attributen des Detailansicht-Shortcodes](/komponenten/detailansicht#attribute)) |

> Im Array `$atts` können auch weitere, beliebige Attribute zum PHP-Template "durchgeschleift" werden (hier verfügbar im Array `$template_data`).

## Code-Beispiele

Die folgenden Aufrufe der <i>Render-Action</i> erfolgen typischerweise in einer **Template-Datei** ([Skin](skins), Theme/Child-Theme oder Plugin).

### Alle Detail-Abschnitte rendern (Element-Hub-Template)

```php
do_action( 'inx_render_property_contents' );
```

### Schlüsselangaben und Thumbnail einer Immobilie innerhalb einer Listen-Ansicht rendern

```php
do_action(
	'inx_render_property_contents',
	get_the_ID(),
	'property-list/list-item'
);
```