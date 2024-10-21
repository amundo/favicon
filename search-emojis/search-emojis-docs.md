---
lang: en
title:  \<search-emojis\> docs
css: search-emojis.css
---

<main>


This component allows the user to search for emojis by name. <strike>It also allows the user to filter the emojis by category.</strike>

It does not display the emojis, it only provides a search field which controls the search and filter functionality. It dispatches an event with the search results, which can be listened for by another component that displays the emojis. Thus, a variety of components can be used to display the emojis.

The `emojis.json` file is included in this component. It contains an array of emoji objects, each with a `name` and `category` property. This file is used to search and filter the emojis. 

You can see it the data here:

[emojis.json](emojis.json)

I used the data file from GitHub’s [gemoji](https://github.com/github/gemoji) project. Check out the data file [here](https://github.com/github/gemoji/blob/master/db/emoji.json).

## Example

The small script below listens for the `emoji-search-results` event and displays the search results in a `<pre>` element.

```html
<search-emojis id=demo></search-emojis>

<pre id=data placeholder="Search data will be logged here…"></pre>

<script>
addEventListener('emoji-search-results', e => {
  let searchResults = e.detail
  let pre = document.querySelector('#data')
  pre.textContent = JSON.stringify(searchResults, null, 2)
})
</script>
```

```{=html}
<search-emojis id=demo></search-emojis>
<pre id=data class=code-sample>
</pre>
<script>
addEventListener('emoji-search-results', e => {
  let searchResults = e.detail
  let pre = document.querySelector('#data')
  pre.textContent = JSON.stringify(searchResults, null, 2)
})
</script>
```


## Methods

* `search(query)` - search for emojis by name
  * `query` - the search query, a string


Note that 

## Data

* `.data` - an array of emoji objects
  * `name` - the name of the emoji
  * `category` - the category of the emoji


## Events

### Dispatched

* `emoji-search-results` - when search results are received
  * `detail` - the search results, an array of emoji objects

## Todo

* Perhaps refactor as a more general character search component, with a `characters.json` file that contains all characters, not just emojis. This would allow the component to be used for searching for any character, not just emojis. The `characters.json` file could be generated from the Unicode character database.
* Add support for quoted search terms, so that the user can search for an exact phrase or word, e.g. `"smiling face with hearts"` or `"smiling"`.

</main>


<script type="module">
import {SearchEmojis} from './SearchEmojis.js'

window.searchEmojis = document.querySelector('search-emojis')
</script>


## See also

* [emoji-picker](../emoji-picker/emoji-picker-docs.html) component, which implements a basic search interface with results and selection capability.