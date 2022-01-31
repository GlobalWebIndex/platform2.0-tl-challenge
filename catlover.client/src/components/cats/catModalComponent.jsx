import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class CatModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:10000/breeds/" + this.props.data.breedId)
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

  checkFavorite() {
    if (this.props.data.isFavorite) {
      return (
        <Button
          variant="danger"
          onClick={() => this.props.onRemoveFavoriteClick()}
        >
          Remove From Favorite
        </Button>
      );
    } else {
      return (
        <Button
          variant="primary"
          onClick={() => this.props.onAddFavoriteClick()}
        >
          Save as Favorite
        </Button>
      );
    }
  }

  render() {
    const { error, isLoaded, items } = this.state;
    return (
      <div>
        <Modal show={this.props.show} onHide={() => this.props.onCloseClick()}>
          <Modal.Header closeButton>
            <Modal.Title>{items.Breed?.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.data.body}
            <img
              src={this.props.data.photoUrl}
              className="card-img-top img-fluid img-rounded"
              alt={this.props.data.photoUrl}
            />
          </Modal.Body>
          <Modal.Footer>
            {this.checkFavorite()}
            <Button
              variant="secondary"
              onClick={() => this.props.onCloseClick()}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default CatModalComponent;
