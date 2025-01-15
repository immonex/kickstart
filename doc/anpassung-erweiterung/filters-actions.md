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
- [inx_special_query_vars](filter-inx-special-query-vars) (allgemeine Abfrage-Parameter)
- [inx_exclude_backlink_vars](filter-inx-exclude-backlink-vars) (GET-Variablen aus Backlinks ausfiltern)
- [inx_search_form_primary_price_min_max_values](filter-inx-search-form-primary-price-min-max-values) (Minimal/Maximal-Werte für den Preis-Slider festlegen)
- [inx_search_form_area_min_max_value](filter-inx-search-form-area-min-max-value) (Minimal/Maximal-Werte für Flächen-Slider festlegen oder anpassen)
- [inx_fulltext_search_fields](filter-inx-fulltext-search-fields) (Custom Fields für die Volltextsuche)
- [inx_search_form_debounce_delay](filter-inx-search-form-debounce-delay) (Debounce-Verzögerung bei Änderung der Suchkriterien)

### Übersichtskarten

- [inx_property_list_map_atts](filter-inx-property-list-map-atts) (Abfrage/Rendering-Attribute der Kartenansicht)
- [inx_property_list_map_options](filter-inx-property-list-map-options) (Standardvorgaben für das Quellobjekt der JS-Übersichtskarten-Komponente)

### Sortierung

- [inx_property_sort_options](filter-inx-property-sort-options) (Sortieroptionen der Frontend-Auswahlliste)
- [inx_default_sort_key](filter-inx-default-sort-key) (Standard-Sortierung von Immobilien-Listen)

### Detailansicht

- [inx_detail_page_elements](filter-inx-detail-page-elements) (Elemente der Detailansicht)
- [inx_video_iframe_template](filter-inx-video-iframe-template) (Template für die Einbindung von Video-iFrames)
- [inx_tabbed_content_elements](filter-inx-tabbed-content-elements) (Elementaufteilung bei tabbasierter Darstellung)
- [inx_property_template_data_details](filter-inx-property-template-data-details) (Detaildaten einer Immobilie vor dem Rendern des Templates)
- [inx_property_detail_element_output](filter-inx-property-detail-element-output) (Anpassung der Ausgabe einzelner Detail-Elemente)
- [inx_forward_to_list_view_url](filter-inx-forward-to-list-view-url) (URL der Listen-Weiterleitung beim direkten Aufruf der Detailseite)
- [inx_property_location_map_options](filter-inx-property-location-map-options) (Standardvorgaben für Objekte der JS-Standortkarten-Komponenten)

### Benutzereinwilligung

- [inx_user_consent_contents](filter-inx-user-consent-contents) (Inhalte aller Benutzereinwilligungs-Abfragen)
- [inx_get_user_consent_content](filter-inx-get-user-consent-content) (Inhalte eines bestimmten Nutzereinwilligungstyps bzw. Fallback-Angaben)
- [inx_user_consent_default_button_text](filter-inx-user-consent-default-button-text) (Standardtext für Bestätigungsbuttons von Benutzereinwilligungen)

### Rendering / Templates

#### Allgemein

- [inx_auto_applied_rendering_atts](filter-inx-auto-applied-rendering-atts) (Rendering-spezifische Attribute mit automatisierter Übernahme definieren)
- [inx_apply_auto_rendering_atts](filter-inx-apply-auto-rendering-atts) (Rendering-Auto-Attribute übernehmen)
- [inx_template_search_folders](filter-inx-template-search-folders) (Basisordner für Skins/Templates ergänzen)
- [inx_template_folder_url_mappings](filter-inx-template-folder-url-mappings) (URL-Zuordnungen für nicht öffentlich zugängliche Template/Skin-Dateisystem-Basisordner definieren)

#### Immobilien

- [inx_property_core_data_custom_fields](filter-inx-property-core-data-custom-fields) (Custom Fields der Immobilien-Kerndaten)
- [inx_property_core_data](filter-inx-property-core-data) (Immobilien-Kerndaten)
- [inx_property_template_data](filter-inx-property-template-data) (komplette Immobilien-Template-Rendering-Daten)
- [inx_rendered_property_template_contents](filter-inx-rendered-property-template-contents) (Anpassung der gerenderten Inhalte eines Immobilien-Detail-Templates)
- [inx_sharing_{$type}\_meta_tags](filter-inx-sharing-meta-tags) (Meta-Tags für soziale Netzwerke etc.)

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
- [inx_get_custom_field_value_by_name](filter-inx-get-custom-field-value-by-name) (Custom-Field-Wert einer Immobilie anhand des Mapping-Namens abrufen)
- [inx_get_group_items](filter-inx-get-group-items) (Immobilien-Detailelemente nach Gruppen abrufen)
- [inx_add_special_vars_from_post_meta](filter-inx-add-special-vars-from-post-meta) (globale Abfrage-Parameter aus Custom Fields abrufen/ergänzen)
- [inx_is_property_list_page](filter-inx-is-property-list-page) (Immobilien-Listenseiten-Prüfung)
- [inx_is_property_tax_archive](filter-inx-is-property-tax-archive) (Immobilien-Taxonomie-Archiv-Prüfung)
- [inx_is_property_details_page](filter-inx-is-property-details-page) (Immobilien-Detailseiten-Prüfung)

## Actions

### Rendering

#### Einbindung / Ausgabe

Die folgenden Hooks dienen der vorrangig der **Einbindung** von Kickstart-Komponenten in Templates und somit der **Ausgabe** von Immobiliendaten.

- [inx_render_property_map](action-inx-render-property-map) (Immobilien-Übersichtskarte)
- [inx_render_property_search_form](action-inx-render-property-search-form) (Immobilien-Suchformular)
- [inx_render_property_search_form_element](action-inx-render-property-search-form-element) (Suchformular-Element)
- [inx_render_property_list](action-inx-render-property-list) (Immobilien-Listenansicht)
- [inx_render_pagination](action-inx-render-pagination) (Seitennavigation der Listenansicht)
- [inx_render_property_filters_sort](action-inx-render-property-filters-sort) (Element zur Auswahl der Sortierung)
- [inx_render_property_contents](action-inx-render-property-contents) (Immobilien-Details)

#### Ergänzung

Mit diesen Hooks können beliebige **zusätzliche** Inhalte **vor oder nach** der Ausgabe der Immobiliendaten-Elemente eingefügt werden.

- [inx_before_render_property_list](action-inx-before-render-property-list) (vor der Ausgabe einer Immobilienliste)
- [inx_after_render_property_list](action-inx-after-render-property-list) (nach der Ausgabe einer Immobilienliste)
- [inx_before_render_property_list_item](action-inx-before-render-property-list-item) (vor der Ausgabe eines Immobilien-Listenelements)
- [inx_after_render_property_list_item](action-inx-after-render-property-list-item) (nach der Ausgabe eines Immobilien-Listenelements)
- [inx_before_render_single_property](action-inx-before-render-single-property) (vor der Objektdatenausgabe per Standard-Template)
- [inx_after_render_single_property](action-inx-after-render-single-property) (nach der Objektdatenausgabe per Standard-Template)
- [inx_before_render_detail_element_{$element_key}](action-inx-before-render-detail-element) (vor der Ausgabe eines Detail-Elements)
- [inx_after_render_detail_element_{$element_key}](action-inx-after-render-detail-element) (nach der Ausgabe eines Detail-Elements)

### Mehrsprachigkeit

- [inx_rest_set_query_language](action-inx-rest-set-query-language) (Sprache für REST-API-basierte Abfragen festlegen)