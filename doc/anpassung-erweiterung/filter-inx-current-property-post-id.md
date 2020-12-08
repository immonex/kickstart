---
title: Aktuelle Immobilien-Beitrags-ID (Filter)
search: 1
---

# inx_current_property_post_id (Filter)

Wird bspw. in einer Template-Datei die ID des aktuell anzuzeigenden [Immobilien-Beitrags](../beitragsarten-taxonomien.html) benötigt, entspricht diese **nicht** immer der per `get_the_ID()` abrufbaren Angabe. Daher sollte hierfür grundsätzlich dieser Filter verwendet werden.

## Parameter

| Name (Typ) | Beschreibung |
| ---------- | ------------ |
| `$post_id` (int\|string) | Standardvorgabe, z. B. der per `get_the_ID()` ermittelte Wert |

## Rückgabewert

aktuelle Immobilien-Beitrags-ID

## Beispiel

```php
$property_id = apply_filters( 'inx_current_property_post_id', get_the_ID() );
```