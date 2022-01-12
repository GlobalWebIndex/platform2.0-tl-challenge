import { mount } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";

import MenuBreeds from "../MenuBreeds";
import { Breed } from "../../../types";
import { BreedsContext } from "../../../contexts/BreedsContext/BreedsContext";

describe("MenuBreeds", () => {
  it("render menu breeds loading state", () => {
    const breeds: Breed[] = [];
    const page = 1;
    var isLoading = true;
    const wrapper = mount(
      <Router>
        <BreedsContext.Provider
          value={{
            breedsState: [breeds, jest.fn()],
            pageState: [page, jest.fn()],
            isLoading,
          }}
        >
          <MenuBreeds />
        </BreedsContext.Provider>
      </Router>
    );

    expect(wrapper.find(MenuBreeds)).toHaveLength(1);
    expect(wrapper.find(".menuItem")).toHaveLength(1);
    expect(wrapper.find(".spinner-grow")).toHaveLength(1);
  });

  it("render menu breeds loaded without load more", () => {
    const breed1: Breed = { id: 1, title: "Breed Name 1" };
    const breed2: Breed = { id: 2, title: "Breed Name 2" };
    const breeds: Breed[] = [breed1, breed2];
    const page = 1;
    var isLoading = false;

    const wrapper = mount(
      <Router>
        <BreedsContext.Provider
          value={{
            breedsState: [breeds, jest.fn()],
            pageState: [page, jest.fn()],
            isLoading,
          }}
        >
          <MenuBreeds />
        </BreedsContext.Provider>
      </Router>
    );

    expect(wrapper.find(MenuBreeds)).toHaveLength(1);
    expect(wrapper.find(".spinner-grow")).toHaveLength(0);
    expect(
      wrapper
        .find(`a[href='/breed/${breed1.id}']`)
        .find({ children: breed1.title })
        .text()
    ).toBe(breed1.title);
    expect(
      wrapper
        .find(`a[href='/breed/${breed2.id}']`)
        .find({ children: breed2.title })
        .text()
    ).toBe(breed2.title);
    expect(wrapper.find("a[href='#']")).toHaveLength(0);
  });

  it("render menu breeds loaded with load more", () => {
    const loadMoreText = "Load more";
    const breeds: Breed[] = [
      { id: 1, title: "Breed Title 1" },
      { id: 2, title: "Breed Title 2" },
      { id: 3, title: "Breed Title 3" },
      { id: 4, title: "Breed Title 4" },
      { id: 5, title: "Breed Title 5" },
      { id: 6, title: "Breed Title 6" },
      { id: 7, title: "Breed Title 7" },
      { id: 8, title: "Breed Title 8" },
      { id: 9, title: "Breed Title 9" },
      { id: 10, title: "Breed Title 10" },
      { id: 11, title: "Breed Title 11" },
    ];
    const page = 1;
    var isLoading = false;

    const wrapper = mount(
      <Router>
        <BreedsContext.Provider
          value={{
            breedsState: [breeds, jest.fn()],
            pageState: [page, jest.fn()],
            isLoading,
          }}
        >
          <MenuBreeds />
        </BreedsContext.Provider>
      </Router>
    );

    expect(wrapper.find(MenuBreeds)).toHaveLength(1);
    expect(wrapper.find("button")).toHaveLength(1);
    expect(wrapper.find("button").find({ children: loadMoreText }).text()).toBe(
      loadMoreText
    );
  });
});
