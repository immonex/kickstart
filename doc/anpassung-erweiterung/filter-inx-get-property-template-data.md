# inx_get_property_template_data (Filter)

Dieser Filter dient dem **Abrufen** aller für das Rendering eines Detailansicht-Templates relevanten "Rohdaten"/Objektinstanzen eines [Immobilien-Beitrags](/beitragsarten-taxonomien).

?> Der Filter wird typischerweise in [Add-ons](/add-ons) oder anderen Plugins/Themes **anstelle von direkten Funktionsaufrufen** eingesetzt, bei denen ansonsten immer die Verfügbarkeit des Kickstart-Basisplugins geprüft werden müsste.

## Parameter

| Name | Beschreibung |
| ---- | ------------ |
| **`$template_data`** (array) | leeres Array |
| `$args` (array) | Optionale Parameter |
| | `post_id` (string\|int) → ID des Immobilien-Beitrags (optional, Standard: automatische Ermittlung) |

## Rückgabewert

Array der Immobiliendaten und Instanzen zugehöriger Objekte

## Code-Beispiele

```php
/**
 * [immonex Kickstart] Template-Rendering-Daten des aktuellen Objekts
 * testweise zur Durchsicht in Debug-Datei (Uploads-Ordner) speichern.
 */

add_action( 'wp', 'mysite_save_property_template_data' );

function mysite_save_property_template_data() {
	$template_data = apply_filters( 'inx_get_property_template_data', [] );

	if ( ! empty( $template_data ) ) {
		$upload_dir = wp_get_upload_dir();
		$f = fopen( trailingslashit( $upload_dir['basedir'] ) . 'tdata_debug.txt', 'w+');
		fwrite( $f, print_r( $template_data, true) );
		fclose( $f );
	}
} // mysite_save_property_template_data
```

[](_backlink.md ':include')