function isOnSameWeek(iter, timestamp) {
  // timestamp is timestamp from firestore

  const today = new Date()

  const pastDate = new Date().setDate(today.getDate() - iter)
  const pastDateMinus7 = new Date().setDate(today.getDate() - iter - 7)

  if (pastDateMinus7 <= timestamp && timestamp <= pastDate) {
    return true
  }
  else
    return false
}

console.log('checking', new Date(1622141887100)) // May(5) 27

for (let i = 14; i >= 0; i -= 7) {
  let today = new Date()
  console.log('past date', today)

  const res = isOnSameWeek(i, 1622141887100)
  console.log()
  // console.log(past)
  console.log(res)
}