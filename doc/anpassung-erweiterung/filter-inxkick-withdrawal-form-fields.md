# inxkick_withdrawal_form_fields (Filter)

Mit diesem Filter können die Felder des [Widerrufsformulars](/komponenten/widerrufsformular) angepasst oder um eigene Elemente erweitert werden.

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| **`$fields`** (array) | Formularfeld-Definitionen |
| `$keys_only` (bool) | *true*, wenn – kontextabhängig – nur die Feldnamen (Keys) zurückgeliefert werden sollen, ansonsten *false* (Standardvorgabe) |

### Das Fields-Array im Detail

Die folgenden Optionen können pro Feld definiert werden:

| Name (Typ) | Beschreibung / mögliche Werte |
| ---------- | ----------------------------- |
| `type` (string) | **Typ** des Formularelements |
| | *text*: einzeiliges Textfeld |
| | *email*: HTML5-Textfeld mit E-Mail-Validierung |
| | *textarea*: mehrzeiliges Textfeld – siehe `default_value` |
| | *checkbox*: einzelne Checkbox – siehe `caption` und `value` |
| | *radio*: Radio-Auswahlelemente (Gruppe) – siehe `options`und `default_value` |
| | *select*: Dropdown-Auswahlbox – siehe `options` |
| | *date*: HTML5-Datumsauswahl |
| `required` (bool) | *true* bei Pflichtfeldern, ansonsten *false* |
| `required_or` (string) | **alternative** Pflichtangabe (entweder das aktuelle **oder** das Feld mit dem angegebenen Namen/Key muss ausgefüllt sein – siehe Beispiel email/phone) |
| `caption` (string) | Feldbezeichnung/Label – wird im **Frontend** bei Nutzung des Standard-Skins nur bei Elementen des Typs `checkbox` angezeigt. |
| `caption_mail` (string) | **alternative** Feldbezeichnung in Mails, sofern abweichend |
| `placeholder` (string) | Platzhaltertext |
| `value` (string) | zu übermittelnder **Wert** eines aktivierten *checkbox*-Elements (optional, Standard: *X*) |
| `default_value` (string) | Standardinhalt eines *textarea*-Elements oder vorausgewähltes Element einer `radio`-Gruppe (optional) |
| `options` (array) | Key-Value-Array der Auswahloptionen für die Feldtypen *radio* und *select* |
| `layout_type` (string) | **optionale** Sollbreite des Elements |
| | *half*: 50 % des Rahmenelements |
| | *full*: komplette Breite des Rahmenelements |
| `order` (int) | Sortierindex (Ausgabereihenfolge) |

#### Standardkonfiguration

##### vollständige Daten (`$keys_only === false` – siehe Parameter)

