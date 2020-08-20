---
title: Standard-Sortierung von Immobilien-Listen (Filter)
search: 1
---

# inx_default_sort_key (Filter)

Mit diesem Filter kann eine alternative Standard-Sortierung für die [Immobilien-Listenansicht](../komponenten/liste.html) bzw. die Vorgabeoption der entsprechenden [Auswahlbox](../komponenten/sortierung.html) festgelegt werden (normalerweise Aktualisierungsdatum absteigend - `date_desc`).

## Parameter

| Name | Beschreibung |
| ---- | ------------ |
| `$key` | Schlüssel der Sortierung (entspricht dem [Optionskey der Sortierungs-Komponente](../komponenten/sortierung.html#Standard-Optionen)) |

## Rückgabewert

alternativer [Sortierschlüssel](../komponenten/sortierung.html#Standard-Optionen)

## Rahmenfunktion

Eine Funktion zur Nutzung des Filters wird typischerweise in der folgenden Form in der Datei **functions.php** des **Child-Themes** oder per Code-Snippets-Plugin eingebunden.

```php
add_filter( 'inx_default_sort_key', 'mysite_modify_default_sort_key' );

function mysite_modify_default_sort_key( $key ) {
	// alternative Standard-Sortierung: Fläche aufsteigend
	return 'area_asc';
} // mysite_modify_default_sort_key
```