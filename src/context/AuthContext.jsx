import React, { createContext, useContext, useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyARqbWdAWV2YoVvn13NrtkcVVJl1Kj5LYw",
  authDomain: "prediction-market-mvp.firebaseapp.com",
  projectId: "prediction-market-mvp",
  storageBucket: "prediction-market-mvp.firebasestorage.app",
  messagingSenderId: "570026995458",
  appId: "1:570026995458:web:34d6f830b08120f9731c1b"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser)
    return () => unsubscribe()
  }, [])

  const logout = () => signOut(auth)

  return (
    <AuthContext.Provider value={{ user, auth, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
