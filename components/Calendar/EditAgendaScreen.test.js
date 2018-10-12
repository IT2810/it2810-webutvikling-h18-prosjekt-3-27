import React from "react";
import renderer from "react-test-renderer";
import EditAgendaScreen from "./EditAgendaScreen";

it("renders correctly", () => {
  const tree = renderer
    .create(<EditAgendaScreen/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
