import { mount, shallow } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import { Container } from "react-bootstrap";

import CatMenu from "../CatMenu";
import { BreedsContext } from "../../../contexts/BreedsContext/BreedsContext";
import { Breed } from "../../../types";
import MenuItem from "../../MenuItem/MenuItem";
import MenuBreeds from "../../MenuBreeds/MenuBreeds";

describe("CatMenu", () => {
  it("render CatMenu Container", () => {
    const wrapper = shallow(<CatMenu />);
    expect(wrapper.find(Container)).toHaveLength(1);
  });

  it("render CatMenu items", () => {
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
          <CatMenu />
        </BreedsContext.Provider>
      </Router>
    );

    expect(
      wrapper.find(MenuItem).find({
        linkTo: "/",
        title: "Random cats",
        subtitle: "See 10 random cats",
      })
    ).toHaveLength(1);

    expect(
      wrapper.find(MenuItem).find({
        linkTo: "/favourites",
        title: "Favourites",
        subtitle: "Manage your favourite photos",
      })
    ).toHaveLength(1);

    expect(
      wrapper
        .find(MenuItem)
        .find({ title: "Breed", subtitle: "explore cats by breed" })
    ).toHaveLength(1);

    expect(wrapper.find(MenuBreeds)).toHaveLength(1);
  });
});
