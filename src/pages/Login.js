import axios from "axios";
import React, { useState } from "react";
import {useCookies} from "react-cookie"
import {useNavigate} from "react-router-dom"

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [_,setCookies]=useCookies(["access_token"])
  const navigate=useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });
      setCookies("access_token", response.data.token)
      window.localStorage.setItem("userID", response.data.userID)
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Username:</label>
          <input
            id="password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
