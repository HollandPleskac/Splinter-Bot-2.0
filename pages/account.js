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

  async function testServer() {
    try {
      const res = await axios.post('/api/test', {
        status: true
      })
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className='flex flex-col justify-center items-center h-dashContent bg-gray-50' >
      <button onClick={openSplinterlands} className='mb-5' >open</button>
      <button onClick={battle} className='mb-5' >battle</button>
      <button onClick={testServer} >test</button>


      <div tabIndex='0' className="group p-5 bg-blue-400" >
        <button className='border-2 border-blue-200 bg-white group-focus:bg-yellow-400' >Group focus bg color</button>
        <h1 className='group-hover:bg-blue-900' >Group Focus Border</h1>
      </div>
    </div>
  )
}


export default Account
