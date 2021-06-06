import firestore from './firebase-admin'

export default async function handler(req, res) {

  async function setIsInMatch(matchStatus) {
    await firestore.collection('Users').doc('dpleskac@gmail.com').update({
      isInMatch: matchStatus
    })
  }

  if (req.method === 'POST') {
    console.log(process.env.type)
    await setIsInMatch(true)
    res.json({ result: 'success' })
  } else {
    res.json({ result: 'should be a post request' })
  }
}
