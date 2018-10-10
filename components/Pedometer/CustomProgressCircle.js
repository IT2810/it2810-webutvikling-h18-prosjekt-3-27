import React, {Component} from "react";
import {View} from "react-native";
import ProgressCircle from 'react-native-progress/Circle';

export default class CustomProgressCircle extends Component {

  getColor = () => {
    const colors = ["#E50100", "#E02F00","#DC5B00","#D88600","#D4AE00","#CACF00","#9CCB00","#70C800","#46C300","#1DBF00"];
    let p = this.props.progress;
    return colors[Math.floor(colors.length * p * 0.999)];
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
