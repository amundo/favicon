class SearchEmojis extends HTMLElement {
  #emojis = [] 
  constructor() {
    super()
    this.innerHTML = `<form>
      <input disabled placeholder="Search emojis" type="text" />
      <button type="submit">Search</button>
    </form>
    <ul class=matching-emojis></ul>
    `
    this.fetch()
    this.addEventListeners()
  }

  async fetch() {
    try {
      let url = new URL('./emojis.json', import.meta.url)
      let response = await fetch(url)
      let emojis = await response.json()
      this.data = emojis
      this.emojisByCharacter = this.cacheByCharacter(emojis)
      
      this.dispatchEvent(new CustomEvent('emojis-loaded', { 
          detail: emojis,
          bubbles: true
        })
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

  lookupEmoji(character){
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
    this.querySelector('input').removeAttribute('disabled')
  }

  search(query) {
    const terms = query
      .split(' ')
      .map(queryTerm => queryTerm.trim())
      .filter(queryTerm => queryTerm.length > 0)

    return this.#emojis.filter(emoji => 
      terms.every(queryTerm =>
        [emoji.description, ...emoji.aliases, ...emoji.tags].some(value => 
          value.toLowerCase().includes(queryTerm.toLowerCase())
        )
      )
    )
  }

  addEventListeners() {
    this.addEventListener('submit', submitEvent => {
      submitEvent.preventDefault()
      let query = submitEvent.target.querySelector('input').value
      if (!query) {
        return
      }
      let matchingEmojis = this.search(query)
      this.dispatchEvent(new CustomEvent('emoji-search-results', {
        detail: matchingEmojis,
        bubbles: true
      }))
    })
  }
}

export { SearchEmojis }
customElements.define('search-emojis', SearchEmojis)
