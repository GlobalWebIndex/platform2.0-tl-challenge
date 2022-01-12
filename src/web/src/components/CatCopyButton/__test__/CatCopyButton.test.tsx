import { mount, shallow } from "enzyme";
import TooltipButton from "../../TooltipButton/TooltipButton";
import CatCopyButton from "../CatCopyButton";

describe("CatCopyButton", () => {
  it("render CatCopyButton component", () => {
    const wrapper = shallow(
      <CatCopyButton copyText="" tooltipText="" size={1} />
    );
  });

  it("render CatCopyButton component", () => {
    const wrapper = mount(
      <CatCopyButton copyText="Copy Text" tooltipText="Tooltip" size={1} />
    );

    expect(wrapper.find(TooltipButton).exists()).toBeTruthy();
  });
});
