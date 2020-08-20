---
title: Immobilien-Suchformular rendern (Action)
search: 1
---

# inx_render_property_search_form (Action)

Über diesen Action-Hook kann das [Immobilien-Suchformular](../komponenten/index.html) in eine Template-Datei eingebunden werden.

> Das Rendern von (Teil)Komponenten erfolgt **anstelle von direkten Funktionsaufrufen** per Action-Hook, da so u. a. auch in [Add-ons](../add-ons.html) oder anderen Plugins/Themes **nicht** explizit die Verfügbarkeit des Kickstart-Basisplugins geprüft werden muss. <i>Render Actions</i> können auch als <i>Low-Level-Varianten</i> der hierauf aufbauenden Shortcodes betrachtet werden.

## Parameter

| Name | Beschreibung |
| ---- | ------------ |
| `$template` | Name der zu rendernden Template-Datei (ohne Suffix .php) im [Skin-Ordner](../anpassung-erweiterung/skins.html#Ordner) (Standard: *property-search*) |
| `$atts` | Array optionaler Attribute (Keys und mögliche Werte entsprechen den [Attributen des Suchformular-Shortcodes](../komponenten/index.html#Attribute)) |

> Im Array `$atts` können auch weitere, beliebige Attribute zum PHP-Template "durchgeschleift" werden (hier verfügbar im Array `$template_data`).

## Code-Beispiele

Die folgenden Aufrufe der <i>Render-Action</i> erfolgen typischerweise in einer **Template-Datei** ([Skin](../anpassung-erweiterung/skins.html), Theme/Child-Theme oder Plugin).

### Standard-Suchformular rendern

```php
do_action( 'inx_render_property_search_form' );
```

### Suchformular mit reduziertem Umfang und alternativer Ergebnis-Seite rendern

```php
do_action(
	'inx_render_property_search_form',
	'property-search',
	[
		'elements' => 'property-type, marketing-type, submit'
		'results-page-id' => 4711
	]
);
```