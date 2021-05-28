import React, { useState, useRef } from 'react'
import DashboardNavigation from '../components/dashboardNavigation'
import firebase from 'firebase/app'
import 'firebase/firestore'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckDouble, faTimes } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const Account = () => {
  return (
    <DashboardNavigation>
      <PageContent />
    </DashboardNavigation>
  )
}

const PageContent = () => {

  const [showPopup, setShowPopup] = useState(false)
  const emailRef = useRef()
  const passwordRef = useRef()

  const updateCredentials = async () => {
    setShowPopup(false)
    await firebase.firestore().collection('Users').doc('dpleskac@gmail.com').update({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    })
  }

  const closePopup = async () => {
    setShowPopup(false)
  }

  return (
    <>
      <div className='h-dashContent flex flex-col justify-center items-center' >
        <TextInput placeholder='email' refe={emailRef} />
        <TextInput placeholder='password' refe={passwordRef} />
        <button onClick={setShowPopup.bind(null, true)} className='w-1/3 h-12 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50 text-white rounded transition ease-in duration-100' >Update</button>
        <p className='mt-4 text-gray-800 text-center'>The credentials entered here are used by Splinter Bot<br />to sign into your splinterlands account.</p>
      </div>
      {showPopup && <Popup onClickBtn={updateCredentials} onClickPopup={closePopup} email={emailRef.current.value} password={passwordRef.current.value} />}
    </>
  )
}

const TextInput = (props) => {
  return (
    <input type="text" placeholder={props.placeholder} ref={props.refe} className='w-1/3 h-12 pl-4 mb-4 rounded border-2 text-gray-800 hover:border-gray-300 focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition ease-in duration-100' />
  )
}

const Popup = (props) => {
  const [btnClicked, setBtnClicked] = useState(false)

  const buttonHandler = async () => {
    setBtnClicked(true)
    await new Promise(r => setTimeout(r, 1250));
    await props.onClickBtn()
  }

  return (
    <>
      <div className='absolute inset-0 flex items-center justify-center bg-modal cursor-pointer' >
        <div className='relative p-10 bg-white rounded-md shadow-lg' >
          <FontAwesomeIcon icon={faTimes} onClick={props.onClickPopup} className='absolute right-4 top-4 text-gray-800 hover:text-red-500 transition ease-in duration-100' />
          <h1 className='mb-4 text-center text-gray-800 text-lg' >Confirm Changes</h1>
          <p>
            New Email: <span className='inline text-blue-600 font-medium'  >{props.email}</span>
            <br />
            New Password: <span className='inline text-blue-600 font-medium' >{props.password}</span>
          </p>
          <button
            onClick={buttonHandler}
            className='w-full py-3 mt-4 text-blue-600 bg-white border-2 border-blue-600 hover:border-blue-700 hover:text-blue-700 rounded focus:outline-none transition ease-in duration-100'
          >
            {!btnClicked ? 'Everything looks good' : <span>Update Success <FontAwesomeIcon icon={faCheckDouble} /></span>}
          </button>
        </div>
      </div>

    </>


  )
}




export default Account
