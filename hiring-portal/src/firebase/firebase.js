import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCMMWVRUTyTz6mHBbWiW5mdsMoI_F22Tmw",
  authDomain: "hirehub-5324e.firebaseapp.com",
  projectId: "hirehub-5324e",
  storageBucket: "hirehub-5324e.appspot.com",
  messagingSenderId: "345550423208",
  appId: "1:345550423208:web:28898e1094d65023206e9d",
  measurementId: "G-YK5F7D84RT"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);
export { storage, auth };
