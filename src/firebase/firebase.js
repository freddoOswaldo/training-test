import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth"
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAZXgLRYVkFrGTcrGyuU6MJ1L7KtS13MUM",
  authDomain: "udemy-react-test-3b27e.firebaseapp.com",
  projectId: "udemy-react-test-3b27e",
  storageBucket: "udemy-react-test-3b27e.appspot.com",
  messagingSenderId: "43645098750",
  appId: "1:43645098750:web:8d9d6a856da30bb371a3af"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);