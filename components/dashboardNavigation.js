import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTachometerAlt, faEye, faSignal, faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

const DashboardNavigation = (props) => {
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
    <div className='flex flex-col justify-between bg-blue-700 px-5 h-screen' style={{ width: '300px' }} >
      <div>
        <div className='h-topbar flex items-center'>
          <img src="logo-white.png" alt="Logo" width='42' />
          <h1 className='text-blue-50 text-xl ml-2' >Splinter Bot</h1>
        </div>
        <hr />
        <SidebarLink name='Dashboard' icon={faTachometerAlt} href='/dashboard' spacingClasses='py-4' />
        <hr className='border-blue-100' />
        <SidebarLink name='Live View' icon={faEye} href='#' spacingClasses='pt-5' />
        <SidebarLink name='Statistics' icon={faSignal} href='#' spacingClasses='pt-5' />
        <SidebarLink name='Account' icon={faUserCircle} href='/account' spacingClasses='pt-5' />
      </div>
      <div>
        <hr className='mb-2 border-blue-100' />
        <SidebarLink name='Sign Out' icon={faSignOutAlt} href='#' spacingClasses='pt-4 pb-5' />
      </div>
    </div>
  )
}

const SidebarLink = ({ name, icon, href, spacingClasses }) => {
  const router = useRouter()
  // console.log(router.pathname)
  // console.log(href)
  const activeRouteClasses = router.pathname === href ? 'text-white' : 'text-blue-100 hover:text-white'
  return (
    <Link href={href}>
      <div className={`flex items-center cursor-pointer transition ease-in duration-100 ` + activeRouteClasses + ' ' + spacingClasses} >
        <FontAwesomeIcon icon={icon} />
        <h3 className='ml-3 mt-px text-md' >{name}</h3>
      </div>
    </Link>
  )
}


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

export default DashboardNavigation