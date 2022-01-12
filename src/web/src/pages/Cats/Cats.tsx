import { useState } from "react";

import CatModal from "../../components/CatModal/CatModal";
import CatsGallery from "../../components/CatsGallery/CatsGallery";
import LoadMoreButton from "../../components/LoadMoreButton/LoadMoreButton";
import { useOptionalContext } from "../../contexts/ContextHelper";
import {
  CatsContext,
  CatsContextInterface,
} from "../../contexts/CatsContext/CatsContext";
import { Cat } from "../../types";

const Cats = () => {
  const { catsState, pageState, isLoading } =
    useOptionalContext<CatsContextInterface>(CatsContext);
  const [cats] = catsState;
  const [page, setPage] = pageState;

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedCat, setSelectedCat] = useState<Cat>();

  const loadMore = () => {
    setPage(page + 1);
  };

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (cat: Cat) => {
    setSelectedCat(cat);
    setShowModal(true);
  };

  return (
    <>
      <CatsGallery cats={cats} onClick={handleShowModal} />
      <LoadMoreButton isLoading={isLoading} onClick={loadMore} />

      {selectedCat === undefined ? (
        <></>
      ) : (
        <CatModal
          showModal={showModal}
          handleClose={handleCloseModal}
          cat={selectedCat}
        />
      )}
    </>
  );
};

export default Cats;
