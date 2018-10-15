import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import HomeScreen from "./HomeScreen";

it("renders correctly", () => {
  const renderer = new ShallowRenderer();
  const tree = renderer
    .render(<HomeScreen/>);
  expect(tree).toMatchSnapshot();
});
