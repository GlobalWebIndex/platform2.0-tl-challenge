import { mount, shallow } from "enzyme";
import { Modal, Image } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";

import CatModal from "../CatModal";
import { Cat } from "../../../types";
import {
  FavouritesContext,
  FavouritesProvider,
} from "../../../contexts/FavouritesContext/FavouritesContext";
import BreedsLink from "../../BreedsLink/BreedsLink";
import CatCopyButton from "../../CatCopyButton/CatCopyButton";
import CatLikeButton from "../../CatLikeButton/CatLikeButton";
import LabelValueField from "../../LabelValueField/LabelValueField";

describe("CatModal", () => {
  const mockCat: Cat = {
    id: 1,
    title: "tiger",
    imageUrl: "https://img.placeholder/1.jpg",
  };
  it("renders CatModal component", () => {
    const wrapper = shallow(
      <CatModal showModal={true} handleClose={() => {}} cat={mockCat} />
    );
  });

  it("renders full CatModal component", () => {
    const wrapper = mount(
      <FavouritesProvider>
        <CatModal showModal={true} handleClose={() => {}} cat={mockCat} />
      </FavouritesProvider>
    );
  });

  it("renders CatModal without breed details", () => {
    const wrapper = mount(
      <FavouritesContext.Provider
        value={{
          favouritesState: [[], jest.fn()],
          addFavourite: jest.fn(),
          removeFavourite: jest.fn(),
          isLoading: false,
        }}
      >
        <CatModal showModal={true} handleClose={() => {}} cat={mockCat} />
      </FavouritesContext.Provider>
    );

    expect(wrapper.find(Modal.Header).exists()).toBeTruthy();
    expect(wrapper.find(Modal.Header).find(BreedsLink).exists()).toBeTruthy();

    expect(wrapper.find(Modal.Body).exists()).toBeTruthy();
    expect(wrapper.find(Modal.Body).find(Image).exists()).toBeTruthy();

    expect(wrapper.find(Modal.Footer).exists()).toBeTruthy();
    expect(
      wrapper.find(Modal.Footer).find(CatCopyButton).exists()
    ).toBeTruthy();
    expect(
      wrapper.find(Modal.Footer).find(CatLikeButton).exists()
    ).toBeTruthy();
  });

  it("renders CatModal with breed details", () => {
    const mockCat: Cat = {
      id: 1,
      title: "Tiger 2",
      imageUrl: "https://img.placeholder/1.jpg",
      breed: { id: 1, title: "Tiger", details: "Breed details" },
    };
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
          <CatModal showModal={true} handleClose={() => {}} cat={mockCat} />
        </FavouritesContext.Provider>
      </Router>
    );

    expect(
      wrapper.find(Modal.Footer).find(LabelValueField).exists()
    ).toBeTruthy();
    expect(wrapper.find(Modal.Footer).find("h4").text()).toBe(
      mockCat.breed?.title
    );
  });
});
