import { Typography , Row, Col, Statistic} from 'antd'
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import {News, Cryptocurrencies, Loader} from '../components';
import millify from 'millify';
import LoadingBar from "react-top-loading-bar";
import { useState } from 'react';

const {Title} = Typography;
const Homepage = () => {
  //destructuring to colect data and isfetching state from the custom hook
  const {data, isFetching} = useGetCryptosQuery(10);

  // defining a varibale to store the data
  const globalStat = data?.data?.stats;

  //adding loader component while fetching data
  if (isFetching){return <Loader/>}
  return (
    <>
    {/* <LoadingBar
    color='red'
    progress={progress}
    onLoaderFinished={() => setProgress(0)}/> */}
     <Title level={3} className="heading">Statistics Worlwide</Title>
      <Row>
        <Col span={12}><Statistic title="Total Crypto" value={globalStat.total}/></Col>
        <Col span={12}><Statistic title="Total Market Cap" value={millify(globalStat.totalMarketCap)}/></Col>
        <Col span={12}><Statistic title="Total Exchanges" value={millify(globalStat.totalExchanges)}/></Col>
        <Col span={12}><Statistic title="Total 24h Volume" value={millify(globalStat.total24hVolume)}/></Col>
        <Col span={12}><Statistic title="Total Markets" value={millify(globalStat.totalMarkets)}/></Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className='home-title'>Top 10 Crypto Coins</Title>
        <Title level={3} className='show-more'><Link to="/cryptocurrencies">Show more</Link></Title>
      </div> 
      <Cryptocurrencies simplified/>
      <hr style={{margin:'2rem 0 0 0'}}/>
      <div className="home-heading-container">
        <Title level={2} className='home-title'>Latest Crypto News</Title>
        <Title level={3} className='show-more'><Link to="/news">Show more</Link></Title>
      </div> 
      <News simplified/>
    </>
  )
}

export default Homepage