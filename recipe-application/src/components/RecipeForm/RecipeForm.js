import React, { Component } from "react";
import "./RecipeForm.css";

export default class RecipeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMe: false,
      src: "",
      title: "",
      postData: false,
    };
    this.showMessage = this.showMessage.bind(this);
    this.showMessageAndSendData = this.showMessageAndSendData.bind(this);
    this.sendData = this.sendData.bind(this);
    this.getData = this.getData.bind(this);
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
    } else {
      let { postData } = this.state;
      if (postData) return;
      else {
        alert(
          "There was no file selected. Please upload an image or a placeholder will be used instead."
        );
        let question = prompt(
          "Would you like to upload an image? If so then enter yes else enter no."
        );

        if (question === "yes") {
          return;
        } else {
          this.setState({
            src: "https://via.placeholder.com/150x150",
          });
          this.setState({ postDate: true });
        }
      }
    }
  }
  async sendData() {
    let { postData } = this.state;

    if (postData) {
      // this one object contains all the data entered, inlcluding the image
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
      //   this.props.getNewRecipe(obj);

      // reset input fields and the image src within the state
      document.getElementById("form-name").value = "";
      this.setState({ src: "" });
      document.getElementById("form-prepTime").value = "";
      document.getElementById("form-steps").value = "";
      document.getElementById("form-rating").value = "";
      document.getElementById("form-image").value = "";
      document.getElementById("form-ingredients").value = "";
      document.getElementById("form-cuisine").value = "";
      document.getElementById("form-serving").value = "";
      document.getElementById("form-cookTime").value = "";
      document.getElementById("form-difficulty").value = "";

      // Sending data to live server
      fetch("https://recipe-backend-mern.herokuapp.com/recipes/", {
        method: "POST",
        // redirect: "follow",
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
      }).then(async (res) => {
        const data = await res.json();
        this.props.getNewRecipe(data);
        console.log(data);
      });
    }
  }

  render() {
    const { showMe } = this.state;
    return (
      <div id="recipes-right">
        <div id="recipes-form-holder">
          <form>
            <input
              id="form-name"
              type="text"
              placeholder="Enter the name"
              name="name"
              autoComplete="off"
            />
            <input
              id="form-cuisine"
              type="text"
              placeholder="Enter the cuisine"
              name="title"
              autoComplete="off"
            />
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
            />

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
            />
            <textarea
              id="form-steps"
              placeholder="Enter steps..."
              name="steps"
            ></textarea>
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
            />
            <input
              id="form-button"
              type="button"
              value="Submit"
              onClick={this.showMessageAndSendData}
              onMouseEnter={this.getData}
            />
          </form>
          {showMe ? (
            <div id="message">
              <h3>Recipe successfully added!</h3>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
