export const adaptToFirestore = (sentence, translations) => {
  return {
    sentence,
    value: {
      german: translations,
      revealsUsed: 0
    }
  }
}

export const isInputValid = (sentence) =>
  sentence !== "" &&
  sentence !== undefined