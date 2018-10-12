import React, {Component} from "react";
import {FlatList, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Contact from "./Contact";

export default class ContactList extends Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }


  handlePress = (item) => {
  console.log(item);
  this.props.onContactPress(item);
};

  render () {
    return(
      <FlatList
        data={this.props.contacts}
        keyExtractor={contact => "" + contact.key}
        renderItem={({item}) =>
          <TouchableOpacity onPress={() => this.handlePress(item)}>
            <Contact
              contact={item}
            />
          </TouchableOpacity>}
      />
    )
  }
}

