import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  AsyncStorage,
  TextInput, Button,
} from "react-native";

export default class EditContact extends Component {
  render () {
    return (
      <View>
        <TextInput
          onChangeText={this.changeTextHandler}
          value={this.state.text}
          placeholder="Add Contact"
        />
        <Button
          onPress={this.addContact}
          title="Add contact"
          valie={this.state.text}
        />
      </View>
    )
  }
}
