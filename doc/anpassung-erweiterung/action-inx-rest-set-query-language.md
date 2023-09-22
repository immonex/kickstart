# inx_rest_set_query_language (Action)

Bei den AJAX-Abfragen für die [dynamische Aktualisierung](/komponenten/liste?id=dynamische-aktualisierung) von [Immobilien-Listenansichten](/komponenten/liste) und [Karten](/komponenten/karte) wird in [mehrsprachigen Installationen](uebersetzung-mehrsprachigkeit) (WPML/Polylang) per *GET-Parameter* `inx-r-lang` die Ausgabesprache übergeben.

Die entsprechende Umschaltung der Abfragesprache erfolgt auf der WordPress-Seite über diesen Hook.

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| `$lang` (string) | Sprachcode gemäß [ISO 639-1](https://de.wikipedia.org/wiki/Liste_der_ISO-639-1-Codes), z. B. *de* |
| `$request` (object) | [WP_REST_Request-Objekt](https://developer.wordpress.org/reference/classes/wp_rest_request/) |

## Rahmenfunktion

[](_info-snippet-einbindung.md ':include')

```php
/**
 * [immonex Kickstart] Aktion beim Festlegen der Abfragesprache via REST-API ausführen.
 */

add_filter( 'inx_rest_set_query_language', 'mysite_do_on_rest_lang_switch', 10, 2 );

function mysite_do_on_rest_lang_switch( $lang, $request ) {
	// do something
} // mysite_do_on_rest_lang_switch
```

[](_backlink.md ':include')