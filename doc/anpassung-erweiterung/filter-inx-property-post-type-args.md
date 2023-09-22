# inx_property_post_type_args (Filter)

Mit diesem Filter können die Eigenschaften des [Beitragstyps für Immobilien-Objekte](/beitragsarten-taxonomien) **vor** dessen Registrierung bearbeitet werden.

## Parameter

| Name | Beschreibung |
| ---- | ------------ |
| **`$args`** (array) | Array mit Eigenschaften des Immobilien-Beitragstyps (siehe [Parameter $args der WP-Funktion register_post_type](https://developer.wordpress.org/reference/functions/register_post_type/#parameters)) |

## Rückgabewert

angepasstes Eigenschaften-Array für die Registrierung des *Custom Post Types* für Immobilien

## Rahmenfunktion

[](_info-snippet-einbindung.md ':include')

```php
add_filter( 'inx_property_post_type_args', 'mysite_modify_property_post_type_args' );

function mysite_modify_property_post_type_args( $args ) {
	// ...Eigenschaften des Immobilien-Beitragstyps im Array $args anpassen...

	return $args;
} // mysite_modify_property_post_type_args
```

[](_backlink.md ':include')