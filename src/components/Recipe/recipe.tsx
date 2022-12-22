import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./recipe.css";

const Recipe = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const URL = `https://recipe-backend-mern.herokuapp.com/recipes/${recipeId}`;
      const response = await fetch(URL);
      const data = await response.json();
      //console.log(data);
      setRecipe(data);
    };
    fetchData();
  }, []);

  async function deleteRecipe() {
    await fetch(
      `https://recipe-backend-mern.herokuapp.com/recipes/${recipe._id}`,
      {
        method: "DELETE",
      }
    )((window.location.href = "/recipes"));
  }

  async function Edit() {
    //console.log(recipeId)

    window.location.href = `/edit?id=${recipe._id}`;
  }

  // recipe rating turned to a percentage value
  const starPercentage = (recipe.rating / 5) * 100;
  // round up the percentage value + add the symbol
  const percentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
  return (
    <div>
      <div className="recipe-preview-container">
        <div
          className="recipe-image"
          style={{ backgroundImage: `url(${recipe.image})` }}
        ></div>
        <div className="recipe-details">
          <h2 className="recipe-name">{recipe.name}</h2>
          <div className="clear-name"></div>

          <p className="recipe-info">Cuisine:</p>
          <p className="recipe-content">{recipe.cuisine}</p>

          <p className="recipe-info">Serving Size:</p>
          <p className="recipe-content">{recipe.serving}</p>

          <p className="recipe-info">Ingredients:</p>
          <p className="recipe-content">{recipe.ingredients}</p>

          <p className="recipe-info">Steps:</p>
          <p className="recipe-content recipe-steps">{recipe.steps}</p>
          <div className="recipe-details--bottom">
            <div className="recipe-details--ratings">
              <p className="recipe-info">Rating:</p>
              <div id="stars-outer" style={{ display: "inline-block" }}>
                <div
                  id="stars-inner"
                  style={{ width: `${percentageRounded}` }}
                ></div>
              </div>
            </div>
            <div className="recipe-details--duration">
              <p className="recipe-info">Prep Time:</p>
              <p className="recipe-content">{recipe.prepTime} minutes</p>
            </div>
            <div className="recipe-details--duration">
              <p className="recipe-info">Cook Time:</p>
              <p className="recipe-content">{recipe.cookTime} minutes</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            deleteRecipe();
          }}
          className="btn btn-danger"
          type="submit"
        >
          Delete Recipe
        </button>
        <button
          onClick={() => {
            Edit(recipe._id);
          }}
          className="btn btn-primary"
          type="submit"
        >
          Edit Recipe
        </button>
      </div>
    </div>
  );
};
export default Recipe;
