import { AsyncStorage } from "react-native";
import CalendarScreen from "./CalendarScreen";

const AGENDA_ITEM_IDS = "agenda_item_ids";
const AGENDA_NEXTID_KEY = "agenda_next_id";

export default class AgendaPersistence {

  /**
   * Get the next unique ID
   *
   * @returns {Promise<number>} a unique id for agendas
   */
  static async getAndIncrementId() {
    try {
      const nextIdString = await AsyncStorage.getItem(AGENDA_NEXTID_KEY);
      let nextId;
      if (nextIdString) {
        nextId = parseInt(nextIdString);
      } else {
        nextId = 0;
      }
      await AsyncStorage.setItem(AGENDA_NEXTID_KEY, "" + (nextId + 1));
      return nextId;
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Retrieves a list of dates that have agendas stored, and
   * initializes the list if not found internally.
   *
   * Not expected to be useful for external calls.
   *
   *
   * @returns {Promise<*>} a list of dates that have agendas
   */
  static async getDatesSafe() {
    try {
      const item_ids_json = await AsyncStorage.getItem(AGENDA_ITEM_IDS);
      if (!item_ids_json) {
        // not initialized, initialize items
        const initIds = [];
        await AsyncStorage.setItem(AGENDA_ITEM_IDS, JSON.stringify(initIds));
        return initIds;
      }
      return JSON.parse(item_ids_json);
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Get all stored items in a key-value-object, each key is a date
   * and each value is a JSON-formatted string of a list of agendas
   *
   * @returns {Promise<{}>} all stored agendas
   */
  static async getAllItems() {
    try {
      const item_dates = await AgendaPersistence.getDatesSafe();
      const keyValuePair = await AsyncStorage.multiGet(item_dates);
      const items = {};
      keyValuePair.forEach(keyValue => {
        const key = keyValue[0];
        const arrayJson = keyValue[1];
        items[key] = JSON.parse(arrayJson);
      });
      return items;
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Save an agenda item to persistent storage,
   * will overwrite existing agenda if any
   *
   * @param agenda the agenda object to store
   * @returns {Promise<void>}
   */
  static async saveAgenda(agenda) {
    // agenda is an item with property date, name, note, id
    try {
      // find the list of all stored dates
      const item_ids = await AgendaPersistence.getDatesSafe();
      // get our date
      const key = CalendarScreen.timeToString(agenda.date.getTime());
      // has this date been written to before?
      if (!(key in item_ids)) {
        // if no, add this date to the list and store it
        item_ids.push(key);
        await AsyncStorage.setItem(AGENDA_ITEM_IDS, JSON.stringify(item_ids));
      }
      // now, get the list of agendas for this date
      const agendaArrayJson = await AsyncStorage.getItem(key);
      if (!agendaArrayJson) {
        // no agenda saved, create new list with this agenda and save it
        const jsonArray = JSON.stringify([agenda]);
        await AsyncStorage.setItem(key, jsonArray);
      } else {
        // found a list. Is this agenda in the list?
        const agendaArray = JSON.parse(agendaArrayJson);
        let index;
        if ((index = agendaArray.findIndex(element => element.id === agenda.id)) !== -1) {
          // yes - overwrite it
          agendaArray[index] = agenda;
        } else {
          // no - add it
          agendaArray.push(agenda);
        }
        // then save back the new modified array to persistent storage
        const newAgendaArrayJson = JSON.stringify(agendaArray);
        await AsyncStorage.setItem(key, newAgendaArrayJson);
      }
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Delete an agenda from persistent storage
   * @param agenda the agenda to delete, identified by date and id
   * @returns {Promise<void>}
   */
  static async deleteAgenda(agenda) {
    // agenda is an item with property date, name, note, id
    try {
      // get our date
      const key = CalendarScreen.timeToString(agenda.date.getTime());

      // get all agendas for this day
      const agendaArrayJson = await AsyncStorage.getItem(key);
      if (agendaArrayJson) {
        // found a list. Is this agenda in the list?
        const agendaArray = JSON.parse(agendaArrayJson);
        let index;
        if ((index = agendaArray.findIndex(element => element.id === agenda.id)) !== -1) {
          // yes - remove it from list
          agendaArray.splice(index, 1);
        }

        // then save back the new modified array to persistent storage
        const newAgendaArrayJson = JSON.stringify(agendaArray);
        await AsyncStorage.setItem(key, newAgendaArrayJson);

        // if the list is empty, delete date from list of all dates
        if (agendaArray.length === 0) {
          await AsyncStorage.removeItem(key);
          // must also remove it from the list of all dates
          // find the list of all stored dates
          const item_ids = await AgendaPersistence.getDatesSafe();
          // is this date in the list?
          let keyIndex;
          if ((keyIndex = item_ids.findIndex(element => element === key)) !== -1) {
            // if yes, remove it and save back
            item_ids.splice(keyIndex, 1);
            await AsyncStorage.setItem(AGENDA_ITEM_IDS, JSON.stringify(item_ids));
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
}

