# inx_search_form_element_tax_args (Filter)

Über diesen Filter-Hook können die Parameter für den Abruf der Auswahloptionen von **taxonomiebasierten** Elementen (Select/Radio) des Suchformulars bearbeitet werden (➞ `$args` von [get_terms](https://developer.wordpress.org/reference/functions/get_terms/)).

Sofern die Auswahloptionen erst **nach dem Abrufen** angepasst werden sollen, kann das mit dem Filter [`inx_search_form_element_tax_options`](filter-inx-search-form-element-tax-options) realisiert werden.

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| `$args` (array) | entspricht dem Parameter `$args` von [get_terms](https://developer.wordpress.org/reference/functions/get_terms/) |
| `$element_key` (string) | Key des [Suchformular-Elements](/komponenten/suchformular#elemente), auf den sich die Abfrage bezieht |
| `$element` (array) | der komplette Datensatz des Elements |
| `$atts` (array) | weitere Attribute, die für das Rendering des Elements übergeben wurden |

## Rückgabewert

angepasstes/erweitertes `$args`-Array

## Rahmenfunktion

Eine Funktion zur Nutzung des Filters wird typischerweise in der folgenden Form in der Datei **functions.php** des **Child-Themes** oder per Code-Snippets-Plugin eingebunden.

```php
add_filter( 'inx_search_form_element_tax_args', 'mysite_modify_search_form_element_tax_args', 10, 4 );

function mysite_modify_search_form_element_tax_args( $args, $element_id, $element, $atts ) {
	if ( 'features' === $element_id ) {
		/**
		 * Immer alle Ausstattungsmerkmale (features) anzeigen, auch wenn
		 * keine passenden Immobilienangebote vorhanden sind.
		 */
		$args['hide_empty'] = true;
	}

	return $args;
} // mysite_modify_search_form_element_tax_args
```