import React, { Component } from "react";
import BreedModalComponent from "./breedModalComponent";

class BreedComponent extends Component {
  state = {};
  test = {};

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

  render() {
    return (
      <div>
        <button
          type="button"
          className="btn btn-secondary w-100"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={this.handleShow}
        >
          {this.props.breedName}
        </button>
        <BreedModalComponent
          show={this.state.show}
          title={this.state.title}
          body={this.state.body}
          data={this.props}
          onClick={this.handleClose}
          onHide={this.handleClose}
        />
      </div>
    );
  }

  imageClicked(text) {
    this.test = text;
    console.log("cat " + this.test);
  }
}

export default BreedComponent;
