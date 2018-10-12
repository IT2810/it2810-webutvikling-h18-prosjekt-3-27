import React from "react";
import renderer from "react-test-renderer";
import Event from "./Event";

it("renders correctly", () => {
  const tree = renderer
    .create(<Event/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders events correctly", () => {
  const agenda = {
    id: 25,
    date: new Date("2018-09-01"),
    name: "The event name",
    note: "A longer description which is supposed to be cut off at some point"
  };
  const tree = renderer
    .create(<Event event={agenda} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
