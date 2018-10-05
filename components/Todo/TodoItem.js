import {StyleSheet, Text, View, TextInput, Platform} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React, {Component} from "react";


const isAndroid = Platform.OS === "android";
export default class TodoItem extends Component {

  handleToggleComplete = () => {
    console.log(this.props);
    this.props.toggleComplete(this.props.item.key);
  };

  handleEditStart = () => {
    this.props.onEditStart(this.props.item.key);
  };

  handleEditFinish = () => {
    this.props.onEditFinish(this.props.item.key);
  };

  handleTextEdit = (text) => {
    this.props.onTextEdit(text, this.props.item);
  };

  handleDeleteTask = () => {
    this.props.onDeleteTask(this.props.item);
  };

  render() {
    let item = this.props.item;
    return (
      <View>
        <View style={styles.itemContainer}>
          {(this.props.selected === this.props.item.key) ?
            <View style={{flexDirection: "row"}}>
              <Icon style={styles.button} name={isAndroid ? "md-trash" : "ios-trash"} color={item.color} size={40}
                    onPress={this.handleDeleteTask}/>
              <TextInput
                value={this.props.item.text}
                onChangeText={this.handleTextEdit}
                onSubmitEditing={this.handleEditFinish}
                placeholder={"Editing " + this.props.item.text}
                style={styles.item}
                autoCorrect={false}
                autoFocus={true}
              />
            </View>
            :
            <Text
              onPress={this.handleEditStart}
              style={item.completed ? styles.itemCompleted : styles.item}>
              {item.text}
            </Text>
          }
          {isAndroid ?
            <Icon style={styles.button} name={item.completed ? "md-checkmark-circle" : "md-radio-button-off"}
                  color={item.color} size={50}
                  onPress={this.handleToggleComplete}/>
            :
            <Icon style={styles.button} name={item.completed ? "ios-checkmark-circle" : "ios-radio-button-off"}
                  color={item.color} size={50}
                  onPress={this.handleToggleComplete}/>
          }

        </View>

        <View style={styles.hr}/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  item: {
    flex: 1,
    flexWrap: "wrap",
    paddingLeft: 10,
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 18,
    margin: 5,
  },
  itemCompleted: {
    flex: 1,
    flexWrap: "wrap",
    textDecorationLine: "line-through",
    color: "#D3D3D3",
    paddingLeft: 10,
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 18,
    margin: 5,
  },
  button: {
    marginLeft: 5,
    marginRight: 5,
  },
  hr: {
    marginTop: 5,
    marginBottom: 5,
    height: 1,
    backgroundColor: "gray"
  },
});