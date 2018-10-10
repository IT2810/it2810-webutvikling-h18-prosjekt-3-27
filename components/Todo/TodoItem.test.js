import React from 'react';
import renderer from 'react-test-renderer';

import TodoItem from "./TodoItem";


test('renders correctly', () => {
  const tree = renderer.create(<TodoItem
    item={{key: "key", text: "sometext", completed: false, color: "green"}}
  />).toJSON();
  expect(tree).toMatchSnapshot();
});
