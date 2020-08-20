---
title: Suchformular-Element rendern (Action)
search: 1
---

# inx_render_property_search_form_element (Action)

Über diesen Action-Hook kann ein **einzelnes Element** des [Immobilien-Suchformulars](../komponenten/index.html) in eine Template-Datei eingebunden werden.

> Das Rendern von (Teil)Komponenten erfolgt **anstelle von direkten Funktionsaufrufen** per Action-Hook, da so u. a. auch in [Add-ons](../add-ons.html) oder anderen Plugins/Themes **nicht** explizit die Verfügbarkeit des Kickstart-Basisplugins geprüft werden muss. <i>Render Actions</i> können auch als <i>Low-Level-Varianten</i> der hierauf aufbauenden Shortcodes betrachtet werden.

## Parameter

| Name | Beschreibung |
| ---- | ------------ |
| `$id` | Key des zu rendernden [Suchformular-Elements](filter-inx-search-form-elements.html#Das-Elements-Array-im-Detail) |
| `$element` | Eigenschaften des [Suchformular-Elements](filter-inx-search-form-elements.html#Das-Elements-Array-im-Detail) |
| `$atts` | Array beliebiger optionaler Attribute, die zum PHP-Template "durchgeschleift" werden (hier verfügbar im Array `$template_data`). Im Standard-Skin werden aktuell nur die folgenden Angaben bei **bestimmten Elementen** berücksichtigt: |
| | `references` (Referenzobjekte berücksichtigen?): *true* oder *false* |
| | `extended_count` (Anzahl Elemente im erweiterten Suchabschnitt, relevant für die Anzeige des Einblende-Elements) |

## Code-Beispiel

Die folgenden Aufrufe der <i>Render-Action</i> erfolgen typischerweise in einer **Template-Datei** ([Skin](../anpassung-erweiterung/skins.html), Theme/Child-Theme oder Plugin).

```php
// Benötigte Daten werden vom Parent-Template im Array $template_data bereitgestellt.

do_action(
	'inx_render_property_search_form_element',
	'property_type',
	$template_data['elements']['property_type'],
	[
		'extended_count' => $template_data['extended_count'],
		'references' => isset( $template_data['references'] ) ? $template_data['references'] : ''
	]
);
```