# Das Standard-Skin im Detail

Die Dateien des Standard-Skins "Quiwi" des Kickstart-Basis-Plugins sind im Unterordner `skins/default` des Kickstart-Plugin-Verzeichnisses zu finden:

`.../wp-content/plugins/immonex-kickstart/skins/default`

Ebenso verhält es sich bei **Add-on-Standard-Skins**, wobei hier der jeweilige Add-on-Plugin-Ordner (`.../wp-content/plugins/ADD-ON-ORDNERNAME`) der Ausgangspunkt ist. Beispiel [Team Add-on](https://de.wordpress.org/plugins/immonex-kickstart-team/):

`.../wp-content/plugins/immonex-kickstart-team/skins/default`

Die Verwendung dieser Ordner als Vorlage für die Entwicklung eigener, sogenannter *Custom Skins* ist grundsätzlich möglich, besser hierfür eignen sich allerdings die aktuellen Quelldateien im jeweiligen Dev-Repository ([Kickstart-Basis-Plugin bei GitHub](https://github.com/immonex/kickstart/tree/master/src/skins/default)). Diese enthalten zusätzlich u. a. die für das Skin relevanten JavaScript- und SCSS-Quellcodes.

<pre class="tree">
default
…
╷
├── index.php
│
├── /assets &larr; <em class="token important">ab Plugin-Version 1.8: kompilierte CSS- und JS-Dateien</em> (nach Build-Kommando)
│   ╷
│   ├── index.css
│   └── index.js
│
├── /js &larr; <em class="token important">ab Plugin-Version 1.8: nur JS-Quelldatei</em>
│   ╷
│   └── index.js
│
├── /scss &larr; <em class="token important">(S)CSS-Quelldateien</em>
│   ╷
│   ├── /blocks
│   │   ╷
│   │   ├── _immonex-widget.scss
│   │   ├── …
│   │   └── _inx-video-iframe.scss
│   │
│   ├── _base.scss
│   ├── _config.scss
│   ├── _mixins.scss
│   ├── _uikit-custom.scss
│   └── index.scss
│
├── /fonts
│   ╷
│   ├── _flaticon.scss
│   ├── …
│   └── Flaticon.woff
…
</pre>

## Skin-Name

Die Datei `index.php` enthält lediglich den Namen des Skins, der im WP-Backend angezeigt wird, in der folgenden Form:

```php
/**
 * Skin Name: Quiwi
 */
```

## CSS & Sass

Die Datei `assets/index.css` (bis Plugin-Version 1.8: `css/index.css`) enthält alle für das Skin relevanten CSS-Stile und wird im Website-Frontend **automatisch** eingebunden. Beim Standard-Skin wird diese auf Basis der Daten im Ordner `scss` mit dem CSS-Präprozessor [Sass](https://sass-lang.com/) kompiliert.

!> Wird das [Git-Repository des Plugins](https://github.com/immonex/kickstart/tree/master/src/skins/default) als Grundlage für die Entwicklung eines eigenen Skins verwendet, wird der Ordner `assets` beim erstmaligen Aufruf eines Build-Befehls angelegt (z. B. `npm run build` oder `npm run watch`).

Hier wurde ein komponentenbasierter Ansatz verfolgt, der weitgehend der [BEM-Methodik](https://en.bem.info/methodology/key-concepts/) (Block, Element, Modifier) mit der Namenskonvention [Two Dashes style](https://en.bem.info/methodology/naming-convention/#two-dashes-style) entspricht.

Alle skinspezifischen Module (`blocks`) sowie Konfigurationsvariablen, Mixins und Grundelemente werden über die Einstiegsdatei `index.scss` eingebunden.

Ab der Plugin-Version 1.8 gehören hierzu **nicht mehr** die (S)CSS-Dateien folgender externer Libraries, die im Frontend zum Einsatz kommen:

- [UIkit](https://getuikit.com/)
- [noUiSlider](https://refreshless.com/nouislider/)
- [Vue-multiselect](https://vue-multiselect.js.org/)
- [OpenLayers](https://openlayers.org/)

Diese werden stattdessen über das Kern-Plugin eingebunden, um Inkompatibilitäten nach Updates zu vermeiden.

Auch die im Unterordner `fonts` enthaltenen Schriftarten werden seit Kickstart 1.8 nicht mehr via `index.scss` eingebunden, sondern über die JavaScript-Einstiegsdatei `index.js` (siehe unten).

Die für die *Blöcke* und *Elemente* verwendeten CSS-Klassennamen sind übrigens nicht nur in den PHP-Dateien des Skins enthalten, sondern (teilweise) auch in den skinübergreifenden [Vue.js-Komponenten](https://vuejs.org/), die vom Kickstart-Plugin bereitgestellt werden (Standortkarten/-Autovervollständigung, spezielle Elemente des Suchformulars...). Die Benennung sollte also in eigenen Skins beibehalten werden, sofern diese Komponenten auch hier zum Einsatz kommen.

?> Bei der Entwicklung eines *Custom Skins* ist der Einsatz eines CSS-Präprozessors optional. Die **Produktivversion** des Skins, die im Child-Theme-Ordner hinterlegt ist, muss nur die Datei `assets/index.css` bzw. `css/index.css` enthalten.

## JavaScript

<pre class="tree">
…
╷
├── /assets
│   ╷
│   ├── …
│   └── index.js &larr; <em class="token important">ab Plugin-Version 1.8: kompilierte JS-Datei im Ordner assets</em>
│
├── /js
│   ╷
│   └── index.js &larr; <em class="token important">ab Plugin-Version 1.8: Quelldatei im Ordner js</em>
…
</pre>

Auch der JavaScript-Code, der für das Skin eingebunden werden soll, ist in einer einzelnen Datei gebündelt: `assets/index.js` (ab Plugin-Version 1.8, vorher `js/index.js`).

Beim Standard-Skin sowie allen weiteren Skins, die (zukünftig) mit Kickstart oder hierauf basierenden Add-ons ausgeliefert werden, wird diese Bündelung im Rahmen der Entwicklung automatisiert mit dem "JavaScript-Modul-Packer" [webpack](https://webpack.js.org/) umgesetzt.

Die **Quelldateien** befinden sich im Unterordner `js` (ab Plugin-Version 1.8, vorher `js/src`).

Beim Standard-Skin enthält die Einstiegs-Quelldatei `index.js` auch Anweisungen für die Einbindung eines Skin-Symbolfonts sowie der o. g. SCSS-Hauptdatei:

```js
// Vendor specific styles & fonts
import '../fonts/_flaticon.css';

// (S)CSS
import '../scss/index.scss';
````

?> Auch hier gilt: Ein *Custom Skin* kann auch **ohne** den Einsatz eines solchen Bundlers entwickelt werden. Sofern überhaupt spezieller JavaScript-Code hierfür benötigt wird, ist eine Datei `index.js` ausreichend. (Im Regelfall wird sich der Umfang des Skin-JS-Codes ohnehin in einem überschaubaren Rahmen bewegen.)

## Frontend-Komponenten

?> Alle folgenden Abschnitte beziehen sich nur auf das Standard-Skin des **Basis-Plugins**, Add-ons bringen im Regelfall ihre eigenen Komponenten und benutzerdefinierten Beitragsarten (*Custom Post Types*) mit.

### Archiv & Listenansicht

<pre class="tree">
…
╷
├── archive-property.php
├── /property-list
│   ╷
│   ├── filters-sort.php
│   ├── list-item.php
│   ├── map.php
│   ├── pagination.php
│   └── properties.php
│
├── /images
│   ╷
│   ├── location-pin.png
│   ├── location-pin-org.png
│   └── map-location-pin.png &larr; <em class="token important">optional, falls eine eigene Markergrafik verwendet werden soll</em>
…
</pre>

Das Template für die Standard-Archivseite der [Immobilien-Beitragsart](/beitragsarten-taxonomien) ist in der Datei `archive-property.php` enthalten. Die Komponenten - [Karte](/komponenten/karte), [Suchformular](/komponenten/suchformular), [Sortierauswahl](/komponenten/sortierung), [Listenansicht](/komponenten/liste) und [Seitennavigation](/komponenten/seitennavigation) - werden über die entsprechenden [Rendering Actions](filters-actions.html#rendering) eingebunden:

```php
if ( $immonex_kickstart->property_list_map_display_by_default ) {
	do_action( 'inx_render_property_map', $inx_skin_tax_archive_args );
}

do_action( 'inx_render_property_search_form', $inx_skin_tax_archive_args );
do_action( 'inx_render_property_filters_sort' );
do_action( 'inx_render_property_list', array(
	'is_regular_archive_page' => true
) );
do_action( 'inx_render_pagination', array(
	'is_regular_archive_page' => true
) );
```

Der Ordner `property-list` enthält die Vorlagen (Templates) für Immobilienlisten (`properties.php` und `list-item.php`), Standort-Übersichtskarte (`map.php`), Sortierauswahl (`filters-sort.php` und Seitennavigation (`pagination.php`).

?> Bei allen Templates werden die zu rendernden Daten jeweils im Array `$template_data` bereitgestellt.

### Suchformular

<pre class="tree">
…
╷
├── property-search.php
├── /property-search
│   ╷
│   ├── element-checkbox.php
│   ├── …
│   └── element-text.php
…
</pre>

Das Template `property-search.php` dient der Einbindung der vorgegebenen [Elemente des Suchformulars](/komponenten/suchformular#elemente), deren Vorlagen - separat pro Elementart - im Ordner `property-search` hinterlegt sind.

### Detailansicht

<pre class="tree">
…
╷
├── single-property.php
├── /single-property
│   ╷
│   ├── contact-person.php
│   ├── …
│   ├── element-hub.php
│   ├── …
│   └── virtual-tour.php
│
├── /images
│   ╷
│   ├── location-pin.png
│   ├── location-pin-org.png
│   └── map-location-pin.png &larr; <em class="token important">optional, falls eine eigene Markergrafik verwendet werden soll</em>
…
</pre>

Die Datei `single-property.php` enthält das Standard-Template für die **Einzelansicht** eines [Immobilien-Beitrags](/beitragsarten-taxonomien).

Wie bei der Suche wurden die Templates der einzelnen **Elementarten** in einem Unterordner zusammengefasst: `single-property` (Jede dieser Vorlagen kann übrigens auch für mehrere, gleichartige [Elemente der Detailansicht](/komponenten/detailansicht#elemente) eingesetzt werden.)

Eine zentrale Bedeutung kommt hier der Vorlage `single-property/element-hub.php` zu: Hierüber wird die Einbindung und - beim Standard-Skin teilweise tabbasierte - Gruppierung und Darstellung der Elemente gesteuert. Hierbei handelt es sich auch um das vorausgewählte Template, wenn die [Detail-Render-Action](action-inx-render-property-contents) ohne explizite Angabe einer Vorlage ausgeführt wird:

```php
while ( have_posts() ) {
	the_post();
	do_action( 'inx_render_property_contents' );
}
```

### Karten

![Standard-Kartenmarker](../assets/standard-map-marker.png)\
Standard-Kartenmarker (*SVG*)

Soll eine eigene Markergrafik in den [Immobilien-Übersichtskarten](/komponenten/karte) oder den Standortkarten der [Detailansicht](/komponenten/detailansicht) verwendet werden, kann diese im Ordner `images` mit dem Namen `map-location-pin.png`abgelegt werden. (Alternativ können auch Größe, Farbe, Linienstärke und Transparenzgrad des Standard-SVG-Markers per [Shortcode-Attribut](/komponenten/karte?id=attribute) oder [Filterfunktion](filter-inx-property-list-map-atts) angepasst werden.)
