import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const clientCredentials = {
  apiKey: "AIzaSyAYpyMNoEYkjIg_b_jxOpz4lGS_K5bE8zE",
  authDomain: "splinter-lands-farming-bot.firebaseapp.com",
  projectId: "splinter-lands-farming-bot",
  storageBucket: "splinter-lands-farming-bot.appspot.com",
  messagingSenderId: "1013134579292",
  appId: "1:1013134579292:web:5cdb140cc4cc0edd41f899"
}

export default function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(clientCredentials)
    console.log('initialized firebase')
  } else {
    console.log('firebase already initialized')
  }

}