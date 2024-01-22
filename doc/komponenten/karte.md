# Standortkarte

Kickstart stellt **ab Version 1.2.0** eine [OpenStreetMap-basierte](https://www.openstreetmap.org/) Kartenansicht bereit, die in der [Standard-Übersichtsseite](/beitragsarten-taxonomien#immobilien-beiträge) bereits enthalten ist. Die klickbaren Standortmarker der Immobilien werden hier – je nach Zoomstufe – "geclustert" dargestellt (inkl. Objektanzahl).

!> In der [Detailansicht](detailansicht) ist ebenfalls eine Kartenansicht enthalten, die aber unabhängig von dieser Übersichtskarte gerendert wird.

![Übersichtskarte mit Immobilien-Standortmarkern](../assets/scst-property-map-1.png)

Der Kartenausschnitt wird anhand der Koordinaten der vorhandenen Immobilien automatisch ermittelt. Ist dies nicht möglich, wird auf die in den [Plugin-Optionen](/schnellstart/einrichtung#karten-in-immobilien-listenseiten) hinterlegten Standard-Koordinaten zurückgegriffen. Hier kann die Karte in der Immobilien-Übersicht ([Standard-Archivseite](/beitragsarten-taxonomien#immobilien-beiträge)) bei Bedarf auch deaktiviert werden.

Per Klick können Infofenster mit Thumbnails und Detail-Links der zum Marker gehörenden Immobilie(n) enthalten.

Auch bei den Karten auf den Übersichtsseiten ist eine (einmalige) Einwilligung bzgl. der Einbindung durch den Nutzer vorgeschaltet, sofern diese nicht bereits anderweitig erteilt wurde:

![Nutzer-Einwilligung](../assets/scst-property-map-consent.png)

## Shortcode

`[inx-property-map]`

### Attribute

Die Attribute, mit denen Art und Umfang der in der Karte anzuzeigenden Immobilienmarker bestimmt werden können, entsprechen weitestgehend denen der [Listenansicht](liste).

Hinzu kommen die folgenden (**optionalen**) geospezifischen Angaben:

| Name | Beschreibung / Attributwerte |
| ---- | ----------------------------- |
| `lat` | Standard-Breitengrad des Karten-Mittelpunkts als **Float-Wert** (-90 bis 90), z. B. *49.8587840* \* |
| `lng` | Standard-Längengrad des Karten-Mittelpunkts als **Float-Wert** (-180 bis 180), z. B. *6.7854410* \* |
| `zoom` | Initial-Zoomstufe der Karte als **Ganzzahl** (8 bis 18) \* |
| `require-consent` | Benutzer-Zustimmung vor Einbettung der Karte aktivieren (*1*) oder deaktivieren (*0*) - überschreibt die [Standardvorgabe in den Plugin-Optionen](/schnellstart/einrichtung#benutzereinwilligung) |

\* Mittelpunkt und Zoom der Karte werden normalerweise™ anhand der Koordinaten der enthaltenen Standortmarker automatisch ermittelt.

##### Beispiel

Karte mit Häusern und Initial-Zoomstufe 14:\
`[inx-property-map property-type="haeuser" zoom=14]`

## Erweiterte Anpassungen

- [Filter-Referenz](/anpassung-erweiterung/filters-actions#standortkarten)
- [Templates](/anpassung-erweiterung/skins#partiell)
- [Custom Skin](/anpassung-erweiterung/standard-skin#archiv-amp-listenansicht)
