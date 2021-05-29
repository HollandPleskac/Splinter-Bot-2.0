import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => { },
  onLogin: (email, password) => { }
})

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // auth state changes from firestore
    if (!isLoggedIn && router.pathname !== '/') {
      console.log('user unathenticated, logging out')
    } else {
      console.log('user authenticated, coninue using server')
    }
  }, [isLoggedIn])

  const login = (email, password) => {
    // login from firebase (email and password)
  }

  const logout = () => {
    // logout of firebase
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogin: login,
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