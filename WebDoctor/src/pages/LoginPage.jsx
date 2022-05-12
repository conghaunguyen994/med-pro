import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useApi } from "../hooks/useApi";

export default function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoginLoading, login] = useApi("/doctor/login", {
    method: "POST",
  });

  useEffect(() => {
    document.body.classList.remove("skin-blue");
    document.body.classList.remove("sidebar-mini");

    document.body.classList.add("login-page");

    return () => {
      document.body.classList.add("skin-blue");
      document.body.classList.add("sidebar-mini");

      document.body.classList.remove("login-page");
    };
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const data = await login("", { username, password });

    if (data.error) {
      return alert(data.message);
    }

    localStorage.setItem("@db/token", data.token);

    navigate("/");
  };

  return (
    <div className="login-box">
      <div className="login-logo">
        <b>Med</b>PRO
      </div>
      <div className="login-box-body">
        <p className="login-box-msg">Đăng nhập để tiếp tục.</p>
        <form onSubmit={handleLoginSubmit}>
          <div className="form-group">
            <label htmlFor="">Tài Khoản</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Mật khẩu</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Đăng Nhập
          </button>
        </form>
      </div>
    </div>
  );
}
