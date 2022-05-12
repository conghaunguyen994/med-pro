import React from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";

export default function AppLayout({ children }) {
  return (
    <>
      <Header />

      <div className="main-sidebar">
        <div className="sidebar">
          <form action="#" method="get" className="sidebar-form">
            <div className="input-group">
              <input
                type="text"
                name="q"
                className="form-control"
                placeholder="Search..."
              />
              <span className="input-group-btn">
                <button
                  type="submit"
                  name="search"
                  id="search-btn"
                  className="btn btn-flat"
                >
                  <i className="fa fa-search"></i>
                </button>
              </span>
            </div>
          </form>
          <ul className="sidebar-menu">
            <li className="header">MAIN NAVIGATION</li>
            <li>
              <Link to={"/"}>
                <i className="fa fa-dashboard"></i>
                <span>Trang Chủ</span>
              </Link>
            </li>
            <li>
              <Link to={"/doctors"}>
                <i className="fa fa-address-book-o"></i>
                <span>Bác Sĩ</span>
              </Link>
            </li>
            <li>
              <Link to={"/"}>
                <i className="fa fa-id-card"></i>
                <span>Người Dùng</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="content-wrapper">{children}</div>
      <div className="main-footer">123123</div>
    </>
  );
}
