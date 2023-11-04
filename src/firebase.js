
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-IAq-6DSGnwxbhk3lR7rJXmvW08bdvCs",
  authDomain: "react-notes-8e850.firebaseapp.com",
  projectId: "react-notes-8e850",
  storageBucket: "react-notes-8e850.appspot.com",
  messagingSenderId: "879934583065",
  appId: "1:879934583065:web:8be058c51a903b16bbd588",
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const notesCollection = collection(db, 'notes')
