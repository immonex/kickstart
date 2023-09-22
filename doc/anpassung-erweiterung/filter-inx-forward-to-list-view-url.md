# inx_forward_to_list_view_url (Filter)

Wurde für die Ausgabe der [Immobiliendetails](/komponenten/detailansicht) in den Plugin-Optionen eine eigens hierfür angelegte [Vorlageseite](/schnellstart/einrichtung?id=immobilien-detailseite) ausgewählt, erfolgt beim direkten Aufruf (ohne ID einer bestimmten Immobilie) eine Weiterleitung zur **primären Listenansicht**. Die entsprechende URL kann über diesen Filter-Hook angepasst werden, falls nötig.

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| **`$property_list_url`** (string) | URL der Standard-Listenansicht |

## Rückgabewert

alternative URL

## Rahmenfunktion

[](_info-snippet-einbindung.md ':include')

```php
add_filter( 'inx_forward_to_list_view_url', 'mysite_set_list_view_forwarding_url' );

function mysite_set_list_view_forwarding_url( $property_list_url ) {
	// Alternative Weiterleitungs-URL festlegen.
	return 'https://immobilienmakler-website.de/immobilienangebot/';
} // mysite_set_list_view_forwarding_url
```

[](_backlink.md ':include')