import { SearchEmojis } from "../search-emojis/SearchEmojis.js"

let groupEmojis = (emojis) => {
  return Object
    .groupBy(emojis, (emoji) => emoji.category)
}

const categories = [
  {
    "name": "Smileys & Emotion",
    "slug": "smileys-and-emotion",
    "categoryEmoji": "",
  },
  {
    "name": "People & Body",
    "slug": "people-and-body",
    "categoryEmoji": "",
  },
  {
    "name": "Animals & Nature",
    "slug": "animals-and-nature",
    "categoryEmoji": "",
  },
  {
    "name": "Food & Drink",
    "slug": "food-and-drink",
    "categoryEmoji": "",
  },
  {
    "name": "Travel & Places",
    "slug": "travel-and-places",
    "categoryEmoji": "",
  },
  {
    "name": "Activities",
    "slug": "activities",
    "categoryEmoji": "",
  },
  {
    "name": "Objects",
    "slug": "objects",
    "categoryEmoji": "",
  },
  {
    "name": "Symbols",
    "slug": "symbols",
    "categoryEmoji": "",
  },
  {
    "name": "Flags",
    "slug": "flags",
    "categoryEmoji": "",
  },
]

class EmojiPicker extends HTMLElement {
  #selectedEmoji = null

  constructor() {
    super()
    this.innerHTML = `
    <search-emojis></search-emojis>

    <!-- categories will go here --> 

    <div class="matching-emoji-panel">
      <ul class="matching-emojis-ul"></ul>
    </div>
    `
    this.addEventListeners()
  }

  connectedCallback() {
    // this.selectRandomEmoji()
    // this is the wrong place to do this
  }

  get emojis() {
    return this.querySelector("search-emojis").data
  }

  selectRandomEmoji() {
    let emojis = this.emojis
    let randomEmoji = emojis[Math.floor(Math.random() * this.emojis.length)]
    this.selectedEmoji = randomEmoji
  }

  set selectedEmoji(emoji) {
    this.#selectedEmoji = emoji
    this.dispatchEvent(
      new CustomEvent("emoji-selected", {
        bubbles: true,
        detail: emoji,
      }),
    )
  }

  get selectedEmoji() {
    return this.#selectedEmoji
  }

  renderMatchingEmojis(matchingEmojis) {
    let ul = this.querySelector("ul.matching-emojis-ul")
    ul.innerHTML = ""

    if (!matchingEmojis || matchingEmojis.length === 0) {
      matchingEmojis = this.emojis
    }

    matchingEmojis.forEach((emoji) => {
      let li = document.createElement("li")
      let button = document.createElement("button")
      button.classList.add("matching-emoji-button")
      button.title = `${emoji.emoji} — ${emoji.description}`
      button.textContent = emoji.emoji
      li.appendChild(button)
      ul.appendChild(li)
    })
  }

  render() {
    // edit .innerHTML here
  }

  addEventListeners() {
    this.addEventListener("emoji-search-results", (event) => {
      this.emojiMatches = event.detail
      this.renderMatchingEmojis(this.emojiMatches)
    })

    this.addEventListener("emojis-loaded", (emojisLoadedEvent) => {
      this.emojiMatches = emojisLoadedEvent.detail
      this.renderMatchingEmojis(this.emojiMatches)
    })

    this.addEventListener("click", (clickEvent) => {
      if (clickEvent.target.matches(".matching-emoji-button")) {
        let button = clickEvent.target
        let emojiCharacter = button.textContent
        let emoji = this.emojis.find((emoji) => emoji.emoji === emojiCharacter)
        this.selectedEmoji = emoji
      }
    })
  }
}

export { EmojiPicker }
customElements.define("emoji-picker", EmojiPicker)
