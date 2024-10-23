import { EmojiPicker } from "../emoji-picker/EmojiPicker.js"
import { CopyTextarea } from "../copy-textarea/CopyTextarea.js"
import { DisplayEmoji } from "../display-emoji/DisplayEmoji.js"

class EmojiFaviconGenerator extends HTMLElement {
  constructor() {
    super()
    this.innerHTML = `
      <emoji-picker></emoji-picker>
      <display-emoji></display-emoji>
      <copy-textarea></copy-textarea>
    `

    this.addEventListeners()
  }

  connectedCallback() {
    this.querySelector("form").addEventListener("submit", (event) => {
      event.preventDefault()
      this.generateLink()
    })
  }

  addEventListeners() {
    this.addEventListener("emoji-selected", (emojiSelectedEvent) => {
      let selectedEmoji = emojiSelectedEvent.detail
      this.querySelector("display-emoji").data = selectedEmoji
      this.generateLink(selectedEmoji)
    })
  }

  generateLink(emojiData) {
    let linkRel = document.head.querySelector('link[rel="icon"]')
    if (!linkRel) {
      linkRel = document.createElement("link")
      linkRel.rel = "icon"
      document.head.appendChild(linkRel)
    }

    if (emojiData) {
      let { emoji, description } = emojiData
      const svgData =
        `<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 16 16'><text x='0' y='14'>${emoji}</text></svg>`
      const encodedData = encodeURIComponent(svgData)
      const linkTag =
        `<link rel="icon" href="data:image/svg+xml,${encodedData}" />`
      linkRel.outerHTML = linkTag
      this.querySelector("copy-textarea").value = linkTag
    } else {
      // this.querySelector('.encoded-html').value = ''
    }
  }
}

customElements.define("emoji-favicon-generator", EmojiFaviconGenerator)
export { EmojiFaviconGenerator }
