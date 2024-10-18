import { SearchEmojis } from '../search-emojis/SearchEmojis.js'

class EmojiFaviconGenerator extends HTMLElement {
  #emoji = '';

  constructor() {
    super();
    this.innerHTML = `
      <search-emojis></search-emojis>
      <div class="matching-emoji-panel">
        <ul class="matching-emojis-ul"></ul>
      </div>
      <form class="generate-favicon-form">
        <input type="text" id="emoji-input" placeholder="Enter emoji" />
        <button type="submit-favicon">Generate Favicon</button>
      </form>
      <div>
        <pre class="encoded-html"></pre>
        <button class="copy-link-html">Copy link HTML</button>
      </div>
    `

    this.addEventListeners()
  }

  connectedCallback() {
    this.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();
      this.generateLink();
    });
  }

  addEventListeners() {
    this.addEventListener('emoji-search-results', event => {
      this.emojiMatches = event.detail
      this.renderMatchingEmojis(this.emojiMatches)
    })

    this.querySelector('#emoji-input').addEventListener('input', (event) => {
      this.emoji = event.target.value
    })

    this.addEventListener('click', clickEvent => {
      if(clickEvent.target.matches('.matching-emoji-button')){
        this.emoji = clickEvent.target.textContent
      }

      if(clickEvent.target.matches('.copy-link-html')){
        let encodedHtml = this.querySelector('.encoded-html').textContent
        navigator.clipboard.writeText(encodedHtml)
      }
    })

    this.addEventListener("submit", submitEvent => {
      if(submitEvent.target.matches('form.generate-favicon-form')){
        submitEvent.preventDefault()
        this.generateLink()
      }
    })

    this.addEventListener('paste', pasteEvent => {
      let clipboardData = pasteEvent.clipboardData
      let pastedText = clipboardData.getData('text')
      this.emoji = pastedText
    })
  }

  get emoji() {
    return this.#emoji;
  }

  set emoji(value) {
    this.#emoji = value
    this.querySelector('#emoji-input').value = value
    this.generateLink();
  }

  renderMatchingEmojis(matchingEmojis) {
    let ul = this.querySelector('ul.matching-emojis-ul');
    ul.innerHTML = '';

    matchingEmojis.forEach(emoji => {
      let li = document.createElement('li');
      let button = document.createElement('button')
      button.classList.add('matching-emoji-button')
      button.title = `${emoji.emoji} — ${emoji.description}`;
      button.textContent = emoji.emoji;
      li.appendChild(button)
      ul.appendChild(li)
    });
  }

  generateLink() {
    const emoji = this.#emoji

    let linkRel = document.head.querySelector('link[rel="icon"]')
    if(!linkRel){
      linkRel = document.createElement('link')
      linkRel.rel = 'icon'
      document.head.appendChild(linkRel)
    }

    if (emoji) {
      const svgData = `<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 16 16'><text x='0' y='14'>${emoji}</text></svg>`;
      const encodedData = encodeURIComponent(svgData);
      const linkTag = `<link rel="icon" href="data:image/svg+xml,${encodedData}" />`;
      linkRel.outerHTML = linkTag
      this.querySelector('.encoded-html').textContent = linkTag;
    } else {
      this.querySelector('.encoded-html').value = '';
    }
  }
}

customElements.define('emoji-favicon-generator', EmojiFaviconGenerator);
export {
  EmojiFaviconGenerator
}