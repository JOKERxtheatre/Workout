import { GithubAuthProvider, GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyB07I9X8X391QPhQGV4AjWoldyygmkznUc",
  authDomain: "workout-a143a.firebaseapp.com",
  projectId: "workout-a143a",
  storageBucket: "workout-a143a.appspot.com",
  messagingSenderId: "78271834214",
  appId: "1:78271834214:web:459b1382ab02a4c83fe5a7",
  measurementId: "G-BQK0X20X36",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const providerGoogle = new GoogleAuthProvider();
const providerGithub = new GithubAuthProvider();

const db = getFirestore(app);

export { auth, providerGoogle, providerGithub, db };
