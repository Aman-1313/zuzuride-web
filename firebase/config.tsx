// firebase/config.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyBts_gvH-uVk7m3-rTkrCLlxJ7Vb_L7jSk",
  authDomain: "skiptheride.firebaseapp.com",
  projectId: "skiptheride",
  storageBucket: "skiptheride.firebasestorage.app",
  messagingSenderId: "577076618336",
  appId: "1:577076618336:web:84cce92e93522c91ae8f05",
};

// Prevent re-initialization during hot reload in Next.js
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// ✅ Auth automatically persists user with localStorage/indexedDB
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions(app, "us-central1");

export { auth, db, storage, functions };
