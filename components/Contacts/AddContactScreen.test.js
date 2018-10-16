import React from "react";
import AddContactScreen from './AddContactScreen';
import ShallowRenderer from 'react-test-renderer/shallow';


test('renders correctly', () => {
  const renderer = new ShallowRenderer();
  const tree = renderer.render(<AddContactScreen/>);
  expect(tree).toMatchSnapshot();
});