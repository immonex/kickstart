=== immonex Kickstart ===
Contributors: immonex
Tags: openimmo, import, realestate, immobilien, immomakler
Requires at least: 5.5
Tested up to: 6.9
Stable Tag: 1.11.3
Requires PHP: 7.4
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

immonex OpenImmo2WP [2], initially released in 2015, is a tried and tested solution for importing OpenImmo-XML data into WordPress sites with support for the specific data structures of various popular real estate themes and frontend plugins.

= Main Features =

* Custom post type for properties
* Extendable custom taxonomies (property type, usage type, marketing type, project, location, features, labels)
* Special status flags per real estate object (reference, available, sold ...)
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
* Integrated SEO features, i.a. meta tags for social media sharing (Open Graph, X/Twitter)
* Obtainment of user consent before loading external libraries (EU GDPR compliance)
* Various filter and action hooks for special adaptions
* Extension framework for separate add-on plugins
* Translation via translate.wordpress.org (GlotPress)
* Current POT file and German translations included as PO/MO files additionally
* Support for multilingual websites (Polylang or WPML)
* Compatible with immonex OpenImmo2WP (OpenImmo importer) [2]
* Compatible with immonex Energy Scale Pro (energy class visualization) [2]
* Compatible with immonex Notify (real estate e-mail marketing/automation) [2]

= Add-ons =

* **[Team](https://wordpress.org/plugins/immonex-kickstart-team/)**: Extended real estate agency/agent data handling and property related contact forms
* **[Slideshows](https://plugins.inveris.de/wordpress-plugins/immonex-kickstart-slideshows)**: Real estate slideshows for display presentation in shop windows and public areas [2]
* **Print** (to be released soon): Generation of PDF exposés for printing and sharing
* **Elementor** (to be released soon): Elementor widgets and dynamic tags for Kickstart frontend components

== Installation ==

immonex Kickstart is available in the official [WordPress Plugin Directory](https://wordpress.org/plugins/) and can be installed via the WordPress backend.

1. *Plugins > Add New > Search for "immonex" ...* [1]
2. Check/Adjust the default plugin options under *immonex > Settings*.
3. OPTIONAL: Install the [Team add-on](https://wordpress.org/plugins/immonex-kickstart-team/) for extended agency/agent data handling and contact forms.
4. Install immonex OpenImmo2WP or another compatible OpenImmo import plugin and perform a first import. [2]
5. OPTIONAL: Create pages as templates for property lists and/or detail views including the following shortcodes.
6. OPTIONAL: Add Kickstart shortcodes to arbitrary pages or page builder elements as needed, e.g. for embedding property search forms or teaser lists.

= Kickstart Shortcodes =

Search Form: `[inx-search-form]`
List View: `[inx-property-list]`
List Sort Selection: `[inx-filters-sort]`
List Pagination: `[inx-pagination]`
Property Location Overview Map: `[inx-property-map]`
Property Detail View: `[inx-property-details]`
Property Main Image: `[inx-property-featured-image]`

(See documentation mentioned below for attributes and further details.)

[1] Alternatives: Download an installation ZIP file from the WP Plugin Directory or immonex.dev and select *Upload Plugin* **or** manually unzip and transfer it to the folder `wp-content/plugins`. In the latter case, activating the plugin under *Plugins > Installed Plugins* is required afterwards.

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

= 1.11.3 =
* Release date: 2025-05-09
* Added shortcode [inx-property-featured-image].
* Extended support for the regular WP [gallery] shortcode.
* Reworked determination of number of matches for search results.
* Reworked coordinate validation.
* Optimized gallery CSS rules.
* Fixed a provision title display problem.
* Fixed a minor search form value encoding issue.

= 1.10.0 =
* Release date: 2025-03-26
* Fixed a platform compatibility issue (new minimum PHP version: 7.4).
* Added demo data (Elementor add-on).
* Added some minor default template and CSS tweaks.

= 1.9.60 =
* Release date: 2025-03-21
* Added backend plugin options for adjusting skin colors.
* Added variable compare options based on selected form values.
* Added user consent contents for the Giraffe360 virtual tour service.
* Fixed a security issue (possible injection of external backlink URLs).
* Reworked property list item and standard detail head templates (default skin).
* Reworked the main gallery of the property detail pages and added related plugin options for customization in a separate tab.
* Reworked the overview map JS component.
* Improved Elementor Pro template selection for property list (archive) and detail views.
* Verified compatibility with WordPress 6.8.

See changelog.txt for the complete version history.