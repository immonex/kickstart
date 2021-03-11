---
title: Sortierung
category: komponenten
order: 20
search: 1
---

# Sortierung

Soll eine [Immobilien-Listenansicht](liste.html) sortierbar gemacht werden, wird hierfür typischerweise eine Dropdown-Box mit den verfügbaren Optionen darüber eingebunden.

![Sortieroptionen für Immobilienlisten](../assets/scst-filters-sort-1.gif)
Sortieroptionen für Immobilienlisten

## Shortcode

`[inx-filters-sort]`

### Attribute

| Name | Beschreibung |
| ---- | ------------ |
| `elements` | Umfang und Reihenfolge der Sortieroptionen in der Liste (optional) |
| `exclude` | Bestimmte Sortieroptionen explizit ausschließend (optional) |
| `default` | Key der standardmäßig ausgewählte Sortieroption (optional) |

Via `elements` und `exclude` können kommagetrennte Listen der u. g. Elementnamen (Keys) übergeben werden.

Das Attribut `default` wird nur dann benötigt, wenn die Standardsortierung **nicht** per [GET-Parameter](../schnellstart/einbindung.html#GET-Parameter) `inx-sort` oder [Filterfunktion](../anpassung-erweiterung/filter-inx-default-sort-key.html) definiert wird bzw. die Standarsortierung **nicht** dem ersten Eintrag entspricht.

> Der Wert des `default` Attributs hat **keinen** direkten Einfluss auf die eigentliche Sortierung einer Immobilienliste auf der gleichen Seite. **Ohne** die Definition via GET-Parameter oder Filterfunktion muss eine abweichende Standardsortierung hier ebenfalls per Shortcode-Attribut gesetzt werden.

### Beispiele

nur Preis auf- oder absteigend (Standard) als Sortieroptionen
`[inx-filters-sort elements="price_asc, price_desc" default="price_desc"]`

Fläche und Zimmeranzahl aus der Optionsliste entfernen
`[inx-filters-sort exclude="area_asc, rooms_asc"]`

## Standard-Optionen

Die Auswahlbox enthält die folgenden Optionen. Die zugehörigen **Keys** können auch als Wert für das Sortierattribut des [Listenansicht-Shortcodes](liste.html#Shortcode) verwendet werden.

| Name (Key) | Sortierung |
| ---------- | ---------- |
| Aktuellste (`date_desc`) | Beitragsdatum absteigend (entspricht dem Datum der letzten Objekt-Aktualisierung in der Maklersoftware) |
| Kaufobjekte zuerst (`marketing_type_desc`) | Objekte mit <i>Verkauft-Flag</i> (*1* im Custom Field `_inx_is_sale`) oben |
| Mietobjekte zuerst (`marketing_type_asc`) | Objekte ohne <i>Verkauft-Flag</i> (*0* im Custom Field `_inx_is_sale`) oben |
| Verfügbare zuerst (`availability_desc`) | Objekte mit <i>Verfügbarkeits-Flag</i> (*1* im Custom Field `_inx_is_available`) oben |
| Preis aufsteigend (`price_asc`) | Primärpreis (Custom Field `_inx_primary_price`) aufsteigend |
| Preis absteigend (`price_desc`) | Primärpreis (Custom Field `_inx_primary_price`) absteigend |
| Fläche aufsteigend (`area_asc`) | Primärfläche (Custom Field `_inx_primary_area`) aufsteigend |
| Zimmer aufsteigend (`rooms_asc`) | Primäranzahl Zimmer/Räume (Custom Field `_inx_primary_rooms`) aufsteigend |
| Distanz (`distance`) | **bei aktiver Umkreissuche:** Distanz zum ausgewählten Standort aufsteigend |

## Erweiterte Anpassungen

- [Filter-Referenz](../anpassung-erweiterung/filters-actions.html#Sortierung)
- [Template](../anpassung-erweiterung/skins.html#Partiell)
- [Custom Skin](../anpassung-erweiterung/standard-skin.html#Archiv-amp-Listenansicht)
