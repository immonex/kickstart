# inx_sharing_{$type}\_meta_tags (Filter)

Der Filter `inx_sharing_{$type}_meta_tags` ermöglicht die Anpassung der für das Teilen von Inhalten in sozialen Netzwerken, Messaging-Plattformen & Co. relevanten Meta-Tags in Immobilien-Listen- und Detailseiten.

Die Variable `$type` kann hierbei entweder durch `open_graph` ([Open Graph](https://ogp.me/)) oder `x` ([X/Twitter](https://developer.x.com/en/docs/twitter-for-websites/cards/guides/getting-started)) ersetzt werden.

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| **`$tags`** (array) | Tag-Daten |
| `$context` (array) | Zusatzangaben zur aktuellen Einbindung |
| | `protocol_platform`: Zielprotokoll/-plattform (`open_graph` oder `x`) |
| | `type`: Art der Seite, in die die Meta-Tags eingebunden werden (`single`, `list` oder `tax_archive`) |
| | `id`: Seiten/Beitrags-ID |
| | `name_attr_key`: Key des Namens-Attributs (`property` bei Open Graph, `name` bei X/Twitter) |

### Tag-Array-Beispieldaten (Open Graph)

```php
[
	[
		'name' => 'og:type',
		'content' => 'article'
	],
	[
		'name' => 'og:url',
		'content' => 'https://immobilienmakler-website.de/immobilien/einfamilienhaus-in-top-lage/'
	],
	[
		'name' => 'og:title',
		'content' => 'Einfamilienhaus in Top-Lage!'
	],
	[
		'name' => 'og:description',
		'content' => 'Das wohl durchdachte Neubauensemble direkt am Park unterstreicht mit Weitblick und viel…'
	],
	[
		'name' => 'og:site_name',
		'content' => 'Immobilienmakler Demostadt'
	],
	[
		'name' => 'og:locale',
		'content' => 'de_DE'
	],
	[
		'name' => 'article:section',
		'content' => 'Immobilien',
		'scope' => [ 'single' ]
	],
	[
		'name' => 'article:modified_time',
		'content' => '2023-05-16T00:38:33+02:00',
		'scope' => [ 'single' ]
	],
	[
		'name' => 'og:image',
		'content' => 'https://immobilienmakler-website.de/wp-content/uploads/2023/05/foto-1.jpg',
		'scope' => [ 'single' ]
	],
	[
		'name' => 'og:image:width',
		'content' => '1200',
		'scope' => [ 'single' ]
	],
	[
		'name' => 'og:image:height',
		'content' => '900',
		'scope' => [ 'single' ]
	],
	[
		'name' => 'og:image:type',
		'content' => 'image/jpeg',
		'scope' => [ 'single' ]
	],
	[
		'name' => 'og:image',
		'content' => 'https://immobilienmakler-website.de/wp-content/uploads/2023/05/foto-2.jpg',
		'scope' => [ 'single' ]
	],
	[
		'name' => 'og:image:width',
		'content' => '1200',
		'scope' => [ 'single' ]
	],
	[
		'name' => 'og:image:height',
		'content' => '900',
		'scope' => [ 'single' ]
	],
	[
		'name' => 'og:image:type',
		'content' => 'image/jpeg',
		'scope' => [ 'single' ]
	]
];
```

Soll ein Meta-Tag nur in bestimmten Arten von Seiten eingefügt werden, können diese im Unterarray `scope` definiert werden:

- `single`: Immobilien-Detailseiten
- `list`: Immobilien-Übersichtsseiten
- `tax_archive`: Immobilien-Taxonomie-Archive

## Rückgabewert

angepasste Tag-Daten

## Beispiel

[](_info-snippet-einbindung.md ':include')

```php
/**
 * [immonex Kickstart] Autorenangabe im Open-Graph-Meta-Tag der Immobilien-Detailseiten anpassen.
 */

add_filter( 'inx_sharing_open_graph_meta_tags', 'mysite_modify_open_graph_meta_tags', 10, 2 );

function mysite_modify_open_graph_meta_tags( $tags, $context ) {
	if ( 'single' !== $context['type'] ) {
		return $tags;
	}

	foreach ( $tags as $i => $tag ) {
		if ( 'og:author' !== $tag['name'] ) {
			continue;
		}

		$tags[ $i ]['content'] = 'https://https://facebook.com/hinnak.doelbes';
		break;
	}

	return $tags;
} // mysite_modify_open_graph_meta_tags
```

[](_backlink.md ':include')