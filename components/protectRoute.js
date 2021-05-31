import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import AuthContext from '../context/authContext'
import HomePage from '../pages/index'

const ProtectRoute = (props) => {
  const router = useRouter()
  const ctx = useContext(AuthContext)
  console.log('user from context', ctx.user, 'is loading', ctx.isLoading)
  const isOnProtectedRoute = !ctx.isLoading && (router.pathname !== '/' && router.pathname !== '/login' && router.pathname !== '/signup')

  if (ctx.isLoading) {
    return <div></div>
  }

  if (isOnProtectedRoute && ctx.user === null || ctx.user === undefined || ctx.user === {}) {
    router.push('/')
    return <div></div> // pushes to / before returning empty div
  } else {
    return props.children
  }
}

export default ProtectRoute
