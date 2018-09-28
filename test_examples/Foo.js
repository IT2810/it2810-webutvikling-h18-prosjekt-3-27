/**
 * Example class to be tested with enzyme
 * Tested in Foo.test.js
 * from https://github.com/airbnb/enzyme/blob/master/docs/guides/jest.md
 * and https://github.com/vjwilson/enzyme-example-jest
 */
import React, { Component } from 'react';


class Foo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="foo">
        Bar
      </div>
    );
  }
}

export default Foo;