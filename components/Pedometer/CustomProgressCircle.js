import React, {Component} from "react";
import {View} from "react-native";
import ProgressCircle from 'react-native-progress/Circle';

export default class CustomProgressCircle extends Component {

  getColor = () => {
    const colors = ["#E50100", "#E02F00","#DC5B00","#D88600","#D4AE00","#CACF00","#9CCB00","#70C800","#46C300","#1DBF00"];
    let p = this.props.progress;
    console.log(p);
    if (p <= 0.1) {
      return colors[0];
    } else if (p > 0.1 && p <= 0.2) {
      return colors[1];
    } else if (p > 0.2 && p <= 0.3) {
      return colors[2];
    } else if (p > 0.3 && p <= 0.4) {
      return colors[3];
    } else if (p > 0.4 && p <= 0.5) {
      return colors[4];
    } else if (p > 0.5 && p <= 0.6) {
      return colors[5];
    } else if (p > 0.6 && p <= 0.7) {
      return colors[6];
    } else if (p > 0.7 && p <= 0.8) {
      return colors[7];
    } else if (p > 0.8 && p <= 0.9) {
      return colors[8];
    } else if (p > 0.9) {
      return colors[9];
    }
  };

  render() {
    return(
      <View>
        <ProgressCircle
          progress={isNaN(this.props.progress) ? 0 : this.props.progress}
          size={250}
          thickness={10}
          color={this.getColor()}
          showsText={true}/>
      </View>
    )
  }
}
