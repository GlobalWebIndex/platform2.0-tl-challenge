import { Link } from "react-router-dom";

import { Breed } from "../../types";
import { helpers } from "../../utils/helpers";
import styles from "./BreedsLink.module.css";

interface BreedsLinkProps {
  breed?: Breed;
}

const BreedsLink: React.FC<BreedsLinkProps> = ({ breed }) => {
  return helpers.isNullUndefinedOrEmpty(breed) ? (
    <span>Breed is undefined :(</span>
  ) : (
    <Link className={styles.linkItem} to={`/breed/${breed?.id}`}>
      Breed: {breed?.title}
    </Link>
  );
};

export default BreedsLink;
