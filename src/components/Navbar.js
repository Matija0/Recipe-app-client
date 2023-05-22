import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {useCookies} from "react-cookie"

const Navbar = () => {
  const [cookies, setCookies]=useCookies(["access_token"])
  const navigate= useNavigate()

  const logout= () =>{
    setCookies("access_token", "")
    window.localStorage.removeItem("userID")
    navigate("/login")
    
  }
  return (
    <div className="navbar">
      <Link to={"/"}>Home</Link>
      <Link to={"/createrecipe"}>Create Recipe</Link>
      <Link to={"/savedrecipes"}>Saved Recipes</Link>
      {!cookies.access_token? (<div><Link to={"/login"}>Login</Link>
      <Link to={"/register"}>Register</Link></div>) : (<button onClick={logout}>Logout</button>)}
      
    </div>
  );
};

export default Navbar;
