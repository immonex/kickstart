# inx_fulltext_search_fields (Filter)

Bei der [Suche nach Schlüsselwörtern](/komponenten/suchformular) werden regulär die Inhalte der u. g. benutzerdefinierten Felder (Custom Fields) durchsucht. Über diesen Filter-Hook können bei Bedarf weitere zu durchsuchende Felder ergänzt werden.

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| **`$fields`** (array) | Feldnamen-Liste |

### Standardumfang der Feldliste

| Feldname | Beschreibung |
| ---------- | ------------ |
| `_inx_property_title` | Objekttitel (Bezeichnung der Immobilie) |
| `_inx_property_descr` | Beschreibungstext (allgemein) |
| `_inx_short_descr` | Kurzbeschreibung |
| `_inx_location_descr` | Lagebeschreibung |
| `_inx_features_descr` | Ausstattungsbeschreibung |
| `_inx_misc_descr` | sonstige Angaben |
| `_inx_property_id` | Objektnummer |
| `_inx_full_address` | Standortadresse |
| `_inx_street` | Straße |

## Rückgabewert

angepasste/erweiterte Feldnamen-Liste

## Rahmenfunktion

[](_info-snippet-einbindung.md ':include')

```php
add_filter( 'inx_fulltext_search_fields', 'mysite_add_fulltext_search_fields' );

function mysite_add_fulltext_search_fields( $fields ) {
	// Zu durchsuchendes Custom Field ergänzen.
	$fields[] = 'feldname';

	return $fields;
} // mysite_add_fulltext_search_fields
```

[](_backlink.md ':include')