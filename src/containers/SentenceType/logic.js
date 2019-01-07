import { isSentenceValid } from '../../helpers';

export const shuffle = (words, offset = 0) => {
  for(let i = words.length - 1; i >= offset; i--) {
    let pos = Math.floor(Math.random() * (i + 1));
    let curr = words[pos];
    words[pos] = words[i];
    words[i] = curr;
  }
  return words; 
}

const multiplyByReveals = (sentences) => {
  const multipliedBySentences = [];
  sentences.forEach((sentence) => {
    const revealsUsageRate = sentence.revealsUsageRate || 0;
    for(let i = 0; i < revealsUsageRate + 1; i++) {
      multipliedBySentences.push({ 
        sentence: sentence.sentence,
        translations: sentence.translations.german,
        revealsUsageRate
      })
    }  
  });
  return multipliedBySentences;
}

export const increaseRevealsRate = (sentecesList, pos) => {
  sentecesList[pos].revealsUsageRate += 2;
  return sentecesList;
}
export const decreaseRevealsRate = (sentecesList, pos) => {
  sentecesList[pos].revealsUsageRate--;
  return sentecesList;
}

export const sentencesListAdapater = (sentences) => {
  const filteredUndefined = sentences.filter((sentence) => isSentenceValid(sentence));
  return shuffle(multiplyByReveals(filteredUndefined));
}
