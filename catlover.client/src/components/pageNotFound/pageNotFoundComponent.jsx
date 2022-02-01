import React, { Component } from "react";

class PageNotFoundComponent extends Component {
  state = {};
  render() {
    return (
      <div>
        <img
          src="./PageNotFound.jpg"
          className="card-img-top img-fluid img-rounded"
          alt="Page Not Found"
        />
      </div>
    );
  }
}

export default PageNotFoundComponent;
