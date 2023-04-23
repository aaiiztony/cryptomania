import { Col, Row, Typography, Select } from 'antd';
import millify from 'millify';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {MoneyCollectOutlined,  DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import {useGetCryptoDetailsQuery, useGetCryptoHistoryQuery} from '../services/cryptoApi';
import Loader from './Loader';
const {Title, Text} = Typography;
const {Option} = Select;

const CryptoDetails = () => {
  // extracting coinId from the url of the site as /:coinId in route (App.jsx)
  const {coinId}  = useParams();
  
  const [timeperiod, setTimeperiod] = useState('7d');
  const {data, isFetching} = useGetCryptoDetailsQuery(coinId);


  const CryptoDetails = data?.data.coin;
  console.log(CryptoDetails);
  if(isFetching)return <Loader/>

  return (
    <Col
    className='coin-detail-container'>
    </Col>
  )
}

export default CryptoDetails

