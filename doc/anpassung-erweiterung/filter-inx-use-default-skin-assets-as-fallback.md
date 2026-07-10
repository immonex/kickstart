# inx_use_default_skin_assets_as_fallback (Filter)

Wird bei Verwendung eines [Custom Skins](standard-skin) auf eine Template-Datei zugegriffen, die nicht im zugehörigen [Ordner](skins?id=custom-skins) enthalten ist, wird die gleichnamige Variante aus dem [Standard-Skin-Ordner](skins?id=standard-skin) eingebunden, sofern diese Vorgabe nicht per Filterfunktion deaktiviert wurde.

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| **`$use_default_skin`** (bool) | Auf Standard-Skin zurückgreifen (Standard: `true`) |

## Rückgabewert

`false` zum Deaktivieren des Fallback-Modus

## Code-Beispiel

[](_info-snippet-einbindung.md ':include')

```php
/**
 * [immonex Kickstart] Standard-Skin-Fallback deaktivieren.
 */

add_filter( 'filter_inx_use_default_skin_assets_as_fallback', '__return_false' );
```

## Siehe auch

- [Skin-Ordner](skins?id=ordner)
- [Standard-Skin](standard-skin)

[](_backlink.md ':include')