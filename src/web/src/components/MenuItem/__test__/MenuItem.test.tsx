import MenuItem from "../MenuItem";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { mount, shallow } from "enzyme";

test("renders only title and subtitle", () => {
  const wrapper = shallow(<MenuItem title="title" subtitle="subtitle" />);

  expect(wrapper.find(Link)).toHaveLength(0);
  expect(wrapper.find({ children: "title" }).text()).toBe("title");
  expect(wrapper.find({ children: "subtitle" }).text()).toBe("subtitle");
});

test("renders title, subtitle and link", () => {
  const wrapper = mount(
    <Router>
      <MenuItem linkTo="/" title="title" subtitle="subtitle" />
    </Router>
  );

  expect(wrapper.find(MenuItem).text()).toBeTruthy();
  expect(wrapper.find(Link)).toHaveLength(1);
  expect(wrapper.find("a").text()).toBe("title");
  expect(wrapper.find({ children: "subtitle" }).text()).toBe("subtitle");
});
