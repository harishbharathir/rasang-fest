import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCAL-tsD_NcL-HPPJB9WvI8J8Oq3em_Rxo",
  authDomain: "rasrang2026.firebaseapp.com",
  projectId: "rasrang2026",
  storageBucket: "rasrang2026.firebasestorage.app",
  messagingSenderId: "835215327485",
  appId: "1:835215327485:web:996f9b7cadb10adc73fe94",
  measurementId: "G-MMV67PDP6X"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => signInWithPopup(auth, provider);
export const signOutUser = () => signOut(auth);
