---
title: Übersetzung / Mehrsprachigkeit
category: anpassung-erweiterung
order: 40
search: 1
---

# Übersetzungen & Mehrsprachigkeit

immonex Kickstart ist vorrangig für die Umsetzung deutschsprachiger Websites ausgelegt. Nichtsdestotrotz ist natürlich eine **updatesichere** und WordPress-konforme Anpassung und Übersetzung der im Plugin enthaltenen Texte möglich.

Im **Plugin-Code** sind alle Texte in englischer Sprache hinterlegt. Diese sind als Basis für **neue Übersetzungen** in der Datei `immonex-kickstart.pot` im Unterordner `languages` des Plugin-Verzeichnisses zusammengefasst.

Hier sind auch die deutschen Übersetzungen zu finden: `immonex-kickstart-de_DE.po` (Quelldatei) bzw. `immonex-kickstart-de_DE.mo` (kompilierte Version). Der Ordner enthält u. U. Dateien weiterer DE-Varianten, die aber identische Inhalte aufweisen.

```
.../wp-content/plugins/immonex-kickstart/
└── languages
    ├── immonex-kickstart.pot
    ├── immonex-kickstart-de_DE.po
    ├── immonex-kickstart-de_DE.mo
    ├── immonex-kickstart-de_DE_formal.po
    ├── immonex-kickstart-de_DE_formal.mo
    ├── immonex-kickstart-de_LU.po
    ├── immonex-kickstart-de_LU.mo
    ├── immonex-kickstart-de_BE.po
    ├── immonex-kickstart-de_BE.mo
    ├── immonex-kickstart-de_AT.po
    ├── immonex-kickstart-de_AT.mo
    ├── immonex-kickstart-de_CH.po
    └── immonex-kickstart-de_CH.mo
```

Neue Übersetzungen oder individuell angepasste Versionen der mitgelieferten DE-Texte werden im **globalen WordPress-Übersetzungsordner** für Plugins hinterlegt (PO/MO-Dateien). Wichtig ist hier das einheitliche Namensschema *textdomain-sprachcode_LÄNDERCODE*.

```
.../wp-content/languages/plugins/
├── immonex-kickstart-de_DE.po
├── immonex-kickstart-de_DE.mo
├── immonex-kickstart-fr_FR.po
├── immonex-kickstart-fr_FR.mo
├── immonex-kickstart-es_ES.po
└── immonex-kickstart-es_ES.mo
```

Die Dateien im **globalen Übersetzungsordner** haben Priorität und werden anstelle von ggfls. vorhandenen gleichnamigen Dateien im Plugin-Ordner automatisch eingebunden. So ist auch sichergestellt, dass bei einem **Plugin-Update** keine Anpassungen überschrieben werden. (Ggfls. müssen die angepassten Übersetzungen im globalen Ordner in diesem Fall aber mittels der **pot-Datei** aktualisiert bzw. erweitert werden.)

Die Übersetzungen (PO/MO-Dateien) können entweder manuell mit einer lokal installierten Software wie [Poedit](https://poedit.net/) oder einem Plugin wie [Loco Translate](https://de.wordpress.org/plugins/loco-translate/) erstellt und aktualisiert werden.

## Übersetzung von Plugin-Optionen

In **mehrsprachigen Websites** (mit Sprachumschalter im Frontend) sind im Regelfall auch Texte zu übersetzen, die in den [Plugin-Optionen](../schnellstart/einrichtung.html) im WordPress-Backend hinterlegt sind (z. B. die Hinweise zum Objektstandort).

Diese können mit einer Übersetzungslösung wie [Polylang](https://de.wordpress.org/plugins/polylang/) oder [WPML](https://wpml.org/) übersetzt werden (<i>String Translation</i>).
