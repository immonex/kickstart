# inx_exclude_backlink_vars (Filter)

Im Footer der [Immobilien-Detailansicht](/komponenten/detailansicht#standard-template) ist in der Regel ein *Backlink* enthalten, über den zurück zu einer passenden Übersichtsseite ([Listenansicht](/komponenten/liste)) navigiert werden kann (meistens die vorherige Seite).

Die Link-URL wird vorab in der verweisenden Seite automatisch generiert, wobei hier auch die aktuellen GET-Variablen mit berücksichtigt werden. In verschiedenen Fällen kann es nötig sein, bestimmte GET-Variablen von der Übernahme in den Backlink auszuschließen, was über diesen Filter-Hook möglich ist.

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| **`$var_names`** (array) | Liste der auszuschließenden Variablennamen |

## Rückgabewert

aktualisierte/erweiterte Liste von GET-Variablennamen

## Rahmenfunktion

[](_info-snippet-einbindung.md ':include')

```php
add_filter( 'inx_exclude_backlink_vars', 'mysite_exclude_backlink_vars' );

function mysite_exclude_backlink_vars( $var_names ) {
	// Auszuschließende GET-Variablen ergänzen.
	$var_names[] = 'inx-limit';
	$var_names[] = 'inx-limit-page';

	return $var_names;
} // mysite_exclude_backlink_vars
```

[](_backlink.md ':include')