let search =  (emojis, query) => emojis.filter((emoji) =>
  query.every((queryTerm) =>
    [emoji.description, ...emoji.aliases, ...emoji.tags].some((value) =>
      value.toLowerCase().includes(queryTerm.toLowerCase())
    )
  )
)

class EmojiSearcher {
  constructor() {
    this.emojis = null
  }

  async fetchEmojis() {
    if (!this.emojis) {
      try {
        let url = new URL("../emojis.json", import.meta.url)
        const response = await fetch(url)
        this.emojis = await response.json()
      } catch (error) {
        console.error("Failed to fetch emojis:", error)
      }
    }
  }

  async search(query) {
    if (!this.emojis) {
      await this.fetchEmojis()
    }

    let queryTerms
    
    if (!Array.isArray(query)) {
      query = query
        .split(" ")
        .map((queryTerm) => queryTerm.trim())
        .filter((queryTerm) => queryTerm.length > 0)
    }

    return search(this.emojis, queryTerms)
  }
}

let emojiSearcher = new EmojiSearcher()

let searchEmojis = (query) => {
  return emojiSearcher.search(query)
}

export { searchEmojis }
