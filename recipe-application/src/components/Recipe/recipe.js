// import { urlencoded } from "body-parser";
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
  }, );

  async function deleteRecipe(recipeId) {
    await fetch(`https://recipe-backend-mern.herokuapp.com/recipes/${recipe._id}`, {
      method: "DELETE" }
      )
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
          <h2 className="recipe-title">{recipe.name}</h2>
          <div className="clear-title"></div>

          <p className="recipe-info">Steps:</p>
          <p className="recipe-content recipe-steps">{recipe.steps}</p>
          <div className="recipe-details--bottom">
            <div className="recipe-details--ratings">
              <p className="recipe-info">Difficulty:</p>
              <div id="stars-outer" style={{ display: "inline-block" }}>
                <div
                  id="stars-inner"
                  style={{ width: `${percentageRounded}` }}
                ></div>
              </div>
            </div>
            <div className="recipe-details--duration">
              <p className="recipe-info">Duration:</p>
              <p className="recipe-content">{recipe.duration}</p>
            </div>
          </div>
        </div>
        <button onClick={() => {deleteRecipe(); window.location.href='/recipes'}} className="btn-warning"> Delete Recipe </button>
      </div>
    </div>
  );
};
export default Recipe;
