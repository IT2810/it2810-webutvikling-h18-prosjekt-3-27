import React, {Component} from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
  Platform,
  View,
  NativeModules,
  StatusBarIOS
} from "react-native";
import randomColor from "randomcolor";
import {Header} from 'react-navigation';
import CustomProgressBar from "./CustomProgressBar";
import Util from "./Util";
import SortedList from "./SortedList";
import TaskPersistence from "./TaskPersistence";

const {StatusBarManager} = NativeModules;

const isAndroid = Platform.OS === "android";

/**
 * This is the root component for the Todo screen
 */
export default class TodoScreen extends Component {
  static navigationOptions = {
    title: "Todo list",
    headerTitleStyle: {
      textAlign: "center",
      flex: 1
    }
  };

  constructor(props) {
    super(props);
    this.util = new Util();
    this.state = {
      tasks: [],
      completedTasks: [],
      text: "",
      selected: null,
    };
  }

  componentDidMount() {
    // Fetch tasks from storage, if any.
    this.fetchTasks();

    if (!isAndroid) {
      StatusBarManager.getHeight((statusBarFrameData) => {
        this.setState({statusBarHeight: statusBarFrameData.height});
      });
      this.statusBarListener = StatusBarIOS.addListener('statusBarFrameWillChange', (statusBarData) => {
        this.setState({statusBarHeight: statusBarData.frame.height});
      });
    }
  };

  fetchTasks = async () => {
    const tasks = await TaskPersistence.getAll();
    this.setState({tasks: tasks});
  };

  componentWillUnmount() {
    this.statusBarListener.remove();
  }

  /**
   * This method adds a new task, updates the state, and saves it to
   * storage.
   * @returns {Promise<void>}
   */
  handleAddTask = async () => {
    if (this.state.text.length > 0) {
      let key = await this.util.retrieveAndIncreaseKeyCount();
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
      TaskPersistence.save(task);
    }
  };

  /**
   *  This method deletes task from the tasks, updates state and deletes
   *  the task from storage
   * @param task
   */
  handleDeleteTask = (task) => {
    const taskKey = task.key;
    this.setState((prevState) => {
      const taskToDelete = prevState.tasks.find(task => task.key === taskKey);
      const index = prevState.tasks.indexOf(taskToDelete);
      let tasksCopy = [...prevState.tasks];
      tasksCopy.splice(index, 1);
      return {tasks: tasksCopy}
    });
    TaskPersistence.delete(task);

  };

  /**
   * This method changes the completed-state for a task,
   * and you can toggle between the value of completed
   * @param key of task to complete/uncomplete
   */
  handleTaskCompletion = key => {
    this.setState(
      prevState => {
        let tasks = [...prevState.tasks];
        let task = tasks.find((task) => task.key === key);
        task.completed ? task.completed = false : task.completed = true;
        return {tasks: tasks};
      }
    );
    const task = this.state.tasks.find(task => task.key === key);
    TaskPersistence.save(Object.assign({}, task, {completed: !task.completed}));
  };
  handleSelectedTask = key => {
    this.setState({selected: key});
  };

  handleEditFinish = () => {
    this.setState({selected: null})
  };
  /**
   * This method allows for tasks to be edited, the edited task
   * is saved to storage and state is updated.
   * @param text, new text to insert into state and storage
   * @param task, the task of which to edit
   */
  handleTextEdit = (text, task) => {
    const taskKey = task.key;
    let taskCopy = Object.assign({}, task, {text});
    this.setState((prevState) => {
      const oldTask = prevState.tasks.find(task => task.key === taskKey);
      const index = prevState.tasks.indexOf(oldTask);
      let tasksCopy = [...prevState.tasks];
      tasksCopy[index] = taskCopy;
      return {tasks: tasksCopy}
    });
    TaskPersistence.save(taskCopy);
  };

  handleChangeText = (text) => {
    this.setState({text: text})
  };

  render() {
    let numCompleted = this.state.tasks.filter(task => task.completed === true).length;
    let numUncompleted = this.state.tasks.length;
    let progress = numCompleted / numUncompleted;


    const statusBarPadding = 20;
    return (
      <View
        style={styles.container}
      >
        <ScrollView keyboardShouldPersistTaps="always" keyboardDismissMode="on-drag">
          <SortedList
            tasks={this.state.tasks}
            selected={this.state.selected}
            onDeleteTask={this.handleDeleteTask}
            onTextEdit={this.handleTextEdit}
            onEditStart={this.handleSelectedTask}
            onEditFinish={this.handleEditFinish}
            toggleComplete={this.handleTaskCompletion}
          />
        </ScrollView>

        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={Header.HEIGHT + Platform.select({
          android: statusBarPadding,
          ios: this.state.statusBarHeight - statusBarPadding
        })}>
          <CustomProgressBar
            numCompleted={numCompleted}
            numUncompleted={numUncompleted}
            progress={progress}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={this.handleChangeText}
            onSubmitEditing={this.handleAddTask}
            blurOnSubmit={false}
            value={this.state.text}
            placeholder="Add task.."
            autoCorrect={false}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "white",
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
