import React, { useState, useEffect } from 'react'
import DashboardNavigation from '../components/dashboardNavigation'

import firebase from 'firebase/app'
import 'firebase/firestore'

const LiveView = () => {
  const [battles, setBattles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(async () => {
    const unsubscribe = firebase.firestore().collection('Battle Log').limit(15).orderBy('timestamp', 'desc').onSnapshot(querySnapshot => {
      setLoading(true)
      let battleList = []
      querySnapshot.forEach(doc => {
        battleList.push({
          id: doc.id,
          opponent: doc.data().opponent,
          winner: doc.data().winner,
          hvcminerTeam: doc.data().hvcminerTeam,
          opponentTeam: doc.data().opponentTeam,
        })
      })
      setBattles(battleList)
      setLoading(false)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <DashboardNavigation>
      <div className='flex flex-grow justify-center items-center'>
        {
          loading
            ? <div></div>
            : <div className='p-6 shadow-lg rounded overflow-scroll' style={{ height: '500px' }} >
              {
                battles.map(battle => {
                  return <Battle key={battle.id} battleObj={battle} />
                })
              }
            </div>
        }
      </div>
    </DashboardNavigation >
  )
}

const Battle = (props) => {
  const color = props.battleObj.winner === 'hvcminer' ? 'bg-blue-600' : 'bg-red-500'
  return (
    <div className='p-4 mb-3 flex justify-evenly items-center bg-gray-200 rounded' style={{ width: '700px' }} >
      <PlayerAndCards name='hvcminer' cards={props.battleObj.hvcminerTeam} />
      <div className={`p-2 w-12 h-12 flex justify-center items-center rounded-full text-white ` + color} >
        VS
      </div>
      <PlayerAndCards name={props.battleObj.opponent} cards={props.battleObj.opponentTeam} />
    </div>
  )
}

const PlayerAndCards = (props) => {
  return (
    <div className='flex items-center flex-grow flex-col'>
      <p>{props.name}</p>
      <div className='flex mt-2' >
        {
          props.cards.map(card => {
            return <CardUsed key={card.cardName} imgUrl={card.cardUrl} />
          })
        }
      </div>
    </div>
  )
}


const CardUsed = (props) => {

  if (props.imgUrl === '') {
    return (
      <div
        className='w-7 h-7 mr-2 cover rounded-full bg-gray-400'>
      </div>
    )
  }

  return (
    <div
      className='w-7 h-7 mr-2 cover rounded-full'
      style={{
        backgroundImage: `url(${props.imgUrl})`,
        backgroundSize: '210%',
        backgroundPosition: 'center 8%'
      }} >
    </div>
  )
}



export default LiveView
