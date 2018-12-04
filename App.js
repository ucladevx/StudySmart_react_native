import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList} from 'react-native';
import MainFeed from './app/screens/MainFeed'
import Tests from './app/screens/Tests'
import SelectedTest from './app/screens/SelectedTest'
import Notes from './app/screens/Notes'
import Locations from './app/screens/Locations'
import LocationList from './app/screens/LocationsList'
import LocationsDetailed from './app/screens/LocationsDetailed'
import Profile from './app/screens/Profile'
import { StackNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation';
import LocationsList from './app/screens/LocationsList';

// this is for MainFeed Stack Navigation 
const MainStack = StackNavigator({
  Main: { screen: MainFeed },
  Tests: {screen: Tests},
  Notes: {screen: Notes},
  SelectedTest: {screen: SelectedTest},
},{
  initialRouteName: 'Main'
  
});

const LocationStack = StackNavigator({
  List: {screen: LocationsList},
  Detailed: {screen: LocationsDetailed},
  Map: {screen: Locations}


}, {
  //For now, use this to toggle between List view and Map view. We will eventually add a toggle button
  //initialRouteName: "List"
  initialRouteName: "List"
})

//this is the tab bar navigator for the entire App 
const AppTabNavigator = createBottomTabNavigator({
  Main: MainStack,
  Locations: LocationStack,
  Profile: { screen: Profile },
},
{
    initialRouteName: 'Main',
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    barStyle: { backgroundColor: 'blue' },
});


type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props)
   
  }
  render() {
    return ( 
      <AppTabNavigator>  
            </AppTabNavigator>
    )
  }
}

const styles = StyleSheet.create({
  navigator: {
    backgroundColor: '#1DB8F0',
  },
  
});
