# inx_user_consent_contents (Filter)

Dieser Filter-Hook ermöglicht die **Anpassung oder Erweiterung** der Inhalte, die im Rahmen der [Benutzereinwilligung](/schnellstart/einrichtung?id=benutzereinwilligung) – sofern aktiviert – vor der Einbindung externer Dienste (Karten, Videos, Viewer virtueller Touren etc.) zur Bestätigung angezeigt werden.

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| **`$contents`** (array) | Array mit jeweils einem Unterarray pro *Einwilligungstyp* (Dienst/Anbieter) |

### Das Contents-Array im Detail

Ein *Einwilligungstyp* beschreibt im Regelfall einen externen Dienst bzw. dessen Anbieter. Die entsprechenden Elemente des `$contents`-Arrays sind folgendermaßen aufgebaut:

```php
'name/key' => [
	'text' => '… Name und Adresse des Anbieters, Infos/Links zum Datenschutz etc. …',
	'button_text' => '… Text des Bestätigungsbuttons (optional) …',
	'icon_tag' => '… HTML-Tag eines Icons (optional) …',
	'url_parts' => [
		'URL-Suchstring 1',
		'URL-Suchstring 2',
		'URL-Suchstring 3',
		...
	]
]
```

Die Inhalte der Unterelemente `text` und `button_text` sollten generell mittels *gettext*-Befehlen (z. B. `__()`) in übersetzbarer Form eingefügt werden. Die Elemente `text` und `icon_tag` können auch HTML-Tags wie bspw. einen Datenschutz-Link mit einer externen Ziel-URL enthalten.

Das Unterarray `url_parts` enthält eine oder mehrere Zeichenketten, anhand derer der Typ der Einwilligung ermittelt werden kann, wenn eine hiervon in der URL des betr. Dienstes enthalten ist.

Die im Plugin enthaltenen Standard-Inhalte umfassen die folgenden Dienste/Anbieter:

- Google Maps (`gmaps`)
- OpenStreetMap (`osmaps`)
- YouTube (`youtube`)
- Vimeo (`vimeo`)
- Matterport (`matterport`)

```php
[
	'gmaps' => [
		'text' => wp_sprintf(
			__( 'This website utilizes Google Maps services. Google collects and processes... <a href="%1$s" target="_blank">Link 1</a> ... <a href="%2$s" target="_blank">Link 2</a> ...',
						'immonex-kickstart'
			),
			'https://policies.google.com/privacy',
			'https://www.dataliberation.org/'
		),
		'button_text' => __( 'Agreed, show maps!', 'immonex-kickstart' ),
		'icon_tag' => '<span uk-icon="icon: location; ratio: 4"></span>',
		'url_parts' => [
			'google.com/maps',
			'maps.googleapis',
			'maps.gstatic',
		],
	],
	'osmaps' => [
		'text' => '...',
		'button_text' => __( 'Agreed, show maps!', 'immonex-kickstart' ),
		'icon_tag' => '<span uk-icon="icon: location; ratio: 4"></span>',
		'url_parts' => [ 'openstreetmap' ],
	],
	'youtube' => [
		'text' => '...',
		'button_text' => __( 'Agreed, show video!', 'immonex-kickstart' ),
		'icon_tag' => '<span uk-icon="icon: youtube; ratio: 5"></span>',
		'url_parts' => [ 'youtube' ],
	],
	'vimeo' => [
		'text' => '...',
		'button_text' => __( 'Agreed, show video!', 'immonex-kickstart' ),
		'icon_tag' => '<span uk-icon="icon: vimeo; ratio: 5"></span>',
		'url_parts' => [ 'vimeo' ],
	],
	'matterport' => [
		'text' => '...',
		'button_text' => __( 'Agreed, show virtual tour!', 'immonex-kickstart' ),
		'icon_tag' => '<span class="inx-icon inx-icon--360 inx-icon--ratio-3"></span>',
		'url_parts' => [ 'matterport' ],
	],
]
```

## Rückgabewert

angepasstes oder erweitertes Inhalte-Array

## Code-Beispiel

[](_info-snippet-einbindung.md ':include')

```php
add_filter( 'inx_user_consent_contents', 'mysite_add_user_consent_content' );

function mysite_add_user_consent_content( $contents ) {
	// ...Inhalte für die Nutzereinwilligung vor der Einbindung des Dienstes "foobar" ergänzen...

	$contents['foobar'] = [
		'text' => wp_sprintf(
			__( 'This website utilizes FooBar services (see <a href="%s">FooBar Privacy Policy</a>)...', 'my-textdomain' ),
			'https://foobar.tld/privacy/'
		),
		'button_text' => __( 'Agreed!', 'my-textdomain' ),
		'icon_tag' => '<span class="icon icon--foobar"></span>',
		'url_parts' => [ 'foobar' ],
	];

	return $contents;
} // mysite_add_user_consent_content
```

## Siehe auch

- [inx_get_user_consent_content](filter-inx-get-user-consent-content) (Inhalte eines bestimmten Nutzereinwilligungstyps bzw. Fallback-Angaben)
- [inx_user_consent_default_button_text](filter-inx-user-consent-default-button-text) (Standardtext für Bestätigungsbuttons von Benutzereinwilligungen)
- [Benutzereinwilligung (Plugin-Optionen)](/schnellstart/einrichtung?id=benutzereinwilligung)

[](_backlink.md ':include')