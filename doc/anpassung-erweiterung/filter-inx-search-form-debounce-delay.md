# inx_search_form_debounce_delay (Filter)

Damit bei aktivierter [dynamischer Listen- und Kartenaktualisierung](/komponenten/suchformular?id=dynamische-listen-amp-karten) die Ergebnisse bei schneller Anpassung mehrerer Suchkriterien nicht unnötig oft hintereinander aktualisiert werden, enhält das Formular eine *Debounce*-Funktion für die verzögerte Ausführung.

Der Standardwert von **600 ms** (0,6 Sekunden) kann mit diesem Filter-Hook angepasst werden.

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| **`$delay`** (int) | Verzögerung in Millisekunden (Standard: *600*) |

## Rückgabewert

angepasster Verzögerungswert in ms

## Rahmenfunktion

[](_info-snippet-einbindung.md ':include')

```php
add_filter( 'inx_search_form_debounce_delay', 'mysite_set_property_search_form_debounce_delay' );

function mysite_set_property_search_form_debounce_delay( $delay ) {
	// Debounce-Verzögerung: 2,5 anstatt 0,6 Sekunden.
	return 2500;
} // mysite_set_property_search_form_debounce_delay
```

[](_backlink.md ':include')