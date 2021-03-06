---
title: GET-Variablen aus Backlinks ausfiltern (Filter)
search: 1
---

# inx_exclude_backlink_vars (Filter)

Im Footer der [Immobilien-Detailansicht](../komponenten/detailansicht.html#Standard-Template) ist in der Regel ein <i>Backlink</i> enthalten, über den zurück zu einer passenden Übersichtsseite ([Listenansicht](../komponenten/liste.html)) navigiert werden kann (meistens die vorherige Seite).

Die Link-URL wird vorab in der verweisenden Seite automatisch generiert, wobei hier auch die aktuellen GET-Variablen mit berücksichtigt werden. In verschiedenen Fällen kann es nötig sein, bestimmte GET-Variablen von der Übernahme in den Backlink auszuschließen, was über diesen Filter-Hook möglich ist.

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| `$var_names` (array) | Liste der auszuschließenden Variablennamen |

## Rückgabewert

aktualisierte/erweiterte Liste von GET-Variablennamen

## Rahmenfunktion

Eine Funktion zur Nutzung des Filters wird typischerweise in der folgenden Form in der Datei **functions.php** des **Child-Themes** oder per Code-Snippets-Plugin eingebunden.

```php
add_filter( 'inx_exclude_backlink_vars', 'mysite_exclude_backlink_vars' );

function mysite_exclude_backlink_vars( $var_names ) {
	// Auszuschließende GET-Variablen ergänzen.
	$var_names[] = 'inx-limit';
	$var_names[] = 'inx-limit-page';

	return $var_names;
} // mysite_exclude_backlink_vars
```