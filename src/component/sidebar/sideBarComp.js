import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  UserOutlined,
  HomeOutlined,
  RightCircleOutlined,
  LeftCircleOutlined,
  DatabaseOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
// import "../../assets/style/sideBar.css"
import { Tooltip } from "antd";

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const menuItem = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <HomeOutlined />,
    },
    {
      path: "/datawarga",
      name: "Data Rumah",
      icon: <DatabaseOutlined />,
    },
    {
      path: "/data/user",
      name: "Data Warga",
      icon: <UserOutlined />,
    },
  ];

  // handler logout (sesuaikan dengan kebutuhan, misalnya clear token / redirect login)
  const handleLogout = () => {
    console.log("User logged out");
    // contoh redirect manual:
    window.location.href = "/login";
  };

  return (
    <div className="container">
      <div
        className="sidebar"
        style={{
          width: isOpen ? "200px" : "50px",
          position: "relative",
          height: "100vh",
        }}
      >
        <div className="top_section">
          <img
            src={require("../../assets/images/Logo.png")}
            className="logo"
            style={{ display: isOpen ? "block" : "none" }}
          />
          <div className="bars" style={{ marginLeft: isOpen ? "5px" : "0px" }}>
            <RightCircleOutlined
              style={{ display: isOpen ? "none" : "block" }}
              onClick={toggle}
            />
            <LeftCircleOutlined
              style={{
                display: isOpen ? "block" : "none",
                position: "absolute",
                top: "20px",
                right: "20px",
                fontSize: "25px",
                color: "white",
                cursor: "pointer",
              }}
              onClick={toggle}
            />
          </div>
        </div>

        {/* Menu utama */}
        <div style={{ marginTop: isOpen ? "5rem" : "1rem" }}>
          {menuItem.map((item, index) => (
            <Tooltip placement="right" title={item.name} key={index}>
              <NavLink
                to={item.path}
                key={index}
                className="link"
                activeclassName="active"
              >
                <div className="icon">{item.icon}</div>
                <div
                  className="link_text"
                  style={{ display: isOpen ? "block" : "none" }}
                >
                  {item.name}
                </div>
              </NavLink>
            </Tooltip>
          ))}
        </div>

        {/* Tombol Logout */}
        <div
          className="logout"
          onClick={handleLogout}
          style={{
            position: "absolute",
            bottom: "20px",
            width: "100%",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: isOpen ? "flex-start" : "center",
            paddingLeft: isOpen ? "15px" : "0px",
            color: "white",
          }}
        >
          <LogoutOutlined />
          <span
            style={{ marginLeft: "10px", display: isOpen ? "block" : "none" }}
          >
            Logout
          </span>
        </div>
      </div>

      <main className={`main ${isOpen ? "open" : ""}`}>{children}</main>
    </div>
  );
};

export default SideBar;
