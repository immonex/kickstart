# inx_search_form_element_tax_options (Filter)

Über diesen Filter-Hook können die die Auswahloptionen von **taxonomiebasierten** Elementen (Select/Radio) des Suchformulars bearbeitet werden.

Die Parameter für den **Abruf** dieser Optionen via [get_terms](https://developer.wordpress.org/reference/functions/get_terms/) können mit dem Filter [`inx_search_form_element_tax_args`](filter-inx-search-form-element-tax-args) angepasst werden.

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| `$options` (array) | Key-Value-Liste der Auswahloptionen |
| `$element_key` (string) | Key des [Suchformular-Elements](/komponenten/suchformular#elemente), auf den sich die Abfrage bezieht |
| `$element` (array) | der komplette Datensatz des Elements |
| `$atts` (array) | weitere Attribute, die für das Rendering des Elements übergeben wurden |

## Rückgabewert

angepasstes/erweitertes `$options`-Array

## Rahmenfunktion

Eine Funktion zur Nutzung des Filters wird typischerweise in der folgenden Form in der Datei **functions.php** des **Child-Themes** oder per Code-Snippets-Plugin eingebunden.

```php
add_filter( 'inx_search_form_element_tax_options', 'mysite_modify_search_form_element_tax_options', 10, 4 );

function mysite_modify_search_form_element_tax_options( $options, $element_id, $element, $atts ) {
	// Array $options anpassen oder erweitern...

	return $options;
} // mysite_modify_search_form_element_tax_options
```