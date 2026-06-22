# inxkick_withdrawal_mail_html_frame_params (Filter)

Dieser Filter ermöglicht die kontextbezogene Anpassung der Konfigurationsparameter für das *HTML-Rahmen-Template*, das für die via [Widerrufsformular](/komponenten/widerrufsformular) generierten Mails verwendet wird.

!> Die Einstellungen können auch in den Plugin-Optionen vorgenommen werden, die Anpassung per Filterfunktion ist daher nur in Ausnahmefällen notwendig.

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| **`$params`** (array) | Konfigurationsdaten für den *HTML-Mail-Rahmen* |
| `$type` (string) | Art der Nachricht: *admin_notification* oder *receipt_confirmation* |

### Das Params-Array im Detail

Der Wert des Elements `footer_text` entspricht der gerenderten Variante der [Mail-Signatur](/schnellstart/einrichtung?id=signatur).

```php
$params = [
	// Absolute URL der Logodatei (optional).
    'logo'          => 'https://domain.tld/wp-content/uploads/2024/06/logo.png',
    // Ziel-URL für die Logo-Verlinkung (optional).
    'logo_link_url' => 'https://domain.tld/',
    // Signatur.
    'footer_text'   => '<p><a href="https://domain.tld/">immonex ONE Demo Immobilien</a></p>',
    'layout'        => [
    	// Mögliche Logo-Position: top_left, top_center, top_right, footer_left, footer_center, footer_right.
        'logo_position' => 'top_right',
    ],
];
```

## Rückgabewert

angepasste HTML-Mail-Rahmenparameter

## Code-Beispiel

[](_info-snippet-einbindung.md ':include')

```php
/**
 * [immonex Kickstart] Logoposition in Widerrufs-Eingangsbestätigungen anpassen.
 */

add_filter( 'inxkick_withdrawal_mail_html_frame_params', 'mysite_change_logo_position', 10, 2 );

function mysite_change_logo_position( $params, $type ) {
	if ( 'receipt_confirmation' === $type ) {
		$params['layout']['logo_position'] = 'top_right';
	}

	return $params;
} // mysite_change_logo_position
```

## Siehe auch

- [Frontend-Komponente: Widerrufsformular](/komponenten/widerrufsformular)
- [Plugin-Optionen: E-Mail](/schnellstart/einrichtung?id=e-mail)
- [Plugin-Optionen: Widerruf](/schnellstart/einrichtung?id=widerruf)

[](_backlink.md ':include')