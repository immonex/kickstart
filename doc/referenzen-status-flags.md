# Referenzobjekte

Erfolgreich vermarktete Immobilien können entweder automatisiert beim [Import](schnellstart/import) oder manuell im WordPress-Backend (***immonex → Immobilien***) als Referenzobjekt markiert werden (Wert *1* im Custom Field `_immonex_is_reference`). Beim Import erfolgt die Kennzeichnung anhand einer in der *Mapping-Tabelle* hinterlegten Zuordnung.

!> Referenzobjekte werden in [Immobilien-Listen](komponenten/liste) nur dann angezeigt, wenn entweder das [Shortcode-Attribut](komponenten/liste#custom-field-basiert) `references="yes"` bzw. `references="only"` oder der entsprechende [GET-Parameter](schnellstart/einbindung#globale-abfrage-parameter) `?inx-references=yes` bzw. `?inx-references=only` in der URL der Übersichtsseite vorhanden ist. (Hierbei stehen *yes* für "Referenzobjekte **auch** anzeigen" und *only* für "**nur** Referenzobjekte anzeigen".)

![Immobilienliste im WordPress-Backend](assets/scst-be-property-list.gif)

## Gruppierung

Wohn- oder Gewerbeeinheiten, die zu einer übergeordneten Immobilie gehören (z. B. Wohnanlage) können anhand einer gemeinsamen **Gruppenkennung** zusammengefasst werden. Diese wird beim [OpenImmo-Import](schnellstart/import) als Term (**Name**) der [Projekt-Taxonomie](beitragsarten-taxonomien) (`inx_project`) gespeichert.

### Master-Objekte

Die übergeordneten Haupt- bzw. Elternobjekte werden im OpenImmo-Jargon als *Master-Objekte* bezeichnet. Die Bezeichnung der Master-Objekte wird wiederum als **Beschreibung** des zugehörigen Gruppenkennungs-Terms importiert und kann so bspw. in einer Select-Auswahlbox des [Immobilien-Suchformulars](komponenten/suchformular) verwendet werden.

Unabhängig davon sieht der OpenImmo-XML-Standard pro Master-Objekt die Angabe vor, ob dieses als reguläres Immobilien-Angebot in der Ziel-Website sichtbar sein soll oder nicht. Ist das nicht der Fall, erhält der *Immobilien-Beitrag* des betreffenden Objekts beim Import den Status *ausstehend* und kann demnach im Frontend nicht abgefragt bzw. dargestellt werden.

Sichtbare Master-Objekte werden in [Immobilienlisten](komponenten/liste) grundsätzlich mit angezeigt, können aber per [Shortcode-Attribut](komponenten/liste#custom-field-basiert) `masters="no"` oder [GET-Parameter](schnellstart/einbindung#globale-abfrage-parameter) `?inx-masters=no` ausgeblendet werden. Umgekehrt kann die Ausgabe mit `masters="only"` oder `?inx-masters=only` aber auch explizit auf Master-Objekte beschränkt werden.

## Weitere Status-Flags

Neben der Kennzeichnung als Referenzobjekt werden beim Import pro Objekt noch weitere *Status-Flags* gespeichert, die bei der [Listenausgabe](komponenten/liste) mit berücksichtigt werden können:

| Bezeichnung | Custom Field | [Shortcode-Attribut](komponenten/liste#custom-field-basiert) | [GET-Parameter](schnellstart/einbindung#globale-abfrage-parameter) |
| ----------- | ------------ | -------------------------- | ------------- |
| verfügbar | `_immonex_is_available` | `available` | `inx-available` |
| reserviert | `_immonex_is_reserved` | `reserved` | `inx-reserved` |
| verkauft/vermietet | `_immonex_is_sold` | `sold` | `inx-sold` |

Der in den Custom Fields hinterlegte Wert ist immer *1* (ja) oder *0* (nein), Shortcode-Attribute und GET-Parameter können mit den Angaben *yes* oder *no* gefüttert werden.

Objekte werden beim Import immer dann als *verfügbar* gekennzeichnet, wenn sie **nicht** als reserviert, verkauft oder Referenzobjekt übermittelt wurden.