# inx_submenu_items (Filter)

Mit diesem Filter kann **ein Teil** der Elemente des [immonex-Menüs](/schnellstart/einrichtung) in der Hauptnavigation des WordPress-Backends modifiziert oder erweitert werden.

Auf vom Plugin oder Add-ons registrierte Beitragsarten (*Custom Post Types*) kann immer über die Elemente am Anfang des immonex-Menüs zugegriffen werden, auf die Plugin-Optionen über den letzten Untermenüpunkt. Dieser Filter bezieht sich auf die Menüpunkte **dazwischen** ([Immobilien-Taxonomien](/beitragsarten-taxonomien) etc.).

## Parameter

| Name | Beschreibung |
| ---- | ------------ |
| **`$items`** (array) | Liste der Untermenüpunkte (mittlerer Abschnitt) |

### Items-Array im Detail

Die Elemente der **Unterarrays** entsprechen den Parametern der WordPress-Funktion [add_submenu_page](https://developer.wordpress.org/reference/functions/add_submenu_page/):

- Parent Slug (immer *inx_menu*)
- Seitentitel
- Menü-Titel
- benötigte Zugriffsberechtigung ([Capability](https://wordpress.org/support/article/roles-and-capabilities/))
- Menü-Slug (normalerweise ein innerhalb des Menüs eindeutiger Schlüssel, Ausnahme: *#inx-submenu-separator* zum Einfügen einer Trennlinie)
- aufzurufende Render-Funktion der Seite
- Position im Menü

```php
[
	[
		'inx_menu'
		'',
		'',
		'read',
		'#inx-submenu-separator',
		'',
		99
	],
	[
		'inx_menu',
		'Neuen Ort hinzufügen',
		'Orte',
		'manage_categories',
		'edit-tags.php?taxonomy=inx_location&post_type=inx_property',
		'',
		100
	],
	[
		'inx_menu',
		'Neue Nutzungsart hinzufügen',
		'Nutzungsarten',
		'manage_categories',
		'edit-tags.php?taxonomy=inx_type_of_use&post_type=inx_property',
		'',
		110
	],
	...
]
```

## Rückgabewert

angepasstes oder erweitertes Array der Untermenüpunkte

## Rahmenfunktion

[](_info-snippet-einbindung.md ':include')

```php
add_filter( 'inx_submenu_items', 'mysite_modify_inx_submenu_items' );

function mysite_modify_inx_submenu_items( $items ) {
	// ...Menüpunkte im Array $items anpassen oder erweitern...

	return $items;
} // mysite_modify_inx_submenu_items
```

[](_backlink.md ':include')