import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Navbar , Homepage, CryptoDetails, Cryptocurrencies, News, Exchanges} from "./components";
import { Layout, Typography, Space } from "antd";
import "./App.css";

const App = () => {
  return (
    <>
      <div className="app">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="main">
            <Layout style={{background:"#e6f7ff"}}>
              <div className="routes">
                <Routes>
                  <Route exact path="/" element={<Homepage/>}/>
                  <Route exact path="/exchanges" element={<Exchanges/>}/>
                  <Route exact path="/cryptocurrencies" element={<Cryptocurrencies/>}/>
                  <Route exact path="/crypto/:coinId" element={<CryptoDetails/>}/>
                  <Route exact path="/news" element={<News/>}/>
                </Routes>
              </div>
            </Layout>
      <hr style={{margin:'0 1.5rem'}}/>
        <div className="footer" style={{background:"#e6f7ff"}}>
        <Typography.Title level={5} style={{textAlign: 'center'}}>Copyright © 2023 &nbsp;
          <Link to="/">
            Cryptomania Inc.
          </Link> <br />
          All Rights Reserved.
        </Typography.Title>
        <Space>
          <Link to="/">Home</Link>
          <Link to="/exchanges">Exchanges</Link>
          <Link to="/news">News</Link>
        </Space>
        </div>
        </div>
      </div>
    </>
  );
};

export default App;
