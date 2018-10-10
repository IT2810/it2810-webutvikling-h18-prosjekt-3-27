import React, {Component} from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button
} from "react-native";
import { NavigationEvents } from 'react-navigation';

class EditAgendaScreen extends Component {
  static navigationOptions = {
    title: "Edit event"
  };

  state = {
    name: "",
    note: ""
  };

  handleNameChange = (text) => {
    this.setState({name: text});
  };

  handleNoteChange = (text) => {
    this.setState({note: text});
  };

  handleSaveAgendaPress = () => {
    // button for adding a new agenda was clicked
    const callbackEditAgenda = this.props.navigation.getParam("editAgenda");
    if (!callbackEditAgenda)
      return;
    // create object for the new agenda
    const oldItem = this.props.navigation.getParam("item");
    const agenda = {
      ...oldItem,
      name: this.state.name,
      note: this.state.note
    };
    // pass it back to the calendar screen
    callbackEditAgenda(agenda);
    // then navigate back
    this.props.navigation.navigate("Calendar");
  };

  handleDeleteAgendaPress = () => {
    const callbackRemoveAgenda = this.props.navigation.getParam("removeAgenda");
    if (!callbackRemoveAgenda)
      return;
    // call delete callback
    const oldItem = this.props.navigation.getParam("item");
    callbackRemoveAgenda(oldItem);
    // then navigate back
    this.props.navigation.navigate("Calendar");
  };

  willFocus = (payload) => {
    let item;
    if (this.props.navigation && (item = this.props.navigation.getParam("item"))) {
      this.setState({name: item.name, note: item.note});
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={this.willFocus}
        />
        <Text>Name:</Text>
        <TextInput
          style={styles.textInput}
          value={this.state.name}
          defaultValue={"Name"}
          onChangeText={this.handleNameChange}
        />
        <Text>Description:</Text>
        <TextInput
          style={styles.textInput}
          value={this.state.note}
          defaultValue={"A short description..."}
          onChangeText={this.handleNoteChange}
        />
        <Button title={"Save event"} onPress={this.handleSaveAgendaPress}/>
        <Button title={"Delete event"} onPress={this.handleDeleteAgendaPress}/>
      </View>
    );
  }
}

export default EditAgendaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  textInput: {
    width: "80%"
  }
});
