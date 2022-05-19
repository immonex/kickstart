# inx_auto_applied_rendering_atts (Filter)

Über diesen Filter-Hook kann die Liste von Attributen erweitert werden, die beim **Rendern von Immobilien-Templates** automatisch "durchgeschleift" werden. (In den entsprechenden Render-Funktionen kommt dann der Filter [`inx_apply_auto_rendering_atts`](filter-inx-apply-auto-rendering-atts) zum Einsatz.)

## Beispiel

Standardmäßig werden das Attribut für benutzerdefinierte Angaben, `ref` bzw. `inx-ref` sowie (in Sonderfällen) der Sprachcode `force-lang` bzw. `inx-force-lang` auf diese Art übernommen. Wird also bspw. ein entsprechender Wert als Attribut eines Immobilien-Listen-Shortcodes definiert...

`[inx-property-list ref="123abc"]`

...ist dieser anschließend auch beim Aufruf der hier verlinkten Objekt-Detailseiten als **Template-Parameter** (Array `$template_data`) verfügbar, **ohne** dass hierfür eine explizite Definition für die Attributübergabe im zugehörigen Listen-Template enthalten sein muss:

`$inx_skin_ref = $template_data['inx-ref'];`

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| `$atts` (array) | Liste der Attribut**namen** |

## Rückgabewert

erweiterte Liste der Attributnamen

## Rahmenfunktion

Eine Funktion zur Nutzung des Filters wird typischerweise in der folgenden Form in der Datei **functions.php** des **Child-Themes** oder per Code-Snippets-Plugin eingebunden.

```php
add_filter( 'inx_auto_applied_rendering_atts', 'mysite_extend_auto_rendering_atts' );

function mysite_extend_auto_rendering_atts( $atts ) {
	// Rendering-Auto-Attribut inx-myvar ergänzen.
	$atts[] = "inx-myvar";

	return $atts;
} // mysite_extend_auto_rendering_atts
```