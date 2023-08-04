import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import logorecipe from "../assets/logorecipe.jpg";
import "./Navbar.css";
import {
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
} from "@chakra-ui/react";

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/login");
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <div
        id="navbar"
        className=" hidden md:w-[100%] md:flex md:text-lg md:flex-row md:items-start md:justify-between md:bg-white md:py-7 md:px-10 md:text-indigo-400 md:font-semibold"
      >
        <div className=" text-xl flex flex-row items-center text-indigo-600 font-bold">
          <h1>Eat</h1>
          <h1 className=" text-amber-500">Dish</h1>
        </div>
        <Link to={"/"}>
          <div className="hover:text-indigo-600 w-full pl-14">
            <i class="bi bi-grid"></i> Home
          </div>
        </Link>
        <Link to={"/createrecipe"}>
          <div className="pl-14 hover:text-indigo-600">
            <i class="bi bi-patch-plus"></i> Create Recipe
          </div>
        </Link>

        {!cookies.access_token ? (
          <>
            <Link to={"/login"}>
              <div className="pl-14 hover:text-indigo-600">
                <i class="bi bi-door-open"></i> Login
              </div>
            </Link>
            <Link to={"/register"}>
              <div className="pl-14 hover:text-indigo-600">
                <i class="bi bi-person-plus"></i> Register
              </div>
            </Link>
          </>
        ) : (
          <>
            <Link to={"/savedrecipes"}>
              <div className="pl-14 hover:text-indigo-600">
                <i class="bi bi-save"> </i> Saved Recipes
              </div>
            </Link>
            <div className="pl-14">
              <button onClick={logout}>
                <i class="bi bi-box-arrow-left"></i> Logout
              </button>
            </div>
          </>
        )}
      </div>
      <div
        id="navbar"
        className="w-[100%]  flex flex-row justify-between items-center bg-white px-7 md:hidden"
      >
        <div className=" text-xl flex flex-row items-center text-indigo-600 font-bold">
          <h1>Eat</h1>
          <h1 className=" text-amber-500">Dish</h1>
        </div>
        <div>
          <Button ref={btnRef} colorScheme="cyan" onClick={onOpen}>
          <i class="bi bi-list"></i>
          </Button>
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
             

              <DrawerBody>
                <div className="flex flex-col gap-8 items-start  text-indigo-400 font-semibold mt-20">
              <Link to={"/"}>
          <div className="hover:text-indigo-600 w-full pl-14">
            <i class="bi bi-grid"></i> Home
          </div>
        </Link>
        <Link to={"/createrecipe"}>
          <div className="pl-14 hover:text-indigo-600">
            <i class="bi bi-patch-plus"></i> Create Recipe
          </div>
        </Link>

        {!cookies.access_token ? (
          <>
            <Link to={"/login"}>
              <div className="pl-14 hover:text-indigo-600">
                <i class="bi bi-door-open"></i> Login
              </div>
            </Link>
            <Link to={"/register"}>
              <div className="pl-14 hover:text-indigo-600">
                <i class="bi bi-person-plus"></i> Register
              </div>
            </Link>
          </>
        ) : (
          <>
            <Link to={"/savedrecipes"}>
              <div className="pl-14 hover:text-indigo-600">
                <i class="bi bi-save"> </i> Saved Recipes
              </div>
            </Link>
            <div className="pl-14">
              <button onClick={logout}>
                <i class="bi bi-box-arrow-left"></i> Logout
              </button>
            </div>
          </>
        )}
        </div>
              </DrawerBody>

             
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </>
  );
};

export default Navbar;
