import React from 'react'
import DashboardNavigation from '../components/dashboardNavigation'
import firebase from 'firebase/app'
import 'firebase/firestore'
import axios from 'axios'

const Account = () => {
  return (
    <DashboardNavigation>
      <PageContent />
    </DashboardNavigation>
  )
}

const PageContent = () => {

  async function openSplinterlands() {
    try {
      const res = await axios.post('/api/open-splinterlands')
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }

  async function battle() {
    try {
      const res = await axios.post('/api/farm')
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className='flex flex-col justify-center items-center h-dashContent bg-gray-50' >
      <button onClick={openSplinterlands} className='mb-5' >open</button>
      <button onClick={battle} >battle</button>
    </div>
  )
}


export default Account
