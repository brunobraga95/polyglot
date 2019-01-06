const firebase = require("firebase");
require("firebase/firestore");

firebase.initializeApp({
  apiKey: process.env.REACT_APP_PAPI_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET_NAME,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
});
  
  // Initialize Cloud Firestore through Firebase
let firestoreDB = firebase.firestore();
  
  // Disable deprecated features
firestoreDB.settings({
  timestampsInSnapshots: true
});

export default firestoreDB;