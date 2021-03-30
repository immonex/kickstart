---
title: URL-Mappings für Template-Ordner definieren (Filter)
search: 1
---

# inx_template_folder_url_mappings (Filter)

Wurde via [`inx_template_search_folders`](filter-inx-template-search-folders.html) ein benutzerdefinierter Basisordner für [Skins](skins.html) definiert, der sich **nicht im Webroot-Ordner** der WordPress-Installation befindet, muss diesem per Filterfunktion eine URL für die Verwendung im Frontend der Website zugeordnet werden. Dies ist notwendig, damit bspw. CSS-Dateien hierüber direkt eingebunden werden können.

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| `$folder_mappings` (array) | Liste beliebiger Zuordnungen: jeweils Dateisystem-Pfad ➞ URL |

## Rückgabewert

Mapping-Array

## Rahmenfunktion

Eine Funktion zur Nutzung des Filters wird typischerweise in der folgenden Form in der Datei **functions.php** des **Child-Themes** oder per Code-Snippets-Plugin eingebunden.

```php
add_filter( 'inx_template_folder_url_mappings', 'mysite_skin_base_folder_url_mapping' );

function mysite_skin_base_folder_url_mapping( $folder_mappings ) {
	$folder_mappings = array( '/var/my_fs/path' => 'https://domain.tld/my_path/' );

	return $folder_mappings;
} // mysite_skin_base_folder_url_mapping
```