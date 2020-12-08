---
title: Immobilien-Standortkarte rendern (Action)
search: 1
---

# inx_render_property_map (Action)

Über diesen Action-Hook kann eine [Immobilien-Standortkarte](../komponenten/karte.html) in eine Template-Datei eingebunden werden.

> Das Rendern von (Teil)Komponenten erfolgt **anstelle von direkten Funktionsaufrufen** per Action-Hook, da so u. a. auch in [Add-ons](../add-ons.html) oder anderen Plugins/Themes **nicht** explizit die Verfügbarkeit des Kickstart-Basisplugins geprüft werden muss. <i>Render Actions</i> können auch als <i>Low-Level-Varianten</i> der hierauf aufbauenden Shortcodes betrachtet werden.

## Parameter

| Name | Beschreibung |
| ---- | ------------ |
| `$atts` | Array beliebiger optionaler Attribute, die zum PHP-Template "durchgeschleift" werden (hier verfügbar im Array `$template_data`). Im Standard-Skin werden aktuell nur die folgenden **optionalen** Angaben berücksichtigt: |
| | `template` (zu rendernde Template-Datei im [Skin-Ordner](../anpassung-erweiterung/skins.html#Ordner), Standard: *property-list/map*) |
| | `lat` (Standard-Breitengrad des [Kartenmittelpunkts](../schnellstart/einrichtung.html#Karten-in-Immobilien-Listenseiten) als **Float-Wert** zwischen -90 und 90, z. B. *49.8587840* \*) |
| | `lng` (Längengrad des [Kartenmittelpunkts](../schnellstart/einrichtung.html#Karten-in-Immobilien-Listenseiten) als **Float-Wert** zwischen -180 bis 180, z. B. *6.7854410* \*) |
| | `zoom` (Initial-Zoomstufe der Karte als **Ganzzahl** zwischen 8 und 18 \*) |

\* Mittelpunkt und Zoom der Karte werden normalerweise™ anhand der Koordinaten der enthaltenen Standortmarker automatisch ermittelt.

## Code-Beispiel

Die folgenden Aufrufe der <i>Render-Action</i> erfolgen typischerweise in einer **Template-Datei** ([Skin](../anpassung-erweiterung/skins.html), Theme/Child-Theme oder Plugin).

```php
do_action( 'inx_render_property_map', [
	'lat' => 49.8587840,
	'lng' => 6.7854410,
	'zoom' => 14
] );
```