import firebase from "firebase/compat/app";
import "firebase/compat/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcbwPdlKHFIaA6kKanJ2h2RBPt1jIp9XY",
  authDomain: "testa-1a826.firebaseapp.com",
  projectId: "testa-1a826",
  storageBucket: "testa-1a826.appspot.com",
  messagingSenderId: "92923937009",
  appId: "1:92923937009:web:0f1545573dfda5bf76e950",
  measurementId: "G-T2M75NKDRJ",
};
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
