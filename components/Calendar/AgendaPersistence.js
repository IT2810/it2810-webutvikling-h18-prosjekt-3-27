import { AsyncStorage } from "react-native";

const AGENDA_ITEM_IDS = "agenda_item_ids";
const AGENDA_NEXTID_KEY = "agenda_next_id";

const logError = error => console.error(error);

export default class AgendaPersistence {

  static async getAndIncrementId() {
    try {
      const nextIdString = await AsyncStorage.getItem(AGENDA_NEXTID_KEY, logError);
      let nextId;
      if (nextIdString) {
        nextId = JSON.parse(nextIdString);
      } else {
        nextId = 0;
      }
      await AsyncStorage.setItem(AGENDA_NEXTID_KEY, nextId + 1);
      return nextId;
    } catch (e) {
      console.error(e);
    }
  }

  static async getAllItems() {
    try {
      const item_ids_json = await AsyncStorage.getItem(AGENDA_ITEM_IDS, logError);
      if (!item_ids_json) {
        // not initialized, initialize items
        const initIds = [];
        await AsyncStorage.setItem(AGENDA_ITEM_IDS, JSON.stringify(initIds));
        return {};
      }
      return;
      const item_ids = JSON.parse(item_ids_json);
      const keyValuePair = await AsyncStorage.multiGet(item_ids);
      const items = keyValuePair
        .forEach(keyValue => keyValue[1])
        .map(itemJson => JSON.parse(itemJson));

      /*
       * {
       *   key: "2012-05-22",
       *   value: [{date: "2012-05-22", text: "a"}]
       * }
       */
      /*
       * returns an object where each key is a date, and its value
       * is an array of objects where each object is an item for that day.
       *
       * Example:
       * {'2012-05-22': [{text: 'item 1 - any js object'}],
       *  '2012-05-23': [{text: 'item 2 - any js object'}],
       *  '2012-05-24': [],
       *  '2012-05-25': [{text: 'item 3 - any js object'},{text: 'any js object'}],
       * }
       *
       * TODO: Actually do this
       */

      return items;
    } catch (e) {
      console.error(e);
    }
  }

  static async saveAgenda(date, agenda) {
    // agenda is an item with property date, text, and others
    const item_ids_json = await AsyncStorage.getItem(AGENDA_ITEM_IDS, logError);
    console.debug("saveAgenda's item:", item_ids_json);
  }
}

