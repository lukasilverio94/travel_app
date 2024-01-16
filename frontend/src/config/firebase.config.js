// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: "ontheroad-b3c6d.firebaseapp.com",
  projectId: "ontheroad-b3c6d",
  storageBucket: "ontheroad-b3c6d.appspot.com",
  messagingSenderId: "965467401655",
  appId: "1:965467401655:web:5e516d4198ea2c61324c32",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export { app };
