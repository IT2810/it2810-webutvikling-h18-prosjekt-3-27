import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  AsyncStorage,
  TextInput,
} from "react-native";

export default class Contacts extends Component {
  state = {
    contacts: [],
    text: ""
  };

  changeTextHandler = text => {
    this.setState({ text: text });
  };

  addContact = () => {
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
  };

  componentDidMount() {
    console.log("hello this loadedd");
    C.all(contacts => this.setState({ contacts: contacts}));
  }

  render() {
    console.log("Render is loaded");
    return (
      <View style={styles.container}>
        <Text>
          fjdskjfdksfjdkshf
        </Text>
        <FlatList data={this.state.contacts} keyExtractor={(item) => item.key.toString()} renderItem={({ item }) =>
            <View>
              <Text>
                {item.text}
              </Text>
            </View>}
        />
        <TextInput style={styles.input}
          onChangeText={this.changeTextHandler}
          value={this.state.text}
          placeholder="Add Contact"
        />
        <Text>
          Hellellodjfksdjk
        </Text>
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
    paddingTop: 20
  },
  input: {
    justifyContent: "center",
    alignItems: "stretch",
    width: 100
  }
});
