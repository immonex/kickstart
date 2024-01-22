# inx_get_user_consent_content (Filter)

Dieser Filter-Hook dient in erster Linie dem **Abruf** der Inhalte, die im Rahmen der [Benutzereinwilligung](/schnellstart/einrichtung?id=benutzereinwilligung) – sofern aktiviert – vor der Einbindung eines **bestimmten** externen Dienstes (Karte, Video, 360°-Tour-Viewer etc.) zur Bestätigung angezeigt werden.

?> Die Modifizierung der Inhalte ist zwar grundsätzlich auch möglich, für die **Ergänzung oder Anpassung** von *Einwilligungstypen* (Dienste/Anbieter) ist der Filter-Hook [inx_user_consent_contents](filter-inx-user-consent-contents) aber besser geeignet.

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| **`$content`** (array) | leer (Abruf) bzw. Info- und Button-Text + Icon-Tag (Anpassung) |
| `$type_or_url` (string) | Typ (Key) oder URL des einzubindenden Dienstes |
| `$context` (string) | Kontext (Art des Dienstes): `geo`, `video` oder `virtual_tour` |

## Rückgabewert

Das Array `$content` enthält die folgenden Elemente mit den Inhalten des abgefragten bzw. anhand der URL ermittelten Typs (`$type_or_url`) oder – sofern nicht verfügbar – zum Kontext (`$context`) passende Fallback-Angaben.

```php
[
	'text' => '… Name und Adresse des Anbieters, Infos/Links zum Datenschutz etc. …',
	'button_text' => '… Text des Bestätigungsbuttons (optional) …',
	'icon_tag' => '… HTML-Tag eines Icons (optional) …',
]
```

## Code-Beispiel

[](_info-snippet-einbindung.md ':include')

```php
// Inhalte für die Benutzereinwilligung vor der Einbindung eines YouTube-Players abrufen.
$user_consent_contents = apply_filters( 'inx_get_user_consent_content', [], 'youtube', 'video' );
```

## Siehe auch

- [inx_user_consent_contents](filter-inx-user-consent-contents) (Inhalte aller Benutzereinwilligungs-Abfragen)
- [inx_user_consent_default_button_text](filter-inx-user-consent-default-button-text) (Standardtext für Bestätigungsbuttons von Benutzereinwilligungen)
- [Benutzereinwilligung (Plugin-Optionen)](/schnellstart/einrichtung?id=benutzereinwilligung)

[](_backlink.md ':include')