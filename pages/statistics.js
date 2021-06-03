// really should render the data on the server side - get rid of that gitching


import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import DashboardNavigation from "../components/dashboardNavigation";
import firebase from 'firebase/app'
import 'firebase/firestore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

function isOnSameDay(timestamp1, timestamp2) {
  const day1 = new Date(timestamp1).toString().split(' ')[0];
  const day2 = new Date(timestamp2).toString().split(' ')[0];
  if (day1 === day2)
    return true;
  else
    return false;
}


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
          <div style={{ width: 500 }} >
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

  const getLast7Days = () => {
    let result = [];
    for (let i = 6; i >= 0; i--) {
      let d = new Date();
      d.setDate(d.getDate() - i);
      result.push(d.toLocaleDateString("en-US", { weekday: "short" }));
    }
    return result;
  };

  const setMatchData = async () => {
    const matchesPerDay = []

    const today = new Date()
    today.setHours(0)
    today.setMinutes(0)
    today.setSeconds(0)
    const date6DaysAgo = today.setDate(today.getDate() - 6)


    await firebase.firestore().collection('Battle Log').where('timestamp', '>=', date6DaysAgo).get().then(querySnapshot => {
      for (let i = 6; i >= 0; i--) {
        // get day
        const today = new Date()
        const day = today.setDate(today.getDate() - i)
        // get wins
        let matches = 0

        querySnapshot.forEach(doc => {
          if (isOnSameDay(day, doc.data().timestamp)) {
            matches++
          }
        })
        matchesPerDay.push(matches)
      }
    })

    setMatchesList(matchesPerDay)
  }

  useEffect(() => {
    setMatchData()
  }, [])

  const data = {
    labels: getLast7Days(),
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
    <div>
      <Line
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
    </div>
  );
};

// SOLUTION : Have a loading state

const WinRatioBarChart = (props) => {
  console.log('re render', props.duration)

  const [winPercentagesList, setWinPercentagesList] = useState([2, 3, 3])
  const [lossPercentagesList, setLossPercentagesList] = useState([23, 3, 3])
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
    const date6DaysAgo = today.setDate(today.getDate() - durationDays)
    let matchesPlayed = 0
    let wins = [0, 0, 0, 0, 0, 0, 0, 0]

    await firebase.firestore().collection('Battle Log').where('timestamp', '>=', date6DaysAgo).get().then(querySnapshot => {
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
        loading ? <div></div>
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
