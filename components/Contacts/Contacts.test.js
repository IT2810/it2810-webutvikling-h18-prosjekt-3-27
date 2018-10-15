import React from 'react';
import Contact from './Contact';
import renderer from 'react-test-renderer';


test('renders correctly', () => {
  const tree = renderer.create(<Contact
    item={{key: 1, name: "somename", number: '1245', color: 'green'}}
  />).toJSON();
  expect(tree).toMatchSnapshot();
});