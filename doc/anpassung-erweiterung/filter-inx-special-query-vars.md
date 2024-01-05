# inx_special_query_vars (Filter)

[Allgemeine Abfrage-Parameter](/schnellstart/einbindung?id=allgemeine-parameter) (aka *Query-Parameter*), können entweder **komponentenübergreifend** ([GET-Variablen](/schnellstart/einbindung?id=get-variablen)/[Custom Fields (Metadaten)](/schnellstart/einbindung?id=individuelle-felder)) oder per Shortcode-Attribut für einzelne Komponenten definiert werden.

Bei der "[globalen Variante](/schnellstart/einbindung?id=globale-abfrage-parameter)" beginnen die Namen dieser Parameter (Variablen) immer mit dem Präfix `inx-`, Beispiele:

- `inx-limit` (max. Anzahl von Listenelementen)
- `inx-sort` (Sortierschlüssel für Listenansichten)
- `inx-references` (Berücksichtigung von Referenzobjekten)

Bei der Definition per Shortcode wird das Präfix nicht benötigt, Beispiel:

`[inx-property-list limit=4]`

Sollen zusätzliche Parameter dieser Art verfügbar gemacht werden, müssen diese über den o. g. Filter-Hook registriert werden.

?> Die Ergänzung solcher Variablen ist vor allem bei der Entwicklung von [Add-ons](/add-ons) relevant.

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| **`$var_names`** (array) | Liste der Variablennamen |
| `$prefix` (string) | Kickstart-Präfix (*inx-*), das in den meisten Fällen den Variablen-/Parameternamen vorangestellt wird |

## Rückgabewert

erweiterte Liste von Variablennamen (ergänzte Angaben beginnen immer mit dem Wert des Parameters `$prefix`)

## Rahmenfunktion

[](_info-snippet-einbindung.md ':include')

```php
add_filter( 'inx_special_query_vars', 'mysite_extend_special_query_vars', 10, 2 );

function mysite_extend_special_query_vars( $var_names, $prefix ) {
	// Zwei allgemeine Variablen für Abfragen ergänzen.
	$var_names[] = "{$prefix}agent";
	$var_names[] = "{$prefix}primary-agent";

	return $var_names;
} // mysite_extend_special_query_vars
```

## Siehe auch

- [inx_add_special_vars_from_post_meta](filter-inx-add-special-vars-from-post-meta) (globale Abfrage-Parameter aus Custom Fields abrufen/ergänzen)
- [Globale Abfrage-Parameter](/schnellstart/einbindung?id=globale-abfrage-parameter)

[](_backlink.md ':include')