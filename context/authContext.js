import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import firebase from 'firebase/app'
import 'firebase/auth'

const AuthContext = React.createContext({
  user: null,
  isLoading: true,
  onLogout: async () => { },
  onSignup: async (email, password) => { },
  onLogin: async (email, password) => { }
})

export const AuthContextProvider = (props) => {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setUser(user)
      }
      setIsLoading(false)
    });
  }, [])

  const login = async (email, password) => {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password)
      const user = userCredential.user
      router.push('/dashboard')
      return 'success'
    } catch (e) {
      console.log('error occurred', e)
      return e.message
    }
  }

  const signup = async (email, password) => {
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password)
      const user = userCredential.user
      router.push('/dashboard')
      return 'success'
    } catch (e) {
      console.log('error occurred', e)
      return e.message
    }
  }

  const logout = async () => {
    firebase.auth().signOut().then(() => {
      console.log('signed out successfully')
      router.push('/')
    }).catch((error) => {
      console.log('error occurred while signing out', error)
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user: user,
        isLoading: isLoading,
        onLogin: login,
        onSignup: signup,
        onLogout: logout,
      }}>
      { props.children}
    </AuthContext.Provider >
  )

}

export default AuthContext

// code login ui
// code signup ui

// login function
// signup function

// hook up links to buttons