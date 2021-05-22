import React from 'react'

const HomePage = () => {
  return (
    <div className='w-full h-screen flex flex-col ' >
      <Header />
      <HomeContent />
    </div>
  )
}

const Header = () => {
  return (
    <div className='w-full flex items-center justify-between shadow py-4 px-6' >
      <div className='flex items-center' >
        <img src="/logo-blue.png" width='55' alt="Logo" className='mr-3' />
        <p className='text-xl text-gray-800' >Splinter Bot</p>
      </div >
      <div className='flex items-center' >
        <LandingLink name='Home' />
        <LandingLink name='About' />
        <LandingLink name='Security' />
        <LandingLink name='Get Started' />
      </div>
      <div className='flex items-center' >
        <button className='text-white rounded-xl px-4 py-2 bg-blue-700 hover:bg-blue-800 transition ease-in duration-100 focus:outline-none' >Login</button>
      </div>
    </div >
  )
}

const LandingLink = (props) => {
  return (
    <a href="#" className='p-3 text-gray-800' >
      {props.name}
    </a>
  )
}


const HomeContent = () => {
  return (
    <div className='w-full h-3/4 flex flex-col justify-center items-center my-auto' >
      <h1 className='text-7xl text-blue-700 mb-9 '>Splinter Bot</h1>
      <p className='text-lg text-center text-gray-800 mb-9' >The smartest way to farm<br />dark energy crystals.</p>
      <div>
        <button className=' border-2 border-blue-700 text-blue-700 hover:bg-blue-800 hover:text-white px-8 py-3 rounded-lg transition ease-in duration-100 focus:outline-none mr-4' >Learn More</button>
        <button className='border-2 border-blue-700 bg-blue-700 text-white hover:bg-blue-800 px-8 py-3 rounded-lg transition ease-in duration-100 focus:outline-none' >Get Started</button>
      </div>
    </div>
  )
}


export default HomePage
