function getRandomSummoner(summonerChoices) {
  let randomSummoner = summonerChoices[Math.floor(Math.random() * summonerChoices.length)];
  return randomSummoner
}

function getRandomTank(cards, availiableMana) {
  let availiableTanks = cards.filter(card => {
    if (card.mana <= availiableMana && card.splinter !== 'neutral' && card.attackType !== 'ranged') {
      return card
    }
  })
  var randomTank = availiableTanks[Math.floor(Math.random() * availiableTanks.length)];
  return randomTank
  // card.mana <= availiableMana && card.splinter !== 'neutral' && card.attackType !== 'ranged'
}

console.log(getRandomSummoner(['summoner 1', 'summoner 2', 'summoner 3', 'summoner 4']))
console.log(getRandomTank(['card 1', 'card 2', 'card 3', 'card 4'], 9))