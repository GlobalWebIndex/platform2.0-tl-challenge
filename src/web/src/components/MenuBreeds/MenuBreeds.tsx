import React, { ReactNode } from "react";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

import {
  BreedsContext,
  BreedsContextInterface,
} from "../../contexts/BreedsContext/BreedsContext";
import { useOptionalContext } from "../../contexts/ContextHelper";
import { Breed } from "../../types";
import styles from "./MenuBreeds.module.css";

const MenuBreeds: React.FC<ReactNode> = () => {
  const { breedsState, pageState, isLoading } =
    useOptionalContext<BreedsContextInterface>(BreedsContext);
  const [breeds] = breedsState;
  const [page, setPage] = pageState;
  const maxPageSize = Number(process.env.REACT_APP_MAX_PAGE_SIZE);

  return (
    <ul className={styles.menuList}>
      {breeds.map((b: Breed) => {
        return (
          <li key={b.id} className={styles.menuItem}>
            <Link className={styles.link} to={`/breed/${b.id}`}>
              {b.title}
            </Link>
          </li>
        );
      })}
      {isLoading ? (
        <li className={styles.menuItem}>
          <Spinner animation="grow" size="sm" />
        </li>
      ) : (
        breeds.length >= maxPageSize && (
          <li>
            <button
              className={styles.loadMoreBreeds}
              onClick={() => setPage(page + 1)}
            >
              Load more
            </button>
          </li>
        )
      )}
    </ul>
  );
};

export default MenuBreeds;
