import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import DashboardNavigation from "../components/dashboardNavigation";
import firebase from 'firebase/app'
import 'firebase/firestore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import PuffLoader from 'react-spinners/PuffLoader'

const getLast7Days = () => {
  let result = []
  for (let i = 6; i >= 0; i--) {
    let d = new Date()
    d.setDate(d.getDate() - i)
    result.push(d.toLocaleDateString("en-US", { weekday: "short" }))
  }
  return result
};


const Statistics = () => {

  const [dataDuration, setDataDuration] = useState('Last Week')

  const setDuration = () => {
    setDataDuration(prevState => {
      return prevState === 'Last Week' ? 'Last Month' : 'Last Week'
    })
  }

  return (
    <DashboardNavigation>
      <div className="h-dashContent flex flex-col justify-center items-center">
        <div className='flex justify-end py-4' style={{ width: 1000 }}>
          <DropdownBtn duration={dataDuration} changeDuration={setDuration} />
        </div>
        <div className='flex' >
          <div style={{ width: 500, height: 240 }} >
            <MatchesLineChart duration={dataDuration} />
          </div>
          <div style={{ width: 500, height: 240 }} >
            <WinRatioBarChart duration={dataDuration} />
          </div>
        </div>
      </div>
    </DashboardNavigation>
  );
};

const DropdownBtn = (props) => {
  const [showDropdown, setShowDropdown] = useState(false)

  const dropdownBtnHandler = () => {
    setShowDropdown(prevState => !prevState)
  }

  const dropdownOptionHandler = () => {
    setShowDropdown(prevState => !prevState)
    props.changeDuration()
  }

  return (
    <div className='relative' >
      <button onClick={dropdownBtnHandler} className='px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition ease-in duration-100 focus:outline-none focus:bg-blue-700' >
        {props.duration}
        <FontAwesomeIcon className='ml-2' icon={faCaretDown} />
      </button>
      {
        showDropdown &&
        <div className='absolute w-40 mt-2 py-2 bg-white shadow-xl rounded' >
          <div onClick={dropdownOptionHandler} className='p-2 cursor-pointer hover:bg-gray-50 hover:text-blue-600 transition ease-in duration-100'>
            {props.duration === 'Last Week' ? 'Last Month' : 'Last Week'}
          </div>
        </div>
      }
    </div>
  )
}


const MatchesLineChart = (props) => {

  const [matchesList, setMatchesList] = useState([])
  const [loading, setLoading] = useState(true)

  function isOnSameDay(timestamp1, timestamp2) {
    const day1 = new Date(timestamp1).toString().split(' ')[0];
    const day2 = new Date(timestamp2).toString().split(' ')[0];
    if (day1 === day2)
      return true;
    else
      return false;
  }

  function isInSameWeek(iter, timestamp) {
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

  // count matches that happen per day, count matches that happen per week
  const getMatchData = async (duration) => {
    const matchesPerDuration = []

    const today = new Date()
    today.setHours(0)
    today.setMinutes(0)
    today.setSeconds(0)
    const todayMinusDuration = today.setDate(today.getDate() - (props.duration === 'Last Week' ? 6 : 21))


    await firebase.firestore().collection('Battle Log').where('timestamp', '>=', todayMinusDuration).get().then(querySnapshot => {
      // count from 1 week ago or 1 month ago
      let start = 6
      let decrement = 1
      if (duration === 'Last Month') {
        start = 21
        decrement = 7
      }

      for (let i = start; i >= 0; i -= decrement) {
        const day = new Date().setDate(new Date().getDate() - i)
        let matches = 0

        querySnapshot.forEach(doc => {
          let checkDuration = isOnSameDay.bind(null, day, doc.data().timestamp)
          if (duration === 'Last Month')
            checkDuration = isInSameWeek.bind(null, i, doc.data().timestamp)

          if (checkDuration()) {
            matches++
          }
        })
        matchesPerDuration.push(matches)
      }
    })

    setMatchesList(matchesPerDuration)
  }

  useEffect(async () => {
    setLoading(true)
    await getMatchData(props.duration)
    await new Promise(r => setTimeout(r, 200));
    setLoading(false)
  }, [props.duration])

  const data = {
    labels: props.duration === 'Last Week' ? getLast7Days() : ['Week 4', 'Week 3', 'Week 2', 'Week 1'],
    datasets: [
      {
        label: "Matches Played",
        data: matchesList,
        fill: false,
        backgroundColor: "#2563EB",
        borderColor: "rgba(37, 99, 235, 0.2)",
      },
    ],
  };

  return (
    <>
      {
        loading
          ? <div className='flex justify-center items-center' style={{ height: 240 }}> <PuffLoader color='#2563EB' /> </div>
          : <Line
            data={data}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Matches Played",
                  padding: {
                    bottom: 30
                  }
                },
                legend: {
                  display: true,
                  position: "bottom",
                  labels: {
                    pointStyle: "rectRounded",
                    usePointStyle: true,
                  },
                },
              },
            }}
          />
      }
    </>
  );
};

