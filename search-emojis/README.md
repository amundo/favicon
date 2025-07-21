---
title: Update emoji data sources
author: Patrick Hall
---


## Sources

This repo downloads two sources of data on emoji and merges them into a single `emoji.json` data file. The three sources are:

### amio/emoji.json

This repo imports data from:

<https://unicode.org/Public/emoji/15.1/emoji-test.txt>

I have slightly converted the module to use Deno instead of node.js. Unlike the original, I also scrape the Unicode version. I’ve also imported version 16.0 of the emoji data.

<https://raw.githubusercontent.com/amio/emoji.json/refs/heads/master/scripts/gen.js>

The rewritten version is in this repo as:

`gen-emoji-test.js`

The output file is `emoji-test.json`.

It is primarily useful because it includes `group` and  `subgroup` fields. It also contains the version of Unicode in which the emoji was introduced. (This can be useful to see recent additions.)

Data looks like:

```json
{
  "codes": "1F42B",
  "char": "🐫",
  "name": "two-hump camel",
  "category": "Animals & Nature (animal-mammal)",
  "group": "Animals & Nature",
  "subgroup": "animal-mammal"
}
```

### `gemoji`

 GitHub repo with “character information about native emojis”.

 The raw file is here:

<https://raw.githubusercontent.com/github/gemoji/master/db/emoji.json>


 Data looks like:

 ```json
{
  "emoji": "🐫",
  "description": "two-hump camel",
  "category": "Animals & Nature",
  "aliases": [
    "camel"
  ],
  "tags": [],
  "unicode_version": "6.0",
  "ios_version": "6.0"
}
```

Note that there are many emojis in this source that do not have tags. I believe the `alias` values are used as shortcodes in GitHub issues and comments.

### CLDR emoji annotations

Unicode Consortium’s Common Locale Data Repository (CLDR) emoji annotations. These include useful tags (keyed as `default`) and names (keyed `tts`):

There is a convenient JSON version of the data at:

<https://raw.githubusercontent.com/unicode-org/cldr-json/refs/heads/main/cldr-json/cldr-annotations-full/annotations/en/annotations.json>

The data looks like:

```json

"🐫": {
  "default": [
    "animal",
    "bactrian",
    "camel",
    "desert",
    "hump",
    "two",
    "two-hump"
  ],
  "tts": [
    "two-hump camel"
  ]
}
```

I found the `default` and `tts` keys to be rathera nnoying, so I renamed them to the more intuitive (to me, anyway) `tags` and `name`:

```json
  {
    "emoji": "🐫",
    "name": "two-hump camel",
    "tags": [
      "animal",
      "bactrian",
      "camel",
      "desert",
      "hump",
      "two",
      "two-hump"
    ]
  },
```


## Merged Data

The scripts in this repo download, normalize, and merge those sources into a unified format that looks like:



{
  "codes": "1F42B",
  "char": "🐫",
  "name": "two-hump camel",
  "category": "Animals & Nature (animal-mammal)",
  "group": "Animals & Nature",
  "subgroup": "animal-mammal"
}
{
  "emoji": "🐫",
  "description": "two-hump camel",
  "category": "Animals & Nature",
  "aliases": [ "camel" ],
  "tags": [],
  "unicode_version": "6.0",
  "ios_version": "6.0"
}
{
  "emoji": "🐫",
  "name": "two-hump camel",
  "tags": [ "animal", "bactrian", "camel", "desert", "hump", "two", "two-hump" ]
}
```

## my projects

* /Users/patrickhall/Sites/emoji/emoji-search
* /Users/patrickhall/Sites/emoji/favicon/search-emojis
