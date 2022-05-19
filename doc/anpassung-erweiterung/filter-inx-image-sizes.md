# inx_image_sizes (Filter)

Mit diesem Filter kann die Liste der **im Kickstart-Kontext** zu registrierenden benutzerdefinierten **Bildgrößen** erweitert werden.

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| `$image_sizes` (Array) | Array mit jeweils einem Unterelement pro Bildgröße, die registriert werden soll |

### Das Image-Sizes-Array im Detail

Die Angaben in den einzelne Elementen entsprechen den Werten, die für den Aufruf der WP-Funktion [`add_image_size`](https://developer.wordpress.org/reference/functions/add_image_size/) benötigt werden, wobei der Element-Key dem Namen der Bildgröße entspricht.

```php
$image_sizes = [
	'inx-thumbnail' => [
		'width'  => 120,
		'height' => 68,
		'crop'   => true,
	],
];
```

## Rückgabewert

erweitertes Bildgrößen-Array

## Rahmenfunktion

Eine Funktion zur Nutzung des Filters wird typischerweise in der folgenden Form in der Datei **functions.php** des **Child-Themes** oder per Code-Snippets-Plugin eingebunden.

```php
add_filter( 'inx_image_sizes', 'mysite_extend_kickstart_image_sizes' );

function mysite_extend_kickstart_image_sizes( $image_sizes ) {
	// Zusätzliche Bildgröße hinzufügen.
	$image_sizes['inx-myimagesize'] = [
		'width'  => 240,
		'height' => 136,
		'crop'   => false,
	];

	return $image_sizes;
} // mysite_extend_kickstart_image_sizes
```