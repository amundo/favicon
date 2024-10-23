class CopyTextarea extends HTMLElement {
  constructor() {
    super()
    this.innerHTML = `
      <textarea class=copy-textarea-textarea></textarea>
      <button class=copy-textarea-button>Copy</button>
      <div class=status-message></div>
    `
    this.addEventListeners()
  }

  get value() {
    return this.querySelector("textarea").value
  }

  set value(value) {
    this.querySelector("textarea").value = value
  }

  set status(message) {
    this.querySelector(".status-message").textContent = message
  }

  notifyCopied() {
    this.status = "Copied!"
    setTimeout(() => {
      this.status = ""
    }, 1000)
  }

  addEventListeners() {
    this.addEventListener("click", (clickEvent) => {
      if (clickEvent.target.matches(".copy-textarea-button")) {
        let text = this.querySelector("textarea").value
        navigator.clipboard.writeText(text)
          .then(() => {
            this.notifyCopied()
          })
      }
    })
  }
}

export { CopyTextarea }
customElements.define("copy-textarea", CopyTextarea)
