import {Component} from "react";
import {AsyncStorage} from "react-native";



/**
 * This class has static methods for handling persistent storage
 */

export default class ContactPersistence extends Component {
  /**
   * Save a contact object to persistent storage
   *
   * The contact object must have a key property
   *
   * @param contact the contact to save
   * @returns {Promise<void>} the returned promise can be ignored
   */
  static async saveContact(contact) {
    const ids = await ContactPersistence.allIds();
    if (!ids.includes(contact.key)) {
      ids.push(contact.key);
      await AsyncStorage.setItem("CONTACT_IDS", JSON.stringify(ids));
    }
    await AsyncStorage.setItem("contact_" + contact.key, JSON.stringify(contact));
  }

  /**
   * Get a list of previously saved contact ids from persistent storage
   * @returns {Promise<*>} A promise resolving to an array of ids
   */
  static async allIds() {
    const idsJson = await AsyncStorage.getItem("CONTACT_IDS");
    if (!idsJson) {
      const initialIdsList = [];
      await AsyncStorage.setItem("CONTACT_IDS", JSON.stringify(initialIdsList));
      return initialIdsList;
    }
    return JSON.parse(idsJson);
  }

  /**
   * Get multiple contacts from persistent storage, based on the ids list
   *
   * @param ids a list of ids to fetch from persistent storage
   * @returns {Promise<any[]>} a promise resolving to an array of contact objects
   */
  static async getContactsByIds(ids) {
    const keys = ids.map(id => "contact_" + id);
    const contactsJson = [];
    const contactsKeyValue = await AsyncStorage.multiGet(keys);
    contactsKeyValue
      .map(element => element[1])
      .forEach(element => contactsJson.push(element));
    return contactsJson.map(elementJson => JSON.parse(elementJson));
  }

  static deleteContact = async (c) => {
    try {
      //get all IDS
      const ids = await AsyncStorage.getItem("CONTACT_IDS") || "[]";

      //make them to objects
      const keys = JSON.parse(ids);

      //Find index of contact we want to delete
      let index;
      if ((index = keys.findIndex(el => el === c.key)) !== -1) {
        //delete it
        keys.splice(index, 1);
      }

      // Set new contact_ids
      await AsyncStorage.setItem("CONTACT_IDS", JSON.stringify(keys));

      //remove key from asyncstorage
      await AsyncStorage.removeItem(c.key.toString());
    } catch (e) {
      console.error(e);
    }
  };
}
