import { Card, Row, Col, Input } from 'antd';
import millify from 'millify';
import React from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader';

const Cryptocurrencies = ({simplified}) => {
  const count = simplified ? 10 : 100;
  const {data: cryptosList, isFetching} = useGetCryptosQuery(count);

  if (isFetching) return <Loader/>;
  return (
    <>
    {!simplified &&(
      <div className="search-crypto">
        
      </div>
    )}
    </>
  )
}

export default Cryptocurrencies