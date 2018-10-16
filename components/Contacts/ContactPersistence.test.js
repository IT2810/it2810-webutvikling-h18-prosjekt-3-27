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
    const all = await  ContactPersistence.getContactsByIds(result);
    expect(result).toEqual([]);
    expect(all).toEqual([]);
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
    const contacts = await ContactPersistence.getContactsByIds(result);
    const outContact = contacts[0];
    expect(outContact.name).toEqual(contact.name);
    expect(outContact.number).toEqual(contact.number);
    expect(outContact.key).toEqual(contact.key);
    done();
  });

  test("deleteContact should delete contact", async (done) => {
    const contact = {
      name: 'mama',
      number: '1234',
      key: '1',
      color: 'green'
    };
    await ContactPersistence.saveContact(contact);
    const resultWithContactId = await ContactPersistence.allIds();
    const resultWithContact = await ContactPersistence.getContactsByIds(resultWithContactId);
    expect(resultWithContact).toBeDefined();
    expect(Object.keys(resultWithContact).length).toEqual(1);

    await ContactPersistence.deleteContact(contact);
    const resultId = await ContactPersistence.allIds();
    const result = await ContactPersistence.getContactsByIds(resultId);
    expect(result).toBeDefined();
    expect(Object.keys(result).length).toEqual(0);
    done();
  });
});
