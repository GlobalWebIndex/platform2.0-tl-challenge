import React, { Component } from "react";

class PageTitleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  render() {
    return (
      <div className="alert alert-light m-2 text-center" role="alert">
        <h5>{this.props.title}</h5>
      </div>
    );
  }
}

export default PageTitleComponent;
