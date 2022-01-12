import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";

import { BreedsProvider } from "./contexts/BreedsContext/BreedsContext";
import CatMenu from "./components/CatMenu/CatMenu";
import { CatsProvider } from "./contexts/CatsContext/CatsContext";
import { FavouritesProvider } from "./contexts/FavouritesContext/FavouritesContext";
import Breeds from "./pages/Breeds/Breeds";
import Cats from "./pages/Cats/Cats";
import Favourites from "./pages/Favourites/Favourites";

const App = () => {
  return (
    <Router>
      <Container>
        <Row>
          <Col xs={3}>
            <BreedsProvider>
              <CatMenu />
            </BreedsProvider>
          </Col>
          <Col xs={9}>
            <CatsProvider>
              <FavouritesProvider>
                <Switch>
                  <Route path="/breed/:id" component={Breeds} />
                  <Route path="/favourites" component={Favourites} />
                  <Route path="/" component={Cats} />
                </Switch>
              </FavouritesProvider>
            </CatsProvider>
          </Col>
        </Row>
      </Container>
    </Router>
  );
};

export default App;
