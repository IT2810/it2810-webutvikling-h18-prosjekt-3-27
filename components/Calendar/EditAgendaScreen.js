import React, {PureComponent} from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button
} from "react-native";

class EditAgendaScreen extends PureComponent {
  static navigationOptions = {
    title: "Edit event"
  };

  state = {
    name: "",
    note: ""
  };

  willFocusSubscription = null;

  componentDidMount() {
    if (this.props.navigation) {
      this.willFocusSubscription = this.props.navigation.addListener(
        "willFocus",
        this.willFocus
        );
    }
  }

  componentWillUnmount() {
    if (this.willFocusSubscription) {
      this.willFocusSubscription.remove();
    }
  }

  willFocus = (payload) => {
    let item;
    if (this.props.navigation && (item = this.props.navigation.getParam("item"))) {
      this.setState({name: item.name, note: item.note});
    }
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

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.margins}>Name:</Text>
        <TextInput
          style={[styles.textInput, styles.margins]}
          value={this.state.name}
          underlineColorAndroid="transparent"
          placeholder={"Name"}
          onChangeText={this.handleNameChange}
          autoCorrect={false}
        />
        <Text style={styles.margins}>Description:</Text>
        <TextInput
          style={[styles.textInput, styles.margins]}
          value={this.state.note}
          multiline={true}
          numberOfLines={5}
          underlineColorAndroid="transparent"
          textAlignVertical="top"
          placeholder={"Enter description..."}
          onChangeText={this.handleNoteChange}
          autoCorrect={false}
        />
        <Button title={"Save event"} onPress={this.handleSaveAgendaPress}/>
        <View style={{margin: 10}}/>
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
    justifyContent: "flex-start",
    backgroundColor: "white"
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
