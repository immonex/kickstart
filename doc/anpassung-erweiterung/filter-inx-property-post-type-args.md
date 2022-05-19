# inx_property_post_type_args (Filter)

Mit diesem Filter können die Eigenschaften des [Beitragstyps für Immobilien-Objekte](/beitragsarten-taxonomien) **vor** dessen Registrierung bearbeitet werden.

## Parameter

| Name | Beschreibung |
| ---- | ------------ |
| `$args` | Array mit Eigenschaften des Immobilien-Beitragstyps (siehe [Parameter $args der WP-Funktion register_post_type](https://developer.wordpress.org/reference/functions/register_post_type/#parameters)) |

## Rückgabewert

angepasstes Eigenschaften-Array für die Registrierung des <i>Custom Post Types</i> für Immobilien

## Rahmenfunktion

Eine Funktion zur Nutzung des Filters wird typischerweise in der folgenden Form in der Datei **functions.php** des **Child-Themes** oder per Code-Snippets-Plugin eingebunden.

```php
add_filter( 'inx_property_post_type_args', 'mysite_modify_property_post_type_args' );

function mysite_modify_property_post_type_args( $args ) {
	// ...Eigenschaften des Immobilien-Beitragstyps im Array $args anpassen...

	return $args;
} // mysite_modify_property_post_type_args
```