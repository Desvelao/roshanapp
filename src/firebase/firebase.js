import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyDQEE44sfB5HfouF9Bi29EEcahWWZt7pqE",
  authDomain: "roshan-bot.firebaseapp.com",
  databaseURL: "https://roshan-bot.firebaseio.com",
  projectId: "roshan-bot",
  storageBucket: "roshan-bot.appspot.com",
  messagingSenderId: "621962858147"
};

firebase.initializeApp(config);

const auth = firebase.auth()
const db = firebase.database();
export { auth , db }
