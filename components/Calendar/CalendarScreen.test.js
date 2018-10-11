import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import CalendarScreen from "./CalendarScreen";

it("renders correctly", () => {
  const shallow = new ShallowRenderer();
  shallow.render(<CalendarScreen/>);
  const result = shallow.getRenderOutput();
  expect(result.props.children).toBeFalsy();
});
