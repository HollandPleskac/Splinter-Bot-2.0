import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShieldAlt, faKey, faDna, faHome, faEnvelope } from '@fortawesome/free-solid-svg-icons'

const HomePage = () => {
  return (
    <>
      <div className='w-full h-screen flex flex-col ' >
        <Header />
        <HomeContent />
      </div>
      <Video />
      <StartFarming />
      <DifferentModes />
      <RealtimeData />
      <FullAnalysis />

      <Security />
      <DataSecurity />
      <DataPrivacy />
      <Authentication />

      <GetStarted />

      <Footer />

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
        <LandingLink name='Home' href='/#' />
        <LandingLink name='About' href='#about' />
        <LandingLink name='Security' href='#security' />
        <LandingLink name='Get Started' href='#get-started' />
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
  const router = useRouter()

  const aboutHandler = () => {
    router.push('#about')
  }

  const getStartedHandler = () => {
    router.push('/login')
  }


  return (
    <div className='w-full h-3/4 flex flex-col justify-center items-center my-auto' >
      <h1 className='text-7xl text-blue-600 mb-9'>Splinter Bot</h1>
      <p className='text-lg text-center text-gray-800 mb-9' >The smartest way to farm<br />dark energy crystals.</p>
      <div>
        <button onClick={aboutHandler} className=' border-2 border-blue-600 text-blue-600 hover:bg-blue-700 hover:text-white px-8 py-3 rounded-lg transition ease-in duration-100 focus:outline-none mr-4' >Learn More</button>
        <button onClick={getStartedHandler} className='border-2 border-blue-600 bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 rounded-lg transition ease-in duration-100 focus:outline-none' >Get Started</button>
      </div>
    </div>
  )
}

const Video = () => {
  return (
    <div className='flex justify-center mb-24' >
      <iframe src="splinter-bot-demo.webm" frameborder="0" width='1000' height='470' className='rounded-2xl border-2 border-gray-800'></iframe>
    </div>
  )
}


const StartFarming = () => {
  return (
    <div id='about' className='flex justify-evenly items-center py-24' >
      <div >
        <h2 className='text-landingPageTitle mb-4 font-semibold text-gray-700 leading-tight ' >Start Farming<br />with a <span className='text-blue-600' >Click</span></h2>
        <p className='text-gray-500 text-lg' >Start farming at the click of a button. Start and<br />stop the server from the dashboard here.</p>
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
        <h2 className='text-landingPageTitle mb-4 font-semibold text-gray-700 leading-tight ' > <span className='text-blue-600' >Eight</span> different<br />modes to use </h2>
        <p className='text-gray-500 text-lg' >Switch modes at any time - even while playing.<br /> Have fun winning with the best and random modes. </p>
      </div>
    </div >
  )
}

const RealtimeData = () => {
  return (
    <div className='flex justify-evenly items-center py-24' >
      <div >
        <h2 className='text-landingPageTitle mb-4 font-semibold text-gray-700 leading-tight ' > <span className='text-blue-600'>Realtime</span> data<br />from the website</h2>
        <p className='text-gray-500 text-lg' >Get live match results right from the website.<br />Go to live view tab to view matches in realtime!</p>
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
        <h2 className='text-landingPageTitle mb-4 font-semibold text-gray-700 leading-tight ' >Full analysis<br />of all <span className='text-blue-600'>battles</span></h2>
        <p className='text-gray-500 text-lg' >Compile all of your matches into easily digestable<br />statistics.  Check out your data from two time intervals!</p>
      </div>
    </div >
  )
}

const Security = () => {
  return (
    <div id='security' className='flex flex-col items-center py-24' >
      <h2 className='text-gray-800 mb-7 font-semibold' style={{ fontSize: '3.25rem' }}>Security is our top priority</h2>
      <p className='text-gray-500 text-lg text-center' >At Splinter Bot we are dedicated to keeping the data in your account safe and<br />secure. We take the highest possible security measures when handling<br />sensitive credentials used by our bot to log into Splinter Lands.</p>
    </div>
  )
}

const DataSecurity = () => {
  return (
    <div className='flex justify-evenly items-center py-24' >
      <div className='border-4 border-gray-400 p-12 rounded-2xl' >
        <FontAwesomeIcon icon={faShieldAlt} className='text-blue-600' style={{ fontSize: '60px' }} />
      </div>
      <div>
        <h2 className='text-4xl font-semibold mb-4 text-gray-700 leading-tight ' >Data <span className='text-blue-600' >Security</span> </h2>
        <p className='text-gray-500' >Your data is stored on Google's servers using their Firebase<br />service. Millions of companies trust Google to keep their user's<br />data safe. If you can trust Google, you can trust us.</p>
      </div>
    </div>
  )
}

const DataPrivacy = () => {
  return (
    <div className='flex justify-evenly items-center py-24' >
      <div>
        <h2 className='text-4xl font-semibold mb-4 text-gray-700 leading-tight ' >Data <span className='text-blue-600' >Privacy</span> </h2>
        <p className='text-gray-500' >We do not sell your data under any circumstance. If at any time<br />you would like your data to be deletd contact our support<br />email and we will erase your data from our system.</p>
      </div>
      <div className='border-4 border-gray-400 p-12 rounded-2xl' >
        <FontAwesomeIcon icon={faKey} className='text-blue-600' style={{ fontSize: '60px' }} />
      </div>
    </div>
  )
}

const Authentication = () => {
  return (
    <div className='flex justify-evenly items-center py-24' >
      <div className='border-4 border-gray-400 p-12 rounded-2xl' >
        <FontAwesomeIcon icon={faDna} className='text-blue-600' style={{ fontSize: '60px' }} />
      </div>
      <div>
        <h2 className='text-4xl font-semibold mb-4 text-gray-700 leading-tight ' >Authentication</h2>
        <p className='text-gray-500' >Your account is secured by your choice of authentication. We offer<br />authentication using goole or email and password. We don't<br />store the credentials used to log into your account.</p>
      </div>
    </div>
  )
}

const GetStarted = () => {
  return (
    <div id='get-started' className='py-24 ' >
      <div className='flex justify-evenly items-center p-4' >
        <div>
          <h2 className='text-gray-800 mb-7 font-semibold' style={{ fontSize: '3.25rem' }}>Get Started Today</h2>
          <p className='text-gray-500 text-lg mb-8 ' >Splinter Bot is still in beta and we are happy to have you<br />as a beta tester. Drop us your name and email address<br />to create an account. Get started farming today!</p>
        </div>
        <div className='flex flex-col' >
          <input type="text" placeholder='Full Name' className='px-4 py-3 mb-4 text-gray-600 border-2 border-gray-800 rounded focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition ease-in duration-100' style={{ width: 450 }} />
          <input type="text" placeholder='Email Address' className='px-4 py-3 mb-4 text-gray-600 border-2 border-gray-800 rounded focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition ease-in duration-100' style={{ width: 450 }} />
          <button className='px-4 py-3 rounded bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50 transition ease-in duration-100' style={{ width: 450 }} >I'm Interested</button>
        </div>
      </div>
    </div>
  )
}

const Footer = (params) => {
  return (
    <div className='bg-blue-600 py-16'>
      <div className='flex justify-evenly mb-12' >
        <div className='text-white' >
          <h4 className='font-bold mb-7 text-lg' >SPLINTER BOT</h4>
          <p style={{ lineHeight: '1.6rem' }} >Splinter Bot is an awesome webscraper<br />that farms you dark energy crystals. The<br />bot comes packed with tons of awesome<br />features like statistics and realtime match<br />history to help you earn more dark energy<br />crystals!</p>
        </div>
        <div className='text-white' >
          <h4 className='font-bold mb-7 text-lg' >NAVIGATION</h4>
          <ul>
            <li className='mb-3' ><Link href='#' >Home</Link></li>
            <li className='mb-3'><Link href='#about' >About</Link></li>
            <li className='mb-3'><Link href='#security' >Security</Link></li>
            <li><Link href='#get-started' >Get Started</Link></li>
          </ul>
        </div>
        <div className='text-white' >
          <h4 className='font-bold mb-7 text-lg' >CONTACT US</h4>
          <ul>
            <li className='mb-4' > <FontAwesomeIcon icon={faHome} className='mr-4' /> Mountain House, CA</li>
            <li className='mb-4' > <FontAwesomeIcon icon={faEnvelope} className='mr-4' /> hollandpleskac@gmail.com</li>
          </ul>
        </div>
      </div>
      <p className='text-white font-semibold text-center'>© 2021 Splinter Bot. All rights reserved.</p>
    </div>
  )
}




export default HomePage
