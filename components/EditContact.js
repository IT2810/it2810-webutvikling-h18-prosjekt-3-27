import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput, Button,
} from "react-native";
import Contacts from "./Contacts";
import addContact from "./Contacts";
import b from './Contacts';


export default class EditContact extends Component {
  state = {
    text: "",
  };

  changeTextHandler = text => {
    this.setState({ text: text });
  };

  new = () => {
    let notEmpty = this.state.text.trim().length > 0;
    if (notEmpty) {
      //dette blir logget alt sammen
      console.log("hejeeh");
      console.log(this.state.text);
      //har en sterk mistanke om at måten jeg kaller addCOntact på er ikke helt lov eller riktig
      addContact(this.state.text);
      console.log("hefjhdsk");
      return this.props.navigation.navigate('Contacts');
    }
  };

  render () {
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={this.changeTextHandler}
          value={this.state.text}
          placeholder="Add Contact"
        />
        <Button
          onPress={this.new}
          value = {this.state.text}
          title={"Add"}
        />
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 20,
    paddingBottom: 50,
  },
});