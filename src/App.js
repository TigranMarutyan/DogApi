import React, { Component } from "react";
import "./App.css";

const BASE_URL = "https://dog.ceo/api/breed/";
class App extends Component {
  constructor() {
    super();
    this.state = {
      imgURL: "",
      breed: [""],
      select: "",
    };
  }

  getDogImage = () => {
    const { select } = this.state;
    let url = BASE_URL + select + "/images/random";
    fetch(url)
      .then((resp) => resp.json())
      .then((response) => {
        this.setState({
          imgURL: response.message,
        });
        console.log(response.message);
      })
      .catch((err) => {
        console.log("error fetching image");
      });
  };

  getBreed = () => {
    const { breed } = this.state;
    fetch("https://dog.ceo/api/breeds/list")
      .then((resp) => resp.json())
      .then((response) => {
        this.setState({
          breed: breed.concat(response.message),
        });
      })
      .catch((err) => {
        console.log("error fetching list");
      });
  };

  handleSelect = (e) => {
    this.setState({
      select: e.target.value,
    });
  };

  componentDidMount() {
    this.getBreed();
  }

  render() {
    const { breed, imgURL, select } = this.state;
    return (
      <div>
        <select className="select" value={select} onChange={this.handleSelect}>
          {breed.map((e) => (
            <option value={e}> {e} </option>
          ))}
        </select>
        <button
          className="button"
          id="submit"
          disabled={!select}
          onClick={this.getDogImage}
        >
          submit
        </button>
        <div id="img">
          <img className="doggy_img" alt="dog" src={imgURL} />
        </div>
      </div>
    );
  }
}

export default App;
