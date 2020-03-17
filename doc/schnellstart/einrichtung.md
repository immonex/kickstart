---
title: Einrichtung
category: schnellstart
order: 30
search: 1
---

# Einrichtung

Bei aktiviertem Kickstart-Plugin sind die zugehörigen Inhalte und Optionen in der Hauptnavigation des WordPress-Admin-Backends unter ***immonex*** zusammengefasst.

![WordPress-Backend-Navigation](../assets/scst-options-1.gif)

Der hier enthaltene Link ***Einstellungen*** führt zur zentralen Optionsseite für Kickstart und - sofern installiert - hierauf aufbauende [Add-ons](../add-ons.html):

![Plugin- und Add-on-Optionen](../assets/scst-options-2.gif)

## Einstellungen

Die Einstellungsseite ist in mehrere Tabs mit thematisch gruppierten Optionen unterteilt, wobei die vorderen das Kickstart-Plugin selbst betreffen. Sind [Add-ons](../add-ons.html) installiert, folgt jeweils ein zusätzlicher Tab pro Erweiterung.

Die meisten Optionen sind selbsterklärend oder mit einer Beschreibung versehen. Hier einige ergänzende Details zu zentralen Einstellungsmöglichkeiten:

### Allgemein

#### Skin

Ein so genanntes [Skin](../anpassung-erweiterung/skins.html) bildet die Grundlage für individuelle Anpassungen und umfasst alle Dateien, die für die **Ausgabe und Darstellung** der vom Plugin bereitgestellten Komponenten im **Website-Frontend** maßgeblich sind (Layoutvorlagen, Stile, Ausgabelogik etc.).

Die Auswahl eines alternativen Skins kann also eine vollkommen andere Form der Ausgabe von Immobilienlisten und -detailseiten bewirken. Hierunter fällt nicht nur die grundlegende Optik, sondern u. a. auch der Umfang der angezeigten Daten sowie die Interaktionsmöglichkeiten der Website-Besucher.

Das aktuell mitgelieferte [Standard-Skin "Quiwi"](../anpassung-erweiterung/standard-skin.html) basiert auf dem optisch ansprechenden und "leichtgewichtigen" Frontend-Framework [UIkit](https://getuikit.com/). [Kickstart-Add-ons](../add-ons.html) können wiederum Skins für ihre eigenen Frontend-Module mitbringen, die dann in den jeweiligen Add-on-Options-Tabs zur Auswahl stehen.

Detaillierte Infos zur Anpassung vorhandener und Entwicklung eigener Skins sind unter [Anpassung & Erweiterung](../anpassung-erweiterung/skins.html) zu finden.

#### Immobilien-Übersicht

Enthält eine Seite ein Immobilien-Suchformular, aber **keine** Listenausgabe und **keine** Angabe einer Zielseite für die Ausgabe der Ergebnisse ([Attribut des Suchformular-Shortcodes](../komponenten/index.html#Attribute)), wird hierfür normalwerweise die [Standard-Archivseite](../beitragsarten-taxonomien.html#Immobilien-Beitrage) verwendet.

Hier kann **alternativ** eine beliebige andere Seite ausgewählt werden, die den Shortcode `[inx-property-list]` enthält.

#### Immobilien-Detailseite

Das [Standard-Skin](../anpassung-erweiterung/standard-skin.html) enthält bereits eine **auf Code-Basis anpassbare** Seitenvorlage, in der alle verfügbaren Elemente für die Immobilien-Detailansicht (Beschreibungstexte, Grunddaten, Preise, Ausstattungsmerkmale, Lage, Fotogalerie, Grundrisse etc.) zusammengefasst sind.

Soll hierfür **alternativ** eine **Seite als Vorlage** verwendet werden, die mit [Gutenberg oder einem Page-Builder](einbindung.html#Immobilien-Details) erstellt wurde, wird diese hier ausgewählt.

### Karten & Umkreissuche

Kickstart unterstützt zwei Plattformen für die Darstellung (Karten) und Auswahl (Umkreissuche/Autovervollständigung) von Immobilien-Standorten: [OpenStreetMap](https://www.openstreetmap.de/) (per [OpenLayers-Bibliothek](https://de.wikipedia.org/wiki/OpenLayers)) in der Standardeinstellung sowie [Google Maps](https://cloud.google.com/maps-platform/) als Alternative.

Die Plugin-Optionen sehen bei Karten mit **Standortmarkern** zwei Infotexte für die Ausgabe in einem **Infofenster-Overlay** innerhalb der Karte oder in Form eines kurzen **Hinweises unterhalb der Karte** vor. (Normalerweise ist einer hiervon ausreichend.)

Bei Google Maps, die per iFrame eingebunden werden und nur einen Ort bzw. Stadtteil zeigen (Embed API), ist nur der *Ortsteilkarten-Hinweis* relevant.

![OpenStreetMap-basierte Standortkarte](../assets/scst-osm-map.gif)
OpenStreetMap/OpenLayers-basierte Karte mit Standortmarker

![Google-Maps-basierte Standortkarte](../assets/scst-google-map.gif)
Google-Maps-Karte mit Standortmarker

![Google-Maps-Karte mit Ort/Stadtteil](../assets/scst-google-embed-map.gif)
Google-Maps-Karte mit Ort oder Stadtteil (iFrame)

#### Autovervollständigung & Benutzer-Einwilligung

Die **Umkreissuche** im erweiterten [Immobilien-Suchformular](../komponenten/index.html) kann generell deaktiviert werden, indem bei *Autovervollständigung* die Option `keine` ausgewählt wird.

Da die Nutzung externer Dienste hinsichtlich der [EU-DSGVO](https://de.wikipedia.org/wiki/Datenschutz-Grundverordnung) problematisch sein **kann**, kann bei der Autovervollständigung eine explizite Zustimmung des Nutzers per Klick auf einen entsprechenden Button angefordert werden (standardmäßig aktiviert).

Bei der **Kartendarstellung** ist diese Zustimmung obligatorisch und kann nicht deaktiviert werden.

![Zustimmung zur Einbindung von OpenStreetMap-Karten](../assets/scst-osm-map-consent.png)
Zustimmung zur OpenStreetMap-Nutzung (passender Alternativtext bei Google Maps)

Wurde die Zustimmung erteilt, gilt diese immer sowohl für die Autovervollständigung als auch für die Karteneinbidung und wird in Form eines **Cookies** gespeichert, das für 24 Stunden gültig ist.

>**Keine Panik!** Hierbei handelt es sich **nicht** um ein <i>Tracking-Cookie</i>, für das gemäß DSGVO eine separate Einwilligung einzuholen ist!

#### Google Maps

Für die Nutzung der Google-Maps-Dienste ist ein passender API-Schlüssel erforderlich, der im gleichnamigen Abschnitt hinterlegt wird. Für diesen müssen neben der **Maps-JavaScript-API** auch die **Places- und Embed-APIs** aktiviert sein.


