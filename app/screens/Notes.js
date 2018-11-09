import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Button, TouchableOpacity} from 'react-native';
import ViewContainer from '../components/ViewContainer'
import MainTopBar from '../components/MainTopBar'
export default class Notes extends Component {
  static navigationOptions = {
    title: 'Notes',
    headerStyle: {
      backgroundColor: '#1DB8F0'
    }
  };
  constructor(props) {
    super(props)
   
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ViewContainer>
        <MainTopBar/>
      </ViewContainer>
    )
  }

}

module.exports = Notes