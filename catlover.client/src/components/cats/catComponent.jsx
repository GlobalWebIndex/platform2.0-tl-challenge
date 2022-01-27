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

  handleClose = (fromModal) => {
    alert(fromModal.msg);

    this.setState({
      show: false,
    });
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

export default CatComponent;
