# inx_property_core_data_custom_fields (Filter)

Mit diesem Filter kann die Liste der [Custom Fields](../beitragsarten-taxonomien?id=custom-fields) angepasst werden, in denen die **Kerndaten** der Immobilien hinterlegt sind.

Die eigentlichen Inhalte der Kerndaten-Felder können vor der Ausgabe via Hook [inx_property_core_data](filter-inx-property-core-data) angepasst werden.

> **Achtung!** Ein Teil der über diesen Filter-Hook modifizierbaren Felder wird sowohl für die interne Verarbeitung als auch bei der Ausgabe innerhalb der Standard-Templates/Skins verwendet. Es sollten daher nur **Ergänzungen** vorgenommen werden.

## Parameter

| Name | Beschreibung |
| ---- | ------------ |
| `$field_names` (array) | Liste der Feldnamen |

### Das Field-Names-Array im Detail

Die Liste enthält die Feldnamen **ohne Präfix** (*\_inx\_*), d. h. *build_year* entspricht dem Feld *\_inx_build_year* in der WordPress-Post-Meta-Tabelle.

```php
[
	'property_id',
	'build_year',
	'primary_area',
	'plot_area',
	'commercial_area',
	'retail_area',
	'office_area',
	'gastronomy_area',
	'storage_area',
	'usable_area',
	'living_area',
	'basement_area',
	'attic_area',
	'misc_area',
	'garden_area',
	'total_area',
	'primary_rooms',
	'bedrooms',
	'living_bedrooms',
	'bathrooms',
	'total_rooms',
	'primary_price',
	'price_time_unit',
	'primary_units',
	'living_units',
	'commercial_units',
	'zipcode',
	'city',
	'state'
]
```

## Rückgabewert

angepasste Feldnamen-Liste

## Rahmenfunktion

Eine Funktion zur Nutzung des Filters wird typischerweise in der folgenden Form in der Datei **functions.php** des **Child-Themes** oder per Code-Snippets-Plugin eingebunden.

```php
add_filter( 'inx_property_core_data_custom_fields', 'mysite_extend_property_core_data_custom_fields' );

function mysite_extend_property_core_data_custom_fields( $field_names ) {
	// Array $field_names erweitern
	$field_names[] = 'my_custom_field';

	return $field_names;
} // mysite_extend_property_core_data_custom_fields
```