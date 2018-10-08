import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import TodoScreen from "./TodoScreen";


test('renders correctly', () => {
  const renderer = new ShallowRenderer();
  const tree = renderer.render(<TodoScreen/>);
  expect(tree).toMatchSnapshot();
});