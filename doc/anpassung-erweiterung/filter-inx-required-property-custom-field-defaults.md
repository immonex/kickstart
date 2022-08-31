# inx_required_property_custom_field_defaults (Filter)

Jedem [Immobilienbeitrag](/beitragsarten-taxonomien?id=cpt-amp-taxonomien) muss eine Reihe benutzerdefinierter Felder (*Custom Fields*) zugeordnet sein, damit eine Berücksichtigung bei allen Abfragen möglich ist.

Dieser Filter-Hook dient dazu, die zugehörigen **Standardwerte** im Rahmen des [OpenImmo-Imports](/schnellstart/import) bei Bedarf anpassen zu können.

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| `$required_property_custom_field_defaults` (array) | Namen und Standardwerte der obligatorischen Custom Fields |

### Standardumfang des Defaults-Arrays

Mit Ausnahme der Group-Master-Angabe handelt es sich bei den Array-Elementen um *Flags*, d. h. deren Vorgabewerte sind entweder *0* oder *1*.

```php
$required_property_custom_field_defaults = [
	'_immonex_is_available'        => 1,
	'_immonex_is_reserved'         => 0,
	'_immonex_is_sold'             => 0,
	'_immonex_is_reference'        => 0,
	'_immonex_is_demo'             => 0,
	'_immonex_is_featured'         => 0,
	'_immonex_is_front_page_offer' => 0,
	'_immonex_group_master'        => '',
]
```

## Rückgabewert

angepasste Standardvorgaben (nur Werte, **nicht die Feldnamen**)

## Rahmenfunktion

Eine Funktion zur Nutzung des Filters wird typischerweise in der folgenden Form in der Datei **functions.php** des **Child-Themes** oder per Code-Snippets-Plugin eingebunden.

```php
add_filter( 'inx_required_property_custom_field_defaults', 'mysite_adjust_property_cf_defaults' );

function mysite_adjust_property_cf_defaults( $required_property_custom_field_defaults ) {
	// Vorgabewert des Flags _immonex_is_available anpassen.
	$required_property_custom_field_defaults['_immonex_is_available'] = 0;

	return $required_property_custom_field_defaults;
} // mysite_adjust_property_cf_defaults
```