---
title: Seitennavigation der Immobilien-Listenansicht rendern (Action)
search: 1
---

# inx_render_pagination (Action)

Über diesen Action-Hook kann die [Seitennavigation der Immobilien-Listenansicht](../komponenten/seitennavigation.html) in eine Template-Datei eingebunden werden.

> Das Rendern von (Teil)Komponenten erfolgt **anstelle von direkten Funktionsaufrufen** per Action-Hook, da so u. a. auch in [Add-ons](../add-ons.html) oder anderen Plugins/Themes **nicht** explizit die Verfügbarkeit des Kickstart-Basisplugins geprüft werden muss. <i>Render Actions</i> können auch als <i>Low-Level-Varianten</i> der hierauf aufbauenden Shortcodes betrachtet werden.

## Code-Beispiel

Die folgenden Aufrufe der <i>Render-Action</i> erfolgen typischerweise in einer **Template-Datei** ([Skin](../anpassung-erweiterung/skins.html), Theme/Child-Theme oder Plugin).

```php
do_action( 'inx_render_pagination' );
```