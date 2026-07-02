import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCnpBrSdKeSi8alxFNfR0Lme88HcBSVqnM",
  authDomain: "proofshield-ai.firebaseapp.com",
  projectId: "proofshield-ai",
  storageBucket: "proofshield-ai.firebasestorage.app",
  messagingSenderId: "173266006542",
  appId: "1:173266006542:web:ac2df97cd17552ba75825f",
  measurementId: "G-CHS849KYVP",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;