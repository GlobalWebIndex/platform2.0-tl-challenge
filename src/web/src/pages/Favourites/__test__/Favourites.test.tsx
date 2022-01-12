import { mount, shallow } from "enzyme";
import { Card } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import CatCopyButton from "../../../components/CatCopyButton/CatCopyButton";
import CatLikeButton from "../../../components/CatLikeButton/CatLikeButton";
import {
  FavouritesContext,
  FavouritesProvider,
} from "../../../contexts/FavouritesContext/FavouritesContext";

import { Favourite, Cat } from "../../../types";
import Favourites from "../Favourites";

describe("Favourites", () => {
  it("renders Favourites component", () => {
    const wrapper = shallow(
      <FavouritesProvider>
        <Favourites />
      </FavouritesProvider>
    );
  });

  it("renders full Favourites component", () => {
    const wrapper = mount(
      <Router>
        <FavouritesContext.Provider
          value={{
            favouritesState: [[], jest.fn()],
            addFavourite: jest.fn(),
            removeFavourite: jest.fn(),
            isLoading: false,
          }}
        >
          <Favourites />
        </FavouritesContext.Provider>
      </Router>
    );

    expect(wrapper.find(Card).length).toBe(0);
  });

  it("renders one favourite", () => {
    const mockCat: Cat = {
      id: 1,
      title: "tiger",
      imageUrl: "https://img.placeholder/1.jpg",
    };
    const favourites: Favourite[] = [{ id: 1, cat: mockCat }];
    const wrapper = mount(
      <Router>
        <FavouritesContext.Provider
          value={{
            favouritesState: [favourites, jest.fn()],
            addFavourite: jest.fn(),
            removeFavourite: jest.fn(),
            isLoading: false,
          }}
        >
          <Favourites />
        </FavouritesContext.Provider>
      </Router>
    );

    expect(wrapper.find(Card).length).toBe(1);
    expect(wrapper.find(CatCopyButton).length).toBe(1);
    expect(wrapper.find(CatLikeButton).length).toBe(1);
  });

  it("renders two favourites", () => {
    const mockCat: Cat = {
      id: 1,
      title: "Tiger",
      imageUrl: "https://img.placeholder/1.jpg",
    };
    const favourites: Favourite[] = [
      { id: 1, cat: mockCat },
      { id: 2, cat: mockCat },
    ];
    const wrapper = mount(
      <Router>
        <FavouritesContext.Provider
          value={{
            favouritesState: [favourites, jest.fn()],
            addFavourite: jest.fn(),
            removeFavourite: jest.fn(),
            isLoading: false,
          }}
        >
          <Favourites />
        </FavouritesContext.Provider>
      </Router>
    );

    expect(wrapper.find(Card).length).toBe(2);
    expect(wrapper.find(CatCopyButton).length).toBe(2);
    expect(wrapper.find(CatLikeButton).length).toBe(2);
  });
});
