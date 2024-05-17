=== immonex Kickstart ===
Contributors: immonex
Tags: openimmo, import, realestate, immobilien, immomakler
Requires at least: 5.1
Tested up to: 6.6
Stable Tag: 1.9.13
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
* Extendable custom taxonomies (property type, usage type, marketing type, project, location, features, labels)
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
* Property grouping (project taxonomy)
* Property location overview maps incl. clustered markers (OpenStreetMap/OpenTopoMap or Google Maps)
* Property detail location maps (OpenStreetMap/OpenTopoMap or Google Maps)
* Selectable map variants/views (road map, area map, topographic, satellite + streetmap layer)
* Customizable map marker image (SVG)
* Dynamic updates of property lists and location map views based on the current search parameters
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
Property Location Overview Map: `[inx-property-map]`
Property Details View: `[inx-property-details]`

(See documentation mentioned below for attributes and further details.)

[1] Alternative: Unzip the plugin ZIP archive, copy it to the folder `wp-content/plugins` and activate the plugin in the WordPress backend under *Plugins > Installed Plugins* afterwards.

[2] Current and fully functional versions of premium immonex plugins as well as OpenImmo demo data are available **free of charge** at the [immonex Developer Portal](https://immonex.dev/) for testing/development and demonstration purposes.

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

= 1.9.13 =
* Release date: 2024-05-17
* Added new map types/variations (overview and detail page maps).
* Added search element (inx-)title-desc for querying regular property title and description fields (special cases).
* Added ability to exclude properties from lists based on taxonomy terms.
* Added support for PDF files in floor plan and energy pass galleries.
* Added a default value to a callback method for the the_title filter to prevent issues regarding incorrect calls by other plugins.
* Extended fulltext search possibilities.
* Improved gallery navigation arrow display (especially on small screens and touch devices).
* Improved search form range slider value display.
* Reworked application of inx_search_form_primary_price_min_max_values filters.
* Fixed a warning related to manually entered test data.
* Fixed several minor gallery display issues.
* Fixed a minor search form reset bug.
* Updated dependencies.

= 1.9.0 =
* Release date: 2024-01-22
* Added user consent options for embedded video and virtual tour players.
* Added 3 user consent content related filter hooks.
* Reworked plugin options structure.
* Added option for enabling/disabling gallery image links (full size/lightbox).
* Reworked retrieving of special variable/flag values.
* Fixed translation file selection (beta versions only).
* Updated dependencies.

= 1.8.5 =
* Release date: 2023-11-10
* Added hashes to names of dynamically loaded JS/CSS files (improved cache busting).
* Fixed query order adjustments (special cases only).
* Fixed search form price range slider rounding issue.
* Disabled automatic detail to list view redirects when Divi Builder is active.
* Updated dependencies.

See changelog.txt for the complete version history.