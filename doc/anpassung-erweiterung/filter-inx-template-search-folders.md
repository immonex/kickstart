# inx_template_search_folders (Filter)

Die [Skin-Ordner](skins), die die Templates für die Darstellung/Ausgabe der Immobiliendaten enthalten, werden standardmäßig im Plugin-Ordner sowie im Theme- bzw. Child-Theme-Verzeichnis gesucht. Alternative, primäre **Basisordner** hierfür können über diesen Filter-Hook definiert werden.

> Sind die benutzerdefinierten Skin-Ordner nicht öffentlich zugänglich (d. h. **keine** Unterordner des Webroot-Verzeichnisses der WordPress-Installation), müssen diesen via [`inx_template_folder_url_mapping`](filter-inx-template-folder-url-mappings) entsprechende URLs zugewiesen werden.

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| `$folders` (array) | Liste der Basisordner, die die [Skin-Ordner](skins#ordner) enthalten |

## Rückgabewert

aktualisierte/erweiterte Ordnerliste

## Rahmenfunktion

Eine Funktion zur Nutzung des Filters wird typischerweise in der folgenden Form in der Datei **functions.php** des **Child-Themes** oder per Code-Snippets-Plugin eingebunden.

```php
add_filter( 'inx_template_search_folders', 'mysite_add_custom_primary_skin_base_folder' );

function mysite_add_custom_primary_skin_base_folder( $folders ) {
	// primären Skin-Basisordner "immonex-kickstart" im Uploads-Verzeichnis ergänzen
	$upload_dir = wp_get_upload_dir();
	array_unshift( $folders, trailingslashit( $upload_dir['basedir'] ) . 'immonex-kickstart' );

	return $folders;
} // mysite_add_custom_primary_skin_base_folder
```