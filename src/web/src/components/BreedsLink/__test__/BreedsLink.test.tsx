import { mount, shallow } from "enzyme";
import { BrowserRouter as Router, Link } from "react-router-dom";

import BreedsLink from "../../BreedsLink/BreedsLink";

describe("BreedsLink", () => {
  const mockBreed = { id: 1, title: "Breed 1" };

  it("renders BreedsLink component", () => {
    const wrapper = shallow(<BreedsLink />);
  });

  it("renders breed is undefined", () => {
    const wrapper = mount(<BreedsLink />);

    expect(wrapper.text()).toBe("Breed is undefined :(");
  });

  it("renders breed is undefined", () => {
    const wrapper = mount(
      <Router>
        <BreedsLink breed={mockBreed} />
      </Router>
    );

    expect(wrapper.find(Link).exists()).toBeTruthy();
    expect(wrapper.find(Link).find({ href: "/breed/1" }).exists()).toBeTruthy();
    expect(wrapper.find(Link).text()).toBe("Breed: Breed 1");
  });
});
