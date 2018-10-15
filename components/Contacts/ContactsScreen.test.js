import React from "react";
import ContactsScreen from "./ContactsScreen";
import ShallowRenderer from 'react-test-renderer/shallow';


it("renders correctly", () => {
  const r = new ShallowRenderer();
  const wrapper = r.render(
    <ContactsScreen/>
  );
  expect(wrapper).toMatchSnapshot();
});

it("Adds contact correctly", () => {

  expect(contact).toEqual({
    name: 'testman',
    number: '12345678',
  });
});
