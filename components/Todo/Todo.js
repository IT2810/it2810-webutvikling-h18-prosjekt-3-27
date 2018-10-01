import React, {Component} from "react";
import {
  AsyncStorage,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import randomColor from "randomcolor";
import TodoItem from "./TodoItem";

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      completedTasks: [],
      text: "",
      selected: null,
    };
  }

  componentDidMount() {
    this._retrieveTasks().done();
  }

  _retrieveTasks = async () => {
    try {
      const taskKeysJson = await AsyncStorage.getItem("TASKKEYS") || "[]";
      const taskKeys = JSON.parse(taskKeysJson);
      const tasksResult = await AsyncStorage.multiGet(taskKeys);
      const tasks = tasksResult
        .map(keyvalue => keyvalue[1])
        .map(objJson => JSON.parse(objJson));
      this.setState({tasks: tasks});
    } catch (e) {
      console.error(e);
    }
  };

  /*TODO: Move to own UTIL class */
  _retrieveAndIncreaseKeyCount = async () => {
    try {
      const keyCountStr = await AsyncStorage.getItem("TodoKeyCount") || "0";
      let keyCount = parseInt(keyCountStr);
      keyCount = keyCount + 1;
      await AsyncStorage.setItem("TodoKeyCount", ""+keyCount);
      return keyCount;
    } catch (e) {
      console.error(e);
    }
  };

  _save = async (task) => {
    try {
      const taskKeysJSON = await AsyncStorage.getItem("TASKKEYS") || "[]";
      const taskKeys = JSON.parse(taskKeysJSON);
      if (!taskKeys.includes(task.key)) {
        taskKeys.push(task.key);
        await AsyncStorage.setItem("TASKKEYS", JSON.stringify(taskKeys));
      }
      await AsyncStorage.setItem(task.key, JSON.stringify(task));
    } catch (e) {
      console.error(e);
    }
   };

  _handleAddTask = async () => {
    if (this.state.text.length > 0) {
      let key = await this._retrieveAndIncreaseKeyCount();
      key = "task_" + key;
      const task = {
        key: key,
        text: this.state.text,
        completed: false,
        color: randomColor({luminosity: 'dark', hue: "green"})
      };
      this.setState(
        prevState => {
          let {tasks} = prevState;
          return {
            tasks: tasks.concat(task),
            text: ""
          };
        }
      );
    this._save(task).done();
    }
  };

  _handleTaskToggle = key => {
    this.setState(
      prevState => {
        let tasks = [...prevState.tasks];
        let task = tasks.find((task) => task.key === key);
        task.completed ? task.completed = false : task.completed = true;
        let completedTasks = [...prevState.completedTasks.slice()];
        return {tasks: tasks, completedTasks: completedTasks.concat(task)};
      }
    );
  };

  _handleSelectedTask = key => {
    this.setState({selected: key});
  };

  render() {
    return (
      <View
        style={styles.container}
      >
        <ScrollView>
          <FlatList
            style={styles.list}
            data={this.state.tasks}
            keyExtractor={(item) => item.key}
            extraData={this.state.selected}
            renderItem={({item, index}) =>
              <View>
                <TodoItem
                  item={item}
                  index={index}
                  selected={this.state.selected}
                  onEditStart={this._handleSelectedTask}
                  toggleComplete={this._handleTaskToggle}/>
              </View>

            }
          />

        </ScrollView>

        <KeyboardAvoidingView behavior="position">
          <Text
            style={{textAlign: "center"}}>{this.state.completedTasks.length}/{this.state.tasks.length + this.state.completedTasks.length}</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => this.setState({text: text})}
            onSubmitEditing={this._handleAddTask}
            blurOnSubmit={false}
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
    height: "100%",
  },
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
    color: "#afafaf",
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
