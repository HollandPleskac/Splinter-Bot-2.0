import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import DashboardNavigation from "../components/dashboardNavigation";
import firebase from 'firebase/app'
import 'firebase/firestore'

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
      <div className="h-dashContent flex justify-center items-center">
        <div style={{ width: 500 }} >
          <MatchesLineChart />
        </div>
        <div style={{ width: 500, height: 240 }} >
          <WinRatioBarChart />
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




// ------------------------------------- TODO -----------------------------------------------

  // date 8 days ago needs to be date 7 days ago at 1:01am in the morning to properly calulate days
  // broken rn because last weeks matches get added to the current day's matches

//






  const setMatchData = async () => {
    const matchesPerDay = []

    const d = new Date()
    const date8DaysAgo = d.setDate(d.getDate() - 8)

    await firebase.firestore().collection('Battle Log').where('timestamp', '>=', date8DaysAgo).get().then(querySnapshot => {
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

  useEffect(async () => {
    await setMatchData()
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
      <button onClick={() => { console.log(matchesList) }} >
        See matches data
      </button>
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

  const [wins, setWins] = useState([])
  const [losses, setLosses] = useState([])

  useEffect(() => {
    const date = new Date();
    const date7DaysAgo = date.setDate(date.getDate() - 7);
    firebase.firestore().collection('Battle Log').where('timestamp', '>=', date7DaysAgo).orderBy('timestamp').get(doc => {
      if (doc.data().winner === 'hvcminer')
        wins++
      else
        losses++
    })
  }, [wins, losses])

  const data = {
    labels: ['Fire', 'Water', 'Earth', 'Life', 'Death', 'Dragon', 'Random', 'Best'],
    datasets: [
      {
        label: 'win percentage',
        data: [0.5, 0.2, 0.3, 0.6, 0.2, 0.1, 0.3, 0.05],
        backgroundColor: '#3B82F6'
      },
      {
        label: 'loss percentage',
        data: [0.5, 0.8, 0.7, 0.4, 0.8, 0.9, 0.7, 0.95],
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
