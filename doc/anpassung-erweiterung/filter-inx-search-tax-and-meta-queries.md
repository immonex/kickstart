---
title: Taxonomie- und Meta-Queries der Immobiliensuche (Filter)
search: 1
---

# inx_search_tax_and_meta_queries (Filter)

Über diesen Filter-Hook können die Taxonomie-, Meta- (<i>Custom Fields</i>) sowie Geo-Abfragen erweitert werden, die im Rahmen der [Suche](../komponenten/index.html) nach Immobilienobjekten bzw. der [Listenausgabe](../komponenten/liste.html) generiert werden.

> Dieser Filter ist vor allem bei der Entwicklung von [Add-ons](../add-ons.html) relevant, die eigene Parameter und Abfragen ergänzen.

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| `$queries` (array) | Array mit drei Unterelementen (`tax_query`, `meta_query` und `geo_query`), die die entsprechenden [WP-Query-Abfragen](https://developer.wordpress.org/reference/classes/wp_query/) bzw. Parameter enthalten |
| `$params` (array) | Suchkriterien, anhand der die Abfragen generiert wurden |
| `$prefix` (string) | Kickstart-Präfix (`inx-`), das in den meisten Fällen den Variablen-/Parameternamen vorangestellt wird |

### Das Queries-Array im Detail

Die Inhalte der Elemente `tax_query` und `meta_query` entsprechen den regulären WP-Query-Parametern für [Taxonomie-Terms](https://developer.wordpress.org/reference/classes/wp_query/#taxonomy-parameters) bzw. [Custom Field (Post Meta)](https://developer.wordpress.org/reference/classes/wp_query/#custom-field-post-meta-parameters).

Das Element `geo_query` kommt bei der Nutzung der Umkreissuche zum Einsatz und enthält die entsprechenden Koordinaten und Distanzangaben.

```php
[
	'tax_query' => [
		'relation' => 'AND',
		[
			'taxonomy' => 'inx_property_type',
			'field' => 'slug',
			'operator' => 'IN',
			'terms' => ['haeuser'],
		],
	],
	'meta_query' => [
		'relation' => 'AND',
		[
			'relation' => 'OR',
			[
				'key' => '_immonex_is_reference',
				'compare' => 'NOT EXISTS',
			],
			[
				'key' => '_immonex_is_reference',
				'value' => [ 0, 'off', false ],
				'compare' => 'IN',
			],
		]
	],
	'geo_query' => [
		'lat_field' => '_inx_lat',
		'lng_field' => '_inx_lng',
		'latitude' => 49.7596208,
		'longitude' => 6.6441878,
		'distance' => 25,
		'units' => 'km',
	],
]
```

## Rückgabewert

(eventuell) angepasste Queries

## Rahmenfunktion

Eine Funktion zur Nutzung des Filters wird typischerweise in der folgenden Form in der Datei **functions.php** des **Child-Themes** oder per Code-Snippets-Plugin eingebunden.

```php
add_filter( 'inx_search_tax_and_meta_queries', 'mysite_modify_property_search_queries', 10, 3 );

function mysite_modify_property_search_queries( $queries, $params, $prefix ) {
	// ...Query-Daten anpassen oder weiterverarbeiten...

	return $queries;
} // mysite_modify_property_search_queries
```