import React, {Component} from "react";
import {AsyncStorage, Button, FlatList, StyleSheet, Text, TouchableOpacity, ScrollView, View,} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import randomColor from "randomcolor";


/**
 * This is the root component for the contacts screen
 */
export default class ContactsScreen extends Component {
  state = {
    contacts: [],
    name: "",
    pressed: ""
  };

  componentDidMount() {
    // fetch contacts (if any) from persistent storage
    this.fetchContacts();
  }

  /**
   * Fetch contacts (if any) and updates state
   *
   * @returns {Promise<void>} the return promise can be ignored
   */
  fetchContacts = async () => {
    try {
      const contactIds = await C.allIds();
      const contacts = await C.getContactsByIds(contactIds);
      this.setState({contacts});
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * Saves the contact object as a new contact. Assigns key, and
   * updates state and persistent storage
   *
   * @param contact an object with name and number properties
   * @returns {Promise<void>} the return promise can be ignored
   */
  addContact = async (contact) => {
    try {
      // find the largest key used so far
      const largestKey = this.state.contacts.reduce((acc, currentValue) => {
        return currentValue.key > acc ? currentValue.key : acc;
      }, 0);
      // and add 1, this is the handleAddPress key
      const key = largestKey + 1;
      const myContact = {...contact, key: key, color: randomColor({luminosity: 'dark', hue: "green"})
    };
      // add contact to state
      this.setState(prevState => {
        const contacts = [...prevState.contacts, myContact];
        return {contacts};
      });
      // save contact to persistent storage
      await C.saveContact(myContact);
      console.log(myContact);
    } catch (e) {
      console.error(e);
    }
  };

  deleteContact = x => {
    const c = this.state.contacts.find(contact => contact.key === x);

    this.setState(prevState => {
      const contacts = prevState.contacts.slice();
      const contactToDelete = contacts.find(contact => contact.key === x);
      const index = prevState.contacts.indexOf(contactToDelete);
      contacts.splice(index, 1);
      return { contacts: contacts };
      }
    );
    C.deleteContact(c);
  };

  /**
   * Handle a button press on the "Add Contact" button
   */
  handleAddContactPress = () => {
    this.props.navigation.navigate("AddContact", {addContact: this.addContact});
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <FlatList
            data={this.state.contacts}
            keyExtractor={contact => "" + contact.key}
            renderItem={({item}) =>
              <TouchableOpacity onPress={() => {
                this.props.navigation.navigate("EditContact", {deleteContact: this.deleteContact, contact: item});
              }}>
                <View style={styles.contactList}>
                  <View>
                    <Icon name="ios-person" color={item.color} size={50}/>
                  </View>
                  <View style={styles.contact}>
                    <Text style={{color: item.color}}>
                      {item.name}
                    </Text>
                    <Text style={styles.number}>
                      {item.number}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>}
          />
        </ScrollView>
        <View style={styles.button}>
          <Button
            icon={<Icon name="ios-person-add" color="white" />}
            title="Add Contact"
            color = 'green'
            onPress= {this.handleAddContactPress}
          />
        </View>
      </View>
    );
  }
}

/**
 * This class has static methods for handling persistent storage
 *
 * The classname is terse to make code more readable
 */
class C {

  /**
   * Save a contact object to persistent storage
   *
   * The contact object must have a key property
   *
   * @param contact the contact to save
   * @returns {Promise<void>} the returned promise can be ignored
   */

  static async saveContact(contact) {
    const ids = await C.allIds();
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "white",
    paddingBottom: 15,
    alignItems: "stretch",

  },
  contactList: {
    margin: 10,
    flexDirection: 'row',
  },

  contact: {
    paddingTop: 7,
    paddingLeft: 5,
  },

  name: {
  },

  number: {
    color: 'grey',
  },
  button: {
    position: 'absolute',
    bottom:0,
    width: '100%',
    marginBottom: 10,
    backgroundColor: 'white',
  },
});
