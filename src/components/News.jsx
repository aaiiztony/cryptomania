import { Select, Typography, Row, Col, Card } from 'antd';
import moment from 'moment/moment';
import React, {useState} from 'react';
import Loader from './Loader';
import {useGetCryptosQuery} from '../services/cryptoApi';
import {useGetCryptosNewsQuery} from '../services/cryptoNewsApi';

const {Text, Title} = Typography;
const {Option} = Select;

const News = ({simplified}) => {
  const {data} = useGetCryptosQuery(100);
  const [newsCategory,setNewsCategory] = useState('BTC')
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
          style={{width: "min(400px, 100%)"}}
          onChange={(value)=> setNewsCategory(value)}
          filterOption={(input, option)=> option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
            <Option value='Cryptocurrency'>Cryptocurrency</Option>
            {data?.data?.coins?.map((coin, i)=>(<Option key={`${coin.name}+${i}`} value={coin.name}>{coin.name}</Option>))}
          </Select>
          </div>
        </Col>
      )}
      {newsData.news.map((news, i)=>(
        <Col
        xs={24}
        sm={12}
        lg={8}
        key={`${news.Title}+${i}`}>
        <Card
        hoverable
        className='news-card'
        style={{height:"min(300px, 30vh)"}}>
          <a
          href={news.Url}
          target='_blank'
          rel='noreferrer'
          >
          <div className="flexbox">
               <img 
              src={news?.Image}
              style={{display:`${!(news?.Image)?"none":"block"}`}}
              className='og-img'  
              alt='news_image'/>
              <Title
              className='news-title'
              style={{width:`${!(news?.Image)?"100%":"normal"}`}}
              level={4}
              >
                {news.Title.slice(0,50)+'...'}
              </Title>
              <div className="provider-container">
                <div>
                  {/* <Avatar src={news?.Image} alt={`${news.Title}-avatar`}></Avatar>&nbsp; */}
                  <Text>{moment(news.PublishedOn).startOf('ss').fromNow()}</Text>
                </div>
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