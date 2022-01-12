import React from "react";
import { mount } from "enzyme";
import axios from "axios";
import { act } from "@testing-library/react";

import { useOptionalContext } from "../../ContextHelper";
import Api from "../../../data/api";
import {
  FavouritesContext,
  FavouritesContextInterface,
  FavouritesProvider,
} from "../FavouritesContext";
import { Favourite } from "../../../types";

jest.mock("axios");

describe("FavouritesContext", () => {
  const mockAxios = axios as jest.Mocked<typeof axios>;
  const mockFavourites: Favourite[] = [
    {
      id: 1,
      cat: {
        id: 1,
        title: "title 1",
        imageUrl: "https://img.placeholder/1.jpg",
      },
    },
    {
      id: 2,
      cat: {
        id: 2,
        title: "title 2",
        imageUrl: "https://img.placeholder/2.jpg",
      },
    },
    {
      id: 3,
      cat: {
        id: 3,
        title: "title 3",
        imageUrl: "https://img.placeholder/3.jpg",
      },
    },
  ];
  const TestComponent: React.FC = () => {
    const { favouritesState, addFavourite, removeFavourite, isLoading } =
      useOptionalContext<FavouritesContextInterface>(FavouritesContext);
    const [favourites] = favouritesState;

    return isLoading ? (
      <span>is loading</span>
    ) : (
      <>
        <ul>
          {favourites.map((fav) => (
            <li key={`${fav.id}-${Math.floor(Math.random() * 1000)}`}>
              <div>
                <img src={fav.cat.imageUrl} />
                <span onClick={() => addFavourite(fav.cat)}>Add</span>
                <span onClick={() => removeFavourite(fav.cat.id)}>Remove</span>
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  };

  it("Is loading", async () => {
    mockAxios.get.mockResolvedValue({ data: [] });
    const api = new Api(mockAxios);
    const wrapper = mount(
      <FavouritesProvider api={api}>
        <TestComponent />
      </FavouritesProvider>
    );

    await act(() => new Promise(setImmediate));

    expect(wrapper.find({ children: "is loading" }).exists()).toBeTruthy();
  });

  it("Is loaded", async () => {
    mockAxios.get.mockResolvedValue({ data: mockFavourites });
    const api = new Api(mockAxios);
    const wrapper = mount(
      <FavouritesProvider api={api}>
        <TestComponent />
      </FavouritesProvider>
    );

    await act(() => new Promise(setImmediate));
    wrapper.update();

    expect(wrapper.find("img").at(0).prop("src")).toEqual(
      mockFavourites[0].cat.imageUrl
    );
    expect(wrapper.find("img").at(1).prop("src")).toEqual(
      mockFavourites[1].cat.imageUrl
    );
    expect(wrapper.find("img").at(2).prop("src")).toEqual(
      mockFavourites[2].cat.imageUrl
    );
  });

  it("Add and remove favourite", async () => {
    mockAxios.get.mockResolvedValue({ data: mockFavourites });
    mockAxios.post.mockResolvedValue({ data: {} });
    mockAxios.delete.mockResolvedValue({ data: {} });
    const api = new Api(mockAxios);
    const wrapper = mount(
      <FavouritesProvider api={api}>
        <TestComponent />
      </FavouritesProvider>
    );

    await act(() => new Promise(setImmediate));
    wrapper.update();

    wrapper.find({ children: "Add" }).at(0).simulate("click");
    wrapper.find({ children: "Remove" }).at(0).simulate("click");

    await act(() => new Promise(setImmediate));
    wrapper.update();

    expect(mockAxios.post).toBeCalledTimes(1);
    expect(mockAxios.delete).toBeCalledTimes(1);
  });
});
