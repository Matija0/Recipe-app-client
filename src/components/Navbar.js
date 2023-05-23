import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import logorecipe from "../assets/logorecipe.jpg"

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/login");
  };
  return (
    <div className=" h-screen   flex text-lg flex-col items-start justify-between bg-white py-7 text-indigo-400 font-semibold">
      <div className=" text-xl flex flex-row items-center text-indigo-600 font-bold pl-10"><h1>Eat</h1><h1 className=" text-amber-500">Dish</h1></div>
      <Link to={"/"}><div className="hover:text-indigo-600 w-full pl-14"><i class="bi bi-grid"></i> Home</div></Link>
      <Link to={"/createrecipe"}><div className="pl-14 hover:text-indigo-600"><i class="bi bi-patch-plus"></i> Create Recipe</div></Link>

      {!cookies.access_token ? (
          <>
          <Link to={"/login"}><div className="pl-14 hover:text-indigo-600"><i class="bi bi-door-open"></i> Login</div></Link>
          <Link to={"/register"}><div className="pl-14 hover:text-indigo-600"><i class="bi bi-person-plus"></i> Register</div></Link>
          </>
      ) : (
        <>
        <Link to={"/savedrecipes"}><div className="pl-14 hover:text-indigo-600"><i class="bi bi-save"> </i> Saved Recipes</div></Link>
        <div className="pl-14"><button onClick={logout}><i class="bi bi-box-arrow-left"></i> Logout</button></div>
        </>
      )}
      <div className=" bg-amber-500 mx-4 py-3 rounded-lg">
      <img className=" w-2/3 mx-auto rounded-lg" src={logorecipe} alt=""/>
      </div>
    </div>
  );
};

export default Navbar;
