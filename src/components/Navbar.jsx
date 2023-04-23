import React, { useEffect, useState } from 'react';
import {Typography, Avatar, Menu} from "antd";
import {Link} from "react-router-dom";
import logo from "../images/logo.png";
import { HomeOutlined, BulbOutlined, MoneyCollectOutlined, FundOutlined } from '@ant-design/icons';
import MenuItem from 'antd/es/menu/MenuItem';

const Navbar = () => {
  //to check if menu is open or not
  const [activeMenu, setActiveMenu] = useState(false);
  // to store the screen size value
  const [screenSize, setScreenSize] = useState(undefined);

  //useffect to trigger handleResize function at mount for once as [] and then to remove it when the component unmounts
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();  
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  //triggeres everytime screenSize changes
  useEffect(() => {
    if(screenSize<= 800){
      setActiveMenu(false);
    }
    else{
      setActiveMenu(true);
    }
  }, [screenSize]);

  // sepearte the menu item in a constant js file
 const menuItem = [
  {
    key: 'home',
    icon: (<HomeOutlined/>),
    label : (<Link to='/'>Home</Link>),
  },
  {
    key: 'cryptocurrencies',
    icon: (<FundOutlined/>),
    label :(<Link to='/cryptocurrencies'>Cryptocurrencies</Link>),
  },
  {
    key: 'exchanges',
    icon: (<MoneyCollectOutlined/>),
    label :(<Link to='/exchanges'>Exchanges</Link>),
  },
  {
    key: 'news',
    icon: (<BulbOutlined/>),
    label :(<Link to='/news'>News</Link>),
  },
]
  return (
    <div className='nav-container'>
      <div className="logo-container">
        <Avatar src={logo}/>
        <Typography.Title level={3} className='logo'>
         <Link to="/">Cryptomania</Link>
        </Typography.Title>
        </div>
        {activeMenu && (
        <Menu theme='dark' items={menuItem}>
        </Menu>)}
      </div>
  )
}

export default Navbar
