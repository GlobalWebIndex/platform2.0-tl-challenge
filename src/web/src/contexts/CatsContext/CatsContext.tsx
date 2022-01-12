import React, { createContext, useState, useEffect } from "react";

import Api, { apiClient } from "../../data/api";
import { Cat } from "../../types";
import { helpers } from "../../utils/helpers";

export interface CatsContextInterface {
  catsState: [Cat[], React.Dispatch<React.SetStateAction<Cat[]>>];
  pageState: [number, React.Dispatch<React.SetStateAction<number>>];
  isLoading: boolean;
}

export const CatsContext = createContext<CatsContextInterface | undefined>(
  undefined
);

interface CatsProviderProps {
  api?: Api;
  children: React.ReactNode;
}

export const CatsProvider: React.FC<CatsProviderProps> = ({
  api = apiClient,
  children,
}) => {
  const [page, setPage] = useState<number>(1);
  const [cats, setCats] = useState<Cat[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      let response = await api.getRandomCats(page, 10);
      setCats(helpers.uniqueId(cats.concat(response.data)));
      setIsLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <CatsContext.Provider
      value={{
        catsState: [cats, setCats],
        pageState: [page, setPage],
        isLoading,
      }}
    >
      {children}
    </CatsContext.Provider>
  );
};
