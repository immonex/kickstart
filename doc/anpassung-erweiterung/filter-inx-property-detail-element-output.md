# inx_property_detail_element_output (Filter)

Mit diesem Filter kann die Ausgabe von **einzelner** Elemente angepasst werden, die per Shortcode [`[inx-property-detail-element]`](/komponenten/detailansicht#einzelne-angaben) eingebunden werden.

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| **`$value`** (string) | aktueller Wert eines Elements (im Regelfall bereits für die Ausgabe aufbereitet) |
| `$meta` (array) | Metadaten |
| | `name` (string) → Mapping- oder Custom-Field-Name (alternativ: [XPath](https://de.wikipedia.org/wiki/XPath)) des per Shortcode einzubindenden Elements |
| | `initial_value` (int\|string) → Initialwert (vor dem Ausgabe-Rendering per *Template-String*) |
| | `raw_value` (int\|string) → Ausgangswert, sofern bereits beim Import eine Formatierung/Anpassung erfolgt ist |
| | `title` (string) → beim Import anhand der *Mapping-Tabelle* zugewiesene Bezeichnung |
| | `template` (string) → Vorlage für die Ausgabe/Formatierung (Basis für die Generierung von `$value`) |
| | `if_empty` (string) → Alternativtext, sofern der Elementwert leer ist |
| | `detail_item` (array) → zusätzliche Daten zum Element, sofern für die Abfrage dessen *Mapping-Name* verwendet wurde |
| | `post_id` (int\|string) → ID des [Immobilien-Beitrags](/beitragsarten-taxonomien) |
| | `immobilie` ([SimpleXMLElement](https://www.php.net/manual/de/class.simplexmlelement.php)) → OpenImmo-Daten des Objekts |

## Rückgabewert

angepasster Ausgabewert

## Rahmenfunktion

[](_info-snippet-einbindung.md ':include')

```php
add_filter( 'inx_property_detail_element_output', 'mysite_modify_property_detail_element_output', 10, 2 );

function mysite_modify_property_detail_element_output( $value, $meta ) {
	if ( 'preise.kaufpreis' === $meta['name'] ) {
		return 'Kaufpreis auf Anfrage';
	}

	return $value;
} // mysite_modify_property_detail_element_output
```

[](_backlink.md ':include')