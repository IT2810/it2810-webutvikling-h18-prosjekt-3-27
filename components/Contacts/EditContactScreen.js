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
      <View style={styles.container}>

        <View style={styles.contact}>
          <Text style={styles.name}>
            {this.state.name}
          </Text>
          <Text style={styles.number}>
            {this.state.number}
          </Text>
        </View>

        <View style={styles.button}>
          <Button
            color='green'
            onPress={this.handleDeletePress}
            title={"delete"}
          />
        </View>
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
  contact: {
    alignItems: 'center',
    padding: 20,
  },
  name: {
    fontSize: 40,
    color: 'green',
  },
  number: {
    fontSize: 30,
    color: 'grey',
    margin: 20,
  },
  button: {
    position: 'absolute',
    width: '100%',
    bottom:0,
    marginBottom: 10,
  },
});

