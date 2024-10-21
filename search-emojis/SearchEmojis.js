import { searchEmojis } from "./search-emojis.js"

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
      let url = new URL('../emojis.json', import.meta.url)
      let response = await fetch(url)
      let emojis = await response.json()
      this.data = emojis
    } catch (error) {
      console.error(error)
    }
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    if (attribute == "src") {
      this.fetch(newValue)
    }
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

  async search(query) {
    return await searchEmojis(query)
  }

  addEventListeners() {
    this.addEventListener('submit', async submitEvent => {
      submitEvent.preventDefault()
      let query = submitEvent.target.querySelector('input').value
      if (!query) {
        return
      }
      let matchingEmojis = await this.search(query)
      this.dispatchEvent(new CustomEvent('emoji-search-results', {
        detail: matchingEmojis,
        bubbles: true
      }))
    })
  }
}

export { SearchEmojis }
customElements.define('search-emojis', SearchEmojis)
