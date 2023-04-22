import React from 'react';
import {Typography, Avatar} from "antd";
import {Link} from "react-router-dom";

const Navbar = () => {
  return (
    <div className='nav-container'>
      <div className="logo-container">
        <Avatar />
        <Typography.Title level={3} className='logo'>
         
        </Typography.Title>
      </div>
    </div>
  )
}

export default Navbar