```php
$fields = [
	'salutation'       => [
		'type'        => 'radio',
		'required'    => false,
		'caption'     => __( 'Salutation', 'immonex-kickstart' ),
		'options'     => [
			''                               => __( 'not specified', 'immonex-kickstart' ),
			__( 'Ms.', 'immonex-kickstart' ) => __( 'Ms.', 'immonex-kickstart' ),
			__( 'Mr.', 'immonex-kickstart' ) => __( 'Mr.', 'immonex-kickstart' ),
		],
		'layout_type' => 'full',
		'order'       => 10,
	],
	'first_name'       => [
		'type'        => 'text',
		'required'    => true,
		'caption'     => __( 'First Name', 'immonex-kickstart' ),
		'placeholder' => __( 'First Name', 'immonex-kickstart' ),
		'order'       => 20,
	],
	'last_name'        => [
		'type'        => 'text',
		'required'    => true,
		'caption'     => __( 'Last Name', 'immonex-kickstart' ),
		'placeholder' => __( 'Last Name', 'immonex-kickstart' ),
		'order'       => 30,
	],
	'street'           => [
		'type'        => 'text',
		'required'    => false,
		'caption'     => __( 'Street', 'immonex-kickstart' ),
		'placeholder' => __( 'Street', 'immonex-kickstart' ),
		'layout_type' => 'full',
		'order'       => 40,
	],
	'postal_code'      => [
		'type'        => 'text',
		'required'    => false,
		'caption'     => __( 'Postal Code', 'immonex-kickstart' ),
		'placeholder' => __( 'Postal Code', 'immonex-kickstart' ),
		'layout_type' => 'half',
		'order'       => 50,
	],
	'city'             => [
		'type'        => 'text',
		'required'    => false,
		'caption'     => __( 'City', 'immonex-kickstart' ),
		'placeholder' => __( 'City', 'immonex-kickstart' ),
		'layout_type' => 'half',
		'order'       => 60,
	],
	'phone'            => [
		'type'        => 'text',
		'required'    => false,
		'caption'     => __( 'Phone', 'immonex-kickstart' ),
		'placeholder' => __( 'Phone', 'immonex-kickstart' ),
		'layout_type' => 'half',
		'order'       => 70,
	],
	'email'            => [
		'type'        => 'email',
		'required'    => true,
		'caption'     => __( 'Email Address', 'immonex-kickstart' ),
		'placeholder' => __( 'Email Address', 'immonex-kickstart' ),
		'layout_type' => 'half',
		'order'       => 80,
	],
	'reference_number' => [
		'type'         => 'text',
		'required'     => false,
		'caption'      => __( 'Contract, Customer or Property Number', 'immonex-kickstart' ),
		'caption_mail' => __( 'Reference Number', 'immonex-kickstart' ),
		'placeholder'  => __( 'Contract, Customer or Property Number', 'immonex-kickstart' ),
		'layout_type'  => 'half',
		'order'        => 90,
	],
	'contract_date'    => [
		'type'        => 'date',
		'required'    => false,
		'caption'     => __( 'Date of contract conclusion', 'immonex-kickstart' ),
		'placeholder' => __( 'Date of contract conclusion', 'immonex-kickstart' ),
		'layout_type' => 'half',
		'order'       => 100,
	],
	'message'          => [
		'type'        => 'textarea',
		'required'    => false,
		'caption'     => __( 'Additional Details', 'immonex-kickstart' ),
		'placeholder' => __( 'Additional Details', 'immonex-kickstart' ) .
			' (' . __( 'optional – e.g., services included in the contract to be withdrawn', 'immonex-kickstart' ) . ')',
		'layout_type' => 'full',
		'order'       => 110,
	],
];
```

##### nur Feldnamen (`$keys_only === true` – siehe Parameter)

```php
$fields = [
	'saluation',
	'first_name',
	'last_name',
	'street',
	'postal_code',
	'city',
	'phone',
	'email',
	'reference_number',
	'contract_date',
	'message',
);
```

## Rückgabewert

angepasstes Formularfeld-Array (abhängig von `$keys_only` entweder mit vollständigen Felddefinitionen oder nur den Schlüsseln)

## Code-Beispiel

[](_info-snippet-einbindung.md ':include')

```php
/**
 * 'immonex Kickstart' Filter: Landauswahl als Pflichtfeld im Widerrufsformular ergänzen.
 */

add_filter( 'inxkick_withdrawal_form_fields', 'mysite_extend_withdrawal_form_fields', 10, 2 );

function mysite_extend_withdrawal_form_fields( $form_fields, $keys_only ) {
	if ( $keys_only ) {
		$form_fields[] = 'country';

		return $form_fields;
	}

	$form_fields['country'] = [
		'type'        => 'select',
		'required'    => true,
		'label'       => 'Land',
		'options'     => [
			''            => 'Land auswählen ...',
			'Deutschland' => 'Deutschland',
			'Österreich'  => 'Österreich',
			'Schweiz'     => 'Schweiz',
			'Frankreich'  => 'Frankreich',
			'Luxemburg'   => 'Luxemburg',
			'Belgien'     => 'Belgien',
			'Niederlande' => 'Niederlande',
			'Italien'     => 'Italien',
			// ...
		],
		'layout_type' => 'full',
		'order'       => 65,
	];

	return $form_fields;
} // mysite_extend_withdrawal_form_fields
```

## Siehe auch

- [Frontend-Komponente: Widerrufsformular](/komponenten/widerrufsformular)

[](_backlink.md ':include')