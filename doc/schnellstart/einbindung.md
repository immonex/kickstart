---
title: Einbindung
category: schnellstart
order: 50
search: 1
---

# Frontend-Komponenten

Die vom Kickstart-Plugin bereitgestellten Immobilien-Komponenten können mit den folgenden **Shortcodes** in beliebiger Anzahl und Kombination in Seiten oder andere Inhaltselemente eingefügt werden. (Entsprechende [Gutenberg-Blockelemente](https://de.wordpress.org/gutenberg/) sind bereits in Planung bzw. Vorbereitung.)

Die in der gleichen Seite eingebundenen Komponenten sind grundsätzlich unabhängig voneinander, beeinflussen sich also nicht **direkt** gegenseitig. So wirkt sich bspw. die Änderung einer Auswahl im Suchformular erst **nach dem Absenden** bzw. dem Aktualisieren der kompletten Seite auf eine Listenansicht aus. Auch die Konfiguration einer Komponente per **Shortcode-Attribut** wirkt sich **nicht** automatisch auf die anderen Komponenten der Seite aus.

> Eine **komponentenübergreifende** Konfiguration ist aber mittels [GET-Parametern](#GET-Parameter) möglich.

## Suchformular

`[inx-search-form]`

Das Formular für die Suche nach Immobilien enthält in der Standardkonfiguration relativ umfangreiche Auswahlmöglichkeiten inkl. Umkreissuche etc. Diese können aber bei Bedarf mit einer kommagetrennten Liste der gewünschten Elemente reduziert werden, die als Shortcode-Attribut `elements` übergeben wird.

### Beispiele

nur Nutzungsart, Objektart und Absenden-Button einbinden:
`[inx-search-form elements="type-of-use, property-type, submit"]`

Details und vollständige Elementliste: [Komponenten > Suchformular](../komponenten/index.html)

## Sortierung

`[inx-filters-sort]`

Mit diesem Shortcode wird aktuell bei Verwendung des Standard-Skins ein Balken mit einer einzelnen Dropdown-Auswahlliste gängiger Sortiermöglichkeiten eingebunden. Hier könnten zukünftig weitere Optionen in Sachen Filterung ergänzt werden.

Details: [Komponenten > Sortierung](../komponenten/sortierung.html)

## Listenansicht

`[inx-property-list]`

Umfang, Art und Sortierung der angezeigten Immobilien können mit **Shortcode-Attributen** bestimmt werden, nachfolgend die gängigsten. Bei der [taxonomiebasierten Auswahl](../beitragsarten-taxonomien.html#Taxonomien) und der Sortierung sind auch mehrere, kommagetrennte Angaben möglich.

- **Objektart/en** (Taxonomie): `property-type="OBJEKTART-SLUG"` / `property-type="SLUG1, SLUG2, SLUG3"`
  Beispiel: nur Einfamilienhäuser
  `[inx-property-list property-type="einfamilienhaus"]`
  Beispiel: Ein- und Mehrfamilienhäuser
  `[inx-property-list property-type="einfamilienhaus, mehrfamilienhaus"]`

- **Vermarktungsart/en** (Taxonomie): `marketing-type="VERMARKTUNGSART-SLUG"` / `marketing-type="SLUG1, SLUG2, SLUG3..."`
  Beispiel: nur Kaufobjekte
  `[inx-property-list marketing-type="zu-verkaufen"]`

- **Ort/e** (Taxonomie): `locality="ORTSNAME-SLUG"` / `locality="SLUG1, SLUG2, SLUG3..."`
  Beispiel: Immobilien in Trier-West und Berlin
  `[inx-property-list locality="trier-west, berlin"]`

- **Label/s** (Taxonomie): `labels="LABEL-SLUG"` / `labels="SLUG1, SLUG2, SLUG3..."`
  Beispiel: nur als "neu" gekennzeichnete Immobilien
  `[inx-property-list labels="neu"]`

- **maximale Objektanzahl insgesamt/pro Seite:** `limit=ANZAHL` / `limit-page=ANZAHL`
  Beispiel: max. vier Objekte anzeigen
  `[inx-property-list limit=4]`

- **Sortierung:** `sort="SORTIERSCHLÜSSEL"` / `sort="KEY1, KEY2..."`
  Beispiel: Kaufobjekte zuerst, anschließend nach Preis absteigend sortieren
  `[inx-property-list sort="marketing_type_desc, price_desc"]`

Details und weitere Attribute: [Komponenten > Listenansicht](../komponenten/liste.html)

## Seitennavigation

`[inx-pagination]`

Hiermit wird die Standard-Seitennavigation in der vom Theme vorgegebenen Optik eingebunden.

Details: [Komponenten > Seitennavigation](../komponenten/seitennavigation.html)

## Immobilien-Details

> **Achtung!** Der folgende Shortcode kommt nur dann zum Einsatz, wenn eine **[Seite](einrichtung.html#Immobilien-Detailseite)** als Rahmenvorlage für die Immobilien-Details verwendet wird. Bei der (gängigeren) Nutzung des Standard-Templates des Immobilien-Beitragstyps wird er nicht benötigt.

`[inx-property-details]`

Wurde eine [Seite als Vorlage für die Detailansicht](einrichtung.html#Immobilien-Detailseite) ausgewählt, können hier mit diesem Shortcode die gewünschten Immobilien-Inhalte - komplett oder abschnittsweise - in die gewünschten Layout-Container-Elemente eingebettet werden. In letzterem Fall kann per Shortcode-Attribut `elements` festgelegt werden, welche Abschnitte/Daten eingefügt werden sollen. Zusätzliche Attribute werden wiederum beim Rendern des jeweiligen Element-Templates berücksichtigt (bei mehreren Elementen in dieser Form: `elementname-attribut="ATTRIBUTWERT"`).

### Beispiele

Haupt-Beschreibungstext einfügen:
`[inx-property-details elements="main_description"]`

Abschnitt mit Preisangaben und Überschrift "Preise" einfügen:
`[inx-property-details elements="prices" headline="Preise"]`

Fotogalerie und Abschnitt für Ausstattungsmerkmale einfügen, letzterer mit Überschrift "Ausstattung":
`[inx-property-details elements="gallery, features" features-headline="Ausstattung"]`

Alternativ können mit dem Attribut `exclude` auch Abschnitte explizit ausgeschlossen werden.

Alle Abschnitte außer dem Header anzeigen:
`[inx-property-details exclude="head"]`

Details und vollständige Elementliste: [Komponenten > Detailansicht](../komponenten/detailansicht.html)

## GET-Parameter

Kickstart-spezifische **GET-Parameter** werden an die URL der jeweiligen Seite angehangen und wirken sich auf die Ausgabe **aller betroffenen Komponenten** aus, die hier per Shortcode eingebundenen wurden. Wird also hierüber bspw. eine bestimmte Objektart oder eine Sortierung vorgegeben, werden diese Optionen auch im Suchformular bzw. der Sortierungs-Auswahlbox voreingestellt.

Die möglichen Angaben entsprechen weitgehend denen, die nach dem Absenden des [Standard-Suchformulars](../komponenten/index.html) in der URL der Ergebnisseite enthalten sind. Hinzu kommen die [Status-Flags](../referenzen-status-flags.html) für die Selektion von Referenzobjekten & Co. sowie weitere allgemeine Parameter (Ländercode, Objektanzahl, Sortierung etc.).

Die Namen der Parameter beginnen immer mit dem Präfix *inx-* oder *inx-search-*. Bei **taxonomiebasierten** Parametern werden die zugehörigen **Term-Slugs** als Werte übergeben (einzeln oder als kommagetrennte Liste).

| Parameter | Beschreibung / Werte |
| --------- | -------------------- |
| `inx-search-description` | Schlüsselwortsuche in Titeln, Beschreibungstexten und weiteren Feldern (z. B. Objekt-ID) |
| `inx-search-type-of-use` | Nutzungsart (Term-Slugs der Taxonomie [inx_type_of_use](../beitragsarten-taxonomien.html)) |
| `inx-search-property-type` | Objektart (Term-Slugs der Taxonomie [inx_property_type](../beitragsarten-taxonomien.html)) |
| `inx-search-marketing-type` | Vermarktungsart (Term-Slugs der Taxonomie [inx_marketing_type](../beitragsarten-taxonomien.html)) |
| `inx-search-locality` | Ort (Term-Slugs der Taxonomie [inx_location](../beitragsarten-taxonomien.html)) |
| `inx-search-features` | Ausstattung (Term-Slugs der Taxonomie [inx_features](../beitragsarten-taxonomien.html)) |
| `inx-search-labels` | Labels (Term-Slugs der Taxonomie [inx_labels](../beitragsarten-taxonomien.html)) |
| `inx-search-min-rooms` | Mindestanzahl Zimmer/Räume (Ganzzahl) |
| `inx-search-min-area` | Mindestfläche in m² (Ganzzahl) |
| `inx-search-price-range` | Preisrahmen (MIN,MAX, z. B. *200000,400000*) |
| `inx-author` | Objekte nach Autor(en) filtern (kommagetrennte Liste von Benutzer-IDs oder Login-Namen; Minus zum Ausschließen bestimmter Benutzer, z. B. *128,264*, *maklerx,agentur-y,dieter.demo* oder *-1,-2,-10*) |
| `inx-iso-country` | nur Objekte im Land mit dem angegebenen [ISO3-Ländercode](https://de.wikipedia.org/wiki/ISO-3166-1-Kodierliste) anzeigen (z. B. *DEU*) |
| `inx-references` | Referenzen anzeigen? (*yes* = ja, *no* = nein (Standard), *only* = ausschließlich) |
| `inx-available` | nur explizit verfügbare Objekte anzeigen? (*yes* = ja, *no* = nein) |
| `inx-reserved` | nur explizit reservierte Objekte anzeigen? (*yes* = ja, *no* = nein) |
| `inx-sold` | nur explizit verkaufte/vermietete Objekte anzeigen? (*yes* = ja, *no* = nein) |
| `inx-limit` | **Gesamtanzahl** der anzuzeigenden Immobilien begrenzen (Ganzzahl) |
| `inx-limit-page` | Anzahl der anzuzeigenden Immobilien **pro Seite** begrenzen (Ganzzahl) |
| `inx-sort` | [Sortierschlüssel (Key)](../komponenten/sortierung.html#Standard-Optionen) |

### Beispiel-URLs

Nur zu verkaufende Einfamilienhäuser anzeigen:
`https://www.immobilienmakler-website.de/immobilien/?inx-search-property-type=einfamilienhaus&inx-search-marketing-type=zu-verkaufen`

Barrierefreie Immobilien mit Wintergarten anzeigen:
`https://www.immobilienmakler-website.de/immobilien/?inx-search-features=barrierefrei,wintergarten`

Maximal fünf Objekte nach Preis absteigend sortiert anzeigen:
`https://www.immobilienmakler-website.de/immobilien/?inx-limit=5&inx-sort=price_desc`
