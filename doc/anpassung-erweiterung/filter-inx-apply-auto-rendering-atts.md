# inx_apply_auto_rendering_atts (Filter)

Dieser Filter dient der eigentlichen Übernahme der *Rendering-Auto-Attribute* inkl. deren aktuellen Werten, die via [`inx_auto_applied_rendering_atts`](filter-inx-auto-applied-rendering-atts) definiert wurden.

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| `$atts` (array) | Attributliste als assoziatives Array (*'key' => 'value'*) |

## Rückgabewert

erweiterte Attributliste

## Code-Beispiel

> Eine Filterfunktion zur Erweiterung von Attribut-Arrays um die Rendering-Auto-Attribute muss **nicht** implementiert werden. Stattdessen wird in den entsprechenden Rendering-Funktionen eine `apply_filters`-Anweisung hinterlegt.

```php
// Vorhandenes Attribut-Array um Rendering-Auto-Attribute erweitern.
$atts = apply_filters( 'inx_apply_auto_rendering_atts', $atts );
```