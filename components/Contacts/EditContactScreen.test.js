import React from 'react';
import EditContactScreen from './EditContactScreen';
import ShallowRenderer from 'react-test-renderer/shallow';


it("renders correctly", () => {
  const testContact = {
    name: 'mama',
    number: '1234',
    key: '1',
    color: 'green'
  };
  const renderer = new ShallowRenderer();
  const tree = renderer.render(<EditContactScreen contact={testContact}/>);
  expect(tree).toMatchSnapshot();
});