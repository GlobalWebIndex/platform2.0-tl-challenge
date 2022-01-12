import axios, { AxiosInstance, AxiosResponse } from "axios";
import { Breed, Favourite, Cat } from "../types";

export default class Api {
  client: AxiosInstance;
  tokenId: string = "";

  constructor(customClient?: AxiosInstance) {
    if (customClient === undefined) {
      const ssl = process.env.REACT_APP_BACKEND_SSL;
      const host = process.env.REACT_APP_BACKEND_HOST;
      const port = process.env.REACT_APP_BACKEND_PORT;
      const isDemo = process.env.REACT_APP_DEMO_USER_ON;

      var headers = {
        "Content-Type": "application/json",
        "token-id": isDemo === "true" ? "DEMO" : this.tokenId,
      };

      this.client = axios.create({
        baseURL: `${ssl === "true" ? "https" : "http"}://${host}:${port}/api`,
        headers,
      });

      this.client.interceptors.response.use(
        (response) => response,
        (error) => {
          if (error.response.status === 401) {
            window.location.href = "/auth/login";
          }
        }
      );
    } else {
      this.client = customClient;
    }
  }

  getRandomCats = async (
    page: number = 1,
    pageSize: number = 3
  ): Promise<AxiosResponse<Cat[]>> => {
    return await this.client.get<Cat[]>(`/v1/cats/random`);
  };

  getCatsByBreedId = async (
    breedId: string,
    page: number = 1,
    pageSize: number = 3
  ): Promise<AxiosResponse<Cat[]>> => {
    return await this.client.get<Cat[]>(
      `/v1/cats?pageSize=${pageSize}&page=${page}&breed_id=${breedId}`
    );
  };

  getFavourites = async (): Promise<AxiosResponse<Favourite[]>> => {
    return await this.client.get<Favourite[]>("/v1/user/favourites");
  };

  postFavourite = async (cat: Cat): Promise<AxiosResponse<boolean>> => {
    return await this.client.post<boolean>("/v1/user/favourites", cat);
  };

  deleteFavourite = async (id: number): Promise<AxiosResponse<boolean>> => {
    return await this.client.delete<boolean>(`/v1/user/favourites/${id}`);
  };

  getBreed = async (id: string): Promise<AxiosResponse<Breed>> => {
    return await this.client.get<Breed>(`/v1/breeds/${id}`);
  };

  getBreeds = async (
    page: number = 1,
    pageSize: number = 10
  ): Promise<AxiosResponse<Breed[]>> => {
    return await this.client.get<Breed[]>(
      `/v1/breeds?pageSize=${pageSize}&page=${page}`
    );
  };
}

export const apiClient = new Api();
