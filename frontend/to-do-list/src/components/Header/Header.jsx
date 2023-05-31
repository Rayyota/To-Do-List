import React from "react";

import Icon from "@ant-design/icons/lib/components/Icon";
import { LogoutOutlined } from "@ant-design/icons";
import { logout } from "../../slices/AuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Header.css";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className="header">
      <div className="icon-logo">kitty.do</div>
      <div className="logout-icon-container">
        <Icon
          component={LogoutOutlined}
          className="logout-icon"
          onClick={handleLogout}
        />
      </div>
    </header>
  );
};

export default Header;
