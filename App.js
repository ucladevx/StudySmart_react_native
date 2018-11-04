

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList} from 'react-native';
import StatusBarBackground from './app/components/StatusBarBackground'
import ViewContainer from './app/components/ViewContainer'
import MainFeed from './app/screens/MainFeed'
import Tests from './app/screens/Tests'
import Notes from './app/screens/Notes'
import { StackNavigator } from 'react-navigation';

const AppNavigator = StackNavigator({
  MainFeed: { screen: MainFeed },
  Tests: {screen: Tests},
  Notes: {screen: Notes},
});


type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props)
   
  }
  render() {
    return (
          <AppNavigator style = {styles.navigator}
            />
    )
  }
}

const styles = StyleSheet.create({
  navigator: {
    backgroundColor: '#1DB8F0',
  },
  
});
