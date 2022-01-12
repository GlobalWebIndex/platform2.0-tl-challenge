import { mount, shallow } from "enzyme";
import { Button } from "react-bootstrap";

import TooltipButton from "../TooltipButton";

describe("TooltipButton", () => {
  it("renders TooltipButton component", () => {
    const wrapper = shallow(
      <TooltipButton text="Tooltip" onClick={() => {}}>
        <span>test</span>
      </TooltipButton>
    );
  });

  it("renders tooltip with message", () => {
    const wrapper = mount(
      <TooltipButton text="Tooltip" onClick={() => {}}>
        <span>Tooltip</span>
      </TooltipButton>
    );

    expect(wrapper.find(Button).text()).toBe("Tooltip");
  });
});
