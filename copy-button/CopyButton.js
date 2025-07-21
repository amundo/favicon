class CopyButton extends HTMLElement {
  constructor() {
    super()
    this.addEventListeners()
  }

  notifyCopied() {
    let span = document.createElement("span")
    span.innerText = "Copied!"
    span.style.position = "absolute"
    span.style.top = "-1em"
    span.style.left = "1em"
    span.style.color = "white"
    span.style.backgroundColor = "black"
    span.style.padding = "0.5em"
    this.appendChild(span)
    setTimeout(() => {
      span.remove()
    }, 1000)
  }

  addEventListeners() {
    this.addEventListener("click", (clickEvent) => {
      let button = clickEvent.target
      let text
      if (button.dataset.text) {
        text = button.dataset.text
      } else {
        text = this.textContent
      }

      navigator.clipboard.writeText(text)
        .then(() => {
          this.notifyCopied()
        })
    })
  }
}

customElements.define("copy-button", CopyButton)
export { CopyButton }
