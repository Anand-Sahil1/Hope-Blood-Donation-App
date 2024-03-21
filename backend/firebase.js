import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyCfMq871XgYNOL5toxhW1uF5Z0N0ni6a9E",
  authDomain: "hope-cec03.firebaseapp.com",
  projectId: "hope-cec03",
  storageBucket: "hope-cec03.appspot.com",
  messagingSenderId: "545901275851",
  appId: "1:545901275851:web:a3fdc5d4b0d10abc0d094e"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();


export default { db, auth };
