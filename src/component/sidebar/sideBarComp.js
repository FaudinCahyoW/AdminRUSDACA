import React, { useState } from 'react';
import {NavLink } from 'react-router-dom';
import { UserOutlined, HomeOutlined, RightCircleOutlined, LeftCircleOutlined, DatabaseOutlined } from '@ant-design/icons';
// import "../../assets/style/sideBar.css"
import { Tooltip } from 'antd';

const SideBar = ({children}) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

 const  menuItem=[
  {
    path:"/",
    name:"Dashboard",
    icon: <HomeOutlined/>
  },
  {
    path:"/datawarga",
    name:"Data Rumah",
    icon: <DatabaseOutlined/>
  },
  {
    path:"/data/user",
    name:"Data Warga",
    icon:<UserOutlined/>
  }
 ]
 return(
  <div className='container' >
    <div className='sidebar' style={{width:isOpen ? "200px" : "50px"}}>
      <div className='top_section'>
        <img src={require('../../assets/images/Logo.png')} className='logo' style={{display:isOpen ? "block" : "none"}}/>
        <div className='bars' style={{marginLeft:isOpen ? "5px" : "0px"}}>

          <RightCircleOutlined style={{display:isOpen ? "none" : "block"}} onClick={toggle}/>
          <LeftCircleOutlined style={{display:isOpen ? "block" : "none"}} onClick={toggle}/>
        </div>
      </div>
      {
        menuItem.map((item, index)=>(
          <Tooltip  placement='right' title={item.name} key={index}>
            <NavLink to={item.path} key={index} className="link" activeclassName="active">
              <div className='icon'>{item.icon}</div>
              <div className='link_text' style={{display:isOpen ? "block" : "none"}}>{item.name}</div>
            </NavLink>
          </Tooltip>
        ))
      }
    </div>
    <main className='main' style={{width:isOpen? "100vw" : "100%"}}>{children}</main>
  </div>
 )
};


export default SideBar;