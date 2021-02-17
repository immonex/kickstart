=== immonex Kickstart ===
Contributors: immonex
Tags: openimmo, import, realestate, immobilien, immomakler
Requires at least: 4.6
Tested up to: 5.6.1
Stable Tag: 1.2.0
Requires PHP: 5.6
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Essential components and add-on framework for embedding and searching/filtering imported OpenImmo-XML-based real estate offers

== Description ==

immonex Kickstart provides customizable components for integrating imported **OpenImmo®-based property offers** in real estate websites built upon **multi-purpose themes** in an easy and visually appealing way. Beyond that, it's also a framework for add-ons, separate plugins that extend the functionality on the same foundation.

tl;dr
- See it in action at [base.immonex.one](https://base.immonex.one/)!
- Install the free [Team add-on](https://wordpress.org/plugins/immonex-kickstart-team/) for extended real estate agency/agent data handling and property related contact forms.
- Download a compatible OpenImmo import plugin [2] and example data at [immonex.dev](https://immonex.dev/) (free of charge for testing/development).
- Read the [docs](https://docs.immonex.de/kickstart/) for detailed usage/customization instructions.

= immonex® =

**immonex** is an umbrella brand for various real estate related software solutions and services with a focus on german-speaking markets/users.

= OpenImmo® =

[OpenImmo-XML](http://openimmo.de/) is the de-facto standard for exchanging real estate data in the german-speaking countries. Here, it is supported by almost every common software solution and portal for real estate professionals (as import/export interfaces).

Plugins like immonex OpenImmo2WP [2] are used to import OpenImmo-XML data into the specific WordPress/theme/plugin data structures of the destination site.

= Main Features =

* Custom post type for properties
* Extendable custom taxonomies (property type, usage type, marketing type, location, features, labels)
* Special status flags per real estate object (reference, available, sold...)
* Flexible real estate search form
* Area/Radius search (Photon or Google Maps autocomplete)
* Property list and detail views
* Animated photo slideshows and floor plan galleries
* Integration of YouTube/Vimeo videos
* Embedding of 360° virtual tours from common providers
* Extendable sort options
* Shortcodes for embedding real estate components (suitable for use in page builder layout elements)
* Simple but powerful templating system ("Skins")
* Clean and responsive default skin
* Property location overview maps incl. clustered markers (OpenStreetMap/OpenLayers)
* Property detail location maps (OpenStreetMap and Google Maps)
* Obtainment of user consent before loading external libraries (EU GDPR compliance)
* Various filter and action hooks for special adaptions
* Extension framework for separate add-on plugins
* Translation via translate.wordpress.org (GlotPress)
* Current POT file and German translations included as PO/MO files additionally
* Support for multilingual websites (Polylang or WPML)
* Compatible with immonex OpenImmo2WP (OpenImmo importer) [2]
* Compatible with immonex Energy Scale Pro (energy class visualization) [2]

== Installation ==

1. WordPress backend: *Plugins > Add New > Upload Plugin* [1]
2. Select the plugin ZIP file and click the install button.
3. Activate the plugin after successful installation.
4. Check/Modify the default plugin options under *immonex > Settings*.
5. OPTIONAL: Install the [Team add-on](https://wordpress.org/plugins/immonex-kickstart-team/) for extended agency/agent data handling and contact forms.
6. Install immonex OpenImmo2WP or another compatible OpenImmo import plugin and perform a first import. [2]
7. OPTIONAL: Create pages as templates for property lists and/or detail views including the following shortcodes.
8. OPTIONAL: Add Kickstart shortcodes to arbitrary pages or page builder elements as needed, e.g. for embedding property search forms or teaser lists.

= Kickstart Shortcodes =

Search Form: `[inx-search-form]`
List View: `[inx-property-list]`
List Sort Selection: `[inx-filters-sort]`
List Pagination: `[inx-pagination]`
Property Details View: `[inx-property-details]`

(See documentation mentioned below for attributes and further details.)

[1] Alternative: Unzip the plugin ZIP archive, copy it to the folder `wp-content/plugins` and activate the plugin in the WordPress backend under *Plugins > Installed Plugins* afterwards.

[2] Current and fully functional versions of premium immonex plugins as well as OpenImmo demo data are available **free of charge** at the [immonex Developer Portal](https://immonex.dev/) for testing/development purposes.

= Documentation & Development =

A detailed plugin installation/integration documentation in German is available here:

[docs.immonex.de/kickstart](https://docs.immonex.de/kickstart/)

immonex Kickstart is free software. Sources, development docs/support and issue tracking are available at GitHub:

[github.com/immonex/kickstart](https://github.com/immonex/kickstart)

== Screenshots ==

1. Default property archive page with all components
2. Default search form with visible extended section
3. Search form and list view on small displays
4. Property detail view: header and gallery slideshow
5. Property detail view: main description text
6. Property detail view: details tab
7. Property detail view: energy tab with Energy Scale Pro [2] based visualization
8. Property detail view: location tab with OpenStreetMap/OpenLayers map
9. WP backend: Central plugin/add-on options
10. WP backend: Property list

== Changelog ==

= 1.2.5-beta =
* Release date: ?
* Added option for setting an alternate reference price text.
* Added option for enabling/disabling the map bounds auto-fit function.
* Added automatic removal of backlink URL in browser address bar.
* Lowered minimum zoom level for property overview maps.
* Fixed distance search arguments not being applied in overview maps.

= 1.2.0 =
* Release date: 2020-12-08
* Added property location overview maps incl. clustered markers.
* Slightly reworked default skin.
* Extended country code based queries to distinguish between single
  and multiple codes.
* Changed list image default size from 300 px to 800 px.
* Added latitude and longitude to property backend form.
* Updated Photon base URL (geo location autocompletion).
* Updated JS code (WordPress 5.6 compatibility).

= 1.1.2 =
* Release date: 2020-09-01
* Fixed an issue regarding the currency option usage.
* Updated external libraries.

See changelog.txt for complete version history.