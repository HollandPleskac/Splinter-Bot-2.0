import React from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Link from 'next/link'

const HomePage = () => {
  return (
    <>
      <div className='w-full h-screen flex flex-col ' >
        <Header />
        <HomeContent />
      </div>
      <StartFarming />
      <DifferentModes />
      <RealtimeData />
      <FullAnalysis />
      <Security />
    </>
  )
}

const Header = () => {
  const router = useRouter()
  const navHandler = (params) => {
    router.push('/login')
  }

  return (
    <div className='bg-white w-full flex items-center justify-between shadow py-4 px-6' >
      <div className='flex items-center' >
        <img src="/logo-blue.png" width='55' alt="Logo" className='mr-3' />
        <p className='text-lg text-gray-800' >Splinter Bot</p>
      </div >
      <div className='flex items-center' >
        {/* include a video section here, cut into heading of webpage */}
        <LandingLink name='Home' href='#' />
        <LandingLink name='About' href='#' />
        <LandingLink name='Security' href='#' />
        <LandingLink name='Get Started' href='#' />
      </div>
      <div className='flex items-center' >
        <button onClick={navHandler} className='text-white rounded-xl px-4 py-2 bg-blue-600 hover:bg-blue-700 transition ease-in duration-100 focus:outline-none' >Login</button>
      </div>
    </div >
  )
}

const LandingLink = (props) => {
  return (
    <Link href={props.href} passHref >
      <a className='p-3 text-gray-800' >
        {props.name}
      </a>
    </Link>
  )
}


const HomeContent = () => {
  return (
    <div className='w-full h-3/4 flex flex-col justify-center items-center my-auto' >
      <h1 className='text-7xl text-blue-600 mb-9 '>Splinter Bot</h1>
      <p className='text-lg text-center text-gray-800 mb-9' >The smartest way to farm<br />dark energy crystals.</p>
      <div>
        <button className=' border-2 border-blue-600 text-blue-600 hover:bg-blue-700 hover:text-white px-8 py-3 rounded-lg transition ease-in duration-100 focus:outline-none mr-4' >Learn More</button>
        <button className='border-2 border-blue-600 bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 rounded-lg transition ease-in duration-100 focus:outline-none' >Get Started</button>
      </div>
    </div>
  )
}

const StartFarming = () => {
  return (
    <div className='flex justify-evenly items-center py-24' >
      <div >
        <h2 className='text-4xl text-semibold mb-4 text-gray-800 leading-tight ' >Start Farming<br />with a <span className='text-blue-600' >Click!</span></h2>
        <p className='text-gray-500' >Start farming at the click of a button. Start and<br />stop the server from the dashboard here.</p>
      </div>
      <img src="website-screenshots/dashboard-small.PNG" alt="Server On" width='500' className='rounded-xl' />
    </div>
  )
}

const DifferentModes = () => {
  return (
    <div className='flex justify-evenly items-center py-24' >
      <img src="website-screenshots/modes.PNG" alt="Modes" width='500' className='rounded-2xl' />
      <div >
        <h2 className='text-4xl text-semibold mb-4 text-gray-800 leading-tight ' >Different <span className='text-blue-600' >Modes</span><br />for the bot!</h2>
        <p className='text-gray-500' >Switch modes at any time - even while playing.<br /> Have fun winning with the best and random modes. </p>
      </div>
    </div >
  )
}

const RealtimeData = () => {
  return (
    <div className='flex justify-evenly items-center py-24' >
      <div >
        <h2 className='text-4xl text-semibold mb-4 text-gray-800 leading-tight ' > <span className='text-blue-600'>Realtime</span> Data</h2>
        <p className='text-gray-500' >Get live match results right from the website.<br />Go to live view tab to view matches in realtime!</p>
      </div>
      <img src="website-screenshots/live-view.PNG" alt="Server On" width='500' className='rounded-xl' />
    </div>
  )
}

const FullAnalysis = (params) => {
  return (
    <div className='flex justify-evenly items-center py-24' >
      <img src="website-screenshots/match-data.PNG" alt="Modes" width='500' className='rounded-2xl' />
      <div >
        <h2 className='text-4xl text-semibold mb-4 text-gray-800 leading-tight ' >Full <span className='text-blue-600'>Analysis</span> </h2>
        <p className='text-gray-500' >Compile all of your matches into easily digestable<br />statistics.  Check out your data from two time intervals!</p>
      </div>
    </div >
  )
}

const Security = () => {
  return (
    <div>Security</div>
  )
}




export default HomePage
