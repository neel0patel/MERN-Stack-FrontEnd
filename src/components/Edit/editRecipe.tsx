import React, { Component } from "react";
import "./editRecipe.css";

export default class editRecipe extends Component {
  document: any;
  constructor(props: any) {
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

    let params = new URL(this.document.location).searchParams;
    let id = params.get("id");

    this.state.id = id;
    this.fetchData();
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
  getData(_files: any) {
    let file = this.document.getElementById("form-image").files[0];
    if (file) {
      let reader = new FileReader();
      reader.onload = ((_theFile) => {
        return (e) => {
          this.setState({ src: e.target.result });
        };
      })(file);
      reader.readAsDataURL(file);
      console.log(this.state.src);
      this.setState({ postData: true });
    } else {
      let postData: any = this.state;
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
  async fetchData() {
    const URL = `https://recipe-backend-mern.herokuapp.com/recipes/${this.state.id}`;
    const response = await fetch(URL);
    const data = await response.json();

    this.state.recipeData = data;
  }

  async sendData() {
    // this one object contains all the data entered, inlcluding the image
    let obj = {
      name: document.getElementById("form-name")?.focus?.(),
      image: this.state.src,
      prepTime: document.getElementById("form-prepTime")?.focus?.(),
      steps: document.getElementById("form-steps")?.focus?.(),
      rating: document.getElementById("form-rating")?.focus?.(),
      ingredients: document.getElementById("form-ingredients")?.focus?.(),
      cuisine: document.getElementById("form-cuisine")?.focus?.(),
      serving: document.getElementById("form-serving")?.focus?.(),
      cookTime: document.getElementById("form-cookTime")?.focus?.(),
      difficulty: document.getElementById("form-difficulty")?.focus?.(),
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
    await fetch(
      `https://recipe-backend-mern.herokuapp.com/recipes/${this.state.id}`,
      {
        method: "PUT",
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
      }
    ).then(async (res) => {
      const data = await res.json();
      // this.props.editRecipe(data);
      console.log(data);
    });
  }

  render() {
    const showMe: any = this.state;
    return (
      <div id="recipes-eright">
        <div id="recipes-eform-holder">
          <form>
            <div className="form-group">
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
              <h3>
                Recipe successfully updated, click on recipes to check it out!
              </h3>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
