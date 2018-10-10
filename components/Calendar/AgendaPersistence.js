import { AsyncStorage } from "react-native";
import CalendarScreen from "./CalendarScreen";

const AGENDA_ITEM_IDS = "agenda_item_ids";
const AGENDA_NEXTID_KEY = "agenda_next_id";

export default class AgendaPersistence {

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

  static async getAllItems() {
    try {
      const item_ids_json = await AsyncStorage.getItem(AGENDA_ITEM_IDS);
      if (!item_ids_json) {
        // not initialized, initialize items
        const initIds = [];
        await AsyncStorage.setItem(AGENDA_ITEM_IDS, JSON.stringify(initIds));
        return {};
      }
      const item_ids = JSON.parse(item_ids_json);
      const keyValuePair = await AsyncStorage.multiGet(item_ids);
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

  static async saveAgenda(agenda) {
    // agenda is an item with property date, name, note, id
    try {
      // find the list of all stored dates
      const item_ids_json = await AsyncStorage.getItem(AGENDA_ITEM_IDS);
      const item_ids = JSON.parse(item_ids_json);
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
          const item_ids_json = await AsyncStorage.getItem(AGENDA_ITEM_IDS);
          const item_ids = JSON.parse(item_ids_json);
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

