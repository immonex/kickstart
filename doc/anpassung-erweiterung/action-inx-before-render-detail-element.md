# inx_before_render_detail_element_{$element_key} (Action)

Ist das [Standard-Skin](standard-skin) (oder ein hierauf aufbauendes [Custom Skin](skins?id=custom-skins)) im Einsatz, können über diesen Filter-Hook beliebige Inhalte **vor** der Ausgabe eines beliebigen [Immobilien-Detailelements](/komponenten/detailansicht?id=elemente-abschnitte) (Abschnitt oder Tab zusammengehöriger Objektdaten) eingefügt werden.

## Parameter

| Name | Inhalt/Beschreibung |
| ---- | ------------ |
| `$context` (string) | Rahmen der Einbindung: Elementinhalte innerhalb ... |
| | *before_tabs* : ... eines Abschnitt **vor** den Tabs\* |
| | *tab_content* : ... eines Tabs\* |
| | *after_tabs* : ... eines Abschnitts **nach** den Tabs\* |
| | *no_tabs* : ... eines Abschnitts (**keine** tabbasierte Darstellung) |

\* bei tabbasierter Ausgabe

## Rahmenfunktion/Beispiel

[](_info-snippet-einbindung.md ':include')

```php
/**
 * [immonex Kickstart] Infotext vor der Ausgabe des Immobiliendetail-Abschnitts
 * für die Energieausweisdaten (Element-Key: epass) einfügen.
 */

add_action( 'inx_before_render_detail_element_epass', 'mysite_add_contents_before_detail_element' );

function mysite_add_contents_before_detail_element( $context ) {
	echo "<p>Bitte bei den folgenden Energieausweisdaten beachten: ...</p>";
} // mysite_add_contents_before_detail_element
```

## Siehe auch

- [inx_after_render_detail_element_{$element_key}](action-inx-after-render-detail-element) (Inhalte **nach** der Ausgabe eines Detail-Elements einfügen)
- [inx_tabbed_content_elements](filter-inx-tabbed-content-elements) (Elementaufteilung bei tabbasierter Darstellung)

[](_backlink.md ':include')