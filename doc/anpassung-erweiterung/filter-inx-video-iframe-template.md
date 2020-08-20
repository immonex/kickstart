---
title: Template für die Einbindung von Video-iFrames (Filter)
search: 1
---

# inx_video_iframe_template (Filter)

Mit diesem Filter kann die Vorlage für die Einbindung **externer Videos** (YouTube, Vimeo) per iFrame **dynamisch** (unmittelbar vor dem Rendering) angepasst werden.

## Parameter

| Name | Beschreibung |
| ---- | ------------ |
| `$template` | iFrame-HTML-Code |
| `$video` | Daten des einzubindenden Videos als Array mit folgenden Elementen, die per Platzhalter `{type}`, `{id}` und `{url}` in den Template-String übernommen werden können: |
| | `type` (Videoplattform-Anbieter): *youtube* oder *vimeo* |
| | `id` (anbieterspezifische Video-ID) |
| | `url` (Video-URL) |

### Standard-Template-Code für YouTube-Videos

```php
<iframe
	src="https://www.youtube.com/embed/{id}?autoplay=0&amp;showinfo=0&amp;rel=0&amp;modestbranding=1&amp;playsinline=1"
	frameborder="0"
	allowfullscreen
	allow="autoplay; encrypted-media"
	class="inx-video-iframe"
	uk-responsive uk-video="automute: true"
>
</iframe>
```

### Video-Array-Beispiel

```php
[
	'type' => 'youtube'
	'id' => 'ohebUlIApso'
	'url' => 'https://www.youtube.com/watch?v=ohebUlIApso'
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