import React, { Component } from "react";
import CatComponent from "./catComponent";

class CatsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:10000/cats")
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
          <div className="card-group">
            <div className="row">
              {items.map((item) => (
                <div key={item.id} className="col-lg-2 col-md-6 col-sm-6">
                  <div className="card img-thumbnail d-flex align-items-start bg-light mb-3">
                    <div className="card-body">
                      <CatComponent
                        photoUrl={item.photoUrl}
                        breedId={item.breedId}
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

export default CatsComponent;
