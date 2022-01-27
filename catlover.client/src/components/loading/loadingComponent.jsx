import React, { Component } from "react";

class LoadingComponent extends Component {
  state = {};
  render() {
    return (
      <div className="text-center">
        <br />
        <button className="btn btn-primary" type="button" disabled>
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          Loading...
        </button>
      </div>
    );
  }
}

export default LoadingComponent;
