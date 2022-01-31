import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class BreedModalComponent extends Component {
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

  render() {
    const { error, isLoaded, items } = this.state;
    console.log(this.props);
    console.log(items.Cats);
    return (
      <div>
        <Modal show={this.props.show} onHide={() => this.props.onHide()}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.data.breedName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <small className="text-muted">{this.props.data.breedDetails}</small>
            <div className="card-group m-2">
              <div className="row">
                {items.Cats?.map((item) => (
                  <div key={item.id} className="col-6">
                    <div className="card img-thumbnail d-flex align-items-start bg-light mb-3">
                      <div className="card-body">
                        <img
                          src={item.photoUrl}
                          className="card-img-top img-fluid img-rounded"
                          alt={item.photoUrl}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.props.onClick()}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default BreedModalComponent;
