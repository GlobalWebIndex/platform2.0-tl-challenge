import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

import { Cat } from "../../types";
import BreedsLink from "../BreedsLink/BreedsLink";
import CatCopyButton from "../CatCopyButton/CatCopyButton";
import CatLikeButton from "../CatLikeButton/CatLikeButton";
import LabelValueField from "../LabelValueField/LabelValueField";

interface CatModalProps {
  showModal: boolean;
  handleClose: () => void;
  cat: Cat;
}
const CatModal: React.FC<CatModalProps> = ({ showModal, handleClose, cat }) => {
  return (
    <Modal show={showModal} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <BreedsLink breed={cat?.breed} />
      </Modal.Header>
      <Modal.Body className="p-0">
        <Image src={cat.imageUrl} fluid />
      </Modal.Body>
      <Modal.Footer>
        <Row>
          {cat?.breed == null ? (
            <span>No breed info available</span>
          ) : (
            <>
              <h4>{cat.breed?.title}</h4>
              <LabelValueField label="Wikipedia" value={cat.breed.details} />
            </>
          )}
        </Row>
        <Row>
          <Col>
            <CatCopyButton
              tooltipText="Copy cat url"
              copyText={cat.imageUrl}
              size={23}
            />
            <CatLikeButton text="Like cat" size={23} cat={cat} />
          </Col>
        </Row>
      </Modal.Footer>
    </Modal>
  );
};

export default CatModal;
