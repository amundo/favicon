class DisplayEmoji extends HTMLElement {
  #emoji = null

  constructor(){
    super()

    this.innerHTML = `
     <h2 class="emoji"></h2>
     <p class="description"></p>
    `
  }

  async fetch(url){
    let response = await fetch(url)
    let data = await response.json()
    this.data = data
  }

  set data(emojiData){
    this.#emoji = emojiData
    this.render()
  }

  get data(){
    return this.#emoji
  }

  render(){
    let { emoji, description } = this.data
    this.querySelector('.emoji').textContent = emoji
    this.querySelector('.description').textContent = description
  }

  addEventListeners(){
  }
}

export {DisplayEmoji}
customElements.define('display-emoji', DisplayEmoji)
