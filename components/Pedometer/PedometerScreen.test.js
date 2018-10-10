import React from 'react';
import renderer from 'react-test-renderer';

import PedometerScreen from "./PedometerScreen";


test('renders correctly', () => {
  const tree = renderer.create(<PedometerScreen/>).toJSON();
  expect(tree).toMatchSnapshot();
});
