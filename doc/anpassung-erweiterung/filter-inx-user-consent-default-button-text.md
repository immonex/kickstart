# inx_user_consent_default_button_text (Filter)

Über diesen Filter-Hook kann der **Standard**-Button-Text zur Bestätigung von [Benutzereinwilligungen](/schnellstart/einrichtung?id=benutzereinwilligung) vor der Einbindung externer Dienste (Karten, Videos, 360°-Tour-Viewer etc.) angepasst werden.

Hierbei handelt es sich um eine *Fallback-Angabe*, die nur dann übernommen wird, wenn kein spezifischer *Einwilligungstyp* (Dienst/Anbieter) mit einem gesondert definierten Button-Text ermittelt werden kann.

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| **`$button_text`** (string) | Text des Bestätigungsbuttons |

## Rückgabewert

angepasster Button-Text

## Code-Beispiel

[](_info-snippet-einbindung.md ':include')

```php
add_filter( 'inx_user_consent_default_button_text', 'mysite_modify_default_user_consent_button_text' );

function mysite_modify_default_user_consent_button_text( $button_text ) {
	// Fallback-Button-Text für Benutzereinwilligungen anpassen.
	return __( 'Wooo Wooooooo!', 'my-textdomain' );
} // mysite_modify_default_user_consent_button_text
```

## Siehe auch

- [inx_user_consent_contents](filter-inx-user-consent-contents) (Inhalte aller Benutzereinwilligungs-Abfragen)
- [inx_get_user_consent_content](filter-inx-get-user-consent-content) (Inhalte eines bestimmten Nutzereinwilligungstyps bzw. Fallback-Angaben)
- [Benutzereinwilligung (Plugin-Optionen)](/schnellstart/einrichtung?id=benutzereinwilligung)

[](_backlink.md ':include')