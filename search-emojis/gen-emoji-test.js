import { join, dirname } from "@std/path"

const EMOJI_VERSION = "16.0";


async function getTestFile() {
  const url = `https://unicode.org/Public/emoji/${EMOJI_VERSION}/emoji-test.txt`;

  console.log(`Fetch emoji-test.txt (v${EMOJI_VERSION})`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }

  const text = await response.text();
  console.log("Fetch complete\n");
  return text;
}

function parseLine(line) {
  const data = line.trim().split(/\s+[;#] /);

  if (data.length !== 3) {
    return null;
  }

  const [codes, status, charAndName] = data;
  const [, emoji, unicodeVersion, name] = charAndName.match(/^(\S+) (E\d+\.\d+) (.+)$/);

  return { codes, emoji, unicodeVersion, name };
} 

async function main() {
  const text = await getTestFile(EMOJI_VERSION);

  console.log(`Format text to json...`);
  const collected = text.trim().split("\n").reduce((emojiData, line) => {
    if (line.startsWith("# group: ")) {
      // console.log(`  Processing ${line.slice(9)}...`);
      emojiData.group = line.slice(9);
    } else if (line.startsWith("# subgroup: ")) {
      emojiData.subgroup = line.slice(12);
    } else if (line.startsWith("#")) {
      emojiData.comments = emojiData.comments + line + "\n";
    } else {
      const meta = parseLine(line);
      if (meta) {
        meta.group = emojiData.group;
        meta.subgroup = emojiData.subgroup;
        emojiData.full.push(meta);
      } else {
        emojiData.comments = emojiData.comments.trim() + "\n\n";
      }
    }
    return emojiData;
  }, { comments: "", full: [] });


  console.log("Write file: emoji-test.json\n");
  await Deno.writeTextFile("./emoji-test.json", JSON.stringify(collected.full, null, 2));

  // console.log(collected.comments);
}

main();
