# inx_rendered_pagination_template_contents (Filter)

Mit diesem Filter können die gerenderten Inhalte eines Seitennavigations-Templates (für Immobilienlisten) unmittelbar vor der Ausgabe angepasst werden.

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| **`$contents`** (string) | gerenderte Template-Inhalte (HTML) auf Basis des angegebenen Templates (`$template`) und der zugehörigen Ausgabedaten (`$template_data`) |
| `$template` (string) | Name der Template-Datei (ohne Suffix .php) im [Skin-Ordner](skins) |
| `$template_data` (array) | Navigationsdaten |
| `$atts` (array) | optionale Attribute (Array-Keys und mögliche Werte entsprechen den [Attributen des Seitennavigations-Shortcodes](/komponenten/seitennavigation?id=attribute)) |

## Rückgabewert

angepasste Inhalte für die Ausgabe

## Rahmenfunktion

[](_info-snippet-einbindung.md ':include')

```php
/**
 * [immonex Kickstart] Ausgabe der Immobilienlisten-Seitennavigation anpassen.
 */

add_filter( 'inx_rendered_pagination_template_contents', 'mysite_adjust_pagination_output', 10, 4 );

function mysite_adjust_pagination_output( $contents, $template, $template_data, $atts ) {
	if ( ! empty( $template_data['…'] )	) {
		$contents = str_replace( '…', '…', $contents );
	}

	return $contents;
} // mysite_adjust_pagination_output
```

## Siehe auch

- Filter: [inxkick_pagination_default_atts](filter-inxkick-pagination-default-atts) (Standardattribute der Seitennavigation)
- Plugin-Optionen: [Seitennavigation](/schnellstart/einrichtung?id=seitennavigation)

[](_backlink.md ':include')