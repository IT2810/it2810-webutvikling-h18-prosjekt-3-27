import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput, Button,
} from "react-native";
import Contacts from "./Contacts";

export default class EditContact extends Component {
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

  new = () => {
    let notEmpty = this.state.name.trim().length > 0;
    if (notEmpty) {
      return this.props.navigation.navigate('Contacts', {name: this.state.name, number: this.state.number});
    }
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
          onPress={this.new}
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

