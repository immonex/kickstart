---
title: Taxonomie-Term-Anpassung bei Referenz-Status-Updates (Filter)
search: 1
---

# inx_marketing_type_reference_term_replacements (Filter)

Wird im WordPress-Backend der [Referenzobjekt-Status](../referenzen-status-flags.html) einer Immobilie geändert, werden bestimmte [Taxonomie-Terms](../beitragsarten-taxonomien.html) automatisch angepasst (so wird z. B. aus "Zu Verkaufen" die Angabe "Verkauft" oder umgekehrt).

Mit diesem Filter können die entsprechenden Übersetzungen bearbeitet oder deaktiviert werden.

## Parameter

| Name | Beschreibung |
| ---- | ------------ |
| `$replace_terms` | Array anzupassender Taxonomie-Terms und die entsprechenden Ersetzungen oder *false* zum Deaktivieren |

### Standard-Replace-Terms-Array

```php
// 'Begriff wenn kein Referenzobjekt' => 'Begriff wenn Referenzobjekt'

[
	'Zu Verkaufen' => 'Verkauft',
	'Zu verkaufen' => 'verkauft',
	'zu verkaufen' => 'verkauft',
	'Zum Kauf' => 'verkauft',
	'zum Kauf' => 'verkauft',
	'Zu Vermieten' => 'Vermietet',
	'Zu vermieten' => 'vermietet',
	'Zur Miete' => 'vermietet',
	'zur Miete' => 'vermietet',
	'Zu mieten' => 'vermietet',
	'zu mieten' => 'vermietet'
]
```

## Rückgabewert

angepasstes Ersetzungs-Array oder *false* zum Deaktivieren

## Rahmenfunktion

Eine Funktion zur Nutzung des Filters wird typischerweise in der folgenden Form in der Datei **functions.php** des **Child-Themes** oder per Code-Snippets-Plugin eingebunden.

```php
add_filter( 'inx_marketing_type_reference_term_replacements', 'mysite_modify_marketing_type_replacements' );

function mysite_modify_marketing_type_replacements( $replace_terms ) {
	// ...Array $replace_terms modifizieren oder erweitern...

	return $replace_terms;
} // mysite_modify_marketing_type_replacements

```