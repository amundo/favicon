import { ensureFile } from "jsr:@std/fs"

// URL for the emoji reference file (from a source such as GitHub or Unicode)
const EMOJI_REFERENCE_URL =
  "https://raw.githubusercontent.com/github/gemoji/master/db/emoji.json" // Using GitHub Gemoji as a reference

interface EmojiData {
  emoji: string
  description: string
}

// Function to fetch and parse the emoji reference file
async function fetchEmojiReference(): Promise<EmojiData[]> {
  try {
    const response = await fetch(EMOJI_REFERENCE_URL)
    if (!response.ok) {
      throw new Error(`Failed to fetch emoji reference: ${response.statusText}`)
    }
    const data: any[] = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching emoji reference:", error)
    throw error
  }
}

// Main function
async function main() {
  try {
    console.log("Fetching emoji reference...")
    const emojis = await fetchEmojiReference()
    console.log("Emoji reference fetched successfully:", emojis)
    await Deno.writeTextFile("emojis.json", JSON.stringify(emojis, null, 2))
  } catch (error) {
    console.error("Process failed:", error)
  }
}

// Execute the main function
main()
