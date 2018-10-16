import React from 'react';
import Contact from './Contact';
import ShallowRenderer from "react-test-renderer/shallow";



test('renders correctly', () => {
  const testContact = {
    name: 'mama',
    number: '1234',
    key: '1',
    color: 'green'
  };

  const renderer = new ShallowRenderer();
  const tree = renderer.render(<Contact
    contact = {testContact}
  />);
  expect(tree).toMatchSnapshot();
});