# inxkick_withdrawal_mail_attachments (Filter)

Mit diesem Filter können kontextbasierte Dateianhänge für [Widerrufs-Formularmails](/komponenten/widerrufsformular) (Admin-Benachrichtigungen und Eingangsbestätigungen) definiert werden.

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| **`$files` (array)** | anzuhängende Dateien (jeweils absoluter Dateisystem-Pfad) |
| `$type` (string) | Art der Nachricht: *admin_notification* oder *receipt_confirmation* |

## Rückgabewert

Datei-Array

## Code-Beispiel

[](_info-snippet-einbindung.md ':include')

```php
/**
 * [immonex Kickstart] ABG-PDF-Datei an Widerrufs-Eingangsbestätigung anhängen.
 */

add_filter( 'inxkick_withdrawal_mail_attachments', 'mysite_add_terms_pdf_to_withdrawal_receipt_confirmations', 10, 2 );

function mysite_add_terms_pdf_to_withdrawal_receipt_confirmations( $files, $type ) {
	if ( 'receipt_confirmation' === $type ) {
		$upload_dir = wp_upload_dir();
		$files[] = trailingslashit( $upload_dir['basedir'] ) . 'docs/agb.pdf';
	}

	return $files;
} // mysite_add_terms_pdf_to_withdrawal_receipt_confirmations
```
## Siehe auch

- [Frontend-Komponente: Widerrufsformular](/komponenten/widerrufsformular)
- [Plugin-Optionen: Widerruf](/schnellstart/einrichtung?id=widerruf)

[](_backlink.md ':include')