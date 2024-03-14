# inx_rendered_property_template_contents (Filter)

Mit diesem Filter können die gerenderten Inhalte eines Immobilien-Detail-Templates unmittelbar vor der Ausgabe angepasst werden.

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| **`$contents`** (string) | gerenderte Template-Inhalte (HTML) auf Basis des angegebenen Templates (`$template`) und der Daten der betreffenden Immobilie (`$template_data`) |
| `$template` (string) | Name der gerenderten Template-Datei (ohne Suffix .php) im [Skin-Ordner](skins#ordner) |
| `$template_data` (array) | Objektdaten |
| `$atts` (array) | optionale Attribute (Array-Keys und mögliche Werte entsprechen den [Attributen des Detailansicht-Shortcodes](/komponenten/detailansicht#attribute)) |

## Rückgabewert

angepasste Inhalte für die Ausgabe

## Rahmenfunktion/Beispiel

[](_info-snippet-einbindung.md ':include')

```php
/**
 * [immonex Kickstart] Infotext im Tab "Die Immobilie" der Immobilien-Detailseiten
 * ergänzen, sofern ein Geschäftsguthaben in den OpenImmo-XML-Objektdaten hinterlegt ist.
 */

add_action( 'inx_rendered_property_template_contents', 'mysite_extend_property_detail_contents', 10, 4 );

function mysite_extend_property_detail_contents( $contents, $template, $template_data, $atts ) {
	if (
		'description-text' === $template_data['template']
		&& empty( $template_data['field_name'] )
	) {
		$property_xml_source = get_post_meta( $template_data['post_id'], '_immonex_property_xml_source', true );
		if ( ! $property_xml_source ) {
			return $contents;
		}

		$immobilie = new \SimpleXMLElement( $property_xml_source );
		$shares    = (int) $immobilie->preise->geschaeftsguthaben;

		if ( ! $shares ) {
			return $contents;
		}

		$shares_info = wp_sprintf( '%d Geschäftsanteilen zu je 500,00 €', (int) $shares );

		$contents .= wp_sprintf(
			'<p>Voraussetzung für eine Mitgliedschaft: Zeichnung von %s.</p>',
			$shares_info
		);
	}

	return $contents;
} // mysite_extend_property_detail_contents
```

[](_backlink.md ':include')