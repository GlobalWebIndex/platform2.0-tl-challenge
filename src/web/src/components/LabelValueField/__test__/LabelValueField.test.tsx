import { mount } from "enzyme";
import LabelValueField from "../LabelValueField";

describe("LabelValueField", () => {
  const lblText: string = "Label text";
  const valText: string = "Value text";

  it("render with label and value", () => {
    const wrapper = mount(<LabelValueField label={lblText} value={valText} />);

    expect(wrapper.find(".me-auto").exists()).toBeTruthy();
    expect(wrapper.find(".fw-bold").exists()).toBeTruthy();
    expect(wrapper.find({ children: lblText }).exists()).toBeTruthy();
    expect(wrapper.find(".me-auto").children().at(1).text()).toBe(valText);
  });

  it("render with label and value. Children not exists", () => {
    const wrapper = mount(
      <LabelValueField label={lblText} value={valText}>
        <div className="p-1" />
      </LabelValueField>
    );

    expect(wrapper.find(".me-auto").exists()).toBeTruthy();
    expect(wrapper.find(".fw-bold").exists()).toBeTruthy();
    expect(wrapper.find({ children: lblText }).exists()).toBeTruthy();
    expect(wrapper.find(".me-auto").children().at(1).text()).toBe(valText);
    expect(wrapper.find(".p-1").exists()).toBeFalsy();
  });

  it("render with label and children", () => {
    const wrapper = mount(
      <LabelValueField label={lblText}>
        <div className="p-1" />
      </LabelValueField>
    );

    expect(wrapper.find(".me-auto").exists()).toBeTruthy();
    expect(wrapper.find(".fw-bold").exists()).toBeTruthy();
    expect(wrapper.find({ children: lblText }).exists()).toBeTruthy();
    expect(wrapper.find(".p-1").exists()).toBeTruthy();
  });
});
