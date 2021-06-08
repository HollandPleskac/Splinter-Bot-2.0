import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const AuthContext = React.createContext({
  user: null,
  isLoading: true,
  onLogout: async () => { },
  onSignup: async (email, password) => { },
  onLogin: async (email, password) => { },
  onGoogleLogin: async () => { },
  onGoogleSignup: async () => { }
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
    })
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

  const logout = async (push = true) => {
    firebase.auth().signOut().then(() => {
      console.log('signed out successfully')
      if (push)
        router.push('/') // TODO ask uncle mark why signing out use wont trigger ProtectRoute component to rebuild.
    }).catch((error) => {
      console.log('error occurred while signing out', error)
    });
  }

  const googleLogin = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await firebase.auth().signInWithPopup(provider)

      const user = result.user
      const userQuery = await firebase.firestore().collection('Users').where(firebase.firestore.FieldPath.documentId(), '==', user.email).get()
      if (userQuery.empty) {
        logout(false)
        return 'User doesn\'t exist in our database. Sign up first.'
      }
      router.push('/dashboard')
      return 'success'
    } catch (e) {
      console.log(e.code, e.message)
      return e.message
    }
  }

  const createUser = async (email) => {
    firebase.firestore().collection('Users').doc(email).set({
      email: email,
      password: '',
      isInMatch: false,
      shouldFarm: false,
      splinterChoice: 'fire'
    })
  }


  const googleSignup = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await firebase.auth().signInWithPopup(provider)
      const user = result.user
      const userQuery = await firebase.firestore().collection('Users').where(firebase.firestore.FieldPath.documentId(), '==', user.email).get()
      if (!userQuery.empty) {
        logout(false)
        return 'User already exists. Sign in to your account.'
      }
      await createUser(user.email)
      router.push('/dashboard')
      return 'success'
    } catch (e) {
      console.log(e.code, e.message)
      return e.message
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user: user,
        isLoading: isLoading,
        onLogin: login,
        onSignup: signup,
        onLogout: logout,
        onGoogleLogin: googleLogin,
        onGoogleSignup: googleSignup
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