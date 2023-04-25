import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment/moment';
import React, {useState} from 'react';
import Loader from './Loader';
import {useGetCryptosQuery} from '../services/cryptoApi';
import {useGetCryptosNewsQuery} from '../services/cryptoNewsApi';

const {Text, Title} = Typography;
const {Option} = Select;

const News = ({simplified}) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');

  const {data} = useGetCryptosQuery(100);
  const {data : newsData, isFetching} = useGetCryptosNewsQuery({category:newsCategory, count:simplified?6:12});

  if (isFetching) return <Loader/>
  return (
    <Row gutter={[24,24]}>
      {!simplified &&(
        <Col span={24}>
          <div className="select-news">
          <Select
          showSearch
          placeholder="Select a Crypto"
          optionFilterProp="children"
          onChange={(value)=> setNewsCategory(value)}
          filterOption={(input, option)=> option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
            <Option value='Cryptocurrency'>Cryptocurrency</Option>
            {data?.data?.coins?.map((coin, i)=>(<Option key={`${coin.name}+${i}`} value={coin.name}>{coin.name}</Option>))}
          </Select>
          </div>
        </Col>
      )}
      {newsData.value.map((news, i)=>(
        <Col
        xs={24}
        sm={12}
        lg={8}
        key={`${news.url}+${i}`}>
        <Card
        hoverable
        className='news-card'>
          <a
          href={news.url}
          target='_blank'
          rel='noreferrer'>
            <div className="news-image-container">
              <Title
              className='news-title'
              level={4}
              >
                {news.name}
              </Title>
              <img src={news?.image?.thumbnail?.contentUrl} className='og-img'  alt=''/>
              </div>
              <p>{news.description.length>100?`${news.description.substring(0, 100)}...` : news.description}</p>
              <div className="provider-container">
                <div>
                  <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl} alt={`${news.name}-avatar`}></Avatar>&nbsp;
                  <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                </div>
              </div>
          </a>
        </Card>
        </Col>
      ))}
    </Row>
  )
}

export default News