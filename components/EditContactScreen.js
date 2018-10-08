import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button
} from "react-native";

export default class EditContactScreen extends Component {
  state = {
    name: "",
    number: "",
    key: 0,
  };

  handleDeletePress(){
    console.log("hola")
    if (this.state.name.trim().length === 0) {
      // invalid name
      return;
    }
    // retrieve deleteContact callback function
    const deleteContact = this.props.navigation.getParam("deleteContact");
    // contact that we want to delete
    const oldContact = {
      key: this.state.key.trim(),
    };
    deleteContact(oldContact);
    this.props.navigation.navigate("Contacts");
  }

  render() {
    console.log(this.state.name);
    console.log(this.state.key);
    return (
      <View>
        <Text>
          {this.state.name},
          {this.state.number}
        </Text>
        <Button
          color='pink'
          onPress={this.handleDeletePress}
          title={"delete"}
        />
      </View>
    )
  }

  componentDidMount() {
    const c = this.props.navigation.getParam("contact");
    console.log(c);
    this.setState({number: c.number});
    this.setState({name: c.name});
    this.setState({key: c.key});
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor: "white",
  },
});

