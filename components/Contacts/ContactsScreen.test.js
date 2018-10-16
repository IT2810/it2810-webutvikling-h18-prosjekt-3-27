import React from "react";
import ContactsScreen from "./ContactsScreen";
import ShallowRenderer from 'react-test-renderer/shallow';

it("renders correctly", () => {
  const renderer = new ShallowRenderer();
  const tree = renderer.render(<ContactsScreen />);
  expect(tree).toMatchSnapshot();
});
