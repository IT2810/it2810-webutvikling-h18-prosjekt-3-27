import React from 'react';
import renderer from 'react-test-renderer';

import CustomProgressCircle from "./CustomProgressCircle";


test('renders correctly', () => {
  const tree = renderer.create(<CustomProgressCircle progress={1}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
