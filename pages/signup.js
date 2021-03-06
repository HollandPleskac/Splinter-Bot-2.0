import React, { useState, useContext, useRef } from 'react'
import { useRouter } from 'next/router'
import AuthContext from '../context/authContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const Signup = () => {
  const ctx = useContext(AuthContext)
  const router = useRouter()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const [feedback, setFeedback] = useState('')

  const arrowBackHandler = () => {
    router.push('/')
  }

  const navHandler = () => {
    router.push('/login')
  }

  const registerHandler = async () => {
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setFeedback('Password not equal to confirm password')
      return;
    }

    const res = await ctx.onSignup(emailRef.current.value, passwordRef.current.value)
    if (res !== 'success') {
      setFeedback(res)
    }
  }

  const googleSignupHandler = async () => {
      const res = await ctx.onGoogleSignup()
      if (res !== 'success') {
        setFeedback(res)
      }
  }
  


  console.log(ctx.isLoggedIn)
  return (
    <div className='h-screen flex justify-center items-center' >
      <div className='flex flex-col w-96' >
        <p className='text-sm' >&nbsp;</p>
        <h1 className='text-center mb-4 text-3xl font-semibold' >Sign Up</h1>
        <p className='text-center mb-4 text-md' >Already have an account? <span onClick={navHandler} className='text-blue-600 font-semibold cursor-pointer' >Sign in!</span></p>
        <GoogleSignInButton googleSignupFn={googleSignupHandler}/>
        <Input placeholder='email' r={emailRef} />
        <Input placeholder='password' r={passwordRef} />
        <Input placeholder='confirm password' r={passwordConfirmRef} />
        <Button onClick={registerHandler} />
        {
          feedback
            ? <p className='mt-3 text-center text-gray-800 text-sm' >{feedback}</p>
            : <p className='mt-3 text-gray-800 text-sm' >&nbsp;</p>
        }
      </div>
      <FontAwesomeIcon icon={faArrowLeft} onClick={arrowBackHandler} className='absolute top-0 left-0 ml-12 mt-12 text-2xl text-gray-800 cursor-pointer' />
    </div>
  )
}

const Input = (props) => {
  return (
    <input
      type="text"
      placeholder={props.placeholder}
      ref={props.r}
      className='w-96 h-12 pl-4 mb-4 text-gray-800 border-2 border-gray-400 rounded focus:ring-2 focus:border-blue-300 focus:ring-blue-400 focus:ring-opacity-50 focus:outline-none transition ease-in duration-100'
    />
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick} className='w-96 h-12 rounded text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50 focus:outline-none transition ease-in duration-100'>
      Register
    </button>
  )
}

const GoogleSignInButton = (props) => {
  return (
    <button onClick={props.googleSignupFn} className='w-96 h-12 mb-4 rounded text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-400 focus:ring-opacity-50 focus:outline-none transition ease-in duration-100' >
      Signup with Google
    </button>
  )
}



export default Signup
