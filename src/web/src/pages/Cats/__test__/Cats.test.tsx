import { mount, shallow } from "enzyme";
import { Image } from "react-bootstrap";
import CatsGallery from "../../../components/CatsGallery/CatsGallery";
import LoadMoreButton from "../../../components/LoadMoreButton/LoadMoreButton";

import {
  CatsContext,
  CatsProvider,
} from "../../../contexts/CatsContext/CatsContext";
import { Cat } from "../../../types";
import Cats from "../Cats";

describe("Cats", () => {
  it("Renders Cats component", () => {
    const wrapper = shallow(
      <CatsProvider>
        <Cats />
      </CatsProvider>
    );
  });

  it("Renders ", () => {
    const mockCats: Cat[] = [
      { id: 1, title: "title", imageUrl: "https://img.placeholder/1.jpg" },
      { id: 2, title: "title", imageUrl: "https://img.placeholder/2.jpg" },
      { id: 3, title: "title", imageUrl: "https://img.placeholder/3.jpg" },
    ];
    const page = 1;
    var isLoading = true;

    const wrapper = mount(
      <CatsContext.Provider
        value={{
          catsState: [mockCats, jest.fn()],
          pageState: [page, jest.fn()],
          isLoading,
        }}
      >
        <Cats />
      </CatsContext.Provider>
    );

    expect(wrapper.find(CatsGallery).find(Image).length).toBe(3);
    expect(wrapper.find(LoadMoreButton).exists()).toBeTruthy();
  });
});
