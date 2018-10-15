// mock AsyncStorage
import MockStorage from "../../__mocks__/MockStorage";
const storageCache = {};
const AsyncStorage = new MockStorage(storageCache);
jest.setMock("AsyncStorage", AsyncStorage);



import React from 'react';

import ContactPersistence from './ContactPersistence';


describe("Test ContactPersistence", () => {
  beforeEach(() => AsyncStorage.clear());

  test("allIds first should return empty object", async (done) => {
    const result = await ContactPersistence.allIds();
    expect(result).toEqual({});
    done();
  });


  test("saveContact", async (done) => {
    const contact = {
      name: 'mama',
      number: '1234',
      key: '1',
      color: 'green'
    };
    await ContactPersistence.saveContact(contact);
    const result = await ContactPersistence.allIds();
    expect(result).toBeDefined();
    const outContact = result[0];
    expect(outContact.name).toEqual(contact.name);
    expect(outContact.number).toEqual(contact.number);
    expect(outContact.key).toEqual(contact.key);
    done();
  });

  test("deleteConctact should delete contact", async (done) => {
    const contact = {
      name: 'mama',
      number: '1234',
      key: '1',
      color: 'green'
    };
    await ContactPersistence.saveContact(contact);
    const resultWithContact = await ContactPersistence.allIds();
    expect(resultWithContact).toBeDefined();
    expect(Object.keys(resultWithContact).length).toEqual(1);
    await ContactPersistence.deleteContact(contact);
    const result = await ContactPersistence.allIds();
    expect(result).toBeDefined();
    expect(Object.keys(result).length).toEqual(0);
    done();
  });
});