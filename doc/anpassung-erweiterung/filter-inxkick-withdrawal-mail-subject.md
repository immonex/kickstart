# inxkick_withdrawal_mail_subject (Filter)

Dieser Filter-Hook ermöglicht die kontextbasierte Modifizierung des Betreffs der [Widerrufs-Formularmails](../komponenten/widerrufsformular) (Admin-Benachrichtigungen und Eingangsbestätigungen) unmittelbar vor dem Versand. Hierbei können auch *Twig-Variablen* verwendet werden (siehe Template-Data-Array unten).

?> Dem Betreff der Admin-Benachrichtigungen wird automatisch der Website-Titel vorangestellt: *[Website-Titel] Betreff*

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| **`$subject`** (string) | aktueller Betreff |
| `$template_data` (array) | Website- und Formulardaten |
| `$type` (string) | Art der Nachricht: *admin_notification* oder *receipt_confirmation* |

### Das Template-Data-Array im Detail

Die folgenden Daten können in Form von Twig-Variablen im Betreff verwendet werden, z. B. `{{ site_title }}` oder `{{ company_name }}`.

Die Werte der Elemente `company_name` und `company_address` entsprechen den in den Plugin-Optionen unter ***Allgemein → Grundeinstellungen → Rechtliches*** hinterlegten Angaben. (Ist das Feld für die Firmierung leer, wird der Website-Titel als *Fallback-Wert* für `company_name` übernommen.)

```php
$template_data = [
	'site_title'           => 'immonex Demo Immobilien – der beste Immomakler der Welt… mindestens!',
	'site_title_limited'   => 'immonex Demo Immobil…',
	'company_name'         => 'immonex Demo Immobilien',
	'company_address'      => 'Beispiel-Allee 1
		99999 Demostadt',
	'default_signature'    => '<p><a href="https://domain.tld/">immonex Demo Immobilien – der beste Immomakler der Welt… mindestens!</a></p>
		<p>
			<strong>immonex Demo Immobilien</strong><br>
			Beispiel-Allee 1<br>
			99999 Demostadt
		</p>',
	'mail_as_html'         => true,
	'form_data'            => [
		'salutation' => [
			'type' => 'radio',
			'required'    => false,
			'caption'     => 'Anrede',
			'options'     => [
				''     => 'keine Angabe',
				'Frau' => 'Frau',
				'Herr' => 'Herr',
			],
			'layout_type' => 'full',
			'order'       => '10',
			'value'       => 'Herr',
		],
		'first_name'     => [
			'type' => 'text',
			'required'    => true,
			'caption'     => 'Vorname',
			'placeholder' => 'Vorname',
			'order'       => '20',
			'value'       => 'Heinz',
		],
		'last_name'      => [
			'type'        => 'text',
			'required'    => true,
			'caption'     => 'Nachname',
			'placeholder' => 'Nachname',
			'order'       => '30',
			'value'       => 'Tester',
		],
		'street'         => [
			'type'        => 'text',
			'required'    => false,
			'caption'     => 'Straße',
			'placeholder' => 'Straße',
			'layout_type' => 'full',
			'order'       => '40',
			'value'       => 'Musterstraße 14',
		],
		'postal_code'    => [
			'type'        => 'text',
			'required'    => false,
			'caption'     => 'PLZ',
			'placeholder' => 'PLZ',
			'layout_type' => 'half',
			'order'       => '50',
			'value'       => '99999',
		],
		'city'           => [
			'type'        => 'text',
			'required'    => false,
			'caption'     => 'Ort',
			'placeholder' => 'Ort',
			'layout_type' => 'half',
			'order'       => '60',
			'value'       => 'Demostadt',
		],
		'phone'          => [
			'type'        => 'text',
			'required'    => false,
			'caption'     => 'Fon',
			'placeholder' => 'Fon',
			'layout_type' => 'half',
			'order'       => '70',
			'value'       => '0999 123456',
		],
		'email'          => [
			'type'        => 'email',
			'required'    => true,
			'caption'     => 'E-Mail-Adresse',
			'placeholder' => 'E-Mail-Adresse',
			'layout_type' => 'half',
			'order'       => '80',
			'value'       => 'heinz@domain.tld',
		],
		'reference_number' => [
			'type'         => 'text',
			'required'     => false,
			'caption'      => 'Vertrags-, Kunden- oder Objektnummer',
			'caption_mail' => 'Referenznummer',
			'placeholder'  => 'Vertrags-, Kunden- oder Objektnummer',
			'layout_type'  => 'half',
			'order'        => '90',
			'value'        => '123',
		],
		'contract_date'    => [
			'type'        => 'date',
			'required'    => false,
			'caption'     => 'Datum des Vertragsabschlusses',
			'placeholder' => 'Datum des Vertragsabschlusses',
			'layout_type' => 'half',
			'order'       => '100',
			'value'       => '01.06.2026',
		],
		'message'          => [
			'type'        => 'textarea',
			'required'    => false,
			'caption'     => 'Zusätzliche Details',
			'placeholder' => 'Zusätzliche Details (optional, z. B. Dienstleistungen, die im zu widerrufenden Vertrag enthalten sind)',
			'layout_type' => 'full',
			'order'       => '110',
			'value'       => 'Ich soll hier nur das Formular testen!',
		],
		'time_of_receipt'  => [
			'type'    => 'date_time',
			'caption' => 'Eingangszeitpunkt',
			'order'   => '200',
			'value'   => '21.06.2026 um 23:17 Uhr',
		],
		'name'             => [
			'value' => 'Heinz Tester',
		],
	],
];
```

## Rückgabewert

angepasster Betreff

## Code-Beispiel

[](_info-snippet-einbindung.md ':include')

```php
/**
 * [immonex Kickstart] Betreff der Eingangsbestätigung bei Widerrufserklärungen anpassen.
 */

add_filter( 'inxkick_withdrawal_mail_subject', 'mysite_adjust_withdrawal_receipt_confirmation', 10, 3 );

function mysite_mysite_adjust_withdrawal_receipt_confirmation( $subject ) {
	return '[{{ site_title_limited }}] Ihre Widerrufserklärung ist eingegangen!';
} // mysite_adjust_withdrawal_receipt_confirmation
```

## Siehe auch

- [Filter: inxkick_withdrawal_mail_template_data](filter-inxkick-withdrawal-mail-template-data)
- [Frontend-Komponente: Widerrufsformular](/komponenten/widerrufsformular)
- [Plugin-Optionen: E-Mail](/schnellstart/einrichtung?id=e-mail)
- [Plugin-Optionen: Widerruf](/schnellstart/einrichtung?id=widerruf)
- [Plugin-Optionen: Rechtliches](/schnellstart/einrichtung?id=rechtliches)

[](_backlink.md ':include')