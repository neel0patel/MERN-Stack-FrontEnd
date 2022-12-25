import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components//Navbar/navbar";
import About from "./components/About/about";
import Home from "./components/Home/home";
import Contact from "./components/Contact/contact";
import Recipes from "./components/Recipes/recipes";
import Recipe from "./components/Recipe/recipe";
import Edit from "./components/Edit/editRecipe";

import "./index.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/:recipeId" element={<Recipe />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
