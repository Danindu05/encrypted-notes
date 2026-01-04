import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export function login(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function register(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}
