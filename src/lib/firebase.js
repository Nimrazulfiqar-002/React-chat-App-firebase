
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "react-chatroom-b32d4.firebaseapp.com",
  projectId: "react-chatroom-b32d4",
  storageBucket: "react-chatroom-b32d4.appspot.com",
  messagingSenderId: "208136297352",
  appId: "1:208136297352:web:48ac3a8947f3a92041383d"
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth()
export const db=getFirestore()
export const storage=getStorage()

