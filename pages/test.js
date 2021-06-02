import React from 'react';
import { Line, Bar } from 'react-chartjs-2';

// Line Chart

const data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: 'Matches Played',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
};

const LineChart = () => (
  <>
    <div className='header'>
      <h1 className='title'>Line Chart</h1>
      <div className='links'>
        <a
          className='btn btn-gh'
          href='https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/Line.js'
        >
          Github Source
        </a>
      </div>
    </div>
    <div className='mb-40' style={{ width: '500px', height: '100px' }} >
      <Line data={data} options={{
        plugins: {
          title: {
            display: true,
            text: 'Testing',

          },
          legend: {
            display: true,
            position: 'right',
            labels: {
              pointStyle: 'circle',
              usePointStyle: true
            }
          }
        }
      }} />
    </div>
    <div className='bg-gray-50' style={{ width: '500px', height: '220px' }}>
      <BarChart />
    </div>
  </>
);


const BarChart = () => {
  const data2 = {
    labels: ['Fire', 'Water', 'Earth', 'Life'],

    datasets: [
      {
        label: 'wins',
        data: [0.5, 0.2, 0.3, 0.6],
        backgroundColor: 'rgb(255, 99, 132)'
      },
      {
        label: 'losses',
        data: [0.5, 0.8, 0.7, 0.4],
        backgroundColor: 'rgb(180, 140, 255)'
      }
    ]
  }
  return (
    <>
      <Bar
        pointStyle="star"
        data={data2}
        options={{
          maintainAspectRatio: false,

          scales: {
            x:
            {
              stacked: true,
            }
            ,
            y:
            {
              stacked: true,
            }
          }
        }}
      />
    </>
  )
}



export default LineChart;

// matches played and bar with win percentages (show numbers on bar too for accurate count)