import React from "react";
import renderer from "react-test-renderer";
import AddAgendaScreen from "./AddAgendaScreen";

it("renders correctly", () => {
  const tree = renderer
    .create(<AddAgendaScreen/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
