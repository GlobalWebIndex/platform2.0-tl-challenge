import React, { Component } from "react";
import BreedModalComponent from "./breedModalComponent";

class BreedComponent extends Component {
  state = {};

  showModal = () => {
    this.setState({
      show: true,
    });
  };

  closeModal = () => {
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
          data-bs-target="#modal"
          onClick={this.showModal}
        >
          {this.props.breedName}
        </button>
        <BreedModalComponent
          show={this.state.show}
          title={this.state.title}
          body={this.state.body}
          data={this.props}
          onClick={this.closeModal}
          onHide={this.closeModal}
        />
      </div>
    );
  }
}

export default BreedComponent;
