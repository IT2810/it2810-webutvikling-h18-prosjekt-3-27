import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import CalendarScreen from "./CalendarScreen";

it("renders correctly", () => {
  const shallow = new ShallowRenderer();
  shallow.render(<CalendarScreen/>);
  const result = shallow.getRenderOutput();
  expect(result.props.children).toBeFalsy();
  expect(result).toMatchSnapshot();
});

describe("test static helper methods", () => {
  test("timeToString", () => {
    const startTime = "2018-10-11";
    const date = new Date(startTime);
    const result = CalendarScreen.timeToString(date.getTime());
    expect(result).toBe(startTime);
  });
  test("rowHasChanged equals returns false", () => {
    const item1 = {name: "itemName", note: "itemNote"};
    const item2 = {name: "itemName", note: "itemNote"};
    const result = CalendarScreen.rowHasChanged(item1, item2);
    expect(result).toBeFalsy();
  });
  test("rowHasChanged different returns true", () => {
    const item1 = {name: "itemName", note: "itemNote"};
    const item2 = {name: "itemName", note: "itemNote has changed"};
    const result = CalendarScreen.rowHasChanged(item1, item2);
    expect(result).toBeTruthy();
  });
});
