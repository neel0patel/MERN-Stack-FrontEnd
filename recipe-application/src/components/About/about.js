import React from "react";
import food from "../images/food.jpeg";
import "./about.css";

const About = () => {
  return (
    <div>
      <div id="about-title">
        <h1>About</h1>
      </div>
      <div id="image-holder">
        <img id="plate" alt="Cooked meal in a bowl" src={food} />
      </div>
      <div id="container">
        <p>
          This is a recipe app that'll allow you to create the best meals
          around.
        </p>
      </div>
    </div>
  );
};

export default About;
