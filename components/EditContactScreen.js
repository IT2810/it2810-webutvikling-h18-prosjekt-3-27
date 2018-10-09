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

  handleDeletePress = () =>{
    const deleteContact = this.props.navigation.getParam("deleteContact");
    // contact that we want to delete
    const i = this.state.key;
    deleteContact(i);
    this.props.navigation.navigate("Contacts");
  };

  render() {
    return (
      <View>
        <Text>
          {this.state.name},
          {this.state.number}
        </Text>
        <Button
          color='green'
          onPress={this.handleDeletePress}
          title={"delete"}
        />
      </View>
    )
  }

  componentDidMount() {
    const c = this.props.navigation.getParam("contact");
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

