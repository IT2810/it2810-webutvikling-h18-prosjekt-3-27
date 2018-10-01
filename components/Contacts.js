import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  AsyncStorage,
  TextInput,
  Button,
} from "react-native";
import navigation from "react-navigation";

export default class Contacts extends Component {
  state = {
    contacts: [],
    text: ""
  };

  componentDidMount() {
    C.all(contacts => this.setState({ contacts: contacts}));
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList data={this.state.contacts} keyExtractor={(item) => item.key.toString()} renderItem={({ item }) =>
          <View>
            <Text style={styles.contact}>
              {item.text}
            </Text>
          </View>}
        />
        <Button
          title={"Add Contact"}
          onPress={() => {
            return this.props.navigation.navigate('EditContact', {contacts: this.state.contacts});
          }}
        />
      </View>
    );
  }
}

let C = {
  convertToArrayOfObject(contacts, callback) {
    return callback(
      contacts ? contacts.split("||").map((contacts, i) => ({ key: i, text: contacts })) : []
    );
  },
  convertToStringWithSeparators(contacts) {
    return contacts.map(contacts => contacts.text).join("||");
  },
  all(callback) {
    return AsyncStorage.getItem("CONTACTS", (err, contacts) =>
      this.convertToArrayOfObject(contacts, callback)
    );
  },
  save(contacts) {
    AsyncStorage.setItem("CONTACTS", this.convertToStringWithSeparators(contacts));
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
  input: {
    justifyContent: "center",
    alignItems: "stretch",
    width: 100
  },
  contact: {
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 20,
  },
});
