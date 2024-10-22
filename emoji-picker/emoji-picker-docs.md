---
lang: en
title:  \<emoji-picker\> docs
css: emoji-picker.css
---

<main>

This component provides an interface for selecting an emoji by name or category.

It makes use of the subcomponent `<search-emojis>`. 


## Example


```html
<emoji-picker></emoji-picker>
```

```{=html}
<emoji-picker></emoji-picker>
```

## Attributes



## Methods



## Data



## Events

### Dispatched

* `emoji-selected` - when an emoji is selected
  * `detail` - the emoji object


### Listened for

* `emoji-search-results` - when search results are received
  * `detail` - the search results, an array of emoji objects

## Layouts



## See also

</main>


<script type="module">
import {EmojiPicker} from './EmojiPicker.js'

window.emojiPicker = document.querySelector('emoji-picker')
</script>

