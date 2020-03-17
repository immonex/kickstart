---
title: Immobilienspezifische Taxonomien (Filter)
search: 1
---

# inx_taxonomies (Filter)

Mit diesem Filter können die Eigenschaften der [immobilienspezifischen Taxonomien](../beitragsarten-taxonomien.html) **vor** deren Registrierung bearbeitet werden.

## Parameter

| Name | Beschreibung |
| ---- | ------------ |
| `$taxonomies` | Array mit Eigenschaften **aller** Taxonomien, die vom Kickstart-Plugin registriert werden |

### Taxonomies-Array im Detail

Die Unterarrays entsprechen jeweils dem [Array $args der WP-Funktion register_taxonomy](https://developer.wordpress.org/reference/functions/register_taxonomy/#parameters), der zugehörige Key dem Taxonomienamen.

```php
[
	'inx_location' => [
		'description' => '',
		'labels' => [
			'name' => _x( 'Locations', 'taxonomy general name', 'inx' ),
			'singular_name' => _x( 'Location', 'taxonomy singular name', 'inx' ),
			'all_items' => __( 'All Locations', 'inx' ),
			'edit_item' => __( 'Edit Location', 'inx' ),
			'view_item' => __( 'View Location', 'inx' ),
			'update_item' => __( 'Update Location', 'inx' ),
			'add_new_item' => __( 'Add New Location', 'inx' ),
			'new_item_name' => __( 'New Location Name', 'inx' ),
			'parent_item' => __( 'Parent Location', 'inx' ),
			'parent_item_colon' => __( 'Parent Location:', 'inx' ),
			'search_items' => __( 'Search Locations', 'inx' ),
			'popular_items' => __( 'Popular Locations', 'inx' ),
			'not_found' => __( 'No Locations found.', 'inx' )
		),
		'public' => true,
		'show_admin_column' => true,
		'hierarchical' => true,
		'show_in_rest' => true,
		'rewrite' => [
			'slug' => _x( 'properties/location', 'Custom Taxonomy Slug', 'inx' ),
			'with_front' => false
		)
	],
	'inx_type_of_use' => [
		'description' => '',
		'labels' => [
			'name' => _x( 'Types Of Use', 'taxonomy general name', 'inx' ),
			'singular_name' => _x( 'Type Of Use', 'taxonomy singular name', 'inx' ),
			'all_items' => __( 'All Types Of Use', 'inx' ),
			'edit_item' => __( 'Edit Type Of Use', 'inx' ),
			'view_item' => __( 'View Type Of Use', 'inx' ),
			'update_item' => __( 'Update Type Of Use', 'inx' ),
			'add_new_item' => __( 'Add New Type Of Use', 'inx' ),
			'new_item_name' => __( 'New Type Of Use Name', 'inx' ),
			'parent_item' => __( 'Parent Type Of Use', 'inx' ),
			'parent_item_colon' => __( 'Parent Type Of Use:', 'inx' ),
			'search_items' => __( 'Search Types Of Use', 'inx' ),
			'popular_items' => __( 'Popular Types Of Use', 'inx' ),
			'not_found' => __( 'No Types Of Use found.', 'inx' )
		),
		'public' => true,
		'show_admin_column' => false,
		'hierarchical' => false,
		'show_in_rest' => true,
		'rewrite' => [
			'slug' => _x( 'properties/type-of-use', 'Custom Taxonomy Slug', 'inx' ),
			'with_front' => false
		)
	],
	...
]
```

## Rückgabewert

angepasstes oder erweitertes Array mit allen für die Registrierung der **Immobilien-Taxonomien** relevanten Eigenschaften

## Rahmenfunktion

Eine Funktion zur Nutzung des Filters wird typischerweise in der folgenden Form in die Datei **functions.php** des **Child-Themes** eingebunden.

```php
add_filter( 'inx_taxonomies', 'mysite_modify_property_taxonomies' );

function mysite_modify_property_taxonomies( $taxonomies ) {
	// ...Eigenschaften der betr. Taxonomie(n) im Array $taxonomies anpassen...

	return $taxonomies;
} // mysite_modify_property_taxonomies
```
