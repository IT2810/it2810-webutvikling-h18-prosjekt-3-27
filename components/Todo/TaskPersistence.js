import {AsyncStorage} from "react-native";

export default class TaskPersistence {

  /**
   * Saves the task as a new task in storage.
   * @param task, an object with a key, text, a completed boolean and a random color.
   * @returns {Promise<void>} the return promise can be ignored
   */
  static save = async (task) => {
    try {
      const taskKeysJSON = await AsyncStorage.getItem("TASKKEYS") || "[]";
      const taskKeys = JSON.parse(taskKeysJSON);
      if (!taskKeys.includes(task.key)) {
        taskKeys.push(task.key);
        await AsyncStorage.setItem("TASKKEYS", JSON.stringify(taskKeys));
      }
      await AsyncStorage.setItem(task.key, JSON.stringify(task));
    } catch (e) {
      console.error(e);
    }
  };


  /**
   * Deletes the task
   *
   * @param task, an object with a key, text, a completed boolean and a random color.
   * @returns {Promise<void>} the return promise can be ignored
   */
  static delete = async (task) => {
    try {
      const taskKeysJSON = await AsyncStorage.getItem("TASKKEYS") || "[]";
      const taskKeys = JSON.parse(taskKeysJSON);
      let index;
      if ((index = taskKeys.findIndex(el => el === task.key)) !== -1) {
        taskKeys.splice(index, 1);
        await AsyncStorage.setItem("TASKKEYS", JSON.stringify(taskKeys));
      }
      await AsyncStorage.removeItem(task.key);
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * Returns tasks (if any) and updates state
   *
   * @returns {Promise<Array>} the return promise can be ignored
   */
  static getAll = async () => {
    try {
      let tasks = [];
      const taskKeysJson = await AsyncStorage.getItem("TASKKEYS") || "[]";
      const taskKeys = JSON.parse(taskKeysJson);
      if (taskKeys.length > 0) {
        const tasksResult = await AsyncStorage.multiGet(taskKeys);
        tasks = tasksResult
          .map(keyvalue => keyvalue[1])
          .map(objJson => JSON.parse(objJson));
      }
      return tasks;
    } catch (e) {
      console.error(e);
    }
  };
}