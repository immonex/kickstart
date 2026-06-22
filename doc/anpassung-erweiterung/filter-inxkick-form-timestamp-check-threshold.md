# inxkick_form_timestamp_check_threshold (Filter)

Über diesen Filter-Hook kann der Zeitrahmen nach dem Laden der Formularseite (in Sekunden) angepasst werden, nach der eine Übermittlung als *regulär* gilt, sprich, wahrscheinlich von einem echten Menschen abgesendet. 😉

?> Dieser Wert kann auch in den [Plugin-Optionen](/schnellstart/einrichtung?id=formular-spamschutz) (***Allgemein → Grundeinstellungen***) angepasst werden, d. h. eine Änderung per Filterfunktion ist nur in Ausnahmefällen notwendig.

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| **`$threshold`** (int) | *Zeitschwelle* in Sekunden (Ausgangswert) |

## Rückgabewert

Angepasster Zeitrahmen in Sekunden (`0` zum Deaktivieren)

## Code-Beispiel

[](_info-snippet-einbindung.md ':include')

```php
/**
 * [immonex Kickstart] Filter: Spamschutz-Zeitschwelle auf 10 Sekunden erhöhen.
 */

add_filter( 'inxkick_form_timestamp_check_threshold', 'mysite_increase_form_ts_threshold' );

function mysite_increase_form_ts_threshold( $threshold ) {
	return 10;
} // mysite_increase_form_ts_threshold
```

## Siehe auch

- [Frontend-Komponente: Widerrufsformular](/komponenten/widerrufsformular)
- [Plugin-Optionen: Formular-Spamschutz](/schnellstart/einrichtung?id=formular-spamschutz)

[](_backlink.md ':include')