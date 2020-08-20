---
title: Standard-Skin / Custom Skins
category: anpassung-erweiterung
order: 30
search: 1
---

# Das Standard-Skin im Detail

Die Dateien des Standard-Skins "Quiwi" des Kickstart-Basis-Plugins sind im Unterordner `skins/default` des Kickstart-Plugin-Verzeichnisses zu finden:

`.../wp-content/plugins/immonex-kickstart/skins/default`

Ebenso verhält es sich bei **Add-on-Standard-Skins**, wobei hier der jeweilige Add-on-Plugin-Ordner (`.../wp-content/plugins/ADD-ON-ORDNERNAME`) der Ausgangspunkt ist. Beispiel [Team Add-on](https://de.wordpress.org/plugins/immonex-kickstart-team/):

`.../wp-content/plugins/immonex-kickstart-team/skins/default`

Die Verwendung dieser Ordner als Vorlage für die Entwicklung eigener, sogenannter <i>Custom Skins</i> ist grundsätzlich möglich, besser hierfür eignen sich allerdings die aktuellen Quelldateien im jeweiligen Dev-Repository ([Kickstart-Basis-Plugin bei GitHub](https://github.com/immonex/kickstart/tree/master/src/skins/default)). Diese enthalten zusätzlich u. a. die für das Skin relevanten JavaScript- und SCSS-Quellcodes.

```
default
├── index.php
├── css
│   └── index.css
├── scss
│   ├── blocks
│   │   ├── _immonex-widget.scss
│   │   ├── ...
│   │   └── _inx-video-iframe.scss
│   ├── _base.scss
│   ├── _config.scss
│   ├── _mixins.scss
│   ├── _uikit-custom.scss
│   └── index.scss
├── fonts
│   ├── _flaticon.scss
│   ├── ...
│   └── Flaticon.woff
...
```

## Skin-Name

Die Datei `index.php` enthält lediglich den Namen des Skins, der im WP-Backend angezeigt wird, in der folgenden Form:

```php
/**
 * Skin Name: Quiwi
 */
```

## CSS & Sass

Der Ordner `css` enthält nur die Datei `index.css`, die **automatisch** eingebunden wird. Hier sind alle für das Skin relevanten CSS-Stile enthalten. Beim Standard-Skin wird diese auf Basis der Daten im Ordner `scss` mit dem CSS-Präprozessor [Sass](https://sass-lang.com/) kompiliert.

Hier wurde ein komponentenbasierter Ansatz verfolgt, der weitgehend der [BEM-Methodik](https://en.bem.info/methodology/key-concepts/) (Block, Element, Modifier) mit der Namenskonvention [Two Dashes style](https://en.bem.info/methodology/naming-convention/#two-dashes-style) entspricht.

In der Einstiegsdatei `index.scss` werden neben den skinspezifischen Block-Dateien (`blocks`) und **Schriftarten** (`fonts`) auch die (S)CSS-Dateien externer Libraries eingebunden, die im Frontend zum Einsatz kommen:

- [UIkit](https://getuikit.com/)
- [noUiSlider](https://refreshless.com/nouislider/)
- [Vue-multiselect](https://vue-multiselect.js.org/)
- [OpenLayers](https://openlayers.org/)

Die für die <i>Blöcke</i> und <i>Elemente</i> verwendeten CSS-Klassennamen sind übrigens nicht nur in den PHP-Dateien des Skins enthalten, sondern (teilweise) auch in den skinübergreifenden [Vue.js-Komponenten](https://vuejs.org/), die vom Kickstart-Plugin bereitgestellt werden (Standortkarten/-Autovervollständigung, spezielle Elemente des Suchformulars...). Die Benennung sollte also in eigenen Skins beibehalten werden, sofern diese Komponenten auch hier zum Einsatz kommen.

> Bei der Entwicklung eines <i>Custom Skins</i> ist der Einsatz eines CSS-Präprozessors optional. Die **Produktivversion** des Skins, die im Child-Theme-Ordner hinterlegt ist, muss nur den Ordner `css` bzw. die Datei `index.css` enthalten.

## JavaScript

```
├── js
│   ├── src
│   │   └── index.js
│   └── index.js
```

Auch der JavaScript-Code, der für das Skin eingebunden werden soll, ist in einer einzelnen Datei gebündelt: `js/index.js`

Beim Standard-Skin sowie allen weiteren Skins, die (zukünftig) mit Kickstart oder hierauf basierenden Add-ons ausgeliefert werden, wird diese Bündelung im Rahmen der Entwicklung automatisiert mit dem "JavaScript-Modul-Packer" [webpack](https://webpack.js.org/) umgesetzt. Die Quelldateien befinden sich im Unterordner `js/src`. (Auch die Verarbeitung der o. g. SCSS-Dateien erfolgt hierüber.)

Auch hier gilt: Ein <i>Custom Skin</i> kann auch **ohne** den Einsatz eines solchen Bundlers entwickelt werden. Sofern überhaupt spezieller JavaScript-Code hierfür benötigt wird, ist eine Datei `index.js` ausreichend. (Im Regelfall wird sich der Umfang des Skin-JS-Codes ohnehin in einem überschaubaren Rahmen bewegen.)

## Frontend-Komponenten

> Alle folgenden Abschnitte beziehen sich nur auf das Standard-Skin des **Basis-Plugins**, Add-ons bringen im Regelfall ihre eigenen Komponenten und benutzerdefinierten Beitragsarten (<i>Custom Post Types</i>) mit.

### Archiv & Listenansicht

```
├── archive-property.php
├── property-list
│   ├── filters-sort.php
│   ├── list-item.php
│   ├── pagination.php
│   └── properties.php
```

Das Template für die Standard-Archivseite der [Immobilien-Beitragsart](../beitragsart-taxonomien.html) ist in der Datei `archive-property.php` enthalten. Die Komponenten - [Suchformular](../komponenten/index.html), [Sortierauswahl](../komponenten/sortierung.html), [Listenansicht](../komponenten/liste.html) und [Seitennavigation](../komponenten/seitennavigation.html) - werden über die entsprechenden [Rendering Actions](filters-actions.html#Rendering) eingebunden:

```php
do_action( 'inx_render_property_search_form' );
do_action( 'inx_render_property_filters_sort' );
do_action( 'inx_render_property_list', array(
	'is_regular_archive_page' => true
) );
do_action( 'inx_render_pagination', array(
	'is_regular_archive_page' => true
) );
```
Der Ordner `property-list` enthält die Vorlagen (Templates) für Immobilienlisten (`properties.php` und `list-item.php`), Sortierauswahl (`filters-sort.php` und Seitennavigation (`pagination.php`).

> Bei allen Templates werden die zu rendernden Daten jeweils im Array `$template_data` bereitgestellt.

### Suchformular

```
├── property-search.php
├── property-search
│   ├── element-checkbox.php
│   ├── ...
│   └── element-text.php
```

Das Template `property-search.php` dient der Einbindung der vorgegebenen [Elemente des Suchformulars](../komponenten/index.html#Elemente), deren Vorlagen - separat pro Elementart - im Ordner `property-search` hinterlegt sind.

### Detailansicht

```
├── single-property.php
├── single-property
│   ├── contact-person.php
│   ├── ...
│   ├── element-hub.php
│   ├── ...
│   └── virtual-tour.php
└── images
    └── location-pin.png
```

Die Datei `single-property.php` enthält das Standard-Template für die **Einzelansicht** eines [Immobilien-Beitrags](../beitragsarten-taxonomien.html).

Wie bei der Suche wurden die Templates der einzelnen **Elementarten** in einem Unterordner zusammengefasst: `single-property` (Jede dieser Vorlagen kann übrigens auch für mehrere, gleichartige [Elemente der Detailansicht](komponenten/detailansicht.html#Elemente-Detail-Abschnitte) eingesetzt werden.)

Eine zentrale Bedeutung kommt hier der Vorlage `single-property/element-hub.php` zu: Hierüber wird die Einbindung und - beim Standard-Skin teilweise tabbasierte - Gruppierung und Darstellung der Elemente gesteuert. Hierbei handelt es sich auch um das vorausgewählte Template, wenn die [Detail-Render-Action](action-inx-render-property-contents.html) ohne explizite Angabe einer Vorlage ausgeführt wird:

```php
while ( have_posts() ) {
	the_post();
	do_action( 'inx_render_property_contents' );
}
```

