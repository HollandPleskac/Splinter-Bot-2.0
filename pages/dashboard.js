import React, { useContext } from 'react'
import axios from 'axios'
import firebase from 'firebase/app'
import 'firebase/firestore'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import DashboardNavigation from '../components/dashboardNavigation'
import AuthContext from '../context/authContext'

const dashboard = () => {
  const ctx = useContext(AuthContext)
  console.log(ctx.isLoggedIn)

  return (
    <DashboardNavigation>
      <PageContent />
    </DashboardNavigation>
  )
}

const PageContent = () => {

  const setShouldFarmHandler = async () => {
    try {
      const userDoc = await firebase.firestore().collection('Users').doc('dpleskac@gmail.com').get()
      await firebase.firestore().collection('Users').doc('dpleskac@gmail.com').update({
        shouldFarm: !userDoc.data().shouldFarm
      })
    } catch (e) {
      console.log(e)
    }
  }

  const setSplinterChoiceHandler = async (newSplinterChoice) => {
    try {
      await firebase.firestore().collection('Users').doc('dpleskac@gmail.com').update({
        splinterChoice: newSplinterChoice.toLowerCase()
      })
    } catch (e) {
      console.log(e)
    }
  }

  async function testHandler() {
    const res = await axios.post('/api/test', {
      status: false
    })
    console.log(res)
  }


  return (
    <div className='flex items-center justify-around h-dashContent bg-gray-50 ' >

      <div className='flex flex-col'>
        <p className=' text-gray-400 text-center mb-4' >Server is Off</p>
        <button onClick={setShouldFarmHandler} className='group p-20 border-8 border-gray-300 rounded-full hover:border-gray-400 focus:outline-none transition ease in duration-100' >
          <FontAwesomeIcon icon={faPlayCircle} className='text-5xl text-gray-400 group-hover:text-gray-500 transition ease in duration-100' />
        </button>
      </div>

      <div className='flex flex-col'>
        <SplinterBtn name='Fire' fn={setSplinterChoiceHandler.bind(null, 'fire')} />
        <SplinterBtn name='Water' fn={setSplinterChoiceHandler.bind(null, 'water')} />
        <SplinterBtn name='Earth' fn={setSplinterChoiceHandler.bind(null, 'earth')} />
        <SplinterBtn name='Life' fn={setSplinterChoiceHandler.bind(null, 'life')} />
        <SplinterBtn name='Death' fn={setSplinterChoiceHandler.bind(null, 'death')} />
        <SplinterBtn name='Dragon' fn={setSplinterChoiceHandler.bind(null, 'dragon')} />
        <SplinterBtn name='Random' fn={setSplinterChoiceHandler.bind(null, 'random')} />
        <button onClick={setSplinterChoiceHandler.bind(null, 'best')} className='border-2 bg-blue-700 border-blue-700 text-white px-16 py-2 mb-2 rounded-lg hover:bg-blue-800 hover:border-blue-800 focus:outline-none focus:bg-blue-800 focus:border-blue-800 transition ease-in duration-100' >
          Best
        </button>
      </div>

    </div>
  )
}

const SplinterBtn = (props) => {

  return (
    <button onClick={props.fn} className='border-2 border-gray-300 px-16 py-2 mb-2 rounded-lg hover:border-gray-400 focus:outline-none focus:border-gray-400 transition ease-in duration-100' >
      {props.name}
    </button>
  )
}



export default dashboard
