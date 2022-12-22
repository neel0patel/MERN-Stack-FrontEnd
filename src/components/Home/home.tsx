import React from "react";
import "./home.css";
import meal from "./images/homePic.jpeg";

const Home = () => {
  return (
    <div>
      <div id="title">
        <h1>Welcome to our Recipe Application!</h1>
      </div>
      <div id="img-holder">
        <img id="meal" alt="ingredients" src={meal} />
        <p>
          This application is meant to make life a little easier for you in the
          kitchen; head to the recipes tab to go crazy with your meals!
        </p>
      </div>
    </div>
  );
};
export default Home;
