import React, { useState, useContext } from 'react'
import { useRouter } from 'next/router'

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
    <div className='flex flex-col bg-blue-700 px-5 h-screen' style={{ width: '300px' }} >
      <div>
        <div className='h-topbar flex items-center justify-center'>
          <img src="logo-white.png" alt="Logo" width='42' className='mr-2' />
          <h1 className='text-blue-50 text-xl' >Splinter Bot</h1>
        </div>
        <hr />
      </div>
    </div>
  )
}

// Sidebar Link

// 


const Topbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false)

  const dropDownHandler = () => {
    setDropdownOpen((prevState) => !prevState)
  }

  return (
    <>
      <div className='flex flex-col items-end justify-center pr-8 w-full h-topbar z-10 shadow'>
        <div className='relative' >

          <div tabIndex='0' onClick={dropDownHandler} className='group flex items-center cursor-pointer focus:outline-none' >
            <p className='mr-4 text-sm text-gray-500' >Holland Pleskac</p>
            <img src="prof.jpg" alt="Prof Pic" width='45' height='45' className='rounded-full border-gray-300 border-2 group-hover:border-gray-400 group-focus:border-gray-400 transition ease-in duration-100' />
          </div>

          {isDropdownOpen && <div onClick={setDropdownOpen.bind(null, false)} className='fixed inset-0' ></div>}

          {
            isDropdownOpen &&
            <div className='absolute right-0 flex flex-col w-48 py-2 mt-2 bg-white rounded-2xl shadow-xl' >
              <button onClick={dropDownHandler} className='py-2 px-5 text-left text-gray-800 hover:bg-blue-600 hover:text-white focus:outline-none transition ease-in duration-100'>
                Dark Mode
            </button>
              <button onClick={dropDownHandler} className='py-2 px-5 text-left text-gray-800 hover:bg-blue-600 hover:text-white focus:outline-none transition ease-in duration-100'>
                Support
            </button>
              <button onClick={dropDownHandler} className='py-2 px-5 text-left text-gray-800 hover:bg-blue-600 hover:text-white focus:outline-none transition ease-in duration-100'>
                Sign Out
            </button>
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default mainNavigation
