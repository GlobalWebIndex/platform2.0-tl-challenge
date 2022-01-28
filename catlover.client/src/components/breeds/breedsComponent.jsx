import React, { Component } from "react";
import BreedComponent from "./breedComponent";
import LoadingComponent from "../loading/loadingComponent";
import ErrorComponent from "../error/errorComponent";
import PageTitleComponent from "../pageTitle/pageTitleComponent";

class BreedsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      message: String,
      items: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:10000/breeds")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            message: result.message,
            items: result.data,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const { error, isLoaded, message, items } = this.state;
    if (error) {
      return (
        <div>
          <ErrorComponent errorMessage={error.message} />
        </div>
      );
    } else if (!isLoaded) {
      return (
        <div>
          <LoadingComponent />
        </div>
      );
    } else {
      return (
        <div className="container">
          <PageTitleComponent title={message} />
          <div className="card-group m-2">
            <div className="row">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="col-xl-2 col-lg-2 col-md-6 col-sm-6"
                >
                  <div className="d-flex bg-light mb-3 m-2">
                    <div className="card-body">
                      <BreedComponent
                        breedId={item.id}
                        breedName={item.name}
                        breedDetails={item.details}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default BreedsComponent;
