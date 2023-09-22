# inx_render_property_search_form_element (Action)

Über diesen Action-Hook kann ein **einzelnes Element** des [Immobilien-Suchformulars](/komponenten/suchformular) in eine Template-Datei eingebunden werden.

?> Das Rendern von (Teil)Komponenten erfolgt **anstelle von direkten Funktionsaufrufen** per Action-Hook, da so u. a. auch in [Add-ons](/add-ons) oder anderen Plugins/Themes **nicht** explizit die Verfügbarkeit des Kickstart-Basisplugins geprüft werden muss. *Render Actions* können auch als *Low-Level-Varianten* der hierauf aufbauenden Shortcodes betrachtet werden.

## Parameter

| Name | Beschreibung |
| ---- | ------------ |
| `$id` | Key des zu rendernden [Suchformular-Elements](filter-inx-search-form-elements.html#das-elements-array-im-detail) |
| `$element` | Eigenschaften des [Suchformular-Elements](filter-inx-search-form-elements.html#das-elements-array-im-detail) |
| `$atts` | Array beliebiger optionaler Attribute, die zum PHP-Template "durchgeschleift" werden (hier verfügbar im Array `$template_data`). Im Standard-Skin werden aktuell nur die folgenden Angaben bei **bestimmten Elementen** berücksichtigt: |
| | `references` (Referenzobjekte berücksichtigen?): *true* oder *false* |
| | `extended_count` (Anzahl Elemente im erweiterten Suchabschnitt, relevant für die Anzeige des Einblende-Elements) |

## Code-Beispiel

Die folgenden Aufrufe der *Render-Action* erfolgen typischerweise in einer **Template-Datei** ([Skin](skins), Theme/Child-Theme oder Plugin).

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

[](_backlink.md ':include')