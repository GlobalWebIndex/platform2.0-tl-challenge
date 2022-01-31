import React, { Component } from "react";
import CatModalComponent from "./catModalComponent";

class CatComponent extends Component {
  state = {};

  handleShow = () => {
    this.setState({
      show: true,
      title: "Group People",
      body: "Hi, find my group details",
    });
  };

  handleClose = () => {
    this.setState({
      show: false,
    });
  };

  updateFavorite = (isFavorite) => {
    const API_URL = "http://localhost:10000";
    const API_PATH = "/cats/" + this.props.catId;
    console.log(isFavorite);

    fetch(API_URL + API_PATH, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        breedId: this.props.breedId,
        photoUrl: this.props.photoUrl,
        isFavorite: isFavorite,
      }),
    });
  };

  AddFavorite = () => {
    this.updateFavorite(true);
  };

  RemoveFavorite = () => {
    this.updateFavorite(false);
  };

  render() {
    return (
      <div>
        <button
          type="button"
          className="btn btn-light"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={this.handleShow}
        >
          <img
            src={this.props.photoUrl}
            className="card-img-top img-fluid img-rounded"
            alt={this.props.photoUrl}
          />
        </button>
        <CatModalComponent
          show={this.state.show}
          title={this.state.title}
          body={this.state.body}
          data={this.props}
          onAddFavoriteClick={this.AddFavorite}
          onRemoveFavoriteClick={this.RemoveFavorite}
          onCloseClick={this.handleClose}
        />
      </div>
    );
  }

  imageClicked(text) {
    this.test = text;
    console.log("cat " + this.test);
  }
}

export default CatComponent;
