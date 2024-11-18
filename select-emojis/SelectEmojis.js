import {EmojiPicker} from '../emoji-picker/EmojiPicker.js'

class SelectEmojis extends HTMLElement {
  #emojis = []

  constructor(){
    super()
    this.addEventListeners()
  }

  connectedCallback(){
    this.innerHTML = `
    <emoji-picker></emoji-picker>
    <section class=selected-emojis>
      <button class=copy-emojis>Copy</button>
      <p class=copy-status></p>
      <textarea></textarea>
    </section>
    `
  } 

  render(){
    if (!this.#emojis || !Array.isArray(this.#emojis)) return;
    this.querySelector('textarea').value = ``
    this.#emojis.forEach(emoji => {
      this.querySelector('textarea').value += `${emoji.emoji}`
    })
  }

  get data(){
    return this.#emojis
  }

  set data(emojis){
    this.#emojis = emojis
    this.render()
  }

  clear(){
    this.#emojis = []
    this.querySelector('textarea').value = ''
  }

  copy(){
    this.querySelector('textarea').select()
    navigator.clipboard.writeText(this.querySelector('textarea').value)
      .then(() => {
        this.querySelector('.copy-status').textContent = 'Copied!'
        setTimeout(() => {
          this.querySelector('.copy-status').textContent = ''
        }, 3000)
      })
  }

  addEventListeners(){
    this.addEventListener('emoji-selected', emojiSelectedEvent => {
      let emoji = emojiSelectedEvent.detail
      this.#emojis.push(emoji)
      this.render()
    })

    this.addEventListener("click", clickEvent => {

      if(clickEvent.target.matches('.copy-emojis')){
        this.copy()
      }
    })
  }
  
}

export {SelectEmojis}
customElements.define('select-emojis', SelectEmojis)
