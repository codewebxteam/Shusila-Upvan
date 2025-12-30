// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrUTpFLDU6ItF-ARVARcEBgMHEy3x0ULM",
  authDomain: "susheela-upvan.firebaseapp.com",
  projectId: "susheela-upvan",
  storageBucket: "susheela-upvan.firebasestorage.app",
  messagingSenderId: "5079396310",
  appId: "1:5079396310:web:196a743d1d8c60fe66be77",
  measurementId: "G-6JD7PN3MYS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export services
export const db = getFirestore(app);  // Database ke liye
export const auth = getAuth(app);     // Authentication ke liye
export const storage = getStorage(app); // File storage ke liye