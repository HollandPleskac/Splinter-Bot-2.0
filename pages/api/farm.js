import puppeteer from 'puppeteer'

import battle from './utility/battle'
import performRestart from './utility/perform-restart'
import openSplinterlands from './utility/open-splinterlands'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const battleResponse = await farm(req.body.splinterChoice)
    console.log(battleResponse)
    res.json({ result: 'success' })
  } else {
    console.log('request not met')
  }
}

async function getShouldBattle() {
  const doc = await firebase.firestore().collection('Users').doc('dpleskac@gmail.com').get()
  return doc.data().shouldFarm
}

async function setShouldBattle(newStatus) {
  await firebase.firestore().collection('Users').doc('dpleskac@gmail.com').update({
    shouldFarm: newStatus
  })
}

async function farm(splinterChoice) {

  let { browser, page } = await openSplinterlands()
  let battleResponse = 'stopped battling - success';
  let restartFailedCount = 0;
  let failedWhileRestarting = false;
  let isInMatch = true;

  // while (await getShouldBattle() === true) {
  try {
    const battleResults = await battle(page, splinterChoice);
    // TODO send the battle results to firebase
    console.log(battleResults)
    battleResponse = 'stopped battling - success';
  } catch (err) {
    console.log(`error battling ${err}, failed count ${restartFailedCount}`);

    try {
      await performRestart(page);
    } catch (e) {
      battleResponse = `failed while performing restart - check on server + ${e}`;
      failedWhileRestarting = true;
      await setShouldBattle(false)
    }


    restartFailedCount++;
    if (restartFailedCount >= 20 && failedWhileRestarting === false) {
      battleResponse = `failed while battling - manual restart required + ${err}`;
      await setShouldBattle(false)
    }
  }

  // }
  isInMatch = false;
  await browser.close()

  return battleResponse

}