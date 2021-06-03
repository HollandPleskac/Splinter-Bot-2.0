import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import AuthContext from '../context/authContext'
import HomePage from '../pages/index'

const ProtectRoute = (props) => {
  const router = useRouter()
  const ctx = useContext(AuthContext)

  const isOnProtectedRoute = router.pathname !== '/' && router.pathname !== '/login' && router.pathname !== '/signup' // maybe isOnProtectedRoute doesn't update with context

  if (ctx.isLoading) {
    return <div></div> // wait to get a user result from AuthContext before making a decision on which page to go to
  }

  if (!ctx.isLoading && isOnProtectedRoute && ctx.user === null) {
    router.push('/')
    return <div></div> // no user and accessing protected route: pushes to / before returning empty div
  } else {
    return props.children
  }
}

export default ProtectRoute

// Idea from https://www.mikealche.com/software-development/how-to-implement-authentication-in-next-js-without-third-party-libraries
