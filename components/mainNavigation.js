import React, { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTachometerAlt, faEye, faSignal, faUserCircle, faSignOutAlt, faQuestion } from '@fortawesome/free-solid-svg-icons'
import AuthContext from '../context/authContext'


const mainNavigation = (props) => {
  return (
    <div className='flex w-screen h-screen' >
      <Sidebar />
      <div className='flex flex-col w-full' >
        <Topbar />
        {props.children}
      </div>
    </div>
  )
}

const Sidebar = () => {
  return (
    <div className='flex flex-col bg-blue-600 px-5 h-screen' style={{ width: '300px' }} >
      <div>
        <div className='h-topbar flex items-center'>
          <img src="logo-white.png" alt="Logo" width='35' className='ml-2 mr-2' />
          <h1 className='text-white font-bold' >SPLINTER BOT</h1>
        </div>
        <hr className='border-white border-opacity-20 mb-2' />
        <SidebarLink name='Dashboard' icon={faTachometerAlt} href='/dashboard' />
        <hr className='border-white border-opacity-20 mt-2' />
        <p className='mt-4 ml-3 text-xs text-white text-opacity-40 font-semibold' >INTERFACE</p>
        <SidebarLink name='Live View' icon={faEye} href='/live-view' />
        <SidebarLink name='Statistics' icon={faSignal} href='/statistics' />
        <hr className='border-white border-opacity-20 mt-2' />
        <p className='mt-4 ml-3 text-xs text-white text-opacity-40 font-semibold' >ACCOUNT</p>
        <SidebarLink name='Account' icon={faUserCircle} href='/account' />
      </div>
    </div>
  )
}

const SidebarLink = (props) => {
  const router = useRouter()
  const activeBgClasses = router.pathname === props.href && 'bg-white bg-opacity-20'
  const activeTextClasses = router.pathname === props.href ? 'text-white' : 'text-white text-opacity-70 group-hover:text-white'

  return (
    <Link href={props.href}>
      <div className={'group flex items-center px-4 py-2 my-1 cursor-pointer rounded ' + activeBgClasses} >
        <FontAwesomeIcon icon={props.icon} className={' transition ease-in duration-50 ' + activeTextClasses} />
        <p className={'ml-4 mt-px transition ease-in duration-50 ' + activeTextClasses} >{props.name}</p>
      </div>
    </Link>
  )
}



const Topbar = () => {
  const ctx = useContext(AuthContext)
  const [isDropdownOpen, setDropdownOpen] = useState(false)

  const dropdownHandler = () => {
    setDropdownOpen((prevState) => !prevState)
  }


  const signOutHandler = () => {
    setDropdownOpen((prevState) => !prevState)
    ctx.onLogout(true)
  }
  console.log()

  return (
    <>
      <div className='flex flex-col items-end justify-center pr-8 w-full h-topbar z-10 shadow'>
        <div className='relative' >
          <div tabIndex='0' onClick={dropdownHandler} className='group flex items-center cursor-pointer focus:outline-none' >
            <p className='mr-4 text-sm text-gray-500' >{ctx.user.email}</p>
            <img src={ctx.user.photoURL || 'prof.jpg'} alt="Pic" width='42' height='42' className='rounded-full cover border-gray-300 border-2 group-hover:border-gray-400 group-focus:border-gray-400 transition ease-in duration-100' />
          </div>
          {/* prof.jpg */}

          {isDropdownOpen && <div onClick={setDropdownOpen.bind(null, false)} className='fixed inset-0' ></div>}

          {
            isDropdownOpen &&
            <div className='absolute right-0 flex flex-col w-48 py-2 mt-2 bg-white rounded-xl shadow-xl' >
              <button onClick={null} className='group flex items-center py-2 px-5 text-left hover:bg-blue-600 focus:outline-none transition ease-in duration-100'>
                <FontAwesomeIcon icon={faQuestion} className='mb-px mr-2 text-gray-400 group-hover:text-white transition ease-in duration-100' />
                <p className='text-gray-600 group-hover:text-white transition ease-in duration-100' >Support</p>
              </button>
              <button onClick={signOutHandler} className='group flex items-center py-2 px-5 text-left hover:bg-blue-600 focus:outline-none transition ease-in duration-100'>
                <FontAwesomeIcon icon={faSignOutAlt} className='mb-px mr-2 text-gray-400 group-hover:text-white transition ease-in duration-100' />
                <p className='text-gray-600 group-hover:text-white transition ease-in duration-100' >Sign Out</p>
              </button>
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default mainNavigation
