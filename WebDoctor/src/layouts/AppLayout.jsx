import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import Header from "../components/Header";

export default function AppLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("@db/token") == null) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Header />
      <div className="main-sidebar">
        <div className="sidebar">
          <ul className="sidebar-menu">
            <li>
              <Link to={"/"}>
                <i className="fa fa-dashboard"></i>
                <span>Trang Chủ</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="content-wrapper">
        <Outlet />
      </div>
      <div className="main-footer">123123</div>
    </>
  );
}
