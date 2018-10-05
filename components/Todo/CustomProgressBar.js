import {Text, View} from "react-native";
import React, {Component} from "react";
import ProgressBar from 'react-native-progress/Bar';
export default class CustomProgressBar extends Component {

  render() {
    return(
      <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
        <Text style={{marginRight: 5}}>{this.props.numCompleted}</Text>
         <ProgressBar progress={this.getProgress()} color="#579d5b"/>
        <Text style={{marginLeft: 5}}>{this.props.numUncompleted}</Text>
      </View>
    )
  }

  getProgress() {
    return isNaN(this.props.progress) ? 0 : this.props.progress;
  }
}
