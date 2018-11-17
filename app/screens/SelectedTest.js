import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Button, TouchableOpacity} from 'react-native';
import ViewContainer from '../components/ViewContainer'
export default class SelectedTest extends Component {
  static navigationOptions = {
    title: 'Your Test',
    headerStyle: {
      backgroundColor: '#1DB8F0'
    }
  };
  constructor(props) {
    super(props)
    this.test = this.props.navigation.getParam('test', 'lol')
  }
  render() {
    const { test } = this.props;
    return (
      <ViewContainer>
        <Text>
         {this.test.class}
        </Text>
      </ViewContainer>
    )
  }

}

module.exports = SelectedTest