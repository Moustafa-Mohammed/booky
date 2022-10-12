import { useState, useEffect, createContext, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { setDoc, doc } from "firebase/firestore";

import { auth, db } from "../firebase.config";

const AuthContext = createContext({});

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  const signUp = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", email), {
      favorites: [],
    });
  };

  const logIn = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    return await signOut(auth);
  };

  useEffect(() => {
    const unsubscribeFromAuth = onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
    });
    console.log(user);

    return unsubscribeFromAuth;
  });

  return (
    <AuthContext.Provider value={{ user, signUp, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function userAuth() {
  return useContext(AuthContext);
}
