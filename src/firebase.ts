// src/firebase.ts
import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDfJma8G42X4m7eFShCWr5S83pNVyqH_KQ",
  authDomain: "room8-chat.firebaseapp.com",
  databaseURL:
    "https://room8-chat-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "room8-chat",
  storageBucket: "room8-chat.appspot.com",
  messagingSenderId: "658419432276",
  appId: "1:658419432276:web:ceaf6cdb42b38c732666c1",
  measurementId: "G-ZNGTCG4LCH",
};

const app = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app); // Explicitly specify Firestore type

export { db };
