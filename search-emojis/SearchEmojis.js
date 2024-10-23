class SearchEmojis extends HTMLElement {
  #emojis = []
  constructor() {
    super()
    this.innerHTML = `<form>
      <input disabled placeholder="Search emojis" name="search-emojis-query-input" type="text" />
      <button type="submit">Search</button>
    </form>
    <ul class=matching-emojis></ul>
    `
    this.fetch()
    this.addEventListeners()
  }

  async fetch() {
    try {
      let url = new URL("./emojis.json", import.meta.url)
      let response = await fetch(url)
      let emojis = await response.json()
      this.data = emojis
      this.emojisByCharacter = this.cacheByCharacter(emojis)

      this.dispatchEvent(
        new CustomEvent("emojis-loaded", {
          detail: emojis,
          bubbles: true,
        }),
      )
    } catch (error) {
      console.error(error)
    }
  }

  cacheByCharacter(emojis) {
    return emojis.reduce((byCharacter, emoji) => {
      byCharacter[emoji.emoji] = emoji
      return byCharacter
    }, {})
  }

  lookupEmoji(character) {
    return this.emojisByCharacter[character]
  }

  set data(emojis) {
    this.#emojis = emojis
    this.enableInput()
  }

  get data() {
    return this.#emojis
  }

  enableInput() {
    this.querySelector("input").removeAttribute("disabled")
  }

  search(query) {
    const terms = query
      .split(" ")
      .map((queryTerm) => queryTerm.trim())
      .filter((queryTerm) => queryTerm.length > 0)

    return this.#emojis.filter((emoji) =>
      terms.every((queryTerm) =>
        [emoji.description, ...emoji.aliases, ...emoji.tags].some((value) =>
          value.toLowerCase().includes(queryTerm.toLowerCase())
        )
      )
    )
  }

  runQuery() {
    let query = this.querySelector("input[name=search-emojis-query-input]").value
    if (!query) {
      return
    }
    let matchingEmojis = this.search(query)
    this.dispatchEvent(
      new CustomEvent("emoji-search-results", {
        detail: matchingEmojis,
        bubbles: true,
      }),
    )

  }

  addEventListeners() {
    this.addEventListener("submit", submitEvent => {
      submitEvent.preventDefault()
      this.runQuery()
    })

    this.addEventListener('keyup', keyupEvent  => {
      if(keyupEvent.target.matches('input[name=search-emojis-query-input]')) {
          this.runQuery()
      }
    })
  }
}

export { SearchEmojis }
customElements.define("search-emojis", SearchEmojis)
