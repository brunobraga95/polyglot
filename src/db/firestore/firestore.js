import firestoreDB from './initialize';

export const getSentencesList = (language = "german") => {
  return firestoreDB.collection("users/brunobraga/sentences/").get();
}

export const updateVocabulary = (data) => firestoreDB.collection("users/brunobraga/sentences/").doc(data.sentence).set(data.value, { merge: true });

export const updateRevealsUsage = (sentence, revealsUsageRate) =>
  firestoreDB.collection("users/brunobraga/sentences/").doc(sentence).set({ revealsUsageRate }, { merge: true });