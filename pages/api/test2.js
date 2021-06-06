// import firebase from 'firebase/app'
// import 'firebase/firestore'

// import battle from './utility/battle'
// import performRestart from './utility/perform-restart'
// import openSplinterlands from './utility/open-splinterlands'
// import { logBattle } from './summoner/firestore'

// async function getShouldBattle() {
//   const doc = await firebase.firestore().collection('Users').doc('dpleskac@gmail.com').get()
//   return doc.data().shouldFarm
// }

// async function setShouldBattle(newStatus) {
//   await firebase.firestore().collection('Users').doc('dpleskac@gmail.com').update({
//     shouldFarm: newStatus
//   })
// }

// async function setIsInMatch(matchStatus) {
//   await firebase.firestore().collection('Users').doc('dpleskac@gmail.com').update({
//     isInMatch: matchStatus
//   })
// }

export default async function handler(req, res) {
  if (req.method === 'POST' || req.method === 'post') {
    // try {
    //   await setIsInMatch(true)
    //   // const battleResponse = await farm()
    //   // console.log(battleResponse)
    // } catch (e) {
    //   console.log('error farming', e)
    // }

    // await setIsInMatch(true)
    return res.json({ result: 'success' })
  } else {
    console.log('request not met')
  }
}


// async function farm() {

//   await setIsInMatch(true)
//   let browser, page
//   let battleResponse;
//   let restartFailedCount = 0;

//   // OPEN SPLINTER LANDS
//   console.log('opening splinter lands')
//   try {
//     const { browser: returnedBrowser, page: returnedPage } = await openSplinterlands()
//     browser = returnedBrowser
//     page = returnedPage
//   } catch (e) {
//     if (e.message === 'Navigation failed because browser has disconnected!' || e.message === 'Protocol error (Runtime.callFunctionOn): Session closed. Most likely the page has been closed.') {
//       await setIsInMatch(false)
//       await setShouldBattle(false)
//     }
//     console.log(e)
//   }
//   console.log('after opening splinter lands')

//   // BATTLE AS LONG AS DESIRED
//   while (await getShouldBattle() === true) {
//     try {

//       // BATTLE
//       const splinterChoice = await firebase.firestore().collection('Users').doc('dpleskac@gmail.com').get().then(doc => doc.data().splinterChoice)
//       console.log(splinterChoice, 'choice')
//       const battleResults = await battle(page, splinterChoice);
//       await logBattle(battleResults)
//       console.log(battleResults)
//       battleResponse = 'stopped battling - success';

//     } catch (err) {
//       console.log(`error battling ${err.message}, failed count ${restartFailedCount}`)

//       // HANDLE BROSWER DISCONNECT ERR
//       if (err.message === 'Protocol error (Runtime.callFunctionOn): Session closed. Most likely the page has been closed.' || err.message === 'Protocol error (Runtime.callFunctionOn): Target closed.') {
//         await setShouldBattle(false)
//       } else {
//         console.log('browser disconnect NOT detected', err.message)
//       }

//       // TRY PERFORMING A RESTART
//       try {
//         await performRestart(page);
//       } catch (e) {
//         console.log('failed restarting', e.message)
//       }

//       //  CLOSE IF RESTARTING TOO MANY TIMES
//       restartFailedCount++;
//       if (restartFailedCount >= 20) {
//         battleResponse = `failed too many times - manual restart required + ${err}`;
//         await setShouldBattle(false)
//       }
//     }

//   }

//   // EXIT THE BROWSER
//   try {
//     await browser.close()
//   } catch (e) {
//     console.log('couldnt close browser, might have already been closed')
//   }

//   await setIsInMatch(false)
//   return battleResponse

// }