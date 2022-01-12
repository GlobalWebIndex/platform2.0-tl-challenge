import React, { createContext, useState, useEffect } from "react";

import Api, { apiClient } from "../../data/api";
import { Cat, Favourite } from "../../types";

export interface FavouritesContextInterface {
  favouritesState: [
    Favourite[],
    React.Dispatch<React.SetStateAction<Favourite[]>>
  ];
  addFavourite: (cat: Cat) => void;
  removeFavourite: (favId: number) => void;
  isLoading: React.SetStateAction<boolean>;
}

export const FavouritesContext = createContext<
  FavouritesContextInterface | undefined
>(undefined);

interface FavouritesProviderProps {
  api?: Api;
  children: React.ReactNode;
}

export const FavouritesProvider: React.FC<FavouritesProviderProps> = ({
  api = apiClient,
  children,
}) => {
  const [favourites, setFavourites] = useState<Favourite[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    loadFavourites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadFavourites = () => {
    setIsLoading(true);
    (async () => {
      let response = await api.getFavourites();
      setIsLoading(false);
      setFavourites(response.data);
    })();
  };

  const addFavourite = async (cat: Cat) => {
    await api.postFavourite(cat);
    loadFavourites();
  };

  const removeFavourite = async (favId: number) => {
    await api.deleteFavourite(favId);
    loadFavourites();
  };

  return (
    <FavouritesContext.Provider
      value={{
        favouritesState: [favourites, setFavourites],
        addFavourite,
        removeFavourite,
        isLoading,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
