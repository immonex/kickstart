---
title: Minimal/Maximal-Werte für Flächen-Slider festlegen oder anpassen (Filter)
search: 1
---

# inx_search_form_area_min_max_value (Filter)

Die Minimal- und Maximalwerte eines **Flächen-Sliders** (z. B. Mindestwohnfläche) im [Suchformular](../komponenten/index.html) werden normalerweise automatisch ermittelt, können aber bei Bedarf auch über diesen Filter-Hook überschrieben werden.

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| `$min_max` (array) | aktuelle Min/Max-Vorgaben in m² (zwei `int`-Werte, wobei der Mindestwert im Regelfall 0 ist) |
| `$area_type` (string) | Flächenart, auf den sich der per Slider festgelegte Wert bezieht |
| | *primary*: Primärfläche |
| | *living*: Wohnfläche |
| | *commercial*: Gewerbefläche |
| | *retail*: Verkaufsfläche |
| | *office*: Bürofläche |
| | *gastronomy*: Gastronomie/Hotellerie-Fläche |
| | *plot*: Grundstücksfläche |
| | *usable*: Nutzfläche |
| | *basement*: Kellerfläche |
| | *attic*: Dachbodenfläche |
| | *garden*: Gartenfläche |
| | *misc*: Rahmens sonstige Fläche |
| | *total*: Gesamtfläche |

## Rückgabewert

aktualisierte Min/Max-Vorgabewerte als Array mit zwei Elementen

## Rahmenfunktion

Eine Funktion zur Nutzung des Filters wird typischerweise in der folgenden Form in der Datei **functions.php** des **Child-Themes** oder per Code-Snippets-Plugin eingebunden.

```php
add_filter( 'inx_search_form_area_min_max_value', 'mysite_force_area_slider_min_max_values', 10, 2 );

function mysite_force_area_slider_min_max_values( $min_max, $area_type ) {
	if ( 'living' === $area_type ) {
		/**
		 * Einheitliche Min/Max-Werte (0 - 250 m²) für den Wohnflächen-Slider
		 * im Suchformular vorgeben.
		 */
		return [ 0, 250 ];
	}

	return $min_max;
} // mysite_force_area_slider_min_max_values
```