import {Component} from 'react';
import {AsyncStorage} from "react-native";

export default class Util extends Component {
  retrieveAndIncreaseKeyCount = async () => {
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
}