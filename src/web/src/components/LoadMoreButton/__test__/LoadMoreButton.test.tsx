import { mount, shallow } from "enzyme";
import LoadMoreButton from "../LoadMoreButton";

describe("LoadMoreButton", () => {
  it("renders LoadMoreButton component", () => {
    const wrapper = shallow(
      <LoadMoreButton onClick={() => {}} isLoading={true} />
    );
  });

  it("renders in loading state", () => {
    const wrapper = mount(
      <LoadMoreButton onClick={() => {}} isLoading={true} />
    );

    expect(wrapper.find("button").text()).toBe("Loading...");
    expect(wrapper.find("button").find(".spinner-grow"));
  });

  it("renders in loaded state", () => {
    const wrapper = mount(
      <LoadMoreButton onClick={() => {}} isLoading={false} />
    );

    expect(wrapper.find("button").text()).toBe("Load more");
  });

  it("renders in loaded state and handles click", () => {
    const onClick = jest.fn();
    const wrapper = mount(
      <LoadMoreButton onClick={onClick} isLoading={false} />
    );

    wrapper.find("button").simulate("click");
    expect(onClick).toBeCalled();
  });
});
