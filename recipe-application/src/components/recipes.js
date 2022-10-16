import Spinner from "../components/spinner";
import React, { Component } from "react";

// bind is creating a new function when called and has its "this" keyword set to the provided value
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
}
