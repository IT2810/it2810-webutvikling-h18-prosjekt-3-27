import React from "react";
import {Pedometer} from "expo";
import {Platform, StyleSheet, Text, View} from "react-native";
import CustomProgressCircle from "./CustomProgressCircle";

const isAndroid = Platform.OS === "android";
export default class PedometerScreen extends React.Component {
  static navigationOptions = {
    title: "Pedometer",
    headerTitleStyle: {
      textAlign: "center",
      flex: 1
    }
  };

  state = {
    stepCount: 0,
    error: false,
    errorText: "",
  };

  componentDidMount() {
    this.subscribe();
  }

  subscribe = () => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({stepCount: result.steps});
      },
      error => {
        this.setState({
          error: true,
          errorText: error,
        })
      }
    );
  };

  getProgress = () => {
    const goal = 10000;
    let count = this.state.stepCount;
    return count / goal;
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.error ?
          <View>
            <Text>
              {this.state.errorText.toString()}
            </Text>
            <Text style={styles.title}>Your device must support {isAndroid ? "Google Fit" : "Apple Health"} to use the
            pedometer.
            </Text>

          </View>
          :
          <View>
            <View style={styles.box}>
              <Text style={styles.text}>
                You have walked
              </Text>
              <Text style={styles.steps}>{this.state.stepCount}</Text>
              <Text>
                of 10000 steps today!
              </Text>
            </View>
            <CustomProgressCircle progress={this.getProgress()}/>
          </View>
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center"
  },
  text: {
    fontSize: 25,
  },
  steps: {
    fontSize: 40,
  },
  box: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  }
});