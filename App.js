

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList} from 'react-native';
import StatusBarBackground from './app/components/StatusBarBackground'
import ViewContainer from './app/components/ViewContainer'
import MainFeed from './app/screens/MainFeed'
import Tests from './app/screens/Tests'
import Notes from './app/screens/Notes'
import Locations from './app/screens/Locations'
import Profile from './app/screens/Profile'
import { StackNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation';

const MainStack = StackNavigator({
  MainFeed: { screen: MainFeed },
  Tests: {screen: Tests},
  Notes: {screen: Notes},
});
const AppTabNavigator = createBottomTabNavigator({
  MainStack: { screen: MainFeed },
  Locations: { screen: Locations },
  Profile: { screen: Profile },
},
{
    initialRouteName: 'MainStack',
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    barStyle: { backgroundColor: '#694fad' },
});


type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props)
   
  }
  render() {
    return ( 
      <AppTabNavigator>  
        <MainStack style = {styles.navigator}
            />
            </AppTabNavigator>
    )
  }
}

const styles = StyleSheet.create({
  navigator: {
    backgroundColor: '#1DB8F0',
  },
  
});
