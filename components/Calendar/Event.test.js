import React from "react";
import renderer from "react-test-renderer";
import Event from "./Event";

it("renders correctly", () => {
  const tree = renderer
    .create(<Event/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