const WinRatioBarChart = (props) => {
  const [winPercentagesList, setWinPercentagesList] = useState([])
  const [lossPercentagesList, setLossPercentagesList] = useState([])
  const [loading, setLoading] = useState(true)

  const setWinsList = (winner, splinter, wins) => {
    if (winner === 'hvcminer')
      return
    if (splinter === 'fire') {
      wins[0]++
    } else if (splinter === 'water') {
      wins[1]++
    } else if (splinter === 'earth') {
      wins[2]++
    } else if (splinter === 'life') {
      wins[3]++
    } else if (splinter === 'death') {
      wins[4]++
    } else if (splinter === 'dragon') {
      wins[5]++
    } else if (splinter === 'random') {
      wins[6]++
    } else if (splinter === 'best') {
      wins[7]++
    }
  }

  useEffect(async () => {
    setLoading(true)
    const today = new Date()
    today.setHours(0)
    today.setMinutes(0)
    today.setSeconds(0)
    const durationDays = props.duration === 'Last Week' ? 6 : 30
    const dateInPast = today.setDate(today.getDate() - durationDays)
    let matchesPlayed = 0
    let wins = [0, 0, 0, 0, 0, 0, 0, 0]

    await firebase.firestore().collection('Battle Log').where('timestamp', '>=', dateInPast).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        matchesPlayed++
        setWinsList(doc.data().winner, doc.data().mode, wins)
      })
    })

    const winPercentage = (wins) => {
      const winPercentPerSplinter = wins / matchesPlayed
      return Math.round(winPercentPerSplinter * 100) / 100 // [0.32,0.55,etc] rounded to 2 decimals Math.round(num*100)/100
    }

    const lossPercentage = (winPercentage) => {
      if (winPercentage !== 0)
        return 1 - winPercentage
      else
        return 0
    }

    setWinPercentagesList(wins.map(i => winPercentage(i)))
    setLossPercentagesList(wins.map(i => lossPercentage(winPercentage(i))))
    await new Promise(r => setTimeout(r, 200));
    setLoading(false)
  }, [props.duration])
  const data = {
    labels: ['Fire', 'Water', 'Earth', 'Life', 'Death', 'Dragon', 'Random', 'Best'],
    datasets: [
      {
        label: 'win percentage',
        data: winPercentagesList,
        backgroundColor: '#3B82F6'
      },
      {
        label: 'loss percentage',
        data: lossPercentagesList,
        backgroundColor: '#EF4444'
      }
    ]
  }
  return (
    <>
      {
        loading ? <div className='flex justify-center items-center' style={{ height: 240 }}> <PuffLoader color='#2563EB' /> </div>
          : <Bar
            data={data}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: 'Match Percentages',
                  padding: {
                    bottom: 30
                  }
                },
                legend: {
                  display: true,
                  position: 'bottom',
                  labels: {
                    pointStyle: 'rectRounded',
                    usePointStyle: true,
                  }
                }
              },
              maintainAspectRatio: false,
              scales: {
                x: {
                  stacked: true,
                },
                y: {
                  stacked: true,
                }
              }
            }}
          />
      }
    </>
  )
};


export default Statistics;
