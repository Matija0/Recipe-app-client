import axios from "axios";
import React, { useState } from "react";
import {useCookies} from "react-cookie"
import {Link, useNavigate} from "react-router-dom"

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
    <div className="bg-grey-lighter h-fit mt-7 flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <form onSubmit={handleSubmit} className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Login</h1>
                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="fullname"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        />

                    

                    <input 
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />

                   

                    <button
                        type="submit"
                        className="w-full text-center py-3 rounded bg-indigo-700 text-white hover:bg-indigo-600 focus:outline-none my-1"
                    >Login</button>

                    
                </form>

                <div className="text-grey-dark mt-6">
                    Don't have an account? 
                    <Link className="no-underline border-b border-blue-600 text-blue-600 ml-2" to="/register">
                        Register
                    </Link>.
                </div>
            </div>

            
        </div>
  );
};

export default Login;
