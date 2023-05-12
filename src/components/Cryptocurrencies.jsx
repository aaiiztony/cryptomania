import { Card, Row, Col, Input } from 'antd';
import millify from 'millify';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { SearchOutlined } from '@ant-design/icons';
import Search from 'antd/es/input/Search';

const Cryptocurrencies = ({simplified}) => {
  //count var to display only 10 cards when the component mounts
  const count = simplified ? 10 : 100;

  // extracting cryptosList array from the data and the isFetching state 
  const {data: cryptosList, isFetching} = useGetCryptosQuery(count);

  //cryptos var to store the data
  const [cryptos, setCryptos] = useState();

  //to store the user search-input
  const [searchTerm, setSearchTerm] = useState('');

  //useeffect runs whenever cryptosList (Showmore link) or the searchterm (input element) is triggered
  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);
    
    //using tolowercase to morph user input string into lowercase so that we don't miss keywords if capslocked
    const filteredData = cryptosList?.data?.coins.filter((i)=> i.name.toLowerCase().includes(searchTerm));

    setCryptos(filteredData);
  
  }, [cryptosList, searchTerm])
  
  if (isFetching) return <Loader/>;
  return (
    <>
      {!simplified &&(
        <div className="search-crypto">
        <Search
        placeholder='Search Crypto'
        onChange={(e)=> setSearchTerm(e.target.value.toLowerCase())}
        />
      </div>
      )}
      <Row gutter={[64,32]} className='crypto-card-container'>
        {cryptos?.map((currency)=>(
          <Col key={currency.uuid}
          xs={24}
          sm={12}
          lg={6}
          className='crypto-card'>
          <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
          <Card
          title={`${currency.rank}. ${currency.name}`}
          style={{background:"#b5ddff", borderRadius:"1.15rem"}}
          hoverable
          extra={
          <img 
          className='crypto-image'
          src={currency.iconUrl}
          />}>
            <p>Price : {(currency.price>1000)?"(":''}{millify(currency.price)}{(currency.price>1000)?")":''} $</p>
            <p>Market Cap : {millify(currency.marketCap)}</p>
            <p>Daily Change : {millify(currency.change)} %</p>
          </Card>
          </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies