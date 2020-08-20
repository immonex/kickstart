---
title: Referenzen & Co.
category: grundlagen
order: 40
search: 1
---

# Referenzobjekte

Erfolgreich vermarktete Immobilien können entweder automatisiert beim [Import](schnellstart/import.html) oder manuell im WordPress-Backend (***immonex → Immobilien***) als Referenzobjekt markiert werden (Wert *1* im Custom Field `_immonex_is_reference`). Beim Import erfolgt die Kennzeichnung anhand einer in der <i>Mapping-Tabelle</i> hinterlegten Zuordnung.

> Referenzobjekte werden in [Immobilien-Listen](komponenten/liste.html) nur dann angezeigt, wenn entweder das [Shortcode-Attribut](komponenten/liste.html#Custom-Field-basiert) `references="yes"` bzw. `references="only"` oder der entsprechende [GET-Parameter](schnellstart/einbindung.html#GET-Parameter) `?inx-references=yes` bzw. `?inx-references=only` in der URL der Übersichtsseite vorhanden ist. (Hierbei stehen *yes* für "Referenzobjekte **auch** anzeigen" und *only* für "**nur** Referenzobjekte anzeigen".)

![Immobilienliste im WordPress-Backend](assets/scst-be-property-list.gif)

## Weitere Status-Flags

Neben der Kennzeichnung als Referenzobjekt werden beim Import pro Objekt noch weitere <i>Status-Flags</i> gespeichert, die bei der [Listenausgabe](komponenten/liste.html) mit berücksichtigt werden können:

| Bezeichnung | Custom Field | [Shortcode-Attribut](komponenten/liste.html#Custom-Field-basiert) | [GET-Parameter](schnellstart/einbindung.html#GET-Parameter) |
| ----------- | ------------ | -------------------------- | ------------- |
| verfügbar | `_immonex_is_available` | `available` | `inx-available` |
| reserviert | `_immonex_is_reserved` | `reserved` | `inx-reserved` |
| verkauft/vermietet | `_immonex_is_sold` | `sold` | `inx-sold` |

Der in den Custom Fields hinterlegte Wert ist immer *1* (ja) oder *0* (nein), Shortcode-Attribute und GET-Parameter können mit den Angaben *yes* oder *no* gefüttert werden.

Objekte werden beim Import immer dann als *verfügbar* gekennzeichnet, wenn sie **nicht** als reserviert, verkauft oder Referenzobjekt übermittelt wurden.