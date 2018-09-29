import React, {Component} from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import randomColor from "randomcolor";

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      completedTasks: [],
      text: ""
    };
    this._handleAddTask = this._handleAddTask.bind(this);
    this._handleDeleteTask = this._handleDeleteTask.bind(this);
  }

  _handleAddTask = () => {
    this.setState(
      prevState => {
        let {tasks, text} = prevState;
        return {
          tasks: tasks.concat({key: tasks.length, text: text, completed: false, color: randomColor({hue: "green"})}),
          text: ""
        };
      });
  };

  _handleDeleteTask = index => {
    this.setState(
      prevState => {
        let tasks = [...prevState.tasks.slice()];
        tasks[index].completed = true;
        let completedTasks = [...prevState.completedTasks.slice()];
        let completedTask = tasks.splice(index, 1);
        return {tasks: tasks, completedTasks: completedTasks.concat(completedTask)};
      }
    );
  };


  render() {
    return (
      <View
        style={styles.container}
      >
        <FlatList
          style={styles.list}
          data={this.state.tasks}
          keyExtractor={(item) => item.key.toString()}
          renderItem={({item, index}) =>
            <View>
              <View style={styles.itemContainer}>
                <Text style={styles.item}>
                  {item.text}
                </Text>
                <Icon style={styles.button} name="ios-checkmark-circle" color={item.color} size={50} onPress={() => this._handleDeleteTask(index)}/>
              </View>
              <View style={styles.hr}/>
            </View>}
        />
        <KeyboardAvoidingView behavior="position">
          <Text
            style={{textAlign: "center"}}>{this.state.completedTasks.length}/{this.state.tasks.length + this.state.completedTasks.length}</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => this.setState({text: text})}
            onSubmitEditing={this._handleAddTask}
            value={this.state.text}
            placeholder="Add task.."
            autoCorrect={false}
            autoFocus
          />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    width: "100%",
    height: "100%",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  item: {
    paddingLeft: 10,
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 18,
    margin: 5,
  },
  button: {
    marginRight: 5,
  },
  hr: {
    marginTop: 5,
    marginBottom: 5,
    height: 1,
    backgroundColor: "gray"
  },

  textInput: {
    textAlign: "center",
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 5,
    fontSize: 25,
    height: 50,
  }
});
