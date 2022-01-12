import { Card, Container, Col, Row, Spinner } from "react-bootstrap";
import CatCopyButton from "../../components/CatCopyButton/CatCopyButton";
import CatLikeButton from "../../components/CatLikeButton/CatLikeButton";
import { useOptionalContext } from "../../contexts/ContextHelper";
import {
  FavouritesContext,
  FavouritesContextInterface,
} from "../../contexts/FavouritesContext/FavouritesContext";

const Favourites = () => {
  const { favouritesState } =
    useOptionalContext<FavouritesContextInterface>(FavouritesContext);
  const [favourites] = favouritesState;

  return (
    <Container>
      {favourites ? (
        <Row>
          {favourites.map((f, index) => {
            return (
              <Col key={index} xs={12} md={6} className="p-2">
                <Card>
                  <Card.Img src={f.cat.imageUrl} />
                  <Card.Body>
                    <CatCopyButton
                      tooltipText="Copy image url"
                      copyText={f.cat.imageUrl}
                      size={23}
                    />
                    <CatLikeButton text="Like image" size={23} cat={f.cat} />
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      ) : (
        <Spinner animation="border" className="m-5" />
      )}
    </Container>
  );
};

export default Favourites;
