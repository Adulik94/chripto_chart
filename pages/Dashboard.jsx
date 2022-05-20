import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    PointElement,
    Title,
    Tooltip
} from 'chart.js'
import DashboardWrapper, { DashboardWrapperMain } from '../components/dashboard-wrapper/DashboardWrapper'
import React ,{useEffect, useState} from 'react'

import { Bar } from 'react-chartjs-2'
import Box from '../components/box/Box'
import Doughnut from './Doughnut'
import Line from './Line'
import TableCrypto from './Table'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
)



const Dashboard = () => {
    return (
        <DashboardWrapper>
            <DashboardWrapperMain>
            <div className="row">
                    <div className="col-8 col-md-12">
                    <Box>
                        <RevenueByMonthsChart />
                    </Box>

                     <Box>    
                        <div className="col-6 col-md-6 col-sm-12 mb">
                            <Doughnut/>
                        </div>
                    </Box>
                    <Box>
                    <Line/>

                    </Box>

                    </div>
                </div>
                {/* <div className="row">
                    <div className="col-8 col-md-12">
                        <div className="row">
                            {
                                data.summary.map((item, index) => (
                                    <div key={`summary-${index}`} className="col-6 col-md-6 col-sm-12 mb">
                                        <SummaryBox item={item} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="col-4 hide-md">
                        <SummaryBoxSpecial item={data.revenueSummary} />
                    </div>
                </div> */}
                <TableCrypto/>
            </DashboardWrapperMain>
        </DashboardWrapper>
    )
}

export default Dashboard

const RevenueByMonthsChart = () => {
    const [chart, setChart] = useState({})
    let baseUrl = "https://api.coinranking.com/v2/coins/?limit=10";
    let proxyUrl = "https://cors-anywhere.herokuapp.com/";
    let apiKey = "coinranking18b923345a41f9bc02d3160178d8d65a0ef5dde4947696a5";
  
  
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
      fetchCoins()
    }, [baseUrl, proxyUrl, apiKey]);

    let data = {
        labels: chart?.coins?.map(x => x.name),
        datasets: [{
          label: `${chart?.coins?.length} Coins Available`,
          data: chart?.coins?.map(x => x.price),
          backgroundColor: [
            '#8624DB',
            '#4CAF50',
            '#3D33C9',
            '#FFEB35',
            '#645D90',
            '#FF0A02'
          ],
          borderColor: [
            '#8624DB',
            '#4CAF50',
            '#3D33C9',
            '#FFEB35',
            '#645D90',
            '#FF0A02'
          ],
          borderWidth: 1
        }]
      };
    let options = {
        maintainAspectRatio: false,
        scales: {
        },
        legend: {
          labels: {
            fontSize: 25,
          },
        }
      };
    return (
        <>
            <div className="title mb">
                Revenue by months
            </div>
            <div>
            <Bar data={data} height={400} options={options} />
            </div>
        </>
    )
};