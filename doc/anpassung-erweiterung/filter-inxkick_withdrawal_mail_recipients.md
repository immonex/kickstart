# inxkick_withdrawal_mail_recipients (Filter)

Dieser Filter ermöglicht die kontextbasierte Anpassung der Empfänger von Widerrufsmails (Admin-Benachrichtigungen und Eingangsbestätigungen).

Die Standardadressen für den Empfang von Admin-Benachrichtigungen können in den Plugin-Optionen unter ***Allgemein → E-Mail → Admin-Empfänger-Mailadressen*** hinterlegt werden. (Ist dieses Feld leer, wird die Standard-Admin-Mailadresse der WordPress-Installation übernommen.)

Eingangsbestätigungen werden standardmäßig an die Mailadresse gesendet, die mit den Widerrufs-Formulardaten übermittelt wurde.

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| **`$recipients`** (string|array) | Array oder kommagetrennte Empfängerliste (reine Mailadresse(n) oder Name/Mailadresse gem. gem. RFC 5322) |
| `$type` (string) | Art der Nachricht: *admin_notification* oder *receipt_confirmation* |

## Rückgabewert

angepasste Empfängeradresse bzw. Adressliste

## Code-Beispiel / Rahmenfunktion

[](_info-snippet-einbindung.md ':include')

```php
/**
 * [immonex Kickstart] Zusätzlichen Empfänger von Admin-Benachrichtigungen beim
 * Eingang von Widerrufen hinzufügen.
 */

add_filter( 'inxkick_withdrawal_mail_recipients', 'mysite_add_admin_withdrawal_mail_recipient', 10, 2 );

function mysite_add_admin_withdrawal_mail_recipient( $recipients, $type ) {
	if ( 'admin_notification' === $type ) {
		$add = 'another-admin@domain.tld';

		if ( is_array( $recipients ) ) {
			$recipients[] = $add;
		} else {
			$recipients .= ',' . $add;
		}
	}

	return $recipients;
} // mysite_add_admin_withdrawal_mail_recipient
```

## Siehe auch

- [Frontend-Komponente: Widerrufsformular](/komponenten/widerrufsformular)
- [Plugin-Optionen: E-Mail](/schnellstart/einrichtung?id=e-mail)
- [Plugin-Optionen: Widerruf](/schnellstart/einrichtung?id=widerruf)


[](_backlink.md ':include')