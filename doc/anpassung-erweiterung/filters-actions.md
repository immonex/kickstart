---
title: Filter/Action-Referenz
category: anpassung-erweiterung
order: 50
search: 1
---

# Filter & Actions

## Filter

### WordPress Bootstrap / Allgemein

- [inx_property_post_type_args](filter-inx-property-post-type-args.html) (Eigenschaften des Immobilien-Beitragstyps)
- [inx_taxonomies](filter-inx-taxonomies.html) (immobilienspezifische Taxonomien)
- [inx_image_sizes](filter-inx-image-sizes.html) (Kickstart-spezifische Bildgrößen definieren)
- [inx_submenu_items](filter-inx-submenu-items.html) (Elemente des immonex-Menüs im WP-Backend)

### Immobiliensuche / Listen

- [inx_search_form_elements](filter-inx-search-form-elements.html) (Suchformular-Elemente)
- [inx_search_tax_and_meta_queries](filter-inx-search-tax-and-meta-queries.html) (Taxonomie- und Meta-Queries der Immobiliensuche)
- [inx_special_query_vars](filter-inx-special-query-vars.html) (Komponentenübergreifende Query-Parameter)
- [inx_exclude_backlink_vars](filter-inx-exclude-backlink-vars.html) (GET-Variablen aus Backlinks ausfiltern)
- [inx_search_form_primary_price_min_max_values](filter-inx-search-form-primary-price-min-max-values.html) (Minimal/Maximal-Werte für den Preis-Slider festlegen)

### Sortierung

- [inx_property_sort_options](filter-inx-property-sort-options.html) (Sortieroptionen der Frontend-Auswahlliste)
- [inx_default_sort_key](filter-inx-default-sort-key.html) (Standard-Sortierung von Immobilien-Listen)

### Detailansicht

- [inx_detail_page_elements](filter-inx-detail-page-elements.html) (Elemente der Detailansicht)
- [inx_video_iframe_template](filter-inx-video-iframe-template.html) (Template für die Einbindung von Video-iFrames)
- [inx_tabbed_content_elements](filter-inx-tabbed-content-elements.html) (Elementaufteilung bei tabbasierter Darstellung)

### Sonstiges

- [inx_marketing_type_reference_term_replacements](filter-inx-marketing-type-reference-term-replacements.html) (Taxonomie-Term-Anpassung bei Referenz-Status-Updates)

### Rendering

- [inx_auto_applied_rendering_atts](filter-inx-auto-applied-rendering-atts.html) (Rendering-spezifische Attribute mit automatisierter Übernahme definieren)
- [inx_apply_auto_rendering_atts](filter-inx-apply-auto-rendering-atts.html) (Rendering-Auto-Attribute übernehmen)

### Datenabfrage (API Wrapper)

Die folgenden Hooks sind – als Alternative zu direkten Funktionsaufrufen – für die **Abfrage oder Generierung** von Kickstart-spezifischen Daten vorgesehen (z. B. in Add-ons).

#### Allgemein

- [inx_get_query_var_value](filter-inx-get-query-var-value.html) (Werte beliebiger Query-Variablen abrufen)

#### Immobilien

- [inx_current_property_post_id](filter-inx-current-property-post-id.html) (aktuelle Immobilien-Beitrags-ID ermitteln)
- [inx_get_properties](filter-inx-get-properties.html) (Immobilienbeiträge abrufen oder Anzahl ermitteln)
- [inx_get_property_images](filter-inx-get-property-images.html) (Galerie-Bildanhänge einer Immobilie abrufen)
- [inx_get_property_detail_item](filter-inx-get-property-detail-item.html) (Detail-Element einer Immobilie abrufen)

## Actions

### Rendering

- [inx_render_property_map](action-inx-render-property-map.html) (Immobilien-Standortkarte)
- [inx_render_property_search_form](action-inx-render-property-search-form.html) (Immobilien-Suchformular)
- [inx_render_property_search_form_element](action-inx-render-property-search-form-element.html) (Suchformular-Element)
- [inx_render_property_list](action-inx-render-property-list.html) (Immobilien-Listenansicht)
- [inx_render_pagination](action-inx-render-pagination.html) (Seitennavigation der Listenansicht)
- [inx_render_property_filters_sort](action-inx-render-property-filters-sort.html) (Element zur Auswahl der Sortierung)
- [inx_render_property_contents](action-inx-render-property-contents.html) (Immobilien-Details)