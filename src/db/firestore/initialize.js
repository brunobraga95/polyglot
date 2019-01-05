const firebase = require("firebase");
require("firebase/firestore");

firebase.initializeApp({
  ...
});
  
  // Initialize Cloud Firestore through Firebase
let firestoreDB = firebase.firestore();
  
  // Disable deprecated features
firestoreDB.settings({
  timestampsInSnapshots: true
});

export default firestoreDB;