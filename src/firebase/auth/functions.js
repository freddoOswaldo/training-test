import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "@firebase/auth"
import { auth } from "../firebase";


export const signUpFirebase = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);


export const logOutFirebase = () =>
    signOut(auth);

export const signInFirebase = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);