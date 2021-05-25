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
  console.log(router.pathname)

  useEffect(() => {
    if (!isLoggedIn && router.pathname !== '/') {
      console.log('user unathenticated, logging out')
    } else {
      console.log('user authenticated, coninue using server')
    }
  }, [isLoggedIn])

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: false,
        onLogout: () => { },
        onLogin: () => { },
      }}>
      { props.children}
    </AuthContext.Provider >
  )

}

export default AuthContext