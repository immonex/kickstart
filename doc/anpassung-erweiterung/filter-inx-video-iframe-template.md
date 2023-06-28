# inx_video_iframe_template (Filter)

Mit diesem Filter kann die Vorlage für die Einbindung **externer Videos** (YouTube, Vimeo) per iFrame **dynamisch** (unmittelbar vor dem Rendering) angepasst werden.

## Parameter

| Name | Beschreibung |
| ---- | ------------ |
| `$template` (string) | iFrame-HTML-Code |
| `$video` (array) | Daten des einzubindenden Videos mit folgenden Elementen, die per Platzhalter `{type}`, `{id}`, `{url}`, `{autoplay}`, `{automute}`, `{youtube_domain}` und `{youtube_allow}` in den Template-String übernommen werden können. Die entsprechenden Werte können (optional) in Form von [elementbezogenen Attributen](/komponenten/detailansicht?id=video) (Element `video`) oder per Filterfunktion ([inx_detail_page_elements](filter-inx-detail-page-elements?id=template-gallery-und-video)) angepasst werden. |
| | `type` → Videoplattform-Anbieter: *youtube* oder *vimeo* |
| | `id` → anbieterspezifische Video-ID |
| | `url` → Video-URL |
| | `autoplay` → YouTube-Video automatisch starten: *false* (Standard) oder *true*) |
| | `automute` → YouTube-Video automatisch stummschalten: *true* (Standard) oder *false* |
| | `youtube_allow` → Inhalte des `allow`-Attributs für YouTube-iFrames (Standard: *accelerometer; encrypted-media; gyroscope*), zusätzlich *autoplay* sofern aktiviert |
| | `youtube_domain` → YouTube-Domain: *www.youtube-nocookie.com* (Standard) oder *www.youtube.com* |

### Standard-Template-Code für YouTube-Videos

```php
<iframe
	src="https://{youtube_domain}/embed/{id}"
	frameborder="0"
	allowfullscreen
	allow="{youtube_allow}"
	class="inx-video-iframe"
	uk-video="autoplay: {autoplay}; automute: {automute}"
>
</iframe>
```

### Video-Array-Beispiel

```php
[
	'type' => 'youtube'
	'id' => 'ohebUlIApso'
	'url' => 'https://www.youtube-nocookie.com/watch?v=ohebUlIApso',
	'autoplay' => 0,
	'automute' => 1,
	'youtube_domain' = 'www.youtube-nocookie.com',
	'youtube_allow' => 'accelerometer; encrypted-media; gyroscope'
]
```

## Rückgabewert

angepasster Template-String

## Rahmenfunktion

Eine Funktion zur Nutzung des Filters wird typischerweise in der folgenden Form in der Datei **functions.php** des **Child-Themes** oder per Code-Snippets-Plugin eingebunden.

```php
add_filter( 'inx_video_iframe_template', 'mysite_modify_video_iframe_template', 10, 2 );

function mysite_modify_video_iframe_template( $template, $video ) {
	// ...Template-String anpassen...

	return $template;
} // mysite_modify_video_iframe_template

```