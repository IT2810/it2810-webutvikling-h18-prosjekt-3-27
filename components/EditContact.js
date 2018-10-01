import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TextInput, Button,
} from "react-native";

import navigation from 'react-navigation'; // Version can be specified in package.json

import Contacts from "./Contacts";

export default class EditContact extends Component {
  state = {
    text: "",
    contacts: [],
  };

  changeTextHandler = text => {
    this.setState({ text: text });
  };

  add = () => {
    let notEmpty = this.state.text.trim().length > 0;
    if (notEmpty) {
      this.setState(
        prevState => {
          let { contacts, text } = prevState;
          return {
            contacts: contacts.concat({ key: contacts.length, text: text }),
            text: ""
          };
        },
        () => C.save(this.state.contacts)
      );
    }
    return this.props.navigation.navigate('Contacts', {contacts: this.state.contacts});
  };

  render () {
    const navigation = this.props.navigation;
    const contacts = navigation.getParam('contacts', []);
    return (
      <View>
        <TextInput
          onChangeText={this.changeTextHandler}
          value={this.state.text}
          placeholder="Add Contact"
        />
        <Button
          onPress={this.add}
          value = {this.state.text}
          title={"Add"}
        />
      </View>
    )
  }
}

let C = {
  convertToStringWithSeparators(contacts) {
    return contacts.map(contacts => contacts.text).join("||");
  },
  save(contacts) {
    AsyncStorage.setItem("CONTACTS", this.convertToStringWithSeparators(contacts));
  }
};