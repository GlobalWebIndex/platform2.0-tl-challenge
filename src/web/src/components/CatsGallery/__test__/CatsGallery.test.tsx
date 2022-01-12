import { mount } from "enzyme";

import { Cat } from "../../../types";
import CatsGallery from "../CatsGallery";

describe("CatsGallery", () => {
  const mockCats: Cat[] = [
    { id: 1, title: "title", imageUrl: "https://img.placeholder/1.jpg" },
    { id: 2, title: "title", imageUrl: "https://img.placeholder/2.jpg" },
    { id: 3, title: "title", imageUrl: "https://img.placeholder/3.jpg" },
  ];
  const mockedOnClick = jest.fn();

  it("render images without passing onClick", () => {
    const wrapper = mount(<CatsGallery cats={mockCats} />);

    expect(wrapper.find("li").length).toBe(3 + 1);
    wrapper
      .find("li")
      .filterWhere((li) => li.find("img").exists())
      .forEach((node, index) => {
        expect(node.find("img").prop("src")).toEqual(mockCats[index].imageUrl);
      });
  });

  it("render images with passing onClick", () => {
    const wrapper = mount(
      <CatsGallery cats={mockCats} onClick={mockedOnClick} />
    );

    expect(wrapper.find("li").length).toBe(3 + 1);

    wrapper.find("li").at(0).find("img").simulate("click");

    expect(mockedOnClick).toBeCalled();
  });

  it("render images and click without passing onClick", () => {
    const wrapper = mount(<CatsGallery cats={mockCats} />);

    expect(wrapper.find("li").length).toBe(3 + 1);

    wrapper.find("li").at(0).find("img").simulate("click");

    expect(mockedOnClick).toBeCalledTimes(0);
  });
});
