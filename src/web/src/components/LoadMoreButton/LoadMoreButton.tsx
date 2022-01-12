import { Col, Row, Button, Spinner } from "react-bootstrap";

interface LoadMoreButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  onClick,
  isLoading,
}) => {
  const loadingButton = isLoading ? (
    <Button variant="outline-secondary" disabled>
      <Spinner
        as="span"
        animation="grow"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      Loading...
    </Button>
  ) : (
    <Button variant="outline-secondary" onClick={onClick}>
      Load more
    </Button>
  );
  return (
    <Row className="justify-content-md-center pb-4">
      <Col md="auto">{loadingButton}</Col>
    </Row>
  );
};

export default LoadMoreButton;
