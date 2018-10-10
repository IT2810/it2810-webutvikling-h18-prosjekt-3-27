// Example Snapshot test of JestTestExampleClass
// from https://jestjs.io/docs/en/tutorial-react-native
// see https://jestjs.io/docs/en/getting-started for more examples

// first jest run: generates a snapshot of JestTestExampleClass
// the generated snapshots should be included in VCS
// on any subsequent runs, compare output with stored snapshot
// on failure, check if difference is intended or a bug
// if intended, update snapshot by running jest -u


import React from 'react';
import JestTestExampleClass from "./JestTestExampleClass";

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<JestTestExampleClass />).toJSON();
  expect(tree).toMatchSnapshot();
});
