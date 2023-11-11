import { useState, useEffect, createContext, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "../firebase.config";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribeFromAuth = onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
    });

    return () => {
      unsubscribeFromAuth();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, createUser, login, signInWithGoogle, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default function userAuth() {
  return useContext(AuthContext);
}
