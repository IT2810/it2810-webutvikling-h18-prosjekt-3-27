import React, {Component} from "react";
import {
  AsyncStorage,
  FlatList,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import randomColor from "randomcolor";
import TodoItem from "./TodoItem";

import CustomProgressBar from "./CustomProgressBar";

const isAndroid = Platform.OS === "android";

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
      if (taskKeys.length > 0) {
        const tasksResult = await AsyncStorage.multiGet(taskKeys);
        console.log("taskRes:", tasksResult);
        const tasks = tasksResult
          .map(keyvalue => keyvalue[1])
          .map(objJson => JSON.parse(objJson));
        this.setState({tasks: tasks});
        console.log("tasks:", tasks);
      }
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

  _delete = async (task) => {
    try {
      const taskKeysJSON = await AsyncStorage.getItem("TASKKEYS") || "[]";
      const taskKeys = JSON.parse(taskKeysJSON);
      let index;
      if ((index = taskKeys.findIndex(el => el === task.key)) !== -1) {
        taskKeys.splice(index, 1);
        await AsyncStorage.setItem("TASKKEYS", JSON.stringify(taskKeys));
      }
      await AsyncStorage.removeItem(task.key);
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
        return {tasks: tasks};
      }
    );
    const task = this.state.tasks.find(task => task.key === key);
    this._save(Object.assign({}, task, {completed: !task.completed}));
  };

  _handleSelectedTask = key => {
    this.setState({selected: key});
  };

  _handleEditFinish = () => {
    this.setState({selected: null})
  };

  _handleTextEdit = (text, task) => {
    const taskKey = task.key;
    let taskCopy = Object.assign({},task, {text});
    this.setState((prevState) => {
      const oldTask = prevState.tasks.find(task => task.key === taskKey);
      const index = prevState.tasks.indexOf(oldTask);
      let tasksCopy = [...prevState.tasks];
      tasksCopy[index] = taskCopy;
      return {tasks: tasksCopy}
    });
    this._save(taskCopy);
  };

  _handleDeleteTask = (task) => {
    const taskKey = task.key;
    this.setState((prevState) => {
      const taskToDelete = prevState.tasks.find(task => task.key === taskKey);
      const index = prevState.tasks.indexOf(taskToDelete);
      let tasksCopy = [...prevState.tasks];
      tasksCopy.splice(index,1);
      return {tasks: tasksCopy}
    });
   this._delete(task);

  };

  getSortedTasks = () => {
    let tasksCopy = [...this.state.tasks];
    tasksCopy.sort((a, b) => {
      if (a.completed === b.completed) {
        return 0;
      }
      if (a.completed) {
        return 1;
      }
      return -1;
    });
    return tasksCopy;
  };

  render() {
    let numCompleted = this.state.tasks.filter(task => task.completed === true).length;
    let numUncompleted = this.state.tasks.length;
    let progress = numCompleted/numUncompleted;

    return (
      <View
        style={styles.container}
      >
        <ScrollView>
          <FlatList
            style={styles.list}
            data={this.getSortedTasks()}
            keyExtractor={(item) => item.key}
            extraData={this.state.selected}
            renderItem={({item, index}) =>
              <View>
                <TodoItem
                  item={item}
                  index={index}
                  selected={this.state.selected}
                  onDeleteClick={this._handleDeleteTask}
                  onTextEdit={this._handleTextEdit}
                  onEditStart={this._handleSelectedTask}
                  onEditFinish={this._handleEditFinish}
                  toggleComplete={this._handleTaskToggle}/>
              </View>
            }
          />

        </ScrollView>

        <KeyboardAvoidingView behavior={"padding"}>
          <CustomProgressBar
            numCompleted={numCompleted}
            numUncompleted={numUncompleted}
            progress={progress}
          />
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
  center: {
    justifyContent: "center",
    alignItems: "center",
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
