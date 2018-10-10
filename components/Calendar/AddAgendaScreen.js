import React, {Component} from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button
} from "react-native";

class AddAgendaScreen extends Component {
  static navigationOptions = {
    title: "Create event"
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

  handleAddAgendaPress = () => {
    // button for adding a new agenda was clicked
    const callbackAddAgenda = this.props.navigation.getParam("addAgenda");
    if (!callbackAddAgenda)
      return;
    // create object for the new agenda
    const agenda = {
      date: this.props.navigation.getParam("date"),
      name: this.state.name,
      note: this.state.note
    };
    // pass it back to the calendar screen
    callbackAddAgenda(agenda);
    // then navigate back
    this.props.navigation.navigate("Calendar");
  };

  render() {
    return (
      <View style={styles.container}>
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
        <Button title={"Add new event"} onPress={this.handleAddAgendaPress}/>
      </View>
    );
  }
}

export default AddAgendaScreen;

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
