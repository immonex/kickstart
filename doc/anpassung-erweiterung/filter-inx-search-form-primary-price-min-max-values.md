# inx_search_form_primary_price_min_max_values (Filter)

Die Minimal- und Maximalwerte des **Primärpreis-Sliders** im [Suchformular](/komponenten/suchformular) werden normalerweise automatisch ermittelt, können aber bei Bedarf auch über diesen Filter-Hook überschrieben werden.

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| `$force_values` (array) | aktuelle Min/Max-Vorgaben (genau 6 `int` / `bool` Werte) |

### Das Werte-Array im Detail

Enthalten sind drei Wertpaare - jeweils Minimal- und Maximalwert:

```php
[ 0, false, 0, 500000, 0, false ]
```

Das erste Paar ist dann relevant, wenn im Suchformular **keine** Vermarktungsart ausgewählt wurde bzw. kein entsprechendes Auswahlelement vorhanden ist. Der dritte und vierte Wert (Paar 2) werden im Formular übernommen, wenn nach **Kaufobjekten** gesucht wird, der fünfte und sechste bei **Mietobjekten**.

Wird anstatt eines Integer-Wertes `false` übergeben, wird hier der jeweilige automatisch anhand der aktuellen Objektpreise ermittelte Min/Max-Wert übernommen.

## Rückgabewert

aktualisierte Min/Max-Vorgabewerte

## Rahmenfunktion

Eine Funktion zur Nutzung des Filters wird typischerweise in der folgenden Form in der Datei **functions.php** des **Child-Themes** oder per Code-Snippets-Plugin eingebunden.

```php
add_filter( 'inx_search_form_primary_price_min_max_values', 'mysite_force_price_slider_min_max_values' );

function mysite_force_price_slider_min_max_values( $force_values ) {
	/**
	 * Einheitliche Min/Max-Werte für den Preis-Slider im Suchformular fest
	 * vorgeben (200.000 bis 800.000 für Kaufobjekte, 200 bis 1.000 für
	 * Mietobjekte).
	 */
	return array( 0, false, 200000, 800000, 200, 1000 );
} // mysite_force_price_slider_min_max_values
```