import firebase from 'firebase/app'
import 'firebase/firestore'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    res.json({ result: 'success' })
  } else {
    console.log('request not met')
  }
}
