async function performRestart(page) {
  // first take a screenshot
  await page.goto('https://splinterlands.com/?p=battle_history');
  await page.waitForTimeout(7000);
  await page.evaluate(async () => {
    try {
      document.querySelector('.modal-close-new').click();
    } catch (e) {
      console.log('no need to close modal');
    }
  });
}

export default performRestart