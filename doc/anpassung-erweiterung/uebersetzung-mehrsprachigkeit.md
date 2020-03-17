---
title: Übersetzung / Mehrsprachigkeit
category: anpassung-erweiterung
order: 40
search: 1
---

# Übersetzungen & Mehrsprachigkeit

immonex Kickstart ist vorrangig für die Umsetzung deutschsprachiger Websites ausgelegt. Nichtsdestotrotz ist natürlich eine **updatesichere** und WordPress-konforme Anpassung und Übersetzung der im Plugin enthaltenen Texte möglich.

Im **Plugin-Code** sind alle Texte in englischer Sprache hinterlegt. Diese sind als Basis für **neue Übersetzungen** in der Datei `immonex-kickstart.pot` im Unterordner `languages` des Plugin-Verzeichnisses zusammengefasst.

Hier sind auch die deutschen Übersetzungen zu finden: `inx-de_DE.po` (Quelldatei) bzw. `inx-de_DE.mo` (kompilierte Version). Der Ordner enthält u. U. Dateien weiterer DE-Varianten, die aber identische Inhalte aufweisen.

```
.../wp-content/plugins/immonex-kickstart/
└── languages
    ├── immonex-kickstart.pot
    ├── inx-de_DE.po
    ├── inx-de_DE.mo
    ├── inx-de_DE_formal.po
    ├── inx-de_DE_formal.mo
    ├── inx-de_LU.po
    ├── inx-de_LU.mo
    ├── inx-de_BE.po
    ├── inx-de_BE.mo
    ├── inx-de_AT.po
    ├── inx-de_AT.mo
    ├── inx-de_CH.po
    └── inx-de_CH.mo
```

Neue Übersetzungen oder individuell angepasste Versionen der mitgelieferten DE-Texte werden im **globalen WordPress-Übersetzungsordner** für Plugins hinterlegt (PO/MO-Dateien). Wichtig ist hier das einheitliche Namensschema *textdomain-sprachcode_LÄNDERCODE*.

```
.../wp-content/languages/plugins/
├── inx-de_DE.po
├── inx-de_DE.mo
├── inx-fr_FR.po
├── inx-fr_FR.mo
├── inx-es_ES.po
└── inx-es_ES.mo
```

Die Dateien im **globalen Übersetzungsordner** haben Priorität und werden anstelle von ggfls. vorhandenen gleichnamigen Dateien im Plugin-Ordner automatisch eingebunden. So ist auch sichergestellt, dass bei einem **Plugin-Update** keine Anpassungen überschrieben werden. (Ggfls. müssen die angepassten Übersetzungen im globalen Ordner in diesem Fall aber mittels der **pot-Datei** aktualisiert bzw. erweitert werden.)

Die Übersetzungen (PO/MO-Dateien) können entweder manuell mit einer lokal installierten Software wie [Poedit](https://poedit.net/) oder einem Plugin wie [Loco Translate](https://de.wordpress.org/plugins/loco-translate/) erstellt und aktualisiert werden.

## Übersetzung von Plugin-Optionen

In **mehrsprachigen Websites** (mit Sprachumschalter im Frontend) sind im Regelfall auch Texte zu übersetzen, die in den [Plugin-Optionen](../schnellstart/einrichtung.html) im WordPress-Backend hinterlegt sind (z. B. die Hinweise zum Objektstandort).

Diese können mit einer Übersetzungslösung wie [Polylang](https://de.wordpress.org/plugins/polylang/) oder [WPML](https://wpml.org/) übersetzt werden (<i>String Translation</i>).
