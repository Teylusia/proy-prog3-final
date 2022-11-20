import app from 'firebase/app'
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBPauQNG1qeCLetzwd-PIub_xphbDcDaGw",
  authDomain: "proy-prog3-final.firebaseapp.com",
  projectId: "proy-prog3-final",
  storageBucket: "proy-prog3-final.appspot.com",
  messagingSenderId: "865278988940",
  appId: "1:865278988940:web:176ae792a79adf178321a9"
};

app.initializeApp(firebaseConfig)

export const auth = firebase.auth();
export const storage= app.storage();
export const db = app.firestore();