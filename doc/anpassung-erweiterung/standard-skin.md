# Das Standard-Skin im Detail

Wie bereits in den [Skin-Grundlagen](skins?id=individuelle-anpassung) erläutert, können die aktuellen **Quelldateien** des Standard-Skins „Quiwi“ im [Entwicklungs-Repository (GitHub)](https://github.com/immonex/kickstart/tree/master/src/skins/default) als Vorlagen für die Entwicklung eigener *Custom Skins* für das Kickstart-Basis-Plugin verwendet werden. Analog hierzu sind auch die Standard-Skins von **Kickstart-Add-on-Plugins** in den jeweiligen Repositorys bzw.  Plugin-Ordnern verfügbar.

?> **PHP- und Twig-Templates** können alternativ auch aus dem Order `skins/default` des betr. Plugin-Verzeichnisses innerhalb der WordPress-Installation übernommen werden.

<strong>In einen Custom-Skin-Ordner gehören nur Dateien, deren Inhalt von denen des Standard-Skins abweicht.</strong> Die aktuellen Originaldateien des Standard-Skins werden seit der <strong>Kickstart-Version 1.17.10</strong> automatisch eingebunden, wenn sie im Custom Skin nicht enthalten sind (Ausnahme: Deaktivierung des *Fallback-Modus* per Filter-Hook [inx_use_default_skin_assets_as_fallback](filter-inx-use-default-skin-assets-as-fallback)).

<pre class="tree">
<strong>/default</strong>
╷
├── index.php
│
├── <strong class="token keyword">/assets</strong> &larr; <em class="token important">Inhalte werden beim Build generiert, d. h. der Ordner ist im Repository-Quellordner nicht enthalten!</em>
│   ╷
│   ├── index.css
│   └── index.js
│
├── <strong class="token keyword">/js</strong> &larr; <em class="token important">JS-Quelldatei(en)</em>
│   ╷
│   └── index.js
│
├── <strong class="token keyword">/scss</strong> &larr; <em class="token important">(S)CSS-Quelldateien</em>
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
│   └── index.scss
│
├── /images
├── /single-property
├── /property-list
├── /property-search
╵
…
</pre>

## Skin-Name

Die Datei `index.php` enthält den Namen des Skins, der in den Auswahllisten der Plugin-Optionen (WP-Backend) angezeigt wird, in der folgenden Form:

```php
<?php
/**
 * Skin Name: Quiwi
 */

die( "Don't event think about it!" );
```

?> Entspricht der **Ordnername** des Custom Skins mit `default` dem des Standard-Skins, wird diese Datei **nicht** benötigt.

## (S)CSS & Sass

Die Datei `assets/index.css`, die alle für das Skin relevanten CSS-Stile enthält, wird auf Basis der Inhalte des Ordners `scss` mit [Sass](https://sass-lang.com/) generiert und im Website-Frontend **automatisch** eingebunden (siehe [Skin-Grundlagen](skins?id=css-und-javascript)).

!> Wird das [Git-Repository des Plugins](https://github.com/immonex/kickstart/tree/master/src/skins/default) als Grundlage für die Entwicklung eines eigenen Skins verwendet, wird der Ordner `assets` beim erstmaligen Aufruf eines Build-Befehls angelegt (z. B. `npm run build` oder `npm run watch`).

Hier wurde ein komponentenbasierter Ansatz verfolgt, der weitgehend der [BEM-Methodik](https://en.bem.info/methodology/key-concepts/) (Block, Element, Modifier) mit der Namenskonvention [Two Dashes style](https://en.bem.info/methodology/naming-convention/#two-dashes-style) entspricht.

Alle skinspezifischen Module (`blocks`) sowie Konfigurationsvariablen, Mixins und Grundelemente werden über die Einstiegsdatei `index.scss` eingebunden.

In früheren Plugin/Skin-Versionen (< 1.8 bzw. 1.17.10) enthaltene (S)CSS-Ressourcen externer Libraries (UIkit, noUiSlider, OpenLayers etc.) sowie Fonts werden mittlerweile über den Plugin-Kern eingebunden, um Inkompatibilitäten nach Updates zu vermeiden.

Die für die *Blöcke* und *Elemente* verwendeten CSS-Klassennamen sind übrigens nicht nur in den PHP-Dateien des Skins enthalten, sondern (teilweise) auch in den skinübergreifenden [Vue.js-Komponenten](https://vuejs.org/), die vom Kickstart-Plugin bereitgestellt werden (Standortkarten/-Autovervollständigung, spezielle Elemente des Suchformulars...). Die Benennung sollte also in eigenen Skins beibehalten werden, sofern diese Komponenten auch hier zum Einsatz kommen.

?> Bei der Entwicklung eines *Custom Skins* ist der Einsatz eines CSS-Präprozessors wie Sass optional, wird aber empfohlen.

## JavaScript

<pre class="tree">
…
╷
├── <strong>/assets</strong> &larr; <em class="token important">kompilierte/minimierte CSS- und JS-Dateien, die im Frontend eingebunden werden</em>
│   ╷
│   ├── …
│   └── <strong class="token keyword">index.js</strong>
│
├── <strong>/js</strong> &larr; <em class="token important">Quelldatei(en)</em>
│   ╷
│   └── index.js
…
</pre>

Auch der skinspezifische JavaScript-Code wird im Rahmen des Build-Prozesses mit [webpack](https://webpack.js.org/) in einer einzelnen Datei gebündelt (`assets/index.js`), minimiert und [automatisch eingebunden](skins?id=css-und-javascript).

Die **Quelldateien** befinden sich im Unterordner `js`.

?> Auch hier gilt: Ein *Custom Skin* kann auch **ohne** den Einsatz eines solchen Bundlers entwickelt werden. (Im Regelfall bewegt sich der Umfang des Skin-JS-Codes ohnehin in einem überschaubaren Rahmen.)

## Frontend-Komponenten

Alle folgenden Abschnitte beziehen sich nur auf das Standard-Skin des **Basis-Plugins**, Add-ons bringen ihre eigenen Komponenten und benutzerdefinierten Beitragsarten (*Custom Post Types*) mit.

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

Der Ordner `property-list` enthält die Vorlagen (Templates) für Immobilienlisten (`properties.php` und `list-item.php`), Standort-Übersichtskarte (`map.php`), Sortierauswahl (`filters-sort.php` ) und Seitennavigation (`pagination.php`).

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

Wie bei der Suche wurden die Templates der einzelnen **Elementarten** in einem Unterordner zusammengefasst: `single-property`

Eine zentrale Bedeutung kommt hier der Vorlage `single-property/element-hub.php` zu: Hierüber wird die Einbindung und – beim Standard-Skin teilweise tabbasierte – Gruppierung und Darstellung der Elemente gesteuert. Hierbei handelt es sich auch um das vorausgewählte Template, wenn die [Detail-Render-Action](action-inx-render-property-contents) ohne explizite Angabe einer Vorlage ausgeführt wird:

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

### Widerrufsformular

Die Template-Datei `withdrawal-form.php` enthält die Vorlage für das [Widerrufsformular](/komponenten/widerrufsformular).
