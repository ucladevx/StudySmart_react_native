import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Button, TouchableOpacity} from 'react-native';
import MainTopBar from '../components/MainTopBar'
import GlobalSearchBar from '../components/GlobalSearchBar';
export default class Notes extends Component {

  static navigationOptions = {
    header: () => {
      visible: false
  },
}
  constructor(props) {
    super(props)
    this.state = {
      Class : ' '
    }
    this.setInputState = this.setInputState.bind(this);
  }

  setInputState(event){
    this.setState({ Class: event.target.value });
  } 

  render() {
    const { navigate } = this.props.navigation;
    return (
        <MainTopBar/>
    )
  }

}

module.exports = Notes