import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import {useCookies} from "react-cookie"

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies,setCookies]=useCookies(["access_token"])
  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    if(cookies.access_token)  fetchSavedRecipes();
  
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:3001/recipes", {
        recipeID,
        userID,
      }, {headers: {authorization: cookies.access_token}});
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div className=" container mx-auto w-full">
      <h1 className=" text-4xl text-center my-7">Recipes</h1>
      <main className=" grid grid-cols-1 my-7 md:grid-cols-4 gap-4">
        {recipes.map((recipe) => (
          <section key={recipe._id} className=" bg-white shadow-md w-full  rounded-md md:h-[520px] md:w-[350px]">
            <div>
              <h2 className=" text-2xl text-center py-2">{recipe.name}</h2>
              <button
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
                className=" text-red-500 text-3xl  px-4 py-2 rounded-md w-fit mt-2 text-end "
              >
                {isRecipeSaved(recipe._id) ? <i class="bi bi-bookmark-heart-fill"></i> : <i class="bi bi-bookmark-heart"></i>}
              </button>
            </div>
            <div className=" my-4 text-xl px-2  leading-8">
              <p>{recipe.instructions}</p>
            </div>
            <img className=" h-[55%] w-full" src={recipe.imageUrl} alt={recipe.name} />
            <p className=" text-gray-700 text-lg my-4 mx-2">Cooking Time: {recipe.cookingTime} minutes</p>
          </section>
        ))}
      </main>
    </div>
  );
};

export default Home;
