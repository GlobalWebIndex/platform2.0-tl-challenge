import { BsHeart, BsHeartFill } from "react-icons/bs";
import { Spinner } from "react-bootstrap";

import { Cat } from "../../types";
import { useOptionalContext } from "../../contexts/ContextHelper";
import {
  FavouritesContext,
  FavouritesContextInterface,
} from "../../contexts/FavouritesContext/FavouritesContext";
import TooltipButton from "../TooltipButton/TooltipButton";

interface CatLikeButtonProps {
  text: string;
  size: number;
  cat: Cat;
}

const CatLikeButton: React.FC<CatLikeButtonProps> = ({ text, size, cat }) => {
  const { favouritesState, addFavourite, removeFavourite, isLoading } =
    useOptionalContext<FavouritesContextInterface>(FavouritesContext);
  const [favourites] = favouritesState;

  const favourite = favourites?.find((f) => f.cat.id === cat.id);
  const isFavourite = favourite != null;

  const updateFavourite = () =>
    isFavourite ? removeFavourite(favourite.id) : addFavourite(cat);

  return (
    <TooltipButton text={text} onClick={updateFavourite}>
      {isLoading ? (
        <Spinner animation="grow" size="sm" />
      ) : isFavourite ? (
        <BsHeartFill color="red" size={size} />
      ) : (
        <BsHeart size={size} />
      )}
    </TooltipButton>
  );
};

export default CatLikeButton;
