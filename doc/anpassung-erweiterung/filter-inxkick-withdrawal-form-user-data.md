# inxkick_withdrawal_form_user_data (Filter)

Mit diesem Filter können die im Frontend per [Widerrufsformular](../komponenten/widerrufsformular) erfassten Benutzer-Daten verarbeitet oder modifiziert werden.

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| **`$form_data`** (array) | Formulardaten |

### Form-Data-Array im Detail

Das übergebene Formulardaten-Array sieht typischerweise so aus:

```php
$form_data = [
	'salutation'       => 'Herr',
	'first_name'       => 'Heinz',
	'last_name'        => 'Tester',
	'street'           => 'Musterstraße 14',
	'postal_code'      => '99999',
	'city'             => 'Demostadt',
	'phone'            => '0999 123456',
	'email'            => 'heinz@domain.tld',
	'reference_number' => '123',
	'contract_date'    => '01.06.2026',
	'message'          => 'Ich soll hier nur das Formular testen!',
	'time_or_receipt'  => '22.06.2026 um 10:29 Uhr',
];
```

## Rückgabewert

(eventuell) modifiziertes Formulardaten-Array

## Rahmenfunktion

[](_info-snippet-einbindung.md ':include')

```php
/**
 * [immonex Kickstart] Daten des Widerrufs-Formulars anpassen.
 */

add_filter( 'inxkick_withdrawal_form_user_data', 'mysite_process_withdrawal_form_user_data' );

function mysite_process_withdrawal_form_user_data( $form_data ) {
	// Benutzer-Formulardaten verarbeiten oder modifizieren...

	return $form_data;
} // mysite_process_withdrawal_form_user_data
```

## Siehe auch

- [Frontend-Komponente: Widerrufsformular](/komponenten/widerrufsformular)
- [Plugin-Optionen: Widerruf](/schnellstart/einrichtung?id=widerruf)

[](_backlink.md ':include')