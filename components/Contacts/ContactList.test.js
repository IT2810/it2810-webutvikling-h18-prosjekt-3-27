import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import ContactList from "./ContactList";


test('renders correctly', () => {
  const renderer = new ShallowRenderer();
  const tree = renderer.render(<ContactList contacts={[]} selected={null}/>);
  expect(tree).toMatchSnapshot();
});