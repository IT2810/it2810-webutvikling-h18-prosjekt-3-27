import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import CustomProgressBar from "./CustomProgressBar";


test('renders correctly', () => {
  const renderer = new ShallowRenderer();
  const tree = renderer.render(<CustomProgressBar numCompleted={1}
                                                  numUncompleted={1}
                                                  progress={1} />);
  expect(tree).toMatchSnapshot();
});