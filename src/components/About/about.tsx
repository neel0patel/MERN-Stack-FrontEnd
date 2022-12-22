import React from "react";
import food from "./src/images/food.jpeg";
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
          This is a recipe application that'll allow you to create the best
          meals around while storing those recipes online for easy retrieval for
          future use.
        </p>
      </div>
    </div>
  );
};

export default About;
