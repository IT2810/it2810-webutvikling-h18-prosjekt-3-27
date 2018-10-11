import React from 'react';
import EditContactScreen from './EditContactScreen';
import ShallowRenderer from 'react-test-renderer/shallow';


it('renders correctly', () => {
  const renderer = new ShallowRenderer();
  const tree = renderer.render(<EditContactScreen name={'someName'}
                                                  number={1234565}/>);
  expect(tree).toMatchSnapshot();
});

