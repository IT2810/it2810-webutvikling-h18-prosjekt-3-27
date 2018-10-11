import React, {Component} from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button
} from "react-native";
import CalendarScreen from "./CalendarScreen";

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
        <Text style={[styles.margins, {fontSize: 26}]}>
          {CalendarScreen.timeToString(this.props.navigation.getParam("date"))}
        </Text>
        <Text style={styles.margins}>Name:</Text>
        <TextInput
          style={[styles.margins, styles.textInput]}
          value={this.state.name}
          underlineColorAndroid="transparent"
          placeholder={"Name"}
          onChangeText={this.handleNameChange}
        />
        <Text style={styles.margins}>Description:</Text>
        <TextInput
          style={[styles.margins, styles.textInput]}
          value={this.state.note}
          multiline={true}
          numberOfLines={5}
          underlineColorAndroid="transparent"
          textAlignVertical="top"
          placeholder={"Enter description..."}
          onChangeText={this.handleNoteChange}
        />
        <Button style={styles.margins} title={"Add new event"} onPress={this.handleAddAgendaPress}/>
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
  margins: {
    marginTop: 10,
    marginBottom: 10
  },
  textInput: {
    width: "80%",
    padding: 5,
    borderWidth: 1,
    borderColor: "#000"
  }
});
