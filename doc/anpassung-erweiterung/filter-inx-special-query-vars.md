# inx_special_query_vars (Filter)

Eine Reihe von <i>allgemeinen Variablen</i> für die Abfrage und Darstellung von Kickstart-spezifischen Daten kann **komponentenübergreifend** definiert werden, bspw. per [GET-Parameter](/schnellstart/einbindung#get-parameter) (für alle betroffenen Komponenten einer Seite) oder Shortcode-Attribut (einzelne Komponenten). Die Namen dieser Variablen beginnen immer mit dem Präfix `inx-`, Beispiele:

- `inx-limit` (max. Anzahl von Listenelementen)
- `inx-sort` (Sortierschlüssel für Listenansichten)
- `inx-references` (Berücksichtigung von Referenzobjekten)

Sollen zusätzliche Variablen dieser Art verfügbar gemacht werden, müssen diese über den o. g. Filter-Hook registriert werden.

> Die Ergänzung solcher Variablen ist vor allem bei der Entwicklung von [Add-ons](/add-ons) relevant.

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| `$var_names` (array) | Liste der Variablennamen |
| `$prefix` (string) | Kickstart-Präfix (*inx-*), das in den meisten Fällen den Variablen-/Parameternamen vorangestellt wird |

## Rückgabewert

erweiterte Liste von Variablennamen (ergänzte Angaben beginnen immer mit dem Wert des Parameters `$prefix`)

## Rahmenfunktion

Eine Funktion zur Nutzung des Filters wird typischerweise in der folgenden Form in der Datei **functions.php** des **Child-Themes** oder per Code-Snippets-Plugin eingebunden.

```php
add_filter( 'inx_special_query_vars', 'mysite_extend_special_query_vars', 10, 2 );

function mysite_extend_special_query_vars( $var_names, $prefix ) {
	// Zwei allgemeine Variablen für Abfragen ergänzen.
	$var_names[] = "{$inx_prefix}agent";
	$var_names[] = "{$inx_prefix}primary-agent";

	return $var_names;
} // mysite_extend_special_query_vars
```