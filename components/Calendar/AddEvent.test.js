import React from "react";
import renderer from "react-test-renderer";
import AddEvent from "./AddEvent";

it("renders correctly", () => {
  const tree = renderer
    .create(<AddEvent/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
