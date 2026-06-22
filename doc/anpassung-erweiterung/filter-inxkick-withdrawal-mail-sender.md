# inxkick_withdrawal_mail_sender (Filter)

Über diesen Filter-Hook kann die Absenderangabe für den `From:`-Header der Widerrufsmails (Admin-Benachrichtigung und Eingangsbestätigung) angepasst werden.

?> Absendername und -mailadresse können auch in den [Plugin-Optionen](/schnellstart/einrichtung?id=e-mail) (***Allgemein → E-Mail***) angepasst werden, d. h. eine Änderung per Filterfunktion ist nur in Ausnahmefällen notwendig.

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| **`$sender`** (string) | Mailadresse oder Kombination aus Absendername und Mailadresse gem. RFC 5322 |

## Rückgabewert

alternative Absenderangabe

## Code-Beispiel

[](_info-snippet-einbindung.md ':include')

```php
/**
 * [immonex Kickstart] Absender-Mailadresse für Widerrufsmails ändern.
 */

add_filter( 'inxkick_withdrawal_mail_sender', 'mysite_change_withdrawal_mail_sender' );

function mysite_mysite_change_withdrawal_mail_sender( $sender ) {
	return 'Hinnak Hero <weltmarktfuehrer@really-really.tld>';
} // mysite_mysite_change_withdrawal_mail_sender
```

## Siehe auch

- [Frontend-Komponente: Widerrufsformular](/komponenten/widerrufsformular)
- [Plugin-Optionen: E-Mail](/schnellstart/einrichtung?id=e-mail)
- [Plugin-Optionen: Widerruf](/schnellstart/einrichtung?id=widerruf)

[](_backlink.md ':include')