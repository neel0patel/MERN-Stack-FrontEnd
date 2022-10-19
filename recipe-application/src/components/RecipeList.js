import { urlencoded } from "body-parser";
import React from "react";

const Recipe = (props) => {
  let recipe = JSON.parse(props.location.singleRecipe);
  console.log("Single recipe", props.location.singleRecipe);
  console.log(props);
  // recipe rating turned to a percentage value
  const starPercentage = (recipe.rating / 5) * 100;
  // round up the percentage value + add the symbol
  const percentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
  return (
    <div>
      <div className="recipe-preview-container"></div>
    </div>
  );
};
