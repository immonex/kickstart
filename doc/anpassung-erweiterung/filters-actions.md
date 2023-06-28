# Filter & Actions

## Filter

### WordPress Bootstrap / Allgemein

- [inx_property_post_type_args](filter-inx-property-post-type-args) (Eigenschaften des Immobilien-Beitragstyps)
- [inx_taxonomies](filter-inx-taxonomies) (immobilienspezifische Taxonomien)
- [inx_image_sizes](filter-inx-image-sizes) (Kickstart-spezifische Bildgrößen definieren)
- [inx_submenu_items](filter-inx-submenu-items) (Elemente des immonex-Menüs im WP-Backend)

### Immobiliensuche / Listen

- [inx_search_form_elements](filter-inx-search-form-elements) (Suchformular-Elemente)
- [inx_search_form_element_tax_args](filter-inx-search-form-element-tax-args) (Parameter für den Abruf der Optionen taxonomiebasierter Auswahlelemente)
- [inx_search_form_element_tax_options](filter-inx-search-form-element-tax-options) (Optionen taxonomiebasierter Auswahlelemente) 
- [inx_search_tax_and_meta_queries](filter-inx-search-tax-and-meta-queries) (Taxonomie- und Meta-Queries der Immobiliensuche)
- [inx_special_query_vars](filter-inx-special-query-vars) (Komponentenübergreifende Query-Parameter)
- [inx_exclude_backlink_vars](filter-inx-exclude-backlink-vars) (GET-Variablen aus Backlinks ausfiltern)
- [inx_search_form_primary_price_min_max_values](filter-inx-search-form-primary-price-min-max-values) (Minimal/Maximal-Werte für den Preis-Slider festlegen)
- [inx_search_form_area_min_max_value](filter-inx-search-form-area-min-max-value) (Minimal/Maximal-Werte für Flächen-Slider festlegen oder anpassen)
- [inx_fulltext_search_fields](filter-inx-fulltext-search-fields) (Custom Fields für die Volltextsuche)

### Standortkarten

- [inx_property_list_map_atts](filter-inx-property-list-map-atts) (Abfrage/Rendering-Attribute der Kartenansicht)

### Sortierung

- [inx_property_sort_options](filter-inx-property-sort-options) (Sortieroptionen der Frontend-Auswahlliste)
- [inx_default_sort_key](filter-inx-default-sort-key) (Standard-Sortierung von Immobilien-Listen)

### Detailansicht

- [inx_detail_page_elements](filter-inx-detail-page-elements) (Elemente der Detailansicht)
- [inx_video_iframe_template](filter-inx-video-iframe-template) (Template für die Einbindung von Video-iFrames)
- [inx_tabbed_content_elements](filter-inx-tabbed-content-elements) (Elementaufteilung bei tabbasierter Darstellung)
- [inx_property_template_data_details](filter-inx-property-template-data-details) (Anpassung der Detaildaten einer Immobilie vor dem Rendern des Templates)
- [inx_property_detail_element_output](filter-inx-property-detail-element-output) (Anpassung der Ausgabe einzelner Detail-Elemente)
- [inx_forward_to_list_view_url](filter-inx-forward-to-list-view-url) (URL der Listen-Weiterleitung beim direkten Aufruf der Detailseite)

### Rendering / Templates

#### Allgemein

- [inx_auto_applied_rendering_atts](filter-inx-auto-applied-rendering-atts) (Rendering-spezifische Attribute mit automatisierter Übernahme definieren)
- [inx_apply_auto_rendering_atts](filter-inx-apply-auto-rendering-atts) (Rendering-Auto-Attribute übernehmen)
- [inx_template_search_folders](filter-inx-template-search-folders) (Basisordner für Skins/Templates ergänzen)
- [inx_template_folder_url_mappings](filter-inx-template-folder-url-mappings) (URL-Zuordnungen für nicht öffentlich zugängliche Template/Skin-Dateisystem-Basisordner definieren)

#### Immobilien

- [inx_property_core_data_custom_fields](filter-inx-property-core-data-custom-fields) (Custom Fields der Immobilien-Kerndaten)
- [inx_property_core_data](filter-inx-property-core-data) (Immobilien-Kerndaten)

### Kompatibilität

- [inx_required_property_custom_field_defaults](filter-inx-required-property-custom-field-defaults) (Standardvorgaben obligatorischer Custom Fields von Immobilienbeiträgen beim OpenImmo-Import)

### Sonstiges

- [inx_marketing_type_reference_term_replacements](filter-inx-marketing-type-reference-term-replacements) (Taxonomie-Term-Anpassung bei Referenz-Status-Updates)

### Datenabfrage (API Wrapper)

Die folgenden Hooks sind – als Alternative zu direkten Funktionsaufrufen – für die **Abfrage oder Generierung** von Kickstart-spezifischen Daten vorgesehen (z. B. in Add-ons).

#### Allgemein

- [inx_get_query_var_value](filter-inx-get-query-var-value) (Werte beliebiger Query-Variablen abrufen)

#### Immobilien

- [inx_current_property_post_id](filter-inx-current-property-post-id) (aktuelle Immobilien-Beitrags-ID ermitteln)
- [inx_get_properties](filter-inx-get-properties) (Immobilienbeiträge abrufen oder Anzahl ermitteln)
- [inx_get_property_template_data](filter-inx-get-property-template-data) (komplette "Rohdaten" für das Template-Rendering einer Immobilie abrufen)
- [inx_get_property_images](filter-inx-get-property-images) (Galerie-Bildanhänge einer Immobilie abrufen)
- [inx_get_property_detail_item](filter-inx-get-property-detail-item) (Detail-Element einer Immobilie abrufen)

## Actions

### Rendering

- [inx_render_property_map](action-inx-render-property-map) (Immobilien-Standortkarte)
- [inx_render_property_search_form](action-inx-render-property-search-form) (Immobilien-Suchformular)
- [inx_render_property_search_form_element](action-inx-render-property-search-form-element) (Suchformular-Element)
- [inx_render_property_list](action-inx-render-property-list) (Immobilien-Listenansicht)
- [inx_render_pagination](action-inx-render-pagination) (Seitennavigation der Listenansicht)
- [inx_render_property_filters_sort](action-inx-render-property-filters-sort) (Element zur Auswahl der Sortierung)
- [inx_render_property_contents](action-inx-render-property-contents) (Immobilien-Details)

### Mehrsprachigkeit

- [inx_rest_set_query_language](action-inx-rest-set-query-language) (Sprache für REST-API-basierte Abfragen festlegen)