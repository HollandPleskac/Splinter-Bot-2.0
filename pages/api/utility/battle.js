import pickCards from '../summoner/pickCards'
import pickSummoner from '../summoner/pickSummoner'

async function battle(page, splinterChoice) {

  async function clickRumbleButton(page) {
    try {
      await page.waitForTimeout(4000);
      await page.click('#btnRumble');
    } catch (e) {
      console.log('rumble not availiable yet, trying again');
      await clickRumbleButton(page);
    }
  }


  async function clickCloseBattleButton(page) {
    try {
      await page.waitForTimeout(3000);
      await page.click('.btn.btn--done');
    } catch (e) {
      console.log('done button not availiable yet, trying again');
      await clickCloseBattleButton(page);
    }
  }

  async function clickSkipButton(page, failCount) {
    if (failCount < 5) {
      console.log(failCount);
      try {
        await page.waitForTimeout(3000);
        await page.click('#btnSkip');
      } catch (e) {
        console.log('skip button not availiable yet, trying again');
        await clickSkipButton(page, failCount + 1);
      }
    } else {
      throw 'error might have been a draw';
    }
  }

  async function getAvailiableSplinters(page) {
    return await page.evaluate(() => {
      const imgEls = document.querySelector('.combat__splinters').querySelectorAll('img');

      const titles = [...imgEls].map(img => {
        const title = img.dataset.originalTitle.split(": ")[0].toLowerCase();
        const status = img.dataset.originalTitle.split(": ")[1];
        if (status === 'Active') {
          return title;
        } else {
          return 'inactive';
        }
      });

      const availiableSplinters = titles.filter(t => t !== 'inactive');
      return availiableSplinters;
    });
  }

  async function getEnemyPreviousMatchData(page) {
    return await page.evaluate(() => {

      function getMonsterNameFromLi(unformattedName) {
        let name = unformattedName.split('	')[0];
        name.slice(0, -1); // remove last letter
        return name;
      }

      function getSplinterFromUrl(imgText) {
        let splinter = imgText.replace('https://d36mxiodymuqjm.cloudfront.net/website/icons/', '');
        splinter = splinter.replace('.svg', '');
        splinter = splinter.replace('icon-element-', '');
        return splinter;
      }

      const previousTeamsDivs = document.querySelector('.recently-played-splinters__list').querySelectorAll('.recent-team');

      const data = [...previousTeamsDivs].map((teamDiv) => {
        const splinter = getSplinterFromUrl(teamDiv.querySelector('img').src);
        const monsters = [...teamDiv.querySelector('ul').querySelectorAll('li')].map(monsterLi => getMonsterNameFromLi(monsterLi.textContent.trim()));
        return {
          splinter: splinter,
          monsters: monsters
        }
      });
      return data;
    });
  }

  async function getBattleResults(page) {
    let resultsData = await page.evaluate(() => {

      const players = [...document.querySelectorAll('.player')].map(playerEl => playerEl.querySelector('.bio__name__display').textContent.trim());
      // [...document.querySelectorAll('div')] will convert StaticNodeList to Array of items - allows you to use .map()
      const opponent = players.filter(player => player !== 'hvcminer')[0];

      // if result is a draw the winner won't be declared
      let winner;
      let dec = 0;
      try {
        winner = document.querySelector('.player.winner').querySelector('.bio__name__display').textContent.trim();
        console.log(winner);
        if (winner === 'hvcminer') {
          dec = parseFloat(document.querySelector('.player.winner').querySelector('.dec-reward').querySelector('span').textContent.trim());
        }
      } catch (e) {
        winner = 'draw';
      }

      console.log('results from get battle results', {
        opponent: opponent,
        winner: winner,
        dec: dec
      });

      return {
        opponent: opponent,
        winner: winner,
        dec: dec
      }
    });

    console.log('results', resultsData);

    return resultsData;
  }



  async function getSplinters(page) {

    const splinters = await page.evaluate(async () => {
      function getMyTeam() {
        const team1Player = document.getElementById('t1_portrait').querySelector('.bio__name__display').textContent;
        const team2Player = document.getElementById('t2_portrait').querySelector('.bio__name__display').textContent;
        let hvcMinerTeam;
        if (team1Player === 'hvcminer') {
          hvcMinerTeam = 'team1';
        } else {
          hvcMinerTeam = 'team2';
        }
        return hvcMinerTeam;
      }

      function getSplinterOfTeam(position) {
        // 0 for team 1, 1 for team 2
        const color = document.querySelectorAll('canvas')[position].style.boxShadow.split(" ")[0];
        if (color === 'red') {
          return 'fire';
        } else if (color === 'blue') {
          return 'water';
        } else if (color === 'green') {
          return 'earth';
        } else if (color === 'purple') {
          return 'death';
        } else if (color === 'rgb(187,') {
          return 'life';
        } else {
          return 'dragon';
        }
      }

      let hvcMinerSplinter;
      let opponentSplinter;
      if (getMyTeam() === 'team1') {
        hvcMinerSplinter = getSplinterOfTeam(0);
        opponentSplinter = getSplinterOfTeam(1);
      } else {
        hvcMinerSplinter = getSplinterOfTeam(1);
        opponentSplinter = getSplinterOfTeam(0);
      }

      return ({
        hvcminerSplinter: hvcMinerSplinter,
        opponentSplinter: opponentSplinter
      });

    });
    return splinters;
  }

  async function getBattleRule(page) {
    return await page.evaluate(() => {
      let rule = document.querySelector('.combat__conflict').querySelector('img').src;
      rule = rule.replace('https://d36mxiodymuqjm.cloudfront.net/website/icons/rulesets/new/img_combat-rule_', '');
      rule = rule.replace('_150.png', '');
      rule = rule.replaceAll('-', ' ');
      return rule;
    });
  }

  async function getManaCap(page) {
    return await page.evaluate(() => {
      return parseInt(document.querySelector('.modal-dialog.modal-lg').querySelector('.mana-cap__icon').querySelector('div').firstElementChild.textContent.trim());
    });
  }

  async function getCardsUsed(page) {

    let cardData = await page.evaluate(async () => {

      function getCardNamesFromDOM(team) {

        function getFormattedCardUrl(cardUrl) {
          cardUrl = cardUrl.replace('url(', '');
          cardUrl = cardUrl.replace(')', '');
          cardUrl = cardUrl.slice(0, -1); // remove last letter (starting pt, # of removes)
          cardUrl = cardUrl.substring(1); // returns the second letter to end (remove first letter)
          return cardUrl;
        }

        let teamCards = document.querySelectorAll('.battle-log-entry__team')[team].querySelectorAll('.team__monster'); // list of <li> which contain info card name and card image url
        teamCards = [...teamCards].map(card => {
          let cardName;
          let cardUrl;
          try {
            cardName = card.querySelector('.team__monster__name').textContent.trim();
            cardUrl = getFormattedCardUrl(card.querySelector('.team__monster__name').style.backgroundImage);
          } catch (e) {
            cardName = "";
            cardUrl = "";
          }
          return { cardName: cardName, cardUrl: cardUrl };
        });
        return teamCards;
      }

      function getMyTeam() {
        const teamOneName = document.querySelector('.battle-log-entry__team').querySelector('.bio__name__display').textContent.trim();
        let hvcminerTeam;
        if (teamOneName === 'hvcminer') {
          hvcminerTeam = 'one';
        } else {
          hvcminerTeam = 'two';
        }
        return hvcminerTeam;
      }

      const teamOneCards = getCardNamesFromDOM(0);
      const teamTwoCards = getCardNamesFromDOM(1);
      let hvcminerTeam;
      let opponentTeam;

      if (getMyTeam() === 'one') {
        hvcminerTeam = teamOneCards;
        opponentTeam = teamTwoCards;
      } else {
        hvcminerTeam = teamTwoCards;
        opponentTeam = teamOneCards;
      }

      return {
        hvcminerTeam: hvcminerTeam,
        opponentTeam: opponentTeam
      }
    });

    return cardData;
  }

  async function playBattle(page, splinterChoice) {

    console.log('starting a battle');

    await page.click('#battle_category_btn');

    await page.waitForTimeout(3000);

    // accept the battle with the create team button
    await page.waitForSelector('.btn.btn--create-team', { timeout: 250000 });
    await page.waitForTimeout(3000);


    const battleRule = await getBattleRule(page);
    const manaCap = await getManaCap(page);
    const enemyPreviousMatchData = await getEnemyPreviousMatchData(page);
    const availiableSplinters = await getAvailiableSplinters(page);
    console.log('Mana cap recieved at start of battle', manaCap);

    await page.click('.btn.btn--create-team');

    await page.waitForTimeout(1000);

    // choose a summoner

    let summoner;
    if (enemyPreviousMatchData.length !== 0) {
      summoner = await pickSummoner(page, availiableSplinters, splinterChoice, enemyPreviousMatchData[enemyPreviousMatchData.length - 1].splinter, manaCap, battleRule);
    } else {
      summoner = await pickSummoner(page, availiableSplinters, splinterChoice, null, manaCap, battleRule);
      // default to best
    }

    console.log('chosen summoner : ' + summoner.name);
    await page.waitForTimeout(1000);

    // pick cards

    const manaRemaining = await pickCards(page, summoner.mana);

    // click battle

    await page.evaluate(() => {
      const startBattleBtn = document.querySelector('.btn-green');
      startBattleBtn.click();
    });

    await page.waitForSelector('#btnRumble', { timeout: 210000 }); // instead wait for the match to actually load (this takes you to the animation)

    await page.waitForTimeout(10000);
    await clickRumbleButton(page);

    // const cardsFromBattle = await getCardsUsed(page);
    const splinters = await getSplinters(page);

    await clickSkipButton(page, 0);

    // click on close button
    await page.waitForSelector('.btn.btn--done', { timeout: 250000 });

    const battleResults = await getBattleResults(page);

    await page.waitForTimeout(6000);
    await clickCloseBattleButton(page);

    await page.waitForTimeout(2000);

    const cardsFromBattle = await getCardsUsed(page);

    await page.waitForTimeout(1000);

    return {
      ...cardsFromBattle,
      ...battleResults,
      ...splinters,
      previousOpponentMatches: enemyPreviousMatchData,
      rule: battleRule,
      manaCap: manaCap,
      manaRemaining: manaRemaining,
      hvcMinerSummoner: summoner,
      timestamp: Date.now(),
      mode: splinterChoice,
    }

  }

  return await playBattle(page, splinterChoice);

}

export default battle