// The Internet in One Word — make.fun entry
// The entry is exactly one word: "doomscroll".
// The whole internet, distilled: an endless feed you cannot stop
// scrolling, equal parts dread and delight, that eats your hours
// while promising you are almost informed, almost entertained,
// almost done. Every corner of it — news, memes, arguments,
// shopping, videos — runs on the same loop: one more scroll.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "doomscroll";

function selfCheck(word: string): void {
  // Exactly one word: no whitespace anywhere, no punctuation,
  // only lowercase letters, non-empty.
  if (word.length === 0) throw new Error("entry word is empty");
  if (/\s/.test(word)) throw new Error("entry word contains whitespace");
  if (!/^[a-z]+$/.test(word)) throw new Error("entry word is not a single lowercase word");
  if (word.trim() !== word) throw new Error("entry word has surrounding whitespace");
}

selfCheck(WORD);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, WORD + "\n", "utf8");

// Validation pass: re-read what was written and confirm the entry
// is still exactly one word and nothing else.
const written = readFileSync(outPath, "utf8");
const entry = written.replace(/\n$/, "");
selfCheck(entry);
if (entry !== WORD) throw new Error("written entry does not match the word");
if (written !== WORD + "\n") throw new Error("written file has unexpected content");
