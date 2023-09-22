# inx_default_sort_key (Filter)

Mit diesem Filter kann eine alternative Standard-Sortierung für die [Immobilien-Listenansicht](/komponenten/liste) bzw. die Vorgabeoption der entsprechenden [Auswahlbox](/komponenten/sortierung) festgelegt werden (normalerweise Aktualisierungsdatum absteigend - `date_desc`).

## Parameter

| Name | Beschreibung |
| ---- | ------------ |
| **`$key`** (string) | Schlüssel der Sortierung (entspricht dem [Optionskey der Sortierungs-Komponente](/komponenten/sortierung#standard-optionen)) |

## Rückgabewert

alternativer [Sortierschlüssel](/komponenten/sortierung#standard-optionen)

## Rahmenfunktion

[](_info-snippet-einbindung.md ':include')

```php
add_filter( 'inx_default_sort_key', 'mysite_modify_default_sort_key' );

function mysite_modify_default_sort_key( $key ) {
	// alternative Standard-Sortierung: Fläche aufsteigend
	return 'area_asc';
} // mysite_modify_default_sort_key
```

[](_backlink.md ':include')