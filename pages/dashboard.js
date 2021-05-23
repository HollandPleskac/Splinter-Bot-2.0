import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import DashboardNavigation from '../components/dashboardNavigation'

const dashboard = () => {
  return (
    <DashboardNavigation>
      <PageContent />
    </DashboardNavigation>
  )
}

const PageContent = () => {
  return (
    // make it so that when the btn is hovered, a different hover state is applied to the icon in the button
    <div className='flex items-center justify-around h-dashContent bg-gray-50 ' >

      <div className='flex flex-col'>
        <p className=' text-gray-400 text-center mb-4' >Server is Off</p>
        <button className='group p-20 border-8 border-gray-300 rounded-full hover:border-gray-400 focus:outline-none transition ease in duration-100' >
          <FontAwesomeIcon icon={faPlayCircle} className='text-5xl text-gray-400 group-hover:text-gray-500 transition ease in duration-100' />
        </button>
      </div>

      <div className='flex flex-col'>
        <SplinterBtn name='Fire' />
        <SplinterBtn name='Water' />
        <SplinterBtn name='Earth' />
        <SplinterBtn name='Life' />
        <SplinterBtn name='Death' />
        <SplinterBtn name='Dragon' />
        <SplinterBtn name='Random' />
        <button className='border-2 bg-blue-700 border-blue-700 text-white px-16 py-2 mb-2 rounded-lg hover:bg-blue-800 hover:border-blue-800 focus:outline-none focus:bg-blue-800 focus:border-blue-800 transition ease-in duration-100' >
          Best
        </button>
      </div>

    </div>
  )
}

const SplinterBtn = (props) => {
  return (
    <button className='border-2 border-gray-300 px-16 py-2 mb-2 rounded-lg hover:border-gray-400 focus:outline-none focus:border-gray-400 transition ease-in duration-100' >
      {props.name}
    </button>
  )
}



export default dashboard
