import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDwowmzH0skVhieH3KPgIP8_vQBzhJmIi4",
  authDomain: "wordwise-d1607.firebaseapp.com",
  projectId: "wordwise-d1607",
  storageBucket: "wordwise-d1607.appspot.com",
  messagingSenderId: "426579758621",
  appId: "1:426579758621:web:5bc883cd5eea3a416940f4",
  measurementId: "G-QL9ZF6G3HH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, auth, storage };
