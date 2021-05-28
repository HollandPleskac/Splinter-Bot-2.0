import React, { useState, useRef } from 'react'
import DashboardNavigation from '../components/dashboardNavigation'
import firebase from 'firebase/app'
import 'firebase/firestore'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const Account = () => {
  return (
    <DashboardNavigation>
      <PageContent />
    </DashboardNavigation>
  )
}

const PageContent = () => {

  const [showPopup, setShowPopup] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const emailChangeHandler = (event) => {
    setEmail(event.target.value)
  }

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value)
  }

  const closePopup = () => {
    setShowPopup(false)
  }

  const openPopup = () => {
    setShowPopup(true)
  }

  const updateCredentials = () => {
    firebase.firestore().collection('Users').doc('dpleskac@gmail.com').update({
      email: email,
      password: password,
    })
    closePopup()
    setEmail('')
    setPassword('')
  }

  return (
    <>
      <div className='h-dashContent flex flex-col justify-center items-center' >
        <TextInput placeholder='email' value={email} onChange={emailChangeHandler} />
        <TextInput placeholder='password' value={password} onChange={passwordChangeHandler} />
        <UpdateButton openPopup={openPopup} email={email} password={password} />
        <p className='mt-4 text-gray-800 text-center'>The credentials entered here are used by Splinter Bot<br />to sign into your splinterlands account.</p>
      </div>
      {showPopup && <Popup updateCredentials={updateCredentials} closePopup={closePopup} email={email} password={password} />}
    </>
  )
}

const UpdateButton = (props) => {
  const enabledClasses = 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50'
  const disabledClasses = 'bg-gray-500 cursor-default'
  const btnClasses = (props.email && props.password) ? enabledClasses : disabledClasses
  return (
    // (email && password) && 
    <button onClick={props.openPopup} className={`w-1/3 h-12 rounded text-white focus:outline-none transition ease-in duration-100 ` + btnClasses} >Update</button>
  )
}


const TextInput = (props) => {
  return (
    <input
      type="text"
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
      className='w-1/3 h-12 pl-4 mb-4 rounded border-2 text-gray-800 hover:border-gray-300 focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition ease-in duration-100'
    />
  )
}


const Popup = (props) => {
  const clickPopupHandler = (event) => {
    event.stopPropagation()
  }

  return (
    <div onClick={props.closePopup} className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-20' >
      <div onClick={clickPopupHandler} className='relative px-14 py-10 bg-white rounded-md shadow-lg cursor-default' >
        <FontAwesomeIcon icon={faTimes} onClick={props.closePopup} className='absolute top-3 right-3 hover:text-red-600 cursor-pointer' />
        <h1 className='mb-4 text-center text-gray-800 text-lg' >Confirm Changes</h1>
        <p>
          New Email: <span className='inline text-blue-600 font-medium'  >{props.email}</span>
          <br />
          New Password: <span className='inline text-blue-600 font-medium' >{props.password}</span>
        </p>
        <div className='flex justify-center' >
          <button onClick={props.updateCredentials} className='w-32 px-2 py-2 mt-4 mr-2 text-sm text-blue-600 bg-white border-2 border-blue-600 hover:border-blue-700 hover:text-blue-700 rounded focus:outline-none transition ease-in duration-100'>
            Finalize
          </button>
          <button onClick={props.closePopup} className='w-32 px-2 py-2 mt-4 text-sm text-red-600 bg-white border-2 border-red-600 hover:border-red-700 hover:text-red-700 rounded focus:outline-none transition ease-in duration-100'>
            Discard
          </button>
        </div>
      </div>
    </div>
  )
}




export default Account
