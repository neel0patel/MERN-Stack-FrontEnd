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
        title: document.getElementById("form-title").value,
        image: this.state.src,
        duration: document.getElementById("form-duration").value,
        steps: document.getElementById("form-steps").value,
        rating: document.getElementById("form-rating").value,
      };
      this.props.getNewRecipe(obj);

      // reset input fields and the image src within the state
      document.getElementById("form-title").value = "";
      this.setState({ src: "" });
      document.getElementById("form-duration").value = "";
      document.getElementById("form-steps").value = "";
      document.getElementById("form-rating").value = "";
      document.getElementById("form-image").value = "";

      // Sending data to live server
      fetch("https://recipe-backend-mern.herokuapp.com/recipes/", {
        method: "post",
        redirect: "follow",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        //Turning the object to json
        body: JSON.stringify({
          title: obj.title,
          image: obj.image,
          duration: obj.duration,
          steps: obj.steps,
          rating: obj.rating,
        }),
      }).then((res) => {
        console.log("Data sent!");
      });
    }
  }

  render() {
    const { showMe } = this.state;
    return (
      <div id="recipes-right">
        <div id="recipes-form-holder">
          <form>

            <div className="form-group"> 
            <input
              id="form-title"
              type="text"
              placeholder="Enter the name"
              name="title"
              autoComplete="off"
              className="form-control"
            />
            </div>

            <div className="form-group"> 
            <input
              id="form-image"
              type="file"
              placeholder="Upload an image"
              name="image"
              className="form-control-file"
            />
            </div>

            <div className="form-group"> 
            <input
              id="form-duration"
              type="text"
              placeholder="Enter the duration"
              name="duration"
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
              id="form-rating"
              type="text"
              placeholder="Enter the difficulty between 0-5"
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
              <h3>Recipe successfully added!</h3>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
