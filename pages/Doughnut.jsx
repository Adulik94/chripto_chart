import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react'

import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


const DoughnutChart = () => {
  const [chart, setChart] = useState({})
  const baseUrl = "https://api.coinranking.com/v2/coins/?limit=10";
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiKey = "coinranking18b923345a41f9bc02d3160178d8d65a0ef5dde4947696a5";



  useEffect(() => {
    const fetchCoins = async () => {
      await fetch(`${proxyUrl}${baseUrl}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `${apiKey}`,
          'Access-Control-Allow-Origin': "*"
        }
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((json) => {
              console.log(json.data);
              setChart(json.data)
            });
          }
        }).catch((error) => {
          console.log(error);
        });
    };
    fetchCoins().then(r => console.log(r))
  }, [baseUrl, proxyUrl, apiKey])

  console.log("chart", chart);
  const data = {
    labels: chart?.coins?.map(x => x.name),
    datasets: [{
      label: `${chart?.coins?.length} Coins Available`,
      data: chart?.coins?.map(x => x.price),
      backgroundColor: [
        '#8624DB',
        '#4CAF50',
        '#3D33C9',
        '#D2691E',
        '#645D90',
        '#FF0A02'
      ],
      borderColor: [
        '#8624DB',
        '#4CAF50',
        '#3D33C9',
        '#D2691E',
        '#645D90',
        '#FF0A02'
      ],
      borderWidth: 2
    }]
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
    },
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  }

  return (
    <div>
      <Doughnut
        data={data}
        height={400}
        options={options}
      />
    </div>
  )
}

export default DoughnutChart