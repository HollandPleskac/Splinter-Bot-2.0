import puppeteer from 'puppeteer'
import chromium from 'chrome-aws-lambda'
import firebase from 'firebase/app'
import 'firebase/firestore'



async function openSplinterlands() {
  const username = await firebase.firestore().collection('Users').doc('dpleskac@gmail.com').get().then(doc => doc.data().email)
  const password = await firebase.firestore().collection('Users').doc('dpleskac@gmail.com').get().then(doc => doc.data().password)

  const browser = await puppeteer.launch({
    headless: false,
    // args: ['--no-sandbox', '--disable-setuid-sandbox'],
    // executablePath: '/usr/bin/chromium-browser'
  });
  // args and executablePath are required to run on linux
  const page = await browser.newPage();

  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');

  await page.goto('https://splinterlands.com/');

  await page.waitForTimeout(3000);
  await page.evaluate(() => {
    document.querySelector('.new-button').click();
  });

  await page.waitForTimeout(3000);
  await page.waitForSelector('#login_dialog_v2');
  await page.waitForSelector('#email');

  // enter credentials
  await page.type('#email', username);
  await page.type('#password', password);

  // click submit
  await page.evaluate(() => {
    const buttons = document.querySelectorAll('button[name=loginBtn]');
    const loginBtn = buttons[1];
    loginBtn.click();
  });

  await page.waitForTimeout(3000);
  await page.evaluate(() => {
    const closePopup = document.querySelector('.close');
    closePopup.click();
  })
  await page.waitForTimeout(1000);

  // go to home screen
  await page.evaluate(() => {
    const playNowBtn = document.getElementById('play_now').firstElementChild.querySelector('button');
    playNowBtn.click();
  });

  await page.waitForTimeout(3000);

  return { 'browser': browser, 'page': page };

}


export default openSplinterlands