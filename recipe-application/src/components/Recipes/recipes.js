import React, { Component } from "react";
import Spinner from "../spinner";
import "./recipes.css";

import Axios from "axios";
//import { Link } from "react-router-dom";
import RecipeForm from "../RecipeForm/RecipeForm";

class Recipes extends Component {
  constructor() {
    // "super()" grants access to methods and properties of a parent or sibling class
    super();
    this.state = {
      recipes: [],
      loading: true,
    };
    // bind is creating a new function when called and has its "this" keyword set to the made value

    this.fetchAllRecipes = this.fetchAllRecipes.bind(this);
    this.getNewRecipe = this.getNewRecipe.bind(this);
  }
  // Axios automatically makes HTTP requests from the browser and handles the transformation of data

  async fetchAllRecipes(endpoint) {
    let result = await Axios.get(endpoint);
    this.setState({ recipes: result.data, loading: false }, () =>
      console.log("Recipes fetched...", result.data)
    );
  }
  // this method is going to be passed into the RecipeForm component
  // From within the RecipeForm component each newly added recipe will be passed to the method
  // the new recipe added will be recieved and sent to the array of recipes to be displayed

  getNewRecipe(recipe) {
    this.setState({ recipes: [...this.state.recipes, recipe] });
  }
  // this method executes react code when the component is already in the DOM

  componentDidMount() {
    this.fetchAllRecipes(
      "https://recipe-backend-mern.herokuapp.com/recipes/all"
    );
  }

  render() {
    const { recipes, loading } = this.state;
    return (
      <div>
        <div id="recipes-title">
          <h1>Our Wonderful Recipes</h1>
        </div>
        <div id="recipes-para">
          <p>View and add any recipe here. </p>
        </div>
        <div id="recipes-container">
          <div id="recipes-left">
            <div id="recipes-list-title">
              <h4>Recipes</h4>
            </div>
            <div id="recipes-list-container">
              {loading ? (
                <Spinner />
              ) : (
                <ul>
                  {recipes &&
                    recipes.map((recipe) => (
<<<<<<< HEAD:recipe-application/src/components/recipes.js
                      <Link
                        key={recipe._id}
                        to={{
                          pathname: `/${recipe._id}`,
                        }}
                      >
                        <li
                          className="recipe-item"
                          value={recipe.name}
                          onClick={this.fetchRecipe}
                        >
                          {recipe.name}
                        </li>
                      </Link>
=======

                        <div key={recipe._id} class="card text-center mb-3" style={{width: "18em"}}>
                            
                              <img src={recipe.image} class="card-img-top" style={{maxWidth: "18em"}} alt={`${recipe.name}`} />

                              <div class="card-body">
                          
                                <h2 class="card-title">{recipe.name}</h2>
                                <p class="card-text">{recipe.rating} STARS </p>
                                <p class="card-text">{recipe.difficulty}</p>

                                <a href={`/${recipe._id}`} class="btn btn-primary">View Recipe</a>
                              </div>

                        </div>
                          
                      
>>>>>>> 2b5c3c3f6e46e668e99df5a8c34fe174980c86b7:recipe-application/src/components/Recipes/recipes.js
                    ))}
                </ul>
              )}
            </div>
          </div>
          <RecipeForm getNewRecipe={this.getNewRecipe} />
        </div>
      </div>
    );
  }
}

export default Recipes;
