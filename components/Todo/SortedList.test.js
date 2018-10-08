import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import SortedList from "./SortedList";


test('renders correctly', () => {
  const renderer = new ShallowRenderer();
  const tree = renderer.render(<SortedList tasks={[]}
                                           selected={null}/>);
  expect(tree).toMatchSnapshot();
});