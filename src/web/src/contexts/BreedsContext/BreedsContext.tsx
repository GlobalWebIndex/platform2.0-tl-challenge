import React, { createContext, useState, useEffect } from "react";

import Api, { apiClient } from "../../data/api";
import { Breed } from "../../types";

export interface BreedsContextInterface {
  breedsState: [Breed[], React.Dispatch<React.SetStateAction<Breed[]>>];
  pageState: [number, React.Dispatch<React.SetStateAction<number>>];
  isLoading: React.SetStateAction<boolean>;
}

export const BreedsContext = createContext<BreedsContextInterface | undefined>(
  undefined
);

interface BreedsProviderProps {
  api?: Api;
  children: React.ReactNode;
}

export const BreedsProvider: React.FC<BreedsProviderProps> = ({
  api = apiClient,
  children,
}) => {
  const [page, setPage] = useState<number>(1);
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      let result = await api.getBreeds(page, 10);
      setBreeds(breeds.concat(result.data));
      setIsLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <BreedsContext.Provider
      value={{
        breedsState: [breeds, setBreeds],
        pageState: [page, setPage],
        isLoading,
      }}
    >
      {children}
    </BreedsContext.Provider>
  );
};
