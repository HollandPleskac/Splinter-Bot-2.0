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
  return (
    <DashboardNavigation>
      <div className="h-dashContent flex flex-col justify-center items-center">

        <div className='flex' >
          <div style={{ width: 500 }} >
            <MatchesLineChart />
          </div>
          <div style={{ width: 500, height: 240 }} >
            <WinRatioBarChart />
          </div>
        </div>
      </div>
    </DashboardNavigation>
  );
};

const MatchesLineChart = () => {

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

const WinRatioBarChart = () => {

  const [winPercentagesList, setWinPercentagesList] = useState([])
  const [lossPercentagesList, setLossPercentagesList] = useState([])

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
    const today = new Date()
    today.setHours(0)
    today.setMinutes(0)
    today.setSeconds(0)
    const date6DaysAgo = today.setDate(today.getDate() - 6)
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
  }, [])

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
    <Bar
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
  );
};

export default Statistics;
