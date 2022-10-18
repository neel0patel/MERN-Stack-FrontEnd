import Spinner from "../components/spinner";
import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

// bind is creating a new function when called and has its "this" keyword set to the made value
class Recipes extends Component {
  constructor() {
    super();
    this.state = {
      recipes: [],
      loading: true,
    };
    this.fetchAllRecipes = this.fetchAllRecipes.bind(this);
    this.getNewRecipe = this.getNewRecipe.bind(this);
  }
  // Axios automatically transform the data returned from the server
  async fetchAllRecipes(endpoint) {
    let result = await Axios.get(endpoint);
    this.setState({ recipes: result.data.recipes, loading: false }, () =>
      console.log("Recipes fetched...", result.data.recipes[1])
    );
  }
  // this method is going to be passed into the recipeForm component
  // From within the recipeForm component each newly added recipe will be passed to the method
  // the new recipe added will be recieved and sent to the array of recipes to be displayed
  getNewRecipe(recipe) {
    this.setState({ recipes: [...this.state.recipes, recipe] });
  }
  // this method executes react code when the component is already in the DOM
  componentDidMount() {
    this.fetchAllRecipes("http://localhost:3000/api/recipes");
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
                  {recipes.map((recipe) => (
                    <Link
                      key={recipe.id}
                      to={{
                        pathname: `/${recipe.id}`,
                        singleRecipe: `${JSON.stringify(recipe)}`,
                      }}
                      style={{ textDecoration: "none" }}
                    >
                      <li
                        className="recipe-item"
                        value={recipe.title}
                        onClick={this.fetchRecipe}
                      >
                        {recipe.title}
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </div>
          </div>
          {/* recipeFOrm goes here */}
        </div>
      </div>
    );
  }
}

export default Recipes;
