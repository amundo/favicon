import { searchEmojis } from "./search-emojis.js"
import { CopyButton } from "../copy-button/CopyButton.js"
window.searchEmojis
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
      let response = await fetch("../emojis.json")
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
    this.render()
  }

  get data() {
    return this.#emojis
  }

  render() {
    this.querySelector("input").removeAttribute("disabled")
  }

  async search(query) {
    return await searchEmojis(query)
  }

  renderMatchingEmojis(matchingEmojis) {
    let ul = this.querySelector("ul")
    ul.innerHTML = ``

    matchingEmojis.forEach((emoji) => {
      let li = document.createElement("li")
      let copyButton = new CopyButton()
      copyButton.title = `${emoji.emoji} — ${emoji.description}`
      copyButton.textContent = emoji.emoji
      li.appendChild(copyButton)
      ul.appendChild(li)
    })
  }

  addEventListeners() {
    this.addEventListener("submit", async (submitEvent) => {
      submitEvent.preventDefault()
      let query = submitEvent.target.querySelector("input").value
      if (!query) {
        return
      }
      let matchingEmojis = await this.search(query)
      this.renderMatchingEmojis(matchingEmojis)
    })
  }
}

export { SearchEmojis }
customElements.define("search-emojis", SearchEmojis)
