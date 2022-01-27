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
          // console.log(this.state.items.Breed.details);
          // console.log(this.state.items.Breed.name);
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
              <p className="card-text">{items.Breed?.details}</p>
            </div>
            <div className="card-footer">
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.removeFavorite}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  removeFavorite = () => {
    console.log(this.props.breedId);

    // this.setState({
    //   show: false,
    // });
  };
}

export default CatFavoriteComponent;
