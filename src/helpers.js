export const isSentenceValid = (sentence) =>
  sentence.sentence !== undefined && sentence.translations !== undefined && sentence.translations.german !== undefined  

export const parseTranslationsArrayToString = (translations) => {
  return translations
  .reduce((acc, curr, index) => {
    if(index) return `${acc}, ${curr}`
    else return curr
  }, '')
}
