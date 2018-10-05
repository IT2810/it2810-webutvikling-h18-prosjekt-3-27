import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button
} from "react-native";

export default class AddContactScreen extends Component {
  state = {
    name: "",
    number: "",
  };

  changeTextHandlerName = name => {
    this.setState({name: name});
  };

  changeTextHandlerNumber = number => {
    this.setState({number: number});
  };

  handleAddPress = () => {
    if (this.state.name.trim().length === 0) {
      // invalid name
      return;
    }
    // retrieve addContact(contact) callback function
    const addContact = this.props.navigation.getParam("addContact");
    // create contact
    const newContact = {
      name: this.state.name.trim(),
      number: this.state.number.trim()
    };
    addContact(newContact);
    this.props.navigation.navigate("Contacts");
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input}
                   onChangeText={this.changeTextHandlerName}
                   value={this.state.name}
                   placeholder="Name"
        />
        <TextInput style={styles.input}
                   onChangeText={this.changeTextHandlerNumber}
                   value={this.state.number}
                   placeholder="Phone"
        />
        <Button
          color='pink'
          onPress={this.handleAddPress}
          value={this.state.name}
          title={"Add"}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor: "white",
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 20,
  }
});

