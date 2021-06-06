import React from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Link from 'next/link'

const HomePage = () => {
  return (
    <div className='w-full h-screen flex flex-col ' >
      <Header />
      <HomeContent />
    </div>
  )
}

const Header = () => {
  const router = useRouter()
  const navHandler = (params) => {
    router.push('/login')
  }


  return (
    <div className='w-full flex items-center justify-between shadow py-4 px-6' >
      <div className='flex items-center' >
        <img src="/logo-blue.png" width='55' alt="Logo" className='mr-3' />
        <p className='text-lg text-gray-800' >Splinter Bot</p>
      </div >
      <div className='flex items-center' >
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

  const serverHandler = async () => {
    const res = await axios.get('api/farm')
    console.log(res)
  }


  return (
    <div className='w-full h-3/4 flex flex-col justify-center items-center my-auto' >
      <h1 className='text-7xl text-blue-600 mb-9 '>Splinter Bot</h1>
      <p className='text-lg text-center text-gray-800 mb-9' >The smartest way to farm<br />dark energy crystals.</p>
      <div>
        <button onClick={serverHandler} className='mr-2' >Test out the server</button>
        <button className=' border-2 border-blue-600 text-blue-600 hover:bg-blue-700 hover:text-white px-8 py-3 rounded-lg transition ease-in duration-100 focus:outline-none mr-4' >Learn More</button>
        <button className='border-2 border-blue-600 bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 rounded-lg transition ease-in duration-100 focus:outline-none' >Get Started</button>
      </div>
    </div>
  )
}


export default HomePage
