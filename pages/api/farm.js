import firebase from 'firebase/app'
import 'firebase/firestore'

async function setIsInMatch(matchStatus) {
  await firebase.firestore().collection('Users').doc('dpleskac@gmail.com').update({
    isInMatch: matchStatus
  })
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await setIsInMatch(true)
    res.json({ result: 'success' })
  } else {
    res.json({ result: 'should be a post request' })
  }
}
