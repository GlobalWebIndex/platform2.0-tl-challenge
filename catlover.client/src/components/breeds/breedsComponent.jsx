import React, { Component } from "react";
import BreedComponent from "./breedComponent";

class BreedsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
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
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
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
