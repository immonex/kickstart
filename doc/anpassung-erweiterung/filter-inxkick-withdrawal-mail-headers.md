# inxkick_withdrawal_mail_headers (Filter)

Über diesen Filter-Hook können die Header-Zeilen der via [Widerrufsformular](/komponenten/widerrufsformular) generierten Mails modifiziert werden. Der Versand erfolgt mittels der regulären WordPress-Funktion [wp_mail](https://developer.wordpress.org/reference/functions/wp_mail/).

!> Die Header-Angaben sollten nur in Ausnahmefällen angepasst werden.

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| **`$headers`** (array) | Mail-Header (ein Array-Element pro Zeile) |
| `$type` (string) | Art der Nachricht: *admin_notification* oder *receipt_confirmation* |

## Rückgabewert

modifiziertes/erweitertes Header-Array

## Code-Beispiel / Rahmenfunktion

[](_info-snippet-einbindung.md ':include')

```php
/**
 * [immonex Kickstart] Headerzeilen der Widerrufs-Admin-Benachrichtigungen modifizieren.
 */

add_filter( 'inxkick_withdrawal_mail_headers', 'mysite_modify_widthdrawal_mail_headers', 10, 2 );

function mysite_modify_widthdrawal_mail_headers( $headers, $type ) {
	// Headerzeilen anpassen/ergänzen...
	// if ( 'admin_notification' === $type ) {
	//     $headers[] = 'Foo: Bar';
	// }

	return $headers;
} // mysite_modify_widthdrawal_mail_headers
```

## Siehe auch

- [Frontend-Komponente: Widerrufsformular](/komponenten/widerrufsformular)
- [Plugin-Optionen: E-Mail](/schnellstart/einrichtung?id=e-mail)
- [Plugin-Optionen: Widerruf](/schnellstart/einrichtung?id=widerruf)

[](_backlink.md ':include')