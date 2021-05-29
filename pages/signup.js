import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import AuthContext from '../context/authContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const Signup = () => {
  const ctx = useContext(AuthContext)
  const router = useRouter()

  const arrowBackHandler = () => {
    router.push('/')
  }

  const navHandler = () => {
    router.push('/login')
  }

  const registerBtnHandler = () => {
    console.log('signing up...')
  }


  console.log(ctx.isLoggedIn)
  return (
    <div className='h-screen flex justify-center items-center' >
      <div className='flex flex-col w-96' >
        <p className='text-sm' >&nbsp;</p>
        <h1 className='text-center mb-4 text-3xl font-semibold' >Sign Up</h1>
        <p onClick={navHandler} className='text-center mb-4 text-md' >Already have an account? <span className='text-blue-600 font-semibold cursor-pointer' >Sign in!</span></p>
        <Input placeholder='email' />
        <Input placeholder='password' />
        <Input placeholder='confirm password' />
        <Button onClick={registerBtnHandler} />
        <p className='mt-3 text-center text-gray-800 text-sm' >&nbsp;</p>
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


export default Signup
