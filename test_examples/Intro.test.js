// Example Snapshot test of Intro
// from https://jestjs.io/docs/en/tutorial-react-native
// see https://jestjs.io/docs/en/getting-started for more examples

// first jest run: generates a snapshot of Intro
// the generated snapshots should be included in VCS
// on any subsequent runs, compare output with stored snapshot
// on failure, check if difference is intended or a bug
// if intended, update snapshot by running jest -u


import React from 'react';
import Intro from "./Intro";

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<Intro />).toJSON();
  expect(tree).toMatchSnapshot();
});
