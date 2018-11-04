import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Button, TouchableOpacity} from 'react-native';
import ViewContainer from '../components/ViewContainer'

export default class Notes extends Component {
  constructor(props) {
    super(props)
   
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ViewContainer>
        <Text> HI </Text>
      </ViewContainer>
    )
  }

}

module.exports = Notes