# inx_template_folder_url_mappings (Filter)

Wurde via [`inx_template_search_folders`](filter-inx-template-search-folders) ein benutzerdefinierter Basisordner für [Skins](skins) definiert, der sich **nicht im Webroot-Ordner** der WordPress-Installation befindet, muss diesem per Filterfunktion eine URL für die Verwendung im Frontend der Website zugeordnet werden. Dies ist notwendig, damit bspw. CSS-Dateien hierüber direkt eingebunden werden können.

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| **`$folder_mappings`** (array) | Liste beliebiger Zuordnungen: jeweils Dateisystem-Pfad ➞ URL |

## Rückgabewert

Mapping-Array

## Rahmenfunktion

[](_info-snippet-einbindung.md ':include')

```php
add_filter( 'inx_template_folder_url_mappings', 'mysite_skin_base_folder_url_mapping' );

function mysite_skin_base_folder_url_mapping( $folder_mappings ) {
	$folder_mappings = array( '/var/my_fs/path' => 'https://domain.tld/my_path/' );

	return $folder_mappings;
} // mysite_skin_base_folder_url_mapping
```

[](_backlink.md ':include')