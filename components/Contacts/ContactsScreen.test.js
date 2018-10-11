import React from "react";
import ContactsScreen from "./ContactsScreen";
import ShallowRenderer from 'react-test-renderer/shallow';
import shallow from "enzyme";


it("renders correctly", () => {
  const r = new ShallowRenderer();
  const wrapper = r.render(
    <ContactsScreen/>
  );
  expect(wrapper).toMatchSnapshot();
});

it("Adds contact correctly", () => {
  expect(ContactsScreen.addContact({'name': 'testman', 'phone': '12345678'})).toEqual({
    name: 'testman',
    number: '12345678',
  });
});

it("simulates click events", () => {
  const buttonClick = jest.fn();
  const wrapper = shallow(<Foo buttonClick={buttonClick} />);
  wrapper.find("button").simulate("click");
  expect(buttonClick).toHaveBeenCalled();
});