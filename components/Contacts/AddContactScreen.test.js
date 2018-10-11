import React from "react";
import AddContactScreen from './AddContactScreen';


//Simple snapshot test for addcontactscreen
test('renders correctly', () => {
  const renderer = new ShallowRenderer();
  const tree = renderer.render(<AddContactScreen/>);
  expect(tree).toMatchSnapshot();
});