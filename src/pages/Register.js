import React, { useState } from "react";
import axios from "axios"
const Register = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit= async(event) =>{
    event.preventDefault();
    try{
      await axios.post("http://localhost:3001/auth/register", {username, password})
      alert("Registration Completed! Now login")
    }catch(err){
      console.log(err)
    }
    setUserName("")
    setPassword("")
  }
  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input id="username" value={username} onChange={(e) => setUserName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Username:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
