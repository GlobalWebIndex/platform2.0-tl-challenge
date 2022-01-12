import { mount, shallow } from "enzyme";

import CatLikeButton from "../CatLikeButton";
import { Favourite, Cat } from "../../../types";
import {
  FavouritesContext,
  FavouritesProvider,
} from "../../../contexts/FavouritesContext/FavouritesContext";
import TooltipButton from "../../TooltipButton/TooltipButton";
import { Spinner } from "react-bootstrap";
import { BsHeart, BsHeartFill } from "react-icons/bs";

describe("CatLikeButton", () => {
  const mockCat: Cat = {
    id: 1,
    title: "tiger",
    imageUrl: "https://img.placeholder/1.jpg",
  };

  it("renders CatLikeButton component", () => {
    const wrapper = shallow(
      <FavouritesProvider>
        <CatLikeButton text="Like" size={10} cat={mockCat} />
      </FavouritesProvider>
    );
  });

  it("renders CatLikeButton component", () => {
    const wrapper = mount(
      <FavouritesContext.Provider
        value={{
          favouritesState: [[], jest.fn()],
          addFavourite: jest.fn(),
          removeFavourite: jest.fn(),
          isLoading: true,
        }}
      >
        <CatLikeButton text="Like" size={10} cat={mockCat} />
      </FavouritesContext.Provider>
    );

    expect(wrapper.find(Spinner).exists()).toBeTruthy();
  });

  it("renders in loaded state without favourite", () => {
    const favourites: Favourite[] = [];
    const wrapper = mount(
      <FavouritesContext.Provider
        value={{
          favouritesState: [favourites, jest.fn()],
          addFavourite: jest.fn(),
          removeFavourite: jest.fn(),
          isLoading: false,
        }}
      >
        <CatLikeButton text="Like" size={10} cat={mockCat} />
      </FavouritesContext.Provider>
    );

    expect(wrapper.find(TooltipButton).exists()).toBeTruthy();
    expect(wrapper.find(TooltipButton).find(BsHeart).exists()).toBeTruthy();
  });

  it("renders in loaded state with favourite", () => {
    const favourites: Favourite[] = [{ id: 1, cat: mockCat }];
    const wrapper = mount(
      <FavouritesContext.Provider
        value={{
          favouritesState: [favourites, jest.fn()],
          addFavourite: jest.fn(),
          removeFavourite: jest.fn(),
          isLoading: false,
        }}
      >
        <CatLikeButton text="Like" size={10} cat={mockCat} />
      </FavouritesContext.Provider>
    );

    expect(wrapper.find(TooltipButton).exists()).toBeTruthy();
    expect(wrapper.find(TooltipButton).find(BsHeartFill).exists()).toBeTruthy();
  });

  it("renders and handles remove favourite button", () => {
    const favourites: Favourite[] = [{ id: 1, cat: mockCat }];
    const addFavouriteHandler = jest.fn();
    const removeFavouriteHandler = jest.fn();
    const wrapper = mount(
      <FavouritesContext.Provider
        value={{
          favouritesState: [favourites, jest.fn()],
          addFavourite: addFavouriteHandler,
          removeFavourite: removeFavouriteHandler,
          isLoading: false,
        }}
      >
        <CatLikeButton text="Like" size={10} cat={mockCat} />
      </FavouritesContext.Provider>
    );

    wrapper.find(TooltipButton).find(BsHeartFill).simulate("click");
    expect(removeFavouriteHandler).toBeCalled();
    expect(addFavouriteHandler).toBeCalledTimes(0);
  });

  it("renders and handles add favourite button", () => {
    const addFavouriteHandler = jest.fn();
    const removeFavouriteHandler = jest.fn();
    const wrapper = mount(
      <FavouritesContext.Provider
        value={{
          favouritesState: [[], jest.fn()],
          addFavourite: addFavouriteHandler,
          removeFavourite: removeFavouriteHandler,
          isLoading: false,
        }}
      >
        <CatLikeButton text="Like" size={10} cat={mockCat} />
      </FavouritesContext.Provider>
    );

    wrapper.find(TooltipButton).find(BsHeart).simulate("click");
    expect(removeFavouriteHandler).toBeCalledTimes(0);
    expect(addFavouriteHandler).toBeCalled();
  });
});
