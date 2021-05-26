import firebase from 'firebase/app'
import 'firebase/firestore'

async function getShouldBattle() {
  const doc = await firebase.firestore().collection('Users').doc('dpleskac@gmail.com').get()
  return doc.data().shouldFarm
}

async function setShouldBattle(newStatus) {
  await firebase.firestore().collection('Users').doc('dpleskac@gmail.com').update({
    shouldFarm: newStatus
  })
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    //  await firebase.firestore().collection('Users').doc('dpleskac@gmail.com').update({
    //     shouldFarm: req.body.status
    //   })
    //   const userDoc = await firebase.firestore().collection('Users').doc('dpleskac@gmail.com').get()
    //   console.log('hit the endpoint')
    //   res.json({ result: 'success', fromFirestore: userDoc.data() })
    await setShouldBattle(true)
    const shouldBattle = await getShouldBattle()
    console.log(shouldBattle)
    res.json({ result: 'success' })
  } else {
    console.log('request not met')
  }
}