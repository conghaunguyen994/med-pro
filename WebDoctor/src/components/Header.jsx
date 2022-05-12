import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    const confirmed = window.confirm("Bạn có chắc muốn đăng xuất không?");

    if (confirmed) {
      localStorage.removeItem("@db/token");

      navigate("/login");
    }
  };

  return (
    <div className="main-header">
      <a className="logo">
        <span className="logo-mini">MED</span>
        <span className="logo-lg">
          <b>Med</b>PRO
        </span>
      </a>
      <nav className="navbar navbar-static-top">
        <a className="sidebar-toggle" data-toggle="push-menu" role="button">
          <span className="sr-only">Toggle navigation</span>
        </a>
        <div className="navbar-custom-menu">
          <ul className="nav navbar-nav">
            <li>
              <Link to="/profile">Cá Nhân</Link>
            </li>
            <li>
              <a onClick={handleLogoutClick}>Đăng Xuất</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
