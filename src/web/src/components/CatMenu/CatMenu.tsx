import React from "react";
import { Container } from "react-bootstrap";

import styles from "./CatMenu.module.css";
import MenuItem from "../MenuItem/MenuItem";
import MenuBreeds from "../MenuBreeds/MenuBreeds";

const CatMenu: React.FC = () => {
  return (
    <Container className={styles.sideMenu}>
      <MenuItem linkTo="/" title="Random cats" subtitle="See 10 random cats" />
      <MenuItem
        linkTo="/favourites"
        title="Favourites"
        subtitle="Manage your favourite photos"
      />
      <MenuItem title="Breed" subtitle="explore cats by breed" />
      <MenuBreeds />
    </Container>
  );
};

export default CatMenu;
