import React, { Component } from "react";

class ErrorComponent extends Component {
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
      <div className="alert alert-danger" role="alert">
        {this.props.errorMessage}
      </div>
    );
  }
}

export default ErrorComponent;
