import { isArray } from "util";

const normalizeWord = (word) => word.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace("ß", "ss").toLowerCase();

export const normalizeWords = (words) => { 
  if(isArray(words)) {
    return words.map((word) => normalizeWord(word));
  } else return normalizeWord(words);
}
