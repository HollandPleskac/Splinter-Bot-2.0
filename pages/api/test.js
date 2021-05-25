import firebase from 'firebase/app'
import 'firebase/firestore'

export default async function handler(req, res) {
  if (req.method === 'POST') {
   await firebase.firestore().collection('Users').doc('dpleskac@gmail.com').update({
      shouldFarm: req.body.status
    })
    console.log('hit the endpoint')
    res.json({ result: 'success' })
  } else {
    console.log('request not met')
  }
}