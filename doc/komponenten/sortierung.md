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
| Zimmer aufsteigend (`area_asc`) | Primäranzahl Zimmer/Räume (Custom Field `_inx_primary_rooms`) aufsteigend |
| Distanz (`distance`) | **bei aktiver Umkreissuche:** Distanz zum ausgewählten Standort aufsteigend |

## Erweiterte Anpassungen

- [Filter-Referenz](../anpassung-erweiterung/filters-actions.html#Sortierung)
- [Template](../anpassung-erweiterung/skins.html#Partiell)
- [Custom Skin](../anpassung-erweiterung/standard-skin.html#Archiv-amp-Listenansicht)
