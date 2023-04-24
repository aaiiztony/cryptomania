import { Col, Typography, Row} from 'antd';
import React from 'react';
import  { Line } from 'react-chartjs-2';


const {Title} = Typography;

const Linechart = ({coinHistory, currentPrice, coinName}) => {
  //empty var to store coin-prices
  const coinPrice = [];
  //empty var to store coin intervals
  const coinTimeStamp = [];
  
  for (let i=0; i<coinHistory?.data?.history?.length; i+=1){
    coinPrice.push(coinHistory?.data?.history[i].price)
  }
  
  for (let i=0; i<coinHistory?.data?.history?.length; i+=1){
    coinTimeStamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString());
  }
  //data array to pass to the Line 
  const data = {
    labels: coinTimeStamp,
    datasets: [
      {
        label:'Price in USD',
        data: coinPrice,
        fill:false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  //options object to pass to the Line 
  const options = {
    scales : {
      yAxes: [ 
        {  
          ticks:{        
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
    <Row className="chart-header">
      <Title level={3} className='chart-title'>{coinName} Price Chart</Title>
      <Col className="price-container">
        <Title level={3} className='price-change'>Change : {coinHistory?.data?.change}%</Title>
        <Title level={3} className='current-price'>Current {coinName} Price: ${currentPrice}</Title>
      </Col>
    </Row>
    {/* <Line data={data} options={options}/> */}
    </>
  )
}

export default Linechart