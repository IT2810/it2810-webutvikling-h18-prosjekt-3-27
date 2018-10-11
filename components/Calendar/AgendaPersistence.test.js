// mock AsyncStorage
import MockStorage from "../../__mocks__/MockStorage";
const storageCache = {};
const AsyncStorage = new MockStorage(storageCache);
jest.setMock("AsyncStorage", AsyncStorage);

// imports
import React from "react";
import AgendaPersistence from "./AgendaPersistence";

// tests
describe("Test AgendaPersistence", () => {
  beforeEach(() => AsyncStorage.clear());

  test("getAndIncrement id", async () => {
    const id1 = await AgendaPersistence.getAndIncrementId();
    const id2 = await AgendaPersistence.getAndIncrementId();
    expect(id1).not.toBe(id2);
  });

  test("getAllItems first should return empty object", async (done) => {
    const result = await AgendaPersistence.getAllItems();
    expect(result).toEqual({});
    done();
  });

  test("saveAgenda then getAllItems should return agenda", async (done) => {
    const timeStringDate = "2018-09-16";
    const agenda = {
      date: new Date(timeStringDate),
      name: "My Agenda",
      note: "A longer description of the agenda",
      id: 25
    };
    await AgendaPersistence.saveAgenda(agenda);
    const result = await AgendaPersistence.getAllItems();
    expect(result).toBeDefined();
    expect(result[timeStringDate][0]).toBeDefined();
    const outAgenda = result[timeStringDate][0];
    expect(outAgenda.id).toEqual(agenda.id);
    expect(outAgenda.name).toEqual(agenda.name);
    expect(outAgenda.note).toEqual(agenda.note);
    done();
  });

  test("deleteAgenda should delete agenda", async (done) => {
    const timeStringDate = "2018-09-16";
    const agenda = {
      date: new Date(timeStringDate),
      name: "My Agenda",
      note: "A longer description of the agenda",
      id: 25
    };
    await AgendaPersistence.saveAgenda(agenda);
    await AgendaPersistence.deleteAgenda(agenda);
    const result = await AgendaPersistence.getAllItems();
    expect(result).toBeDefined();
    expect(Object.keys(result).length).toEqual(0);
    done();
  });

  test("saveAgenda should overwrite previous agenda", async (done) => {
    const timeStringDate = "2018-09-16";
    const agenda1 = {
      date: new Date(timeStringDate),
      name: "My Agenda",
      note: "A longer description of the agenda",
      id: 25
    };
    const agenda2 = {
      date: new Date(timeStringDate),
      name: "My Second Agenda",
      note: "This agenda has different content! Same date and id though",
      id: 25
    };
    await AgendaPersistence.saveAgenda(agenda1);
    await AgendaPersistence.saveAgenda(agenda2);
    const result = await AgendaPersistence.getAllItems();
    expect(result).toBeDefined();
    expect(result[timeStringDate][0]).toBeDefined();
    const outAgenda = result[timeStringDate][0];
    expect(outAgenda.id).toEqual(agenda2.id);
    expect(outAgenda.name).toEqual(agenda2.name);
    expect(outAgenda.note).toEqual(agenda2.note);
    done();
  });
});
