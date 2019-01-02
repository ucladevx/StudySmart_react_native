import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Button, TouchableOpacity} from 'react-native';
import TestsList from '../components/TestsList'
export default class Notes extends Component {

  static navigationOptions = {
    header: () => {
        visible : false 
    },
    transitionConfig : () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0,
      },
    }),
  };
  constructor(props) {
    super(props)
    this.state = {
      Class : ' '
    }
  }


  render() {
    return (
        <TestsList
          data = {this.props.processPosts}/>
        
    )
  }

}

module.exports = Notes