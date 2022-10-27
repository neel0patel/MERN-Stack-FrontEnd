import React, { Component } from "react";
import "./editRecipe.css";

export default class editRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMe: false,
      src: "",
      title: "",
      recipeData: {},
      postData: false
    };
    this.showMessage = this.showMessage.bind(this);
    this.showMessageAndSendData = this.showMessageAndSendData.bind(this);
    this.sendData = this.sendData.bind(this);
    this.getData = this.getData.bind(this);
    //console.log(props)

    //Getting the object id from query string
    let params = (new URL(document.location)).searchParams;
    let id = params.get("id");

    this.state.id= id

    this.fetchData();

    //console.log(this.state)
  }

  // This will display a success message when the submit button has been clicked
  showMessage() {
    this.setState({
      showMe: true,
    });
    setTimeout(() => {
      this.setState({
        showMe: false,
      });
    }, 1500);
  }

  // This runs both showMessage and sendData when the button is clicked
  showMessageAndSendData() {
    this.showMessage();
    setTimeout(() => {
      this.sendData();
      //this.sendData.updateRecipe();
    }, 1000);
  }

  // This method is going to take the image before the data is sent, turn it to a base64 text and save it in the state. After that I'd have...
  // to post request & save it within the collection; then fetch request, save the data in the state, then display it
  getData(files) {
    let file = document.getElementById("form-image").files[0];
    if (file) {
      let reader = new FileReader();
      reader.onload = ((theFile) => {
        return (e) => {
          this.setState({ src: e.target.result });
        };
      })(file);
      reader.readAsDataURL(file);
      console.log(this.state.src);
      this.setState({ postData: true });
    }
  }

async fetchData() {
  const URL = `https://recipe-backend-mern.herokuapp.com/recipes/${this.state.id}`;
  const response = await fetch(URL);
  const data = await response.json();

  this.state.recipeData = data;
}; 

async sendData() {

  let obj = {
    name: document.getElementById("form-name").value,
    image: this.state.src,
    prepTime: document.getElementById("form-prepTime").value,
    steps: document.getElementById("form-steps").value,
    rating: document.getElementById("form-rating").value,
    ingredients: document.getElementById("form-ingredients").value,
    cuisine: document.getElementById("form-cuisine").value,
    serving: document.getElementById("form-serving").value,
    cookTime: document.getElementById("form-cookTime").value,
    difficulty: document.getElementById("form-difficulty").value,
  };
  
    await fetch(`https://recipe-backend-mern.herokuapp.com/recipes/${this.state.id}`, {
      method: "PUT",
      headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    //Turning the object to json
    body: JSON.stringify({
      name: obj.name,
      image: obj.image,
      prepTime: obj.prepTime,
      steps: obj.steps,
      rating: obj.rating,
      ingredients: obj.ingredients,
      cuisine: obj.cuisine,
      serving: obj.serving,
      cookTime: obj.cookTime,
      difficulty: obj.difficulty,
    }),
  })
}

  render() {
    //const { recipeData } = this.state;
    const { showMe } = this.state;

    //when this is logged it shows all of the correct recipe information... HOWEVER when you try to log this.state.recipeData it shits itself. I do not know why.
    console.log(this.state)

    return (
      <div id="recipes-right">
        <div id="recipes-form-holder">
          <form>
            <div className="form-group">
              <input
                id="form-name"
                type="text"
                name="name"

                //because of the aformentioned error I cannot set the value to what the recipe currently has as information !!! 

                //defaultValue={`${this.state.recipeData.name}`}

                autoComplete="off"
              />
              <input
                id="form-cuisine"
                type="text"
                placeholder="Enter the cuisine"
                name="title"
                autoComplete="off"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <input
                id="form-serving"
                type="text"
                placeholder="Enter the serving size"
                name="serving"
                autoComplete="off"
              />
              <input
                id="form-image"
                type="file"
                placeholder="Upload an image"
                name="image"
                className="form-control-file"
              />
            </div>
            <div className="form-group">
              <textarea
                id="form-ingredients"
                placeholder="Enter the ingredients..."
                name="ingredients"
              ></textarea>
              <input
                id="form-prepTime"
                type="text"
                placeholder="Enter the prep time"
                name="prepTime"
                autoComplete="off"
              />

              <input
                id="form-cookTime"
                type="text"
                placeholder="Enter the time it takes to cook the cuisine"
                name="cookTime"
                autoComplete="off"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <textarea
                id="form-steps"
                placeholder="Enter steps..."
                name="steps"
                className="form-control"
                rows={3}
              ></textarea>
            </div>

            <div className="form-group">
              <input
                id="form-difficulty"
                type="text"
                placeholder="Type in a difficulty: easy, medium, or hard"
                name="difficulty"
              />
              <input
                id="form-rating"
                type="text"
                placeholder="Rate the cuisine from 1-5"
                name="rating"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <input
                id="form-button"
                type="button"
                value="Submit"
                className="btn"
                onClick={this.showMessageAndSendData}
                onMouseEnter={this.getData}
              />
            </div>
          </form>
          {showMe ? (
            <div id="message">
              <h3>Recipe successfully updated!</h3>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

