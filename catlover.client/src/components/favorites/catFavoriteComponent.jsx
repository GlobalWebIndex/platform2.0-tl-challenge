import React, { Component } from "react";

class CatFavoriteComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:10000/breeds/" + this.props.breedId)
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
          <div className="card">
            <img src={this.props.photoUrl} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{items.Breed?.name}</h5>
            </div>
            <div className="card-footer">
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.updateFavorite}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  updateFavorite = () => {
    const API_URL = "http://localhost:10000";
    const API_PATH = "/cats/" + this.props.catId;

    fetch(API_URL + API_PATH, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        breedId: this.props.breedId,
        photoUrl: this.props.photoUrl,
        isFavorite: false,
      }),
    });
    window.location.reload(false);
  };
}

export default CatFavoriteComponent;
