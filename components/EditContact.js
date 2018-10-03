import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput, Button,
} from "react-native";
import Contacts from "./Contacts";

export default class EditContact extends Component {
  state = {
    text: "",
  };

  changeTextHandler = text => {
    this.setState({text: text});
  };

  new = () => {
    let notEmpty = this.state.text.trim().length > 0;
    if (notEmpty) {
      return this.props.navigation.navigate('Contacts', {text: this.state.text});
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input}
                   onChangeText={this.changeTextHandler}
                   value={this.state.text}
                   placeholder="Name"
        />
        <TextInput style={styles.input}
                   placeholder="Phone"
        />
        <Button
          color='pink'
          onPress={this.new}
          value={this.state.text}
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

