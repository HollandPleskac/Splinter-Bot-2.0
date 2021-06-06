import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import firebase from 'firebase/app'
import 'firebase/firestore'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons'
import MainNavigation from '../components/mainNavigation'
import AuthContext from '../context/authContext'

const dashboard = () => {
  const ctx = useContext(AuthContext)
  console.log(ctx.isLoggedIn)

  return (
    <MainNavigation>
      <PageContent />
    </MainNavigation>
  )
}

const PageContent = () => {
  const [serverOn, setServerOn] = useState(false)
  const [pickedSplinter, setPickedSplinter] = useState(' 2323')

  const battleHandler = async () => {
    try {
      // toggle shouldBattle
      const userDoc = await firebase.firestore().collection('Users').doc('dpleskac@gmail.com').get()
      await firebase.firestore().collection('Users').doc('dpleskac@gmail.com').update({
        shouldFarm: !userDoc.data().shouldFarm
      })

      // If not in match and start --> battle
      const newUserDoc = await firebase.firestore().collection('Users').doc('dpleskac@gmail.com').get()
      if (!newUserDoc.data().isInMatch && newUserDoc.data().shouldFarm) {
        console.log('trying to farm')
        try {
          const res = await axios.post('/api/farm')
          console.log(res)
        } catch (e) {
          console.log('err occurred while trying to farm', e)
          console.log(e.name)
          console.log(e.message)
        }
      }

    } catch (e) {
      console.log(e)
    }
  }

  useEffect(async () => {
    const unsubscribe = firebase.firestore().collection('Users').doc('dpleskac@gmail.com').onSnapshot(doc => {
      setServerOn(doc.data().shouldFarm)
      setPickedSplinter(doc.data().splinterChoice)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <div className='flex items-center justify-around h-dashContent bg-gray-50 ' >

      <div className='flex flex-col'>
        <p className=' text-gray-400 text-center mb-4' >{'Server is ' + (serverOn ? 'On' : 'Off')}</p>
        <button onClick={battleHandler} className='group p-20 border-4 rounded-full border-gray-400 focus:outline-none transition ease in duration-100' >
          <FontAwesomeIcon icon={serverOn ? faPauseCircle : faPlayCircle} className='text-5xl text-gray-400 group-hover:text-gray-500 transition ease in duration-100' />
        </button>
      </div>

      <div className='flex flex-col'>
        <SplinterBtn name='Fire' picked={pickedSplinter} />
        <SplinterBtn name='Water' picked={pickedSplinter} />
        <SplinterBtn name='Earth' picked={pickedSplinter} />
        <SplinterBtn name='Life' picked={pickedSplinter} />
        <SplinterBtn name='Death' picked={pickedSplinter} />
        <SplinterBtn name='Dragon' picked={pickedSplinter} />
        <SplinterBtn name='Random' picked={pickedSplinter} />
        <SplinterBtn name='Best' picked={pickedSplinter} />
      </div>

    </div>
  )
}

const SplinterBtn = (props) => {
  const setSplinterChoiceHandler = async () => {
    try {
      await firebase.firestore().collection('Users').doc('dpleskac@gmail.com').update({
        splinterChoice: props.name.toLowerCase()
      })
    } catch (e) {
      console.log(e)
    }
  }

  const unSelectedClasses = 'border-2 border-gray-300 px-16 py-2 mb-2 rounded-lg hover:border-gray-400 focus:outline-none transition ease-in duration-100'
  const selectedClasses = 'border-2 bg-blue-700 border-blue-700 text-white px-16 py-2 mb-2 rounded-lg focus:outline-none transition ease-in duration-100'

  return (
    <button
      onClick={setSplinterChoiceHandler}
      className={props.picked === props.name.toLowerCase() ? selectedClasses : unSelectedClasses}
    >
      {props.name}
    </button>
  )
}



export default dashboard
