import React from "react";
import renderer from "react-test-renderer";
import Link from "./Link";

it("renders correctly with no props", () => {
  const tree = renderer
    .create(<Link/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with content", () => {
  const tree = renderer
    .create(<Link>This is some link text</Link>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with content and handler", () => {
  const tree = renderer
    .create(<Link onPress={() => console.log("Example handler")}>This is some link text</Link>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with handler", () => {
  const tree = renderer
    .create(<Link onPress={() => {console.log("Some other handler")}}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});


it("renders correctly and overwrites color", () => {
  const tree = renderer
    .create(<Link style={{color: "#fff"}}>This should be blue</Link>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
