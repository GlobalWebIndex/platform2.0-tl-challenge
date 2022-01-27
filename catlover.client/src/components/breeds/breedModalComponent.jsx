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
    return (
      <div>
        <Modal
          show={this.props.show}
          onHide={() => this.props.onHide({ msg: "Cross Icon Clicked!" })}
        >
          <Modal.Header closeButton>
            <Modal.Title>{this.props.data.breedName}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <small className="text-muted">{this.props.data.breedDetails}</small>
            {/* {items.map((item) => (
              <div
                key={item.id}
                className="col-xl-2 col-lg-2 col-md-6 col-sm-6"
              >
                <img
                  src="skata"
                  className="card-img-top img-fluid img-rounded"
                  alt="skata"
                />
              </div>
            ))} */}
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() =>
                this.props.onClick({
                  msg: "Modal Closed!",
                })
              }
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => this.props.onClick({ msg: "Modal Submitted!" })}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default BreedModalComponent;
