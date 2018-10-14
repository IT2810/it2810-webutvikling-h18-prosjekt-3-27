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
