import React from 'react';
const storageCache = {};
const AsyncStorage = new MockStorage(storageCache);
jest.setMock("AsyncStorage", AsyncStorage);
import MockStorage from "../../__mocks__/MockStorage";
import TaskPersistence from "./TaskPersistence";
import randomColor from "randomcolor";

describe("Test TaskPersistence", () => {
  beforeEach(() => AsyncStorage.clear());

  test("retrieveAndIncreaseKeyCount should return incremented key", async(done) => {
    const id1 = await TaskPersistence.retrieveAndIncreaseKeyCount();
    const id2 = await TaskPersistence.retrieveAndIncreaseKeyCount();
    expect(id1).not.toBe(id2);
    done();
  });

  test("getAll should return empty list", async(done) => {
    const result = await TaskPersistence.getAll();
    expect(result).toEqual([]);
    done();
  });

  test("save then getAll should include new task", async(done) => {
    // First check that Tasks are empty
    const tasks = await TaskPersistence.getAll();
    expect(tasks).toEqual([]);
    // Then add a task
    const task = {
      key: "task_1",
      text: "testing",
      completed: false,
      color: randomColor({luminosity: 'dark', hue: "green"})
    };
    await TaskPersistence.save(task);
    const result = await TaskPersistence.getAll();
    expect(result).toBeDefined();
    const outTask = result[0];
    expect(outTask.key).toEqual(task.key);
    expect(outTask.text).toEqual(task.text);
    expect(outTask.completed).toEqual(task.completed);
    expect(outTask.color).toEqual(task.color);
    done();
  });

  test("delete should delete task", async(done) => {
    const tasks = await TaskPersistence.getAll();
    expect(tasks).toEqual([]);
    // Then add a task
    const task = {
      key: "task_1",
      text: "testing",
      completed: false,
      color: randomColor({luminosity: 'dark', hue: "green"})
    };
    await TaskPersistence.save(task);
    const resultWithTask = await TaskPersistence.getAll();
    expect(resultWithTask.length).toBe(1);
    await TaskPersistence.delete(task);
    const result = await TaskPersistence.getAll();
    expect(result.length).toBe(0);
    done();
  })


});