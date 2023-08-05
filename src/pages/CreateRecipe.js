import axios from "axios";
import React, { useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";

const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (e, index) => {
    const { value } = e.target;
    const ingredients = recipe.ingredients;
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/recipes", recipe, {
        headers: { authorization: cookies.access_token },
      });
      alert("Recipe Created");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className=" container mx-auto flex flex-col items-center justify-center text-center py-12">
      <h1 className=" text-gray-900 text-2xl leading-9  ">Create Recipe</h1>
      <form
        onSubmit={handleSubmit}
        className=" mt-5 flex flex-col w-full mx-4 gap-5 md:w-1/3 md:mx-0"
      >
        <input
          className=" border border-gray-300 rounded-md p-2 m-2 outline-none"
          type="text"
          name="name"
          id="name"
          placeholder="Name of the dish"
          onChange={handleChange}
        />
        <textarea
          className=" border border-gray-300 rounded-md p-2 m-2 outline-none"
          type="t"
          name="description"
          id="description"  
          placeholder="Description"
          onChange={handleChange}
        ></textarea>
        {recipe.ingredients.map((ingredient, index) => (
          <input
            key={index}
            className="border border-gray-300 rounded-md p-2 m-2 outline-none"
            name="ingredients"
            value={ingredient}
            onChange={(e) => handleIngredientChange(e, index)}
          />
        ))}
        <button onClick={addIngredient} type="button" className=" bg-blue-700 py-2 px-4 w-fit rounded-md hover:bg-blue-600 text-gray-200 mx-auto">
        <i class="bi bi-plus-lg"></i> Ingredient
        </button>
        <textarea id="instructions"
          name="instructions"
          placeholder="Instructions"
          onChange={handleChange}
          className=" border border-gray-300 rounded-md p-2 m-2 outline-none">

        </textarea>
        <input placeholder="Image URL" className=" border border-gray-300 rounded-md p-2 m-2 outline-none" id="imageUrl" name="imageUrl" onChange={handleChange} />
        <input placeholder="Cooking Time" className=" border border-gray-300 rounded-md p-2 m-2 outline-none" id="cookingTime" name="cookingTime" onChange={handleChange} />
        <button type="submit" className=" bg-blue-700 py-2 px-4 w-fit rounded-md hover:bg-blue-600 text-gray-200 mx-auto"> Create Recipe</button>
      </form>
    </div>
  );
};

export default CreateRecipe;
