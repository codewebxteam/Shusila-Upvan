import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBrUTpFLDU6ItF-ARVARcEBgMHEy3x0ULM",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "susheela-upvan.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "susheela-upvan",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "susheela-upvan.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "5079396310",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:5079396310:web:196a743d1d8c60fe66be77",
  measurementId: "G-6JD7PN3MYS"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);  
export const auth = getAuth(app);    
export const storage = getStorage(app); 