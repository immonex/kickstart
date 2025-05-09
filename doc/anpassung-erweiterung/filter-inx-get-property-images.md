# inx_get_property_images (Filter)

Dieser Filter dient dem **Abrufen** aller Bildanhang-Daten, die zu einer **Galerie** (Fotos oder Grundrisse) eines [Immobilien-Beitrags](/beitragsarten-taxonomien) gehören.

[](_info_add_on_hooks.md ':include')

## Parameter

| Name | Beschreibung |
| ---- | ------------ |
| **`$images`** (array) | leeres Array |
| `$post_id` (int\|string) | ID des Immobilien-Beitrags (optional, Standard: aktueller Beitrag) |
| `$args` (array) | Optionale Parameter |
| | `type` (Bildtyp) → *gallery* (Galeriefotos, Standard) oder *floor_plans* (Grundrisse) |
| | `return` (Return-Typ) → *objects* ([WP_Post-Objekte](https://developer.wordpress.org/reference/classes/wp_post/), Standard), *ids* (Attachment-IDs) oder *urls* (URLs) |

## Rückgabewert

Array mit Anhangdaten im angegebenen Format

## Code-Beispiele

```php
$gallery_image_urls = apply_filters(
	'inx_get_property_images',
	[],
	get_the_ID(),
	[ 'return' => 'urls' ]
);

// $gallery_image_urls
[
	'https://immobilienmakler-website.de/wp-content/uploads/2019/03/36_flo-pappert-201009-unsplash.jpg',
    'https://immobilienmakler-website.de/wp-content/uploads/2019/03/36_ialicante-mediterranean-homes-475799-unsplash.jpg',
    'https://immobilienmakler-website.de/wp-content/uploads/2019/03/36_vinicius-amano-692823-unsplash.jpg',
    'https://immobilienmakler-website.de/wp-content/uploads/2019/03/36_kari-shea-254186-unsplash.jpg'
]
```

```php
$floor_plan_ids = apply_filters(
	'inx_get_property_images',
	[],
	get_the_ID(),
	[
		'type' => 'floor_plans',
		'return' => 'ids'
	]
);

// $floor_plan_ids
[ 17286, 17289 ]
```

[](_backlink.md ':include')