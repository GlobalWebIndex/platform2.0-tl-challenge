import React from "react";
import { Image } from "react-bootstrap";

import { Cat } from "../../types";
import styles from "./CatsGallery.module.css";

interface CatsGalleryProps {
  cats: Cat[];
  onClick?: (cat: Cat) => void;
}

const CatsGallery: React.FC<CatsGalleryProps> = ({ cats, onClick }) => {
  return (
    <ul className={styles.catsGallery}>
      {cats.map((cat) => (
        <li className={styles.catsGalleryItem} key={cat.id}>
          <Image
            onClick={() => {
              onClick != null && onClick(cat);
            }}
            src={cat.imageUrl}
          />
        </li>
      ))}
      <li></li>
    </ul>
  );
};

export default CatsGallery;
