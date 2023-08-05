import React, { useState } from "react";
import axios from "axios"
import { Link } from "react-router-dom";
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
    <div className="bg-grey-lighter h-fit mt-7 flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <form onSubmit={handleSubmit} className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Register</h1>
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
                        className="w-full text-center py-3 rounded bg-green-700 text-white hover:bg-green-600 focus:outline-none my-1"
                    >Create Account</button>

                    
                </form>

                <div className="text-grey-dark mt-6">
                    Already have an account? 
                    <Link className="no-underline border-b border-blue-600 text-blue-600 ml-2" to="/login">
                        Log in
                    </Link>.
                </div>
            </div>

            
        </div>
  );
};

export default Register;
