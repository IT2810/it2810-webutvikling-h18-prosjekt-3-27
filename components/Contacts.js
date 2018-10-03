import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  AsyncStorage,
  Button,
} from "react-native";

export default class Contacts extends Component {
  state = {
    contacts: [],
    text: ""
  };

  componentDidMount() {
    C.all(contacts => this.setState({ contacts: contacts}));
  }

  addContact =() => {
    const { navigation } = this.props;
    const t = navigation.getParam('text');
    console.log(t);
    this.setState({text: t});

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
  };

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
        <View style={styles.button}>
          <Button
            title={"Add Contact"}
            color = 'pink'
            onPress= {this.handlePress.bind(this)}
          />
        </View>
        <Button
          title={"Update"}
          color = 'pink'
          onPress= {this.addContact.bind(this)}
        />
      </View>
    );
  }

  handlePress() {
    return this.props.navigation.navigate('EditContact');
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
    flex: 1,
    backgroundColor: "white",
    paddingBottom: 15,
  },
  input: {
    justifyContent: "center",
    alignItems: "stretch",
    width: 100
  },
  contact: {
    padding: 5,
    fontSize: 18,
  },
  button: {
    marginBottom: 10,
  }
});
