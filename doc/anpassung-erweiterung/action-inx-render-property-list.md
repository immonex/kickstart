# inx_render_property_list (Action)

Über diesen Action-Hook kann eine [Immobilien-Listenansicht](/komponenten/liste) in eine Template-Datei eingebunden werden.

?> Das Rendern von (Teil)Komponenten erfolgt **anstelle von direkten Funktionsaufrufen** per Action-Hook, da so u. a. auch in [Add-ons](/add-ons) oder anderen Plugins/Themes **nicht** explizit die Verfügbarkeit des Kickstart-Basisplugins geprüft werden muss. *Render Actions* können auch als *Low-Level-Varianten* der hierauf aufbauenden Shortcodes betrachtet werden.

## Parameter

| Name | Beschreibung |
| ---- | ------------ |
| `$atts` | Array beliebiger optionaler Attribute, die zum PHP-Template "durchgeschleift" werden (hier verfügbar im Array `$template_data`). Im Standard-Skin werden aktuell nur die folgenden Angaben berücksichtigt: |
| | `template` (zu rendernde Template-Datei im [Skin-Ordner](skins#ordner), Standard: *property-list/properties*) |
| | `is_regular_archive_page` (Boolean-Wert, *true* bei Einbindung in regulären Archivseiten) |

## Code-Beispiel

Die folgenden Aufrufe der *Render-Action* erfolgen typischerweise in einer **Template-Datei** ([Skin](skins), Theme/Child-Theme oder Plugin).

```php
// Standard-Listen-Template innerhalb des regulären Archiv-Templates der Immobilien-Beitragsart rendern
do_action( 'inx_render_property_list', [
	'is_regular_archive_page' => true
] );
```

[](_backlink.md ':include')