# inx_get_option_value (Filter)

Über diesen Filter Hook kann der aktuelle Wert einer Kickstart-Plugin-Option **abgerufen** werden.

[](_info_add_on_hooks.md ':include')

## Parameter

| Name | Beschreibung |
| ---- | ------------ |
| **`$value`** (mixed) | leerer String bzw. leeres Array |
| `$key` (string) | Key (Optionsname) |

## Rückgabewert

Optionswert oder *false*, falls nicht ermittelbar

## Code-Beispiele

```php
// [immonex Kickstart] Wert der Plugin-Option "skin" abrufen.

$skin = apply_filters( 'inx_get_option_value', '', 'skin' );

// $skin = 'default';
```

[](_backlink.md ':include')