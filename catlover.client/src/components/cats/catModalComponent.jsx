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

  render() {
    const { error, isLoaded, items } = this.state;
    return (
      <div>
        <Modal
          show={this.props.show}
          onHide={() => this.props.onHide({ msg: "Cross Icon Clicked!" })}
        >
          <Modal.Header closeButton>
            <Modal.Title>{items.name}</Modal.Title>
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
            <Button
              variant="primary"
              onClick={() =>
                this.props.onClick({
                  msg: "Modal Closed!",
                })
              }
            >
              Save as Favorite
            </Button>
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
            {/* <Button
              variant="primary"
              onClick={() => this.props.onClick({ msg: "Modal Submitted!" })}
            >
              Submit
            </Button> */}
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default CatModalComponent;
